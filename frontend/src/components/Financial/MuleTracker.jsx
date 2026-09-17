import React, { useState, useEffect } from 'react';
import { Coins, ArrowRightLeft, ShieldAlert, DollarSign, Bitcoin, AlertTriangle } from 'lucide-react';
import { getFinancialAnalytics } from '../../services/api';

export default function MuleTracker() {
  const [finData, setFinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFin() {
      try {
        const data = await getFinancialAnalytics();
        setFinData(data);
      } catch (err) {
        console.error('Error fetching financial intelligence:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFin();
  }, []);

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto bg-[#070b14]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Coins className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-black text-white uppercase tracking-wider font-mono">
              Financial Smurfing & Mule Account Tracker
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time AML graph tracking detecting high-velocity layering, student/shell mule accounts, and crypto off-ramps.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300">
            TOTAL TRACED: ₹{finData ? (finData.total_volume_inr / 100000).toFixed(2) : 0} LAKHS
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300">
            MULE ACCOUNTS: {finData?.mule_accounts_detected?.length || 0}
          </span>
        </div>
      </div>

      {/* Flagged Mule Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {finData?.mule_accounts_detected?.map((mule, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border border-rose-500/30 shadow-lg space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  FLAGGED MULE ACCOUNT
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{mule.account_id}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400">
                VELOCITY: {mule.pass_through_ratio}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-500 block font-mono">TOTAL INFLOW:</span>
                <span className="text-sm font-bold text-emerald-400">₹{mule.total_inflow_inr.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-500 block font-mono">RAPID OUTFLOW:</span>
                <span className="text-sm font-bold text-rose-400">₹{mule.total_outflow_inr.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              Funds are deposited in smaller UPI batches and siphoned out within &lt;15 minutes to hawala clearing brokers.
            </p>

            <button
              onClick={() => alert(`Issued Section 102 CrPC Account Freeze Order for ${mule.account_id}`)}
              className="w-full py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold transition shadow"
            >
              Freeze Account (Sec 102 CrPC)
            </button>
          </div>
        ))}

        {/* Crypto Offramps */}
        {finData?.crypto_offramps_identified?.map((crypto, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 border border-purple-500/30 shadow-lg space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                  OFFSHORE CRYPTO ESCROW
                </span>
                <h3 className="text-base font-bold text-white mt-1.5 font-mono">{crypto.wallet_address}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400">
                {crypto.estimated_volume_usd}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-500 block font-mono">SETTLEMENT PROTOCOL:</span>
              <span className="text-sm font-bold text-cyan-300">{crypto.channel}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              Direct P2P OTC swap routing funds through offshore Tether (USDT) nodes to avoid domestic banking scrutiny.
            </p>

            <button
              onClick={() => alert(`Flagged wallet ${crypto.wallet_address} on FIU-India & Chainalysis watchlists`)}
              className="w-full py-1.5 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition shadow"
            >
              Flag On FIU-India Watchlist
            </button>
          </div>
        ))}
      </div>

      {/* Transaction Feed */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Forensic Bank & Hawala Transaction Stream
          </h3>
          <span className="text-xs text-slate-500">Live Monitored Payment Corridors</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tx ID</th>
                <th className="py-3 px-4">Origin Account / Source</th>
                <th className="py-3 px-4">Beneficiary Account / Sink</th>
                <th className="py-3 px-4">Amount (INR)</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
              {finData?.transactions_feed?.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 text-cyan-400">{tx.id}</td>
                  <td className="py-3 px-4 text-slate-200">{tx.sender_acc}</td>
                  <td className="py-3 px-4 text-slate-200">{tx.receiver_acc}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">₹{tx.amount_inr.toLocaleString()}</td>
                  <td className="py-3 px-4 text-purple-300">{tx.channel}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{tx.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-semibold">
                      SUSPICIOUS
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
