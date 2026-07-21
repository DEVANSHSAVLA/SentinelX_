import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { MapPin, Filter, ShieldAlert } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { useData } from '../../context/DataContext';

export const GeospatialMap: React.FC = () => {
  const { cases } = useData();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const HOTSPOT_PINS = [
    { id: 'STATIC-1', type: "DIGITAL_ARREST", lat: 19.0760, lng: 72.8777, priority: "CRITICAL", desc: "Bandra East Call Centroid", city: "Mumbai", riskScore: 0.94 },
    { id: 'STATIC-2', type: "COUNTERFEIT", lat: 18.9220, lng: 72.8347, priority: "HIGH", desc: "Colaba Retailer Scan Node", city: "Mumbai", riskScore: 0.88 },
    { id: 'STATIC-3', type: "FRAUD_NETWORK", lat: 19.2183, lng: 72.9781, priority: "CRITICAL", desc: "Thane ATM Cash Out Group", city: "Thane", riskScore: 0.96 },
    { id: 'STATIC-4', type: "DIGITAL_ARREST", lat: 28.6139, lng: 77.2090, priority: "HIGH", desc: "ED Impersonation Centroid", city: "Delhi", riskScore: 0.91 },
    { id: 'STATIC-5', type: "COUNTERFEIT", lat: 28.5355, lng: 77.3910, priority: "CRITICAL", desc: "Noida Sec 62 Retail Node", city: "Noida", riskScore: 0.95 },
    { id: 'STATIC-6', type: "FRAUD_NETWORK", lat: 22.5726, lng: 88.3639, priority: "CRITICAL", desc: "Mule Bank Registry", city: "Kolkata", riskScore: 0.98 },
    { id: 'STATIC-7', type: "DIGITAL_ARREST", lat: 12.9716, lng: 77.5946, priority: "MEDIUM", desc: "Customs extortion centroid", city: "Bengaluru", riskScore: 0.76 },
  ];

  // Dynamic pins from user-registered cases
  const casePins = cases.map(c => ({
    id: c.id,
    type: c.crimeCategory.toUpperCase().replace(/\s+/g, '_'),
    lat: c.coords.lat,
    lng: c.coords.lng,
    priority: c.priority,
    desc: `${c.crimeCategory} - ${c.reporter}`,
    city: c.location,
    riskScore: c.priority === 'CRITICAL' ? 0.95 : c.priority === 'HIGH' ? 0.82 : 0.65,
    status: c.status
  }));

  const allPins = [...HOTSPOT_PINS, ...casePins];

  const filteredPins = allPins.filter(pin => filterCategory === 'ALL' || pin.type.includes(filterCategory));

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">National Geospatial Crime Hotspot Map</h3>
            <p className="text-xs text-slate-400">Live Geocoded Pin Mapping & Dynamic Incident Clusters</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="DIGITAL_ARREST">Digital Arrest Scams</option>
              <option value="COUNTERFEIT">Counterfeit Notes</option>
              <option value="FRAUD">Fraud / Mule Accounts</option>
            </select>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            {filteredPins.length} Active Hotspot Pins
          </div>
        </div>
      </div>

      <div className="h-[550px] w-full rounded-xl overflow-hidden border border-slate-800 relative shadow-2xl">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', backgroundColor: '#0b0f19' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {filteredPins.map((pin) => {
            const isClosed = (pin as any).status === 'CLOSED';
            const color = isClosed ? '#64748b' : pin.priority === 'CRITICAL' ? '#ef4444' : pin.priority === 'HIGH' ? '#f59e0b' : '#3b82f6';
            return (
              <CircleMarker
                key={pin.id}
                center={[pin.lat, pin.lng]}
                radius={isClosed ? 7 : 12}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: isClosed ? 0.4 : 0.8,
                  color: color,
                  weight: 2,
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2 text-slate-900">
                    <div className="flex items-center space-x-1 font-bold text-xs">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>{pin.type}</span>
                    </div>
                    <p className="text-xs font-semibold mt-1">{pin.desc}</p>
                    <p className="text-[10px] text-slate-600">Location: {pin.city}</p>
                    <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] font-mono font-bold text-rose-600">
                      Status: {isClosed ? 'CLOSED ARCHIVE' : `${(pin.riskScore * 100).toFixed(0)}% Risk`}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
