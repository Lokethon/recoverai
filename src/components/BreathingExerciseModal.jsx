import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, Wind, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredProfile } from '../utils/storage';

export default function BreathingExerciseModal({ isOpen, onClose, isDarkMode }) {
  const profile = getStoredProfile();

  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [phase, setPhase] = useState('Get Ready');
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      setSecondsLeft(30);
      setPhase('Get Ready');
      setIsCompleted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer = null;

    if (isActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            triggerSuccessConfetti();
            return 0;
          }
          return prev - 1;
        });

        const elapsed = 30 - secondsLeft + 1;
        const cycleSec = elapsed % 16;

        if (cycleSec >= 0 && cycleSec < 4) {
          setPhase('Inhale');
          setPhaseSeconds(4 - cycleSec);
        } else if (cycleSec >= 4 && cycleSec < 8) {
          setPhase('Hold Breath');
          setPhaseSeconds(8 - cycleSec);
        } else if (cycleSec >= 8 && cycleSec < 12) {
          setPhase('Exhale Slowly');
          setPhaseSeconds(12 - cycleSec);
        } else {
          setPhase('Hold Empty');
          setPhaseSeconds(16 - cycleSec);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, secondsLeft]);

  const triggerSuccessConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
    if (secondsLeft === 0) setSecondsLeft(30);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(30);
    setPhase('Get Ready');
    setIsCompleted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl border transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition ${
            isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-2">
            <Wind className="w-3.5 h-3.5" />
            <span>30-Second Box Breathing</span>
          </div>
          <h3 className="text-xl font-bold">Guided Calming Breath</h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Reduces heart rate and clears mental stress waves
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center py-8">
          <div
            className={`w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl relative ${
              phase === 'Inhale'
                ? 'scale-125 bg-gradient-to-tr from-indigo-600/40 via-sky-500/30 to-slate-800/40 ring-8 ring-indigo-500/40 shadow-indigo-500/50'
                : phase === 'Hold Breath'
                ? 'scale-125 bg-gradient-to-tr from-sky-500/50 via-indigo-600/30 to-slate-800/40 ring-8 ring-sky-400/40 shadow-sky-500/50'
                : phase === 'Exhale Slowly'
                ? 'scale-90 bg-gradient-to-tr from-slate-700/30 via-indigo-600/20 to-slate-800/40 ring-4 ring-indigo-500/20 shadow-indigo-500/20'
                : 'scale-95 bg-slate-800/40 ring-2 ring-slate-700'
            }`}
          >
            <span className="text-3xl font-extrabold tracking-tight">{secondsLeft}s</span>
            <span className="text-xs font-bold text-sky-400 mt-1 uppercase tracking-wider">
              {phase}
            </span>
            {isActive && (
              <span className="text-[10px] text-slate-300 mt-0.5 font-mono">
                {phaseSeconds}s
              </span>
            )}
          </div>
        </div>

        {isCompleted && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-center animate-bounce">
            <div className="flex items-center justify-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Exercise Completed!</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Great job, {profile?.name || 'Friend'}! Your mind is calmer and more focused.
            </p>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4 pt-2">
          <button
            onClick={handleReset}
            title="Reset timer"
            className={`p-3 rounded-2xl transition ${
              isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {!isActive ? (
            <button
              onClick={handleStart}
              className="flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{secondsLeft === 30 ? 'Start Breathing' : 'Resume'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex-1 py-3 px-6 rounded-2xl bg-amber-500 text-slate-950 font-extrabold shadow-lg hover:bg-amber-400 transition flex items-center justify-center space-x-2"
            >
              <Pause className="w-5 h-5 fill-slate-950" />
              <span>Pause</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
