import React, { useState } from 'react';
import { 
  Shield, 
  UploadCloud, 
  RefreshCw, 
  Menu, 
  X, 
  User, 
  LogOut, 
  UserCheck, 
  ChevronDown, 
  Settings as SettingsIcon,
  Info,
  Network,
  Crown,
  PhoneCall,
  Coins,
  Bot,
  FileCheck2,
  Home,
  Radio,
  Globe
} from 'lucide-react';

export default function Navbar({ 
  activeTab,
  onNavigateTab,
  currentCase, 
  onSwitchCase, 
  onOpenIngest, 
  onRefreshGraph, 
  isLive,
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  currentOfficer,
  onOpenLogin,
  onLogout
}) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const navTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'graph', label: 'Syndicate Graph', icon: Network },
    { id: 'kingpins', label: 'Kingpin Radar', icon: Crown },
    { id: 'cdr', label: 'CDR Intercepts', icon: PhoneCall },
    { id: 'financial', label: 'Hawala AML', icon: Coins },
    { id: 'copilot', label: 'AI Copilot', icon: Bot, highlight: true },
    { id: 'dossier', label: 'Court Dossier', icon: FileCheck2 },
  ];

  return (
    <div className="flex flex-col z-30 select-none sticky top-0">
      {/* 1. Top Emergency / Intelligence Ticker Bar (Red/Amber Alert Header) */}
      <div className="bg-[#0b0f19] border-b border-slate-800/80 px-3 md:px-6 py-1.5 flex items-center justify-between text-[11px] text-slate-300 font-sans">
        <div className="flex items-center space-x-2 md:space-x-4 truncate">
          <span className="inline-flex items-center space-x-1.5 text-rose-400 font-bold font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span className="truncate">24/7 NATIONAL CRIME &amp; INTELLIGENCE GRID</span>
          </span>

          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">
            Cyber Crime Helpline: <b className="text-white font-mono">1930</b>
          </span>

          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">
            Emergency Response: <b className="text-white font-mono">112</b>
          </span>

          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-slate-300">
            DoT CEIR Gateway: <b className="text-emerald-400 font-mono">ONLINE</b>
          </span>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-mono text-[10px]">
            BSA 2023 Compliant
          </span>

          <button
            onClick={() => setLanguage(language === 'EN' ? 'हिंदी' : 'EN')}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-750 text-cyan-300 font-mono text-[10px] transition"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>{language === 'EN' ? 'हिंदी' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Glassmorphic Top Pill Navbar */}
      <header className="h-16 bg-[#0a0f1d]/95 backdrop-blur-md border-b border-slate-800 px-3 md:px-5 flex items-center justify-between">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => onNavigateTab('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-rose-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-cyan-400/40 flex-shrink-0 group-hover:scale-105 transition">
              <Shield className="w-5 h-5 text-white" />
            </div>
            
            <div className="truncate">
              <div className="flex items-center space-x-1.5">
                <span className="font-black tracking-wide text-xs sm:text-sm text-white uppercase font-sans truncate">
                  KAVACHNET AI
                </span>
                <span className="hidden sm:inline-block text-[9px] bg-blue-950 text-cyan-300 border border-blue-800 px-1.5 py-0.2 rounded font-mono font-semibold">
                  SIH26189
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">Ministry of Home Affairs (MHA)</p>
            </div>
          </div>
        </div>

        {/* Center Pill Navigation Bar (Desktop & Tablet) */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-1 shadow-inner">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigateTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md border border-blue-400/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-200' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.highlight && (
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls: Ingest FIR & Google / Officer Login */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Case Dropdown */}
          <div className="hidden sm:flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <select
              value={currentCase}
              onChange={(e) => onSwitchCase(e.target.value)}
              className="bg-transparent text-[11px] md:text-xs font-semibold text-cyan-300 focus:outline-none cursor-pointer max-w-[140px] md:max-w-none truncate"
            >
              <option value="operation_garuda" className="bg-slate-900 text-slate-200">
                Op Garuda (Narcotics)
              </option>
              <option value="operation_cyber_trap" className="bg-slate-900 text-slate-200">
                Op Cyber-Trap (Phishing)
              </option>
            </select>
          </div>

          {/* Ingest FIR Action Button */}
          <button
            onClick={onOpenIngest}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition border border-blue-400/30 flex-shrink-0"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ingest FIR</span>
          </button>

          {/* Google Sign In / Officer Profile Button */}
          {currentOfficer ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-200 transition text-xs shadow-md"
              >
                {currentOfficer.picture ? (
                  <img src={currentOfficer.picture} alt="Avatar" className="w-6 h-6 rounded-full border border-cyan-400" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {currentOfficer.officer_name?.charAt(0) || "O"}
                  </div>
                )}
                
                <div className="hidden md:block text-left max-w-[110px]">
                  <div className="font-bold text-[11px] text-white truncate">
                    {currentOfficer.officer_name}
                  </div>
                  <div className="text-[9px] text-cyan-400 font-mono truncate leading-none">
                    {currentOfficer.badge_id || currentOfficer.email || "DL-CYBER-8841"}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#0b1120] border border-slate-750 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn text-xs"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 mb-2">
                    <div className="font-bold text-white text-xs">{currentOfficer.officer_name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{currentOfficer.badge_id || currentOfficer.email}</div>
                    <div className="text-[10px] text-slate-400 mt-1 leading-tight">{currentOfficer.agency || "Law Enforcement Officer"}</div>
                    <div className="mt-2 text-[9px] font-mono px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 rounded inline-block">
                      {currentOfficer.clearance_level || "Level 3 - Top Secret (LEA)"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onNavigateTab('settings');
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition text-left"
                    >
                      <SettingsIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Security &amp; Gateways</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onNavigateTab('about');
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition text-left"
                    >
                      <Info className="w-3.5 h-3.5 text-purple-400" />
                      <span>About Platform</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-cyan-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition text-left"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Switch / Google Account</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition text-left border-t border-slate-800/80 pt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Lock &amp; Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Google Login Button with Official G-Icon (Matching Reference Design) */
            <button
              onClick={onOpenLogin}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs shadow-md transition"
            >
              {/* Google Official G Logo */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Login</span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
