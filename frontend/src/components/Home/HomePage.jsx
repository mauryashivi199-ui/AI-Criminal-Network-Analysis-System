import React, { useState } from 'react';
import { 
  Shield, 
  Network, 
  Crown, 
  PhoneCall, 
  Bot, 
  FileCheck2, 
  Coins, 
  MapPin, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Radio, 
  CheckCircle2, 
  UploadCloud, 
  Lock, 
  Zap, 
  FileText,
  Sliders,
  ExternalLink
} from 'lucide-react';

export default function HomePage({ onNavigate, onSearchSuspect, onOpenIngest }) {
  const [searchTerm, setSearchTerm] = useState('');

  const quickSearchTags = [
    "Iqbal Ansari",
    "Vikram Rana",
    "Rashid Qureshi",
    "TRON USDT Wallet",
    "Burner-1 Phone",
    "HDFC Shell Mule"
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchSuspect(searchTerm.trim());
    }
  };

  const mainFeatureCards = [
    {
      id: 'graph',
      title: 'Syndicate Knowledge Graph',
      subtitle: 'INTERACTIVE 2D/3D CANVAS',
      desc: 'Explore multi-hop relationships between criminal suspects, burner SIMs, mule accounts, vehicles, and stash houses with physics force layouts.',
      icon: Network,
      color: 'from-blue-600/20 via-cyan-600/10 to-transparent',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      badge: 'LIVE GRAPH',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      btnText: 'Launch Graph Engine',
      glow: 'glow-cyan'
    },
    {
      id: 'kingpins',
      title: 'Kingpin Centrality Radar',
      subtitle: 'ALGORITHMIC DE-ANONYMIZATION',
      desc: 'Unmask supreme cartel masterminds and key brokers who orchestrate crimes remotely using mathematical PageRank and Betweenness Centrality.',
      icon: Crown,
      color: 'from-amber-600/20 via-orange-600/10 to-transparent',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      badge: 'PAGERANK AI',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      btnText: 'View Kingpin Rankings',
      glow: 'glow-amber'
    },
    {
      id: 'cdr',
      title: 'CDR & Burner Phone Telemetry',
      subtitle: 'NOCTURNAL INTERCEPT MATRIX',
      desc: 'Detect high-risk midnight call bursts (1:00 AM – 4:00 AM), cell tower hops, and multiple burner SIM swaps in a single IMEI handset.',
      icon: PhoneCall,
      color: 'from-rose-600/20 via-red-600/10 to-transparent',
      borderColor: 'border-rose-500/40 hover:border-rose-400',
      badge: 'MIDNIGHT SPIKES',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      btnText: 'Inspect Call Telemetry',
      glow: 'glow-rose'
    },
    {
      id: 'copilot',
      title: 'AI Forensic Copilot (Graph-RAG)',
      subtitle: 'VOICE & MULTI-MODAL INTELLIGENCE',
      desc: 'Converse with your zero-hallucination investigation assistant using Web Speech voice commands or file attachments with live bidirectional graph sync.',
      icon: Bot,
      color: 'from-purple-600/20 via-indigo-600/10 to-transparent',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      badge: 'ZERO HALLUCINATION',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      btnText: 'Open Copilot Assistant',
      glow: 'glow-purple'
    }
  ];

  const secondaryTools = [
    {
      id: 'financial',
      title: 'Mule & Hawala Flow',
      desc: 'Track rapid pass-through bank velocity (>80%) and crypto offramps into TRON TRC-20 wallets.',
      icon: Coins,
      tag: 'AML & Smurfing'
    },
    {
      id: 'geospatial',
      title: 'Geo Crime Map',
      desc: 'Pinpoint crime locations, cell tower dumps, and transit hubs on high-resolution GIS maps.',
      icon: MapPin,
      tag: 'Cell Tower GIS'
    },
    {
      id: 'dossier',
      title: 'Court Case Dossier',
      desc: '1-click court briefs with SHA-256 digital signature hashes compliant with BSA 2023.',
      icon: FileCheck2,
      tag: 'BSA 2023 Legal'
    },
    {
      id: 'settings',
      title: 'Gateway & LEA Settings',
      desc: 'Configure DoT CEIR Stolen IMEI feeds, CCTNS e-FIR endpoints, and audit ledger policies.',
      icon: Sliders,
      tag: 'CEIR & CCTNS'
    }
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Live Emergency & Intelligence Grid Status Bar */}
      <div className="bg-[#0b1224] border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-600/50 text-rose-300 font-mono text-[11px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span>LIVE INTELLIGENCE GRID</span>
          </span>

          <span className="inline-flex items-center space-x-1 text-slate-300 font-medium text-[11px]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>CEIR Stolen IMEI Gateway: <b className="text-emerald-400">SYNCED</b></span>
          </span>

          <span className="hidden md:inline-flex items-center space-x-1 text-slate-400 text-[11px]">
            <span>| CCTNS Police FIRs: <b className="text-cyan-400">ACTIVE</b></span>
          </span>

          <span className="hidden lg:inline-flex items-center space-x-1 text-slate-400 text-[11px]">
            <span>| Legal Standard: <b className="text-amber-400 font-mono">BSA 2023 Compliant</b></span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
          <span className="font-mono">Threat Response: <b className="text-emerald-400">Real-Time (&lt;1s)</b></span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
        {/* Hero Section (Matching Reference Style) */}
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-600/40 text-cyan-300 text-xs font-mono font-medium shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Smart India Hackathon 2026 • Ministry of Home Affairs (SIH26189)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-sans text-white uppercase leading-tight">
            KAVACHNET AI
            <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent font-extrabold">
              Criminal Network Analysis & Forensic Grid
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Automating multi-modal crime syndicate de-anonymization. Connect police FIRs, nocturnal CDR bursts, hawala mule velocity, and DoT CEIR stolen IMEIs into interactive, court-admissible Knowledge Graphs.
          </p>

          {/* Quick Live Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="absolute left-4 top-3.5 text-cyan-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search suspect name (e.g. 'Iqbal Ansari'), phone number, bank account, or IMEI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0b1224] border border-slate-700/80 rounded-2xl pl-12 pr-32 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-2xl transition"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition flex items-center space-x-1"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Filter Suggestion Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
              <span className="text-[11px] text-slate-400 font-mono">Quick Lookup:</span>
              {quickSearchTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => onSearchSuspect(tag)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition font-mono"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Interactive Quick-Launch Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white font-mono uppercase tracking-wider">
                Primary Intelligence Engines
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Click any module to launch</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mainFeatureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => onNavigate(card.id)}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${card.color} bg-[#0a1020] border ${card.borderColor} p-6 transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-xl flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-750 flex items-center justify-center shadow-lg group-hover:border-cyan-400/50 transition">
                        <Icon className="w-6 h-6 text-cyan-300" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        {card.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                    <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition flex items-center space-x-1">
                      <span>{card.btnText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">FastAPI Async Ready</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Specialized Forensic Tools */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base sm:text-lg font-bold text-white font-mono uppercase tracking-wider">
              Specialized Investigation & Compliance Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => onNavigate(tool.id)}
                  className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 transition cursor-pointer flex flex-col justify-between space-y-3 group shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        {tool.tag}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-xs group-hover:text-cyan-300 transition">
                      {tool.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="text-[11px] text-cyan-400 font-semibold flex items-center space-x-1 group-hover:underline">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Case Matrix & Statistics Summary */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0b1328] to-[#070b14] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-cyan-400 font-mono text-xs font-semibold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>ACTIVE OPERATION: OPERATION GARUDA (NARCOTICS & HAWALA CARTEL)</span>
            </div>
            <h3 className="text-xl font-bold text-white font-mono">
              154 Entities Mapped Across 420 Evidentiary Links
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Real-time synchronization between Delhi Police Cyber Crime Special Cell, DoT CEIR, and FIU-India.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenIngest}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition flex items-center space-x-2 border border-blue-400/30"
            >
              <UploadCloud className="w-4 h-4" />
              <span>+ Ingest New Case FIR</span>
            </button>

            <button
              onClick={() => onNavigate('copilot')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-semibold text-xs border border-slate-700 transition flex items-center space-x-2"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Forensic Copilot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
