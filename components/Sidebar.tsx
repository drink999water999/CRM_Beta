
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="mr-3 h-6 w-6">{children}</span>
);

const navItems = [
    { id: Page.Dashboard, label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 8.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75h2.25A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg> },
    { id: Page.Leads, label: 'Leads', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg> },
    { id: Page.Deals, label: 'Deals', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.508-2.32 2.73-1.05.166-2.097.22-3.18.22h-6.5c-1.083 0-2.13-.054-3.18-.22A2.73 2.73 0 0 1 3.75 18.225V14.15M16.5 18.75h-9" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375A2.625 2.625 0 0 0 17.625 3.75h-11.25A2.625 2.625 0 0 0 3.75 6.375v1.5A2.625 2.625 0 0 0 6.375 10.5h11.25A2.625 2.625 0 0 0 20.25 7.875v-1.5Z" /></svg> },
    { id: Page.Vendors, label: 'Vendors', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg> },
    { id: Page.Retailers, label: 'Retailers', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0 0 11.25 11.25H4.5A2.25 2.25 0 0 0 2.25 13.5V21M3 3h12M3 3v2.25M3 3h0M15 3v2.25M15 3h0M3 21h12M15 21h0M15 21v-7.5A2.25 2.25 0 0 0 12.75 11.25H11.25" /></svg> },
    { id: Page.Proposals, label: 'Proposals', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg> },
    { id: Page.Settings, label: 'Settings', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.994h2.593c.55 0 1.02.453 1.11.994l.217 1.413c.094.61.566 1.172 1.185 1.172h1.413c.619 0 1.172.566 1.172 1.185l-.217 1.413c-.09.542-.56 1.007-1.11.994h-2.593c-.55 0-1.02-.453-1.11-.994l-.217-1.413a1.125 1.125 0 0 1-1.185-1.172H9.594a1.125 1.125 0 0 1-1.185 1.172l-.217 1.413c-.09.542.453 1.02.994 1.11l1.413.217c.61.094 1.172.566 1.172 1.185v1.413c0 .619-.566 1.172-1.185 1.172l-1.413.217c-.542.09-1.007.56-1.11 1.11h-2.593c-.542-.09-1.007-.56-1.11-1.11l-1.413-.217a1.125 1.125 0 0 1-1.185-1.172V15.5a1.125 1.125 0 0 1 1.185-1.172l1.413-.217c.542-.09 1.007-.453.994-1.11l.217-1.413A1.125 1.125 0 0 1 5.4 9.594l.217-1.413c.09-.542.56-1.007 1.11-.994h2.593c.55 0 1.02.453 1.11.994l.217 1.413c.094.61.566 1.172 1.185 1.172h1.413c.619 0 1.172.566 1.172-1.185l-.217-1.413c-.09-.542-.56-1.007-1.11-.994H9.594Z" /></svg> },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white flex flex-col border-r border-gray-200">
      <div className="flex items-center h-16 border-b border-gray-200 px-4">
        <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
        </div>
        <div className="ml-3">
            <h1 className="text-lg font-bold text-gray-900 leading-5">Qawafel One</h1>
            <p className="text-xs text-gray-500">CRM Platform</p>
        </div>
      </div>
      <nav className="mt-4 flex-grow px-4">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(item.id);
            }}
            aria-current={currentPage === item.id ? 'page' : undefined}
            className={`flex items-center py-2.5 px-4 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              currentPage === item.id
                ? 'bg-green-700 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <NavIcon>{item.icon}</NavIcon>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};