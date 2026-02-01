
import React, { useState } from 'react';
import { Bell, Search, UserCircle, X, Clock, Users, User, Phone, ChevronRight, GraduationCap, Mail, Bus, Smartphone } from 'lucide-react';
import { INITIAL_ALERTS } from '../constants';
import { UserProfile } from '../types';

interface NavbarProps {
  title: string;
  userProfile: UserProfile | null;
}

const Navbar: React.FC<NavbarProps> = ({ title, userProfile }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const reminders = [
    { id: 'rem-1', message: "Bus starting afternoon route in 15 mins", time: "02:45 PM", type: "Reminder" },
    { id: 'rem-2', message: "Weekly tracking report available", time: "10:00 AM", type: "Reminder" },
    ...INITIAL_ALERTS.slice(0, 3)
  ];

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 sticky top-0 z-40">
      <h1 className="text-lg font-bold text-slate-800 truncate pr-4">
        {title}
      </h1>
      
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="bg-transparent border-none focus:outline-none text-sm ml-2 w-48 text-slate-600 font-medium"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Bus Reminders</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {reminders.map((alert) => (
                  <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                        alert.type === 'Emergency' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-snug">{alert.message}</p>
                        <div className="flex items-center mt-1 text-[10px] text-slate-400 font-medium">
                          <Clock size={10} className="mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative flex items-center space-x-2 pl-2 border-l border-slate-200">
          <div className="text-right hidden lg:block">
            <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
              {userProfile?.email.split('@')[0] || 'Parent'}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Linked Account</p>
          </div>
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="p-1 hover:bg-slate-50 rounded-full transition-colors focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <UserCircle size={36} className="text-slate-300" />
          </button>

          {showProfile && userProfile && (
            <div className="absolute right-0 top-14 w-80 bg-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="p-6 bg-slate-50/80 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">My Profile</span>
                  <button onClick={() => setShowProfile(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-900/10">
                    {userProfile.childName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 tracking-tight leading-none mb-1">{userProfile.childName}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{userProfile.childGrade}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Parent Info</h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center text-[11px] text-slate-600 font-medium">
                      <Mail size={12} className="mr-2 text-blue-500" />
                      <span className="truncate">{userProfile.email}</span>
                    </div>
                    <div className="flex items-center text-[11px] text-slate-600 font-medium">
                      <Smartphone size={12} className="mr-2 text-blue-500" />
                      <span>{userProfile.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Transportation</h4>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <Bus size={14} className="mr-2 text-blue-600" />
                      <span className="text-[11px] font-black text-blue-800">{userProfile.busRoute}</span>
                    </div>
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button className="w-full py-2.5 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-colors">
                  Edit Account Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
