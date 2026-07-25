import React, { useState } from 'react';
import {
  HeartPulse,
  Settings,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  LogOut,
  User,
  Shield,
  Phone,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onOpenSettings,
  isOffline,
  setIsOffline,
  currentUser,
  isLoggedIn,
  onOpenLogin,
  onLogout
}) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'RA';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
      isDarkMode
        ? 'bg-slate-950/80 border-slate-800 text-slate-100'
        : 'bg-white/90 border-slate-200/80 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tag */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-sky-600 to-slate-900 dark:from-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
                RecoverAI
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
                PROMPTWARS
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block -mt-0.5">
              Your AI Recovery Companion
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          {[
            { id: 'home', label: 'Home' },
            { id: 'chat', label: 'Talk to AI' },
            { id: 'emergency', label: 'Emergency SOS' },
            { id: 'resources', label: 'Resources' },
            { id: 'progress', label: 'Progress & Journal' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Offline Mode Switch */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            title={isOffline ? 'Offline Heuristic Engine Enabled' : 'Online Gemini API Mode'}
            className={`p-2.5 rounded-2xl border transition-all ${
              isOffline
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-indigo-500'
            }`}
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          </button>

          {/* Gemini API Key Settings */}
          <button
            onClick={onOpenSettings}
            title="Configure Gemini API Key"
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Light / Dark Mode Switch */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Light / Dark Mode"
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Profile Avatar Dropdown */}
          {isLoggedIn && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition"
              >
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  {getInitials(currentUser.name)}
                </div>
                <span className="text-xs font-bold hidden sm:inline max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <span className="text-xs font-extrabold block truncate">{currentUser.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">{currentUser.email}</span>
                  </div>

                  <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl text-[11px] font-bold mb-2 text-center">
                    🔥 {currentUser.recoveryStreak || 1} Days Recovery Streak
                  </div>

                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full p-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-bold transition flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="py-2 px-4 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs shadow-md hover:bg-indigo-700 transition"
            >
              Sign In
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
