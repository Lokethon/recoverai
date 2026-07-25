import React, { useState } from 'react';
import { Heart, Activity, Moon, Zap, RefreshCcw, Sparkles, Stethoscope } from 'lucide-react';
import { getBioTrackerMetrics } from '../utils/appleHealth';

export default function BioTrackerWidget({ isDarkMode }) {
  const [metrics, setMetrics] = useState(getBioTrackerMetrics());
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setMetrics(getBioTrackerMetrics());
      setIsSyncing(false);
    }, 800);
  };

  return (
    <div className={`p-6 rounded-3xl border transition-all shadow-xl ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold flex items-center space-x-2">
              <span>RecoverAI BioTracker</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
                Live Vitals
              </span>
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Real-time physiological stress & recovery metrics from your logged health data
            </p>
          </div>
        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className={`p-2.5 rounded-2xl border transition flex items-center space-x-1.5 text-xs font-bold ${
            isSyncing
              ? 'bg-indigo-600 text-white'
              : isDarkMode
                ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <RefreshCcw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh Vitals</span>
        </button>
      </div>

      {/* Grid of 4 BioTracker Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Heart Rate */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-black">{metrics.heartRate.bpm}</span>
            <span className="text-xs font-bold text-slate-400">BPM</span>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mt-1 block">
            {metrics.heartRate.status} ({metrics.heartRate.trend})
          </span>
        </div>

        {/* HRV (Heart Rate Variability) */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">HRV (Stress)</span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-black">{metrics.hrv.ms}</span>
            <span className="text-xs font-bold text-slate-400">ms</span>
          </div>
          <span className="text-[11px] font-semibold text-sky-500 mt-1 block">
            {metrics.hrv.status} ({metrics.hrv.trend})
          </span>
        </div>

        {/* Sleep Quality */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Sleep</span>
            <Moon className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-black">{metrics.sleep.hours}</span>
            <span className="text-xs font-bold text-slate-400">hrs</span>
          </div>
          <span className="text-[11px] font-semibold text-indigo-500 mt-1 block">
            {metrics.sleep.quality}
          </span>
        </div>

        {/* Physical Activity */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Exercise</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-black">{metrics.activity.minutes}</span>
            <span className="text-xs font-bold text-slate-400">/ {metrics.activity.goal} min</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-500 mt-1 block">
            {metrics.activity.status} Activity
          </span>
        </div>

      </div>

      {/* Last Synced */}
      <p className={`text-[10px] font-semibold mt-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
        Last Updated: {metrics.lastSynced}
      </p>

    </div>
  );
}
