# 📧 Email AI Assistant Replier (Chrome Extension + Spring Boot)

An **AI-powered Gmail Chrome Extension** that generates professional email replies using a **Spring Boot backend** integrated with the **Google Gemini API**.  
Built with real-world architecture, secure API handling, and live backend deployment.

---

## ✨ Key Features

- 🧠 One-click **AI Reply** button directly inside Gmail  
- ✍️ Generates professional email responses using Gemini AI  
- 🔐 Secure backend (API keys stored in environment variables)  
- 🧩 Proper Chrome Extension architecture (Content Script + Background Service Worker)  
- ☁️ Live backend deployed on Render  
- ⚙️ Production-style setup using Docker and REST APIs  

---

## 🏗️ Project Structure


Email-AI-Assistant-Replier
├── backend/ # Spring Boot backend (Dockerized)
│ ├── src/
│ ├── Dockerfile
│ └── pom.xml
│
├── email-writer-ext/ # Chrome Extension
│ ├── manifest.json
│ ├── content.js
│ ├── background.js
│ └── content.css
│
└── README.md




---

---

## 🧠 How It Works

1. User clicks **AI Reply** inside Gmail  
2. Gmail content script sends request to background service worker  
3. Background worker securely calls the Spring Boot backend  
4. Backend sends prompt to Google Gemini API  
5. AI-generated reply is injected back into Gmail  

This design follows Chrome Extension security best practices.

---

## 🛠️ Tech Stack

### Backend
- Java  
- Spring Boot  
- REST API  
- Docker  

### AI
- Google Gemini API  

### Frontend
- Chrome Extension (Manifest V3)  
- JavaScript, HTML, CSS  

### Deployment
- Render (Docker-based deployment)

---

## 🌐 Live Backend API

**Endpoint**
POST /api/email/generate


**Live URL**
https://email-ai-backend-urf2.onrender.com/api/email/generate


**Sample Request**
```json
{
  "emailContent": "Thank you for reaching out. Let’s schedule a meeting.",
  "tone": "professional"
}
 
Sample Response
Sure! Here’s a professional reply you can use...


🔐 Environment Variables
Set the following environment variable in your deployment platform:
GEMINI_API_KEY=your_api_key_here
❌ Never hardcode API keys in source code.

🚀 How to Run Locally
Backend
cd backend
mvn clean spring-boot:run

Chrome Extension

Open chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the email-writer-ext folder

Open Gmail and start generating AI replies 🚀

👩‍💻 Author

Shifali Rathore
Computer Science Engineering
Java • Spring Boot • Backend Development

⭐ Project Highlights

Real-world Chrome Extension security handling

AI integration using Google Gemini

Dockerized backend with cloud deployment

End-to-end full-stack implementation






