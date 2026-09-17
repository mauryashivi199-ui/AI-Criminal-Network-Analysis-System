import React, { useState, useEffect } from 'react';
import { Crown, ShieldAlert, Award, TrendingUp, AlertOctagon, UserX, ExternalLink } from 'lucide-react';
import { getKingpins } from '../../services/api';

export default function KingpinRankings({ onSelectSuspect }) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const data = await getKingpins();
        setRankings(data.kingpin_rankings || []);
      } catch (err) {
        console.error('Error loading kingpins:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRankings();
  }, []);

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto bg-[#070b14]">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-black text-white uppercase tracking-wider font-mono">
              AI Kingpin & Syndicate Broker Radar
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Multi-metric algorithmic ranking combining NetworkX PageRank, Betweenness Centrality, and Lethality Threat Index.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300">
            CRITICAL TARGETS: {rankings.filter((r) => r.threat_score >= 85).length}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800 text-purple-300">
            BROKER HUBS: {rankings.filter((r) => r.betweenness > 0.1).length}
          </span>
        </div>
      </div>

      {/* Top 3 Kingpins Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rankings.slice(0, 3).map((target, idx) => (
          <div
            key={target.id}
            className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
              idx === 0
                ? 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border-rose-500/50 shadow-xl shadow-rose-950/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black font-mono ${
                  idx === 0 ? 'bg-amber-400 text-black' : idx === 1 ? 'bg-slate-300 text-black' : 'bg-amber-700 text-white'
                }`}>
                  #{idx + 1}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {target.id}
                </span>
              </div>
              <span className="text-xs font-black font-mono text-rose-400">
                THREAT: {target.threat_score}%
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-base font-bold text-white tracking-wide">{target.name}</h3>
              <p className="text-xs text-slate-400">{target.role}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
              <div>
                <div className="text-[9px] text-slate-500 font-mono">INFLUENCE</div>
                <div className="text-sm font-bold text-amber-400">{target.influence_score}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500 font-mono">PAGERANK</div>
                <div className="text-sm font-bold text-purple-400">{target.pagerank}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500 font-mono">BETWEENNESS</div>
                <div className="text-sm font-bold text-cyan-400">{target.betweenness}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Ranked Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Syndicate Target Hierarchy Matrix
          </h3>
          <span className="text-xs text-slate-500">Sorted by Centrality-Weighted Threat Index</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Entity ID</th>
                <th className="py-3 px-4">Name & Aliases</th>
                <th className="py-3 px-4">Syndicate Role</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Threat Rating</th>
                <th className="py-3 px-4">Betweenness Hub</th>
                <th className="py-3 px-4">Action Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {rankings.map((target, idx) => (
                <tr key={target.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-400">#{idx + 1}</td>
                  <td className="py-3 px-4 font-mono text-cyan-400">{target.id}</td>
                  <td className="py-3 px-4 font-bold text-white">{target.name}</td>
                  <td className="py-3 px-4 text-slate-300">{target.role}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                      {target.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      target.threat_score >= 85
                        ? 'bg-rose-950 text-rose-400 border border-rose-800'
                        : target.threat_score >= 70
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {target.threat_score}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{target.betweenness}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-medium text-amber-300 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded">
                      {target.threat_score >= 85 ? 'LOC Pending' : 'Surveillance Active'}
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
