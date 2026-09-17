import React, { useState } from 'react';
import { Bot, Send, Sparkles, ShieldCheck, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react';
import { queryCopilot } from '../../services/api';

export default function CopilotDrawer({ onHighlightNodes }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '🛡️ **KavachNet-AI Forensic Copilot Initialized.**\n\nI am connected to the live Criminal Knowledge Graph, CDR logs, and Hawala Transaction stream. How can I assist your investigation today?',
      actions: [
        'Identify syndicate kingpin & underbosses',
        'Find money mule pass-through accounts',
        'Analyze burner phone midnight call spikes',
        'Predict unobserved covert relationships',
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'Who is the top kingpin in this syndicate?',
    'Show connection between Iqbal Ansari and TRON Wallet',
    'List all flagged money mule bank accounts',
    'What are the predicted covert links between suspects?',
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInputQuery('');
    setLoading(true);

    try {
      const res = await queryCopilot(query);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          actions: res.suggested_actions || [],
        },
      ]);

      if (res.highlighted_nodes && res.highlighted_nodes.length > 0 && onHighlightNodes) {
        onHighlightNodes(res.highlighted_nodes);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: '⚠️ Unable to complete graph inference. Ensure the backend engine is active.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col justify-between bg-[#070b14] overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-700/50">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              AI Forensic Investigation Copilot
            </h2>
            <p className="text-xs text-slate-400">RAG & Knowledge Graph Multi-Hop Reasoning Engine</p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>GRAPH-RAG 2.0</span>
        </span>
      </div>

      {/* Message History */}
      <div className="flex-1 my-4 overflow-y-auto space-y-4 pr-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none shadow-lg'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-xl'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              {/* Action Recommendations */}
              {m.actions && m.actions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-purple-400 font-bold block">
                    RECOMMENDED POLICE TACTICAL ACTIONS:
                  </span>
                  {m.actions.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      onClick={() => handleSend(act)}
                      className="flex items-center space-x-1.5 text-[11px] text-cyan-300 hover:text-cyan-200 cursor-pointer bg-slate-950/80 p-1.5 rounded border border-slate-800/60 transition"
                    >
                      <ArrowRight className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-purple-400 font-mono p-3 bg-slate-900 rounded-xl max-w-xs border border-slate-800 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing graph topology & CDR records...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="py-2 flex flex-wrap gap-2">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          placeholder="Ask anything (e.g., 'Who is the broker between Suspect Vikram and Account 991048?')..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans shadow-lg"
        />
        <button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="absolute right-2 p-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition shadow"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
