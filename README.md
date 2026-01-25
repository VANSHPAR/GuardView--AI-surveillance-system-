# 👁️ GuardView – Real-Time Violence Detection

<div align="center">
  <img src="https://img.shields.io/badge/GuardView-AI%20Powered-blue?style=for-the-badge&logo=eye&logoColor=white" alt="GuardView">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  
  **AI-powered real-time violence detection & alert system**
</div>

---

GuardView detects violent behavior in live video using YOLO, records clips, sends instant alerts (Twilio), stores incidents (Firebase), and shows a live dashboard (React).

Ideal for campuses, public spaces, smart surveillance.

### ✨ Features
- Real-time violence detection (YOLO)
- Automatic incident video recording
- SMS/call alerts via Twilio
- Firebase storage & logging
- Modern React dashboard
- Webcam / RTSP / CCTV support

### Demo
**Video:** https://youtu.be/YOUR_VIDEO_LINK  
**Dashboard:**  
![Dashboard](https://github.com/user-attachments/assets/e972cedb-4e5f-4952-8564-d9f4b8b6e050)

### Quick Start

```bash
git clone https://github.com/VANSHPAR/GuardView--AI-surveillance-system-.git
cd GuardView--AI-surveillance-system-

# ─── Backend ───
cd Backend
python -m venv venv
source venv/bin/activate    # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python eye-view.py          # → http://localhost:5000

# ─── Frontend (new terminal) ───
cd ../GuardView-frontend
npm install
npm run dev                 # → http://localhost:5173
