import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => (
  <div>
    <h1 className="text-3xl font-bold text-[var(--text-dark)]">{title}</h1>
    <p className="mt-2 text-[var(--text-light)]">This page is under construction.</p>
    <div className="mt-8 bg-white border border-[var(--border-color)] rounded-lg p-8 h-96 flex items-center justify-center">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">Coming Soon</h2>
            <p className="mt-1 text-sm text-gray-500">
                Content for the {title} page will be available here shortly.
            </p>
        </div>
    </div>
  </div>
);
