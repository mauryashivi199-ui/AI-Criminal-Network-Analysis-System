import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Radio, 
  Sliders, 
  Database, 
  Key, 
  Save, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Layers,
  Server
} from 'lucide-react';
import { getSystemSettings, updateSystemSettings, getAuditLogs } from '../../services/api';

export default function SettingsView() {
  const [settings, setSettings] = useState({
    ceir_gateway_url: "https://ceir.sfc.nic.in/api/v2/lea-stream",
    ceir_sync_enabled: true,
    cctns_api_endpoint: "https://cctns.gov.in/api/fir/v3/inter-state",
    cctns_sync_enabled: true,
    fiu_webhook_url: "https://fiuindia.gov.in/str-stream/v1",
    fiu_sync_enabled: true,
    bsa_tamper_proof_logs: true,
    cdr_midnight_start: 1,
    cdr_midnight_end: 4,
    mule_pass_through_threshold: 80,
    dark_tactical_mode: true,
    auto_redact_pii: false
  });

  const [systemStatus, setSystemStatus] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const sRes = await getSystemSettings();
      if (sRes.settings) setSettings(sRes.settings);
      if (sRes.system_status) setSystemStatus(sRes.system_status);

      const aRes = await getAuditLogs();
      if (aRes.audit_logs) setAuditLogs(aRes.audit_logs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateSystemSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const exportAuditJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `BSA2023_Audit_Logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#070b14] p-4 md:p-6 space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white flex items-center space-x-2.5 font-mono">
            <Settings className="w-5 h-5 text-cyan-400" />
            <span>SYSTEM & COMPLIANCE CONFIGURATION</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage Law Enforcement Data Gateways (CEIR, CCTNS, FIU) & BSA 2023 Tamper-Proof Audit Policies
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportAuditJSON}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Audit Trail</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-500/20 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>System configuration and encryption policies successfully saved to secure storage.</span>
        </div>
      )}

      {/* Grid of Settings Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. External LEA Data Gateways */}
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-xs font-bold text-white uppercase font-mono flex items-center space-x-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Government LEA Integration Gateways</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
              CONNECTED
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* CEIR Gateway */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">DoT CEIR Gateway (Stolen IMEIs)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.ceir_sync_enabled}
                    onChange={(e) => setSettings({ ...settings, ceir_sync_enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <input
                type="text"
                value={settings.ceir_gateway_url}
                onChange={(e) => setSettings({ ...settings, ceir_gateway_url: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-[11px] font-mono"
              />
            </div>

            {/* CCTNS Police FIR API */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">CCTNS / NATGRID Core e-FIR Feed</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.cctns_sync_enabled}
                    onChange={(e) => setSettings({ ...settings, cctns_sync_enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <input
                type="text"
                value={settings.cctns_api_endpoint}
                onChange={(e) => setSettings({ ...settings, cctns_api_endpoint: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-[11px] font-mono"
              />
            </div>

            {/* FIU Financial */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">FIU-India Hawala & Mule STR Gateway</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.fiu_sync_enabled}
                    onChange={(e) => setSettings({ ...settings, fiu_sync_enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <input
                type="text"
                value={settings.fiu_webhook_url}
                onChange={(e) => setSettings({ ...settings, fiu_webhook_url: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-[11px] font-mono"
              />
            </div>
          </div>
        </div>

        {/* 2. Analytical & Forensic Thresholds */}
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-xs font-bold text-white uppercase font-mono flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Telemetry & Algorithmic Sensitivity</span>
            </h2>
            <span className="text-[10px] font-mono text-purple-300">AUTO-TUNED</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* CDR Midnight Window */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-200">CDR Midnight Call Window</span>
                <span className="font-mono text-cyan-400 font-bold">{settings.cdr_midnight_start}:00 AM - {settings.cdr_midnight_end}:00 AM</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Flags nocturnal call bursts occurring during high-risk clandestine hours.
              </p>
            </div>

            {/* Mule Velocity Threshold */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-200">Mule Pass-Through Velocity Trigger</span>
                <span className="font-mono text-rose-400 font-bold">{settings.mule_pass_through_threshold}% Velocity</span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={settings.mule_pass_through_threshold}
                onChange={(e) => setSettings({ ...settings, mule_pass_through_threshold: Number(e.target.value) })}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Bank accounts transferring &gt; {settings.mule_pass_through_threshold}% funds within 24h are auto-flagged.
              </p>
            </div>

            {/* Legal Security & Redaction */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Auto-Redact Informant & Sensitive PII</div>
                <div className="text-[11px] text-slate-400">Hides officer names and confidential informants in court dossiers.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.auto_redact_pii}
                  onChange={(e) => setSettings({ ...settings, auto_redact_pii: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live BSA 2023 Tamper-Proof Audit Trail */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-white uppercase font-mono">
              Bharatiya Sakshya Adhiniyam (BSA) 2023 — Chain-of-Custody Audit Ledger
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
            <Lock className="w-3 h-3" />
            <span>SHA-256 Tamper-Proof Immutable Chain</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="pb-2">Audit ID</th>
                <th className="pb-2">Timestamp (UTC)</th>
                <th className="pb-2">Authorized Officer</th>
                <th className="pb-2">Investigative Action</th>
                <th className="pb-2">SHA-256 Evidence Hash</th>
                <th className="pb-2">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-2.5 text-cyan-400 font-bold">{log.id}</td>
                  <td className="py-2.5 text-slate-300">{log.timestamp}</td>
                  <td className="py-2.5 text-slate-200">{log.officer}</td>
                  <td className="py-2.5 text-slate-300">{log.action}</td>
                  <td className="py-2.5 text-slate-400 text-[10px] truncate max-w-[140px]" title={log.sha256}>
                    {log.sha256.substring(0, 16)}...
                  </td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
