
import React from 'react';
import { ICONS } from '../constants';
import { NavigationTab } from '../types';
import { LogOut, Activity, Circle } from 'lucide-react';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems: NavigationTab[] = [
    'Dashboard',
    'Live Tracking',
    'Speed Monitor',
    'Alerts',
    'Driver Details',
    'Parents',
    'Settings'
  ];

  const busStatuses = [
    { id: 'SB-101', status: 'Running', color: 'bg-emerald-500' },
    { id: 'SB-204', status: 'Running', color: 'bg-emerald-500' },
    { id: 'SB-305', status: 'Stopped', color: 'bg-slate-300' },
    { id: 'SB-412', status: 'On Break', color: 'bg-amber-400' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm z-20">
      <div className="p-6">
        <div className="flex items-center space-x-3 text-orange-600">
          <div className="bg-orange-100 p-2 rounded-lg">
            {ICONS.Bus}
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800">SafeBus IN</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-bold ${
              activeTab === item
                ? 'bg-orange-600 text-white shadow-md shadow-orange-900/10'
                : 'text-slate-600 hover:bg-slate-50 hover:text-orange-600'
            }`}
          >
            <span className={activeTab === item ? 'text-white' : 'text-slate-400'}>
              {ICONS[item as keyof typeof ICONS]}
            </span>
            <span>{item}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100 space-y-4">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">School Bus Status</p>
            <Activity size={12} className="text-orange-500" />
          </div>
          <div className="space-y-2">
            {busStatuses.map(bus => (
              <div key={bus.id} className="flex items-center justify-between">
                <span className="text-[11px] font-black text-slate-700">{bus.id}</span>
                <div className="flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${bus.color} ${bus.status === 'Running' ? 'animate-pulse' : ''}`} />
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{bus.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('Logout' as any)}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
