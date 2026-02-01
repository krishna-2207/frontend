
import React, { useState, useEffect } from 'react';
import MapSection from './MapSection';
import Speedometer from './Speedometer';
import { ICONS, INITIAL_ALERTS, SCHOOL_LOCATION, BUS_STOPS } from '../constants';
import { BusState, StudentMarker } from '../types';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Map, 
  Activity, 
  Wifi, 
  Bus as BusIcon, 
  TrendingUp, 
  UserCheck, 
  Timer, 
  Navigation, 
  PhoneCall, 
  ShieldAlert, 
  TrafficCone, 
  Route, 
  Zap, 
  Siren, 
  Ambulance, 
  Phone,
  AlertCircle,
  ArrowRightLeft,
  ShieldCheck,
  Info,
  AlertTriangle,
  History,
  Shield,
  BellRing,
  // Fix: Added missing Gauge icon import from lucide-react
  Gauge
} from 'lucide-react';

interface DashboardHomeProps {
  busState: BusState;
  studentLocations: StudentMarker[];
}

interface LogEntry {
  id: string;
  name: string;
  action: string;
  time: string;
  location: string;
  eta: string;
  status: 'On Bus' | 'Dropped' | 'Awaiting';
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ busState, studentLocations }) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'l1', name: 'Emma W.', action: 'Boarded', time: '08:14 AM', location: 'Indiranagar Stop', eta: '--', status: 'On Bus' },
    { id: 'l2', name: 'Liam S.', action: 'Boarded', time: '08:31 AM', location: 'MG Road Metro', eta: '--', status: 'On Bus' },
    { id: 'l3', name: 'Noah K.', action: 'Scheduled', time: 'Pending', location: 'Koramangala Stop', eta: '12 mins', status: 'Awaiting' },
    { id: 'l4', name: 'Olivia R.', action: 'Scheduled', time: 'Pending', location: 'Whitefield Stop', eta: '24 mins', status: 'Awaiting' },
  ]);

  const [showParentAlert, setShowParentAlert] = useState(false);

  useEffect(() => {
    // Simulate a parent getting an alert when bus is "near"
    const timer = setTimeout(() => setShowParentAlert(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Parent Alert Notification Panel */}
      {showParentAlert && (
        <div className="bg-blue-600 border-none rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-blue-900/20 text-white animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center space-x-5 mb-4 md:mb-0">
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
              <BellRing size={28} className="animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight tracking-tight">Parent Alert System Active</h3>
              <p className="text-sm font-medium opacity-90">Bus SB-042 is <span className="font-bold underline decoration-2">200 meters away</span> from Emma's House. Notifying parent via SMS.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <button 
              onClick={() => setShowParentAlert(false)}
              className="px-6 py-2.5 bg-white text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg"
             >
                Acknowledge Alert
             </button>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Tracking View */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 text-slate-800">
              <div className="text-orange-600 bg-orange-50 p-2 rounded-xl"><Map size={20} /></div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Indian Fleet Tracking</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Bangalore Metro Zone Stream</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
               <ShieldCheck size={16} className="mr-2" />
               <span className="text-[10px] font-black uppercase tracking-widest">Live GPS Verified</span>
            </div>
          </div>
          <div className="flex-1 min-h-[500px]">
             <MapSection busState={busState} studentLocations={studentLocations} />
          </div>
        </div>

        {/* Speedometer & Stats Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          
          {/* Dashboard Speedometer Integration */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute top-6 left-6 text-slate-800 flex items-center space-x-2">
              <Gauge size={18} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Velocity</span>
            </div>
            <div className="py-6">
              <Speedometer speed={Math.round(busState.speed + 42)} />
            </div>
            <div className="w-full h-px bg-slate-50 my-4" />
            <div className="grid grid-cols-2 w-full gap-4">
               <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bus Status</p>
                  <p className="text-sm font-black text-emerald-600">IN MOTION</p>
               </div>
               <div className="text-center border-l border-slate-50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signal strength</p>
                  <p className="text-sm font-black text-blue-600">STRONG</p>
               </div>
            </div>
          </div>

          {/* Traffic Insights */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="text-red-500 bg-red-50 p-2.5 rounded-2xl"><TrafficCone size={20} /></div>
                <h3 className="font-bold text-lg tracking-tight">Bangalore Traffic</h3>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black tracking-widest uppercase">Moderate</span>
            </div>
            <div className="space-y-6">
               <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:bg-slate-100 transition-colors cursor-default">
                  <div>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Next Junction</p>
                     <p className="text-lg font-black text-slate-800">100 Feet Road</p>
                  </div>
                  <Navigation size={24} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="flex items-start space-x-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                  <Info size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-orange-800 font-medium leading-relaxed">
                    Higher traffic reported near Silk Board. Rerouting algorithms active to save 4 minutes.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Verified Students', value: '18 / 32', icon: <UserCheck size={24} />, color: 'orange' },
          { label: 'Bus Running State', value: 'Active', icon: <Activity size={24} />, color: 'emerald' },
          { label: 'Total Route KMs', value: '42.5 KM', icon: <Route size={24} />, color: 'blue' },
          { label: 'Safety Index', value: 'Secure', icon: <ShieldCheck size={24} />, color: 'purple' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center space-x-5 hover:translate-y-[-4px] transition-all cursor-pointer group">
            <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl group-hover:bg-${stat.color}-600 group-hover:text-white transition-colors`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
