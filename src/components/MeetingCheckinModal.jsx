import React, { useState } from 'react';
import { X, Users, CheckCircle2, Calendar, MapPin, BookOpen, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addMeetingLog } from '../utils/storage';
import { sanitizeInput } from '../utils/security';

export default function MeetingCheckinModal({ isOpen, onClose, onMeetingLogged, isDarkMode }) {
  const [meetingType, setMeetingType] = useState('Alcoholics Anonymous (AA)');
  const [topic, setTopic] = useState('Step 1: Acceptance & Surrender');
  const [location, setLocation] = useState('Community Center / Zoom');
  const [notes, setNotes] = useState('Shared my streak and received great encouragement from my sponsor.');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      id: `m-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: sanitizeInput(meetingType),
      topic: sanitizeInput(topic),
      location: sanitizeInput(location),
      notes: sanitizeInput(notes)
    };

    const updated = addMeetingLog(entry);
    if (onMeetingLogged) onMeetingLogged(updated);

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

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
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-500 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black">Log Support Meeting Check-in</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Track your AA, NA, or SMART Recovery commitment
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Support Group / Program Type
            </label>
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <option value="Alcoholics Anonymous (AA)">Alcoholics Anonymous (AA)</option>
              <option value="Narcotics Anonymous (NA)">Narcotics Anonymous (NA)</option>
              <option value="SMART Recovery">SMART Recovery</option>
              <option value="Refuge Recovery (Buddhist)">Refuge Recovery (Buddhist)</option>
              <option value="Celebrate Recovery">Celebrate Recovery</option>
              <option value="Al-Anon / Family Group">Al-Anon / Family Group</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Topic / Step Discussed
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Step 1: Acceptance / Managing Triggers"
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Location / Venue
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. St. Mark Fellowship / Zoom Online"
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Reflection & Key Insights
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What takeaways or encouragement did you receive today?"
              className={`w-full p-3 rounded-xl text-xs outline-none border ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 fill-slate-950 text-white" />
            <span>Check In to Meeting</span>
          </button>
        </form>

      </div>
    </div>
  );
}
