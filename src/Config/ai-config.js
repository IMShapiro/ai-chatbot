import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processPrompt(prompt){
    let response = "";
    
    try{
        const result = await model.generateContent(prompt);
        response = result.response.text();
        console.log(response);
        return response;
    }catch(error){
        console.error(error)
        return error
    }
}