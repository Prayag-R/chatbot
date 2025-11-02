import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const BUSINESS_CONFIG = {
  name: "Sunset Coffee Roasters",
  industry: "Coffee Shop",
  knowledgeBase: `
We're a family-owned coffee shop in downtown, serving the community since 2018. 
We specialize in small-batch roasted coffee beans sourced directly from farmers.
`,
  systemPrompt: `
You are a helpful and friendly AI assistant for Sunset Coffee Roasters.
Be warm, conversational, and accurate. Use emojis sometimes. ☕️
If you don’t know, say so politely.
`
};

const conversationContexts = new Map();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId)
      return res.status(400).json({ error: "Missing message or sessionId" });

    if (!conversationContexts.has(sessionId)) {
      conversationContexts.set(sessionId, { history: [], initialized: false });
    }

    const context = conversationContexts.get(sessionId);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt;
    if (!context.initialized) {
      prompt = `${BUSINESS_CONFIG.systemPrompt}\n\nBusiness info:\n${BUSINESS_CONFIG.knowledgeBase}\n\nUser: ${message}`;
      context.initialized = true;
    } else {
      prompt = message;
    }

    const chat = model.startChat({
      history: context.history.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response.text();

    context.history.push({ role: "user", content: message });
    context.history.push({ role: "assistant", content: response });

    res.status(200).json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}