import React, { useState, useRef, useEffect } from 'react';
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
  Send,
  Loader2,
  Mic,
  MicOff,
  Smartphone,
  Copy,
  Check
} from 'lucide-react';
import { queryCopilot } from '../../services/api';

export default function HomePage({ onNavigate, onSearchSuspect, onOpenIngest }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Home Embedded AI Bot State
  const [botMessages, setBotMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste Officer! I am your **AI Forensic Investigation Assistant**. You can ask me to pinpoint cartel leaders, trace burner phone midnight calls, or look up specific suspects right here from the home terminal.',
      actions: [
        'Who is the top kingpin in this syndicate?',
        'Tell me about Iqbal Ansari',
        'Show money mule bank accounts',
        'Analyze burner phone midnight call spikes'
      ]
    }
  ]);
  const [botInput, setBotInput] = useState('');
  const [botLoading, setBotLoading] = useState(false);
  const [isBotRecording, setIsBotRecording] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const botMessagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const phoneUrl = typeof window !== 'undefined' 
    ? `http://${window.location.hostname}:5173` 
    : 'http://10.201.109.64:5173';

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onstart = () => setIsBotRecording(true);
        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setBotInput(transcript);
        };
        recognition.onerror = () => setIsBotRecording(false);
        recognition.onend = () => setIsBotRecording(false);
        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleBotSpeech = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }
    if (isBotRecording) {
      recognitionRef.current.stop();
      setIsBotRecording(false);
    } else {
      recognitionRef.current.start();
      setIsBotRecording(true);
    }
  };

  const handleBotSend = async (queryToSend) => {
    const q = queryToSend || botInput;
    if (!q.trim()) return;

    setBotMessages(prev => [...prev, { sender: 'user', text: q }]);
    if (!queryToSend) setBotInput('');
    setBotLoading(true);

    try {
      const res = await queryCopilot(q);
      setBotMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          actions: res.suggested_actions || []
        }
      ]);
    } catch (e) {
      setBotMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Unable to reach the Forensic Graph Engine. Please ensure the backend is running.',
          actions: []
        }
      ]);
    } finally {
      setBotLoading(false);
    }
  };

  const copyPhoneLink = () => {
    navigator.clipboard.writeText(phoneUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

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
    },
    {
      id: 'financial',
      title: 'Mule & Hawala AML Tracker',
      subtitle: 'FINANCIAL DE-ANONYMIZATION',
      desc: 'Track rapid pass-through bank velocity (>80%) and crypto offramps into TRON TRC-20 wallets across inter-state Hawala corridors.',
      icon: Coins,
      color: 'from-emerald-600/20 via-teal-600/10 to-transparent',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badge: 'CRYPTO OFFRAMP',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      btnText: 'View Hawala Ledger',
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

        {/* Mobile Phone Test Link Chip */}
        <div className="flex items-center space-x-2">
          <button
            onClick={copyPhoneLink}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 text-cyan-300 text-[11px] font-mono transition"
            title="Click to copy Mobile phone link"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Phone: {phoneUrl}</span>
            {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-10">
        {/* Hero Section with Official Title */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-600/40 text-cyan-300 text-xs font-mono font-medium shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Smart India Hackathon 2026 • Ministry of Home Affairs (SIH26189)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans text-white uppercase leading-tight">
            AI-POWERED CRIMINAL NETWORK
            <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent font-extrabold">
              ANALYSIS &amp; FORENSIC INTELLIGENCE SYSTEM
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Multi-modal crime syndicate de-anonymization. Connect police FIRs, nocturnal CDR bursts, hawala mule velocity, and DoT CEIR stolen IMEIs into interactive, court-admissible Knowledge Graphs.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="absolute left-4 top-3.5 text-cyan-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search suspect name (e.g. 'Iqbal Ansari'), phone, or bank account..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0b1224] border border-slate-700/80 rounded-2xl pl-12 pr-32 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-2xl transition"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition flex items-center space-x-1"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

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

        {/* 🤖 Embedded Live AI Assistant Bot on Home Page */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0e162c] to-[#0a1020] border border-purple-500/40 p-5 md:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 border border-purple-400/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white font-mono uppercase tracking-wide flex items-center space-x-2">
                  <span>AI Forensic Investigation Bot (Live Terminal)</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                    GRAPH-RAG
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Ask questions with text or Voice Mic 🎙️ directly from the home dashboard.</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('copilot')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
            >
              <span>Full Screen Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bot Chat Scroll Area */}
          <div className="max-h-64 overflow-y-auto space-y-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-900 text-xs">
            {botMessages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-2xl leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-purple-400 font-mono font-bold block">TRY ASKING:</span>
                      {m.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleBotSend(act)}
                          className="block text-left w-full text-[11px] text-cyan-300 hover:text-cyan-200 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 hover:border-cyan-500/40 transition"
                        >
                          ➔ {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {botLoading && (
              <div className="flex items-center space-x-2 text-xs text-purple-400 font-mono p-2 bg-slate-900 rounded-xl max-w-xs border border-slate-800 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Forensic Graph inference in progress...</span>
              </div>
            )}
            <div ref={botMessagesEndRef} />
          </div>

          {/* Bot Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBotSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder={isBotRecording ? "Listening to your voice..." : "Type query (e.g., 'Who is the kingpin?', 'Tell me about Iqbal Ansari')..."}
              value={botInput}
              onChange={(e) => setBotInput(e.target.value)}
              className={`flex-1 bg-slate-950 border rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 ${
                isBotRecording ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-800'
              }`}
            />

            <button
              type="button"
              onClick={toggleBotSpeech}
              className={`p-2.5 rounded-xl border transition flex-shrink-0 ${
                isBotRecording 
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-cyan-400'
              }`}
              title="Speak query with Mic"
            >
              {isBotRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              type="submit"
              disabled={botLoading || !botInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow transition flex items-center space-x-1"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 4 Core Intelligence Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white font-mono uppercase tracking-wider">
                Primary Intelligence Engines
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">1-Click Launch</span>
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

        {/* Footer Statistics */}
        <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>AI-POWERED CRIMINAL NETWORK ANALYSIS SYSTEM (SIH26189)</span>
          </div>
          <div>
            <span>Ministry of Home Affairs (MHA) • All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
