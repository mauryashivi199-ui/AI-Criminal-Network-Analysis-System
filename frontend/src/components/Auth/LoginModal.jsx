import React, { useState } from 'react';
import { Shield, Lock, User, KeyRound, Building2, CheckCircle2, UserPlus, LogIn, AlertCircle, X, Sparkles } from 'lucide-react';
import { loginOfficer, registerOfficer } from '../../services/api';

export default function LoginModal({ isOpen, onClose, currentOfficer, onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [badgeId, setBadgeId] = useState('');
  const [password, setPassword] = useState('');
  const [agency, setAgency] = useState('Delhi Police Special Cell / MHA');
  const [officerName, setOfficerName] = useState('');
  const [role, setRole] = useState('Lead Cyber Crime Investigator');
  const [clearanceLevel, setClearanceLevel] = useState('Level 3 - Top Secret (LEA)');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const presetOfficers = [
    {
      name: "Inspector Rajesh Kumar",
      badge: "DL-CYBER-8841",
      agency: "Special Cell / Cyber Crime Unit, Delhi Police",
      role: "Lead Cyber Crime Investigator",
      color: "from-blue-600 to-indigo-700"
    },
    {
      name: "Dr. Priya Sharma",
      badge: "MHA-FORENSIC-019",
      agency: "Cyber & Information Security Division, MHA",
      role: "Senior Forensic Graph Analyst",
      color: "from-purple-600 to-indigo-700"
    },
    {
      name: "Superintendent V. K. Menon",
      badge: "IPS-HQ-5502",
      agency: "Directorate of Enforcement / National Hub",
      role: "Special Operations Commander",
      color: "from-emerald-600 to-teal-700"
    }
  ];

  const handleSelectPreset = (preset) => {
    setBadgeId(preset.badge);
    setOfficerName(preset.name);
    setAgency(preset.agency);
    setRole(preset.role);
    setPassword('demo@123');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        if (!officerName || !badgeId) {
          setErrorMsg('Please enter Officer Name and Badge ID.');
          setLoading(false);
          return;
        }
        const res = await registerOfficer({
          officer_name: officerName,
          badge_id: badgeId,
          agency,
          role,
          clearance_level: clearanceLevel,
          pin: password || '1234'
        });
        localStorage.setItem('kavachnet_officer', JSON.stringify(res.officer));
        onLoginSuccess(res.officer);
        onClose();
      } else {
        if (!badgeId) {
          setErrorMsg('Please enter your Officer Badge ID.');
          setLoading(false);
          return;
        }
        const res = await loginOfficer({
          badge_id: badgeId,
          password_or_pin: password || 'demo@123',
          agency,
          officer_name: officerName
        });
        localStorage.setItem('kavachnet_officer', JSON.stringify(res.officer));
        onLoginSuccess(res.officer);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.detail || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#0b1120] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-[#0d162a] to-slate-900 border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
                <span>{isRegisterMode ? "Officer Registration" : "Law Enforcement Authentication"}</span>
              </h2>
              <p className="text-[11px] text-slate-400">MHA Intelligence Platform (SIH26189)</p>
            </div>
          </div>
          {currentOfficer && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick 1-Click Officer Presets */}
          {!isRegisterMode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Click Authorized Officer Profiles:</span>
                </span>
                <span className="text-[10px] text-cyan-400 font-semibold">Demo Quick Select</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {presetOfficers.map((preset) => (
                  <button
                    key={preset.badge}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      badgeId === preset.badge
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-100 flex items-center space-x-2">
                        <span>{preset.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-950 text-cyan-400 border border-blue-800">
                          {preset.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">{preset.agency}</div>
                    </div>
                    {badgeId === preset.badge && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            {isRegisterMode && (
              <div>
                <label className="block text-slate-400 text-[11px] mb-1 font-mono">OFFICER FULL NAME *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. DySP Amit Verma"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-400 text-[11px] mb-1 font-mono">
                {isRegisterMode ? "POLICE / AGENCY BADGE ID *" : "OFFICER BADGE ID *"}
              </label>
              <div className="relative">
                <Shield className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. DL-CYBER-8841"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
              </div>
            </div>

            {isRegisterMode && (
              <>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-mono">GOVERNMENT LAW ENFORCEMENT AGENCY</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={agency}
                      onChange={(e) => setAgency(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-mono">SECURITY CLEARANCE LEVEL</label>
                  <select
                    value={clearanceLevel}
                    onChange={(e) => setClearanceLevel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs cursor-pointer"
                  >
                    <option value="Level 1 - Station Sub-Inspector">Level 1 - Station Sub-Inspector</option>
                    <option value="Level 2 - Confidential Access">Level 2 - Confidential Access</option>
                    <option value="Level 3 - Top Secret (LEA)">Level 3 - Top Secret (LEA)</option>
                    <option value="Level 4 - National Security Intelligence">Level 4 - National Security Intelligence</option>
                    <option value="Level 5 - Director General Directive">Level 5 - Director General Directive</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-400 text-[11px] mb-1 font-mono">
                {isRegisterMode ? "ENCRYPTED SECURITY PIN / PASSWORD" : "SECURITY PIN / PASSWORD"}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold font-mono tracking-wider shadow-lg shadow-blue-500/25 transition border border-blue-400/30 flex items-center justify-center space-x-2 text-xs"
            >
              {isRegisterMode ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>REGISTER OFFICER PROFILE</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>AUTHENTICATE & ENTER SYSTEM</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Register/Login */}
          <div className="pt-2 text-center border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg('');
              }}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition text-xs"
            >
              {isRegisterMode 
                ? "← Back to Officer Login" 
                : "Need to enroll a new officer? Create Officer Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
