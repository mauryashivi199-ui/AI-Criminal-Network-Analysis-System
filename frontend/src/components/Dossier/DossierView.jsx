import React, { useState, useEffect } from 'react';
import { FileCheck2, Printer, Download, Shield, CheckCircle, FileText, Award } from 'lucide-react';
import { getDossier } from '../../services/api';

export default function DossierView() {
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDossier() {
      try {
        const data = await getDossier();
        setDossier(data);
      } catch (err) {
        console.error('Error fetching dossier:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDossier();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto bg-[#070b14]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-black text-white uppercase tracking-wider font-mono">
              Court-Admissible Case Evidence Dossier
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Formulated under Bharatiya Sakshya Adhiniyam 2023 & Section 65B Electronic Record Admissibility.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-950 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export Court PDF</span>
        </button>
      </div>

      {/* Official Government Dossier Paper Canvas */}
      <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl p-8 space-y-6 shadow-2xl text-slate-200">
        {/* Classification Header */}
        <div className="border-b-2 border-slate-700 pb-4 text-center space-y-1">
          <div className="text-xs font-black font-mono tracking-widest text-rose-400 uppercase">
            {dossier?.classification || 'CONFIDENTIAL // LAW ENFORCEMENT ONLY'}
          </div>
          <h1 className="text-lg font-black text-white uppercase tracking-wide">
            MINISTRY OF HOME AFFAIRS • GOVERNMENT OF INDIA
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            SPECIAL CRIMINAL NETWORK INTELLIGENCE DOSSIER • {dossier?.dossier_id}
          </p>
        </div>

        {/* Case Meta Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 font-mono block">CASE IDENTIFIER:</span>
            <span className="font-bold text-white font-mono">{dossier?.case_id}</span>
          </div>
          <div>
            <span className="text-slate-500 font-mono block">OPERATION TITLE:</span>
            <span className="font-bold text-cyan-400">{dossier?.case_title}</span>
          </div>
          <div>
            <span className="text-slate-500 font-mono block">DATE & TIME OF SYNTHESIS:</span>
            <span className="text-slate-300 font-mono">{dossier?.generated_at}</span>
          </div>
          <div>
            <span className="text-slate-500 font-mono block">THREAT CLASSIFICATION:</span>
            <span className="font-bold text-rose-400 font-mono">{dossier?.threat_rating}</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>1. Executive Intelligence Summary</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
            {dossier?.executive_summary}
          </p>
        </div>

        {/* Primary Syndicate Targets Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>2. Key Identified Perpetrators & Kingpins</span>
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Entity ID</th>
                  <th className="py-2.5 px-3">Full Legal Name</th>
                  <th className="py-2.5 px-3">Syndicate Designation</th>
                  <th className="py-2.5 px-3">Threat Rating</th>
                  <th className="py-2.5 px-3">PageRank Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
                {dossier?.primary_targets?.map((target) => (
                  <tr key={target.id}>
                    <td className="py-2.5 px-3 text-cyan-400">{target.id}</td>
                    <td className="py-2.5 px-3 font-bold text-white">{target.name}</td>
                    <td className="py-2.5 px-3">{target.role}</td>
                    <td className="py-2.5 px-3 text-rose-400 font-bold">{target.threat_score}%</td>
                    <td className="py-2.5 px-3 text-purple-400">{target.pagerank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial & CDR Forensics Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Financial Trail */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 font-mono block">
              3. MONEY LAUNDERING TRAIL
            </span>
            <div className="text-slate-300 space-y-1">
              <div>Total Monitored Hawala Flow: <strong className="text-emerald-300">{dossier?.financial_trail_summary?.total_monitored_volume}</strong></div>
              <div>Detected Mule Layers: <strong className="text-white">{dossier?.financial_trail_summary?.mule_accounts?.length || 0} Accounts</strong></div>
              <div>Offshore USDT Crypto Wallets: <strong className="text-purple-300">{dossier?.financial_trail_summary?.crypto_wallets?.length || 0} Wallets</strong></div>
            </div>
          </div>

          {/* CDR Intercepts */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-blue-400 font-mono block">
              4. INTERCEPTED CALL MATRIX
            </span>
            <div className="text-slate-300 space-y-1">
              <div>Total Analyzed CDRs: <strong className="text-white">{dossier?.communication_forensics?.total_cdr_analyzed}</strong></div>
              <div>Multiple IMEI Swapping Alerts: <strong className="text-rose-400">{dossier?.communication_forensics?.burner_alerts?.length || 0} Devices</strong></div>
              <div>High Frequency Night Channels: <strong className="text-amber-300">{dossier?.communication_forensics?.critical_pairs?.length || 0} Pairs</strong></div>
            </div>
          </div>
        </div>

        {/* Recommended Legal Charges */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
            5. Recommended Legal Charges for Prosecution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {dossier?.recommended_legal_charges?.map((charge, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{charge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Signature & Judicial Attestation */}
        <div className="pt-6 border-t-2 border-slate-700 flex items-center justify-between text-xs">
          <div className="space-y-1">
            <div className="text-slate-400 font-mono text-[10px]">VERIFYING INVESTIGATIVE AUTHORITY:</div>
            <div className="font-bold text-white">{dossier?.signoff?.officer_name}</div>
            <div className="text-[10px] text-cyan-400 font-mono">BADGE: {dossier?.signoff?.badge_id}</div>
          </div>

          <div className="text-right space-y-1 max-w-xs">
            <div className="text-slate-400 font-mono text-[10px]">ELECTRONIC CHAIN-OF-CUSTODY HASH:</div>
            <div className="text-[9px] font-mono text-slate-500 break-all">{dossier?.signoff?.digital_signature_hash}</div>
            <div className="text-[10px] text-emerald-400 font-bold font-mono">✓ CERTIFIED COURT-ADMISSIBLE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
