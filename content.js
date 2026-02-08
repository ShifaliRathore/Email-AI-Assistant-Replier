
/*
console.log("Email writer extension - content script Loaded");

// Your backend endpoint
const AI_ENDPOINT = "http://localhost:8080/api/email/generate";

// Robust selectors
const SEND_BUTTON_SELECTOR = `
  div[role="button"][data-tooltip*="Send"],
  div[role="button"][aria-label^="Send"]
`;

const COMPOSE_BODY_SELECTOR = `
  div[aria-label="Message Body"][contenteditable="true"],
  div[role="textbox"][g_editable="true"]
`;

const AI_BTN_CLASS = "ai-reply-button";
const PLACEHOLDER = "✨ AI is writing a reply…";

// Create AI button node
function createAiButton() {
  const btn = document.createElement("div");
  btn.className = AI_BTN_CLASS;
  btn.setAttribute("role", "button");
  btn.setAttribute("tabindex", "0");
  btn.setAttribute("title", "Generate AI reply");
  btn.textContent = "AI Reply";
  return btn;
}

// Locate the compose body that belongs to the same compose as this send button
function findBodyFromSend(sendBtn) {
  let node = sendBtn;
  for (let i = 0; node && i < 12; i++) {
    const body = node.querySelector?.(COMPOSE_BODY_SELECTOR);
    if (body) return body;
    node = node.parentElement;
  }
  // Fallback: first visible compose body
  return document.querySelector(COMPOSE_BODY_SELECTOR);
}

// Try to capture the email content you're replying to
function getEmailContent() {
  // If user selected text, prefer that
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed) {
    const text = sel.toString().trim();
    if (text) return text;
  }

  // Otherwise, grab the last visible message body in the thread
  const candidates = Array.from(
    document.querySelectorAll(".a3s.aiL, .gmail_quote, blockquote.gmail_quote")
  ).filter(el => el.offsetParent !== null);

  const last = candidates[candidates.length - 1];
  if (last) {
    return last.innerText.trim();
  }

  return "";
}

// Insert text at cursor in the compose body
function insertText(editable, text) {
  editable.focus();
  // execCommand is deprecated, but still the most reliable in Gmail compose
  document.execCommand("insertText", false, text);
}

// Replace a placeholder we previously inserted
function replacePlaceholder(editable, placeholder, replacement) {
  const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const n of nodes) {
    const idx = n.nodeValue.indexOf(placeholder);
    if (idx !== -1) {
      n.nodeValue = n.nodeValue.replace(placeholder, replacement);
      return true;
    }
  }
  return false;
}

// Call your backend. Accepts both JSON and text responses.
async function fetchAiReply(emailContent) {
  const res = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailContent,
      tone: "professional"
    })
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`AI endpoint error ${res.status}: ${msg}`);
  }

  const ctype = res.headers.get("content-type") || "";
  if (ctype.includes("application/json")) {
    const data = await res.json();
    // Try common fields
    return (
      data.reply ||
      data.text ||
      data.choices?.[0]?.message?.content ||
      JSON.stringify(data)
    );
  }
  return await res.text();
}

// Inject an AI button immediately before each Send button (once)
function injectButtons() {
  document.querySelectorAll(SEND_BUTTON_SELECTOR).forEach(sendBtn => {
    if (!sendBtn?.parentElement) return;

    const prev = sendBtn.previousElementSibling;
    if (prev && prev.classList?.contains(AI_BTN_CLASS)) return; // already added

    const aiBtn = createAiButton();
    sendBtn.parentElement.insertBefore(aiBtn, sendBtn); // place left of Send
  });
}

// Handle clicks via event delegation so it survives DOM changes
document.addEventListener("click", async (e) => {
  const aiBtn = e.target.closest("." + AI_BTN_CLASS);
  if (!aiBtn) return;

  e.preventDefault();
  e.stopPropagation();

  // The next sibling is the Send button we inserted next to
  const sendBtn = aiBtn.nextElementSibling;
  const body = sendBtn ? findBodyFromSend(sendBtn) : document.querySelector(COMPOSE_BODY_SELECTOR);

  if (!body) {
    console.warn("AI: compose body not found.");
    return;
  }

  // Gather context to send to your model
  const emailContent = getEmailContent();

  // UI: show loading and insert a placeholder
  aiBtn.setAttribute("aria-busy", "true");
  const needsNewLine = body.innerText.trim().length > 0;
  insertText(body, (needsNewLine ? "\n\n" : "") + PLACEHOLDER);

  try {
    const aiReply = await fetchAiReply(emailContent);
    if (!replacePlaceholder(body, PLACEHOLDER, aiReply || "AI did not return any text.")) {
      // Fallback if placeholder not found
      insertText(body, "\n\n" + (aiReply || "AI did not return any text."));
    }
  } catch (err) {
    console.error(err);
    replacePlaceholder(body, PLACEHOLDER, "AI request failed. See console for details.");
  } finally {
    aiBtn.removeAttribute("aria-busy");
  }
});

// Watch for compose/reply areas being created or re-rendered
const observer = new MutationObserver(() => {
  injectButtons();
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// Initial pass
injectButtons();

*/


