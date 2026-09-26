import React, { useState } from 'react';
import { 
  Shield, 
  Network, 
  Crown, 
  PhoneCall, 
  Coins, 
  MapPin, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Radio, 
  CheckCircle2, 
  UploadCloud, 
  Zap, 
  FileCheck2,
  Sliders,
  Award,
  Globe
} from 'lucide-react';
import GovtEmblem from '../Common/GovtEmblem';
import { translations } from '../../services/translations';

export default function HomePage({ onNavigate, onSearchSuspect, onOpenIngest, lang = 'en' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[lang] || translations.en;

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
      title: t.cardGraphTitle,
      subtitle: t.cardGraphSub,
      desc: t.cardGraphDesc,
      icon: Network,
      color: 'from-blue-600/20 via-cyan-600/10 to-transparent',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      badge: lang === 'hi' ? 'लाइव ग्राफ' : 'LIVE GRAPH',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      btnText: t.cardGraphBtn,
    },
    {
      id: 'kingpins',
      title: t.cardKingpinTitle,
      subtitle: t.cardKingpinSub,
      desc: t.cardKingpinDesc,
      icon: Crown,
      color: 'from-amber-600/20 via-orange-600/10 to-transparent',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      badge: lang === 'hi' ? 'पेजरैंक एआई' : 'PAGERANK AI',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      btnText: t.cardKingpinBtn,
    },
    {
      id: 'cdr',
      title: t.cardCdrTitle,
      subtitle: t.cardCdrSub,
      desc: t.cardCdrDesc,
      icon: PhoneCall,
      color: 'from-rose-600/20 via-red-600/10 to-transparent',
      borderColor: 'border-rose-500/40 hover:border-rose-400',
      badge: lang === 'hi' ? 'देर रात की कॉल्स' : 'MIDNIGHT SPIKES',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      btnText: t.cardCdrBtn,
    },
    {
      id: 'financial',
      title: t.cardFinTitle,
      subtitle: t.cardFinSub,
      desc: t.cardFinDesc,
      icon: Coins,
      color: 'from-emerald-600/20 via-teal-600/10 to-transparent',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badge: lang === 'hi' ? 'क्रिप्टो ट्रैकर' : 'CRYPTO OFFRAMP',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      btnText: t.cardFinBtn,
    }
  ];

  const secondaryTools = [
    {
      id: 'geospatial',
      title: lang === 'hi' ? 'अपराध जीआईएस मानचित्र' : 'Geo Crime Map',
      desc: lang === 'hi' ? 'सक्रिय सेल टॉवर व सुरक्षित ठिकानों का रीयल-टाइम नक्शा।' : 'Interactive GIS mapping of crime scenes, tower dumps, and transit hubs.',
      icon: MapPin,
      tag: 'GIS Mapping'
    },
    {
      id: 'dossier',
      title: lang === 'hi' ? 'कोर्ट केस डोजियर' : 'Court Case Dossier',
      desc: lang === 'hi' ? 'भारतीय साक्ष्य अधिनियम (BSA) 2023 के तहत 1-क्लिक चार्ज-शीट।' : 'BSA 2023 compliant court-admissible charge sheet briefs with SHA-256 hash.',
      icon: FileCheck2,
      tag: 'BSA 2023'
    },
    {
      id: 'settings',
      title: lang === 'hi' ? 'सरकारी गेटवे व सेटिंग्स' : 'Govt Gateways & Settings',
      desc: lang === 'hi' ? 'दूरसंचार विभाग के सीईआईआर व सीसीटीएनएस का लाइव समन्वय।' : 'DoT CEIR stolen IMEI gateway, CCTNS feeds, and audit policies.',
      icon: Sliders,
      tag: 'CEIR & CCTNS'
    }
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Live Emergency & Intelligence Grid Status Bar */}
      <div className="bg-[#0b1224] border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-600/50 text-rose-300 font-bold text-[11px]">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span>{t.nationalGrid}</span>
          </span>

          <span className="inline-flex items-center space-x-1 text-slate-300 font-medium text-[11px]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{t.ceirOnline}</span>
          </span>

          <span className="hidden md:inline-flex items-center space-x-1 text-slate-400 text-[11px]">
            <span>| CCTNS: <b className="text-cyan-400">{lang === 'hi' ? 'सक्रिय' : 'ACTIVE'}</b></span>
          </span>

          <span className="hidden lg:inline-flex items-center space-x-1 text-slate-400 text-[11px]">
            <span>| {t.bsaCompliant}</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
          <span>{lang === 'hi' ? 'प्रतिक्रिया समय:' : 'Threat Response:'} <b className="text-emerald-400">&lt;1s {lang === 'hi' ? '(तुरंत)' : '(Real-Time)'}</b></span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-10">
        {/* Hero Section with Official Title and Government Crest */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <GovtEmblem className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-600/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
            {t.heroTitle}
            <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent font-extrabold">
              {t.heroSubTitle}
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroDesc}
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="absolute left-4 top-3.5 text-cyan-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0b1224] border border-slate-700/80 rounded-2xl pl-12 pr-32 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-2xl transition"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1"
              >
                <span>{t.searchBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
              <span className="text-[11px] text-slate-400 font-semibold">{t.quickLookup}</span>
              {quickSearchTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => onSearchSuspect(tag)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Primary Intelligence Engines */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                {t.primaryEngines}
              </h2>
            </div>
            <span className="text-xs text-slate-400">{t.launchHint}</span>
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
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
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
                    <span className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition flex items-center space-x-1">
                      <span>{card.btnText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">FastAPI Engine</span>
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
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
              {lang === 'hi' ? 'विशेष अनुसंधान एवं साक्ष्य उपकरण' : 'Specialized Forensic & Compliance Tools'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                  <div className="text-[11px] text-cyan-400 font-bold flex items-center space-x-1 group-hover:underline">
                    <span>{lang === 'hi' ? 'उपकरण खोलें' : 'Open Tool'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <GovtEmblem className="w-6 h-6" />
            <span className="font-bold text-slate-300">{t.heroTitle} {t.heroSubTitle} (SIH26189)</span>
          </div>
          <div>
            <span>{t.footerGovt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
