import React, { useState } from 'react';
import {
  HeartPulse,
  Lock,
  Mail,
  User,
  LogIn,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  ArrowRight,
  Heart
} from 'lucide-react';
import { setAuthSession, saveStoredProfile, INITIAL_USER_PROFILE } from '../utils/storage';
import { generateEmailVerificationCode, isValidEmail } from '../utils/security';

export default function LandingLogin({ onLoginSuccess, isDarkMode }) {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [sentOtpCode, setSentOtpCode] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false);

  const [emailNotice, setEmailNotice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendEmailVerification = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() && isRegister) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    const code = generateEmailVerificationCode();
    setSentOtpCode(code);
    setIsOtpStep(true);

    setEmailNotice(`📧 Verification Email dispatched to ${email}! Check your inbox. (Demo Verification OTP Code: ${code})`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (verificationCode.trim() !== sentOtpCode) {
      setErrorMsg('Invalid verification OTP code. Please check your email notice above.');
      return;
    }

    const registeredName = name.trim() || email.split('@')[0] || 'User';
    const profile = {
      name: registeredName,
      email: email.trim(),
      age: 26,
      recoveryStreak: 1,
      startDate: new Date().toISOString().split('T')[0],
      trustedContact: {
        name: "Primary Caregiver",
        relation: "Family Support",
        phone: "+1 (555) 382-9910",
        whatsapp: "+15553829910"
      },
      therapistContact: {
        name: "Dr. Ananya Sharma",
        relation: "Addiction Specialist",
        phone: "+1 (555) 901-4433",
        whatsapp: "+15559014433"
      },
      emergencyHelplines: INITIAL_USER_PROFILE.emergencyHelplines
    };

    saveStoredProfile(profile);
    setAuthSession({ isLoggedIn: true, user: profile });
    if (onLoginSuccess) onLoginSuccess(profile);
  };

  const handleDemoQuickLogin = (demoName = 'Lokesh') => {
    const demoProfile = {
      ...INITIAL_USER_PROFILE,
      name: demoName,
      email: `${demoName.toLowerCase()}@example.com`
    };
    saveStoredProfile(demoProfile);
    setAuthSession({ isLoggedIn: true, user: demoProfile });
    if (onLoginSuccess) onLoginSuccess(demoProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Real-World Hero Graphic */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold border border-indigo-500/20">
            <HeartPulse className="w-4 h-4 animate-pulse" />
            <span>AI RECOVERY & RELAPSE PREVENTION PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Your Personal AI Companion for <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-slate-900 dark:from-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">Sobriety & Health</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Register your account to access 24/7 instant voice emotional support, real-time clinical BioTracker vitals monitoring, relapse trigger analysis, and WebRTC camera emergency response.
          </p>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-video group">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80"
              alt="Mindfulness and Recovery Wellness"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">Empowering Wellness</span>
                <p className="text-sm font-extrabold">Register today to start tracking your sobriety streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication & OTP Registration Form */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 p-0.5 mx-auto mb-3 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <HeartPulse className="w-6 h-6 text-sky-400 animate-pulse" />
                </div>
              </div>

              <h2 className="text-2xl font-black">
                {isOtpStep ? 'Verify Email OTP Code' : isRegister ? 'Register Your Account' : 'Sign In to RecoverAI'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isOtpStep ? 'Enter the 6-digit code dispatched to your email' : 'Please enter your name and credentials to continue'}
              </p>
            </div>

            {emailNotice && (
              <div className="mb-5 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold leading-relaxed animate-bounce">
                {emailNotice}
              </div>
            )}

            {errorMsg && (
              <div className="mb-5 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold text-center">
                {errorMsg}
              </div>
            )}

            {!isOtpStep ? (
              <form onSubmit={handleSendEmailVerification} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Your Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lokesh Kumar"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm outline-none border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="lokesh@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm outline-none border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm outline-none border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Send Email Verification OTP</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-center">
                    Enter 6-Digit Email Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="482910"
                    className="w-full px-4 py-3.5 rounded-2xl text-center text-xl font-extrabold tracking-widest outline-none border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-indigo-600 focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-5 h-5 fill-white" />
                  <span>Verify Code & Login as {name || 'User'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOtpStep(false)}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:underline"
                >
                  Change Name / Email
                </button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
              <button
                type="button"
                onClick={() => handleDemoQuickLogin('Lokesh')}
                className="w-full py-3 px-4 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-extrabold hover:bg-sky-500/20 transition flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>1-Click Demo Login (Continue as Lokesh)</span>
              </button>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isRegister ? 'Already registered?' : "Need a new account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setErrorMsg('');
                    setIsOtpStep(false);
                  }}
                  className="text-indigo-600 dark:text-indigo-400 font-extrabold underline ml-1"
                >
                  {isRegister ? 'Sign In' : 'Register Now'}
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
