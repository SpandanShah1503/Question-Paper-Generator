// Import required packages
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env file

// Create Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to build exam paper prompt
function buildPrompt
(
  { topic, numQuestions, type, totalMarks }
) 
{
  /*
  In your buildPrompt function
function buildPrompt({ topic, numQuestions, type, totalMarks }) 
{
  return `You are an expert exam paper setter...`;
}
You pass data (topic, numQuestions, type, totalMarks).
The function creates a big text/template using those values.
return gives that big text back to the place where you called the function.
👉 So when you write:
const prompt = buildPrompt({ topic: "Math", numQuestions: 5, type: "mcq", totalMarks: 20 });
prompt will contain the string that was returned.
That’s the text you later send to the AI model.
  */
  return `
  You are an expert exam paper setter. Create a question paper.
  Topic: ${topic}
  Number of Questions: ${numQuestions}
  Question Type: ${type} (only generate this type, do not mix with other types)
  Total Marks: ${totalMarks}
  Rules: 
- ALL questions must be strictly of type: ${type}. 
- Distribute ${totalMarks} marks across the ${numQuestions} questions. 
- If type = mcq: 
  * Each question must have 4 options 
  * Provide the correct answer clearly 
- If type = short: 
  * Each question should expect ~50 words 
- If type = long: 
  * Each question should expect ~150 words 
- Return only valid JSON (no markdown, no extra commentary). 

Format: 
{ 
 "topic": "string", 
 "totalMarks": number, 
 "questions": 
 [ 
   { 
     "id": "Q1", 
     "type": "${type}", 
     "marks": number, 
     "question": "string", 
     "options": ["A","B","C","D"],   // only for mcq, else [] 
     "answer": "string" 
   } 
 ] 
}
`;
}

// API endpoint to generate exam paper
app.post 
/*
app.post() in Node.js with Express.js is a method used to handle incoming HTTP POST requests to a specific URL path, typically for submitting data to the server, such as form data or JSON.
*/
(
  '/generatePaper', async (req, res) => 
  {
    try 
    {
      const { topic, numQuestions, type, totalMarks } = req.body;

      // Validation check
      if (!topic || !numQuestions || !type || !totalMarks) 
      {
        return res.status(400).json({ error: "Please fill all mandatory fields" });
      }

      // Build the AI prompt
      const prompt = buildPrompt({ topic, numQuestions, type, totalMarks });

      // Generate exam paper using Google Generative AI
      const result = await model.generateContent
      (
        {
          contents: 
          [
            { 
              role: "user", 
              parts: 
              [
                { text: prompt }
              ] 
            }
          ],
          generationConfig: 
          { 
            responseMimeType: "application/json" 
          }
        }
      );

      // Parse and return JSON response
      const text = await result.response.text();
      const data = JSON.parse(text);

      res.json(data);
    } 
    catch (err) 
    {
      console.error("Error:", err.message);
      res.status(500).json
      (
        { error: "Failed to generate question paper" }
      );
    }
  }
);

// Start the server
app.listen
/*
In Express.js, app.listen() is a fundamental method used to start a web server and make it listen for incoming network requests on a specified port and optionally a host. This enables your Express application to receive and respond to HTTP requests from clients, such as web browsers. 
*/
(
  process.env.PORT || 7000, (error) => 
  {
    if (error) 
    {
      console.log(error);
    } 
    else 
    {
      console.log(`Server running on port ${process.env.PORT || 7000}`);
    }
  }
);
