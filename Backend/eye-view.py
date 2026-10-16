from flask import Flask, Response, jsonify, send_from_directory, abort, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import cv2
import firebase_admin
from firebase_admin import credentials, db
from ultralytics import YOLO
import datetime
import time
import json
import requests
import os
import re
import subprocess
import xgboost as xgb

from dotenv import load_dotenv
from threading import Thread, Lock
from collections import deque
import hashlib
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


load_dotenv()

app = Flask(__name__, static_folder="static")
CORS(app)  # Allow all origins



# JWT Setup
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
jwt = JWTManager(app)






current_logged_user = None
current_detection_mode = "Violence Detection"

# Simple user storage (in production, use a proper database)
USERS_FILE = 'users.json'
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump({}, f)

# --- Thread-safe Locks and Buffers ---
frame_lock = Lock()  # Lock for accessing shared resources (frame buffer)
video_stream_lock = Lock() # Lock for reading from the video stream

# --- Configuration ---
load_dotenv()

ALERT_COOLDOWN = 60  # Seconds between alerts
CLIP_DURATION = 10 # Seconds

# --- YOLO Model ---

model=None
try:
    model = YOLO("best1.pt")
    print("YOLO model loaded successfully.")
except Exception as e:
    print(f"Error loading YOLO model: {e}")
    model = None

# --- Video Capture ---
video_stream = cv2.VideoCapture(r"C:\Users\Vansh Parmar\Documents\Guard_View\Backend\theft2.webm")
# if not video_stream.isOpened():
#     print("Error: Could not open webcam.")
# else:
#     video_stream.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
#     video_stream.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
#     # Get the actual FPS from the camera
FPS = video_stream.get(cv2.CAP_PROP_FPS)
if FPS == 0:
    FPS = 30 # Default if camera doesn't provide FPS
    video_stream.set(cv2.CAP_PROP_FPS, FPS)
print(f"Webcam opened successfully. Resolution: 1280x720, FPS: {FPS}")

# --- Frame Buffer for Clip Saving ---
# Store the last CLIP_DURATION seconds of frames
MAX_BUFFER_SIZE = int(FPS * CLIP_DURATION) if 'FPS' in locals() else 300
frame_buffer = deque(maxlen=MAX_BUFFER_SIZE)

# --- Firebase Setup ---
firebase_initialized = False
try:
    # IMPORTANT: Update this path to your Firebase credentials file
    cred_path = "guard-view-20676-firebase-adminsdk-fbsvc-917b6e941d.json"

    if not os.path.exists(cred_path):
        raise FileNotFoundError
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://guard-view-20676-default-rtdb.firebaseio.com/"
    })
    alert_ref = db.reference("violence_detections")
    history_ref = db.reference("history_clips")
    firebase_initialized = True
    print("Firebase initialized successfully.")

except FileNotFoundError:
    print("Firebase credentials file not found. Firebase features will be disabled.")
    alert_ref = None
    history_ref = None
except Exception as e:
    print(f"Error initializing Firebase: {e}. Firebase features will be disabled.")
    alert_ref = None
    history_ref = None



# --- User Management Functions ---
def load_users():
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except:
        return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def create_user(email, password, phone, first_name, last_name):
    users = load_users()
    if email in users:
        return False, "User already exists"

    user_id = str(uuid.uuid4())
    users[email] = {
        'id': user_id,
        'email': email,
        'password': hash_password(password),
        'phone':phone,
        'first_name': first_name,
        'last_name': last_name,
        'created_at': datetime.datetime.now().isoformat(),
        'analytics': {
            'login_count': 0,
            'last_login': None,
            'login_history': [],
            'total_alerts_viewed': 0,
            'total_clips_viewed': 0
        }
    }
    save_users(users)
    return True, user_id

def authenticate_user(email, password):
    users = load_users()
    user = users.get(email)
    if user and user['password'] == hash_password(password):
        # Update login analytics
        current_time = datetime.datetime.now().isoformat()
        if 'analytics' not in user:
            user['analytics'] = {
                'login_count': 0,
                'last_login': None,
                'login_history': [],
                'total_alerts_viewed': 0,
                'total_clips_viewed': 0
            }

        user['analytics']['login_count'] += 1
        user['analytics']['last_login'] = current_time
        user['analytics']['login_history'].append({
            'timestamp': current_time,
            'ip': request.remote_addr
        })

        # Keep only last 50 login records
        user['analytics']['login_history'] = user['analytics']['login_history'][-50:]

        save_users(users)
        return user
    return None

