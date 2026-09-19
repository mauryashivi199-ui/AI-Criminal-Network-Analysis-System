import React from 'react';
import { 
  Shield, 
  Cpu, 
  Network, 
  Scale, 
  Award, 
  FileCheck2, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Bot, 
  PhoneCall, 
  Coins, 
  MapPin,
  Building,
  Layers
} from 'lucide-react';

export default function AboutView() {
  const capabilities = [
    {
      icon: Network,
      title: "Multi-Relational Knowledge Graph",
      desc: "Connects disparate data points (FIRs, suspects, burner phones, shell bank accounts, vehicles, and safe houses) into a unified high-speed property graph.",
      color: "text-cyan-400 bg-cyan-950/50 border-cyan-800/60"
    },
    {
      icon: Award,
      title: "Algorithmic Kingpin Radar",
      desc: "Uses mathematical PageRank and Betweenness Centrality to identify remote syndicate leaders and brokers who orchestrate crimes without touching physical contraband.",
      color: "text-amber-400 bg-amber-950/50 border-amber-800/60"
    },
    {
      icon: PhoneCall,
      title: "CDR & IMEI Telemetry Analysis",
      desc: "Detects nocturnal communication bursts (1:00 AM - 4:00 AM), cell tower hops, and handset IMEI swaps across multiple burner SIM cards.",
      color: "text-rose-400 bg-rose-950/50 border-rose-800/60"
    },
    {
      icon: Coins,
      title: "Mule Account & Hawala AML Tracker",
      desc: "Identifies rapid pass-through velocity (>80%) across layer-1 mule accounts and tracks offramps into TRON (TRC-20) USDT crypto cold wallets.",
      color: "text-emerald-400 bg-emerald-950/50 border-emerald-800/60"
    },
    {
      icon: Bot,
      title: "AI Forensic Copilot (Graph-RAG)",
      desc: "Zero-hallucination interactive AI assistant with Web Speech Mic input, multi-file attachments (PDF/CSV/Photo), and instant bidirectional visual canvas synchronization.",
      color: "text-purple-400 bg-purple-950/50 border-purple-800/60"
    },
    {
      icon: FileCheck2,
      title: "BSA 2023 Electronic Evidence Briefs",
      desc: "Generates 1-click court-admissible charge sheet briefs with SHA-256 tamper-proof digital signature hashes compliant with Bharatiya Sakshya Adhiniyam 2023.",
      color: "text-blue-400 bg-blue-950/50 border-blue-800/60"
    }
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-[#070b14] p-4 md:p-6 space-y-6 text-slate-200">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/80 via-[#0a1226] to-[#070b14] border border-blue-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-900/60 text-cyan-300 border border-blue-700 text-xs font-mono font-semibold">
              SIH 2026 Problem Statement: SIH26189
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono">
              Theme: Blockchain & Cybersecurity
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono">
              Ministry of Home Affairs (MHA)
            </span>
          </div>

          <h1 className="text-xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
            AI-POWERED CRIMINAL NETWORK ANALYSIS SYSTEM
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
            An advanced, real-time Law Enforcement Investigation Platform designed for state police intelligence departments, cyber crime cells, and central enforcement agencies. Transforming scattered FIR documents, telecom CDR bursts, and hawala banking trails into actionable, court-admissible intelligence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div><span className="text-slate-500">System Version:</span> <span className="text-cyan-400 font-bold">v2.4.0-Production</span></div>
            <div><span className="text-slate-500">Classification:</span> <span className="text-amber-400 font-bold">RESTRICTED / LEA OFFICIAL USE</span></div>
            <div><span className="text-slate-500">Legal Standard:</span> <span className="text-emerald-400 font-bold">BSA 2023 / IT Act Sec 65B</span></div>
          </div>
        </div>
      </div>

      {/* Core Architectural Capabilities */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm font-bold text-white uppercase font-mono">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Core AI & Forensic Capabilities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0a0f1d] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 md:p-5 space-y-3 transition shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-xs font-mono">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack & Legal Compliance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tech Stack */}
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-white uppercase font-mono">Enterprise Technology Stack</h2>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Frontend Framework</span>
              <span className="font-mono text-cyan-300 font-semibold">React 18 + Vite + Tailwind CSS</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Graph Visualization</span>
              <span className="font-mono text-cyan-300 font-semibold">Cytoscape.js (COSE & Physics Layouts)</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Backend Microservices</span>
              <span className="font-mono text-cyan-300 font-semibold">Python 3.10+ & FastAPI High-Speed Async</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Graph Computation</span>
              <span className="font-mono text-cyan-300 font-semibold">NetworkX MultiDiGraph & Louvain Clustering</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Copilot AI Engine</span>
              <span className="font-mono text-cyan-300 font-semibold">Graph-RAG & Web Speech API Voice</span>
            </div>
          </div>
        </div>

        {/* Legal & Standards */}
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Scale className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-white uppercase font-mono">Statutory & Legal Frameworks</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100">Bharatiya Sakshya Adhiniyam (BSA) 2023:</span>
                <p className="text-[11px] text-slate-400">Fully compliant with electronic evidence integrity certificates and digital chain of custody.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100">Information Technology Act 2000 (Section 65B):</span>
                <p className="text-[11px] text-slate-400">Automated generation of SHA-256 cryptographically stamped electronic evidence certificates.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100">DoT CEIR & Telecom Guidelines:</span>
                <p className="text-[11px] text-slate-400">Automated blacklisted IMEI correlation and Section 91 CrPC / BNSS CDR data formats.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Team Credits */}
      <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <Building className="w-4 h-4 text-cyan-400" />
          <span>Developed for Smart India Hackathon 2026 (SIH26189)</span>
        </div>
        <div>
          <span>Ministry of Home Affairs | All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
}
