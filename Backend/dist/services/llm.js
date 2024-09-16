"use strict";
// import express from "express";
// import { config } from "dotenv";
// import { parse } from "csv-parse/sync";
// import fs from "fs";
// import path from "path";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// config();
// const app = express();
// const port = 3000;
// app.use(express.json());
// // Initialize Google AI client
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
// // Define types
// type DataPoint = {
//   original: any;
//   embedding: number[];
// };
// // Initialize data store
// let dataStore: DataPoint[] = [];
// // Function to load and parse CSV data
// async function loadCSVData(filePath: string): Promise<any[]> {
//   const fileContent = fs.readFileSync(filePath, "utf-8");
//   return parse(fileContent, { columns: true, skip_empty_lines: true });
// }
// const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
// const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
// // Function to get embeddings using Gemini
// async function getEmbeddings(text: string): Promise<number[]> {
//   const result = await embeddingModel.embedContent(text);
//   return result.embedding.values;
// }
// // Function to index CSV data
// async function indexCSVData(data: any[]) {
//   const promises = data.map(async (item) => {
//     const text = Object.values(item).join(" ");
//     const embedding = await getEmbeddings(text);
//     return { original: item, embedding };
//   });
//   dataStore = await Promise.all(promises);
// }
// // Load and index CSV data on startup
// (async () => {
//   const csvData = await loadCSVData(path.join(__dirname, "../data/salaries.csv"));
//   await indexCSVData(csvData);
//   console.log("CSV data loaded and indexed");
// })();
// // Function to calculate cosine similarity
// function cosineSimilarity(a: number[], b: number[]): number {
//   const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
//   const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
//   const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
//   return dotProduct / (magnitudeA * magnitudeB);
// }
// // Function for similarity search
// async function retrieveInfo(query: string, k: number = 3): Promise<any[]> {
//   const queryEmbedding = await getEmbeddings(query);
//   const similarities = dataStore.map((item) => ({
//     item,
//     similarity: cosineSimilarity(queryEmbedding, item.embedding),
//   }));
//   similarities.sort((a, b) => b.similarity - a.similarity);
//   return similarities.slice(0, k).map((s) => s.item.original);
// }
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// // Generate response using Gemini
// async function generateResponse(
//   message: string,
//   context: any[]
// ): Promise<string> {
//   const contextStr = context.map(item => JSON.stringify(item)).join("\n");
//   const prompt = `
// You are an AI assistant for a data analysis company. You have access to a dataset containing information about job salaries, experience levels, and other related factors. Using the context provided, answer the following question or provide insights based on the data:
// Question: ${message}
// Context (each line is a JSON object representing a data point):
// ${contextStr}
// Please provide a detailed and insightful answer based on the given context and your understanding of data analysis. Use specific data points from the context when relevant.
// `;
//   const result = await model.generateContent(prompt);
//   const response = result.response;
//   return response.text();
// }
// // API endpoint for generating insights
// app.post("/ask", async (req, res) => {
//   const { message } = req.body;
//   if (!message) {
//     return res.status(400).json({ error: "Message is required" });
//   }
//   try {
//     const similarData = await retrieveInfo(message);
//     const response = await generateResponse(message, similarData);
//     res.json({ response });
//   } catch (error) {
//     console.error("Error generating insight:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while generating the insight" });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