# --- Alert System ---
last_alert_time = 0

# --- Clip Saving Directory ---
# **REVERTED:** Save clips to the 'static/history_clips' folder within the backend directory.
clip_save_dir = os.path.abspath("static/history_clips")
os.makedirs(clip_save_dir, exist_ok=True)
print(f"Clip save directory set to: {clip_save_dir}")



def get_current_user_email():
    global current_logged_user

    if not current_logged_user:
        print("No user logged in")
        return None

    users = load_users()
    user = users.get(current_logged_user)

    if user:
        return user.get("email")

    return None

def get_location():
    """Fetches the public IP based location."""
    try:
        response = requests.get("http://ip-api.com/json/", timeout=5)
        response.raise_for_status()
        data = response.json()
        return f"{data.get('city', 'N/A')}, {data.get('regionName', 'N/A')}, {data.get('country', 'N/A')}"
    except requests.exceptions.RequestException as e:
        print(f"Could not get location: {e}")
        return "Unknown Location"


def send_alert(confidence,label):
    """Handles the alerting logic: logging, Firebase push, and Twilio SMS."""
    
    
    

    global last_alert_time
    global current_detection_mode
    current_time = time.time()
    if current_time - last_alert_time < ALERT_COOLDOWN:
        print("Alert in cooldown period. Skipping.")
        return

    print("--- ALERT TRIGGERED ---")
    last_alert_time = current_time
    timestamp = datetime.datetime.now()
    location = get_location()

    # Generate clip filename
    clip_filename = f"clip_{timestamp.strftime('%Y%m%d_%H%M%S')}.mp4"
    alerttype=None
    if current_detection_mode=="Violence Detection":
        alerttype="Violence Detected"
    elif current_detection_mode=="Shoplifting Detection":
        alerttype="Shoplifting Detected"
    elif current_detection_mode=="Accident Detection":
        alerttype="Accident Detected"

    alert_data = {
        "time": timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        "confidence": round(confidence, 2),
        "location": location,
        "alerttype":alerttype,
        "video_url": f"http://localhost:5000/history_clips/{clip_filename}"
    }

    # Log alert locally
    with open("alert_log.json", "a") as log_file:
        log_file.write(json.dumps(alert_data) + "\n")

    # Push to Firebase
    if firebase_initialized:
        try:
            alert_ref.push(alert_data)
            print("Alert pushed to Firebase.")
        except Exception as e:
            print(f"Error pushing alert to Firebase: {e}")

    try:
            user_email=get_current_user_email()
            if user_email:
              message_body = f"{label} at {alert_data['time']} | Confidence: {alert_data['confidence']:.2f} | Location: {alert_data['location']}"
              sender_email = "sysguardview@gmail.com"
              sender_email=os.getenv("MAIL")
              receiver_email = user_email
              password = os.getenv("PASSWORD")
            

              

# Create Message
              msg = MIMEMultipart()
              msg["From"] = sender_email
              msg["To"] = receiver_email
              msg["Subject"] = "Email from GuardView"

              body = message_body
              msg.attach(MIMEText(body, "plain"))

# Gmail SMTP Server
              server = smtplib.SMTP("smtp.gmail.com", 587)
              server.starttls()
              server.login(sender_email, password)

# Send Email
              server.send_message(msg)

              server.quit()

              print("Email sent successfully!")
    except Exception as e:
            print(f"Error sending Email: {e}")

    


    # Send SMS via Twilio
    
       

    # Save the clip from the buffer in a new thread
    with frame_lock:
        frames_to_save = list(frame_buffer)
    
    Thread(target=save_clip, args=(clip_save_dir, clip_filename, frames_to_save)).start()

