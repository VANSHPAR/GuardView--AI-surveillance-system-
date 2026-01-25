# 👁️ GuardView – Real-Time Violence Detection System



## 📌 Overview

**GuardView** is an AI-powered surveillance system designed to detect violent activities in real-time. By leveraging computer vision and deep learning, the system captures live video feeds, processes them to identify potential threats, and alerts users via a web interface.

## 🎯 Objective

To assist security personnel and surveillance systems by automatically detecting violent behavior in live video feeds, thereby reducing the reliance on constant manual monitoring and improving reaction times.

## 🧠 System Description

1.  **Input:** Live video is captured using a webcam or CCTV feed.
2.  **Processing:** Frames are extracted and processed using a **YOLO** deep learning model.
3.  **Detection:** The model analyzes the frames for violent behavior.
4.  **Visualization:** Detected threats are highlighted with bounding boxes on the video stream.
5.  **Output:** The processed stream and alerts are displayed on a **React-based** web dashboard.


---

## 🛠️ Technologies Used

### Backend
* **Python:** Core programming language

* **Flask:** Web server for streaming video to the frontend

* **OpenCV:** Image processing and frame capture

* **YOLO:** Deep learning model for object/action detection


### Frontend
* **React (Vite):** Fast, modern frontend framework
* **HTML/CSS/JS:** UI/UX structure and styling

---

## 📁 Project Structure

```bash
GuardView/
├── Backend/
│   ├── Guardview.py          # Flask backend & detection logic
│   └── best1.pt
│   ├── requirements.txt     # Python dependencies
│   └── models/              # YOLO model files
│   └── models/ 
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── README.md

## 🚀 Quick Start Guide

### 📥 Clone the Repository

```bash
git clone https://github.com/sahilhinge89/EyeView_v2.git
cd EyeView_v2
```

### 🐍 Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Ensure Firebase credentials file is present
# The file 'eyeview-v2-firebase-adminsdk-fbsvc-a1600b8e74.json' should be in this directory
ls eyeview-v2-firebase-adminsdk-fbsvc-a1600b8e74.json

# Create virtual environment
python -m venv venv
```

**🔄 Activate Virtual Environment:**

<details>
<summary>💻 Windows (PowerShell)</summary>

```bash
.\venv\Scripts\activate
```

</details>

<details>
<summary>🐧 macOS/Linux</summary>

```bash
source venv/bin/activate
```

</details>

**📦 Install Dependencies & Run:**

```bash
# Install required packages
pip install -r requirements.txt

# Start the backend server
python eye-view.py
```

> 🟢 **Backend Status**: Server running on `http://localhost:5000`

### ⚛️ Frontend Setup

```bash
# Navigate to frontend directory
cd EyeView-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

