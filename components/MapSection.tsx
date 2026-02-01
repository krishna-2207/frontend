
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapPin, Bus, Signal, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';
import { BusState, StudentMarker } from '../types';
import { SCHOOL_LOCATION } from '../constants';

interface MapSectionProps {
  busState: BusState;
  studentLocations: StudentMarker[];
}

// Map pseudo-coordinates to real lat/lng for Bangalore, India
const mapToLatLng = (x: number, y: number): [number, number] => {
  return [12.9716 + (400 - y) / 10000, 77.5946 + (x - 300) / 10000];
};

// Distance calculation helpers
function getSqDist(p1: [number, number], p2: [number, number]) {
  return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}

function distToSegmentSquared(p: [number, number], v: [number, number], w: [number, number]) {
  const l2 = getSqDist(v, w);
  if (l2 === 0) return getSqDist(p, v);
  let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
  t = Math.max(0, Math.min(1, t));
  return getSqDist(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
}

const MapSection: React.FC<MapSectionProps> = ({ busState, studentLocations }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const routeLayerRef = useRef<any>(null);
  const deviationLineRef = useRef<any>(null);

  const [isDivertedLocal, setIsDivertedLocal] = useState(false);

  const routeCoords: [number, number][] = useMemo(() => [
    mapToLatLng(100, 485),
    mapToLatLng(100, 400),
    mapToLatLng(200, 400),
    mapToLatLng(200, 215),
    mapToLatLng(400, 115),
    mapToLatLng(400, 385),
    mapToLatLng(600, 215)
  ], []);

  const busPos = mapToLatLng(busState.x, busState.y);

  // Check for deviation
  useEffect(() => {
    let minDistSq = Infinity;
    for (let i = 0; i < routeCoords.length - 1; i++) {
      const d2 = distToSegmentSquared(busPos, routeCoords[i], routeCoords[i+1]);
      if (d2 < minDistSq) minDistSq = d2;
    }
    
    // Threshold ~ 100 meters (approx 0.001 in lat/lng units squared)
    const thresholdSq = 0.0000005; 
    const diverted = minDistSq > thresholdSq;
    setIsDivertedLocal(diverted);

    // Update markers and visuals if map is ready
    if (leafletInstance.current && markersRef.current.bus) {
      const L = (window as any).L;
      
      // Update position
      markersRef.current.bus.setLatLng(busPos);

      // Update icon based on deviation
      const busIcon = L.divIcon({
        className: 'bus-icon',
        html: `
          <div class="relative flex flex-col items-center">
            <div class="mb-1 px-2 py-0.5 ${diverted ? 'bg-red-600' : 'bg-slate-800'} text-white text-[8px] font-black rounded-md whitespace-nowrap shadow-md border border-white/20 transition-all duration-300">
              ${busState.busId}
            </div>
            <div class="w-12 h-12 ${diverted ? 'bg-red-500 ring-4 ring-red-500/30' : 'bg-yellow-400'} rounded-2xl flex items-center justify-center border-4 border-white shadow-2xl animate-pulse transition-all duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${diverted ? '#fff' : '#854d0e'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="9" width="16" height="11" rx="2"></rect>
                <path d="M9 22v2"></path>
                <path d="M15 22v2"></path>
                <path d="M18 9V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4"></path>
              </svg>
            </div>
          </div>
        `,
        iconSize: [48, 64],
        iconAnchor: [24, 60]
      });
      markersRef.current.bus.setIcon(busIcon);

      // Handle deviation line visual
      if (diverted) {
        // Find nearest point on route for guidance line
        let nearestPoint: [number, number] = routeCoords[0];
        let minD2 = Infinity;
        for (let i = 0; i < routeCoords.length - 1; i++) {
          const v = routeCoords[i];
          const w = routeCoords[i+1];
          const l2 = getSqDist(v, w);
          let t = ((busPos[0] - v[0]) * (w[0] - v[0]) + (busPos[1] - v[1]) * (w[1] - v[1])) / l2;
          t = Math.max(0, Math.min(1, t));
          const p: [number, number] = [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])];
          const d2 = getSqDist(busPos, p);
          if (d2 < minD2) {
            minD2 = d2;
            nearestPoint = p;
          }
        }

        if (deviationLineRef.current) {
          deviationLineRef.current.setLatLngs([busPos, nearestPoint]);
        } else {
          deviationLineRef.current = L.polyline([busPos, nearestPoint], {
            color: '#ef4444',
            weight: 3,
            dashArray: '5, 10',
            opacity: 0.8
          }).addTo(leafletInstance.current);
        }
      } else if (deviationLineRef.current) {
        leafletInstance.current.removeLayer(deviationLineRef.current);
        deviationLineRef.current = null;
      }
    }
  }, [busPos, routeCoords, busState.busId]);

  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return;

    const L = (window as any).L;
    
    leafletInstance.current = L.map(mapRef.current, {
      center: busPos,
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(leafletInstance.current);

    // Blue Route Line
    routeLayerRef.current = L.polyline(routeCoords, {
      color: '#2563eb',
      weight: 6,
      opacity: 0.7,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(leafletInstance.current);

    // Add School Marker
    const schoolPos = mapToLatLng(SCHOOL_LOCATION.x, SCHOOL_LOCATION.y);
    const schoolIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center border-2 border-white shadow-lg"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    L.marker(schoolPos, { icon: schoolIcon }).addTo(leafletInstance.current).bindPopup("<b>DPS Bangalore South</b>");

    // Add Student Home Markers
    studentLocations.forEach(student => {
      const pos = mapToLatLng(student.x, student.y);
      const studentIcon = L.divIcon({
        className: 'student-icon',
        html: `<div class="w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-[10px] font-black text-white">🏠</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker(pos, { icon: studentIcon }).addTo(leafletInstance.current).bindPopup(`<b>Student Home:</b> ${student.name}`);
    });

    // Add Initial Bus Marker
    const busIcon = L.divIcon({
      className: 'bus-icon',
      html: `
        <div class="relative flex flex-col items-center">
          <div class="mb-1 px-2 py-0.5 bg-slate-800 text-white text-[8px] font-black rounded-md whitespace-nowrap shadow-md border border-white/20">
            ${busState.busId}
          </div>
          <div class="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center border-4 border-white shadow-2xl animate-pulse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#854d0e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="9" width="16" height="11" rx="2"></rect>
              <path d="M9 22v2"></path>
              <path d="M15 22v2"></path>
              <path d="M18 9V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4"></path>
            </svg>
          </div>
        </div>
      `,
      iconSize: [48, 64],
      iconAnchor: [24, 60]
    });
    markersRef.current.bus = L.marker(busPos, { icon: busIcon }).addTo(leafletInstance.current);

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Route Deviation Warning Banner */}
      {isDivertedLocal && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1001] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-red-600 border-none rounded-2xl px-6 py-3 flex items-center space-x-3 shadow-2xl shadow-red-900/40 text-white">
            <div className="p-2 bg-white/20 rounded-lg">
              <ShieldAlert size={18} className="animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest leading-none mb-0.5">Route Deviation Warning</p>
              <p className="text-[10px] font-medium opacity-90">Bus ${busState.busId} has deviated from the assigned R-01 route.</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Status Overlays */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col space-y-3">
        {/* Zone Info */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 p-4 shadow-xl flex items-center space-x-4 min-w-[200px]">
          <div className="p-3 bg-orange-600 rounded-2xl shadow-lg">
             <MapPin size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Current Zone</h3>
            <p className="text-sm font-black text-slate-800">Bangalore, Karnataka</p>
          </div>
        </div>

        {/* Bus ID & Running Status Info */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 p-4 shadow-xl flex items-center space-x-4">
          <div className={`p-3 ${isDivertedLocal ? 'bg-red-600' : 'bg-blue-600'} rounded-2xl shadow-lg transition-colors duration-300`}>
             <Bus size={20} className="text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Bus Identity</h3>
              <span className={`flex h-1.5 w-1.5 rounded-full ${isDivertedLocal ? 'bg-red-400' : 'bg-emerald-500'} animate-pulse`}></span>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-black text-slate-800">{busState.busId}</p>
              <span className={`px-2 py-0.5 ${isDivertedLocal ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'} text-[9px] font-black rounded-md uppercase tracking-widest transition-colors duration-300`}>
                {isDivertedLocal ? 'Diverted' : 'Running'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Coordinates display */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/10 p-3 shadow-xl flex items-center space-x-3">
          <div className="text-blue-400">
            <Signal size={14} />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-blue-300 uppercase tracking-widest">Latitude</span>
              <span className="text-[10px] font-mono font-bold text-white">{busPos[0].toFixed(5)}</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-blue-300 uppercase tracking-widest">Longitude</span>
              <span className="text-[10px] font-mono font-bold text-white">{busPos[1].toFixed(5)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timestamp indicator */}
      <div className="absolute bottom-6 left-6 z-[1000]">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-slate-200 shadow-lg flex items-center space-x-2">
          <Clock size={12} className="text-slate-400" />
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Updated: {busState.lastUpdate || 'Just now'}</span>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
