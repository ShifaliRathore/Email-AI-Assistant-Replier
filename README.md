# Email AI Assistant Replier 📧✨

An AI-powered Gmail Chrome Extension that generates professional email replies using a Spring Boot backend and Google Gemini API.

---

## 🚀 Features

- ✨ One-click **AI Reply** button inside Gmail
- 🤖 Generates professional email responses using Gemini AI
- 🔒 Secure backend (API key stored in environment variables)
- 🧩 Chrome Extension + Spring Boot Backend (clean architecture)
- 🌍 Public backend deployment (anyone can use)

---

## 🏗️ Project Structure

Email-AI-Assistant-Replier
│
├── backend/ # Spring Boot backend
│ ├── pom.xml
│ ├── src/main/java
│ └── src/main/resources
│
├── email-writer-ext/ # Chrome Extension
│ ├── manifest.json
│ ├── content.js
│ ├── background.js
│ └── content.css
│
└── README.md

yaml

---

## 🧠 How It Works

1. User clicks **AI Reply** in Gmail
2. Chrome content script sends message to background service worker
3. Background script calls Spring Boot API
4. Spring Boot backend calls Google Gemini API
5. AI-generated reply is inserted into Gmail compose box

---

## 🛠️ Tech Stack

- **Backend:** Java, Spring Boot, WebClient
- **AI:** Google Gemini API
- **Frontend:** Chrome Extension (Manifest V3)
- **Deployment:** Render (Free Tier)

---

## 🌐 Live Backend API

POST /api/email/generate

Request body:
```json
{
  "emailContent": "Thank you for your message",
  "tone": "professional"
}

---
🧪 Local Setup (Backend)
cd backend
mvn clean package
java -jar target/*.jar

🧩 Chrome Extension Setup

Open Chrome → chrome://extensions

Enable Developer mode

Click Load unpacked

Select email-writer-ext folder

Open Gmail and click AI Reply

🔐 Environment Variables

Backend requires:
GEMINI_API_KEY=your_api_key_here

(Do NOT hardcode API keys)

👩‍💻 Author

Shifali Rathore
Computer Science Engineering | Java & Spring Boot Developer

⭐ If you like this project

Give it a ⭐ on GitHub 🙂

---

## ✅ STEP 3: SAVE & PUSH README

In terminal:

```bash
git add README.md
git commit -m "Add project README"
git push


