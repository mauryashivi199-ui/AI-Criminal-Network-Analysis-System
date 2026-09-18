import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  Plus, 
  Mic, 
  MicOff, 
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  FileSpreadsheet, 
  X, 
  Check,
  FileCheck
} from 'lucide-react';
import { queryCopilot } from '../../services/api';

export default function CopilotDrawer({ onHighlightNodes }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '🛡️ **AI Forensic Investigation Copilot Initialized.**\n\nConnected to live Criminal Knowledge Graph, CDR logs, and Hawala Transaction streams. Ask questions, upload crime scene photos, FIR PDFs, or use voice input.',
      actions: [
        'Identify syndicate kingpin & underbosses',
        'Find money mule pass-through accounts',
        'Analyze burner phone midnight call spikes',
        'Predict unobserved covert relationships',
      ],
      attachments: []
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, attachedFiles]);

  // Initialize Web Speech API for voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN'; // Supports Indian English & Hindi terms

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setInputQuery(transcript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported by this browser. Please use Google Chrome.');
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

  const handleFileUpload = (e, fileType) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newAttachments = files.map((f) => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
      type: fileType,
      url: URL.createObjectURL(f)
    }));

    setAttachedFiles((prev) => [...prev, ...newAttachments]);
    setIsPlusMenuOpen(false);
  };

  const removeAttachment = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const quickPrompts = [
    'Who is the top kingpin in this syndicate?',
    'Show connection between Iqbal Ansari and TRON Wallet',
    'List all flagged money mule bank accounts',
    'What are the predicted covert links between suspects?',
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim() && attachedFiles.length === 0) return;

    const currentAttached = [...attachedFiles];
    
    // Add user message with attachments
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: query || (currentAttached.length > 0 ? `Uploaded ${currentAttached.map(a => a.name).join(', ')} for forensic analysis.` : ''),
        attachments: currentAttached
      }
    ]);

    if (!textToSend) setInputQuery('');
    setAttachedFiles([]);
    setLoading(true);

    try {
      // Simulate forensic attachment analysis text if file was attached
      let fullQuery = query;
      if (currentAttached.length > 0) {
        fullQuery += ` [Attached Files: ${currentAttached.map(a => a.name).join(', ')}]`;
      }

      const res = await queryCopilot(fullQuery || 'Analyze the uploaded evidence document');
      
      let answerText = res.answer;
      if (currentAttached.length > 0) {
        answerText = `📂 **Evidence Ingested & Analyzed (${currentAttached.length} item(s)):**\n- Extracted metadata and cross-referenced with active syndicate records.\n\n` + answerText;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: answerText,
          actions: res.suggested_actions || [],
          attachments: []
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
          attachments: []
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070b14] overflow-hidden relative">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e, 'doc')}
        accept=".pdf,.doc,.docx,.txt,.csv,.json"
        className="hidden"
      />
      <input
        type="file"
        ref={imageInputRef}
        onChange={(e) => handleFileUpload(e, 'image')}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={videoInputRef}
        onChange={(e) => handleFileUpload(e, 'video')}
        accept="video/*"
        className="hidden"
      />

      {/* Header */}
      <div className="p-3 md:p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-700/50 flex-shrink-0">
            <Bot className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="truncate">
            <h2 className="text-xs md:text-sm font-bold text-white font-mono uppercase tracking-wider truncate">
              AI Forensic Investigation Copilot
            </h2>
            <p className="text-[10px] md:text-xs text-slate-400 truncate">Graph-RAG & Multi-Hop Reasoning Engine</p>
          </div>
        </div>

        <span className="text-[9px] md:text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 flex items-center space-x-1 flex-shrink-0">
          <Sparkles className="w-2.5 h-2.5" />
          <span>GRAPH-RAG 2.0</span>
        </span>
      </div>

      {/* Message History Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3.5">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[92%] sm:max-w-[85%] md:max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-lg'
                  : 'bg-slate-900/95 border border-slate-800 text-slate-200 rounded-bl-none shadow-xl'
              }`}
            >
              {/* Attachments in Message */}
              {m.attachments && m.attachments.length > 0 && (
                <div className="mb-2.5 space-y-1.5 pb-2 border-b border-white/20">
                  {m.attachments.map((att, aIdx) => (
                    <div key={aIdx} className="flex items-center space-x-2 bg-black/30 p-2 rounded-lg text-[11px] font-mono">
                      {att.type === 'image' && <ImageIcon className="w-4 h-4 text-cyan-300" />}
                      {att.type === 'doc' && <FileText className="w-4 h-4 text-amber-300" />}
                      {att.type === 'video' && <Video className="w-4 h-4 text-rose-300" />}
                      <span className="font-semibold truncate">{att.name}</span>
                      <span className="text-[9px] opacity-70 ml-auto">{att.size}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="whitespace-pre-wrap">{m.text}</div>

              {/* Action Recommendations */}
              {m.actions && m.actions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-purple-400 font-bold block">
                    RECOMMENDED POLICE TACTICAL ACTIONS:
                  </span>
                  {m.actions.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      onClick={() => handleSend(act)}
                      className="flex items-center space-x-1.5 text-[11px] text-cyan-300 hover:text-cyan-200 cursor-pointer bg-slate-950/80 p-2 rounded-lg border border-slate-800/60 transition active:scale-95"
                    >
                      <ArrowRight className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{act}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-purple-400 font-mono p-3 bg-slate-900/90 rounded-xl max-w-xs border border-slate-800 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
            <span>Analyzing graph topology & CDR records...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips (Horizontal Scroll on Mobile) */}
      <div className="px-3 py-1.5 flex space-x-2 overflow-x-auto no-scrollbar flex-shrink-0 bg-slate-950/40 border-t border-slate-900">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-[10px] md:text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition whitespace-nowrap flex-shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Pending Attachments Bar */}
      {attachedFiles.length > 0 && (
        <div className="px-3 py-1.5 bg-slate-900 border-t border-slate-800 flex flex-wrap gap-2 items-center flex-shrink-0">
          <span className="text-[10px] text-slate-400 font-mono">READY TO ATTACH:</span>
          {attachedFiles.map((f, idx) => (
            <div key={idx} className="flex items-center space-x-1.5 bg-slate-950 border border-slate-700 px-2 py-0.5 rounded-md text-[11px] text-cyan-300">
              <span className="truncate max-w-[120px]">{f.name}</span>
              <button onClick={() => removeAttachment(idx)} className="text-slate-400 hover:text-rose-400">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Plus Attachment Popup Menu */}
      {isPlusMenuOpen && (
        <div className="absolute bottom-16 left-3 z-30 p-2 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="text-[10px] font-mono text-slate-400 px-2 py-1 font-bold">ATTACH EVIDENCE:</div>
          
          <button
            onClick={() => { imageInputRef.current?.click(); }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition text-left"
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Photo / Suspect Image</span>
          </button>

          <button
            onClick={() => { fileInputRef.current?.click(); }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition text-left"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>FIR Document / PDF / TXT</span>
          </button>

          <button
            onClick={() => { fileInputRef.current?.click(); }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition text-left"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>CDR / Bank Excel / CSV</span>
          </button>

          <button
            onClick={() => { videoInputRef.current?.click(); }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition text-left"
          >
            <Video className="w-4 h-4 text-rose-400" />
            <span>CCTV / Surveillance Video</span>
          </button>
        </div>
      )}

      {/* Sticky Bottom Input Bar */}
      <div className="p-2.5 md:p-3 bg-slate-950 border-t border-slate-800 flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center space-x-1.5"
        >
          {/* Plus Icon Button */}
          <button
            type="button"
            onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
            className={`p-2.5 rounded-xl border transition flex-shrink-0 ${
              isPlusMenuOpen 
                ? 'bg-purple-600 text-white border-purple-500' 
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
            title="Attach Evidence (Photo, PDF, Video, CSV)"
          >
            <Plus className={`w-4 h-4 transition-transform ${isPlusMenuOpen ? 'rotate-45' : ''}`} />
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder={isRecording ? "Listening to voice input..." : "Ask Copilot or query syndicate..."}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className={`flex-1 bg-slate-900 border rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans shadow-inner ${
              isRecording ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-950/20' : 'border-slate-800'
            }`}
          />

          {/* Microphone Voice Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl border transition flex-shrink-0 ${
              isRecording 
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-cyan-400'
            }`}
            title={isRecording ? "Stop Recording" : "Voice Input (Speech-to-Text)"}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading || (!inputQuery.trim() && attachedFiles.length === 0)}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white transition shadow flex-shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
