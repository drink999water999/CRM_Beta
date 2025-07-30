import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: 'users' | 'target' | 'store' | 'building' | 'dollar' | 'chart';
  color: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'indigo';
}

const Icon: React.FC<{icon: StatCardProps['icon']}> = ({ icon }) => {
    const icons = {
        users: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1.5a4.5 4.5 0 00-9 0V21" /></svg>,
        target: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
        store: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
        building: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0 0 11.25 11.25H4.5A2.25 2.25 0 0 0 2.25 13.5V21M3 3h12M3 3v2.25M3 3h0M15 3v2.25M15 3h0M3 21h12M15 21h0M15 21v-7.5a2.25 2.25 0 0 0-2.25-2.25H11.25" /></svg>,
        dollar: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1.667a4.002 4.002 0 00-3.464-3.993l-.001-.94a1 1 0 00-1-1H7a1 1 0 00-1 1v.94A4.002 4.002 0 002.537 6M12 21v-1.667a4.002 4.002 0 013.464-3.993l.001-.94a1 1 0 011-1h.5a1 1 0 011 1v.94a4.002 4.002 0 013.463 3.992" /></svg>,
        chart: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    };
    return icons[icon];
}


export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-600',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    teal: 'text-teal-500',
    indigo: 'text-indigo-500',
  }

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <p className="text-sm text-green-600 mt-1">{change}</p>
      </div>
      <div className={`p-2 rounded-md ${colorClasses[color]}`}>
        <Icon icon={icon} />
      </div>
    </div>
  );
};