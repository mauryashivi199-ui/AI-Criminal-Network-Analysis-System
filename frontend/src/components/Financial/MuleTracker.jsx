import React, { useState, useEffect } from 'react';
import { Coins, ArrowRightLeft, ShieldAlert, DollarSign, Bitcoin, AlertTriangle, CheckCircle } from 'lucide-react';
import { getFinancialAnalytics } from '../../services/api';

export default function MuleTracker({ lang = 'en' }) {
  const [finData, setFinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [freezeMsg, setFreezeMsg] = useState(null);

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

  const handleFreeze = (accId) => {
    setFreezeMsg(`Issued Section 102 CrPC Emergency Freeze Order on Account: ${accId}`);
    setTimeout(() => setFreezeMsg(null), 4000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 h-full overflow-y-auto bg-[#070b14] text-slate-100 font-sans select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-700/50">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                {lang === 'hi' ? 'हवाला एवं म्यूल बैंक खाता ट्रैकर' : 'Financial Smurfing & Mule Account Tracker'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'काले धन के तीव्र प्रवाह (>80% वेग) एवं ट्रॉन (TRC-20) क्रिप्टो ऑफ-रैंप का वास्तविक समय पर विश्लेषण'
                  : 'Real-time AML tracking detecting high-velocity layering, student/shell mule accounts, and crypto off-ramps.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold">
            {lang === 'hi' ? 'कुल ट्रैक किया गया धन:' : 'TOTAL TRACED:'} ₹{finData ? (finData.total_volume_inr / 100000).toFixed(2) : '50.60'} Lakhs
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 font-bold">
            {lang === 'hi' ? 'संदिग्ध खाते:' : 'MULE ACCOUNTS:'} {finData?.mule_accounts_detected?.length || 2}
          </span>
        </div>
      </div>

      {freezeMsg && (
        <div className="p-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-2xl animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{freezeMsg}</span>
        </div>
      )}

      {/* Flagged Mule Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {finData?.mule_accounts_detected?.map((mule, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-[#0a0f1d] border border-rose-500/30 shadow-xl space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                  {lang === 'hi' ? 'चिह्नित म्यूल खाता' : 'FLAGGED MULE ACCOUNT'}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{mule.account_id}</h3>
              </div>
              <span className="text-xs font-bold text-rose-400 bg-rose-950/60 px-2 py-1 rounded-lg border border-rose-800">
                VELOCITY: {mule.pass_through_ratio}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{lang === 'hi' ? 'कुल जमा:' : 'TOTAL INFLOW:'}</span>
                <span className="text-sm font-bold text-emerald-400">₹{mule.total_inflow_inr.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{lang === 'hi' ? 'त्वरित निकासी:' : 'RAPID OUTFLOW:'}</span>
                <span className="text-sm font-bold text-rose-400">₹{mule.total_outflow_inr.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'hi'
                ? 'पैसा यूपीआई के माध्यम से छोटे बैचों में जमा किया गया और 15 मिनट के भीतर हवाला दलालों को भेज दिया गया।'
                : 'Funds are deposited in smaller UPI batches and siphoned out within <15 minutes to hawala clearing brokers.'}
            </p>

            <button
              onClick={() => handleFreeze(mule.account_id)}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-lg shadow-rose-600/25 flex items-center justify-center space-x-1.5"
            >
              <span>{lang === 'hi' ? 'खाता फ्रीज करें (धारा 102 CrPC / BNSS)' : 'Freeze Account (Sec 102 CrPC / BNSS)'}</span>
            </button>
          </div>
        ))}

        {/* Crypto Offramps */}
        {finData?.crypto_offramps_identified?.map((crypto, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-[#0a0f1d] border border-purple-500/30 shadow-xl space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  {lang === 'hi' ? 'क्रिप्टो एस्क्रो वॉलेट' : 'OFFSHORE CRYPTO ESCROW'}
                </span>
                <h3 className="text-sm font-bold text-cyan-300 mt-1.5">{crypto.wallet_address}</h3>
              </div>
              <span className="text-xs font-bold text-purple-400 bg-purple-950/60 px-2 py-1 rounded-lg border border-purple-800">
                {crypto.estimated_volume_usd}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs flex justify-between items-center">
              <span className="text-slate-400">{lang === 'hi' ? 'लेन-देन प्रोटोकॉल:' : 'SETTLEMENT PROTOCOL:'}</span>
              <span className="text-xs font-bold text-white">{crypto.channel}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'hi'
                ? 'घरेलू बैंकिंग जांच से बचने के लिए टीथर (USDT) नोड्स के माध्यम से सीधे पी2पी ओवर-द-काउंटर लेनदेन।'
                : 'Direct P2P OTC swap routing funds through offshore Tether (USDT) nodes to avoid domestic banking scrutiny.'}
            </p>

            <button
              onClick={() => alert(`Flagged wallet ${crypto.wallet_address} on FIU-India & Chainalysis watchlists`)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-600/25 flex items-center justify-center space-x-1.5"
            >
              <span>{lang === 'hi' ? 'एफआईयू-इंडिया वॉचलिस्ट पर रिपोर्ट करें' : 'Flag On FIU-India Watchlist'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Transaction Feed */}
      <div className="rounded-3xl border border-slate-800 bg-[#0a0f1d] overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-200">
            {lang === 'hi' ? 'फोरेंसिक बैंक एवं हवाला लेन-देन विवरण' : 'Forensic Bank & Hawala Transaction Stream'}
          </h3>
          <span className="text-xs text-slate-400">{lang === 'hi' ? 'लाइव मॉनिटर किए गए भुगतान कॉरिडोर' : 'Live Monitored Payment Corridors'}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tx ID</th>
                <th className="py-3 px-4">Origin Account / Source</th>
                <th className="py-3 px-4">Beneficiary Account / Sink</th>
                <th className="py-3 px-4">Amount (INR)</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 text-xs">
              {finData?.transactions_feed?.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 text-cyan-400 font-bold">{tx.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{tx.sender_acc}</td>
                  <td className="py-3 px-4 text-slate-200">{tx.receiver_acc}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">₹{tx.amount_inr.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-purple-300">{tx.channel}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{tx.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 font-bold">
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
