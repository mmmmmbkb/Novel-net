import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generatePostContent = async (topic: string, tone: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `Write a short social media post (max 200 words) for a book lover's social network about: "${topic}". 
    The tone should be ${tone}. 
    Focus on engaging the audience with a question or a strong opinion. 
    Do not use hashtags.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I couldn't generate a post right now.";
  } catch (error) {
    console.error("Error generating post:", error);
    return "Failed to contact the muse (AI Error).";
  }
};

export const chatWithCharacter = async (
  characterName: string, 
  bookName: string, 
  personality: string,
  userMessage: string,
  history: { role: 'user' | 'model', parts: [{ text: string }] }[]
) => {
  try {
    const ai = getAiClient();
    
    const systemInstruction = `You are roleplaying as ${characterName} from the book ${bookName}. 
    Your personality is: ${personality}.
    Keep your responses concise (under 50 words) and conversational, as if chatting on a social messaging app.
    Stay in character at all times.`;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "";
  } catch (error) {
    console.error("Error chatting with character:", error);
    return "*Silence fills the room...* (AI Error)";
  }
};