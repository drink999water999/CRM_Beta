
import React, { useState, useCallback, useEffect } from 'react';
import { generateCommunicationMessage } from '../services/geminiService';
import { User, UserType } from '../types';
import { MESSAGE_TEMPLATES } from '../constants';

type Channel = 'WhatsApp' | 'Email' | 'SMS' | 'Push';

interface SingleCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  userType: UserType;
  initialChannel: Channel;
}

export const SingleCommunicationModal: React.FC<SingleCommunicationModalProps> = ({ isOpen, onClose, user, userType, initialChannel }) => {
  const [channel, setChannel] = useState<Channel>(initialChannel);
  const [messageType, setMessageType] = useState<string>(MESSAGE_TEMPLATES[userType][0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setMessageType(MESSAGE_TEMPLATES[userType][0]);
    setChannel(initialChannel);
    setGeneratedMessage('');
    setCustomPrompt('');
    setIsSent(false);
  }, [user, userType, initialChannel, isOpen]);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setGeneratedMessage('');
    const message = await generateCommunicationMessage(userType, messageType, channel, customPrompt);
    setGeneratedMessage(message);
    setIsLoading(false);
  }, [userType, messageType, channel, customPrompt]);
  
  const handleSend = () => {
      // This is a simulation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSent(true);
        setTimeout(() => {
            onClose();
        }, 2000)
      }, 1000)
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white border border-[var(--border-color)] rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2 text-[var(--text-dark)]">Contact {user.name}</h2>
        <p className="text-sm text-[var(--text-light)] mb-6">Send a message to {user.name} via {channel}.</p>
        
        <div className="space-y-4">
            <div>
                 <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Channel</label>
                 <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                    <button type="button" onClick={() => setChannel('WhatsApp')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'WhatsApp' ? 'bg-[var(--primary)] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>WhatsApp</button>
                    <button type="button" onClick={() => setChannel('Email')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'Email' ? 'bg-[var(--primary)] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>Email</button>
                    <button type="button" onClick={() => setChannel('SMS')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'SMS' ? 'bg-[var(--primary)] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>SMS</button>
                    <button type="button" onClick={() => setChannel('Push')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'Push' ? 'bg-[var(--primary)] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>Push</button>
                 </div>
            </div>

             <div>
                <label htmlFor="messageType" className="block text-sm font-medium text-[var(--text-light)]">Message Template</label>
                <select id="messageType" value={messageType} onChange={(e) => setMessageType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                    {MESSAGE_TEMPLATES[userType].map(template => (
                    <option key={template} value={template}>{template}</option>
                    ))}
                </select>
             </div>
             <div>
                <label htmlFor="customPrompt" className="block text-sm font-medium text-[var(--text-light)]">Additional Instructions (Optional)</label>
                <input type="text" id="customPrompt" value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} placeholder="e.g., mention the upcoming holiday season" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm" />
            </div>

            <button onClick={handleGenerate} disabled={isLoading} className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                 {isLoading && !isSent ? 'Generating...' : 'Generate with AI'}
            </button>

            {generatedMessage && (
                <div>
                    <label className="block text-sm font-medium text-[var(--text-light)]">Message</label>
                    <textarea value={generatedMessage} onChange={(e) => setGeneratedMessage(e.target.value)} rows={5} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]"></textarea>
                </div>
            )}
        </div>
        
        <div className="flex justify-end items-center space-x-4 pt-6">
            {isSent && <span className="text-green-500">Message sent successfully!</span>}
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300">
                Cancel
            </button>
            <button onClick={handleSend} disabled={!generatedMessage || isSent || isLoading} className="px-4 py-2 bg-[var(--primary)] text-white font-bold rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isLoading && isSent ? 'Sending...' : 'Send Message'}
            </button>
        </div>
      </div>
    </div>
  );
};