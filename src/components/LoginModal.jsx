import React, { useState } from 'react';
import { X, Lock, Mail, User, LogIn, HeartPulse, Check, Sparkles } from 'lucide-react';
import { setAuthSession, saveStoredProfile, INITIAL_USER_PROFILE } from '../utils/storage';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, isDarkMode }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter valid email and password.');
      return;
    }

    const userName = name.trim() || email.split('@')[0] || 'User';

    const userProfile = {
      ...INITIAL_USER_PROFILE,
      name: userName,
      email: email.trim()
    };

    saveStoredProfile(userProfile);
    setAuthSession({ isLoggedIn: true, user: userProfile });
    if (onLoginSuccess) onLoginSuccess(userProfile);
    onClose();
  };

  const handleDemoLogin = (demoName = 'Lokesh') => {
    const demoProfile = {
      ...INITIAL_USER_PROFILE,
      name: demoName,
      email: `${demoName.toLowerCase()}@example.com`
    };
    saveStoredProfile(demoProfile);
    setAuthSession({ isLoggedIn: true, user: demoProfile });
    if (onLoginSuccess) onLoginSuccess(demoProfile);
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

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mx-auto mb-3 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>

          <h3 className="text-2xl font-black">
            {isRegister ? 'Create Your Account' : 'Welcome to RecoverAI'}
          </h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Secure AI Relapse Prevention & Recovery Companion
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lokesh"
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm outline-none border ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4 fill-slate-950" />
            <span>{isRegister ? 'Sign Up' : 'Log In to RecoverAI'}</span>
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center space-y-3">
          <button
            onClick={() => handleDemoLogin('Lokesh')}
            className="w-full py-2.5 px-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold hover:bg-cyan-500/20 transition flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Demo Quick Login (Continue as Lokesh)</span>
          </button>

          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMsg('');
              }}
              className="text-emerald-400 font-bold underline ml-1"
            >
              {isRegister ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
