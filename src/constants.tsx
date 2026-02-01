
import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Gauge, 
  Bell, 
  UserSquare, 
  Users, 
  Settings,
  ShieldAlert,
  Wifi,
  Bus,
  Activity,
  Phone,
  Siren,
  Ambulance,
  AlertTriangle,
  Navigation,
  Clock,
  CheckCircle2,
  Home,
  UserCheck,
  Zap,
  Map as MapIcon,
  Headset,
  ShieldCheck,
  LifeBuoy,
  School,
  TrafficCone,
  Route,
  Shield,
  Eye
} from 'lucide-react';
import { BusStop, TrafficSegment, Alert, StudentParentInfo } from './types';

export const ICONS = {
  Dashboard: <LayoutDashboard size={20} />,
  'Live Tracking': <MapPin size={20} />,
  'Speed Monitor': <Gauge size={20} />,
  Alerts: <Bell size={20} />,
  'Driver Details': <UserSquare size={20} />,
  Parents: <Users size={20} />,
  Settings: <Settings size={20} />,
  Safety: <ShieldAlert size={16} />,
  Signal: <Wifi size={16} />,
  Bus: <Bus size={20} />,
  Activity: <Activity size={16} />,
  Phone: <Phone size={16} />,
  Police: <Shield size={20} />,
  Ambulance: <Ambulance size={20} />,
  Alert: <AlertTriangle size={20} />,
  Route: <Navigation size={16} />,
  Clock: <Clock size={16} />,
  Check: <CheckCircle2 size={16} />,
  Home: <Home size={16} />,
  UserCheck: <UserCheck size={20} />,
  Zap: <Zap size={20} />,
  Map: <MapIcon size={20} />,
  Headset: <Headset size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  LifeBuoy: <LifeBuoy size={20} />,
  Traffic: <TrafficCone size={16} />,
  Diversion: <Route size={16} />,
  Eye: <Eye size={16} />
};

export const INITIAL_ALERTS: Alert[] = [
  { id: '1', time: '08:45 AM', type: 'Geofence', message: "Bus entered Emma Johnson's zone near Indiranagar", status: 'Resolved' },
  { id: '2', time: '08:42 AM', type: 'Overspeed', message: "Speed exceeded 40 km/h in school zone", status: 'Resolved' },
  { id: '3', time: '08:38 AM', type: 'Normal', message: "Route started - Koramangala pickup", status: 'Active' },
  { id: '4', time: '08:35 AM', type: 'Geofence', message: "Bus entered Liam Smith's zone near MG Road", status: 'Resolved' },
  { id: '5', time: 'Yesterday', type: 'Emergency', message: "Emergency button pressed - False alarm", status: 'Resolved' },
];

