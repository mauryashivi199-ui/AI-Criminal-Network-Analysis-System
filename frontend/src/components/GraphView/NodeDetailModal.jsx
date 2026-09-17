import React from 'react';
import { X, ShieldAlert, Phone, CreditCard, Car, MapPin, Activity, Award, UserCheck, AlertTriangle } from 'lucide-react';

export default function NodeDetailModal({ node, onClose }) {
  if (!node) return null;

  const getThreatBadge = (score) => {
    if (score >= 85) return 'bg-rose-950/80 text-rose-400 border-rose-800';
    if (score >= 70) return 'bg-amber-950/80 text-amber-400 border-amber-800';
    return 'bg-emerald-950/80 text-emerald-400 border-emerald-800';
  };

  return (
    <div className="fixed inset-x-2 bottom-2 md:inset-x-auto md:right-4 md:top-20 md:bottom-auto w-auto md:w-96 max-h-[80vh] md:max-h-[85vh] bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl z-30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom md:slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-start justify-between">
        <div className="space-y-0.5 truncate">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700">
              {node.id}
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${getThreatBadge(node.threat_score || 50)}`}>
              THREAT: {node.threat_score || 50}%
            </span>
          </div>
          <h3 className="text-sm md:text-base font-bold text-white tracking-wide truncate">{node.name}</h3>
          <p className="text-[11px] md:text-xs text-cyan-400 font-medium truncate">{node.role || 'Associate'}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5 space-y-3 overflow-y-auto">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-[9px] text-slate-500 font-mono">DEGREE</div>
            <div className="text-xs md:text-sm font-bold text-slate-200">{node.degree || '—'}</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-[9px] text-slate-500 font-mono">BETWEENNESS</div>
            <div className="text-xs md:text-sm font-bold text-amber-400">{node.betweenness || '0.0'}</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-[9px] text-slate-500 font-mono">PAGERANK</div>
            <div className="text-xs md:text-sm font-bold text-purple-400">{node.pagerank || '0.0'}</div>
          </div>
        </div>

        {/* Metadata */}
        {node.metadata && (
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-mono text-slate-400 block">DOSSIER DETAILS:</span>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-[11px]">
              {Object.entries(node.metadata).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-800/40 pb-0.5 last:border-none">
                  <span className="text-slate-400 capitalize">{k.replace('_', ' ')}:</span>
                  <span className="text-slate-200 font-medium truncate max-w-[150px]">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300"
        >
          Close
        </button>
        <button
          onClick={() => alert(`Subpoena Issued for ${node.name}`)}
          className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold"
        >
          Issue Intercept Order
        </button>
      </div>
    </div>
  );
}
