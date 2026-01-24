# 👁️ GuardView – Real-Time Violence Detection System

> **Note:** This project is submitted as a **Midway Project** and is currently under active development.
  <p align="center">
  <img src="./work.gif" alt="GuardView Demo" width="600">
</p>

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
│   ├── eye-view.py          # Flask backend & detection logic
│   ├── requirements.txt     # Python dependencies
│   └── models/              # YOLO model files
│
├── EyeView-frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE
