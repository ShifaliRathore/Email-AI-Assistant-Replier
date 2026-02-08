console.log("Background service worker running");


const AI_ENDPOINT =
  "https://email-ai-backend-urf2.onrender.com/api/email/generate";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FETCH_AI_REPLY") {
    fetch(AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message.payload)
    })
      .then(res => res.text())
      .then(data => sendResponse({ success: true, data }))
      .catch(err =>
        sendResponse({ success: false, error: err.message })
      );

    return true; // IMPORTANT: keeps message channel open
  }
});
