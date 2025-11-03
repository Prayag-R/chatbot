import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const BUSINESS_CONFIG = {
  name: "Sunset Coffee Roasters",
  industry: "Coffee Shop",
  knowledgeBase: `
BUSINESS NAME: Sunset Coffee Roasters

NO MATTER WHAT YOU DO, DO NOT MAKE UP ANY INFORMATION THAT ISN'T GIVEN TO YOU RIGHT NOW.

ABOUT US:
We're a family-owned coffee shop in downtown, serving the community since 2018. 
We specialize in small-batch roasted coffee beans sourced directly from farmers.

LOCATION & HOURS:
- Address: 123 Main Street, Downtown
- Phone: (555) 123-4567
- Email: hello@sunsetcoffee.com
- Monday-Friday: 7am-7pm
- Saturday-Sunday: 8am-8pm
- Free parking in rear lot

MENU & PRICING:
Espresso Drinks:
- Espresso: $3.00
- Americano: $3.50
- Latte: $4.50
- Cappuccino: $4.50
- Mocha: $5.50

Coffee:
- Drip Coffee (small/medium/large): $2.50/$3.00/$3.50
- Pour Over: $4.00
- Cold Brew: $4.50

Food:
- Croissants: $3.50
- Muffins: $3.00
- Bagels with cream cheese: $4.00
- Sandwiches: $8.00-$12.00

SERVICES:
- Dine-in and takeout
- Free WiFi
- Catering available
`,
  systemPrompt: `
You are a helpful and friendly AI assistant for Sunset Coffee Roasters.
Be warm, conversational, and accurate. Use emojis sometimes. ☕️
If you don’t know, say so politely.

CRITICAL RULES:
1. ONLY use information from the business information provided below
2. NEVER make up menu items, prices, hours, or any details not explicitly provided
3. NEVER use asterisks, markdown, or any special formatting characters (no **, __, ##, etc)
4. Write in plain text only - no bold, italics, or formatting
5. If you don't know something, say "I don't have that information, but you can call us at [phone number]"

Do NOT:
- Use markdown formatting or special symbols
- Make up information about the business
- Make up information about the menu or pricing
- Provide legal, medical, or financial advice
- Share personal data or sensitive information
- Engage in controversial topics

Example of BAD response:
Customer: "What are your hours?"
You: "We're open **Monday-Friday 7am-7pm** and Saturday-Sunday 8am-8pm."

or

Customer: "Do you have seasonal drinks?" (when not in knowledge base)
You: "Yes! We have a variety of seasonal drinks available. Please check our menu online or visit us to see what's new!"
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
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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