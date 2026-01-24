from flask import Flask, Response, jsonify, send_from_directory, abort, request
from flask_cors import CORS
import cv2
import firebase_admin
from firebase_admin import credentials, db
from twilio.rest import Client
from ultralytics import YOLO
import datetime
import time
import json
import requests
import os
import re
from dotenv import load_dotenv
from threading import Thread, Lock

app = Flask(__name__, static_folder="static")
CORS(app)  # Allow all origins

# Thread-safe lock for video frames
frame_lock = Lock()

# Load environment variables
load_dotenv()
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
ADMIN_PHONE_NUMBER = os.getenv("ADMIN_PHONE_NUMBER")

# Load YOLO model
model = YOLO("best.pt")

# Open webcam  
video_stream = cv2.VideoCapture(0)
video_stream.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
video_stream.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
video_stream.set(cv2.CAP_PROP_FPS, 30)

# Firebase setup
cred = credentials.Certificate(os.path.join(os.path.dirname(__file__), "eyeview-v2-firebase-adminsdk-fbsvc-a1600b8e74.json"))
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://eyeview-v2-default-rtdb.firebaseio.com/"
})
alert_ref = db.reference("violence_detections")
history_ref = db.reference("history_clips")

# Twilio setup
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Alert system
ALERT_COOLDOWN = 10
last_alert_time = 0

# Clip saving directory
clip_save_dir = os.path.abspath("static/history_clips")
os.makedirs(clip_save_dir, exist_ok=True)
print(f" Clip save directory: {clip_save_dir}")

def get_location():
    try:
        response = requests.get("http://ip-api.com/json/")
        data = response.json()
        return f"{data['city']}, {data['regionName']}, {data['country']}"
    except:
        return "Unknown Location"

def send_alert(frame, confidence):
    global last_alert_time
    current_time = time.time()
    if current_time - last_alert_time < ALERT_COOLDOWN:
        return

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    location = get_location()

    alert_data = {
        "time": timestamp,
        "confidence": confidence,
        "location": location
    }

    with open("alert_log.json", "a") as log_file:
        log_file.write(json.dumps(alert_data) + "\n")

    alert_ref.push(alert_data)

    client.messages.create(
        body=f" Violence detected at {timestamp} | Confidence: {confidence:.2f} | Location: {location}",
        from_=TWILIO_PHONE_NUMBER,
        to=ADMIN_PHONE_NUMBER
    )

    last_alert_time = current_time
    Thread(target=save_clip, args=(clip_save_dir,)).start()

def save_clip(directory):
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    timestamp_str = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"clip_{timestamp_str}.mp4"
    filepath = os.path.join(directory, filename)

    print(f" Saving clip to: {filepath}")

    out = cv2.VideoWriter(filepath, fourcc, 20.0, (1280, 720))
    if not out.isOpened():
        print(" Failed to open VideoWriter")
        return

    start_time = time.time()
    frames_written = 0

    while time.time() - start_time < 10:
        with frame_lock:
            success, frame = video_stream.read()
        if not success:
            continue
        out.write(frame)
        frames_written += 1

    out.release()
    time.sleep(2)

    if frames_written == 0 or not os.path.exists(filepath) or os.path.getsize(filepath) == 0:
        print(" Clip was empty or not saved.")
        return

    print(f" Clip saved: {filename} ({frames_written} frames)")

    clip_metadata = {
        "filename": filename,
        "timestamp": datetime.datetime.now().isoformat()
    }
    history_ref.push(clip_metadata)

def detect_and_stream():
    alert_sent = False

    while True:
        with frame_lock:
            success, frame = video_stream.read()
        if not success:
            continue

        resized_frame = cv2.resize(frame, (640, 640))
        results = model(resized_frame, imgsz=640)

        h_ratio = frame.shape[0] / 640
        w_ratio = frame.shape[1] / 640

        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                confidence = float(box.conf[0])

                x1 = int(x1 * w_ratio)
                x2 = int(x2 * w_ratio)
                y1 = int(y1 * h_ratio)
                y2 = int(y2 * h_ratio)

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, f"Violence: {confidence:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                if confidence > 0.5 and not alert_sent:
                    send_alert(frame, confidence)
                    alert_sent = True

        _, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(detect_and_stream(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/history_clips')
def list_clips():
    clips = history_ref.get()
    if not clips:
        return jsonify([])
    clips_array = [{"id": key, **value} for key, value in clips.items()]
    clips_array.sort(key=lambda c: c.get("timestamp", ""), reverse=True)
    return jsonify(clips_array)

@app.route('/history_clips/<path:filename>')
def stream_video(filename):
    file_path = os.path.join(clip_save_dir, filename)
    if not os.path.exists(file_path):
        print(f" File not found: {file_path}")
        abort(404)

    range_header = request.headers.get('Range', None)
    if not range_header:
        print(f" Serving full clip: {file_path}")
        return send_from_directory(clip_save_dir, filename, mimetype="video/mp4")

    print(f" Streaming clip with range: {range_header}")
    size = os.path.getsize(file_path)
    byte1, byte2 = 0, None

    match = re.search(r'bytes=(\d+)-(\d*)', range_header)
    if match:
        groups = match.groups()
        byte1 = int(groups[0])
        if groups[1]:
            byte2 = int(groups[1])

    byte2 = byte2 if byte2 is not None else size - 1
    length = byte2 - byte1 + 1

    with open(file_path, 'rb') as f:
        f.seek(byte1)
        data = f.read(length)

    response = Response(data,
                        206,
                        mimetype='video/mp4',
                        content_type='video/mp4',
                        direct_passthrough=True)
    response.headers.add('Content-Range', f'bytes {byte1}-{byte2}/{size}')
    response.headers.add('Accept-Ranges', 'bytes')
    response.headers.add('Content-Length', str(length))
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
