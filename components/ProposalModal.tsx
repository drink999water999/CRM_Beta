
import React, { useState, useEffect } from 'react';
import { Proposal, ProposalStatus } from '../types';

type ProposalData = Partial<Omit<Proposal, 'id' | 'createdAt' | 'sentDate'>>;

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (proposal: Omit<Proposal, 'id'> | Proposal) => void;
  proposal?: Proposal;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, onSave, proposal }) => {
  const [formData, setFormData] = useState<ProposalData>({});

  useEffect(() => {
    if (proposal) {
      setFormData({
        ...proposal,
        validUntil: proposal.validUntil ? new Date(proposal.validUntil).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        clientName: '',
        clientCompany: '',
        value: 0,
        currency: 'SAR',
        status: ProposalStatus.Draft,
        validUntil: '',
      });
    }
  }, [proposal, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.clientName) return; 
    
    const payload = {
        ...formData,
        sentDate: (formData.status === ProposalStatus.Sent && !(proposal?.sentDate)) 
            ? new Date().toISOString().split('T')[0] 
            : proposal?.sentDate || '',
        createdAt: proposal?.createdAt || new Date().toISOString().split('T')[0],
    };
    
    if (proposal) {
        onSave({ ...proposal, ...payload });
    } else {
        onSave(payload as Omit<Proposal, 'id'>);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white border border-[var(--border-color)] rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-[var(--text-dark)]">{proposal ? 'Edit' : 'Create'} Proposal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-light)]">Proposal Title</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-[var(--text-light)]">Client Name</label>
                <input type="text" name="clientName" value={formData.clientName || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-[var(--text-light)]">Client Company</label>
                <input type="text" name="clientCompany" value={formData.clientCompany || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
             <div>
                <label className="block text-sm font-medium text-[var(--text-light)]">Value</label>
                <input type="number" name="value" value={formData.value || 0} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-[var(--text-light)]">Currency</label>
                <input type="text" name="currency" value={formData.currency || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-[var(--text-light)]">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]">
                    {Object.values(ProposalStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-light)]">Valid Until</label>
            <input type="date" name="validUntil" value={formData.validUntil || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-white font-bold rounded-md hover:bg-green-700">
              Save Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};