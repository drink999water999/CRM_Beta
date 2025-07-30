
import React, { useState } from 'react';
import { Retailer, UserType } from '../types';
import { UserTable } from './UserTable';
import { UserModal } from './UserModal';
import { GroupCommunicationModal } from './GroupCommunicationModal';
import { SingleCommunicationModal } from './SingleCommunicationModal';

type Channel = 'WhatsApp' | 'Email' | 'SMS' | 'Push';

interface RetailersPageProps {
  retailers: Retailer[];
  addRetailer: (retailer: Omit<Retailer, 'id'>) => void;
  updateRetailer: (retailer: Retailer) => void;
}

export const RetailersPage: React.FC<RetailersPageProps> = ({ retailers, addRetailer, updateRetailer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommModalOpen, setIsCommModalOpen] = useState(false);
  const [editingRetailer, setEditingRetailer] = useState<Retailer | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSingleCommModalOpen, setIsSingleCommModalOpen] = useState(false);
  const [contactUser, setContactUser] = useState<Retailer | undefined>(undefined);
  const [contactChannel, setContactChannel] = useState<Channel>('Email');

  const handleOpenModal = (retailer?: Retailer) => {
    setEditingRetailer(retailer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingRetailer(undefined);
    setIsModalOpen(false);
  };

  const handleContact = (retailer: Retailer, channel: Channel) => {
    setContactUser(retailer);
    setContactChannel(channel);
    setIsSingleCommModalOpen(true);
  };
  
  const handleSelectionChange = (id: number) => {
    setSelectedIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
        setSelectedIds(new Set(retailers.map(r => r.id)));
    } else {
        setSelectedIds(new Set());
    }
  };

  const handleSave = (user: Omit<Retailer, 'id'> | Retailer) => {
    if ('id' in user) {
      updateRetailer(user);
    } else {
      addRetailer(user);
    }
    handleCloseModal();
  };

  const columns: { header: string; accessor: keyof Retailer }[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Company', accessor: 'company' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Join Date', accessor: 'joinDate' },
    { header: 'Account Status', accessor: 'accountStatus' },
    { header: 'Marketplace Status', accessor: 'marketplaceStatus' },
  ];

  const selectedRetailers = retailers.filter(r => selectedIds.has(r.id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Retailers</h1>
        <div className="flex items-center space-x-2">
            {selectedIds.size > 0 && (
                <button
                  onClick={() => setIsCommModalOpen(true)}
                  className="px-4 py-2 bg-rose-500 text-white font-bold rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Message Selected ({selectedIds.size})
                </button>
            )}
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Retailer
            </button>
        </div>
      </div>
      <UserTable<Retailer>
        columns={columns}
        data={retailers}
        onEdit={handleOpenModal}
        onAccountStatusChange={(user, status) => updateRetailer({ ...user, accountStatus: status })}
        onMarketplaceStatusChange={(user, status) => updateRetailer({ ...user, marketplaceStatus: status })}
        selectedIds={selectedIds}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        onContact={handleContact}
        contactOptions={['WhatsApp', 'Email', 'SMS', 'Push']}
      />
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          user={editingRetailer}
          userType={UserType.Retailer}
        />
      )}
      {isCommModalOpen && (
        <GroupCommunicationModal
            isOpen={isCommModalOpen}
            onClose={() => setIsCommModalOpen(false)}
            users={selectedRetailers}
            userType={UserType.Retailer}
        />
      )}
      {isSingleCommModalOpen && contactUser && (
        <SingleCommunicationModal
            isOpen={isSingleCommModalOpen}
            onClose={() => setIsSingleCommModalOpen(false)}
            user={contactUser}
            userType={UserType.Retailer}
            initialChannel={contactChannel}
        />
      )}
    </div>
  );
};