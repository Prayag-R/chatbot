// server.js - Backend server for AI Chatbot Demo
// Run with: node server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// CONFIGURATION - CUSTOMIZE FOR EACH BUSINESS
// ============================================

const BUSINESS_CONFIG = {
  name: "Sunset Coffee Roasters",
  industry: "Coffee Shop",
  
  // This is the business knowledge that trains the AI
  knowledgeBase: `
BUSINESS NAME: Sunset Coffee Roasters

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
- Drip Coffee (12oz/16oz/20oz): $2.50/$3.00/$3.50
- Pour Over: $4.00
- Cold Brew: $4.50

Food:
- Croissants: $3.50
- Muffins: $3.00
- Bagels with cream cheese: $4.00
- Sandwiches: $8.00-$12.00
- Salads: $9.00-$11.00

SPECIALTY:
- We roast our own beans weekly in small batches
- Single-origin beans from Ethiopia, Colombia, Guatemala
- Whole bean sales: $16-$20 per 12oz bag
- Custom grinding available

SERVICES:
- Dine-in and takeout
- Free high-speed WiFi
- Catering for events (minimum 10 people)
- Private event space (seats 25)
- Coffee subscriptions available
- Barista training classes monthly

POLICIES:
- Outside food not permitted
- Well-behaved pets welcome on patio
- Group reservations available for 8+ people (call ahead)
- Gift cards available

ALLERGEN INFO:
- All milk alternatives available (oat, almond, soy)
- Gluten-free pastries available
- Vegan options marked on menu

PAYMENT:
- We accept cash, credit cards, Apple Pay, Google Pay
- No minimum purchase required
`,

  // AI personality and behavior
  systemPrompt: `You are a helpful and friendly AI assistant for Sunset Coffee Roasters. 

Your role:
- Answer customer questions about the business accurately using the provided information
- Be warm, conversational, and helpful
- If asked about something not in the knowledge base, politely say you don't have that information
- Keep responses concise but complete (2-4 sentences typically)
- Use emojis occasionally to be friendly (☕️ 😊)
- For hours, menu items, or specific details, be precise
- Encourage customers to visit, call, or email for complex requests

Tone: Friendly, professional, enthusiastic about coffee

Do NOT:
- Make up information not provided in the knowledge base
- Provide false or misleading information
- Make up promotions or discounts
- Make up any more information than given to you
- Give medical or legal advice
- Discuss competitors
- Share opinions on controversial topics
- Engage in personal conversations beyond business context
- Use Markdown or special formatting in responses
`
};

// ============================================
// GEMINI API SETUP
// ============================================

// IMPORTANT: Replace with your actual Gemini API key
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Store conversation contexts (in production, use Redis or database)
const conversationContexts = new Map();

// ============================================
// CHAT ENDPOINT
// ============================================

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, conversationHistory } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId required' });
    }

    // Initialize or get existing conversation context
    if (!conversationContexts.has(sessionId)) {
      conversationContexts.set(sessionId, {
        initialized: false,
        history: []
      });
    }

    const context = conversationContexts.get(sessionId);

    // Build the conversation for Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    let prompt;
    
    // First message: Include full business knowledge
    if (!context.initialized) {
      prompt = `${BUSINESS_CONFIG.systemPrompt}

BUSINESS INFORMATION:
${BUSINESS_CONFIG.knowledgeBase}

Now answer this customer question: ${message}`;
      context.initialized = true;
    } else {
      // Subsequent messages: Just the question (context maintained by conversation history)
      prompt = message;
    }

    // Add to history
    context.history.push({ role: 'user', content: message });

    // Get AI response
    const chat = model.startChat({
      history: context.history.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response.text();

    // Add assistant response to history
    context.history.push({ role: 'assistant', content: response });

    // Keep only last 20 messages to avoid token limits
    if (context.history.length > 20) {
      context.history = context.history.slice(-20);
    }

    res.json({ response });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
});

// ============================================
// HEALTH CHECK & INFO ENDPOINTS
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    business: BUSINESS_CONFIG.name,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    businessName: BUSINESS_CONFIG.name,
    industry: BUSINESS_CONFIG.industry
  });
});

// Clear old sessions every hour
setInterval(() => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const [sessionId, context] of conversationContexts.entries()) {
    if (context.lastActivity < oneHourAgo) {
      conversationContexts.delete(sessionId);
    }
  }
}, 60 * 60 * 1000);

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Chatbot backend running on http://localhost:${PORT}`);
  console.log(`📊 Business: ${BUSINESS_CONFIG.name}`);
  console.log(`🔑 API Key configured: ${API_KEY !== 'YOUR_GEMINI_API_KEY_HERE' ? 'Yes ✅' : 'No ❌ - Please add your key!'}`);
  console.log('\nEndpoints:');
  console.log(`  POST /api/chat - Main chat endpoint`);
  console.log(`  GET  /api/health - Health check`);
  console.log(`  GET  /api/config - Business config`);
});