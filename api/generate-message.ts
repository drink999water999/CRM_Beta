
import { GoogleGenAI } from "@google/genai";
import { VercelRequest, VercelResponse } from '@vercel/node';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userType, messageType, channel, customPrompt } = req.body;

    if (!userType || !messageType || !channel) {
        return res.status(400).json({ error: 'Missing required fields: userType, messageType, channel' });
    }

    try {
        const prompt = `
            You are a professional B2B communication assistant for "Qawafel CRM", a marketplace connecting vendors with retailers.
            Your task is to generate a concise, professional, and friendly message.

            Channel: ${channel}
            Recipient Type: ${userType}
            Message Goal: ${messageType}
            ${customPrompt ? `Additional Instructions: ${customPrompt}` : ''}
            
            The tone should be supportive and business-oriented.
            
            ${channel === 'Email' ? `Start the message with a greeting like "Dear [Name]," and end with a professional closing like "Best regards,\\nThe Qawafel Team". Keep the body to 2-3 short paragraphs. Do not include a subject line.` : ''}
            ${channel === 'SMS' ? `The message must be very short, under 160 characters. Do not use greetings or closings.` : ''}
            ${channel === 'Push' ? `The message must be a short, actionable notification. Do not use greetings or closings.` : ''}
            ${channel === 'WhatsApp' ? `The message should be friendly and conversational, suitable for WhatsApp. Emojis are allowed. Do not use formal greetings or closings.` : ''}
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const message = response.text;
        
        return res.status(200).json({ message });

    } catch (error: any) {
        console.error("Error generating message with Gemini:", error);
        return res.status(500).json({ error: "Failed to generate message", details: error.message });
    }
}
