
import React, { useState, useEffect } from 'react';
import { Deal, DealStage } from '../types';

type DealData = Partial<Omit<Deal, 'id'>>;

interface DealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: Omit<Deal, 'id'> | Deal) => void;
  deal?: Deal;
}

export const DealModal: React.FC<DealModalProps> = ({ isOpen, onClose, onSave, deal }) => {
  const [formData, setFormData] = useState<DealData>({});

  useEffect(() => {
    if (deal) {
      setFormData({
          ...deal,
          closeDate: deal.closeDate ? new Date(deal.closeDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        company: '',
        contactName: '',
        value: 0,
        probability: 50,
        stage: DealStage.New,
        closeDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [deal, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;
    if (type === 'number' || name === 'probability' || name === 'value') {
        processedValue = parseFloat(value) || 0;
    }
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return; // Basic validation
    const payload = deal ? { ...deal, ...formData } : { ...formData };
    onSave(payload as any);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{deal ? 'Edit' : 'Add'} Deal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Deal Title</label>
              <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Company</label>
                    <input type="text" name="company" value={formData.company || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Contact Name</label>
                    <input type="text" name="contactName" value={formData.contactName || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Value ($)</label>
                    <input type="number" name="value" value={formData.value || 0} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Probability (%)</label>
                    <input type="number" name="probability" min="0" max="100" value={formData.probability || 0} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Stage</label>
                    <select name="stage" value={formData.stage} onChange={handleChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700">
                        {Object.values(DealStage).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Expected Close Date</label>
                    <input type="date" name="closeDate" value={formData.closeDate || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
                </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300">
                Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-800">
                Save Deal
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
