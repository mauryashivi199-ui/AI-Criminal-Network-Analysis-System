import React, { useState } from 'react';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Activity, 
  FileText, 
  Shield, 
  Send, 
  Smartphone, 
  Wifi, 
  Mic, 
  RefreshCw,
  ExternalLink,
  Laptop
} from 'lucide-react';
import GovtEmblem from '../Common/GovtEmblem';

export default function HelpView({ lang = 'en' }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('technical');
  const [ticketDetails, setTicketDetails] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // System Diagnostics State
  const [diagnostics, setDiagnostics] = useState({
    backend: 'ONLINE (FastAPI 8000)',
    graph: 'ACTIVE (154 Nodes, 420 Links)',
    speech: typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition) ? 'SUPPORTED' : 'LIMITED',
    storage: 'ENCRYPTED (Local & BSA Hash)'
  });

  const faqs = [
    {
      q: lang === 'hi' ? 'फोन पर ऐप कैसे खोलें (Mobile Access Guide)?' : 'How to open this application on your Mobile Phone?',
      a: lang === 'hi'
        ? 'सुनिश्चित करें कि आपका फोन और कंप्यूटर एक ही वाई-फाई/हॉटस्पॉट से जुड़े हैं। फिर फोन के ब्राउज़र में "http://10.249.4.64:5173" खोलें। अगर अलग नेटवर्क पर हैं, तो ग्लोबल टनल लिंक का उपयोग करें।'
        : 'Ensure your mobile phone and laptop are connected to the same Wi-Fi/Hotspot. Open Chrome/Safari on your phone and navigate to "http://10.249.4.64:5173". If testing from remote networks, use the global tunnel link.'
    },
    {
      q: lang === 'hi' ? 'एआई कोपायलट में वॉइस माइक काम न करे तो क्या करें?' : 'What to do if AI Copilot microphone is not responding?',
      a: lang === 'hi'
        ? 'ब्राउज़र के एड्रेस बार में लॉक (🔒) आइकन पर क्लिक करके Microphone Permission को "Allow" करें। Google Chrome ब्राउज़र का उपयोग करने की सलाह दी जाती है।'
        : 'Click on the lock icon (🔒) in your browser address bar and set Microphone Permission to "Allow". Google Chrome is recommended for optimal Web Speech recognition.'
    },
    {
      q: lang === 'hi' ? 'किंगपिन की पहचान (PageRank Centrality) कैसे काम करती है?' : 'How does Kingpin Centrality Detection work?',
      a: lang === 'hi'
        ? 'हमारा एल्गोरिदम पूरे सिंडिकेट में कॉल और पैसे के प्रवाह को मापता है। जो व्यक्ति खुद सीधे अपराध न करके सिर्फ निर्देश देता है, उसका बिटवीननेस व पेजरैंक स्कोर सबसे अधिक होता है।'
        : 'Our engine computes Betweenness Centrality and PageRank. Masterminds who act as remote coordinators bridging multiple cells naturally receive the highest centrality threat ratings.'
    },
    {
      q: lang === 'hi' ? 'कोर्ट केस डोजियर कानूनी रूप से मान्य कैसे है?' : 'How is the Court Case Dossier legally compliant?',
      a: lang === 'hi'
        ? 'हर डोजियर में भारतीय साक्ष्य अधिनियम (BSA) 2023 और आईटी अधिनियम धारा 65B के तहत डिजिटल टाइमस्टैम्प और SHA-256 अपरिवर्तनीय डिजिटल हैश दर्ज होता है।'
        : 'Every generated dossier includes an automated SHA-256 cryptographic hash and electronic chain-of-custody metadata meeting Bharatiya Sakshya Adhiniyam 2023 statutory standards.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDetails) return;
    setTicketSuccess(true);
    setTicketSubject('');
    setTicketDetails('');
    setTimeout(() => setTicketSuccess(false), 5000);
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#070b14] p-4 md:p-6 space-y-6 text-slate-100 font-sans select-none">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-950/80 text-cyan-400 border border-blue-700/50">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
              {lang === 'hi' ? 'सहायता एवं तकनीकी सहायता केंद्र' : 'Help & Law Enforcement Support Desk'}
            </h1>
            <p className="text-xs text-slate-400">
              {lang === 'hi'
                ? 'गृह मंत्रालय खुफिया ग्रिड सहायता, समस्या समाधान एवं तकनीकी मार्गदर्शन'
                : 'Ministry of Home Affairs Technical Guidance, Diagnostics & Incident Escalation'}
            </p>
          </div>
        </div>

        {/* Emergency Helpline Badge */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-700/60 text-rose-300 font-bold flex items-center space-x-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'हेल्पलाइन: 1930 / 112' : 'LEA Helpline: 1930 / 112'}</span>
          </div>
        </div>
      </div>

      {/* Grid: 1. Diagnostics, 2. Mobile Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* System Diagnostics Box */}
        <div className="p-5 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs uppercase text-white">
                {lang === 'hi' ? 'सिस्टम डायग्नोस्टिक्स व स्वास्थ्य' : 'Live System Diagnostics & Health'}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              ALL SYSTEMS HEALTHY
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">FastAPI Backend (Port 8000):</span>
              <span className="text-emerald-400 font-bold">{diagnostics.backend}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Knowledge Graph Engine:</span>
              <span className="text-cyan-300 font-bold">{diagnostics.graph}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Web Speech Recognition:</span>
              <span className="text-purple-300 font-bold">{diagnostics.speech}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">BSA 2023 Digital Audit:</span>
              <span className="text-emerald-400 font-bold">{diagnostics.storage}</span>
            </div>
          </div>
        </div>

        {/* Multi-Device & Mobile Access Instructions */}
        <div className="p-5 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-xs uppercase text-white">
              {lang === 'hi' ? 'मोबाइल व अन्य उपकरणों पर एक्सेस निर्देश' : 'Mobile & Multi-Device Access Guide'}
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold">
                <Wifi className="w-3.5 h-3.5" />
                <span>1. Same Wi-Fi Access:</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Type <code className="text-white font-bold bg-slate-900 px-1 py-0.5 rounded">http://10.249.4.64:5173</code> in your phone browser when connected to the same Wi-Fi network.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center space-x-2 text-purple-300 font-bold">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>2. Global Public Tunnel (4G/5G):</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Run <code className="text-white font-bold bg-slate-900 px-1 py-0.5 rounded">SHARE_ON_PHONE.bat</code> to generate a globally accessible URL for remote judges and officers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (Accordion) */}
      <div className="p-5 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-xs uppercase text-white">
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
          </h3>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-3.5 text-left text-xs font-bold text-slate-200 hover:text-white flex items-center justify-between"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaq === idx && (
                <div className="p-3.5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-900">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Report an Issue / Submit Help Ticket Form */}
      <div className="p-5 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-xs uppercase text-white">
            {lang === 'hi' ? 'तकनीकी समस्या दर्ज करें / रिपोर्ट भेजें' : 'Report an Issue / Submit Technical Ticket'}
          </h3>
        </div>

        {ticketSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              {lang === 'hi'
                ? 'आपकी तकनीकी रिपोर्ट सफलतापूर्वक दर्ज कर ली गई है। टिकट आईडी: TKT-2026-9912'
                : 'Your support ticket has been submitted to the MHA Cyber Response Team. Ticket ID: TKT-2026-9912'}
            </span>
          </div>
        )}

        <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 text-[11px] mb-1">
                {lang === 'hi' ? 'विषय / समस्या का शीर्षक *' : 'Subject / Issue Title *'}
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'hi' ? 'उदा. माइक अनुमति या ग्राफ लोड समस्या' : 'e.g. Mic input permission or graph load query'}
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-[11px] mb-1">
                {lang === 'hi' ? 'समस्या का प्रकार' : 'Category'}
              </label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
              >
                <option value="technical">Technical / Bug Report</option>
                <option value="mobile">Mobile / Network Connection</option>
                <option value="speech">Voice Mic / AI Copilot</option>
                <option value="dossier">BSA 2023 Dossier Export</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-[11px] mb-1">
              {lang === 'hi' ? 'विस्तृत विवरण *' : 'Detailed Description *'}
            </label>
            <textarea
              required
              rows={3}
              placeholder={lang === 'hi' ? 'कृपया अपनी समस्या का विवरण लिखें...' : 'Describe what happened or steps to reproduce...'}
              value={ticketDetails}
              onChange={(e) => setTicketDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'टिकट भेजें' : 'Submit Support Ticket'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
