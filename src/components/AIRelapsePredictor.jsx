import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, TrendingDown, RefreshCcw, Activity, Heart, AlertCircle } from 'lucide-react';
import { getBioTrackerMetrics } from '../utils/appleHealth';
import { getStoredProfile, getStoredMoodHistory } from '../utils/storage';
import { predictRelapseRiskAI } from '../services/gemini';

export default function AIRelapsePredictor({ isDarkMode }) {
  const profile = getStoredProfile();
  const moodHistory = getStoredMoodHistory();
  const vitals = getBioTrackerMetrics();

  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunPrediction = async () => {
    setIsAnalyzing(true);
    const res = await predictRelapseRiskAI(vitals, moodHistory, profile.recoveryStreak || 1);
    setPrediction(res);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    handleRunPrediction();
  }, []);

  return (
    <div className={`p-6 rounded-3xl border transition-all shadow-xl ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-extrabold flex items-center space-x-2">
              <span>Gemini AI Relapse Predictor</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20 uppercase tracking-widest">
                24h Forecast
              </span>
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Evaluates BioTracker vitals (HRV, Sleep) & mood history to predict craving vulnerability
            </p>
          </div>
        </div>

        <button
          onClick={handleRunPrediction}
          disabled={isAnalyzing}
          className={`p-2.5 rounded-2xl border transition flex items-center space-x-1.5 text-xs font-bold ${
            isAnalyzing
              ? 'bg-indigo-600 text-white animate-pulse'
              : isDarkMode
                ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <RefreshCcw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Recalculate AI Risk</span>
        </button>
      </div>

      {isAnalyzing ? (
        <div className="p-5 text-center text-xs font-bold text-indigo-500 animate-pulse">
          Gemini AI is analyzing physiological HRV biomarkers, sleep cycles, and daily stress logs...
        </div>
      ) : prediction ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Risk Gauge */}
          <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              Predicted 24h Risk Probability
            </span>
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {prediction.probabilityScore || 14}%
            </span>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
              {prediction.riskLevel || 'Low'} Relapse Risk
            </span>
          </div>

          {/* AI Forecast & Mitigation Recommendation */}
          <div className="md:col-span-8 space-y-2">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold">
              🤖 <span className="font-extrabold">AI Forecast:</span> {prediction.forecast}
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              💡 <span className="font-extrabold">Primary Recommendation:</span> {prediction.primaryRecommendation}
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
}