console.log("Email writer extension - content script Loaded");

/* =======================
   Selectors & Constants
======================= */

const SEND_BUTTON_SELECTOR = `
  div[role="button"][data-tooltip*="Send"],
  div[role="button"][aria-label^="Send"]
`;

const COMPOSE_BODY_SELECTOR = `
  div[aria-label="Message Body"][contenteditable="true"],
  div[role="textbox"][g_editable="true"]
`;

const AI_BTN_CLASS = "ai-reply-button";
const PLACEHOLDER = "✨ AI is writing a reply…";

/* =======================
   UI Helpers
======================= */

// Create AI Reply button
function createAiButton() {
  const btn = document.createElement("div");
  btn.className = AI_BTN_CLASS;
  btn.setAttribute("role", "button");
  btn.setAttribute("tabindex", "0");
  btn.setAttribute("title", "Generate AI reply");
  btn.textContent = "AI Reply";
  return btn;
}

// Find compose body related to Send button
function findBodyFromSend(sendBtn) {
  let node = sendBtn;
  for (let i = 0; node && i < 12; i++) {
    const body = node.querySelector?.(COMPOSE_BODY_SELECTOR);
    if (body) return body;
    node = node.parentElement;
  }
  return document.querySelector(COMPOSE_BODY_SELECTOR);
}

// Insert text at cursor
function insertText(editable, text) {
  editable.focus();
  document.execCommand("insertText", false, text);
}

// Replace placeholder text with AI response
function replacePlaceholder(editable, placeholder, replacement) {
  const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const n of nodes) {
    const idx = n.nodeValue.indexOf(placeholder);
    if (idx !== -1) {
      n.nodeValue = n.nodeValue.replace(placeholder, replacement);
      return true;
    }
  }
  return false;
}

/* =======================
   Email Context
======================= */

// Extract email content user is replying to
function getEmailContent() {
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed) {
    const text = sel.toString().trim();
    if (text) return text;
  }

  const candidates = Array.from(
    document.querySelectorAll(".a3s.aiL, .gmail_quote, blockquote.gmail_quote")
  ).filter(el => el.offsetParent !== null);

  const last = candidates[candidates.length - 1];
  return last ? last.innerText.trim() : "";
}

/* =======================
   BACKGROUND API CALL
   (IMPORTANT PART)
======================= */

function fetchAiReply(emailContent) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type: "AI_REPLY",
        emailContent: emailContent,
        tone: "professional"
      },
      (response) => {
        if (response && response.success) {
          resolve(response.reply);
        } else {
          reject(response?.error || "AI request failed");
        }
      }
    );
  });
}

/* =======================
   Inject AI Button
======================= */

function injectButtons() {
  document.querySelectorAll(SEND_BUTTON_SELECTOR).forEach(sendBtn => {
    if (!sendBtn?.parentElement) return;

    const prev = sendBtn.previousElementSibling;
    if (prev && prev.classList?.contains(AI_BTN_CLASS)) return;

    const aiBtn = createAiButton();
    sendBtn.parentElement.insertBefore(aiBtn, sendBtn);
  });
}

/* =======================
   Click Handler
======================= */

document.addEventListener("click", async (e) => {
  const aiBtn = e.target.closest("." + AI_BTN_CLASS);
  if (!aiBtn) return;

  e.preventDefault();
  e.stopPropagation();

  const sendBtn = aiBtn.nextElementSibling;
  const body = sendBtn
    ? findBodyFromSend(sendBtn)
    : document.querySelector(COMPOSE_BODY_SELECTOR);

  if (!body) {
    console.warn("AI: compose body not found.");
    return;
  }

  const emailContent = getEmailContent();

  aiBtn.setAttribute("aria-busy", "true");
  const needsNewLine = body.innerText.trim().length > 0;
  insertText(body, (needsNewLine ? "\n\n" : "") + PLACEHOLDER);

  try {
    const aiReply = await fetchAiReply(emailContent);
    if (!replacePlaceholder(body, PLACEHOLDER, aiReply)) {
      insertText(body, "\n\n" + aiReply);
    }
  } catch (err) {
    console.error(err);
    replacePlaceholder(
      body,
      PLACEHOLDER,
      "❌ AI request failed. Check console."
    );
  } finally {
    aiBtn.removeAttribute("aria-busy");
  }
});

/* =======================
   Observe Gmail DOM
======================= */

const observer = new MutationObserver(() => {
  injectButtons();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

// Initial load
injectButtons();