def save_clip(directory, filename, frames):
    """Saves a list of frames to a video file using ffmpeg."""
    if not frames:
        print("Clip save failed: No frames in the buffer.")
        return

    filepath = os.path.join(directory, filename)
    print(f"Saving clip to: {filepath} ({len(frames)} frames)")

    # Create temp dir for frames
    temp_dir = os.path.join(directory, f'temp_frames_{os.path.splitext(filename)[0]}')
    os.makedirs(temp_dir, exist_ok=True)

    # Save frames as png
    for i, frame in enumerate(frames):
        frame_path = os.path.join(temp_dir, f'frame_{i:04d}.png')
        cv2.imwrite(frame_path, frame)

    # Use ffmpeg to create mp4
    ffmpeg_cmd = [
        r'C:\Users\Vansh Parmar\Downloads\ffmpeg.exe',
        '-y',  # overwrite
        '-framerate', str(FPS),
        '-i', os.path.join(temp_dir, 'frame_%04d.png'),
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        filepath
    ]

    try:
        subprocess.run(ffmpeg_cmd, check=True)
        print(f"Clip successfully saved: {filename}")

        # Generate thumbnail from the first frame
        thumbnail_filename = f"{os.path.splitext(filename)[0]}_thumb.jpg"
        thumbnail_path = os.path.join(directory, thumbnail_filename)

        thumbnail_cmd = [
            r'C:\Users\Vansh Parmar\Downloads\ffmpeg.exe',
            '-y',  # overwrite
            '-i', filepath,
            '-ss', '00:00:00.100',  # Take frame at 0.1 seconds (earlier for short clips)
            '-vframes', '1',  # Extract 1 frame
            '-q:v', '2',  # High quality
            thumbnail_path
        ]

        try:
            subprocess.run(thumbnail_cmd, check=True)
            print(f"Thumbnail generated: {thumbnail_filename}")
        except subprocess.CalledProcessError as e:
            print(f"Failed to generate thumbnail: {e}")

    except subprocess.CalledProcessError as e:
        print(f"Failed to create video with ffmpeg: {e}")
        # Clean up temp frames on failure
        for f in os.listdir(temp_dir):
            os.remove(os.path.join(temp_dir, f))
        os.rmdir(temp_dir)
        return

    # Clean up temp frames
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

    # Update history in Firebase
    if firebase_initialized:
        clip_metadata = {
            "filename": filename,
            "timestamp": datetime.datetime.now().isoformat(),
            "url": f"http://localhost:5000/history_clips/{filename}"
        }
        try:
            history_ref.push(clip_metadata)
            print(f"Clip metadata for {filename} pushed to Firebase history.")
        except Exception as e:
            print(f"Error pushing clip metadata to Firebase: {e}")

def violence(frame):
    global model
    # fra=frame
    # resized_frame = cv2.resize(fra, (640, 640))
    # results = model(resized_frame, imgsz=640, verbose=False)
    # h_ratio = fra.shape[0] / 640
    # w_ratio = fra.shape[1] / 640
    # for result in results:
    #         for box in result.boxes:
    #             x1, y1, x2, y2 = map(int, box.xyxy[0])
    #             confidence = float(box.conf[0])
    #             class_id = int(box.cls[0])
                
    #             x1, x2 = int(x1 * w_ratio), int(x2 * w_ratio)
    #             y1, y2 = int(y1 * h_ratio), int(y2 * h_ratio)
                
    #             if class_id == 1:
    #                 label = "Violence"
    #                 color = (0, 0, 255) # Red
    #                 if confidence > 0.8:
    #                      queue_alert(confidence,"Violence Detected")
    #             else:
    #                 label = "Non-violence"
    #                 color = (0, 255, 0) # Green

    #             cv2.rectangle(fra, (x1, y1), (x2, y2), color, 2)
    #             cv2.putText(fra, f"{label}: {confidence:.2f}", (x1, y1 - 10),
    #                         cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
    # return fra
    frame = cv2.resize(frame, (640, 480))
    results = model.predict(frame)
    
    
    
    for box in results[0].boxes:
            
            cls = int(box.cls[0])
            confidence = float(box.conf[0])
            label = model.names[cls]
            
            if label=="Violence" and confidence>0.8:
                send_alert(confidence,"Violence Detected")
            frame=results[0].plot()
           
       
        
    return frame
            

def accident(frame):
    global model
    frame= cv2.resize(frame, (640, 480))
    results = model(frame)
    for result in results:
            boxes = result.boxes.cpu().numpy()
            for box in boxes:
                confidence=float(box.conf[0])
                if confidence > 0.6:
                    # Draw bounding box on the frame
                    send_alert(confidence,"Accident Detected")
                    frame = results[0].plot()
                    
    return frame

def shoplifting(frame):
    global model
    
    results=model(frame)
    for box in results[0].boxes:

        confidence=float(box.conf[0])

        cls=int(box.cls[0])

        label=model.names[cls]

        if label=="shoplifting" and confidence>0.49:
            send_alert(confidence,"Shoplifting Deteced")

    annotated_frame=results[0].plot()
    return annotated_frame            


