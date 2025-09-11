Email Writer Assistant — Gmail AI Reply
AI-powered Gmail reply assistant. Adds an “AI Reply” button next to Send, sends the selected or latest message content to your API, and inserts the generated reply into the compose box.

Not affiliated with Google.

Features

“AI Reply” button appears left of Send
Works in reply, new compose, and pop‑out windows
Calls your backend via POST /api/email/generate
Inserts the generated text into the compose editor
Project structure

extension/
manifest.json
content.js
content.css
icons/
server/
index.js (Express example)
package.json
.env.example (optional)
Local setup

Backend (dev)
cd server
npm install
node index.js (http://localhost:8080)
Make sure CORS allows origin https://mail.google.com
Extension (dev)
In extension/content.js set:
const AI_ENDPOINT = "http://localhost:8080/api/email/generate"
In extension/manifest.json set:
"host_permissions": ["http://localhost:8080/*"]
Load in Chrome:
chrome://extensions → Developer mode → Load unpacked → select extension/ folder
Open Gmail → compose/reply → click “AI Reply”
Deploy backend (quick)

Deploy server to Render/Vercel/Fly
Update AI_ENDPOINT and host_permissions to your live URL
Reload extension
Privacy

The extension may send selected/visible email text to your API to generate a reply.
No data is stored by the extension; server logging is under your control.

Notes
Don’t commit secrets (server/.env) or node_modules.
For non‑English Gmail, you may need to tweak the Send button selector in content.js.
