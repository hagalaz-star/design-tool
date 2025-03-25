import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.Gemini_API || "";
export const genAi = new GoogleGenerativeAI(api_key);

export async function generateComponentCode(prompt: string) {
  try {
    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating code:", error);\
    throw error
  }
}
