
import React, { useState } from 'react';
import { Deal, DealStage } from '../types';
import { DealColumn } from './DealColumn';
import { DealModal } from './DealModal';
import { ConfirmationModal } from './ConfirmationModal';

interface DealsPageProps {
  deals: Deal[];
  onUpdateDealStage: (dealId: number, newStage: DealStage) => void;
  onAddDeal: (deal: Omit<Deal, 'id'>) => void;
  onUpdateDeal: (deal: Deal) => void;
  onDeleteDeal: (id: number) => void;
}

const STAGES: DealStage[] = [
    DealStage.New,
    DealStage.Discovery,
    DealStage.Proposal,
    DealStage.Negotiation,
    DealStage.ClosedWon,
    DealStage.Lost,
];

export const DealsPage: React.FC<DealsPageProps> = ({ deals, onUpdateDealStage, onAddDeal, onUpdateDeal, onDeleteDeal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | undefined>(undefined);
  const [deletingDealId, setDeletingDealId] = useState<number | null>(null);

  const handleDrop = (dealId: number, newStage: DealStage) => {
    onUpdateDealStage(dealId, newStage);
  };
  
  const handleOpenModal = (deal?: Deal) => {
    setEditingDeal(deal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingDeal(undefined);
    setIsModalOpen(false);
  };
  
  const handleSaveDeal = (dealData: Omit<Deal, 'id'> | Deal) => {
    if ('id' in dealData) {
        onUpdateDeal(dealData);
    } else {
        onAddDeal(dealData);
    }
    handleCloseModal();
  };
  
  const handleConfirmDelete = () => {
    if (deletingDealId) {
        onDeleteDeal(deletingDealId);
        setDeletingDealId(null);
    }
  };

  const dealToDelete = deletingDealId ? deals.find(d => d.id === deletingDealId) : null;
  const totalDealsValue = deals.filter(d => d.stage !== DealStage.Lost).reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Deals</h1>
          <p className="mt-1 text-gray-500">Track deals through your sales process</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Add Deal
        </button>
      </div>

      <div className="flex-grow flex space-x-4 overflow-x-auto pb-4">
        {STAGES.map(stage => (
          <DealColumn
            key={stage}
            stage={stage}
            deals={deals.filter(d => d.stage === stage)}
            onDropDeal={handleDrop}
            onEditDeal={handleOpenModal}
            onDeleteDealClick={setDeletingDealId}
          />
        ))}
      </div>
      
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-5 mt-4 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">All Deals</h2>
          <p className="text-sm text-gray-500">
              Total: {deals.filter(d => d.stage !== DealStage.Lost).length} deals worth {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDealsValue)}
          </p>
      </div>

      {isModalOpen && (
          <DealModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveDeal}
            deal={editingDeal}
          />
      )}
      <ConfirmationModal
        isOpen={deletingDealId !== null}
        onClose={() => setDeletingDealId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Deal"
        message={
            <p>Are you sure you want to delete the deal "<strong>{dealToDelete?.title}</strong>"? This action is permanent and cannot be undone.</p>
        }
      />
    </div>
  );
};
