
import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../types';

type LeadData = Partial<Omit<Lead, 'id'>>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Omit<Lead, 'id'> | Lead) => void;
  lead?: Lead;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, onSave, lead }) => {
  const [formData, setFormData] = useState<LeadData>({});

  useEffect(() => {
    if (lead) {
      setFormData(lead);
    } else {
      setFormData({
        company: '',
        contactName: '',
        email: '',
        phone: '',
        status: LeadStatus.New,
        source: '',
        value: 0,
      });
    }
  }, [lead]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.contactName) return; // Basic validation
    const payload = lead ? { ...lead, ...formData } : { ...formData };
    onSave(payload as any);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white border border-[var(--border-color)] rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[var(--text-dark)]">{lead ? 'Edit' : 'Add'} Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-[var(--text-light)]">Company Name</label>
                <input type="text" name="company" value={formData.company || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-light)]">Contact Name</label>
                <input type="text" name="contactName" value={formData.contactName || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
              </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-light)]">Email</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-light)]">Phone</label>
            <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-[var(--text-light)]">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]">
                {Object.values(LeadStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
             </div>
             <div>
              <label className="block text-sm font-medium text-[var(--text-light)]">Source</label>
              <input type="text" name="source" value={formData.source || ''} onChange={handleChange} placeholder="e.g., Website" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
             </div>
          </div>
           <div>
              <label className="block text-sm font-medium text-[var(--text-light)]">Value ($)</label>
              <input type="number" name="value" value={formData.value || 0} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
            </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-white font-bold rounded-md hover:bg-green-700">
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};