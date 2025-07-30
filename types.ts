export enum AccountStatus {
  Active = 'Active',
  Deactivated = 'Deactivated',
}

export enum MarketplaceStatus {
  Activated = 'Activated',
  Retained = 'Retained',
  Dormant = 'Dormant',
  Churned = 'Churned',
  Resurrected = 'Resurrected',
}

export enum ProposalStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Viewed = 'Viewed',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export enum Page {
    Dashboard = 'Dashboard',
    Leads = 'Leads',
    Deals = 'Deals',
    Vendors = 'Vendors',
    Retailers = 'Retailers',
    Proposals = 'Proposals',
    Settings = 'Settings',
    // Kept for logic, but removed from sidebar UI
    Tickets = 'Tickets',
    CreateTicket = 'Create Ticket',
}

export enum UserType {
    Retailer = 'Retailer',
    Vendor = 'Vendor'
}

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Closed = 'Closed',
}

export enum TicketType {
  Support = 'Support',
  FeatureRequest = 'Feature Request',
}

export enum LeadStatus {
  New = 'New',
  Contacted = 'Contacted',
  Proposal = 'Proposal',
  Qualified = 'Qualified',
  Lost = 'Lost',
}

export enum DealStage {
    New = 'New',
    Discovery = 'Discovery',
    Proposal = 'Proposal',
    Negotiation = 'Negotiation',
    ClosedWon = 'Closed Won',
    Lost = 'Lost',
}

export interface BaseUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  accountStatus: AccountStatus;
  marketplaceStatus: MarketplaceStatus;
  joinDate: string;
}

export interface Retailer extends BaseUser {
  company: string;
}

export interface Vendor extends BaseUser {
  businessName: string;
  category: string;
}

export type User = Retailer | Vendor;

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  type: TicketType;
  userId: number; // Corresponds to Retailer or Vendor ID
  userType: UserType;
  createdAt: string;
}

export interface Proposal {
  id: number;
  title: string;
  clientName: string;
  clientCompany: string;
  value: number;
  currency: string;
  status: ProposalStatus;
  validUntil: string;
  sentDate: string;
  createdAt: string;
}

export interface Lead {
  id: number;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  value: number;
}

export interface Deal {
    id: number;
    title: string;
    company: string;
    contactName: string;
    value: number;
    stage: DealStage;
    probability: number;
    closeDate: string;
}

export interface UserProfile {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
}
