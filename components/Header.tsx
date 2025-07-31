import React from 'react';

interface HeaderProps {
    userProfile: {
        email: string;
    };
}

export const Header: React.FC<HeaderProps> = ({ userProfile }) => {
  return (
    <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-8 flex-shrink-0">
      <h1 className="text-xl font-semibold text-gray-900">Qawafel One CRM</h1>
      <div className="flex items-center space-x-6">
        <span className="text-sm text-gray-600">{userProfile.email}</span>
        <a href="#" className="flex items-center text-sm text-gray-600 hover:text-green-700 font-medium">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
           </svg>
          Sign Out
        </a>
      </div>
    </header>
  );
};