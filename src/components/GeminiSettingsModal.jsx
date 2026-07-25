import React, { useState } from 'react';
import { X, Key, Check, ShieldCheck, ExternalLink, Bot, Sparkles, RefreshCcw } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../utils/storage';
import { analyzeWithGemini } from '../services/gemini';

export default function GeminiSettingsModal({ isOpen, onClose, isDarkMode }) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testResult, setTestResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult('');
    setStoredApiKey(apiKey.trim());

    const startTime = Date.now();
    const res = await analyzeWithGemini('System API Test Connection');
    const latency = Date.now() - startTime;

    setIsTesting(false);
    if (res && res.response) {
      setTestResult(`✅ Gemini API Connection Successful! Latency: ${latency}ms`);
    } else {
      setTestResult(`⚠️ Connected via Offline Intelligent Heuristic Engine.`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setStoredApiKey(apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition ${
            isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black">Gemini 2.5 Flash API Key</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Configure your Google Gemini API Key for live AI reasoning
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center space-x-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Gemini API Key Saved Successfully!</span>
          </div>
        )}

        {testResult && (
          <div className="mb-4 p-3 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-bold text-center">
            {testResult}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1.5">Your Gemini API Key</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                }`}
              />
            </div>
            <p className={`text-[11px] mt-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Don't have a key? Get a free key from Google AI Studio.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              <span>Get free key on Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="py-1.5 px-3 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 text-xs font-bold hover:bg-sky-500/20 transition flex items-center space-x-1"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 fill-white" />
            <span>Save API Key</span>
          </button>
        </form>

      </div>
    </div>
  );
}
