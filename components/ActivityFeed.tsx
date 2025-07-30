import React from 'react';

const activities = [
  { id: 1, text: 'New retailer "FreshMart" signed up.', time: '2 hours ago', icon: 'user-plus' },
  { id: 2, text: 'Vendor "Organic Farms" application is now pending review.', time: '5 hours ago', icon: 'clipboard' },
  { id: 3, text: 'Message sent to vendor "The Spice House".', time: '1 day ago', icon: 'envelope' },
  { id: 4, text: 'Status for "Quick Grocer" changed to Deactivated.', time: '2 days ago', icon: 'user-x' },
];

const ActivityIcon: React.FC<{ icon: string }> = ({ icon }) => {
    let path = '';
    let color = 'text-gray-400';
    switch(icon) {
        case 'user-plus': path = "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"; color="text-green-400"; break;
        case 'clipboard': path = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"; color="text-yellow-400"; break;
        case 'envelope': path = "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"; color="text-blue-400"; break;
        case 'user-x': path = "M13 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z M20 21l-5-5m0-5l5 5"; color="text-red-400"; break;
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} /></svg>;
}

export const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-[--bg-dark-secondary] p-6 rounded-lg border border-[--border-dark]">
      <h2 className="text-xl font-semibold mb-4 text-[--text-primary]">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 pt-1 bg-black/20 p-2 rounded-full">
              <ActivityIcon icon={activity.icon} />
            </div>
            <div>
              <p className="text-sm text-[--text-primary]">{activity.text}</p>
              <p className="text-xs text-[--text-secondary]">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};