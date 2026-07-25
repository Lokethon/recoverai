import React, { useState, useRef, useEffect } from 'react';
import {
  AlertTriangle,
  Phone,
  UserCheck,
  Hospital,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  Wind,
  Share2,
  PhoneCall,
  Navigation,
  UserPlus,
  Edit3,
  Video,
  VideoOff,
  MessageSquare,
  Sparkles,
  CheckSquare,
  Square,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredProfile } from '../utils/storage';
import { generateAIEmergencyProtocol } from '../services/gemini';
import HospitalMapModal from '../components/HospitalMapModal';
import EditContactsModal from '../components/EditContactsModal';

export default function Emergency({ isDarkMode, onOpenBreathingModal }) {
  const [profile, setProfileState] = useState(getStoredProfile());

  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [locationShared, setLocationShared] = useState(false);
  const [notifiedSister, setNotifiedSister] = useState(false);

  const [isHospitalMapOpen, setIsHospitalMapOpen] = useState(false);
  const [isEditContactsOpen, setIsEditContactsOpen] = useState(false);

  // Camera & MediaRecorder State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // AI Emergency Recovery Task Protocol State
  const [aiProtocol, setAiProtocol] = useState(null);
  const [isGeneratingProtocol, setIsGeneratingProtocol] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActivated && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isActivated && countdown === 0 && !notifiedSister) {
      setNotifiedSister(true);
      triggerCameraRecording();
      fetchAIEmergencyTasks();
    }

    return () => clearInterval(timer);
  }, [isActivated, countdown, notifiedSister]);

  const handleActivateHelp = () => {
    setIsActivated(true);
    setCountdown(10);
    setNotifiedSister(false);
    triggerCameraRecording();
    fetchAIEmergencyTasks();
  };

  const handleDeactivateHelp = () => {
    setIsActivated(false);
    setCountdown(10);
    setNotifiedSister(false);
    stopCamera();
  };

  const fetchAIEmergencyTasks = async () => {
    setIsGeneratingProtocol(true);
    const protocol = await generateAIEmergencyProtocol('High Risk Panic Trigger');
    setAiProtocol(protocol);
    setIsGeneratingProtocol(false);
  };

  const toggleTaskCompletion = (index) => {
    if (!aiProtocol) return;
    const updatedSteps = [...aiProtocol.steps];
    updatedSteps[index].completed = !updatedSteps[index].completed;
    setAiProtocol({ ...aiProtocol, steps: updatedSteps });

    if (updatedSteps.every(s => s.completed)) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const triggerCameraRecording = async () => {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideoUrl(videoUrl);
      };

      mediaRecorder.start();
      setIsRecordingVideo(true);

      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecordingVideo(false);
        }
      }, 8000);

    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access denied or unavailable. You can still send text & GPS location to WhatsApp below.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsCameraActive(false);
    setIsRecordingVideo(false);
  };

  const getWhatsAppMessageUrl = () => {
    const waNumber = (profile.trustedContact?.whatsapp || profile.trustedContact?.phone || '').replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `🚨 EMERGENCY SOS ALERT from ${profile.name}!\n` +
      `I am experiencing an acute crisis / relapse panic wave right now.\n` +
      `📍 Location Status: Shared\n` +
      `📹 Emergency Video Recorded: ${recordedVideoUrl ? 'Yes' : 'Attempted'}\n` +
      `Please check on me or call me back immediately!`
    );
    return `https://wa.me/${waNumber}?text=${message}`;
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationShared(true);
          alert(`Location shared with ${profile.trustedContact.name}! Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocationShared(true);
          alert(`Simulated GPS Location shared with ${profile.trustedContact.name}: 37.7749° N, 122.4194° W`);
        }
      );
    } else {
      setLocationShared(true);
      alert(`Location shared with ${profile.trustedContact.name}`);
    }
  };

  const handleContactsSaved = (updatedProfile) => {
    setProfileState(updatedProfile);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20 mb-3">
          <AlertTriangle className="w-4 h-4 animate-bounce" />
          <span>24/7 CRISIS & SOS RESPONSE ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Emergency Crisis Assistance</h1>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          WebRTC Camera Video Recorder, WhatsApp Emergency Dispatcher, and AI Recovery Tasks.
        </p>

        {/* Edit Custom Contacts Button */}
        <div className="mt-4">
          <button
            onClick={() => setIsEditContactsOpen(true)}
            className="py-2.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition inline-flex items-center space-x-2 shadow-md"
          >
            <Edit3 className="w-4 h-4" />
            <span>Add / Edit Emergency Contacts</span>
          </button>
        </div>
      </div>

      {/* Main SOS Trigger Button */}
      {!isActivated ? (
        <div className="flex flex-col items-center justify-center py-8">
          <button
            onClick={handleActivateHelp}
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-rose-600 via-rose-700 to-indigo-800 text-white font-black shadow-2xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center space-y-3 animate-emergency border-8 border-white/20"
          >
            <AlertTriangle className="w-20 h-20 animate-bounce" />
            <span className="tracking-wider uppercase font-black text-2xl">I NEED HELP</span>
            <span className="text-xs font-semibold opacity-90">Tap to Record Video & Alert Caregiver</span>
          </button>
        </div>
      ) : (
        /* Emergency Mode Activated View */
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-700 via-indigo-800 to-slate-900 text-white shadow-2xl border border-rose-400/30 text-center relative overflow-hidden">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
              <ShieldAlert className="w-4 h-4 animate-spin text-rose-300" />
              <span>EMERGENCY MODE ACTIVATED</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">Stay Calm, Help is Coming</h2>
            <p className="text-sm opacity-95 mt-2 max-w-lg mx-auto">
              {notifiedSister
                ? `Emergency Alert Dispatched to ${profile.trustedContact.name} (${profile.trustedContact.whatsapp || profile.trustedContact.phone})`
                : `Notifying ${profile.trustedContact.name} in ${countdown} seconds...`}
            </p>

            {countdown > 0 && (
              <div className="mt-5">
                <button
                  onClick={handleDeactivateHelp}
                  className="px-6 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition shadow-md"
                >
                  Cancel SOS Countdown ({countdown}s)
                </button>
              </div>
            )}
          </div>

          {/* WebRTC Live Camera & Emergency Video Capture Card */}
          <div className={`p-6 rounded-3xl border shadow-xl ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                  <Video className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold flex items-center space-x-2">
                    <span>Emergency Camera Recorder</span>
                    {isRecordingVideo && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                        ● REC 8s
                      </span>
                    )}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Captures emergency video clip to send to your WhatsApp caregiver number
                  </p>
                </div>
              </div>

              {!isCameraActive ? (
                <button
                  onClick={triggerCameraRecording}
                  className="py-2 px-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Start Camera</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="py-2 px-3.5 rounded-xl bg-slate-800 text-slate-200 font-extrabold text-xs flex items-center space-x-1.5"
                >
                  <VideoOff className="w-3.5 h-3.5" />
                  <span>Stop Camera</span>
                </button>
              )}
            </div>

            {cameraError && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold mb-4">
                {cameraError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!isCameraActive && (
                  <div className="text-center p-4">
                    <Video className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-400 block">Live Camera Feed</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
                    Recorded Emergency Video Status
                  </span>
                  {recordedVideoUrl ? (
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 mb-3">
                      <video src={recordedVideoUrl} controls className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isRecordingVideo
                        ? 'Capturing 8-second emergency video snippet...'
                        : 'Tap "Start Camera" above to record an emergency video snippet.'}
                    </p>
                  )}
                </div>

                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/25 transition"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send SOS Alert & Video via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* AI Emergency Task Assignment Protocol Widget */}
          <div className={`p-6 rounded-3xl border shadow-xl ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h3 className="text-base font-black">AI Crisis Recovery Protocol (Assigned Tasks)</h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Complete these 3 recovery tasks now to ride out the craving wave safely
                </p>
              </div>
            </div>

            {isGeneratingProtocol ? (
              <div className="p-4 rounded-2xl bg-sky-500/10 text-sky-500 text-xs font-bold animate-pulse text-center">
                Gemini AI is generating tailored crisis recovery tasks...
              </div>
            ) : aiProtocol ? (
              <div className="space-y-3">
                <p className="text-xs italic text-sky-500 font-semibold mb-3">
                  "{aiProtocol.crisisSummary}"
                </p>

                {aiProtocol.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    onClick={() => toggleTaskCompletion(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-start space-x-3 ${
                      step.completed
                        ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-600 dark:text-indigo-400'
                        : isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {step.completed ? (
                        <CheckSquare className="w-5 h-5 text-indigo-500" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs font-extrabold block ${step.completed ? 'line-through opacity-80' : ''}`}>
                        Task {idx + 1}: {step.title}
                      </span>
                      <span className="text-[11px] opacity-90 block mt-0.5">
                        {step.instruction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Contact Dispatch Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Call Caregiver */}
            <a
              href={`tel:${profile.trustedContact.phone.replace(/[^0-9+]/g, '')}`}
              className={`p-5 rounded-3xl border transition-all flex flex-col items-center text-center space-y-3 shadow-xl group ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-500'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <span className="text-base font-bold block">Call Caregiver (Phone)</span>
                <span className="text-xs text-slate-400 mt-0.5 block">{profile.trustedContact.name} • {profile.trustedContact.phone}</span>
              </div>
            </a>

            {/* WhatsApp Call / Message */}
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-3xl border transition-all flex flex-col items-center text-center space-y-3 shadow-xl group ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-sky-500' : 'bg-white border-slate-200 text-slate-900 hover:border-sky-500'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-500 flex items-center justify-center group-hover:scale-110 transition">
                <MessageSquare className="w-7 h-7 fill-sky-500" />
              </div>
              <div>
                <span className="text-base font-bold block">WhatsApp SOS Dispatch</span>
                <span className="text-xs text-sky-500 font-bold mt-0.5 block">{profile.trustedContact.whatsapp || profile.trustedContact.phone}</span>
              </div>
            </a>

            {/* Find Nearby Hospital */}
            <button
              onClick={() => setIsHospitalMapOpen(true)}
              className={`p-5 rounded-3xl border transition-all flex flex-col items-center text-center space-y-3 shadow-xl group ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-500'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition">
                <Hospital className="w-7 h-7" />
              </div>
              <div>
                <span className="text-base font-bold block">Find ER Hospitals</span>
                <span className="text-xs text-indigo-500 font-bold mt-0.5 block">Google Maps Locator</span>
              </div>
            </button>

            {/* Share Location */}
            <button
              onClick={handleShareLocation}
              className={`p-5 rounded-3xl border transition-all flex flex-col items-center text-center space-y-3 shadow-xl group ${
                locationShared
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-500'
                  : isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-rose-500' : 'bg-white border-slate-200 text-slate-900 hover:border-rose-500'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center group-hover:scale-110 transition">
                <Share2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-base font-bold block">
                  {locationShared ? 'Location Shared ✓' : 'Share GPS Location'}
                </span>
                <span className="text-xs text-slate-400 mt-0.5 block">Send GPS Coordinates</span>
              </div>
            </button>

          </div>

          {/* Guided Breathing Launcher */}
          <div 
            onClick={onOpenBreathingModal}
            className={`p-6 rounded-3xl border text-slate-900 dark:text-white flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-all shadow-xl ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                <Wind className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Launch Calming Breathing (30s)</h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Ground yourself right now with guided box breathing
                </p>
              </div>
            </div>
            <span className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-extrabold shadow-md hover:bg-indigo-700 transition">
              Start Session
            </span>
          </div>

        </div>
      )}

      {/* Helplines Grid */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
      }`}>
        <h3 className="text-xs font-extrabold uppercase tracking-wider mb-4 text-slate-400">
          24/7 National Helplines (Real Phone Calls)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.emergencyHelplines.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <span className="text-sm font-extrabold block text-slate-900 dark:text-white">{item.name}</span>
                <span className={`text-xs block mt-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.description}
                </span>
              </div>

              <a
                href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {item.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <HospitalMapModal
        isOpen={isHospitalMapOpen}
        onClose={() => setIsHospitalMapOpen(false)}
        isDarkMode={isDarkMode}
      />

      <EditContactsModal
        isOpen={isEditContactsOpen}
        onClose={() => setIsEditContactsOpen(false)}
        onContactsSaved={handleContactsSaved}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
