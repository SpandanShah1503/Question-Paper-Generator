# Question-Paper-Generator

This project is a Node.js-based API that generates question papers using Google Gemini Generative AI.
It allows you to define topics, number of questions, type of questions, and total marks.

API testing is done using Postman, and sensitive keys are securely managed with a .env file.

📜Features
Generate custom question papers with AI.
Define:
Topic
Number of Questions
Question Type (MCQ, Short Answer, etc.)
Total Marks

⚙️API tested with Postman.
Secure API keys with dotenv.

🛠️Tech Stack
Node.js (Backend)
Express.js (API Framework)
Google Generative AI (Gemini)
dotenv (Environment variable management)
Postman (API testing)

📂 Project Setup
💥Clone the repo
➡️git clone <your-repo-url>
➡️cd question-paper-generator

💥Install dependencies
➡️npm install


💥Create .env file in project root
➡️GEMINI_API_KEY=your_google_gemini_api_key
➡️PORT=7000

💥Run the server
➡️node gemini.js

💥Server will run at:
➡️http://localhost:7000

📬 API Usage (Postman)
➡️Endpoint:
➡️POST /generatePaper

Request Body (JSON):
{
  "topic": "Computer Network",
  "numQuestions": 5,
  "type": "MCQ",
  "totalMarks": 20
}

🔒 Environment Variables
➡️GEMINI_API_KEY → Your Google Generative AI key.
➡️PORT → Server port (default: 7000).

📌 Tools Used
➡️Node.js → API backend.
➡️Express.js → For handling routes.
➡️dotenv → For managing API keys.
➡️Postman → For testing endpoints.
➡️Google Gemini AI → For generating questions.

📖 Example Prompt Building (Backend)
function buildPrompt({ topic, numQuestions, type, totalMarks }) {
  return `
  You are an expert exam paper setter. Create a question paper.
  Topic: ${topic}
  Number of Questions: ${numQuestions}
  Question Type: ${type} (only generate this type, do not mix with other types)
  Total Marks: ${totalMarks}
  `;
}

✅ Future Improvements
💲Add frontend UI for non-technical users.
💲Export question paper in PDF/Word format.
💲Support multiple question types in a single paper.