def detect_and_stream():
    """
    Main loop to read frames, run detection, update buffer, and yield frames for streaming.
    """
    if not model:
        print("YOLO model not loaded. Cannot start detection.")
        return

    while True:
        with video_stream_lock:
            if not video_stream.isOpened():
                print("Webcam is not available. Retrying...")
                time.sleep(2)
                continue
            success, frame = video_stream.read()

        if not success:
            continue

        # Add a copy of the frame to our buffer for potential clip saving
        with frame_lock:
            frame_buffer.append(frame.copy())
        
        # --- Run YOLO Detection ---
        # resized_frame = cv2.resize(frame, (640, 640))
        # results = model(resized_frame, imgsz=640, verbose=False)
        # results = model(frame)
        # h_ratio = frame.shape[0] / 640
        # w_ratio = frame.shape[1] / 640
        
        # for result in results:
        #     for box in result.boxes:
        #         x1, y1, x2, y2 = map(int, box.xyxy[0])
        #         confidence = float(box.conf[0])
        #         class_id = int(box.cls[0])
                
        #         x1, x2 = int(x1 * w_ratio), int(x2 * w_ratio)
        #         y1, y2 = int(y1 * h_ratio), int(y2 * h_ratio)
                
        #         if class_id == 1:
        #             label = "Violence"
        #             color = (0, 0, 255) # Red
        #             if confidence > 0.80:
        #                  send_alert(confidence)
        #         else:
        #             label = "Non-violence"
        #             color = (0, 255, 0) # Green

        #         cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        #         cv2.putText(frame, f"{label}: {confidence:.2f}", (x1, y1 - 10),
        #                     cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
        # for result in results:
        #     boxes = result.boxes.cpu().numpy()
        #     for box in boxes:
        #         confidence=float(box.conf[0])
        #         if confidence > 0.5:
        #             # Draw bounding box on the frame
        #             frame = results[0].plot()
        #             send_alert(confidence)
        if current_detection_mode=="Violence Detection":
            frame=violence(frame)
        
        elif current_detection_mode=="Accident Detection":
            frame=accident(frame)
        
        elif current_detection_mode=="Shoplifting Detection":
            frame=shoplifting(frame)
        

        _, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

# --- Authentication Routes ---

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    phone=data.get('phone')
    first_name = data.get('firstName', '')
    last_name = data.get('lastName', '')


    if not email or not password or not phone:
        return jsonify({'error': 'Email, phone and password are required'}), 400

    success, result = create_user(email, password,phone, first_name, last_name)
    if success:
        access_token = create_access_token(identity=email)
        return jsonify({
            'message': 'User created successfully',
            'access_token': access_token,
            'user': {
                'id': result,
                'email': email,
                'phone':phone,
                'first_name': first_name,
                'last_name': last_name
            }
        }), 201
    else:
        return jsonify({'error': result}), 409

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = authenticate_user(email, password)
    if user:
        global current_logged_user
        current_logged_user = email

        access_token = create_access_token(identity=email)
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'phone': user['phone'],
                'first_name': user['first_name'],
                'last_name': user['last_name']
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/auth/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    users = load_users()
    user = users.get(current_user)
    if user:
        return jsonify({
            'user': {
                'id': user['id'],
                'email': user['email'],
                'phone': user['phone'],
                'first_name': user['first_name'],
                'last_name': user['last_name'],
                'created_at': user['created_at']
            }
        }), 200
    return jsonify({'error': 'User not found'}), 404

