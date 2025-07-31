import React, { useState } from 'react';
import { Vendor, UserType } from '../types';
import { UserTable } from './UserTable';
import { UserModal } from './UserModal';
import { GroupCommunicationModal } from './GroupCommunicationModal';
import { SingleCommunicationModal } from './SingleCommunicationModal';

type Channel = 'WhatsApp' | 'Email' | 'SMS' | 'Push';

interface VendorsPageProps {
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (vendor: Vendor) => void;
}

export const VendorsPage: React.FC<VendorsPageProps> = ({ vendors, addVendor, updateVendor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommModalOpen, setIsCommModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSingleCommModalOpen, setIsSingleCommModalOpen] = useState(false);
  const [contactUser, setContactUser] = useState<Vendor | undefined>(undefined);
  const [contactChannel, setContactChannel] = useState<Channel>('Email');


  const handleOpenModal = (vendor?: Vendor) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingVendor(undefined);
    setIsModalOpen(false);
  };

  const handleContact = (vendor: Vendor, channel: Channel) => {
    setContactUser(vendor);
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
        setSelectedIds(new Set(vendors.map(v => v.id)));
    } else {
        setSelectedIds(new Set());
    }
  };

  const handleSave = (user: Omit<Vendor, 'id'> | Vendor) => {
    if ('id' in user) {
      updateVendor(user);
    } else {
      addVendor(user);
    }
    handleCloseModal();
  };

  const columns: { header: string; accessor: keyof Vendor }[] = [
    { header: 'Contact Name', accessor: 'name' },
    { header: 'Business Name', accessor: 'businessName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Join Date', accessor: 'joinDate' },
    { header: 'Account Status', accessor: 'accountStatus' },
    { header: 'Marketplace Status', accessor: 'marketplaceStatus' },
  ];
  
  const selectedVendors = vendors.filter(v => selectedIds.has(v.id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Vendors</h1>
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
              Add Vendor
            </button>
        </div>
      </div>
      <UserTable<Vendor>
        columns={columns}
        data={vendors}
        onEdit={handleOpenModal}
        onAccountStatusChange={(user, status) => updateVendor({ ...user, accountStatus: status })}
        onMarketplaceStatusChange={(user, status) => updateVendor({ ...user, marketplaceStatus: status })}
        selectedIds={selectedIds}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        onContact={handleContact}
      />
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          user={editingVendor}
          userType={UserType.Vendor}
        />
      )}
       {isCommModalOpen && (
        <GroupCommunicationModal
            isOpen={isCommModalOpen}
            onClose={() => setIsCommModalOpen(false)}
            users={selectedVendors}
            userType={UserType.Vendor}
        />
      )}
      {isSingleCommModalOpen && contactUser && (
        <SingleCommunicationModal
            isOpen={isSingleCommModalOpen}
            onClose={() => setIsSingleCommModalOpen(false)}
            user={contactUser}
            userType={UserType.Vendor}
            initialChannel={contactChannel}
        />
      )}
    </div>
  );
};