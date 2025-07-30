
import { UserType } from '../types';

export const generateCommunicationMessage = async (userType: UserType, messageType: string, channel: 'Email' | 'SMS' | 'Push' | 'WhatsApp', customPrompt?: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userType,
            messageType,
            channel,
            customPrompt,
        }),
    });

    if (!response.ok) {
        const errorResult = await response.json();
        console.error("Error generating message from API:", errorResult);
        return `Failed to generate message: ${errorResult.error || 'Unknown error'}`;
    }

    const result = await response.json();
    return result.message;

  } catch (error) {
    console.error("Error calling /api/generate-message:", error);
    return "Failed to generate message. Please check the console for details.";
  }
};