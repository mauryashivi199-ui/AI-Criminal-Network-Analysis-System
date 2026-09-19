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
  Info
} from 'lucide-react';

export default function Navbar({ 
  currentCase, 
  onSwitchCase, 
  onOpenIngest, 
  onRefreshGraph, 
  isLive,
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  currentOfficer,
  onOpenLogin,
  onLogout,
  onNavigateTab
}) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-[#0a0f1d] border-b border-slate-800 px-3 md:px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Brand & Mobile Menu Toggle */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/40 flex-shrink-0">
          <Shield className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>
        
        <div className="truncate">
          <div className="flex items-center space-x-1.5 md:space-x-2">
            <span className="font-extrabold tracking-wider text-xs md:text-sm text-white uppercase font-mono truncate">
              CRIMINAL NETWORK ANALYSIS
            </span>
            <span className="hidden sm:inline-block text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.5 rounded font-mono font-semibold">
              SIH26189
            </span>
          </div>
          <p className="text-[10px] md:text-[11px] text-slate-400 truncate">Ministry of Home Affairs (MHA)</p>
        </div>
      </div>

      {/* Case Selector, Ingest & Officer Account */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Case Selector Dropdown */}
        <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 md:px-3 md:py-1.5">
          <select
            value={currentCase}
            onChange={(e) => onSwitchCase(e.target.value)}
            className="bg-transparent text-[11px] md:text-xs font-semibold text-cyan-300 focus:outline-none cursor-pointer max-w-[110px] sm:max-w-[180px] md:max-w-none truncate"
          >
            <option value="operation_garuda" className="bg-slate-900 text-slate-200">
              Operation Garuda (Narcotics)
            </option>
            <option value="operation_cyber_trap" className="bg-slate-900 text-slate-200">
              Operation Cyber-Trap (Phishing)
            </option>
          </select>
        </div>

        {/* Live Indicator (Desktop) */}
        <div className="hidden xl:flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] font-medium">LIVE</span>
        </div>

        {/* Ingest Action Button */}
        <button
          onClick={onOpenIngest}
          className="flex items-center space-x-1 md:space-x-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[11px] md:text-xs font-medium shadow-md transition border border-blue-400/30 flex-shrink-0"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ingest FIR</span>
        </button>

        {/* Refresh button */}
        <button
          onClick={onRefreshGraph}
          title="Refresh Graph Engine"
          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
        >
          <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>

        {/* Officer Account Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-1.5 md:space-x-2 px-2 md:px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-200 transition text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
              {currentOfficer ? currentOfficer.officer_name.charAt(0) : "O"}
            </div>
            <div className="hidden lg:block text-left">
              <div className="font-bold text-[11px] text-white truncate max-w-[110px]">
                {currentOfficer ? currentOfficer.officer_name : "Officer"}
              </div>
              <div className="text-[9px] text-cyan-400 font-mono leading-none">
                {currentOfficer ? currentOfficer.badge_id : "DL-CYBER-8841"}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-64 bg-[#0b1120] border border-slate-750 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn text-xs"
              onMouseLeave={() => setIsProfileDropdownOpen(false)}
            >
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 mb-2">
                <div className="font-bold text-white text-xs">{currentOfficer?.officer_name || "Inspector Rajesh Kumar"}</div>
                <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{currentOfficer?.badge_id || "DL-CYBER-8841"}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-tight">{currentOfficer?.agency || "Special Cell, Delhi Police"}</div>
                <div className="mt-2 text-[9px] font-mono px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 rounded inline-block">
                  {currentOfficer?.clearance_level || "Level 3 - Top Secret (LEA)"}
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
                  <span>Security & System Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onNavigateTab('about');
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition text-left"
                >
                  <Info className="w-3.5 h-3.5 text-purple-400" />
                  <span>About SIH26189 Platform</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-cyan-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition text-left"
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Switch / Register Officer</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition text-left border-t border-slate-800/80 pt-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock & Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
