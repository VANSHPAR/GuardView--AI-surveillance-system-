
# EyeView – Real-time Violence Detection System

EyeView is an AI-powered real-time violence detection and alert system designed to enhance public safety.
It leverages a YOLO deep learning model integrated with Flask (backend) and a React (frontend) dashboard to analyze live video streams, detect violent activity, and respond instantly.


## Features

When suspicious activity is detected:

* The system records and stores a short clip in Firebase for evidence.

* Instant alerts (SMS/Calls) are sent via Twilio to authorities or admins.

* A web dashboard allows users to monitor live feeds, review incident history, and manage alerts in real time.

EyeView is optimized for lag-free high-resolution detection, supports mobile camera feeds, and is designed for smart surveillance, smart cities, and public safety solutions.

## Folder Structure


```bash
 │── Backend/ # Flask backend (YOLO + Twilio + Firebase)
│ ├── eye-view.py
│ ├── requirements.txt
│ └── ...
│
│── EyeView-frontend/ # React frontend (Vite + Tailwind)
│ ├── public/
│ ├── src/
│ ├── .env
│ ├── package.json
│ ├── vite.config.js
│ ├── tailwind.config.js
│ └── ...
│
└── README.md # Root documentation (this file)
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend (Backend/.env)
#### Twilio (for SMS/Call alerts)
`TWILIO_ACCOUNT_SID=your_twilio_account_sid`

`TWILIO_AUTH_TOKEN=your_twilio_auth_token`

`TWILIO_PHONE_NUMBER=+1234567890`       # Twilio registered number

`ADMIN_PHONE_NUMBER=+919876543210`      # Phone number to receive alerts

### Frontend (EyeView-frontend/.env)
#### Firebase Web Config
`REACT_APP_FIREBASE_API_KEY=your_firebase_api_key`

`REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com`

`REACT_APP_FIREBASE_PROJECT_ID=your_project_id`

`REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id`


## Run Locally

Clone the project

```bash
  https://github.com/sahilhinge89/EyeView_v2.git
```

* For backend server set up

```bash
  cd Backend 
```

* Install dependencies

```bash
# Create the venv
python -m venv venv

```
* Activation on Windows/macOS/Linux  
```bash
# Activate on Windows PowerShell
.\venv\Scripts\activate

# Activate on macOS/Linux
# source venv/bin/activate
```
* Start the backend server

```bash
  python eye-view.py
```
* For frontend server set up
 
```bash
cd EyeView-frontend
npm install
npm run dev

```