@app.route('/auth/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user = get_jwt_identity()
    data = request.get_json()

    users = load_users()
    if current_user not in users:
        return jsonify({'error': 'User not found'}), 404

    # Update allowed fields
    allowed_fields = ['first_name', 'last_name']
    for field in allowed_fields:
        if field in data:
            users[current_user][field] = data[field]

    save_users(users)

    return jsonify({
        'message': 'Profile updated successfully',
        'user': {
            'id': users[current_user]['id'],
            'email': users[current_user]['email'],
            'phone': users[current_user]['phone'],
            'first_name': users[current_user]['first_name'],
            'last_name': users[current_user]['last_name'],
            'created_at': users[current_user]['created_at']
        }
    }), 200

@app.route('/auth/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    current_user = get_jwt_identity()
    users = load_users()
    user = users.get(current_user)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get all users for admin stats (simplified - in production, check admin role)
    all_users = load_users()

    # Calculate analytics
    total_users = len(all_users)
    active_users = sum(1 for u in all_users.values() if u.get('analytics', {}).get('last_login'))

    # Login trends (last 7 days)
    login_trends = {}
    for u in all_users.values():
        history = u.get('analytics', {}).get('login_history', [])
        for login in history[-30:]:  # Last 30 logins
            date = login['timestamp'][:10]  # YYYY-MM-DD
            login_trends[date] = login_trends.get(date, 0) + 1

    # User-specific analytics
    user_analytics = user.get('analytics', {
        'login_count': 0,
        'last_login': None,
        'login_history': [],
        'total_alerts_viewed': 0,
        'total_clips_viewed': 0
    })

    return jsonify({
        'user_analytics': user_analytics,
        'global_analytics': {
            'total_users': total_users,
            'active_users': active_users,
            'login_trends': login_trends
        }
    }), 200

# --- Flask Routes ---

@app.route('/video_feed')
def video_feed():
    """Route for the video stream."""
    return Response(detect_and_stream(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/history_clips')
def list_clips():
    """
    Lists all saved video clips, providing a web-accessible URL for each.
    """
    clips_array = []
    
    if not os.path.exists(clip_save_dir):
        return jsonify([])

    files = sorted(
        [f for f in os.listdir(clip_save_dir) if f.endswith('.mp4')],
        key=lambda f: os.path.getmtime(os.path.join(clip_save_dir, f)),
        reverse=True
    )

    for filename in files:
        filepath = os.path.join(clip_save_dir, filename)
        timestamp = os.path.getmtime(filepath)

        # Check if thumbnail exists
        thumbnail_filename = f"{os.path.splitext(filename)[0]}_thumb.jpg"
        thumbnail_path = os.path.join(clip_save_dir, thumbnail_filename)
        thumbnail_url = f"/thumbnails/{thumbnail_filename}" if os.path.exists(thumbnail_path) else None

        clips_array.append({
            "id": filename,
            "filename": filename,
            "timestamp": datetime.datetime.fromtimestamp(timestamp).isoformat(),
            # This relative URL is used by the frontend to construct the full playable path.
            "url": f"/history_clips/{filename}",
            "thumbnail_url": thumbnail_url
        })
    return jsonify(clips_array)


@app.route("/set-detection-mode", methods=["POST"])
def set_detection_mode():
    global current_detection_mode
    global model, model_xgb
    data = request.json
    if current_detection_mode!=data.get("mode"):
     
      current_detection_mode = data.get("mode")

      print("Current Detection Mode:", current_detection_mode)
      if current_detection_mode=="Accident Detection":
        try:
           model = YOLO(r"C:\Users\Vansh Parmar\Documents\Guard_View\Backend\best3.pt")
           print("YOLO model loaded successfully.")
        except Exception as e:
           print(f"Error loading YOLO model: {e}")
           model = None

      elif current_detection_mode=="Violence Detection":
        try:
           model = YOLO(r"C:\Users\Vansh Parmar\Documents\Guard_View\Backend\violence.pt")
           print("YOLO model loaded successfully.")
        except Exception as e:
           print(f"Error loading YOLO model: {e}")
           model = None

      elif current_detection_mode=="Shoplifting Detection":
        try:
           model = YOLO(r"C:\Users\Vansh Parmar\Documents\Guard_View\Backend\Shoplifting.pt")
           print("YOLO model loaded successfully.")
        except Exception as e:
           print(f"Error loading YOLO model: {e}")
           model = None

    return jsonify({
        "status": "success",
        "mode": current_detection_mode
    })

    

@app.route('/alerts')
def get_alerts():
    global current_detection_mode
    """Gets alerts from the local log file."""
    
    BACKEND_URL = "http://localhost:5000"
    alerts = []
    try:
        with open("alert_log.json", "r") as f:
            lines = f.readlines()
            for line in reversed(lines):
                if line.strip():
                    alert = json.loads(line)
                    video_url = alert.get("video_url")
                    full_video_url = f"{BACKEND_URL}{video_url}" if video_url and not video_url.startswith("http") else video_url
                    alerts.append({
                        "timestamp": alert["time"],
                        "location": alert["location"],
                        "confidence": alert["confidence"],
                        "alerttype": alert["alerttype"],
                        "notified": True,
                        "video_url": full_video_url
                    })
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    return jsonify({"alerts": alerts})

# **RE-ENABLED:** This route is necessary for the frontend to fetch the video files.
@app.route('/history_clips/<path:filename>')
def stream_video(filename):
    """Serves a specific video clip file."""
    return send_from_directory(clip_save_dir, filename, mimetype='video/mp4')

@app.route('/thumbnails/<path:filename>')
def serve_thumbnail(filename):
    """Serves a specific thumbnail image."""
    return send_from_directory(clip_save_dir, filename, mimetype='image/jpeg')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

