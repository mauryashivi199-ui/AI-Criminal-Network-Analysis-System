import React, { useState, useEffect } from 'react';
import { PhoneCall, Radio, AlertOctagon, Clock, ShieldAlert, Zap } from 'lucide-react';
import { getCDRAnalytics } from '../../services/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function CDRMatrix() {
  const [cdrData, setCdrData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCDR() {
      try {
        const data = await getCDRAnalytics();
        setCdrData(data);
      } catch (err) {
        console.error('Error fetching CDR:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCDR();
  }, []);

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto bg-[#070b14]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-black text-white uppercase tracking-wider font-mono">
              CDR & Intercept Telemetry Analysis
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Automated detection of burner phone meshes, nocturnal communication bursts (1 AM - 5 AM), and IMEI switching.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800 text-blue-300">
            TOTAL CDRs: {cdrData?.total_records_analyzed || 0}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300">
            BURNER ALERTS: {cdrData?.burner_phone_alerts?.length || 0}
          </span>
        </div>
      </div>

      {/* Burner Phone Alert Banners */}
      {cdrData?.burner_phone_alerts?.map((alert, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl bg-gradient-to-r from-rose-950/50 via-slate-900 to-slate-900 border border-rose-500/40 flex items-center justify-between shadow-lg shadow-rose-950/20"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-rose-900/40 text-rose-400 border border-rose-700/50">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-rose-300 font-mono uppercase">
                  CRITICAL: MULTIPLE HANDSETS / SINGLE SIM DETECTED
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  {alert.phone_number}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Observed swapping between {alert.imei_count} distinct IMEI devices: {alert.detected_imeis.join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => alert(`Initiated Tower Dump Subpoena for ${alert.phone_number}`)}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-900/30 transition"
          >
            Subpoena Tower Dump
          </button>
        </div>
      ))}

      {/* 24-Hour Call Distribution Bar Chart */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              24-Hour Nocturnal Call Frequency Distribution
            </h3>
          </div>
          <span className="text-[11px] text-amber-400 font-mono">
            ⚠️ Peak syndicate activity concentrated 01:00 - 04:00 AM
          </span>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cdrData?.hourly_distribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={10} fontStyle="monospace" />
              <YAxis stroke="#64748b" fontSize={10} fontStyle="monospace" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                itemStyle={{ color: '#00f0ff' }}
              />
              <Bar dataKey="calls" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* High-Frequency Calling Pairs Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Top Intercepted Communication Corridors
          </h3>
          <span className="text-xs text-slate-500">Sorted by Call Frequency & Night Spikes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Caller (Origin)</th>
                <th className="py-3 px-4">Receiver (Target)</th>
                <th className="py-3 px-4">Call Frequency</th>
                <th className="py-3 px-4">Total Duration</th>
                <th className="py-3 px-4">Night Bursts (00-05h)</th>
                <th className="py-3 px-4">Threat Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
              {cdrData?.top_calling_pairs?.map((pair, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 text-cyan-300">{pair.party_a}</td>
                  <td className="py-3 px-4 text-cyan-300">{pair.party_b}</td>
                  <td className="py-3 px-4 font-bold text-white">{pair.total_calls} calls</td>
                  <td className="py-3 px-4 text-slate-400">{pair.total_duration_minutes} mins</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">{pair.night_calls_count} calls</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      {pair.suspicion_index}
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
