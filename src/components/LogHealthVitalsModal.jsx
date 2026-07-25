import React, { useState } from 'react';
import { X, Heart, Activity, Moon, ActivitySquare, ShieldCheck, Check, Save } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredProfile, saveStoredProfile } from '../utils/storage';

export default function LogHealthVitalsModal({ isOpen, onClose, onVitalsSaved, isDarkMode }) {
  const profile = getStoredProfile();
  const vitals = profile.latestVitals || {};

  const [systolic, setSystolic] = useState(vitals.systolicBP || 118);
  const [diastolic, setDiastolic] = useState(vitals.diastolicBP || 76);
  const [spo2, setSpo2] = useState(vitals.spo2 || 98);
  const [heartRate, setHeartRate] = useState(vitals.heartRate || 68);
  const [hrvMs, setHrvMs] = useState(vitals.hrvMs || 62);
  const [sleepHours, setSleepHours] = useState(vitals.sleepHours || 7.5);
  const [exerciseMins, setExerciseMins] = useState(vitals.exerciseMins || 35);
  const [withdrawalIndex, setWithdrawalIndex] = useState(0);

  if (!isOpen) return null;

  const handleSaveVitals = (e) => {
    e.preventDefault();

    const updatedVitals = {
      bloodPressure: `${systolic}/${diastolic}`,
      systolicBP: Number(systolic),
      diastolicBP: Number(diastolic),
      spo2: Number(spo2),
      heartRate: Number(heartRate),
      hrvMs: Number(hrvMs),
      sleepHours: Number(sleepHours),
      exerciseMins: Number(exerciseMins),
      withdrawalIndex: `${withdrawalIndex}/10 (${withdrawalIndex === 0 ? 'Normal' : withdrawalIndex < 4 ? 'Mild' : 'Severe'})`,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedProfile = {
      ...profile,
      latestVitals: updatedVitals
    };

    saveStoredProfile(updatedProfile);
    if (onVitalsSaved) onVitalsSaved(updatedProfile);

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
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
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black">Log Comprehensive Health Vitals</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Record clinical physiological biomarkers & organ recovery indicators
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveVitals} className="space-y-4">
          
          {/* Blood Pressure */}
          <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              1. Blood Pressure (mmHg)
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Systolic (Top)</label>
                <input
                  type="number"
                  required
                  min="80"
                  max="200"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs outline-none border ${
                    isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Diastolic (Bottom)</label>
                <input
                  type="number"
                  required
                  min="50"
                  max="130"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs outline-none border ${
                    isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Blood Oxygen & Heart Rate */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Blood Oxygen SpO2 (%)
              </label>
              <input
                type="number"
                required
                min="85"
                max="100"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Resting Heart Rate (BPM)
              </label>
              <input
                type="number"
                required
                min="40"
                max="160"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* HRV & Sleep */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                HRV Stress Score (ms)
              </label>
              <input
                type="number"
                required
                min="10"
                max="150"
                value={hrvMs}
                onChange={(e) => setHrvMs(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Sleep Duration (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                required
                min="1"
                max="14"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Physical Exercise & Withdrawal Scale */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Exercise (Minutes)
              </label>
              <input
                type="number"
                required
                min="0"
                max="240"
                value={exerciseMins}
                onChange={(e) => setExerciseMins(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Withdrawal Scale (0 - 10)
              </label>
              <input
                type="number"
                required
                min="0"
                max="10"
                value={withdrawalIndex}
                onChange={(e) => setWithdrawalIndex(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg transition flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4 fill-white" />
            <span>Save Health Vitals Entry</span>
          </button>
        </form>

      </div>
    </div>
  );
}
