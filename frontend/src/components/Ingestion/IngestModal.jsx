import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { ingestFIR } from '../../services/api';

const SAMPLE_FIRS = [
  {
    title: 'NDPS Drug Shipment & Hawala Courier FIR',
    police_station: 'Crime Branch Special Cell, Delhi',
    fir_number: 'FIR-2026-DEL-8902',
    date: '2026-09-15',
    sections: ['NDPS Act Sec 21/29', 'BNS Sec 111 (Organized Crime)', 'IPC 120B'],
    text: `During active electronic surveillance, Special Cell intercepted a suspicious Scorpio vehicle bearing registration DL-1CA-8899 near Kashmere Gate. The driver was nabbed and identified as accused Tariq Sheikh alias 'Speedy'. On interrogation, he disclosed that he is working under instructions from Vikram Rana (Falcon) and Iqbal Ansari. He was found in possession of burner mobile +91-98110-44921 and +91-98220-77102. Financial proceeds of the shipment were deposited into HDFC Account 991048 operated by Rashid Qureshi.`,
  },
  {
    title: 'AI Deepfake Extortion & Mule Network FIR',
    police_station: 'State Cyber Crime Police Station, Jaipur',
    fir_number: 'FIR-2026-CYBER-401',
    date: '2026-09-16',
    sections: ['IT Act Sec 66D/66E', 'BNS Sec 318(4) Cheating', 'BNS Sec 308 Extortion'],
    text: `Complainant reported receiving spoofed video calls demanding ransom of ₹15 Lakhs. Accused Wasim Akram alias Hacker-W and Deepak Mandal operating from SIM box terminal dispatched funds to SBI Mule Pool Account 4412. The funds were subsequently transferred to USDT Crypto wallet 0x89fb2a via OTC trader Manish Shah. Intercepted contact number: +91-97210-99812.`,
  },
];

export default function IngestModal({ isOpen, onClose, onIngestSuccess }) {
  const [activeTab, setActiveTab] = useState('text');
  const [firNumber, setFirNumber] = useState('FIR-2026-MHA-901');
  const [policeStation, setPoliceStation] = useState('Central Investigation Cell, MHA');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleLoadSample = (sample) => {
    setFirNumber(sample.fir_number);
    setPoliceStation(sample.police_station);
    setRawText(sample.text);
  };

  const handleIngest = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await ingestFIR({
        fir_number: firNumber,
        police_station: policeStation,
        state: 'Delhi NCR',
        date: new Date().toISOString().split('T')[0],
        sections: ['BNS 111', 'IPC 120B'],
        raw_text: rawText,
      });
      setResult(res.extracted_data);
      if (onIngestSuccess) onIngestSuccess();
    } catch (err) {
      console.error('Ingest error:', err);
      alert('Error extracting FIR entities. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              Multi-Source Police FIR & CDR Ingestion Pipeline
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Sample Selectors */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-2">
              QUICK LOAD REALISTIC LAW ENFORCEMENT FIR CASE:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SAMPLE_FIRS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadSample(s)}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-left transition text-xs space-y-1"
                >
                  <div className="font-bold text-cyan-300 truncate">{s.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{s.fir_number}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">FIR / DIARY NUMBER</label>
              <input
                type="text"
                value={firNumber}
                onChange={(e) => setFirNumber(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">POLICE STATION / AGENCY</label>
              <input
                type="text"
                value={policeStation}
                onChange={(e) => setPoliceStation(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">
              RAW POLICE CASE REPORT / INTERROGATION TEXT (NER EXTRACTOR)
            </label>
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste FIR narrative, interrogation transcripts, or seized CDR dumps here..."
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-sans focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Result Preview */}
          {result && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 animate-in fade-in">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI NLP Extraction Complete & Graph Updated!</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div><strong>Extracted Suspects:</strong> {result.extracted_suspects?.join(', ') || 'None'}</div>
                <div><strong>Extracted Phones:</strong> {result.extracted_phones?.join(', ') || 'None'}</div>
                <div><strong>Extracted Vehicles:</strong> {result.extracted_vehicles?.join(', ') || 'None'}</div>
                <div><strong>Legal Sections:</strong> {result.extracted_sections?.join(', ') || 'BNS 111'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white px-3 py-1.5">
            Cancel
          </button>
          <button
            onClick={handleIngest}
            disabled={loading || !rawText.trim()}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 text-white text-xs font-semibold shadow-lg shadow-cyan-950 transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Extract Entities & Synthesize Graph</span>
          </button>
        </div>
      </div>
    </div>
  );
}
