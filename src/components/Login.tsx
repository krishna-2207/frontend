
import React, { useState } from 'react';
import { Bus, Mail, Phone, Lock, ArrowRight, ShieldCheck, User, GraduationCap, MapPin } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginProps {
  onLogin: (profile: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childGrade, setChildGrade] = useState('');
  const [busRoute, setBusRoute] = useState('SB-101');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && childName) {
      onLogin({
        email,
        altEmail,
        phone,
        altPhone,
        childName,
        childGrade,
        busRoute
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40 mb-6">
            <Bus size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Parent Registration</h1>
          <p className="text-slate-400 text-sm font-medium">Link your child and set up tracking alerts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Parent Contact */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Parent Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Primary Email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="email" value={altEmail} onChange={(e) => setAltEmail(e.target.value)}
                    placeholder="Alternative Email (Optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="relative group">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Primary Phone"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="relative group">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="tel" value={altPhone} onChange={(e) => setAltPhone(e.target.value)}
                    placeholder="Alternative Phone (Optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Student Details */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-2">Student & Route Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" required value={childName} onChange={(e) => setChildName(e.target.value)}
                  placeholder="Child's Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                />
              </div>
              <div className="relative group">
                <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" required value={childGrade} onChange={(e) => setChildGrade(e.target.value)}
                  placeholder="Grade / Age"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 text-sm"
                />
              </div>
              <div className="relative group md:col-span-2">
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <select 
                  value={busRoute} onChange={(e) => setBusRoute(e.target.value)}
                  className="w-full bg-[#1a1e28] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer text-sm"
                >
                  <option value="SB-101">Bus SB-101 (Westside Loop)</option>
                  <option value="SB-204">Bus SB-204 (Central Hub)</option>
                  <option value="SB-305">Bus SB-305 (North Ridge)</option>
                  <option value="SB-412">Bus SB-412 (East Coast)</option>
                  <option value="SB-500">Bus SB-500 (Express Way)</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-all"
          >
            <span>Activate Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Secure Family Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
