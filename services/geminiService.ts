import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserInput } from '../types';

export async function getPassiveIncomeReport(input: UserInput): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in the environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = "gemini-3-pro-preview"; // Complex text tasks require gemini-3-pro-preview

  const systemInstruction = `You are a Career Strategist and Passive Income Expert specializing in the Indian tech market. Your goal is to analyze a user's current technical skills (specifically in Android Development, Big Data, and GenAI as core areas) and identify the specific "gap" they need to bridge to reach a ₹${input.goal}k/month passive income goal. Provide high-quality, actionable roadmaps including specific niches like selling Android templates, building micro-SaaS, or technical content creation. Always consider the Indian tech market context. Structure your response clearly with 'Skill Gap:', 'Niche:', and 'Action Plan:' as distinct headings, followed by the detailed explanation for each.`;

  const userPrompt = `Skills: ${input.skills}. Goal: ₹${input.goal}k/month passive income.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // A bit creative but focused
        maxOutputTokens: 800, // Sufficient for a detailed report
        // IMPORTANT: When maxOutputTokens is set, also set thinkingBudget to reserve tokens for output.
        thinkingConfig: { thinkingBudget: 200 }, // Reserve 200 tokens for thinking, leaving 600 for output
      },
    });

    return response.text || 'No report content could be generated. Please try again or refine your skills/goal.'; // Return the raw text, with a fallback
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.message && typeof error.message === 'string' && error.message.includes("Requested entity was not found.")) {
      // Handle API key selection for models that require it, although gemini-3-pro-preview usually works with default env key.
      // This is primarily for Veo/Imagen models, but including for robustness.
      if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
        // Assuming key selection was successful, the next call will use the new key.
        // No need to retry immediately, as the user will likely re-submit.
        return `API Key issue detected. Please ensure you have selected a valid paid API key via the dialog.`;
      }
    }
    throw new Error(`Failed to generate report: ${error.message || 'Unknown error'}`);
  }
}