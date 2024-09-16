import express from "express";
import { config } from "dotenv";
import fs from "fs";
import cors from "cors";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

config();

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Define types
type DataPoint = {
  original: any;
  embedding: number[];
};

// Initialize data store
let dataStore: DataPoint[] = [];

// Function to get embeddings using Gemini
async function getEmbeddings(text: string): Promise<number[]> {
  try {
    if (!text || text.trim() === "") {
      throw new Error("Text is empty or invalid");
    }
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await embeddingModel.embedContent(text);

    if (!result.embedding) {
      throw new Error("No embedding returned by the API");
    }

    return result.embedding.values;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

// Function to index JSON data
async function indexJSONData(data: any[]) {
  for (const item of data) {
    const text = Object.values(item).join(" ");
    try {
      const embedding = await getEmbeddings(text);
      dataStore.push({ original: item, embedding });
    } catch (error) {
      console.error("Error processing item:", item, error);
    }
  }
}

// Load and index JSON data on startup
(async () => {
  const filePath = path.join(__dirname, "../data/data.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  await indexJSONData(jsonData);
  console.log("JSON data loaded and indexed");
})();

// Function to calculate cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Function for similarity search
async function retrieveInfo(query: string, k: number = 3): Promise<any[]> {
  const queryEmbedding = await getEmbeddings(query);
  const similarities = dataStore.map((item) => ({
    item,
    similarity: cosineSimilarity(queryEmbedding, item.embedding),
  }));
  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities.slice(0, k).map((s) => s.item.original);
}

// Generate response using Groq
async function generateResponse(
  message: string,
  context: any[]
): Promise<string> {
  const contextStr = context.map(item => JSON.stringify(item)).join("\n");
  const prompt = `
  You are an AI assistant for a data analysis company. You have access to a dataset containing information about job salaries, experience levels, and other related factors. Using the context provided, answer the following question or provide insights based on the data:
  
  Question: ${message}
  
  Context (each line is a JSON object representing a data point):
  ${contextStr}
  
  Please provide a detailed but in short paragraph and insightful answer based on the given context and your understanding of data analysis. Use specific data points from the context when relevant.
  `;

  try {
    const model = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for a data analysis company. And you are analyzing 2020 - 2024 Machine Learning Engineer Jobs and Salaries Details",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Check for result and response text
    const response = model.choices[0]?.message?.content || "No response";
    return response;
  } catch (error) {
    console.error("Error generating response from Groq:", error);
    throw new Error("Failed to generate response");
  }
}

// API endpoint for generating insights
app.post("/ask", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const similarData = await retrieveInfo(message);
    const response = await generateResponse(message, similarData);
    res.json({ response });
  } catch (error) {
    console.error("Error generating insight:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the insight" + error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
