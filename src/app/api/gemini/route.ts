import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.Gemini_API || "";
const genAi = new GoogleGenerativeAI(api_key);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다" },
        { status: 400 }
      );
    }

    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const textResponse = await response.text();

    return NextResponse.json({ text: textResponse });
  } catch (error) {
    console.error("Error generating code:", error);
    return NextResponse.json(
      { error: "코드 생성 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
