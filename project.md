# *EyeView v2.2 - AI-Powered Surveillance System*

## *📋 Project Overview*

*EyeView* is a comprehensive AI-powered surveillance system designed for real-time violence detection and automated video recording. The system combines computer vision, machine learning, and web technologies to provide intelligent monitoring capabilities.

## *🏗 Architecture*

### *Backend (Python/Flask)*
- *Core Engine*: eye-view.py - Main surveillance server
- *AI Model*: YOLOv11n for violence detection
- *Video Processing*: OpenCV for real-time video analysis
- *Alert System*: Automated clip recording and Firebase cloud storage
- *API Endpoints*: RESTful APIs for frontend communication

### *Frontend (React/Vite)*
- *Modern UI*: React-based web interface with Tailwind CSS
- *Authentication*: JWT-based user management
- *Real-time Dashboard*: Live monitoring and alert visualization
- *Video Management*: History clips with thumbnail previews

## *🔧 Key Technologies*

| Component | Technology | Purpose |
|-----------|------------|---------|
| *AI/ML* | YOLOv11n, OpenCV | Violence detection & video processing |
| *Backend* | Flask, Python | Server & API endpoints |
| *Frontend* | React, Vite | Web interface |
| *Database* | Firebase Firestore | Cloud data storage |
| *Styling* | Tailwind CSS | Responsive UI design |
| *Video* | FFmpeg | Video encoding & thumbnails |
| *Auth* | JWT | Secure user authentication |

## *🎯 Core Features*

### *AI-Powered Detection*
- *Real-time Analysis*: Continuous video stream processing
- *Violence Detection*: YOLO model identifies violent activities
- *Automated Recording*: Instant clip capture when alerts trigger

### *Web Interface*
- *Dashboard*: Real-time monitoring with live statistics
- *Alert Management*: View and manage security alerts
- *Video History*: Browse recorded clips with thumbnails
- *User Authentication*: Secure login/signup system

### *Cloud Integration*
- *Firebase Storage*: Secure video clip storage
- *Real-time Sync*: Live data synchronization
- *Scalable Architecture*: Cloud-based infrastructure

## *📁 Project Structure*


EyeView_v2-2/
├── Backend/
│   ├── eye-view.py              # Main surveillance server
│   ├── eye-view-MSI.py          # MSI installer version
│   ├── requirements.txt         # Python dependencies
│   ├── best.pt                  # Trained YOLO model
│   ├── alert_log.json           # Alert history
│   ├── static/                  # Static assets
│   └── templates/               # HTML templates
├── EyeView-frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Application pages
│   │   └── assets/              # Static assets
│   ├── package.json             # Node dependencies
│   └── vite.config.js           # Build configuration
└── README.md                    # Project documentation


## *🚀 Recent Enhancements*

- ✅ *Video Thumbnails*: Automatic thumbnail generation for history clips
- ✅ *Improved UX*: Conditional navigation (sidebar for logged-in users)
- ✅ *Performance*: Optimized video loading and resource management
- ✅ *Error Handling*: Robust error states for corrupted videos
- ✅ *Responsive Design*: Mobile-friendly interface

## *🔄 Workflow*

1. *Video Input* → Camera feed or video stream
2. *AI Processing* → YOLO analyzes frames for violence
3. *Alert Trigger* → Detection → Video clip recording
4. *Storage* → Firebase cloud upload + local thumbnail generation
5. *Notification* → Real-time alerts to web dashboard
6. *User Access* → View alerts and history through web interface

## *🎯 Target Use Cases*

- *Security Monitoring*: Public spaces, workplaces, schools
- *Automated Surveillance*: 24/7 monitoring with intelligent alerts
- *Incident Recording*: Automatic evidence capture
- *Remote Management*: Web-based system control and viewing

*EyeView v2.2* represents a complete AI surveillance solution combining cutting-edge computer vision with modern web technologies for intelligent, automated security monitoring.