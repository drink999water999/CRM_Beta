import React, { useMemo } from 'react';
import { Ticket, TicketStatus, Retailer, Vendor, UserType } from '../types';

interface TicketTableProps {
  tickets: Ticket[];
  retailers: Retailer[];
  vendors: Vendor[];
  onViewDetails: (ticket: Ticket) => void;
  onStatusChange: (ticket: Ticket, newStatus: TicketStatus) => void;
}

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.Open: return 'bg-blue-100 text-blue-800';
    case TicketStatus.InProgress: return 'bg-yellow-100 text-yellow-800';
    case TicketStatus.Closed: return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const TicketTable: React.FC<TicketTableProps> = ({ tickets, retailers, vendors, onViewDetails, onStatusChange }) => {
  const userMap = useMemo(() => {
    const map = new Map<string, { name: string }>();
    retailers.forEach(r => map.set(`${UserType.Retailer}-${r.id}`, { name: r.name }));
    vendors.forEach(v => map.set(`${UserType.Vendor}-${v.id}`, { name: v.name }));
    return map;
  }, [retailers, vendors]);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userMap.get(`${ticket.userType}-${ticket.userId}`)?.name || 'Unknown User'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                 <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button onClick={() => onViewDetails(ticket)} className="text-green-700 hover:text-green-800 font-bold">
                  View
                </button>
                <select
                    value={ticket.status}
                    onChange={(e) => onStatusChange(ticket, e.target.value as TicketStatus)}
                    className="text-sm rounded border-gray-300 bg-white focus:ring-green-700 focus:border-green-700"
                >
                    <option value={TicketStatus.Open}>Open</option>
                    <option value={TicketStatus.InProgress}>In Progress</option>
                    <option value={TicketStatus.Closed}>Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};