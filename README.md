# Email AI Assistant Replier 📧✨

An AI-powered Gmail Chrome Extension that generates professional email replies using a Spring Boot backend and Google Gemini API.

---

## 🚀 Features

- One-click **AI Reply** button inside Gmail  
- Generates professional email responses using Gemini AI  
- Secure backend (API key stored in environment variables)  
- Chrome Extension + Spring Boot Backend  
- Public backend deployment  

---

## 🏗️ Project Structure

Email-AI-Assistant-Replier  
├── backend/  
├── email-writer-ext/  
└── README.md  

---

## 🧠 How It Works

1. User clicks **AI Reply** in Gmail  
2. Chrome extension sends request to backend  
3. Spring Boot backend calls Gemini API  
4. AI reply is injected into Gmail  

---

## 🛠️ Tech Stack

- Backend: Java, Spring Boot  
- AI: Google Gemini API  
- Frontend: Chrome Extension (Manifest V3)  
- Deployment: Render  

---

## 🌐 Backend API

**POST** `/api/email/generate`

Example request:
```json
{
  "emailContent": "Thank you for your message",
  "tone": "professional"
}
```

##🔐 Environment Variables
GEMINI_API_KEY=your_api_key_here


❌ Do NOT hardcode API keys

👩‍💻 Author

Shifali Rathore
Computer Science Engineering | Java & Spring Boot Developer
