
import React, { useState } from 'react';
import { Proposal, ProposalStatus } from '../types';
import { ProposalModal } from './ProposalModal';
import { ConfirmationModal } from './ConfirmationModal';

interface ProposalsPageProps {
  proposals: Proposal[];
  onAddProposal: (proposal: Omit<Proposal, 'id'>) => void;
  onUpdateProposal: (proposal: Proposal) => void;
  onDeleteProposal: (id: number) => void;
}

const statusConfig = {
    [ProposalStatus.Draft]: { color: '#9CA3AF', name: 'Draft' }, // gray-400
    [ProposalStatus.Sent]: { color: '#3B82F6', name: 'Sent' }, // blue-500
    [ProposalStatus.Viewed]: { color: '#F59E0B', name: 'Viewed' }, // amber-500
    [ProposalStatus.Accepted]: { color: '#22C55E', name: 'Accepted' }, // green-500
    [ProposalStatus.Rejected]: { color: '#EF4444', name: 'Rejected' }, // red-500
};

const ProposalStatCard: React.FC<{ status: ProposalStatus; count: number; totalValue: number }> = ({ status, count, totalValue }) => {
    const { color, name } = statusConfig[status];
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-3">
             <span className="mt-1.5 flex h-2.5 w-2.5 relative">
                <span style={{ backgroundColor: color }} className={`relative inline-flex rounded-full h-2.5 w-2.5`}></span>
            </span>
            <div>
                <p className="text-sm text-gray-500">{name}</p>
                <p className="text-2xl font-bold mt-1">{count}</p>
                <p className="text-xs text-gray-400">{new Intl.NumberFormat('en-US').format(totalValue)} SAR</p>
            </div>
        </div>
    );
};

const ProposalCard: React.FC<{ 
    proposal: Proposal; 
    onUpdateProposal: (proposal: Proposal) => void;
    onEdit: (proposal: Proposal) => void;
    onDeleteClick: (id: number) => void;
}> = ({ proposal, onUpdateProposal, onEdit, onDeleteClick }) => {
    const { color: statusColor } = statusConfig[proposal.status];

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdateProposal({ ...proposal, status: e.target.value as ProposalStatus });
    };
    
    const handleDelete = () => {
        onDeleteClick(proposal.id);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{proposal.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <select 
                            value={proposal.status} 
                            onChange={handleStatusChange}
                            className={`pl-8 pr-4 py-1 text-sm font-medium rounded-md appearance-none bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-offset-1`}
                            style={{boxShadow: `0 0 0 2px transparent`, transition: 'box-shadow 0.2s'}}
                            onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${statusColor}`}
                            onBlur={(e) => e.target.style.boxShadow = `0 0 0 2px transparent`}
                        >
                            {Object.values(ProposalStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <span style={{ backgroundColor: statusColor }} className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full`}></span>
                    </div>
                     <div className="flex space-x-1">
                        <button onClick={() => onEdit(proposal)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg></button>
                        <button onClick={handleDelete} className="p-2 rounded-md transition-colors text-gray-500 hover:text-red-500 hover:bg-red-50" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500 border-t border-gray-100 pt-4 mt-4">
                 <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>{proposal.clientCompany} - {proposal.clientName}</span>
                 <span className="flex items-center font-semibold text-green-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1.667a4.002 4.002 0 00-3.464-3.993l-.001-.94a1 1 0 00-1-1H7a1 1 0 00-1 1v.94A4.002 4.002 0 002.537 6M12 21v-1.667a4.002 4.002 0 013.464-3.993l.001-.94a1 1 0 011-1h.5a1 1 0 011 1v.94a4.002 4.002 0 013.463 3.992" /></svg>{new Intl.NumberFormat('en-US').format(proposal.value)} {proposal.currency}</span>
                 <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>Valid until {new Date(proposal.validUntil).toLocaleDateString()}</span>
                 <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>Sent {new Date(proposal.sentDate).toLocaleDateString()}</span>
            </div>
        </div>
    );
};


export const ProposalsPage: React.FC<ProposalsPageProps> = ({ proposals, onAddProposal, onUpdateProposal, onDeleteProposal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProposal, setEditingProposal] = useState<Proposal | undefined>(undefined);
    const [deletingProposalId, setDeletingProposalId] = useState<number | null>(null);

    const handleOpenModal = (proposal?: Proposal) => {
        setEditingProposal(proposal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingProposal(undefined);
        setIsModalOpen(false);
    };

    const handleSave = (proposalData: Omit<Proposal, 'id'> | Proposal) => {
        if ('id' in proposalData) {
            onUpdateProposal(proposalData);
        } else {
            onAddProposal(proposalData as Omit<Proposal, 'id'>);
        }
        handleCloseModal();
    };

    const handleConfirmDelete = () => {
        if (deletingProposalId) {
            onDeleteProposal(deletingProposalId);
            setDeletingProposalId(null);
        }
    };

    const proposalToDelete = deletingProposalId ? proposals.find(p => p.id === deletingProposalId) : null;

    const summary = Object.values(ProposalStatus).reduce((acc, status) => {
        const filtered = proposals.filter(p => p.status === status);
        acc[status] = {
            count: filtered.length,
            totalValue: filtered.reduce((sum, p) => sum + p.value, 0)
        };
        return acc;
    }, {} as Record<ProposalStatus, { count: number, totalValue: number }>);

    const totalProposalsValue = proposals.reduce((sum, p) => sum + p.value, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Proposals</h1>
                    <p className="mt-1 text-gray-500">Create and manage your business proposals</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-800 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Create Proposal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {Object.values(ProposalStatus).map(status => (
                    <ProposalStatCard key={status} status={status} count={summary[status].count} totalValue={summary[status].totalValue} />
                ))}
            </div>

            <div className="space-y-5">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">All Proposals</h2>
                    <p className="text-sm text-gray-500">
                        Total: {proposals.length} proposals worth {new Intl.NumberFormat('en-US').format(totalProposalsValue)} SAR
                    </p>
                </div>
                {proposals.map(proposal => (
                    <ProposalCard 
                        key={proposal.id} 
                        proposal={proposal} 
                        onUpdateProposal={onUpdateProposal}
                        onEdit={handleOpenModal}
                        onDeleteClick={setDeletingProposalId} 
                    />
                ))}
            </div>
            {isModalOpen && (
                <ProposalModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    proposal={editingProposal}
                />
            )}
            <ConfirmationModal
                isOpen={deletingProposalId !== null}
                onClose={() => setDeletingProposalId(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Proposal"
                message={
                    <p>Are you sure you want to delete the proposal "<strong>{proposalToDelete?.title}</strong>"? This action is permanent.</p>
                }
            />
        </div>
    );
};
