import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Shield, Radio, Layers, Navigation, AlertTriangle, Crosshair, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';
import { getGeoHotspots } from '../../services/api';
import L from 'leaflet';

export default function CrimeMap({ lang = 'en' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [geoData, setGeoData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [activeTileLayer, setActiveTileLayer] = useState('osm'); // 'osm' | 'dark' | 'satellite'
  const [dispatchAlert, setDispatchAlert] = useState(null);
  const tileLayerRef = useRef(null);

  // Fallback rich Delhi/NCR realistic crime hotspots
  const defaultHotspots = [
    {
      id: "GEO-001",
      name: "Kashmere Gate ISBT & Transit Corridor",
      type: "TRANSIT_HUB",
      lat: 28.6675,
      lng: 77.2285,
      role: "Primary Inter-State Narcotic Drop Point",
      threat_score: 92,
      suspect: "Tariq 'Courier' Shaikh",
      last_ping: "02:15 AM (Burner IMEI Ping)",
      tower_id: "TOWER-DEL-ISBT-01"
    },
    {
      id: "GEO-002",
      name: "Rohini Sector 15 Clandestine Safe House",
      type: "SAFE_HOUSE",
      lat: 28.7183,
      lng: 77.1264,
      role: "Burner SIM Switch & Enforcement Cell",
      threat_score: 88,
      suspect: "Vikram 'Vicky' Rana",
      last_ping: "03:40 AM (Midnight Call Spikes)",
      tower_id: "TOWER-DEL-ROHINI-04"
    },
    {
      id: "GEO-003",
      name: "Chandni Chowk Hawala OTC Cash Desk",
      type: "FINANCIAL_HUB",
      lat: 28.6506,
      lng: 77.2303,
      role: "Fiat-to-Crypto TRC-20 Conversion Hub",
      threat_score: 85,
      suspect: "Rashid 'Doctor' Qureshi",
      last_ping: "04:10 PM (₹1.8 Cr Cash Smurfing)",
      tower_id: "TOWER-DEL-CHANDNI-02"
    },
    {
      id: "GEO-004",
      name: "DND Flyway Inter-State Border Toll",
      type: "TRANSIT_CHECKPOINT",
      lat: 28.5830,
      lng: 77.2980,
      role: "Vehicle Scorpio DL-1CA-8899 ANPR Camera Hit",
      threat_score: 78,
      suspect: "Anil 'Mule' Kumar",
      last_ping: "Yesterday 11:45 PM (ANPR Camera)",
      tower_id: "TOWER-DEL-NOIDA-09"
    }
  ];

  useEffect(() => {
    async function loadGeo() {
      try {
        const data = await getGeoHotspots();
        if (data.geo_entities && data.geo_entities.length > 0) {
          setGeoData(data.geo_entities);
        } else {
          setGeoData(defaultHotspots);
        }
      } catch (err) {
        setGeoData(defaultHotspots);
      }
    }
    loadGeo();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Delhi Police Headquarters / NCR Grid
    const map = L.map(mapContainerRef.current, {
      center: [28.6500, 77.2100],
      zoom: 12,
      zoomControl: false,
    });

    // Default Tile Layer: Clean OpenStreetMap standard
    const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | Govt. of India LEA Grid',
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tile;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Tile Layer (Street OSM vs Dark Matter vs Satellite)
  const handleSwitchLayer = (type) => {
    if (!mapInstanceRef.current) return;
    setActiveTileLayer(type);

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    if (type === 'dark') {
      url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    } else if (type === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }

    tileLayerRef.current = L.tileLayer(url, {
      attribution: '&copy; Police GIS Mapping Grid',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);
  };

  // Add Real Police Markers & Cell Tower Rings
  useEffect(() => {
    if (!mapInstanceRef.current || geoData.length === 0) return;

    const map = mapInstanceRef.current;
    const markers = [];

    geoData.forEach((entity) => {
      if (!entity.lat || !entity.lng) return;

      const isHighThreat = entity.threat_score >= 85;
      const markerColor = isHighThreat ? '#ef4444' : '#0284c7';

      // 1. Add Radiating Cell Tower Coverage Circle
      const coverageCircle = L.circle([entity.lat, entity.lng], {
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.12,
        radius: 1200, // 1.2 KM cell tower radius
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);

      // 2. Custom Police Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="
              position: absolute;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: ${markerColor};
              opacity: 0.4;
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></span>
            <div style="
              background: ${markerColor};
              width: 28px;
              height: 28px;
              border-radius: 50%;
              border: 2px solid #ffffff;
              box-shadow: 0 4px 10px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              font-weight: bold;
              color: #ffffff;
              cursor: pointer;
            ">
              🚨
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([entity.lat, entity.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Arial, sans-serif; font-size: 12px; color: #0f172a; min-width: 180px;">
          <b style="color: #b91c1c; font-size: 13px;">${entity.name}</b><br/>
          <span style="font-size: 11px; color: #475569;">${entity.role || entity.type}</span><hr style="margin: 4px 0; border: 0; border-top: 1px solid #e2e8f0;"/>
          <b>Suspect:</b> ${entity.suspect || 'Multiple Targets'}<br/>
          <b>Threat Rating:</b> <span style="color: #ef4444; font-weight: bold;">${entity.threat_score}%</span><br/>
          <b>Tower Ping:</b> ${entity.last_ping || 'Active'}
        </div>
      `);

      marker.on('click', () => {
        setSelectedEntity(entity);
      });

      markers.push(marker);
    });

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }, [geoData]);

  const handleDispatch = (name) => {
    setDispatchAlert(`Tactical Quick Response Team (QRT) dispatched to coordinates of: ${name}`);
    setTimeout(() => setDispatchAlert(null), 4000);
  };

  return (
    <div className="relative w-full h-full flex bg-[#070b14] overflow-hidden select-none">
      {/* Real Interactive Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 max-w-sm">
        <div className="p-3.5 rounded-2xl bg-[#0a0f1d]/95 backdrop-blur-md border border-slate-750 shadow-2xl space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-rose-950/80 text-rose-400 border border-rose-700/50">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-white uppercase text-xs tracking-wide">
                {lang === 'hi' ? 'राष्ट्रीय अपराध एवं संदिग्ध जीआईएस मानचित्र' : 'National Crime & Suspect GIS Map'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'hi' ? 'दिल्ली-एनसीआर के 4 सक्रिय सेल टॉवर व सुरक्षित ठिकाने' : '4 Active Cell Tower Dumps & Safe House Anchors'}
              </p>
            </div>
          </div>
        </div>

        {/* Map Tile Layer Switcher */}
        <div className="p-1.5 rounded-xl bg-[#0a0f1d]/95 backdrop-blur-md border border-slate-750 shadow-xl flex items-center space-x-1 text-xs">
          <button
            onClick={() => handleSwitchLayer('osm')}
            className={`px-3 py-1 rounded-lg transition font-medium text-[11px] ${
              activeTileLayer === 'osm' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'सड़क नक्शा' : 'Street Map'}
          </button>
          <button
            onClick={() => handleSwitchLayer('dark')}
            className={`px-3 py-1 rounded-lg transition font-medium text-[11px] ${
              activeTileLayer === 'dark' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'डार्क मोड' : 'Dark Mode'}
          </button>
          <button
            onClick={() => handleSwitchLayer('satellite')}
            className={`px-3 py-1 rounded-lg transition font-medium text-[11px] ${
              activeTileLayer === 'satellite' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'सैटेलाइट' : 'Satellite'}
          </button>
        </div>
      </div>

      {/* Dispatch Success Banner */}
      {dispatchAlert && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-2xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{dispatchAlert}</span>
        </div>
      )}

      {/* Selected Entity Inspection Card */}
      {selectedEntity && (
        <div className="absolute top-4 right-4 z-10 w-80 md:w-96 p-4 rounded-3xl bg-[#0b1224]/95 backdrop-blur-md border border-cyan-500/50 shadow-2xl space-y-3 text-xs animate-in fade-in">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                {selectedEntity.type}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">{selectedEntity.name}</h3>
              <p className="text-[11px] text-slate-400">{selectedEntity.role}</p>
            </div>
            <button onClick={() => setSelectedEntity(null)} className="text-slate-400 hover:text-white font-bold p-1">
              ✕
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Target Suspect:</span>
              <span className="font-bold text-white">{selectedEntity.suspect || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Threat Rating:</span>
              <span className="font-bold text-rose-400">{selectedEntity.threat_score}% CRITICAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cell Tower Ping:</span>
              <span className="font-mono text-cyan-300">{selectedEntity.last_ping}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">GPS Coordinates:</span>
              <span className="font-mono text-slate-300">{selectedEntity.lat?.toFixed(4)}, {selectedEntity.lng?.toFixed(4)}</span>
            </div>
          </div>

          <button
            onClick={() => handleDispatch(selectedEntity.name)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition flex items-center justify-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>{lang === 'hi' ? 'त्वरित पुलिस दस्ता (QRT) भेजें' : 'Dispatch Quick Response Team (QRT)'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
