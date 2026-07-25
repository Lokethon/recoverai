import React from 'react';
import { Home, Mic, AlertTriangle, BookOpen, Activity } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, isDarkMode }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Talk to AI', icon: Mic },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle, isSos: true },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: Activity }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1">
      <nav className={`max-w-md mx-auto rounded-3xl backdrop-blur-2xl p-2 border flex items-center justify-around shadow-2xl transition-colors ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800 text-slate-400'
          : 'bg-white/90 border-slate-200 text-slate-600 shadow-xl'
      }`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isSos) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-3 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-600/40 transform -translate-y-3 hover:scale-110 active:scale-95 transition-all ${
                  isActive ? 'ring-4 ring-rose-400/50' : ''
                }`}
              >
                <Icon className="w-6 h-6 animate-pulse" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105'
                  : 'hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
