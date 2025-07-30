
import React, { useState, useCallback, useEffect } from 'react';
import { generateCommunicationMessage } from '../services/geminiService';
import { User, UserType } from '../types';
import { MESSAGE_TEMPLATES } from '../constants';

interface GroupCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  userType: UserType;
}

export const GroupCommunicationModal: React.FC<GroupCommunicationModalProps> = ({ isOpen, onClose, users, userType }) => {
  const [channel, setChannel] = useState<'Email' | 'SMS' | 'Push'>('Email');
  const [messageType, setMessageType] = useState<string>(MESSAGE_TEMPLATES[userType][0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setMessageType(MESSAGE_TEMPLATES[userType][0]);
  }, [userType]);

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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-[--bg-dark-secondary] border border-[--border-dark] rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2 text-[--text-primary]">Group Communication</h2>
        <p className="text-sm text-[--text-secondary] mb-6">Send a message to {users.length} selected {userType.toLowerCase()}(s).</p>
        
        <div className="space-y-4">
            <div>
                 <label className="block text-sm font-medium text-[--text-secondary] mb-2">Channel</label>
                 <div className="flex space-x-2 bg-black/20 p-1 rounded-lg">
                    <button type="button" onClick={() => setChannel('Email')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'Email' ? 'bg-[--accent-primary] text-black' : 'hover:bg-white/5'}`}>Email</button>
                    <button type="button" onClick={() => setChannel('SMS')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'SMS' ? 'bg-[--accent-primary] text-black' : 'hover:bg-white/5'}`}>SMS</button>
                    <button type="button" onClick={() => setChannel('Push')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'Push' ? 'bg-[--accent-primary] text-black' : 'hover:bg-white/5'}`}>Push</button>
                 </div>
            </div>

            <div>
                 <label className="block text-sm font-medium text-[--text-secondary]">Recipients</label>
                 <div className="mt-1 p-2 border border-[--border-dark] rounded-md bg-black/20 h-20 overflow-y-auto text-sm">
                    {users.map(u => u.name).join(', ')}
                 </div>
            </div>

             <div>
                <label htmlFor="messageType" className="block text-sm font-medium text-[--text-secondary]">Message Template</label>
                <select id="messageType" value={messageType} onChange={(e) => setMessageType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-transparent border-[--border-dark] focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary] sm:text-sm rounded-md">
                    {MESSAGE_TEMPLATES[userType].map(template => (
                    <option key={template} value={template}>{template}</option>
                    ))}
                </select>
             </div>
             <div>
                <label htmlFor="customPrompt" className="block text-sm font-medium text-[--text-secondary]">Additional Instructions (Optional)</label>
                <input type="text" id="customPrompt" value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} placeholder="e.g., mention the upcoming holiday season" className="mt-1 block w-full bg-transparent border border-[--border-dark] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary] sm:text-sm" />
            </div>

            <button onClick={handleGenerate} disabled={isLoading} className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-[--accent-secondary] hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isLoading ? 'Generating...' : 'Generate with AI'}
            </button>

            {generatedMessage && (
                <div>
                    <label className="block text-sm font-medium text-[--text-secondary]">Message</label>
                    <textarea value={generatedMessage} onChange={(e) => setGeneratedMessage(e.target.value)} rows={5} className="mt-1 block w-full bg-transparent border-[--border-dark] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary]"></textarea>
                </div>
            )}
        </div>
        
        <div className="flex justify-end items-center space-x-4 pt-6">
            {isSent && <span className="text-green-400">Message sent successfully!</span>}
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white/10 text-[--text-primary] font-bold rounded-md hover:bg-white/20">
                Cancel
            </button>
            <button onClick={handleSend} disabled={!generatedMessage || isSent || isLoading} className="px-4 py-2 bg-[--accent-primary] text-black font-bold rounded-md hover:bg-teal-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isLoading && isSent ? 'Sending...' : 'Send Message'}
            </button>
        </div>
      </div>
    </div>
  );
};