chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "AI_REPLY") {
    fetch("http://localhost:8080/api/email/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailContent: request.emailContent,
        tone: request.tone
      })
    })
      .then(res => res.text())
      .then(reply => {
        sendResponse({ success: true, reply });
      })
      .catch(err => {
        sendResponse({ success: false, error: err.toString() });
      });

    return true; // IMPORTANT: keeps message channel open
  }
});
