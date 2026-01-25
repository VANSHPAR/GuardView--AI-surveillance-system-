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

**Demo Video:** [Watch the Video Here](https://youtu.be/YOUR_VIDEO_LINK)

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
├── ⚛️ GuardView-frontend/
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
