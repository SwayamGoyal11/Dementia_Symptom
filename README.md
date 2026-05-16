# CogniGuard - AI-Powered Cybersecurity Platform

CogniGuard is a modern, full-stack, AI-driven cybersecurity awareness and phishing detection platform. It helps users detect phishing attempts, suspicious URLs, scam emails, malicious QR codes, and social engineering attacks, while featuring a premium SaaS dark-mode aesthetic with neon cyber gradients.

## 🚀 Features

- **Dashboard**: Real-time analytics, risk scores, and threat activity timelines.
- **URL Phishing Detector**: AI-simulated analysis of URLs with detailed threat indicators.
- **Email Phishing Detector**: NLP-simulated scanning of text for social engineering patterns.
- **QR Code Scanner**: Decode and analyze hidden URLs before scanning on your phone.
- **Global Threat Feed**: Live intelligence feed showing active cyber attacks worldwide.
- **Awareness Training**: Educational modules and quizzes.
- **AI Chatbot**: A virtual cybersecurity assistant to answer queries.
- **Modern UI**: Built with React, Tailwind CSS, Framer Motion, and Recharts.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React
- **Backend**: Node.js, Express, MongoDB, JWT Auth
- **Environment**: Local Windows setup via VS Code

---

## ⚙️ Setup Instructions

Follow these instructions to run the application locally in VS Code on your Windows laptop.

### Prerequisites
- Node.js installed (v18 or higher recommended)
- MongoDB installed locally OR a MongoDB Atlas connection string. (The app defaults to `mongodb://127.0.0.1:27017/cogniguard`).

### 1. Clone/Navigate to the Directory
Ensure you are in the `CogniGuard` root directory.

### 2. Backend Setup
1. Open a new terminal in VS Code.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   *The server should run on `http://localhost:5000` and connect to MongoDB.*

### 3. Frontend Setup
1. Open a **second** terminal in VS Code.
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend should run on `http://localhost:5173`.*

### 4. Open the App
Hold `Ctrl` and click the local link shown in the Vite terminal (e.g., `http://localhost:5173`) to open CogniGuard in your browser.

---

## 📁 Folder Structure

```
CogniGuard/
├── backend/
│   ├── controllers/      # Route logic
│   ├── middleware/       # JWT Auth verification
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express API endpoints
│   ├── utils/            # AI simulation logic
│   ├── .env              # Environment Variables
│   └── server.js         # Entry point
└── frontend/
    ├── src/
    │   ├── components/   # Navbar, Sidebar, Layout
    │   ├── pages/        # Home, Dashboard, Scanners, Chatbot, etc.
    │   ├── App.jsx       # Routing
    │   └── index.css     # Tailwind custom CSS
    ├── tailwind.config.js
    └── package.json
```

---

## 🔒 Dummy Data & AI
The platform utilizes simulated "mock AI" logic in both the frontend (timeout-based threat score calculation) and the backend (`utils/aiSimulator.js`) to evaluate URLs and Emails, delivering a production-like demonstration of its capabilities.

Enjoy using CogniGuard! Stay safe out there.
