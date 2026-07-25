import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  AlertTriangle,
  Phone,
  Wind,
  MapPin,
  Bot,
  User,
  HeartPulse,
  RefreshCcw,
  ShieldCheck,
  Zap,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { analyzeWithGemini } from '../services/gemini';
import { speechService } from '../services/speech';
import { getStoredChatMessages, saveChatMessages, saveRiskEntry, getStoredProfile } from '../utils/storage';
import { sanitizeInput, limitStringLength } from '../utils/security';

export default function VoiceChat({
  onOpenBreathingModal,
  setActiveTab,
  isDarkMode,
  isOffline
}) {
  const profile = getStoredProfile();

  const [messages, setMessages] = useState(() => {
    const rawMsgs = getStoredChatMessages(profile.name);
    return rawMsgs.map(m => ({
      ...m,
      text: m.text ? m.text.replace(/Rahul/g, profile.name) : m.text
    }));
  });

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [thinkingStage, setThinkingStage] = useState('Analyzing emotion...');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    saveChatMessages(messages);
  }, [messages, isAnalyzing]);

  // Voice Input Handlers
  const handleToggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.startListening({
        onResult: (transcript, isFinal) => {
          const sanitized = sanitizeInput(transcript);
          setInputText(sanitized);
          if (isFinal) {
            setIsListening(false);
            handleSendMessage(sanitized);
          }
        },
        onError: (err) => {
          console.warn('Speech error:', err);
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
    }
  };

  const handleSendMessage = async (textToSend) => {
    const rawText = (textToSend || inputText).trim();
    if (!rawText || isAnalyzing) return;

    const sanitizedText = sanitizeInput(limitStringLength(rawText, 500));

    setInputText('');
    speechService.stopListening();
    setIsListening(false);

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: sanitizedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    setIsAnalyzing(true);
    setThinkingStage('Analyzing emotional state & trigger...');

    setTimeout(() => setThinkingStage('Evaluating relapse risk level...'), 600);
    setTimeout(() => setThinkingStage('Generating personalized recovery response...'), 1200);

    const analysis = await analyzeWithGemini(sanitizedText);

    setIsAnalyzing(false);

    const riskNum = analysis.risk === 'High' ? 3 : analysis.risk === 'Medium' ? 2 : 1;
    saveRiskEntry({
      day: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      riskScore: riskNum,
      level: analysis.risk
    });

    const aiMsg = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: analysis.response ? analysis.response.replace(/Rahul/g, profile.name) : analysis.response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      analysis: analysis
    };

    setMessages((prev) => [...prev, aiMsg]);

    if (isTTSEnabled) {
      speechService.speak(aiMsg.text);
    }
  };

  const handleCallSister = () => {
    const phone = profile.trustedContact?.phone || '+1 (555) 382-9910';
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleFindRehab = () => {
    setActiveTab('emergency');
  };

  const quickPrompts = [
    { title: "🍸 Craving Trigger", text: "I feel like drinking tonight." },
    { title: "💼 Work Stress", text: "I had an extremely stressful work meeting today." },
    { title: "🌧️ Loneliness", text: "I'm feeling lonely and isolated right now." },
    { title: "🌿 Recovery Tip", text: "How can I ride out a sudden wave of craving?" }
  ];

  const renderEmotionBadge = (emotion) => {
    let emoji = '😊';
    let color = 'bg-sky-500/10 text-sky-500 border-sky-500/20';

    switch (emotion?.toLowerCase()) {
      case 'sad': emoji = '😢'; color = 'bg-amber-500/10 text-amber-500 border-amber-500/20'; break;
      case 'anxiety': case 'anxious': emoji = '😰'; color = 'bg-orange-500/10 text-orange-500 border-orange-500/20'; break;
      case 'angry': emoji = '😡'; color = 'bg-rose-500/10 text-rose-500 border-rose-500/20'; break;
      case 'calm': case 'happy': default: emoji = '😊'; color = 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'; break;
    }

    return (
      <span className={`inline-flex items-center space-x-1 text-xs px-3 py-1 rounded-full font-bold border ${color}`}>
        <span>{emoji}</span>
        <span>{emotion || 'Calm'}</span>
      </span>
    );
  };

  const renderRiskBadge = (risk) => {
    let bg = 'bg-indigo-500/20 text-indigo-500 border-indigo-500/30';
    let icon = '🟢';

    if (risk === 'Medium') {
      bg = 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      icon = '🟡';
    } else if (risk === 'High') {
      bg = 'bg-rose-500/20 text-rose-500 border-rose-500/30 animate-pulse';
      icon = '🔴';
    }

    return (
      <span className={`inline-flex items-center space-x-1 text-xs px-3 py-1 rounded-full font-extrabold border ${bg}`}>
        <span>{icon}</span>
        <span>{risk || 'Low'} Risk</span>
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)] animate-fadeIn">
      
      {/* Desktop Left Sidebar: Prompts & AI Status Monitor */}
      <div className="hidden lg:flex lg:col-span-4 flex-col space-y-4">
        
        {/* Gemini Status Widget */}
        <div className={`p-5 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Gemini Recovery Coach</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Structured JSON Reasoning Engine</p>
            </div>
          </div>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Analyzes speech or text to detect emotional state, relapse risk, triggers, and immediate coping actions.
          </p>
        </div>

        {/* Quick Prompts Panel */}
        <div className={`p-5 rounded-3xl border flex-1 flex flex-col justify-between ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Quick Prompt Triggers
            </h4>

            <div className="space-y-2.5">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.text)}
                  disabled={isAnalyzing}
                  className={`w-full p-3 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-between group ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/50 text-slate-200'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-500/50 text-slate-800'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block">{qp.title}</span>
                    <span className="text-[11px] text-slate-400 block line-clamp-1 mt-0.5">
                      "{qp.text}"
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 transition shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* SOS Emergency Sidebar Shortcut */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('emergency')}
              className="w-full py-3 px-4 rounded-2xl bg-rose-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/30 hover:scale-105 transition"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>Trigger 24/7 SOS Emergency</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Right Pane: Conversation Stream */}
      <div className="lg:col-span-8 flex flex-col h-full relative">
        
        {/* Chat Control Bar */}
        <div className={`p-3.5 rounded-3xl mb-3 flex items-center justify-between border shadow-sm ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">Live Gemini AI Conversation</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                {isOffline ? 'Offline Heuristic Engine' : 'Connected to Gemini API'}
              </span>
            </div>
          </div>

          {/* TTS Readout Toggle */}
          <button
            onClick={() => {
              const next = !isTTSEnabled;
              setIsTTSEnabled(next);
              if (!next) speechService.stopSpeaking();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
              isTTSEnabled
                ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                : isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {isTTSEnabled ? <Volume2 className="w-4 h-4 text-indigo-500" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[11px]">{isTTSEnabled ? 'Voice On' : 'Muted'}</span>
          </button>
        </div>

        {/* Message Stream Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center space-x-1.5 px-2">
                <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {msg.sender === 'user' ? (profile.name || 'User') : 'RecoverAI'} • {msg.timestamp}
                </span>
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[90%] sm:max-w-[80%] rounded-3xl p-5 shadow-lg transition-all ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                  : isDarkMode
                    ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Structured JSON AI Analysis Render */}
                {msg.analysis && (
                  <div className="mt-5 pt-4 border-t border-slate-700/40 space-y-3.5">
                    
                    {/* Metadata Badges */}
                    <div className="flex flex-wrap gap-2 items-center">
                      {renderEmotionBadge(msg.analysis.emotion)}
                      {renderRiskBadge(msg.analysis.risk)}
                      {msg.analysis.trigger && (
                        <span className="text-xs px-3 py-1 rounded-full font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          Trigger: {msg.analysis.trigger}
                        </span>
                      )}
                    </div>

                    {/* Summary */}
                    {msg.analysis.summary && (
                      <p className={`text-xs italic ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        "{msg.analysis.summary}"
                      </p>
                    )}

                    {/* Motivation Quote */}
                    {msg.analysis.motivation && (
                      <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                        💡 {msg.analysis.motivation}
                      </div>
                    )}

                    {/* Recommended Actions Buttons */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        Recommended Actions:
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {/* Call Caregiver */}
                        <a
                          href={`tel:${(profile.trustedContact?.phone || '+15553829910').replace(/[^0-9+]/g, '')}`}
                          className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95 transition"
                        >
                          <Phone className="w-3.5 h-3.5 fill-white" />
                          <span>Call {profile.trustedContact?.name || 'Caregiver'}</span>
                        </a>

                        {/* Breathing Launcher */}
                        <button
                          onClick={onOpenBreathingModal}
                          className="py-2 px-3.5 rounded-xl bg-sky-500/20 text-sky-500 border border-sky-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-sky-500/30 active:scale-95 transition"
                        >
                          <Wind className="w-3.5 h-3.5" />
                          <span>30s Breathing Exercise</span>
                        </button>

                        {/* Find Rehab */}
                        <button
                          onClick={handleFindRehab}
                          className="py-2 px-3.5 rounded-xl bg-indigo-500/20 text-indigo-500 border border-indigo-500/30 font-bold text-xs flex items-center space-x-1.5 hover:bg-indigo-500/30 active:scale-95 transition"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Nearby ER Hospitals</span>
                        </button>
                      </div>

                      {/* High Risk SOS Highlight Alert */}
                      {msg.analysis.risk === 'High' && (
                        <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-500 text-xs font-bold flex items-center justify-between mt-2 animate-bounce">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>High Relapse Risk Detected</span>
                          </div>
                          <button
                            onClick={() => setActiveTab('emergency')}
                            className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-black uppercase"
                          >
                            Trigger SOS
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            </div>
          ))}

          {/* AI Thinking Loader */}
          {isAnalyzing && (
            <div className="flex items-center space-x-3 p-4 rounded-3xl bg-slate-900/90 border border-slate-800 text-indigo-400 animate-pulse max-w-[80%]">
              <Sparkles className="w-5 h-5 animate-spin text-indigo-400" />
              <div>
                <span className="text-xs font-bold block">{thinkingStage}</span>
                <span className="text-[10px] text-slate-400">Gemini JSON reasoning engine...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className={`mt-3 p-3 rounded-3xl border shadow-xl ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-2.5">
            
            {/* Pulsing Mic Button */}
            <button
              onClick={handleToggleListening}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all transform active:scale-90 ${
                isListening
                  ? 'bg-rose-600 text-white animate-ping ring-4 ring-rose-500/50 shadow-rose-500/50'
                  : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Text Input Box */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isListening ? 'Listening to your voice...' : 'Type or speak: "I feel like drinking..."'}
              className={`flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm outline-none transition border ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
              }`}
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isAnalyzing}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                inputText.trim() && !isAnalyzing
                  ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 active:scale-95'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
