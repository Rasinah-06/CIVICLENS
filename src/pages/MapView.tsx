import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockIssues, issueTypeIcons, issueTypeLabels, IssueSeverity } from '@/data/mockData';
import SeverityBadge from '@/components/SeverityBadge';
import StatusBadge from '@/components/StatusBadge';

const severityColors: Record<IssueSeverity, string> = {
  high: '#EF4444',
  mid: '#F59E0B',
  low: '#22C55E',
};

function createIcon(severity: IssueSeverity) {
  const color = severityColors[severity];
  return L.divIcon({
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
  });
}

export default function MapView() {
  const [filter, setFilter] = useState<IssueSeverity | 'all'>('all');
  const filtered = filter === 'all' ? mockIssues : mockIssues.filter(i => i.severity === filter);
  const center: [number, number] = [12.9516, 77.5946];

  return (
    <div className="px-4 pt-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Issue Map</h1>
        <div className="flex gap-2">
          {(['all', 'high', 'mid', 'low'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden rounded-xl" style={{ height: '400px' }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {filtered.map(issue => (
            <Marker
              key={issue.id}
              position={[issue.location.lat, issue.location.lng]}
              icon={createIcon(issue.severity)}
            >
              <Popup>
                <div className="space-y-2 min-w-[200px]">
                  <img src={issue.photo} alt={issue.title} className="w-full h-24 object-cover rounded" />
                  <p className="font-semibold text-sm">{issueTypeIcons[issue.type]} {issue.title}</p>
                  <p className="text-xs text-gray-500">{issue.location.address}</p>
                  <p className="text-xs">{issue.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
        Issues Near You
      </h2>
      <div className="space-y-2">
        {filtered.map((issue, i) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-3 flex items-center gap-3"
          >
            <span className="text-lg">{issueTypeIcons[issue.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{issue.title}</p>
              <p className="text-xs text-muted-foreground">{issue.location.address}</p>
            </div>
            <SeverityBadge severity={issue.severity} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
