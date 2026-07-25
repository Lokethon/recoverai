import React, { useState } from 'react';
import { X, Flame, AlertCircle, CheckCircle2, Sparkles, Activity, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addCravingLog } from '../utils/storage';
import { sanitizeInput } from '../utils/security';

export default function CravingLoggerModal({ isOpen, onClose, onCravingLogged, isDarkMode }) {
  const [intensity, setIntensity] = useState(5);
  const [trigger, setTrigger] = useState('Stress');
  const [location, setLocation] = useState('Home');
  const [copingAction, setCopingAction] = useState('Used Guided Box Breathing');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      id: `c-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      intensity: Number(intensity),
      trigger: sanitizeInput(trigger),
      location: sanitizeInput(location),
      copingAction: sanitizeInput(copingAction)
    };

    const updated = addCravingLog(entry);
    if (onCravingLogged) onCravingLogged(updated);

    try {
      if (intensity < 5) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } catch (err) {}

    onClose();
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

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <h3 className="text-xl font-black">Log Craving Spike</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Track intensity, triggers & coping strategies to build resilience
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Intensity Slider (1-10) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Craving Intensity (1 - 10)
              </label>
              <span className={`text-sm font-black px-3 py-0.5 rounded-full border ${
                intensity >= 8
                  ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                  : intensity >= 5
                    ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                    : 'bg-indigo-500/20 text-indigo-500 border-indigo-500/30'
              }`}>
                {intensity} / 10 - {intensity >= 8 ? 'Severe Surge' : intensity >= 5 ? 'Moderate Urge' : 'Mild Craving'}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Trigger Selection */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Primary Trigger
            </label>
            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <option value="Stress & Work Pressure">Stress & Work Pressure</option>
              <option value="Social Setting & Peer Pressure">Social Setting & Peer Pressure</option>
              <option value="Loneliness / Boredom">Loneliness / Boredom</option>
              <option value="Emotional Distress / Anger">Emotional Distress / Anger</option>
              <option value="Fatigue & Low Energy">Fatigue & Low Energy</option>
              <option value="Environmental Cue / Habitual Time">Environmental Cue / Habitual Time</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Current Environment / Location
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Home / Office / Restaurant"
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Coping Action Used */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Coping Action Used
            </label>
            <input
              type="text"
              required
              value={copingAction}
              onChange={(e) => setCopingAction(e.target.value)}
              placeholder="e.g. Guided 30s Breathing / Called Sister / Walk outside"
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg transition flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 fill-white" />
            <span>Save Craving Log</span>
          </button>
        </form>

      </div>
    </div>
  );
}
