\# 👁️ GuardView – Real-Time Violence Detection System

!\[GuardView Logo\](https://img.shields.io/badge/GuardView-AI Powered-blue?style=for-the-badge&logo=eye&logoColor=white)

\[!\[License: MIT\](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)\](https://opensource.org/licenses/MIT)

\[!\[Python\](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)\]

\[!\[React\](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)\]

\[!\[Flask\](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)\]

\*\*🚨 AI-powered real-time violence detection and alert system for public safety\*\*

\[🚀 Quick Start\](#-run-locally) • \[📁 Project Structure\](#-project-structure) • \[🎥 Demo\](#-demo)

\---

\## 📌 Project Overview

\*\*GuardView\*\* is an AI-based surveillance system that detects violent or suspicious activities in live video feeds using deep learning.

It automatically records incidents, sends instant alerts, and provides a web dashboard for monitoring.

This system is designed for:

\- Smart surveillance

\- Campus & public safety

\- Real-time threat detection

\- Reduced manual CCTV monitoring

\---

\## ✨ Features

\- Real-time violence detection using \*\*YOLO\*\*

\- Automatic video clip recording

\- Instant SMS / Call alerts via \*\*Twilio\*\*

\- Incident storage using \*\*Firebase\*\*

\- Live monitoring dashboard (React)

\- Works with webcam / CCTV feeds

\---

\## 🎥 Demo

\*\*Demo Video:\*\*

https://youtu.be/YOUR\_VIDEO\_LINK

\*\*Dashboard Preview:\*\*

!\[GuardView Dashboard\](https://github.com/user-attachments/assets/e972cedb-4e5f-4952-8564-d9f4b8b6e050)

\---

\## 📁 Project Structure

📦 GuardView--AI-surveillance-system-

├── 🐍 Backend/

│ ├── eye-view.py # Main Flask + YOLO detection file

│ ├── requirements.txt # Python dependencies

│ ├── config/ # Configuration files

│ └── models/ # YOLO model weights

│

├── ⚛️ GuardView-frontend/

│ ├── public/

│ │ ├── assets/ # Images & videos

│ │ └── index.html

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ └── utils/

│ ├── .env

│ ├── package.json

│ └── vite.config.js

│

├── README.md

└── LICENSE

yaml

Copy code

\---

\## 🔧 Environment Configuration

\### Backend (\`Backend/.env\`)

TWILIO\_ACCOUNT\_SID=your\_twilio\_account\_sid

TWILIO\_AUTH\_TOKEN=your\_twilio\_auth\_token

TWILIO\_PHONE\_NUMBER=+1234567890

ADMIN\_PHONE\_NUMBER=+91XXXXXXXXXX

FIREBASE\_CONFIG=your\_firebase\_config\_json

FIREBASE\_STORAGE\_BUCKET=your\_storage\_bucket

shell

Copy code

\### Frontend (\`GuardView-frontend/.env\`)

REACT\_APP\_FIREBASE\_API\_KEY=your\_firebase\_api\_key

REACT\_APP\_FIREBASE\_AUTH\_DOMAIN=your\_project.firebaseapp.com

REACT\_APP\_FIREBASE\_PROJECT\_ID=your\_project\_id

REACT\_APP\_FIREBASE\_STORAGE\_BUCKET=your\_project.appspot.com

REACT\_APP\_FIREBASE\_MESSAGING\_SENDER\_ID=your\_sender\_id

REACT\_APP\_FIREBASE\_APP\_ID=your\_app\_id

REACT\_APP\_API\_BASE\_URL=http://localhost:5000

yaml

Copy code

\---

\## 🚀 Run Locally

\### 1️⃣ Clone Repository

git clone https://github.com/VANSHPAR/GuardView--AI-surveillance-system-

cd GuardView--AI-surveillance-system-

yaml

Copy code

\---

\### 2️⃣ Backend Setup

cd Backend

python -m venv venv

markdown

Copy code

\*\*Activate virtual environment\*\*

\*\*Windows\*\*

.\\venv\\Scripts\\activate

markdown

Copy code

\*\*Linux / macOS\*\*

source venv/bin/activate

arduino

Copy code

\*\*Install dependencies & run\*\*

pip install -r requirements.txt

python eye-view.py

yaml

Copy code

Backend runs at:

http://localhost:5000

yaml

Copy code

\---

\### 3️⃣ Frontend Setup

cd GuardView-frontend

npm install

npm run dev

yaml

Copy code

Frontend runs at:

http://localhost:5173

yaml

Copy code

\---

\## 🛠️ Tech Stack

\*\*Backend\*\*

\- Python

\- Flask

\- YOLO

\- OpenCV

\- Twilio

\- Firebase

\*\*Frontend\*\*

\- React

\- Vite

\- Tailwind CSS

\---

\## 📜 License

This project is licensed under the \*\*MIT License\*\*.

See the \`LICENSE\` file for more details.

\---

\## 🙏 Acknowledgments

\- YOLO for object detection

\- OpenCV community

\- Flask & React open-source ecosystem

\---

\*\*Built with ❤️ for safer public spaces\*\*
