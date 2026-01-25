# 👁️ GuardView – Real-Time Violence Detection System

<div align="center">

![GuardView Logo](https://img.shields.io/badge/GuardView-AI%20Powered-blue?style=for-the-badge&logo=eye&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)]
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)]

**🚨 AI-powered real-time violence detection and alert system for public safety**

[🚀 Quick Start](#-run-locally) • [📁 Project Structure](#-project-structure) • [🎥 Demo](#-demo)

</div>

---

## 📌 Project Overview

**GuardView** is an AI-based surveillance system that detects violent or suspicious activities in live video feeds using deep learning.  
It automatically records incidents, sends instant alerts, and provides a web dashboard for monitoring.

This system is designed for:
- **Smart surveillance**
- **Campus & public safety**
- **Real-time threat detection**
- **Reduced manual CCTV monitoring**

---

## ✨ Features

- **Real-time violence detection** using YOLO
- **Automatic video clip recording** of detected incidents
- **Instant SMS / Call alerts** via Twilio
- **Incident storage** using Firebase
- **Live monitoring dashboard** built with React
- **Hardware Support:** Works with standard webcams and CCTV feeds

---

## 🎥 Demo

**Demo Video:** [Watch the Video Here](https://youtu.be/SgydOSFpxjg?si=CQxbtipdeUpr3Kmv)

---

## 📁 Project Structure

```text
📦 GuardView--AI-surveillance-system-
├── 🐍 Backend/
│   ├── eye-view.py          # Main Flask + YOLO detection file
│   ├── requirements.txt     # Python dependencies
│   ├── config/              # Configuration files
│   └── models/              # YOLO model weights
│
├── ⚛️ frontend/
│   ├── public/
│   │   ├── assets/          # Images & videos
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE
```
## 🔧 Environment Configuration

### 🐍 Backend Configuration (`Backend/.env`)

```bash
# 📞 Twilio Integration (SMS/Call Alerts)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890       # 📱 Twilio registered number
ADMIN_PHONE_NUMBER=+919876543210      # 🚨 Alert recipient number

# 🔥 Firebase Configuration
FIREBASE_CONFIG=your_firebase_config_json
FIREBASE_STORAGE_BUCKET=your_storage_bucket
```

### ⚛️ Frontend Configuration (`EyeView-frontend/.env`)

```bash
# 🔥 Firebase Web SDK Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# 🌐 API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000
```

---

## 🚀 Quick Start Guide

### 📥 Clone the Repository

```bash
git clone https://github.com/VANSHPAR/GuardView--AI-surveillance-system-
cd GuardView--AI-surveillance-system-
```

### 🐍 Backend Setup

```bash
# Navigate to backend directory
cd Backend

# (Optional) Check if Firebase credentials file exists
# Place your Firebase service account JSON here if used
ls

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
python eye-view
```

> 🟢 **Backend Status**: Server running on `http://localhost:5000`

### ⚛️ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
