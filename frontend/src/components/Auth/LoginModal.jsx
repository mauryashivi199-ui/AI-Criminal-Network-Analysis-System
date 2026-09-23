import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  Building2, 
  CheckCircle2, 
  UserPlus, 
  LogIn, 
  AlertCircle, 
  X, 
  Sparkles,
  Mail
} from 'lucide-react';
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

  // 1-Click Google Sign In Simulator
  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser = {
        officer_name: "Special Agent (Google Auth)",
        email: "officer.mha@gov.in",
        badge_id: "MHA-GOOG-2026",
        agency: "Cyber & Intelligence Operations, MHA",
        role: "Certified Intelligence Analyst",
        clearance_level: "Level 4 - National Security Intelligence",
        picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
      };
      localStorage.setItem('kavachnet_officer', JSON.stringify(googleUser));
      onLoginSuccess(googleUser);
      setLoading(false);
      onClose();
    }, 500);
  };

  const presetOfficers = [
    {
      name: "Inspector Rajesh Kumar",
      badge: "DL-CYBER-8841",
      agency: "Special Cell / Cyber Crime Unit, Delhi Police",
      role: "Lead Cyber Crime Investigator",
    },
    {
      name: "Dr. Priya Sharma",
      badge: "MHA-FORENSIC-019",
      agency: "Cyber & Information Security Division, MHA",
      role: "Senior Forensic Graph Analyst",
    },
    {
      name: "Superintendent V. K. Menon",
      badge: "IPS-HQ-5502",
      agency: "Directorate of Enforcement / National Hub",
      role: "Special Operations Commander",
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
          setErrorMsg('Please enter your Officer Badge ID or click Google Sign In.');
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
      <div className="bg-[#0b1120] border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-[#0d162a] to-slate-900 border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-rose-500/20 border border-rose-400/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-sans tracking-wide flex items-center space-x-2">
                <span>{isRegisterMode ? "Officer Registration" : "Account Authentication"}</span>
              </h2>
              <p className="text-[11px] text-slate-400">National Crime Intelligence Grid (SIH26189)</p>
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

          {/* 1. Google 1-Click Sign In Button (Official Google Style) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-lg transition flex items-center justify-center space-x-3 border border-slate-300 active:scale-[0.99]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span>Sign In with Google Account</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-mono uppercase">Or use Official Police Badge</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>
          </div>

          {/* Quick 1-Click Officer Presets */}
          {!isRegisterMode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authorized Law Enforcement Profiles:</span>
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {presetOfficers.map((preset) => (
                  <button
                    key={preset.badge}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2 rounded-xl border text-left transition flex items-center justify-between ${
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
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
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
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold font-sans tracking-wide shadow-lg shadow-blue-500/25 transition border border-blue-400/30 flex items-center justify-center space-x-2 text-xs"
            >
              {isRegisterMode ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>REGISTER OFFICER PROFILE</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>ENTER SYSTEM WITH BADGE</span>
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
