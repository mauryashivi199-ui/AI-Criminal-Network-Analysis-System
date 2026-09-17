import React from 'react';
import { Shield, Radio, UploadCloud, FileText, AlertTriangle, RefreshCw, Menu, X } from 'lucide-react';

export default function Navbar({ 
  currentCase, 
  onSwitchCase, 
  onOpenIngest, 
  onRefreshGraph, 
  isLive,
  isMobileMenuOpen,
  setIsMobileMenuOpen 
}) {
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

      {/* Case Selector & Operations Control */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Case Selector Dropdown */}
        <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 md:px-3 md:py-1.5">
          <select
            value={currentCase}
            onChange={(e) => onSwitchCase(e.target.value)}
            className="bg-transparent text-[11px] md:text-xs font-semibold text-cyan-300 focus:outline-none cursor-pointer max-w-[120px] sm:max-w-[200px] md:max-w-none truncate"
          >
            <option value="operation_garuda" className="bg-slate-900 text-slate-200">
              Operation Garuda (Narcotics)
            </option>
            <option value="operation_cyber_trap" className="bg-slate-900 text-slate-200">
              Operation Cyber-Trap (Phishing)
            </option>
          </select>
        </div>

        {/* Live Indicator (Desktop & Tablet) */}
        <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
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
      </div>
    </header>
  );
}
