import React, { useState } from 'react';
import {
  Activity,
  Calendar,
  BookOpen,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Flame,
  Heart,
  Brain,
  MessageSquare,
  Droplet,
  Moon,
  Wind,
  CheckCircle2,
  Users,
  AlertCircle,
  Stethoscope,
  LineChart as LineChartIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import {
  getStoredMoodHistory,
  getStoredRiskTrend,
  getStoredJournals,
  addJournalEntry,
  updateJournalEntry,
  getStoredProfile,
  saveStoredProfile,
  getCravingLogs,
  getMeetingLogs
} from '../utils/storage';
import { HEALTH_RECOVERY_MILESTONES, CLINICAL_VITAL_SERIES } from '../utils/mockData';
import { generateAICBTInsight } from '../services/gemini';
import CravingLoggerModal from '../components/CravingLoggerModal';
import MeetingCheckinModal from '../components/MeetingCheckinModal';
import LogHealthVitalsModal from '../components/LogHealthVitalsModal';

export default function Progress({ isDarkMode }) {
  const [profile, setProfileState] = useState(getStoredProfile());
  const [moodHistory, setMoodHistory] = useState(getStoredMoodHistory());
  const [riskTrend, setRiskTrend] = useState(getStoredRiskTrend());
  const [journals, setJournals] = useState(getStoredJournals());
  const [cravingLogs, setCravingLogs] = useState(getCravingLogs());
  const [meetingLogs, setMeetingLogs] = useState(getMeetingLogs());

  const [newJournalText, setNewJournalText] = useState('');
  const [newJournalMood, setNewJournalMood] = useState('😊 Calm');
  const [newJournalTrigger, setNewJournalTrigger] = useState('None');
  const [isAddingJournal, setIsAddingJournal] = useState(false);

  const [isCravingModalOpen, setIsCravingModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [analyzingJournalId, setAnalyzingJournalId] = useState(null);

  const vitals = profile.latestVitals || {
    bloodPressure: "118/76",
    spo2: 98,
    heartRate: 68,
    hrvMs: 62,
    sleepHours: 7.5,
    exerciseMins: 35,
    withdrawalIndex: "0/10 (Stable)",
    updatedAt: "Jul 25, 2026"
  };

  const handleAddWater = () => {
    const current = profile.waterIntakeLiters || 2.4;
    const updatedVol = Number((current + 0.25).toFixed(2));
    const updatedProfile = { ...profile, waterIntakeLiters: updatedVol };
    saveStoredProfile(updatedProfile);
    setProfileState(updatedProfile);
  };

  const handleCreateJournal = async (e) => {
    e.preventDefault();
    if (!newJournalText.trim()) return;

    const rawText = newJournalText.trim();
    const cbtInsight = await generateAICBTInsight(rawText);

    const entry = {
      id: `j-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: newJournalMood,
      text: rawText,
      trigger: newJournalTrigger,
      cbtInsight: cbtInsight
    };

    const updated = addJournalEntry(entry);
    setJournals(updated);
    setNewJournalText('');
    setIsAddingJournal(false);
  };

  const handleAnalyzeJournalCBT = async (journalId, text) => {
    setAnalyzingJournalId(journalId);
    const insight = await generateAICBTInsight(text);
    const updated = updateJournalEntry(journalId, { cbtInsight: insight });
    setJournals(updated);
    setAnalyzingJournalId(null);
  };

  const filteredJournals = journals.filter(
    (j) =>
      j.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.trigger.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      
      {/* Professional Medical Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold border border-indigo-500/20 mb-2">
            <Stethoscope className="w-4 h-4" />
            <span>CLINICAL EHR & MEDICAL RECOVERY DASHBOARD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Professional Medical Dashboard</h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Patient ID: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">#REC-84920</span> • Last Vitals Logged: {vitals.updatedAt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setIsVitalsModalOpen(true)}
            className="py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg transition flex items-center space-x-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Log Health Vitals</span>
          </button>

          <button
            onClick={() => setIsCravingModalOpen(true)}
            className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Log Craving Spike</span>
          </button>
        </div>
      </div>

      {/* EHR Clinical Biomarkers Grid (8 Vitals Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        
        {/* Blood Pressure */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Blood Pressure</span>
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{vitals.bloodPressure}</span>
          <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">Optimal Range</span>
        </div>

        {/* Blood Oxygen SpO2 */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Blood SpO2</span>
          <span className="text-lg font-black text-sky-500">{vitals.spo2}%</span>
          <span className="text-[10px] text-sky-500 font-bold block mt-0.5">Normal Saturation</span>
        </div>

        {/* Resting Heart Rate */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Heart Rate</span>
          <span className="text-lg font-black text-rose-500">{vitals.heartRate} BPM</span>
          <span className="text-[10px] text-rose-500 font-bold block mt-0.5">Resting Normal</span>
        </div>

        {/* HRV Stress Score */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">HRV Biomarker</span>
          <span className="text-lg font-black text-indigo-500">{vitals.hrvMs} ms</span>
          <span className="text-[10px] text-indigo-500 font-bold block mt-0.5">Low Stress</span>
        </div>

        {/* Sleep Duration */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Sleep Architecture</span>
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{vitals.sleepHours} hrs</span>
          <span className="text-[10px] text-indigo-500 font-bold block mt-0.5">Deep REM Restored</span>
        </div>

        {/* Hydration */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Hydration Detox</span>
          <span className="text-lg font-black text-sky-500">{profile.waterIntakeLiters || 2.4}L</span>
          <button onClick={handleAddWater} className="text-[10px] font-bold text-sky-500 underline block mt-0.5">+250ml</button>
        </div>

        {/* Physical Activity */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Daily Exercise</span>
          <span className="text-lg font-black text-amber-500">{vitals.exerciseMins} mins</span>
          <span className="text-[10px] text-amber-500 font-bold block mt-0.5">Active Neurogenesis</span>
        </div>

        {/* Withdrawal Scale */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Withdrawal Scale</span>
          <span className="text-lg font-black text-emerald-500">{vitals.withdrawalIndex}</span>
          <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">COWS/CIWA Clinical</span>
        </div>

      </div>

      {/* Clinical Physiological Vital Trends Multi-Line Chart */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black flex items-center space-x-2">
              <LineChartIcon className="w-5 h-5 text-indigo-500" />
              <span>7-Day Physiological Vitals Multi-Series Analytics</span>
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Tracking Systolic BP (mmHg), Heart Rate (BPM), SpO2 (%) and HRV stress response
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span><span>BP Systolic</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>Heart Rate</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span><span>SpO2</span></span>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CLINICAL_VITAL_SERIES}>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[50, 140]} stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
              <Line type="monotone" dataKey="bpSystolic" name="BP Systolic" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="heartRate" name="Heart Rate" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="spo2" name="SpO2 %" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clinical Body & Organ Health Recovery Timeline */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black">Physiological Organ & Brain Recovery Timeline</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Clinical progression of body self-repair milestones based on Day {profile.recoveryStreak || 1} clean
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HEALTH_RECOVERY_MILESTONES.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${
                m.achieved
                  ? 'bg-indigo-500/10 border-indigo-500/30'
                  : isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {m.timeframe}
                  </span>
                  {m.achieved ? (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Restored</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">
                      {m.progressPercent}% Completed
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-extrabold leading-snug">{m.title}</h4>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {m.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${m.progressPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Group Meetings Check-in History */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">AA / NA / SMART Support Group Log</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Peer commitment records ({profile.supportMeetingsAttended || 14} meetings clean)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMeetingModalOpen(true)}
            className="py-2.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Check into Meeting</span>
          </button>
        </div>

        <div className="space-y-3">
          {meetingLogs.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-black text-sky-500">{m.type}</span>
                <span className="text-[11px] font-extrabold text-slate-400">{m.date} • {m.location}</span>
              </div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">Topic: {m.topic}</span>
              {m.notes && (
                <p className={`text-xs mt-1 italic ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  "{m.notes}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recharts Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Mood History Chart */}
        <div className={`p-6 rounded-3xl border shadow-xl ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-base font-extrabold mb-1">7-Day Mood & Dopamine Trend</h3>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Higher values indicate positive emotional state (1-5)
          </p>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodHistory}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 5]} stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#moodGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Craving Intensity Log Bar Chart */}
        <div className={`p-6 rounded-3xl border shadow-xl ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-extrabold">Craving Surge Logs (1-10 Scale)</h3>
            <button
              onClick={() => setIsCravingModalOpen(true)}
              className="py-1 px-3 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Craving</span>
            </button>
          </div>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Track craving spikes to build neural impulse control
          </p>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cravingLogs}>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="intensity" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recovery Journal Manager with Gemini CBT Reframing */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-black">Personal Recovery Journal</h3>
              <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Write reflections and generate cognitive behavioral therapy (CBT) insights using Gemini AI
            </p>
          </div>

          <button
            onClick={() => setIsAddingJournal(!isAddingJournal)}
            className="py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Journal Reflection</span>
          </button>
        </div>

        {/* New Journal Entry Form */}
        {isAddingJournal && (
          <form onSubmit={handleCreateJournal} className="mb-6 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              New Journal Reflection
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Select Mood</label>
                <select
                  value={newJournalMood}
                  onChange={(e) => setNewJournalMood(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs outline-none border ${
                    isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="😊 Calm">😊 Calm</option>
                  <option value="😃 Happy">😃 Happy</option>
                  <option value="😢 Sad">😢 Sad</option>
                  <option value="😰 Anxious">😰 Anxious</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Trigger (If Any)</label>
                <input
                  type="text"
                  value={newJournalTrigger}
                  onChange={(e) => setNewJournalTrigger(e.target.value)}
                  placeholder="e.g. Work Stress / Loneliness"
                  className={`w-full px-3.5 py-2 rounded-xl text-xs outline-none border ${
                    isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Reflection Notes</label>
              <textarea
                required
                rows={3}
                value={newJournalText}
                onChange={(e) => setNewJournalText(e.target.value)}
                placeholder="How did you handle your cravings or thoughts today?"
                className={`w-full p-3 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddingJournal(false)}
                className="py-2 px-4 rounded-xl text-xs font-bold text-slate-500 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md hover:bg-indigo-700 transition"
              >
                Save & Analyze Entry
              </button>
            </div>
          </form>
        )}

        {/* Search Bar */}
        <div className="relative max-w-sm mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past journal reflections..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs outline-none border ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>

        {/* Journal Entries List */}
        <div className="space-y-4">
          {filteredJournals.map((j) => (
            <div
              key={j.id}
              className={`p-5 rounded-2xl border transition ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">{j.mood}</span>
                  <span className="text-xs font-extrabold text-slate-400">• {j.date} ({j.time})</span>
                </div>
                {j.trigger && j.trigger !== 'None' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20">
                    Trigger: {j.trigger}
                  </span>
                )}
              </div>

              <p className={`text-xs leading-relaxed mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {j.text}
              </p>

              {/* Gemini CBT Insight Box */}
              {j.cbtInsight ? (
                <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold leading-relaxed">
                  🧠 <span className="font-extrabold text-indigo-500">Gemini CBT Therapy Insight:</span> "{j.cbtInsight}"
                </div>
              ) : (
                <button
                  onClick={() => handleAnalyzeJournalCBT(j.id, j.text)}
                  disabled={analyzingJournalId === j.id}
                  className="py-1.5 px-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold hover:bg-indigo-500/20 transition flex items-center space-x-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>{analyzingJournalId === j.id ? 'Analyzing CBT Insight...' : 'Get Gemini CBT Insight'}</span>
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      <CravingLoggerModal
        isOpen={isCravingModalOpen}
        onClose={() => setIsCravingModalOpen(false)}
        onCravingLogged={(updatedLogs) => setCravingLogs(updatedLogs)}
        isDarkMode={isDarkMode}
      />

      <MeetingCheckinModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        onMeetingLogged={(updatedMeetings) => setMeetingLogs(updatedMeetings)}
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
