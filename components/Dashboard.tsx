
import React from 'react';
import { Retailer, Vendor } from '../types';
import { StatCard } from './StatCard';

interface DashboardProps {
  retailers: Retailer[];
  vendors: Vendor[];
}

const RecentLeads: React.FC<{ leads: Retailer[] }> = ({ leads }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Leads</h2>
        <div className="space-y-4">
            {leads.slice(0, 2).map((lead, index) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                        <p className="font-semibold text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.company}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${index === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {index === 0 ? 'New' : 'Contacted'}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const PipelineOverview: React.FC = () => {
    const pipelineData = [
        { stage: 'Prospect', deals: 23, value: 45000 },
        { stage: 'Discovery', deals: 15, value: 67500 },
        { stage: 'Proposal', deals: 9, value: 82000 },
    ];
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pipeline Overview</h2>
            <div className="space-y-3">
                {pipelineData.map(item => (
                    <div key={item.stage} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-gray-900">{item.stage}</p>
                            <p className="font-semibold text-gray-900">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(item.value)}
                            </p>
                        </div>
                        <p className="text-sm text-gray-600">{item.deals} deals</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const Dashboard: React.FC<DashboardProps> = ({ retailers, vendors }) => {
  const totalLeads = retailers.length;
  const totalVendors = vendors.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome to your CRM dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Leads" value={totalLeads.toString()} change="+20.1% from last month" icon="users" color="blue" />
        <StatCard title="Active Deals" value="157" change="+12.5% from last month" icon="target" color="green" />
        <StatCard title="Vendors" value={totalVendors.toString()} change="+5.2% from last month" icon="store" color="purple" />
        <StatCard title="Retailers" value={totalLeads.toString()} change="+8.7% from last month" icon="building" color="orange" />
        <StatCard title="Revenue" value="$127,450" change="+15.3% from last month" icon="dollar" color="teal" />
        <StatCard title="Growth Rate" value="24.8%" change="+2.1% from last month" icon="chart" color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <RecentLeads leads={retailers} />
        </div>
        <div>
            <PipelineOverview />
        </div>
      </div>
    </div>
  );
};