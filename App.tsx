
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardHome from './components/DashboardHome';
import DriverDetails from './components/DriverDetails';
import LiveTracking from './components/LiveTracking';
import SpeedMonitor from './components/SpeedMonitor';
import GeofencePopup from './components/GeofencePopup';
import AlertLog from './components/AlertLog';
import ParentsView from './components/ParentsView';
import SettingsView from './components/SettingsView';
import Login from './components/Login';
import { NavigationTab, BusState, StudentMarker, Alert, UserProfile } from './types';
import { STUDENT_LOCATIONS, SCHOOL_LOCATION, INITIAL_ALERTS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>('Dashboard');
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  
  const [busState, setBusState] = useState<BusState>({
    busId: 'SB-042',
    x: 100,
    y: 485,
    speed: 0,
    status: 'Stopped',
    accidentDetected: false,
    gpsSignal: 'Strong',
    isDiverted: false,
    trafficStatus: 'Clear',
    lastUpdate: 'Just now'
  });

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  const addAlert = (type: Alert['type'], message: string) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      message,
      status: 'Active'
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 10));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0e17]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar title={`School Bus Safety & Tracking Dashboard`} userProfile={userProfile} />
        
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          <div className="p-4 md:p-6 lg:p-8">
            {activeTab === 'Dashboard' && (
              <DashboardHome busState={busState} studentLocations={STUDENT_LOCATIONS} />
            )}
            {activeTab === 'Live Tracking' && (
              <LiveTracking busState={busState} studentLocations={STUDENT_LOCATIONS} />
            )}
            {activeTab === 'Speed Monitor' && (
              <SpeedMonitor busState={busState} />
            )}
            {activeTab === 'Alerts' && (
              <AlertLog alerts={alerts} />
            )}
            {activeTab === 'Parents' && (
              <ParentsView />
            )}
            {activeTab === 'Driver Details' && (
              <DriverDetails />
            )}
            {activeTab === 'Settings' && (
              <SettingsView />
            )}
            {activeTab === 'Logout' as any && (
              <div className="flex items-center justify-center h-full">
                <button 
                  onClick={handleLogout}
                  className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl"
                >
                  Confirm Logout
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <GeofencePopup studentName={null} onClose={() => {}} />
    </div>
  );
};

export default App;
