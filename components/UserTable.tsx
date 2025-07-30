import React from 'react';
import { User, AccountStatus, MarketplaceStatus } from '../types';

interface Column<T> {
  header: string;
  accessor: keyof T;
}

type Channel = 'WhatsApp' | 'Email' | 'SMS' | 'Push';

interface UserTableProps<T extends User> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onAccountStatusChange: (item: T, newStatus: AccountStatus) => void;
  onMarketplaceStatusChange: (item: T, newStatus: MarketplaceStatus) => void;
  selectedIds: Set<number>;
  onSelectionChange: (id: number) => void;
  onSelectAll: (isChecked: boolean) => void;
  onContact?: (item: T, channel: Channel) => void;
  contactOptions?: Channel[];
}

const getAccountStatusColor = (status: AccountStatus) => {
  switch (status) {
    case AccountStatus.Active: return 'bg-green-100 text-green-800';
    case AccountStatus.Deactivated: return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getMarketplaceStatusColor = (status: MarketplaceStatus) => {
    switch (status) {
        case MarketplaceStatus.Activated: return 'bg-green-100 text-green-800';
        case MarketplaceStatus.Retained: return 'bg-teal-100 text-teal-800';
        case MarketplaceStatus.Dormant: return 'bg-yellow-100 text-yellow-800';
        case MarketplaceStatus.Churned: return 'bg-slate-100 text-slate-800';
        case MarketplaceStatus.Resurrected: return 'bg-pink-100 text-pink-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const ContactIcon: React.FC<{ channel: Channel; }> = ({ channel }) => {
    switch (channel) {
        case 'WhatsApp': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.13l-1.117 4.096 4.183-1.097z" /></svg>;
        case 'Email': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
        case 'SMS': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
        case 'Push': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
    }
}

const contactIconDetails: { channel: Channel; color: string; title: string }[] = [
    { channel: 'WhatsApp', color: 'hover:text-green-600', title: 'Contact via WhatsApp' },
    { channel: 'Email', color: 'hover:text-blue-600', title: 'Contact via Email' },
    { channel: 'SMS', color: 'hover:text-purple-600', title: 'Contact via SMS' },
    { channel: 'Push', color: 'hover:text-orange-500', title: 'Contact via Push Notification' },
];

export const UserTable = <T extends User,>({ 
    columns, data, onEdit, 
    onAccountStatusChange, onMarketplaceStatusChange,
    selectedIds, onSelectionChange, onSelectAll,
    onContact,
    contactOptions = ['WhatsApp', 'Email', 'SMS', 'Push']
}: UserTableProps<T>) => {
  const isAllSelected = data.length > 0 && selectedIds.size === data.length;
    
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-green-700 focus:ring-green-700"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            {columns.map((col) => (
              <th key={col.header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className={`transition-colors duration-200 ${selectedIds.has(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
              <td className="px-6 py-4">
                 <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-green-700 focus:ring-green-700"
                    checked={selectedIds.has(item.id)}
                    onChange={() => onSelectionChange(item.id)}
                 />
              </td>
              {columns.map((col) => (
                <td key={col.accessor as string} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {col.accessor === 'accountStatus' ? (
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountStatusColor(item.accountStatus)}`}>
                      {item.accountStatus}
                    </span>
                  ) : col.accessor === 'marketplaceStatus' ? (
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMarketplaceStatusColor(item.marketplaceStatus)}`}>
                      {item.marketplaceStatus}
                    </span>
                  ) : (
                    String(item[col.accessor])
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end items-center space-x-2">
                    {onContact && (
                        <>
                            <div className="flex items-center space-x-2">
                               {contactIconDetails
                                 .filter(d => contactOptions.includes(d.channel))
                                 .map(details => (
                                    <button key={details.channel} onClick={() => onContact(item, details.channel)} className={`text-gray-400 ${details.color} transition-colors`} title={details.title}>
                                        <ContactIcon channel={details.channel} />
                                    </button>
                               ))}
                            </div>
                            <div className="h-5 w-px bg-gray-200"></div>
                        </>
                    )}
                    <button onClick={() => onEdit(item)} className="text-green-700 hover:text-green-800 font-bold px-2">
                      Edit
                    </button>
                    <select
                        value={item.accountStatus}
                        onChange={(e) => onAccountStatusChange(item, e.target.value as AccountStatus)}
                        className="text-sm rounded border-gray-300 bg-white focus:ring-green-700 focus:border-green-700"
                        title="Change Account Status"
                    >
                        {Object.values(AccountStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select
                        value={item.marketplaceStatus}
                        onChange={(e) => onMarketplaceStatusChange(item, e.target.value as MarketplaceStatus)}
                        className="text-sm rounded border-gray-300 bg-white focus:ring-green-700 focus:border-green-700"
                        title="Change Marketplace Status"
                    >
                        {Object.values(MarketplaceStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};