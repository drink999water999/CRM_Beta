import React, { useState, useEffect } from 'react';
import { Retailer, Vendor, User, UserType, AccountStatus, MarketplaceStatus } from '../types';

type UserData = Partial<Omit<User, 'id' | 'joinDate'>>;

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
} & ({
    userType: UserType.Retailer;
    onSave: (user: Omit<Retailer, 'id'> | Retailer) => void;
} | {
    userType: UserType.Vendor;
    onSave: (user: Omit<Vendor, 'id'> | Vendor) => void;
});

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user, userType }) => {
  const [formData, setFormData] = useState<UserData>({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        accountStatus: AccountStatus.Active,
        marketplaceStatus: MarketplaceStatus.Activated,
        ...(userType === UserType.Retailer ? { company: '' } : { businessName: '', category: '' }),
      });
    }
  }, [user, userType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = user ? { ...user, ...formData } : { ...formData, joinDate: new Date().toISOString().split('T')[0]};
    onSave(payload as any);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{user ? 'Edit' : 'Add'} {userType}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">{userType === UserType.Retailer ? 'Contact Name' : 'Contact Name'}</label>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
          </div>
          {userType === UserType.Retailer && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Company</label>
              <input type="text" name="company" value={(formData as Partial<Retailer>).company || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
            </div>
          )}
          {userType === UserType.Vendor && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600">Business Name</label>
                <input type="text" name="businessName" value={(formData as Partial<Vendor>).businessName || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Category</label>
                <input type="text" name="category" value={(formData as Partial<Vendor>).category || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-600">Account Status</label>
              <select name="accountStatus" value={formData.accountStatus} onChange={handleChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700">
                {Object.values(AccountStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
             </div>
             <div>
              <label className="block text-sm font-medium text-gray-600">Marketplace Status</label>
              <select name="marketplaceStatus" value={formData.marketplaceStatus} onChange={handleChange} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-700 focus:border-green-700">
                {Object.values(MarketplaceStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
             </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-800">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};