
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RetailersPage } from './components/RetailersPage';
import { VendorsPage } from './components/VendorsPage';
import { TicketsPage } from './components/TicketsPage';
import { CreateTicketPage } from './components/CreateTicketPage';
import { ProposalsPage } from './components/ProposalsPage';
import { SettingsPage } from './components/SettingsPage';
import { DealsPage } from './components/DealsPage';
import { Page, Retailer, Vendor, Ticket, Proposal, Lead, Deal, DealStage, UserProfile, TicketStatus } from './types';
import { LeadsPage } from './components/LeadsPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [isLoading, setIsLoading] = useState(true);

  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({ id: 1, fullName: '', email: '', phone: '' });

  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const data = await response.json();
        setter(data || []); // Ensure we always set an array, even if the API returns null
        return data;
    } catch (error) {
        console.error(error);
        // Set to empty array on failure to prevent app crash
        setter([]);
        return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/profile');
          if (!response.ok) throw new Error('Profile fetch failed');
          const data = await response.json();
          setUserProfile(data || { id: 1, fullName: 'Guest', email: '', phone: '' });
        } catch (error) {
          console.error('Error fetching profile:', error);
          // On error, we still set a valid profile object to avoid crashes
          setUserProfile({ id: 1, fullName: 'Guest', email: 'error@loading.com', phone: '' });
        }
      };
      
      await Promise.all([
        fetchData('/api/retailers', setRetailers),
        fetchData('/api/vendors', setVendors),
        fetchData('/api/tickets', setTickets),
        fetchData('/api/proposals', setProposals),
        fetchData('/api/leads', setLeads),
        fetchData('/api/deals', setDeals),
        fetchProfile(),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const apiRequest = async (url: string, method: string, body?: any) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed to ${url}: ${response.statusText} - ${errorText}`);
    }
    if (response.status === 204) {
      return null;
    }
    return response.json();
  };

  const addRetailer = async (retailer: Omit<Retailer, 'id'>) => {
    const newRetailer = await apiRequest('/api/retailers', 'POST', retailer);
    setRetailers(prev => [...prev, newRetailer]);
  };

  const updateRetailer = async (updatedRetailer: Retailer) => {
    const returnedRetailer = await apiRequest('/api/retailers', 'PUT', updatedRetailer);
    setRetailers(prev => prev.map(r => r.id === returnedRetailer.id ? returnedRetailer : r));
  };

  const addVendor = async (vendor: Omit<Vendor, 'id'>) => {
    const newVendor = await apiRequest('/api/vendors', 'POST', vendor);
    setVendors(prev => [...prev, newVendor]);
  };

  const updateVendor = async (updatedVendor: Vendor) => {
    const returnedVendor = await apiRequest('/api/vendors', 'PUT', updatedVendor);
    setVendors(prev => prev.map(v => v.id === returnedVendor.id ? returnedVendor : v));
  };
  
  const addLead = async (lead: Omit<Lead, 'id'>) => {
    const newLead = await apiRequest('/api/leads', 'POST', lead);
    setLeads(prev => [...prev, newLead]);
  };

  const updateLead = async (updatedLead: Lead) => {
    const returnedLead = await apiRequest('/api/leads', 'PUT', updatedLead);
    setLeads(prev => prev.map(l => l.id === returnedLead.id ? returnedLead : l));
  };

  const deleteLead = async (leadId: number) => {
    await apiRequest('/api/leads', 'DELETE', { id: leadId });
    setLeads(prev => prev.filter(l => l.id !== leadId));
  };

  const addTicket = async (ticket: Omit<Ticket, 'id' | 'status' | 'createdAt'>) => {
    const newTicket = await apiRequest('/api/tickets', 'POST', ticket);
    setTickets(prev => [...prev, newTicket]);
  };

  const updateTicket = async (updatedTicket: Ticket) => {
    const returnedTicket = await apiRequest('/api/tickets', 'PUT', updatedTicket);
    setTickets(prev => prev.map(t => t.id === returnedTicket.id ? returnedTicket : t));
  };

  const addProposal = async (proposal: Omit<Proposal, 'id'>) => {
    const newProposal = await apiRequest('/api/proposals', 'POST', proposal);
    setProposals(prev => [...prev, newProposal]);
  };

  const updateProposal = async (updatedProposal: Proposal) => {
    const returnedProposal = await apiRequest('/api/proposals', 'PUT', updatedProposal);
    setProposals(prev => prev.map(p => p.id === returnedProposal.id ? returnedProposal : p));
  };

  const deleteProposal = async (proposalId: number) => {
    await apiRequest('/api/proposals', 'DELETE', { id: proposalId });
    setProposals(prev => prev.filter(p => p.id !== proposalId));
  };
  
  const addDeal = async (deal: Omit<Deal, 'id'>) => {
    const newDeal = await apiRequest('/api/deals', 'POST', deal);
    setDeals(prev => [...prev, newDeal]);
  };

  const updateDeal = async (updatedDeal: Deal) => {
    const returnedDeal = await apiRequest('/api/deals', 'PUT', updatedDeal);
    setDeals(prev => prev.map(d => d.id === returnedDeal.id ? returnedDeal : d));
  };

  const deleteDeal = async (dealId: number) => {
    await apiRequest('/api/deals', 'DELETE', { id: dealId });
    setDeals(prev => prev.filter(d => d.id !== dealId));
  };

  const handleUpdateDealStage = async (dealId: number, newStage: DealStage) => {
    const dealToUpdate = deals.find(d => d.id === dealId);
    if (dealToUpdate) {
        const updatedDeal = { ...dealToUpdate, stage: newStage };
        await updateDeal(updatedDeal);
    }
  };

  const handleUpdateProfile = async (profile: UserProfile) => {
    const updatedProfile = await apiRequest('/api/profile', 'PUT', profile);
    setUserProfile(updatedProfile);
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-green-700 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg text-gray-700">Loading your CRM...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard retailers={retailers} vendors={vendors} />;
      case Page.Leads:
         return <LeadsPage leads={leads} onAddLead={addLead} onUpdateLead={updateLead} onDeleteLead={deleteLead} />;
      case Page.Deals:
        return <DealsPage deals={deals} onUpdateDealStage={handleUpdateDealStage} onAddDeal={addDeal} onUpdateDeal={updateDeal} onDeleteDeal={deleteDeal} />;
      case Page.Vendors:
        return <VendorsPage vendors={vendors} addVendor={addVendor} updateVendor={updateVendor} />;
      case Page.Retailers:
        return <RetailersPage retailers={retailers} addRetailer={addRetailer} updateRetailer={updateRetailer} />;
      case Page.Proposals:
        return <ProposalsPage proposals={proposals} onAddProposal={addProposal} onUpdateProposal={updateProposal} onDeleteProposal={deleteProposal} />;
       case Page.Settings:
        return <SettingsPage profile={userProfile} onSaveProfile={handleUpdateProfile} />;
       case Page.Tickets:
        return <TicketsPage tickets={tickets} retailers={retailers} vendors={vendors} onUpdateTicket={updateTicket} />;
      case Page.CreateTicket:
        return <CreateTicketPage retailers={retailers} vendors={vendors} onAddTicket={addTicket} />;
      default:
        return <Dashboard retailers={retailers} vendors={vendors} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userProfile={userProfile} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
