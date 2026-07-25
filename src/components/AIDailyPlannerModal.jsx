import React, { useState, useEffect, useCallback } from 'react';
import { X, Sparkles, CheckSquare, Square, RefreshCcw, ShieldCheck, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredProfile } from '../utils/storage';
import { generateAIDailyPlan } from '../services/gemini';

export default function AIDailyPlannerModal({ isOpen, onClose, isDarkMode }) {
  const profile = getStoredProfile();

  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = useCallback(async () => {
    setIsLoading(true);
    const result = await generateAIDailyPlan(profile);
    setPlan(result);
    setIsLoading(false);
  }, [profile]);

  useEffect(() => {
    if (isOpen && !plan) {
      handleGeneratePlan();
    }
  }, [isOpen, plan, handleGeneratePlan]);

  const toggleTask = (index) => {
    if (!plan) return;
    const updatedTasks = [...plan.tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setPlan({ ...plan, tasks: updatedTasks });

    if (updatedTasks.every(t => t.completed)) {
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  if (!isOpen) return null;

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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-lg">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-xl font-black">AI Daily Recovery Planner</h3>
              <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Gemini AI customized morning goals for Day {profile.recoveryStreak || 1}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-indigo-500 animate-spin mx-auto" />
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              Gemini AI is analyzing your vitals & streak to create your personalized recovery roadmap...
            </p>
          </div>
        ) : plan ? (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Daily Affirmation */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold leading-relaxed">
              💡 <span className="font-extrabold text-indigo-500">Daily Affirmation:</span> "{plan.affirmation}"
            </div>

            {/* Daily Tasks Checklist */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
                Today's Recommended Recovery Tasks:
              </span>

              <div className="space-y-2.5">
                {plan.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      task.completed
                        ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-600 dark:text-indigo-400'
                        : isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-indigo-500 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <span className={`text-xs font-extrabold block ${task.completed ? 'line-through opacity-80' : ''}`}>
                          {task.title}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trigger Advisory */}
            {plan.triggerAdvisory && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold">
                ⚠️ <span className="font-bold">AI Trigger Advisory:</span> {plan.triggerAdvisory}
              </div>
            )}

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={handleGeneratePlan}
                className="py-2 px-3.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:text-indigo-400 transition flex items-center space-x-1.5"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Regenerate Plan</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition"
              >
                Done
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}
