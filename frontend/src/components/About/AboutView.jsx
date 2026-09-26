import React from 'react';
import { 
  Shield, 
  Cpu, 
  Network, 
  Scale, 
  Award, 
  FileCheck2, 
  CheckCircle2, 
  Bot, 
  PhoneCall, 
  Coins, 
  MapPin, 
  Building, 
  Layers, 
  ArrowRight, 
  Zap, 
  Lock, 
  Database,
  Radio
} from 'lucide-react';
import GovtEmblem from '../Common/GovtEmblem';

export default function AboutView({ lang = 'en' }) {
  const capabilities = [
    {
      icon: Network,
      title: lang === 'hi' ? "मल्टी-रिलेशनल नॉलेज ग्राफ" : "Multi-Relational Knowledge Graph",
      desc: lang === 'hi'
        ? "एफआईआर, संदिग्धों, बर्नर फोन, म्यूल खातों और ठिकानों को एक एकीकृत हाई-स्पीड ग्राफ में जोड़ता है।"
        : "Connects disparate data points (FIRs, suspects, burner phones, shell bank accounts, and safe houses) into a unified property graph.",
      color: "text-cyan-400 bg-cyan-950/50 border-cyan-800/60"
    },
    {
      icon: Award,
      title: lang === 'hi' ? "किंगपिन सेंट्रलटी रडार" : "Algorithmic Kingpin Radar",
      desc: lang === 'hi'
        ? "पेजरैंक और बिटवीननेस सेंट्रलटी से दूर बैठकर अपराध नियंत्रित करने वाले सरगनाओं को बेनकाब करता है।"
        : "Uses mathematical PageRank and Betweenness Centrality to identify remote syndicate leaders and masterminds.",
      color: "text-amber-400 bg-amber-950/50 border-amber-800/60"
    },
    {
      icon: PhoneCall,
      title: lang === 'hi' ? "सीडीआर व आईएमईआई टेलीमेट्री" : "CDR & IMEI Telemetry Analysis",
      desc: lang === 'hi'
        ? "रात 1 से 4 बजे के बीच की संदिग्ध कॉल्स, टॉवर जंप और सिम बदलने (IMEI Handset Swap) को पकड़ता है।"
        : "Detects nocturnal communication bursts (1:00 AM - 4:00 AM), cell tower hops, and handset IMEI swaps across multiple SIMs.",
      color: "text-rose-400 bg-rose-950/50 border-rose-800/60"
    },
    {
      icon: Coins,
      title: lang === 'hi' ? "म्यूल खाता व हवाला ट्रैकर" : "Mule Account & Hawala AML Tracker",
      desc: lang === 'hi'
        ? "फर्जी बैंक खातों के तेज वेग (>80%) और ट्रॉन (TRC-20) क्रिप्टो ऑफ-रैंप को ट्रैक करता है।"
        : "Identifies rapid pass-through velocity (>80%) across mule accounts and tracks offramps into TRON USDT cold wallets.",
      color: "text-emerald-400 bg-emerald-950/50 border-emerald-800/60"
    },
    {
      icon: Bot,
      title: lang === 'hi' ? "एआई फोरेंसिक कोपायलट (Graph-RAG)" : "AI Forensic Copilot (Graph-RAG)",
      desc: lang === 'hi'
        ? "शून्य-भ्रम (Zero Hallucination) आधारित वॉइस माइक एवं फाइल साक्ष्य विश्लेषण।"
        : "Zero-hallucination interactive AI assistant with Web Speech Mic input, multi-file attachments, and live graph sync.",
      color: "text-purple-400 bg-purple-950/50 border-purple-800/60"
    },
    {
      icon: FileCheck2,
      title: lang === 'hi' ? "बीएसए 2023 कोर्ट साक्ष्य डोजियर" : "BSA 2023 Electronic Evidence Briefs",
      desc: lang === 'hi'
        ? "भारतीय साक्ष्य अधिनियम (BSA) 2023 के तहत SHA-256 डिजिटल हस्ताक्षर युक्त कोर्ट-स्वीकृत रिपोर्ट।"
        : "Generates 1-click court-admissible charge sheet briefs with SHA-256 tamper-proof digital signatures compliant with BSA 2023.",
      color: "text-blue-400 bg-blue-950/50 border-blue-800/60"
    }
  ];

  const pipelineStages = [
    {
      step: "01",
      title: lang === 'hi' ? "मल्टी-मॉडल डेटा अंतर्ग्रहण" : "Multi-Modal Ingestion",
      desc: lang === 'hi' ? "पुलिस एफआईआर, दूरसंचार सीडीआर, बैंक लेजर और सीईआईआर चोरी के फोन" : "Police FIRs, Telecom CDRs, Hawala Ledgers & DoT CEIR IMEIs",
      icon: Database,
      color: "border-cyan-500/40 text-cyan-300"
    },
    {
      step: "02",
      title: lang === 'hi' ? "नॉलेज ग्राफ एवं एल्गोरिदम" : "Graph & Analytics AI",
      desc: lang === 'hi' ? "पेजरैंक, बिटवीननेस सेंट्रलटी, ल्यूवेन क्लस्टरिंग व आईएमईआई स्वैप" : "NetworkX MultiDiGraph, PageRank Centrality & Nocturnal Spikes",
      icon: Network,
      color: "border-amber-500/40 text-amber-300"
    },
    {
      step: "03",
      title: lang === 'hi' ? "ग्राफ-रैग कोपायलट" : "Graph-RAG Copilot",
      desc: lang === 'hi' ? "प्राकृतिक भाषा में संवाद, वॉइस कमांड और स्वचालित संदिग्ध हाइलाइट" : "Natural Language Query, Speech Mic & Subgraph Auto-Focus",
      icon: Bot,
      color: "border-purple-500/40 text-purple-300"
    },
    {
      step: "04",
      title: lang === 'hi' ? "कोर्ट-स्वीकृत डिजिटल साक्ष्य" : "Court Legal Dossier",
      desc: lang === 'hi' ? "भारतीय साक्ष्य अधिनियम (BSA) 2023 डिजिटल हैश व धारा 65B प्रमाण पत्र" : "BSA 2023 SHA-256 Tamper-Proof Electronic Evidence Certificate",
      icon: FileCheck2,
      color: "border-emerald-500/40 text-emerald-300"
    }
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-[#070b14] p-4 md:p-6 space-y-6 text-slate-100 font-sans select-none">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/80 via-[#0a1226] to-[#070b14] border border-blue-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-3 pb-2">
            <GovtEmblem className="w-10 h-10 sm:w-12 sm:h-12" />
            <div>
              <span className="px-3 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 border border-blue-700 text-xs font-bold">
                SIH 2026 Problem Statement: SIH26189
              </span>
              <span className="ml-2 px-3 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                Ministry of Home Affairs (MHA), Government of India
              </span>
            </div>
          </div>

          <h1 className="text-xl md:text-3xl font-extrabold text-white uppercase tracking-tight">
            {lang === 'hi'
              ? 'एआई-संचालित आपराधिक नेटवर्क विश्लेषण एवं फोरेंसिक प्रणाली'
              : 'AI-POWERED CRIMINAL NETWORK ANALYSIS & FORENSIC INTELLIGENCE SYSTEM'}
          </h1>
          
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'hi'
              ? 'राज्य पुलिस खुफिया विभागों, साइबर सेल और राष्ट्रीय सुरक्षा एजेंसियों के लिए विकसित एक उन्नत अन्वेषण मंच। एफआईआर, फोन कॉल्स, हवाला वित्तीय प्रवाह और चोरी के मोबाइलों को कोर्ट में प्रस्तुत करने योग्य डिजिटल साक्ष्य में परिवर्तित करता है।'
              : 'An enterprise, real-time Law Enforcement Investigation Platform designed for state police intelligence departments, cyber crime cells, and central enforcement agencies. Transforming scattered FIR documents, telecom CDR bursts, and hawala banking trails into actionable, court-admissible intelligence.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div><span className="text-slate-500">Version:</span> <span className="text-cyan-400 font-bold">v2.4.0-Production</span></div>
            <div><span className="text-slate-500">Classification:</span> <span className="text-amber-400 font-bold">RESTRICTED / LEA OFFICIAL USE</span></div>
            <div><span className="text-slate-500">Standard:</span> <span className="text-emerald-400 font-bold">BSA 2023 / IT Act Sec 65B</span></div>
          </div>
        </div>
      </div>

      {/* Visual System Pipeline Architecture Diagram */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wide">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'hi' ? 'सिस्टम आर्किटेक्चर एवं डेटा फ्लो डायग्राम' : 'End-to-End System Pipeline & Data Flow'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-3xl bg-[#0a0f1d] border ${stage.color} shadow-xl space-y-3 relative overflow-hidden`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-black opacity-40">
                    {stage.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-xs">{stage.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Architectural Capabilities Grid */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wide">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'hi' ? 'प्रमुख फोरेंसिक क्षमताएं' : 'Core Forensic Capabilities'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0a0f1d] border border-slate-800/90 hover:border-slate-700 rounded-3xl p-5 space-y-3 transition shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className={`w-9 h-9 rounded-2xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-xs">{item.title}</h3>
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
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-white uppercase">
              {lang === 'hi' ? 'एंटरप्राइज टेक्नोलॉजी स्टैक' : 'Enterprise Technology Stack'}
            </h2>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Frontend UI</span>
              <span className="text-cyan-300 font-bold">React 18 + Vite + Tailwind CSS</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Knowledge Graph</span>
              <span className="text-cyan-300 font-bold">Cytoscape.js 2D/3D (COSE Physics)</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Backend Microservices</span>
              <span className="text-cyan-300 font-bold">Python 3.10+ &amp; FastAPI Async ASGI</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Graph Computation</span>
              <span className="text-cyan-300 font-bold">NetworkX MultiDiGraph &amp; Louvain</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Copilot AI Engine</span>
              <span className="text-cyan-300 font-bold">Graph-RAG &amp; Web Speech Voice API</span>
            </div>
          </div>
        </div>

        {/* Legal & Standards */}
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Scale className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-white uppercase">
              {lang === 'hi' ? 'वैधानिक एवं कानूनी अनुपालन' : 'Statutory & Legal Frameworks'}
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100">Bharatiya Sakshya Adhiniyam (BSA) 2023:</span>
                <p className="text-[11px] text-slate-400">Section 63/65B electronic record integrity and SHA-256 digital signature chains.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100">Information Technology Act, 2000 (Sec 65B):</span>
                <p className="text-[11px] text-slate-400">Cryptographically stamped electronic certificate generation for trial courts.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-100">DoT CEIR &amp; Telecom CMS:</span>
                <p className="text-[11px] text-slate-400">Automated stolen handset IMEI blacklisting and Section 91 CrPC / BNSS CDR formats.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Team Credits */}
      <div className="p-4 rounded-3xl bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <GovtEmblem className="w-5 h-5" />
          <span>Developed for Smart India Hackathon 2026 (SIH26189)</span>
        </div>
        <div>
          <span>Ministry of Home Affairs, Govt. of India • All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
}
