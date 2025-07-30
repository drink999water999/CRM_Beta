
import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from './ToggleSwitch';

interface SettingsPageProps {
    profile: {
        fullName: string;
        email: string;
        phone: string;
    };
    onSaveProfile: (profile: { fullName: string; email: string; phone: string; }) => void;
}

const SettingsCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-6">
            <div className="text-gray-500 mr-3">{icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {children}
    </div>
);

const FormInput: React.FC<{ label: string; type: string; name: string; value: string; placeholder?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input {...props} id={props.name} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
    </div>
);

const NotificationToggle: React.FC<{ title: string; description: string; enabled: boolean; onToggle: () => void }> = ({ title, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between py-3">
        <div>
            <p className="font-medium text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <ToggleSwitch enabled={enabled} onChange={onToggle} />
    </div>
);

export const SettingsPage: React.FC<SettingsPageProps> = ({ profile: initialProfile, onSaveProfile }) => {
    const [profile, setProfile] = useState(initialProfile);
    const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmPassword: ''});
    const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });
    const [system, setSystem] = useState({ autosave: true, dataExport: true });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setProfile(initialProfile);
    }, [initialProfile]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleProfileSave = () => {
        onSaveProfile(profile);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="mt-1 text-gray-500">Manage your CRM preferences</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    {/* Profile Settings */}
                    <SettingsCard title="Profile Settings" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}>
                        <div className="space-y-4">
                            <FormInput label="Full Name" type="text" name="fullName" value={profile.fullName} onChange={handleProfileChange}/>
                            <FormInput label="Email" type="email" name="email" value={profile.email} onChange={handleProfileChange}/>
                            <FormInput label="Phone" type="tel" name="phone" value={profile.phone} onChange={handleProfileChange}/>
                            <button 
                                onClick={handleProfileSave}
                                className="w-full px-4 py-2 mt-2 bg-[var(--primary)] text-white font-bold rounded-md hover:bg-green-700 transition-colors"
                            >
                                {isSaved ? 'Saved!' : 'Save Changes'}
                            </button>
                        </div>
                    </SettingsCard>
                    {/* Security */}
                    <SettingsCard title="Security" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}>
                         <div className="space-y-4">
                            <FormInput label="Current Password" type="password" name="currentPassword" value={password.currentPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                            <FormInput label="New Password" type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                            <FormInput label="Confirm Password" type="password" name="confirmPassword" value={password.confirmPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                            <button className="w-full px-4 py-2 mt-2 bg-[var(--primary)] text-white font-bold rounded-md hover:bg-green-700">Update Password</button>
                        </div>
                    </SettingsCard>
                </div>
                <div className="space-y-8">
                    {/* Notifications */}
                    <SettingsCard title="Notifications" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}>
                        <div className="divide-y divide-gray-200">
                             <NotificationToggle title="Email Notifications" description="Receive email updates for new leads and deals" enabled={notifications.email} onToggle={() => setNotifications(p => ({...p, email: !p.email}))} />
                             <NotificationToggle title="Push Notifications" description="Get browser notifications for important events" enabled={notifications.push} onToggle={() => setNotifications(p => ({...p, push: !p.push}))} />
                             <NotificationToggle title="SMS Alerts" description="Receive SMS for urgent notifications" enabled={notifications.sms} onToggle={() => setNotifications(p => ({...p, sms: !p.sms}))} />
                        </div>
                    </SettingsCard>
                    {/* System */}
                    <SettingsCard title="System" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                        <div className="divide-y divide-gray-200">
                           <NotificationToggle title="Auto-save" description="Automatically save changes" enabled={system.autosave} onToggle={() => setSystem(p => ({...p, autosave: !p.autosave}))} />
                           <NotificationToggle title="Data Export" description="Allow data export in CSV format" enabled={system.dataExport} onToggle={() => setSystem(p => ({...p, dataExport: !p.dataExport}))} />
                        </div>
                        <button className="w-full px-4 py-2 mt-4 border border-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-50">Export All Data</button>
                    </SettingsCard>
                </div>
            </div>
        </div>
    );
};