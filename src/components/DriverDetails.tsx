
import React from 'react';
import { User, Phone, FileText, Bus, Map, School, Users, Mail, UserCheck, MessageCircle, ShieldCheck, Route, Hash, CheckCircle2, Clock } from 'lucide-react';
import { STUDENT_PARENT_DATA, FLEET_DRIVERS } from '../constants';

const DriverDetails: React.FC = () => {
  const driver = {
    name: 'Rajesh Kumar',
    photo: 'https://picsum.photos/seed/rajesh/300/300',
    phone: '+91 98450 12345',
    license: 'KA-01-2023-0042',
    busNumber: 'SB-101',
    route: 'Indiranagar - MG Road Loop (R-01)',
    capacity: 52,
    school: 'Delhi Public School Bangalore South'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Primary Driver Hero */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-orange-600 to-orange-400 flex items-end p-8">
           <div className="flex items-center space-x-3 text-white/80">
             <ShieldCheck size={18} />
             <span className="text-xs font-black uppercase tracking-widest">RTO Certified School Driver</span>
           </div>
        </div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-16 flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-8 mb-12">
            <img 
              src={driver.photo} 
              alt={driver.name} 
              className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl object-cover ring-1 ring-slate-100"
            />
            <div className="flex-1 pb-2">
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">{driver.name}</h2>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">Senior Grade</span>
              </div>
              <div className="flex items-center text-slate-500 text-sm font-medium">
                <Bus size={16} className="mr-2 text-orange-600" />
                Bus ID: <span className="text-slate-800 font-bold ml-1">{driver.busNumber}</span>
                <span className="mx-3 opacity-20">|</span>
                <Route size={16} className="mr-2 text-orange-600" />
                Current Route: <span className="text-slate-800 font-bold ml-1">{driver.route}</span>
              </div>
            </div>
            <div className="pb-2 flex space-x-3">
               <button className="px-8 py-3.5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-900/20 hover:bg-orange-700 transition-all active:scale-95 flex items-center">
                 <Phone size={20} className="mr-2" />
                 Emergency Call
               </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">Personal Credentials</h3>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-2xl text-orange-500 shadow-sm"><Phone size={20} /></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Work Phone</p><p className="text-sm font-black text-slate-800">{driver.phone}</p></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-2xl text-orange-500 shadow-sm"><FileText size={20} /></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">License No.</p><p className="text-sm font-black text-slate-800">{driver.license}</p></div>
              </div>
            </section>

            <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">Performance Log</h3>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-2xl text-orange-500 shadow-sm"><Users size={20} /></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Assigned Kids</p><p className="text-sm font-black text-slate-800">{driver.capacity} Students</p></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-2xl text-orange-500 shadow-sm"><CheckCircle2 size={20} className="text-emerald-500" /></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Safety Record</p><p className="text-sm font-black text-slate-800">4.9/5 Star Verified</p></div>
              </div>
            </section>

            <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">Deployment</h3>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-2xl text-orange-500 shadow-sm"><School size={20} /></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">School Campus</p><p className="text-sm font-black text-slate-800">Bangalore South</p></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-2xl text-orange-500 shadow-sm"><Clock size={20} /></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Shift Time</p><p className="text-sm font-black text-slate-800">07:30 - 16:30 IST</p></div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* RENAME FLEET TO SCHOOL BUS DRIVERS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-3 text-slate-800">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-900/20">
              <Bus size={20} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">School Bus Drivers Directory</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Monitoring Enabled</span>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bus ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route No</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Trip Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {FLEET_DRIVERS.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs group-hover:bg-orange-600 group-hover:text-white transition-all">
                        {f.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-black text-slate-800 group-hover:text-orange-600 transition-colors">{f.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <Hash size={12} className="text-slate-300" />
                      <span className="text-xs font-black text-slate-600">{f.busId}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <Route size={12} className="text-slate-300" />
                      <span className="text-xs font-bold text-slate-600">{f.route}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                        <MessageCircle size={14} />
                      </button>
                      <span className="text-xs font-medium text-slate-500 font-mono">{f.phone}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                      f.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      {f.status === 'Active' ? 'Running' : 'Offline'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DriverDetails;
