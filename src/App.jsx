import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import BreathingExerciseModal from './components/BreathingExerciseModal';
import GeminiSettingsModal from './components/GeminiSettingsModal';
import MoodSelectorModal from './components/MoodSelectorModal';
import LoginModal from './components/LoginModal';

import Home from './pages/Home';
import VoiceChat from './pages/VoiceChat';
import Emergency from './pages/Emergency';
import Resources from './pages/Resources';
import Progress from './pages/Progress';
import LandingLogin from './pages/LandingLogin';

import { getAuthSession, setAuthSession } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false); // Crisp Apple Light Theme Default
  const [isOffline, setIsOffline] = useState(false);

  // Persistent Auth Session
  const [authSession, setSessionState] = useState(() => getAuthSession());

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.clear();
    const loggedOutSession = { isLoggedIn: false, user: null };
    setAuthSession(loggedOutSession);
    setSessionState(loggedOutSession);
  };

  const handleLoginSuccess = (userProfile) => {
    const newSession = { isLoggedIn: true, user: userProfile };
    setAuthSession(newSession);
    setSessionState(newSession);
  };

  // Auth Gate: Render Login Landing Page if not logged in
  if (!authSession.isLoggedIn || !authSession.user) {
    return (
      <LandingLogin
        onLoginSuccess={handleLoginSuccess}
        isDarkMode={isDarkMode}
      />
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            setActiveTab={setActiveTab}
            onOpenMoodModal={() => setIsMoodModalOpen(true)}
            onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
            isDarkMode={isDarkMode}
          />
        );
      case 'chat':
        return (
          <VoiceChat
            onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
            setActiveTab={setActiveTab}
            isDarkMode={isDarkMode}
            isOffline={isOffline}
          />
        );
      case 'emergency':
        return (
          <Emergency
            isDarkMode={isDarkMode}
            onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
          />
        );
      case 'resources':
        return (
          <Resources
            isDarkMode={isDarkMode}
            onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
          />
        );
      case 'progress':
        return (
          <Progress
            isDarkMode={isDarkMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        currentUser={authSession.user}
        isLoggedIn={authSession.isLoggedIn}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all">
        {renderActivePage()}
      </main>

      {/* Mobile Floating Bottom Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
      />

      {/* Modals & Overlays */}
      <BreathingExerciseModal
        isOpen={isBreathingModalOpen}
        onClose={() => setIsBreathingModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <GeminiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
      />

      <MoodSelectorModal
        isOpen={isMoodModalOpen}
        onClose={() => setIsMoodModalOpen(false)}
        onMoodSelected={(m) => console.log('Mood selected:', m)}
        isDarkMode={isDarkMode}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
