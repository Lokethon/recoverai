import React, { useState } from 'react';
import { X, Heart, Check, Sparkles } from 'lucide-react';
import { saveMoodEntry } from '../utils/storage';

export default function MoodSelectorModal({ isOpen, onClose, onMoodSelected, isDarkMode }) {
  const [selectedMood, setSelectedMood] = useState('Calm');

  if (!isOpen) return null;

  const moods = [
    { name: 'Happy', emoji: '😊', val: 5, color: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30' },
    { name: 'Calm', emoji: '😌', val: 4, color: 'bg-sky-500/20 text-sky-500 border-sky-500/30' },
    { name: 'Neutral', emoji: '😐', val: 3, color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
    { name: 'Anxiety', emoji: '😰', val: 2, color: 'bg-amber-500/20 text-amber-500 border-amber-500/30' },
    { name: 'Sad', emoji: '😢', val: 1, color: 'bg-rose-500/20 text-rose-500 border-rose-500/30' }
  ];

  const handleSelect = (m) => {
    setSelectedMood(m.name);
    const entry = {
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      mood: m.name,
      val: m.val,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    saveMoodEntry(entry);
    if (onMoodSelected) onMoodSelected(entry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl border transition-all ${
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

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Log Your Mood Today</h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            How are you feeling right now?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {moods.map((m) => (
            <button
              key={m.name}
              onClick={() => handleSelect(m)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.02] ${m.color}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-sm font-bold">{m.name}</span>
              </div>
              <Check className="w-5 h-5 opacity-70" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
