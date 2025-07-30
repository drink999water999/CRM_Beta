
import React, { useState } from 'react';
import { Ticket, TicketType, UserType, Retailer, Vendor } from '../types';

type TicketData = {
  user: string;
  type: TicketType;
  title: string;
  description: string;
};

const initialFormState: TicketData = {
  user: '',
  type: TicketType.Support,
  title: '',
  description: '',
};

interface CreateTicketPageProps {
  onAddTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'createdAt'>) => void;
  retailers: Retailer[];
  vendors: Vendor[];
}

export const CreateTicketPage: React.FC<CreateTicketPageProps> = ({ onAddTicket, retailers, vendors }) => {
  const [formData, setFormData] = useState<TicketData>(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [userType, userIdStr] = formData.user.split('-');
    const userId = parseInt(userIdStr, 10);
    
    const newTicket = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      userId,
      userType: userType as UserType,
    };
    onAddTicket(newTicket);
    setFormData(initialFormState);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Hide message after 3 seconds
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-[--text-primary]">Create a New Ticket</h1>
      <div className="bg-[--bg-dark-secondary] border border-[--border-dark] rounded-lg shadow-xl p-8 w-full max-w-2xl mx-auto">
        <p className="text-[--text-secondary] mb-6">Submit a support request or a feature idea. Our team will get back to you shortly.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[--text-secondary]">I am a...</label>
            <select name="user" value={formData.user} onChange={handleChange} required className="mt-1 block w-full bg-transparent border border-[--border-dark] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary]">
              <option value="" disabled>Select your account</option>
              <optgroup label="Retailers">
                {retailers.map(r => <option key={`Retailer-${r.id}`} value={`Retailer-${r.id}`}>{r.name} ({r.company})</option>)}
              </optgroup>
              <optgroup label="Vendors">
                {vendors.map(v => <option key={`Vendor-${v.id}`} value={`Vendor-${v.id}`}>{v.name} ({v.businessName})</option>)}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[--text-secondary]">Ticket Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full bg-transparent border border-[--border-dark] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary]">
              <option value={TicketType.Support}>Support</option>
              <option value={TicketType.FeatureRequest}>Feature Request</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[--text-secondary]">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Issue with my last order" className="mt-1 block w-full bg-transparent border border-[--border-dark] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[--text-secondary]">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} placeholder="Please provide as much detail as possible." className="mt-1 block w-full bg-transparent border border-[--border-dark] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[--accent-primary] focus:border-[--accent-primary]"></textarea>
          </div>
          
          <div className="flex justify-end items-center space-x-4 pt-4">
             {isSubmitted && <span className="text-green-400">Ticket submitted successfully!</span>}
            <button type="submit" className="px-6 py-2 bg-[--accent-primary] text-black font-bold rounded-md hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-gray-800">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};