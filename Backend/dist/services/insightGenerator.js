"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInsight = generateInsight;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const vectorStore_1 = require("./vectorStore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Check if the GROQ_API_KEY is available
const groqApiKey = process.env.GROQ_API_KEY;
if (!groqApiKey) {
    throw new Error('GROQ_API_KEY is not set in the environment variables');
}
// Initialize the Groq client with the API key
const groq = new groq_sdk_1.default({ apiKey: groqApiKey });
async function generateInsight(message) {
    var _a, _b;
    const relevantData = (0, vectorStore_1.searchSalaryData)(message);
    const prompt = `
You are an expert data analyst specializing in salary insights. 
I will share a user's question with you, and you will provide the best answer based on the salary data provided.
Follow these rules:
1/ Use the provided salary data to inform your response.
2/ If the data doesn't directly answer the question, use it to provide context and insights.
3/ Be concise but informative in your response.

User's question: ${message}

Here is relevant salary data to consider:
${JSON.stringify(relevantData, null, 2)}

Please provide the best response to the user's question:`;
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'mixtral-8x7b-32768',
        });
        return ((_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || 'Sorry, I couldn\'t generate a response.';
    }
    catch (error) {
        console.error('Error generating insight:', error);
        return 'An error occurred while generating the insight. Please try again later.';
    }
}
