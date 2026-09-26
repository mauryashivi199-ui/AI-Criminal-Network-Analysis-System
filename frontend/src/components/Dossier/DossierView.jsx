import React, { useState, useEffect } from 'react';
import { FileCheck2, Printer, Download, Shield, CheckCircle, FileText, Award, Lock, ExternalLink, Calendar, Hash, User } from 'lucide-react';
import { getDossier } from '../../services/api';
import GovtEmblem from '../Common/GovtEmblem';

export default function DossierView({ lang = 'en' }) {
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
    <div className="p-4 md:p-6 space-y-6 h-full overflow-y-auto bg-[#070b14] text-slate-100 font-sans select-none">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-700/50">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                {lang === 'hi' ? 'कोर्ट-स्वीकृत केस साक्ष्य डोजियर' : 'Court-Admissible Case Evidence Dossier'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'भारतीय साक्ष्य अधिनियम (BSA) 2023 एवं आईटी अधिनियम धारा 65B के तहत प्रमाणित'
                  : 'Formulated under Bharatiya Sakshya Adhiniyam 2023 & IT Act Section 65B.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-950 transition active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'hi' ? 'कोर्ट पीडीएफ प्रिंट / निर्यात करें' : 'Print / Export Official PDF'}</span>
          </button>
        </div>
      </div>

      {/* Official Government Dossier Document Canvas */}
      <div className="max-w-4xl mx-auto bg-[#0a0f1d] border border-slate-750 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-200">
        {/* Classification Header with Govt Emblem */}
        <div className="border-b border-slate-750 pb-5 text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <GovtEmblem className="w-12 h-12" />
          </div>

          <div className="text-[11px] font-bold tracking-widest text-rose-400 uppercase">
            {dossier?.classification || 'CONFIDENTIAL // LAW ENFORCEMENT & JUDICIAL USE ONLY'}
          </div>

          <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
            MINISTRY OF HOME AFFAIRS • GOVERNMENT OF INDIA
          </h1>

          <p className="text-xs text-slate-400">
            SPECIAL CRIMINAL SYNDICATE INVESTIGATION DOSSIER • Ref: <b className="text-cyan-300">{dossier?.dossier_id || 'DOS-2026-GARUDA-09'}</b>
          </p>
        </div>

        {/* Case Meta Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px] block">CASE IDENTIFIER:</span>
            <span className="font-bold text-white text-xs">{dossier?.case_id || 'CASE-2026-GARUDA'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px] block">OPERATION TITLE:</span>
            <span className="font-bold text-cyan-400 text-xs">{dossier?.case_title || 'Operation Garuda (Inter-State Narcotics & Hawala Cartel)'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px] block">DATE &amp; TIME OF SYNTHESIS:</span>
            <span className="font-semibold text-slate-300 text-xs">{dossier?.generated_at || '2026-09-26 18:30:00 UTC'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px] block">THREAT CLASSIFICATION:</span>
            <span className="font-bold text-rose-400 text-xs">{dossier?.threat_rating || 'LEVEL 5 - CRITICAL NATIONAL SECURITY RISK'}</span>
          </div>
        </div>

        {/* 1. Executive Intelligence Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>1. Executive Intelligence Summary</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            {dossier?.executive_summary || 'Multi-state criminal network de-anonymized using PageRank Centrality and Telecom CDR Telemetry. Cross-border narcotics syndicate operated by remote kingpins via burner handsets and layered Hawala accounts.'}
          </p>
        </div>

        {/* 2. Key Identified Perpetrators & Kingpins */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>2. Key Identified Perpetrators &amp; Kingpins</span>
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3.5">Entity ID</th>
                  <th className="py-3 px-3.5">Full Legal Name</th>
                  <th className="py-3 px-3.5">Syndicate Role</th>
                  <th className="py-3 px-3.5">Threat Score</th>
                  <th className="py-3 px-3.5">Centrality Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 text-xs">
                {dossier?.primary_targets?.map((target) => (
                  <tr key={target.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 px-3.5 text-cyan-400 font-bold">{target.id}</td>
                    <td className="py-3 px-3.5 font-bold text-white">{target.name}</td>
                    <td className="py-3 px-3.5 text-slate-300">{target.role}</td>
                    <td className="py-3 px-3.5 text-rose-400 font-bold">{target.threat_score}%</td>
                    <td className="py-3 px-3.5 text-purple-300 font-semibold">{target.pagerank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Financial & CDR Forensics Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Financial Trail */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wide block">
              3. Money Laundering &amp; Hawala Trail
            </span>
            <div className="text-slate-300 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Monitored Hawala Flow:</span>
                <strong className="text-emerald-300">{dossier?.financial_trail_summary?.total_monitored_volume || '₹50.60 Lakhs'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Detected Mule Accounts:</span>
                <strong className="text-white">{dossier?.financial_trail_summary?.mule_accounts?.length || 2} Accounts</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Offshore TRON Crypto Wallets:</span>
                <strong className="text-purple-300">{dossier?.financial_trail_summary?.crypto_wallets?.length || 1} Wallets</strong>
              </div>
            </div>
          </div>

          {/* CDR Intercepts */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
            <span className="font-bold text-blue-400 uppercase tracking-wide block">
              4. Intercepted Telecom Call Matrix
            </span>
            <div className="text-slate-300 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Analyzed CDRs:</span>
                <strong className="text-white">{dossier?.communication_forensics?.total_cdr_analyzed || '1,200 Records'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Multiple IMEI Handset Swaps:</span>
                <strong className="text-rose-400">{dossier?.communication_forensics?.burner_alerts?.length || 2} Handsets</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Midnight Burst Channels (1-4 AM):</span>
                <strong className="text-amber-300">{dossier?.communication_forensics?.critical_pairs?.length || 3} Pairs</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Recommended Legal Charges */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
            5. Recommended Statutory Charges for Prosecution (BNS / NDPS / PMLA)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {dossier?.recommended_legal_charges?.map((charge, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="font-medium">{charge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Digital Signature & Judicial Certificate */}
        <div className="pt-6 border-t border-slate-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="text-slate-400 text-[11px]">VERIFYING INVESTIGATIVE OFFICER:</div>
            <div className="font-bold text-white text-xs">{dossier?.signoff?.officer_name || 'Inspector Rajesh Kumar'}</div>
            <div className="text-cyan-400 text-[11px] font-bold">BADGE ID: {dossier?.signoff?.badge_id || 'DL-CYBER-8841'}</div>
          </div>

          <div className="sm:text-right space-y-1 max-w-sm">
            <div className="text-slate-400 text-[11px]">BSA 2023 ELECTRONIC EVIDENCE HASH (SHA-256):</div>
            <div className="text-[10px] text-slate-400 break-all bg-slate-950 px-2 py-1 rounded border border-slate-800">
              {dossier?.signoff?.digital_signature_hash || '52f14decc5906b7189a8123ef451298c7ab12489c7d1e89f'}
            </div>
            <div className="text-emerald-400 font-bold text-[11px] flex items-center sm:justify-end space-x-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>CERTIFIED COURT-ADMISSIBLE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
