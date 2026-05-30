# CogniGuard - Digital Dementia Research Platform

CogniGuard is a modern, full-stack, AI-driven health-tech research platform focused on the Early Detection of Digital Dementia Risk in young adults. It is designed to be a non-clinical preventive research tool that evaluates digital device usage, cognitive strain, and stress indicators to estimate potential early-stage digital cognitive overload patterns.

## 🚀 Features

- **Multi-Step Digital Wellness Assessment**: An intuitive, research-style UI evaluating digital usage, stress, and cognitive strain using interactive Likert scales.
- **AI Risk Analysis Engine**: Calculates a Digital Overload Index, Stress Index, and Cognitive Impact Index to determine an overall risk category.
- **Results Dashboard**: Premium visualizations using Recharts (Radar, Bar, and Line charts) to present assessment results clearly.
- **Personalized Recommendations**: An AI engine that generates priority-based, evidence-backed wellness recommendations (e.g., Digital detox, Pomodoro focus blocks).
- **Research Admin Panel**: A high-level overview of anonymized participant data, demographics, and risk distribution for academic and clinical research purposes.
- **Privacy-First Architecture**: Ethical AI design built for health-tech showcases and hackathons.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React
- **Backend**: Node.js, Express, file-backed JSON storage, JWT Auth
- **Environment**: Local Windows setup via VS Code

---

## ⚙️ Setup Instructions

Follow these instructions to run the application locally in VS Code on your Windows laptop.

### Prerequisites
- Node.js installed (v18 or higher recommended)

### 1. Backend Setup
1. Open a new terminal in VS Code.
2. Navigate to the backend folder:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the backend server:
   ```
   npm run server
   ```
   *The server should run on `http://localhost:5000` without any external database setup.*

### 2. Frontend Setup
1. Open a **second** terminal in VS Code.
2. Navigate to the frontend folder:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the frontend development server:
   ```
   npm run dev
   ```
   *The frontend should run on `http://localhost:5173`.*

### 3. Open the App
Hold `Ctrl` and click the local link shown in the Vite terminal (e.g., `http://localhost:5173`) to open CogniGuard in your browser.

---

## 🔒 Research Disclaimer
This platform is intended for educational and research purposes only. It is not a medical diagnostic tool.

Enjoy exploring CogniGuard's health-tech research environment!
