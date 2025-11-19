import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
} else {
  console.warn("VITE_API_KEY is missing. AI features will not work.");
}

export const generateBookDescription = async (title: string, author: string, category: string): Promise<string> => {
  if (!ai) return "API Key missing. Cannot generate description.";
  
  try {
    const prompt = `Write a compelling, short marketing description (max 80 words) for a book titled "${title}" by "${author}" in the "${category}" genre. Make it sound intriguing for a bookstore website.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Failed to generate description due to an error.";
  }
};