export const STUDENT_PARENT_DATA: StudentParentInfo[] = [
  { id: '1', studentName: 'Emma Johnson', grade: 'Grade 4', parentName: 'Sarah Johnson', phone: '+91 98860 12345', busId: 'SB-101', avatar: 'EJ' },
  { id: '2', studentName: 'Liam Smith', grade: 'Grade 3', parentName: 'Michael Smith', phone: '+91 98860 23456', busId: 'SB-204', avatar: 'LS' },
  { id: '3', studentName: 'Olivia Davis', grade: 'Grade 5', parentName: 'Jennifer Davis', phone: '+91 98860 34567', busId: 'SB-101', avatar: 'OD' },
  { id: '4', studentName: 'Noah Wilson', grade: 'Grade 4', parentName: 'David Wilson', phone: '+91 98860 45678', busId: 'SB-305', avatar: 'NW' },
  { id: '5', studentName: 'Ava Brown', grade: 'Grade 2', parentName: 'Amanda Brown', phone: '+91 98860 56789', busId: 'SB-412', avatar: 'AB' },
  { id: '6', studentName: 'James Miller', grade: 'Grade 1', parentName: 'Patricia Miller', phone: '+91 98860 67890', busId: 'SB-101', avatar: 'JM' },
  { id: '7', studentName: 'Sophia Garcia', grade: 'Grade 3', parentName: 'Carlos Garcia', phone: '+91 98860 78901', busId: 'SB-500', avatar: 'SG' },
  { id: '8', studentName: 'Lucas Martin', grade: 'Grade 5', parentName: 'Elena Martin', phone: '+91 98860 89012', busId: 'SB-204', avatar: 'LM' },
  { id: '9', studentName: 'Mia White', grade: 'Grade 4', parentName: 'Robert White', phone: '+91 98860 90123', busId: 'SB-305', avatar: 'MW' },
  { id: '10', studentName: 'Ethan Clark', grade: 'Grade 2', parentName: 'Lisa Clark', phone: '+91 98860 01234', busId: 'SB-412', avatar: 'EC' },
  { id: '11', studentName: 'Isabella Lewis', grade: 'Grade 1', parentName: 'Karen Lewis', phone: '+91 99000 12345', busId: 'SB-500', avatar: 'IL' },
  { id: '12', studentName: 'Benjamin Young', grade: 'Grade 5', parentName: 'Paul Young', phone: '+91 99000 23456', busId: 'SB-101', avatar: 'BY' },
  { id: '13', studentName: 'Charlotte Hall', grade: 'Grade 3', parentName: 'Sandra Hall', phone: '+91 99000 34567', busId: 'SB-204', avatar: 'CH' },
  { id: '14', studentName: 'Mason Allen', grade: 'Grade 4', parentName: 'George Allen', phone: '+91 99000 45678', busId: 'SB-305', avatar: 'MA' },
  { id: '15', studentName: 'Amelia Scott', grade: 'Grade 2', parentName: 'Donna Scott', phone: '+91 99000 56789', busId: 'SB-412', avatar: 'AS' },
];

export const FLEET_DRIVERS = [
  { id: 'd1', name: 'Rajesh Kumar', busId: 'SB-101', route: 'R-01', phone: '+91 98450 12345', status: 'Active' },
  { id: 'd2', name: 'Suresh Raina', busId: 'SB-204', route: 'R-05', phone: '+91 98450 23456', status: 'Active' },
  { id: 'd3', name: 'Amitabh Singh', busId: 'SB-305', route: 'R-12', phone: '+91 98450 34567', status: 'Active' },
  { id: 'd4', name: 'Vijay Mallya', busId: 'SB-412', route: 'R-08', phone: '+91 98450 45678', status: 'Break' },
  { id: 'd5', name: 'Manish Pandey', busId: 'SB-500', route: 'R-15', phone: '+91 98450 56789', status: 'Active' },
];

export const SCHOOL_LOCATION = { x: 100, y: 485, name: 'Delhi Public School, Bangalore' };

export const STUDENT_LOCATIONS = [
  { id: 's1', name: 'Emma', x: 200, y: 215, route: 'Indiranagar Loop' },
  { id: 's2', name: 'Noah', x: 400, y: 385, route: 'Koramangala 4th Block' },
  { id: 's3', name: 'Olivia', x: 600, y: 215, route: 'Whitefield Express' },
  { id: 's4', name: 'Liam', x: 400, y: 115, route: 'MG Road Loop' },
];

export const BUS_STOPS: (BusStop & { eta?: string; distance?: string })[] = [
  { id: 'stop1', name: 'DPS Bangalore', time: '08:00 AM', status: 'completed', x: 100, y: 485, distance: '0 km' },
  { id: 'stop2', name: 'Indiranagar Stop', time: '08:15 AM', status: 'current', x: 200, y: 215, eta: '2 mins', distance: '3.2 km' },
  { id: 'stop3', name: 'MG Road Metro', time: '08:30 AM', status: 'upcoming', x: 400, y: 115, eta: '8 mins', distance: '6.4 km' },
  { id: 'stop4', name: 'Koramangala Stop', time: '08:45 AM', status: 'upcoming', x: 400, y: 385, eta: '15 mins', distance: '9.1 km' },
  { id: 'stop5', name: 'Whitefield Stop', time: '09:00 AM', status: 'upcoming', x: 600, y: 215, eta: '22 mins', distance: '12.8 km' },
];

export const TRAFFIC_ZONES: TrafficSegment[] = [
  { id: 'tz1', x1: 300, y1: 100, x2: 500, y2: 100, level: 'Heavy' },
  { id: 'tz2', x1: 600, y1: 200, x2: 600, y2: 400, level: 'Moderate' },
];
