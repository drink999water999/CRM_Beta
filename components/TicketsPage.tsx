import React, { useState, useCallback } from 'react';
import { Ticket, Retailer, Vendor, TicketStatus } from '../types';
import { TicketTable } from './TicketTable';
import { TicketModal } from './TicketModal';

interface TicketsPageProps {
  tickets: Ticket[];
  retailers: Retailer[];
  vendors: Vendor[];
  onUpdateTicket: (ticket: Ticket) => void;
}

export const TicketsPage: React.FC<TicketsPageProps> = ({ tickets, retailers, vendors, onUpdateTicket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);

  const handleOpenModalForView = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(undefined);
  };
  
  const handleStatusChange = useCallback((ticket: Ticket, newStatus: TicketStatus) => {
      onUpdateTicket({ ...ticket, status: newStatus });
  }, [onUpdateTicket]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Support Tickets & Requests</h1>
      </div>
      <TicketTable
        tickets={tickets}
        retailers={retailers}
        vendors={vendors}
        onViewDetails={handleOpenModalForView}
        onStatusChange={handleStatusChange}
      />
      {isModalOpen && selectedTicket && (
        <TicketModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          ticket={selectedTicket}
          retailers={retailers}
          vendors={vendors}
        />
      )}
    </div>
  );
};