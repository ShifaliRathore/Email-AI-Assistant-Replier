// api/email/generate.js
export default async function handler(req, res) {
  // CORS for Gmail
  res.setHeader("Access-Control-Allow-Origin", "https://mail.google.com");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    // Parse JSON body (Vercel Node function: manual parse)
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const bodyStr = Buffer.concat(chunks).toString() || "{}";
    const { emailContent, tone = "professional" } = JSON.parse(bodyStr);

    // TODO: call your real LLM here and return its text
    const reply =
      `Thanks for your email.\n\n` +
      `(Generated in a ${tone} tone)\n\n` +
      `Context:\n${emailContent || "(no content)"}`;

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ reply }));
  } catch (err) {
    res.status(500).json({ error: "Server error", details: String(err) });
  }
}
