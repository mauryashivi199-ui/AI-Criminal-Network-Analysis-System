import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Shield, Radio, Layers, Navigation } from 'lucide-react';
import { getGeoHotspots } from '../../services/api';
import L from 'leaflet';

export default function CrimeMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [geoData, setGeoData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    async function loadGeo() {
      try {
        const data = await getGeoHotspots();
        setGeoData(data.geo_entities || []);
      } catch (err) {
        console.error('Error fetching geo hotspots:', err);
      }
    }
    loadGeo();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Map centered on India (Delhi default)
    const map = L.map(mapContainerRef.current, {
      center: [28.6139, 77.2090],
      zoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Dark Tactical Tile Layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Place custom markers
  useEffect(() => {
    if (!mapInstanceRef.current || geoData.length === 0) return;

    const map = mapInstanceRef.current;
    const markers = [];

    geoData.forEach((entity) => {
      if (!entity.lat || !entity.lng) return;

      const isHighThreat = entity.threat_score >= 80;
      const markerColor = isHighThreat ? '#ef4444' : '#06b6d4';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${markerColor};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            box-shadow: 0 0 12px ${markerColor};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            color: #ffffff;
            cursor: pointer;
          ">
            ●
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([entity.lat, entity.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="color: #000; font-family: sans-serif; font-size: 12px;">
          <strong>${entity.name}</strong><br/>
          Role: ${entity.role || 'Entity'}<br/>
          Threat: ${entity.threat_score || 50}%<br/>
          Type: ${entity.type}
        </div>
      `);

      marker.on('click', () => {
        setSelectedEntity(entity);
      });

      markers.push(marker);
    });

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.3));
    }
  }, [geoData]);

  return (
    <div className="relative w-full h-full flex bg-[#070b14] overflow-hidden">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Header Info */}
      <div className="absolute top-4 left-4 z-10 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl space-y-1">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-white font-mono uppercase">Geo-Spatial Crime & Suspect Grid</h2>
        </div>
        <p className="text-[11px] text-slate-400">
          Mapped {geoData.length} physical coordinate anchors (Safe Houses, Cell Towers, Toll Plazas)
        </p>
      </div>

      {/* Selected Entity Card */}
      {selectedEntity && (
        <div className="absolute top-4 right-4 z-10 w-80 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 shadow-2xl space-y-2 animate-in fade-in">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                {selectedEntity.type}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">{selectedEntity.name}</h3>
              <p className="text-xs text-slate-400">{selectedEntity.role}</p>
            </div>
            <button onClick={() => setSelectedEntity(null)} className="text-slate-400 hover:text-white text-xs">
              ✕
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-400">COORDINATES: {selectedEntity.lat?.toFixed(4)}, {selectedEntity.lng?.toFixed(4)}</div>
            <div className="text-rose-400">THREAT SCORE: {selectedEntity.threat_score}%</div>
          </div>

          <button
            onClick={() => alert(`Patrol Units dispatched to perimeter of ${selectedEntity.name}`)}
            className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow"
          >
            Dispatch Tactical Patrol Unit
          </button>
        </div>
      )}
    </div>
  );
}
