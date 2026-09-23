import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  Mic, 
  MicOff, 
  Loader2, 
  ArrowRight, 
  Volume2, 
  VolumeX,
  MessageSquare,
  ShieldAlert,
  Trash2
} from 'lucide-react';
import { queryCopilot } from '../../services/api';

export default function FloatingCopilot({ onHighlightNodes, onOpenFullScreen, lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: lang === 'hi'
        ? 'नमस्ते अधिकारी महोदय! मैं आपका **एआई फोरेंसिक अनुसंधान सहायक** हूँ। आप मुझसे किसी भी संदिग्ध, किंगपिन, देर रात की कॉल्स या बैंक खातों के बारे में पूछ सकते हैं।'
        : 'Namaste Officer! I am your **AI Forensic Investigation Copilot**. Ask me to pinpoint kingpins, trace nocturnal CDR calls, or inspect bank accounts.',
      actions: [
        'Who is the top kingpin in this syndicate?',
        'Tell me about Iqbal Ansari',
        'Show money mule bank accounts'
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Web Speech Recognition Initialization (Fully Cross-Platform & Mobile Friendly)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setInputQuery(transcript);
        };
        recognition.onerror = (e) => {
          console.warn('Speech error:', e.error);
          setIsRecording(false);
        };
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
      }
    }
  }, [lang]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition not supported in this browser. Please use Google Chrome.');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Text to Speech Voice Feedback
  const speakText = (text) => {
    if (!isSpeechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    // Clean markdown stars
    const cleanText = text.replace(/[*#`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 200));
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    if (!textToSend) setInputQuery('');
    setLoading(true);

    try {
      const res = await queryCopilot(q);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          actions: res.suggested_actions || []
        }
      ]);

      if (res.highlighted_nodes && res.highlighted_nodes.length > 0 && onHighlightNodes) {
        onHighlightNodes(res.highlighted_nodes);
      }

      speakText(res.answer);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: '⚠️ Unable to connect to Graph Reasoning Engine. Ensure the backend server is active.',
          actions: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. Floating Action Bubble (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-purple-500/40 border border-purple-400/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group active:scale-95"
          title="Open AI Forensic Copilot"
        >
          <Bot className="w-6 h-6 text-white animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-slate-900"></span>
          </span>
        </button>
      )}

      {/* 2. Floating AI Chat Widget Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[400px] md:w-[420px] h-[520px] max-h-[85vh] bg-[#0b1224] border border-slate-700/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-[#0d162a] to-slate-900 border-b border-slate-800 p-3 sm:p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-md border border-purple-400/40 flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-white font-sans flex items-center space-x-1.5">
                  <span>AI Forensic Assistant</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    RAG 2.0
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400 truncate">Live Criminal Knowledge Graph</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* Voice Read Aloud Toggle */}
              <button
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                className={`p-1.5 rounded-lg transition ${
                  isSpeechEnabled ? 'text-cyan-400 bg-cyan-950/60' : 'text-slate-400 hover:text-slate-200'
                }`}
                title={isSpeechEnabled ? "Voice Output ON" : "Voice Output OFF"}
              >
                {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Full Screen Expand */}
              {onOpenFullScreen && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullScreen();
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  title="Expand to Full Screen View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}

              {/* Minimize / Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title="Minimize"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs bg-[#070b14]/90">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[88%] p-3 rounded-2xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md font-medium'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>

                  {/* Action Chips */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-purple-400 font-mono font-bold block">
                        {lang === 'hi' ? 'सुझावित प्रश्न:' : 'INVESTIGATION FOLLOW-UPS:'}
                      </span>
                      {m.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleSend(act)}
                          className="block text-left w-full text-[11px] text-cyan-300 hover:text-cyan-200 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition truncate"
                        >
                          ➔ {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-purple-400 font-mono p-2.5 bg-slate-900 rounded-xl max-w-xs border border-slate-800 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
                <span>Forensic graph traversal in progress...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Form */}
          <div className="p-2.5 bg-[#0a0f1d] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-1.5"
            >
              <input
                type="text"
                placeholder={isRecording ? "Listening to your voice..." : "Ask copilot anything..."}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className={`flex-1 bg-slate-900 border rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 ${
                  isRecording ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-950/20' : 'border-slate-800'
                }`}
              />

              {/* Mic Button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2 rounded-xl border transition flex-shrink-0 ${
                  isRecording
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-cyan-400'
                }`}
                title="Voice Input"
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white transition shadow flex-shrink-0"
                title="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
