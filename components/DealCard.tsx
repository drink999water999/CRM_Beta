
import React from 'react';
import { Deal } from '../types';

interface DealCardProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDeleteClick: (id: number) => void;
}

const CardInfoRow: React.FC<{ icon: React.ReactNode; text: string | React.ReactNode, className?: string }> = ({ icon, text, className }) => (
    <div className={`flex items-center text-xs text-gray-500 ${className}`}>
        <span className="mr-1.5 h-4 w-4">{icon}</span>
        {text}
    </div>
);

export const DealCard: React.FC<DealCardProps> = ({ deal, onEdit, onDeleteClick }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('dealId', deal.id.toString());
    e.dataTransfer.setData('originStage', deal.stage);
  };

  const handleDelete = () => {
    onDeleteClick(deal.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-start">
        <div>
            <p className="font-bold text-sm text-gray-800">{deal.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{deal.company} - {deal.contactName}</p>
        </div>
        <div className="flex space-x-1 flex-shrink-0">
            <button onClick={() => onEdit(deal)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md" title="Edit Deal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
            </button>
            <button onClick={handleDelete} className="p-1.5 rounded-md transition-colors text-gray-400 hover:bg-red-50 hover:text-red-600" title="Delete Deal">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </div>
      </div>
      <div className="mt-3 flex items-center space-x-4">
        <CardInfoRow 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1.667a4.002 4.002 0 00-3.464-3.993l-.001-.94a1 1 0 00-1-1H7a1 1 0 00-1 1v.94A4.002 4.002 0 002.537 6M12 21v-1.667a4.002 4.002 0 013.464-3.993l.001-.94a1 1 0 011-1h.5a1 1 0 011 1v.94a4.002 4.002 0 013.463 3.992" /></svg>}
            text={<span className="font-semibold text-green-600 text-sm">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(deal.value)}</span>}
            className="flex-1"
        />
         <CardInfoRow 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            text={<>{deal.probability}% probability</>}
        />
         <CardInfoRow 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            text={<>{new Date(deal.closeDate).toLocaleDateString()}</>}
        />
      </div>
    </div>
  );
};