import React, { useState } from 'react';
import {
  Mic,
  AlertTriangle,
  BookOpen,
  Activity,
  Flame,
  Heart,
  Wind,
  Sparkles,
  RefreshCcw,
  Quote,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sun,
  Brain,
  MessageSquare,
  Plus,
  Users,
  Volume2,
  CheckCircle2,
  Stethoscope,
  ActivitySquare
} from 'lucide-react';
import {
  getStoredProfile,
  getStoredMoodHistory,
  getStoredPledgeState,
  savePledgeState
} from '../utils/storage';
import { DAILY_MOTIVATION_QUOTES, HEALTH_RECOVERY_MILESTONES } from '../utils/mockData';
import BioTrackerWidget from '../components/AppleHealthWidget';
import AIRelapsePredictor from '../components/AIRelapsePredictor';
import AIDailyPlannerModal from '../components/AIDailyPlannerModal';
import CravingLoggerModal from '../components/CravingLoggerModal';
import MeetingCheckinModal from '../components/MeetingCheckinModal';
import SoundscapePlayerModal from '../components/SoundscapePlayerModal';
import LogHealthVitalsModal from '../components/LogHealthVitalsModal';

export default function Home({
  setActiveTab,
  onOpenMoodModal,
  onOpenBreathingModal,
  isDarkMode
}) {
  const [profile, setProfileState] = useState(getStoredProfile());
  const moodHistory = getStoredMoodHistory();
  const latestMood = moodHistory[moodHistory.length - 1] || { mood: 'Calm', val: 4 };

  const [pledgeState, setPledgeState] = useState(getStoredPledgeState());
  const [quoteIdx, setQuoteIdx] = useState(0);

  const [isDailyPlannerOpen, setIsDailyPlannerOpen] = useState(false);
  const [isCravingModalOpen, setIsCravingModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isSoundscapeModalOpen, setIsSoundscapeModalOpen] = useState(false);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);

  const vitals = profile.latestVitals || {
    bloodPressure: "118/76",
    spo2: 98,
    heartRate: 68,
    sleepHours: 7.5
  };

  const handlePledgeToday = () => {
    const updated = savePledgeState({ ...pledgeState, isPledgedToday: true });
    setPledgeState(updated);
  };

  const handleNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % DAILY_MOTIVATION_QUOTES.length);
  };

  const genAiFeatures = [
    {
      id: 'ai-voice',
      title: '24/7 AI Voice Coach',
      subtitle: 'Speech emotional analysis & coping advice',
      icon: Mic,
      gradient: 'from-indigo-600 to-sky-500',
      action: () => setActiveTab('chat')
    },
    {
      id: 'ai-planner',
      title: 'AI Morning Planner',
      subtitle: 'Custom daily tasks & trigger advisory',
      icon: Sun,
      gradient: 'from-amber-500 to-indigo-600',
      action: () => setIsDailyPlannerOpen(true)
    },
    {
      id: 'ai-emergency',
      title: 'AI Emergency Protocol',
      subtitle: 'Assigned crisis recovery tasks & WebRTC video',
      icon: AlertTriangle,
      gradient: 'from-rose-600 to-amber-600',
      action: () => setActiveTab('emergency')
    },
    {
      id: 'ai-cbt',
      title: 'AI CBT Journal Insights',
      subtitle: 'Cognitive behavioral therapy reframing',
      icon: Brain,
      gradient: 'from-sky-500 to-indigo-600',
      action: () => setActiveTab('progress')
    }
  ];

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      
      {/* Apple-Style Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border shadow-2xl bg-gradient-to-r from-indigo-700 via-sky-600 to-slate-900 text-white">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 fill-white animate-spin" />
            <span>Google PromptWars Medical AI Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Welcome back, <span className="underline decoration-white/40">{profile.name}</span>
          </h1>

          <p className="text-sm sm:text-base font-semibold opacity-95 leading-relaxed">
            You are staying strong on your <span className="text-sky-300 font-bold">{profile.addictionType || 'Recovery'}</span> journey. Day {profile.recoveryStreak || 1} clean. Access real-time clinical biomarker monitoring, AI voice therapy, and emergency SOS dispatch.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsVitalsModalOpen(true)}
              className="py-3.5 px-6 rounded-2xl bg-white text-indigo-950 font-black text-xs sm:text-sm shadow-xl hover:bg-slate-100 active:scale-95 transition flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Log Clinical Vitals</span>
            </button>

            {!pledgeState.isPledgedToday ? (
              <button
                onClick={handlePledgeToday}
                className="py-3.5 px-5 rounded-2xl bg-indigo-950/80 text-white font-black text-xs sm:text-sm shadow-xl hover:bg-indigo-900 active:scale-95 transition flex items-center space-x-2 border border-white/20"
              >
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Take Sobriety Pledge</span>
              </button>
            ) : (
              <div className="py-3.5 px-5 rounded-2xl bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/30 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-300" />
                <span>Pledge Completed Today ✓</span>
              </div>
            )}

            <button
              onClick={() => setIsCravingModalOpen(true)}
              className="py-3.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Log Craving</span>
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Clinical Vitals & Sobriety Streak Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sobriety Streak Widget */}
        <div className={`md:col-span-4 p-6 rounded-3xl border shadow-xl flex items-center justify-between transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Sobriety Streak</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                {profile.recoveryStreak || 1}
              </span>
              <span className="text-sm font-bold text-slate-400">Days Clean</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Focus: {profile.addictionType || 'Substance Recovery'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex flex-col items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6 mb-1" />
            <span className="text-[10px]">On Track</span>
          </div>
        </div>

        {/* Clinical Vitals Summary Widget */}
        <div 
          onClick={() => setIsVitalsModalOpen(true)}
          className={`md:col-span-4 p-6 rounded-3xl border shadow-xl flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-all ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Stethoscope className="w-4 h-4 text-indigo-500" />
              <span>Clinical Vitals Summary</span>
            </div>
            <div className="flex items-baseline space-x-3">
              <div>
                <span className="text-xl font-black block text-indigo-600 dark:text-indigo-400">BP {vitals.bloodPressure}</span>
                <span className="text-xs font-bold text-sky-500">SpO2 {vitals.spo2}% • {vitals.heartRate} BPM</span>
              </div>
            </div>
            <p className="text-[11px] text-indigo-500 font-semibold mt-1">
              Tap to Log Vitals
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex flex-col items-center justify-center font-bold">
            <Heart className="w-6 h-6 animate-pulse" />
            <span className="text-[10px]">Normal</span>
          </div>
        </div>

        {/* Mood Logger Widget */}
        <div 
          onClick={onOpenMoodModal}
          className={`md:col-span-4 p-6 rounded-3xl border shadow-xl flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-all ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Mood Today</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">
                {latestMood.mood === 'Happy' ? '😊' : latestMood.mood === 'Sad' ? '😢' : latestMood.mood === 'Anxiety' ? '😰' : '😌'}
              </span>
              <div>
                <span className="text-xl font-bold block">{latestMood.mood || 'Calm'}</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Tap to Update</span>
              </div>
            </div>
          </div>

          <span className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold border border-indigo-500/20">
            Edit Mood
          </span>
        </div>

      </div>

      {/* Calming Soundscapes & Sensory Grounding Launcher Banner */}
      <div 
        onClick={() => setIsSoundscapeModalOpen(true)}
        className={`p-6 rounded-3xl border cursor-pointer shadow-xl flex items-center justify-between hover:border-indigo-500 transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shadow-md">
            <Volume2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold">Calming Soundscapes (Binaural Audio Grounding)</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Listen to gentle rain, ocean waves, or 432 Hz alpha frequencies to soothe acute urges
            </p>
          </div>
        </div>

        <button className="hidden sm:inline-flex py-2.5 px-5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-md hover:bg-indigo-700 transition">
          Play Audio
        </button>
      </div>

      {/* Organ Health Restoration Quick Preview Bar */}
      <div className={`p-6 rounded-3xl border shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold">Organ Health Restoration Progress</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                3 of 6 clinical health milestones fully achieved
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('progress')}
            className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
          >
            <span>View Full Timeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HEALTH_RECOVERY_MILESTONES.slice(0, 3).map((m) => (
            <div key={m.id} className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 block mb-0.5">{m.timeframe}</span>
              <span className="font-extrabold block text-slate-900 dark:text-white truncate">{m.title}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 line-clamp-1">{m.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Relapse Risk Predictor Widget */}
      <AIRelapsePredictor isDarkMode={isDarkMode} />

      {/* RecoverAI BioTracker Vitals Widget */}
      <BioTrackerWidget isDarkMode={isDarkMode} />

      {/* Gen AI Feature Showcase Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Full Gen AI Recovery Suite</span>
          </h2>

          <button
            onClick={() => setIsDailyPlannerOpen(true)}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Open AI Morning Planner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {genAiFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={feat.action}
                className={`p-5 rounded-3xl border cursor-pointer transition-all hover:scale-[1.02] shadow-xl group ${
                  isDarkMode
                    ? 'bg-slate-900/90 border-slate-800 text-white hover:border-indigo-500'
                    : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-500'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.gradient} text-white flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{feat.title}</h3>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {feat.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guided Breathing Exercise Banner */}
      <div 
        onClick={onOpenBreathingModal}
        className={`p-6 rounded-3xl border cursor-pointer shadow-xl flex items-center justify-between hover:border-indigo-500 transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold shadow-md">
            <Wind className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold">Quick 30s Guided Box Breathing</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Press to lower anxiety, panic waves, and cravings instantly
            </p>
          </div>
        </div>

        <button className="hidden sm:inline-flex py-2.5 px-5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-md hover:bg-indigo-700 transition">
          Start Session
        </button>
      </div>

      {/* Daily Motivation Quote Ticker */}
      <div className={`p-6 rounded-3xl border relative overflow-hidden shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            <Quote className="w-4 h-4 text-indigo-500" />
            <span>Daily Recovery Motivation</span>
          </div>

          <button
            onClick={handleNextQuote}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm sm:text-base font-bold italic leading-relaxed text-indigo-600 dark:text-indigo-400">
          "{DAILY_MOTIVATION_QUOTES[quoteIdx].quote}"
        </p>
        <span className="text-xs text-slate-400 font-semibold block mt-2">
          — {DAILY_MOTIVATION_QUOTES[quoteIdx].author}
        </span>
      </div>

      {/* Modals */}
      <AIDailyPlannerModal
        isOpen={isDailyPlannerOpen}
        onClose={() => setIsDailyPlannerOpen(false)}
        isDarkMode={isDarkMode}
      />

      <CravingLoggerModal
        isOpen={isCravingModalOpen}
        onClose={() => setIsCravingModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <MeetingCheckinModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <SoundscapePlayerModal
        isOpen={isSoundscapeModalOpen}
        onClose={() => setIsSoundscapeModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <LogHealthVitalsModal
        isOpen={isVitalsModalOpen}
        onClose={() => setIsVitalsModalOpen(false)}
        onVitalsSaved={(updatedProfile) => setProfileState(updatedProfile)}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
