
import React, { useMemo } from 'react';
import { Ticket, UserType, Retailer, Vendor } from '../types';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket;
  retailers: Retailer[];
  vendors: Vendor[];
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, ticket, retailers, vendors }) => {
  const userMap = useMemo(() => {
    const map = new Map<string, { name: string }>();
    retailers.forEach(r => map.set(`${UserType.Retailer}-${r.id}`, { name: `${r.name} (${r.company})` }));
    vendors.forEach(v => map.set(`${UserType.Vendor}-${v.id}`, { name: `${v.name} (${v.businessName})` }));
    return map;
  }, [retailers, vendors]);

  const userName = userMap.get(`${ticket.userType}-${ticket.userId}`)?.name || 'Unknown User';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Ticket Details</h2>
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-600">User</label>
                <input type="text" value={userName} readOnly className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm py-2 px-3 cursor-default" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Ticket Type</label>
              <input type="text" value={ticket.type} readOnly className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm py-2 px-3 cursor-default" />
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input type="text" value={ticket.title} readOnly className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm py-2 px-3 cursor-default" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea value={ticket.description} readOnly rows={5} className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm py-2 px-3 cursor-default"></textarea>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
