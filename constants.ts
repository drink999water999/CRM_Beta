
import { Retailer, Vendor, AccountStatus, MarketplaceStatus, UserType, Ticket, TicketStatus, TicketType, Proposal, ProposalStatus, Lead, LeadStatus, Deal, DealStage } from './types';

export const INITIAL_LEADS: Lead[] = [
    {
        id: 1,
        company: 'Hint',
        contactName: 'Hamda',
        email: 'hamada@hamada.hamada',
        phone: '96655343434',
        status: LeadStatus.Contacted,
        source: 'Cold Call',
        value: 4000
    },
    {
        id: 2,
        company: 'Speero',
        contactName: 'Ameen Mahfouz',
        email: 'ameen@qawafel.sa',
        phone: '96655666',
        status: LeadStatus.Proposal,
        source: 'Website',
        value: 100
    }
];

export const INITIAL_RETAILERS: Retailer[] = [
  { id: 1, name: 'Ahmed Hassan', company: 'FreshMart', email: 'ahmed.h@freshmart.com', phone: '+201001234567', accountStatus: AccountStatus.Active, marketplaceStatus: MarketplaceStatus.Activated, joinDate: '2023-01-15' },
  { id: 2, name: 'Fatima Ali', company: 'SuperGoods', email: 'fatima.a@supergoods.co', phone: '+201002345678', accountStatus: AccountStatus.Active, marketplaceStatus: MarketplaceStatus.Retained, joinDate: '2023-03-22' },
  { id: 3, name: 'Youssef Ibrahim', company: 'Daily Needs', email: 'y.ibrahim@dailyneeds.net', phone: '+201003456789', accountStatus: AccountStatus.Active, marketplaceStatus: MarketplaceStatus.Dormant, joinDate: '2023-05-10' },
  { id: 4, name: 'Sara Adel', company: 'Quick Grocer', email: 'sara.adel@qgrocer.com', phone: '+201004567890', accountStatus: AccountStatus.Deactivated, marketplaceStatus: MarketplaceStatus.Churned, joinDate: '2023-02-01' },
];

export const INITIAL_VENDORS: Vendor[] = [
  { id: 1, name: 'Khalid Mansour', businessName: 'Organic Farms', category: 'Fresh Produce', email: 'contact@organicfarms.com', phone: '+201221112233', accountStatus: AccountStatus.Active, marketplaceStatus: MarketplaceStatus.Activated, joinDate: '2022-11-05' },
  { id: 2, name: 'Noura Said', businessName: 'Quality Meats Co.', category: 'Butchery', email: 'noura.s@qualitymeats.com', phone: '+20122223344', accountStatus: AccountStatus.Active, marketplaceStatus: MarketplaceStatus.Retained, joinDate: '2023-01-20' },
  { id: 3, name: 'Amir Tarek', businessName: 'The Spice House', category: 'Spices & Herbs', email: 'amir.t@spicehouse.biz', phone: '+201223334455', accountStatus: AccountStatus.Active, marketplaceStatus: MarketplaceStatus.Resurrected, joinDate: '2023-06-01' },
  { id: 4, name: 'Layla Zaki', businessName: 'Bakery Delights', category: 'Baked Goods', email: 'layla@bakerydelights.com', phone: '+201224445566', accountStatus: AccountStatus.Deactivated, marketplaceStatus: MarketplaceStatus.Churned, joinDate: '2022-12-12' },
];

export const INITIAL_TICKETS: Ticket[] = [
  { id: 1, title: 'Cannot login to portal', description: 'User Ahmed Hassan from FreshMart reports they are unable to login since yesterday.', status: TicketStatus.Open, type: TicketType.Support, userId: 1, userType: UserType.Retailer, createdAt: '2023-06-10' },
  { id: 2, title: 'Request for bulk order discount feature', description: 'Noura Said from Quality Meats Co. would like to see a feature for applying discounts to bulk orders automatically.', status: TicketStatus.InProgress, type: TicketType.FeatureRequest, userId: 2, userType: UserType.Vendor, createdAt: '2023-06-09' },
  { id: 3, title: 'Late delivery from "Organic Farms"', description: 'Retailer "SuperGoods" reports a late delivery from vendor "Organic Farms". Following up with vendor.', status: TicketStatus.Closed, type: TicketType.Support, userId: 2, userType: UserType.Retailer, createdAt: '2023-06-05' },
  { id: 4, title: 'Feature Request: a dashboard for vendors', description: 'Amir Tarek from The Spice House wants a dashboard to see his sales stats.', status: TicketStatus.Open, type: TicketType.FeatureRequest, userId: 3, userType: UserType.Vendor, createdAt: '2023-06-11' },
];

export const INITIAL_PROPOSALS: Proposal[] = [
    { 
        id: 1, 
        title: 'Qawafel One SaaS 1 Year Subscription', 
        clientName: 'Ameen Mahfouz', 
        clientCompany: 'Speero',
        value: 6000,
        currency: 'SAR',
        status: ProposalStatus.Sent,
        validUntil: '2025-07-31',
        sentDate: '2025-07-25',
        createdAt: '2024-07-25'
    },
];

export const INITIAL_DEALS: Deal[] = [
    { id: 1, title: "Emirates Solutions Deal", company: "Emirates Solutions", contactName: "Khalid Al-Rashid", value: 18500, stage: DealStage.Discovery, probability: 45, closeDate: "2025-10-05" },
    { id: 2, title: "Gulf Trading Partnership", company: "Gulf Trading Co", contactName: "Fatima Al-Zahra", value: 22000, stage: DealStage.Proposal, probability: 80, closeDate: "2025-09-10" },
    { id: 3, title: "Al-Farisi Group Project", company: "Al-Farisi Group", contactName: "Omar Al-Mahmoud", value: 15000, stage: DealStage.Negotiation, probability: 60, closeDate: "2025-08-15" },
    { id: 4, title: "Modern Tech Integration", company: "Modern Tech", contactName: "Sara Ibrahim", value: 30000, stage: DealStage.Proposal, probability: 70, closeDate: "2025-11-01" },
    { id: 5, title: "Innovate Hub Contract", company: "Innovate Hub", contactName: "Youssef Ahmed", value: 12000, stage: DealStage.Discovery, probability: 50, closeDate: "2025-10-20" },
    { id: 6, title: "Legacy System Overhaul", company: "OldTech Co.", contactName: "Ali Khan", value: 50000, stage: DealStage.Lost, probability: 10, closeDate: "2024-05-15" },
];

export const MESSAGE_TEMPLATES = {
    [UserType.Retailer]: ['Welcome a new retailer', 'Follow up on pending application', 'Special promotion announcement', 'Acknowledge support ticket'],
    [UserType.Vendor]: ['Onboard a new vendor', 'Request updated product catalog', 'Follow up on an order', 'Acknowledge feature request']
};