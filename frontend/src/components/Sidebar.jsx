import React from 'react';
import { 
  Network, 
  Crown, 
  PhoneCall, 
  Coins, 
  MapPin, 
  Bot, 
  FileCheck2, 
  Activity,
  Settings,
  Info,
  X
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) {
  const mainNavItems = [
    { id: 'graph', label: 'Syndicate Graph', icon: Network, badge: 'Live' },
    { id: 'kingpins', label: 'Kingpin Radar', icon: Crown },
    { id: 'cdr', label: 'CDR & Intercepts', icon: PhoneCall, alert: true },
    { id: 'financial', label: 'Mule & Hawala Flow', icon: Coins },
    { id: 'geospatial', label: 'Geo Crime Map', icon: MapPin },
    { id: 'copilot', label: 'AI Forensic Copilot', icon: Bot, highlight: true },
    { id: 'dossier', label: 'Court Case Dossier', icon: FileCheck2 },
  ];

  const systemNavItems = [
    { id: 'settings', label: 'Settings & Gateways', icon: Settings },
    { id: 'about', label: 'About & Standards', icon: Info },
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 w-64 bg-[#0a0f1d] border-r border-slate-800 flex flex-col justify-between select-none z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-3 space-y-1 overflow-y-auto">
          {/* Mobile Close Header */}
          <div className="flex md:hidden items-center justify-between pb-2 border-b border-slate-800 mb-2">
            <span className="text-xs font-bold text-slate-300 font-mono">NAVIGATION MENU</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:block px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            Intelligence Modules
          </div>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-cyan-400 border border-blue-800">
                    {item.badge}
                  </span>
                )}
                {item.alert && (
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                )}
                {item.highlight && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    AI-RAG
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono border-t border-slate-800/80 mt-2">
            System & Compliance
          </div>

          {systemNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Security Badge */}
        <div className="p-3 m-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold font-mono text-[10px]">
            <Activity className="w-3.5 h-3.5" />
            <span>CHAIN-OF-CUSTODY: ACTIVE</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Tamper-proof audit logs compliant with Bharatiya Sakshya Adhiniyam 2023.
          </p>
        </div>
      </aside>
    </>
  );
}
