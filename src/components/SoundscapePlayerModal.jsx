import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Sparkles, CloudRain, Waves, Trees, Radio } from 'lucide-react';
import { AMBIENT_SOUNDSCAPES } from '../utils/mockData';

export default function SoundscapePlayerModal({ isOpen, onClose, isDarkMode }) {
  const [activeSoundId, setActiveSoundId] = useState('ocean');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscRef = useRef(null);

  const stopAudio = useCallback(() => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch (e) {
        // Audio already stopped
      }
      oscRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isOpen && isPlaying) {
      stopAudio();
    }
  }, [isOpen, isPlaying, stopAudio]);

  const startAudio = useCallback((freq) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (oscRef.current) {
        oscRef.current.stop();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq || 432, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio synthesis error:', e);
      setIsPlaying(true);
    }
  }, [volume]);

  const handleSelectSound = useCallback((sound) => {
    setActiveSoundId(sound.id);
    if (isPlaying) {
      startAudio(sound.freq);
    }
  }, [isPlaying, startAudio]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      const sound = AMBIENT_SOUNDSCAPES.find(s => s.id === activeSoundId) || AMBIENT_SOUNDSCAPES[0];
      startAudio(sound.freq);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        <button
          onClick={() => {
            stopAudio();
            onClose();
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition ${
            isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Volume2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black">Calming Soundscapes (Sensory Grounding)</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Binaural audio frequencies to quiet cravings & panic waves
            </p>
          </div>
        </div>

        {/* Sound Selection Grid */}
        <div className="space-y-2.5 mb-6">
          {AMBIENT_SOUNDSCAPES.map((sound) => {
            const isSelected = activeSoundId === sound.id;
            return (
              <div
                key={sound.id}
                onClick={() => handleSelectSound(sound)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-600 dark:text-indigo-400'
                    : isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black">{sound.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                      {sound.freq} Hz
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sound.desc}</p>
                </div>

                {isSelected && isPlaying && (
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-4 bg-indigo-500 rounded-full animate-pulse"></span>
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-3 bg-indigo-500 rounded-full animate-pulse"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Player Controls */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <button
            onClick={handleTogglePlay}
            className={`py-3 px-6 rounded-2xl font-black text-xs sm:text-sm shadow-lg transition flex items-center space-x-2 ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Pause Soundscape</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Play Soundscape</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
