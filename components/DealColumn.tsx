
import React, { useState } from 'react';
import { Deal, DealStage } from '../types';
import { DealCard } from './DealCard';

interface DealColumnProps {
  stage: DealStage;
  deals: Deal[];
  onDropDeal: (dealId: number, newStage: DealStage) => void;
  onEditDeal: (deal: Deal) => void;
  onDeleteDealClick: (id: number) => void;
}

const stageConfig: Record<DealStage, { tagColor: string; title: string; borderColor?: string }> = {
    [DealStage.New]: { tagColor: 'bg-gray-200 text-gray-800', title: 'New' },
    [DealStage.Discovery]: { tagColor: 'bg-blue-100 text-blue-800', title: 'Discovery', borderColor: 'border-blue-500' },
    [DealStage.Proposal]: { tagColor: 'bg-yellow-100 text-yellow-800', title: 'Proposal', borderColor: 'border-yellow-500' },
    [DealStage.Negotiation]: { tagColor: 'bg-orange-100 text-orange-800', title: 'Negotiation', borderColor: 'border-orange-500' },
    [DealStage.ClosedWon]: { tagColor: 'bg-green-100 text-green-800', title: 'Closed Won', borderColor: 'border-green-500' },
    [DealStage.Lost]: { tagColor: 'bg-red-100 text-red-800', title: 'Lost', borderColor: 'border-red-500' },
};


export const DealColumn: React.FC<DealColumnProps> = ({ stage, deals, onDropDeal, onEditDeal, onDeleteDealClick }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const dealId = parseInt(e.dataTransfer.getData('dealId'), 10);
    const originStage = e.dataTransfer.getData('originStage');
    if(dealId && stage !== originStage) {
        onDropDeal(dealId, stage);
    }
  };

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const { tagColor, title } = stageConfig[stage];

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-80 flex-shrink-0 bg-gray-50/70 rounded-lg p-3 flex flex-col border-2 border-dashed transition-colors duration-200 ${isOver ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
    >
      <div className={`p-2 mb-3`}>
        <div className="flex items-center justify-between">
           <span className={`px-2 py-0.5 text-xs font-semibold rounded ${tagColor}`}>{title}</span>
        </div>
        <div className="mt-3">
            <span className="text-3xl font-bold text-gray-800">{deals.length}</span>
            <span className="text-sm font-medium text-gray-500 ml-2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalValue)}
            </span>
        </div>
      </div>
      <div className="space-y-3 overflow-y-auto flex-grow min-h-40">
        {deals.length > 0 ? (
            deals.map(deal => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                onEdit={onEditDeal}
                onDeleteClick={onDeleteDealClick}
             />
            ))
        ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
                No deals in this stage
            </div>
        )}
      </div>
    </div>
  );
};