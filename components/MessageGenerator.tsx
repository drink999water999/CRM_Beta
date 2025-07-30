
import React, { useState, useCallback, useEffect } from 'react';
import { generateCommunicationMessage } from '../services/geminiService';
import { UserType } from '../types';
import { MESSAGE_TEMPLATES } from '../constants';

export const MessageGenerator: React.FC = () => {
  const [userType, setUserType] = useState<UserType>(UserType.Retailer);
  const [channel, setChannel] = useState<'Email' | 'SMS' | 'Push'>('Email');
  const [messageType, setMessageType] = useState<string>(MESSAGE_TEMPLATES[UserType.Retailer][0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
  };

  return (
    <div className="bg-[--bg-dark-secondary] p-6 rounded-lg border border-[--border-dark] mt-8">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[--accent-secondary]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        <h2 className="text-xl font-semibold text-[--text-primary]">AI Message Assistant</h2>
      </div>
      <p className="text-sm text-[--text-secondary] mb-6">Quickly generate professional messages for your partners.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-[--text-secondary] mb-1">Recipient Type</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-transparent border-[--border-dark] focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary] sm:text-sm rounded-md"
          >
            <option value={UserType.Retailer}>Retailer</option>
            <option value={UserType.Vendor}>Vendor</option>
          </select>
        </div>
        <div>
          <label htmlFor="messageType" className="block text-sm font-medium text-[--text-secondary] mb-1">Message Template</label>
          <select
            id="messageType"
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-transparent border-[--border-dark] focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary] sm:text-sm rounded-md"
          >
            {MESSAGE_TEMPLATES[userType].map(template => (
              <option key={template} value={template}>{template}</option>
            ))}
          </select>
        </div>
      </div>
      
       <div className="mb-4">
        <label className="block text-sm font-medium text-[--text-secondary] mb-2">Channel</label>
        <div className="flex space-x-2 bg-black/20 p-1 rounded-lg">
            <button type="button" onClick={() => setChannel('Email')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'Email' ? 'bg-[--accent-primary] text-black' : 'hover:bg-white/5'}`}>Email</button>
            <button type="button" onClick={() => setChannel('SMS')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'SMS' ? 'bg-[--accent-primary] text-black' : 'hover:bg-white/5'}`}>SMS</button>
            <button type="button" onClick={() => setChannel('Push')} className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${channel === 'Push' ? 'bg-[--accent-primary] text-black' : 'hover:bg-white/5'}`}>Push</button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="customPrompt" className="block text-sm font-medium text-[--text-secondary] mb-1">Additional Instructions (Optional)</label>
        <input
          type="text"
          id="customPrompt"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="e.g., mention the upcoming holiday season"
          className="mt-1 block w-full bg-transparent border border-[--border-dark] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary] sm:text-sm"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-bold rounded-md shadow-sm text-black bg-[--accent-primary] hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : 'Generate Message'}
      </button>

      {generatedMessage && (
        <div className="mt-6 relative">
            <h3 className="text-lg font-semibold text-[--text-primary] mb-2">Generated Message:</h3>
            <div className="bg-black/20 p-4 rounded-md border border-[--border-dark] whitespace-pre-wrap font-mono text-sm text-[--text-primary]">
                {generatedMessage}
            </div>
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 px-2 py-1 text-xs font-medium text-[--text-secondary] bg-white/10 rounded hover:bg-white/20"
            >
              Copy
            </button>
        </div>
      )}
    </div>
  );
};