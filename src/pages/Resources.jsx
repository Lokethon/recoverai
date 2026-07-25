import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  ExternalLink,
  Search,
  Sparkles,
  MapPin,
  X,
  Hospital,
  HeartPulse,
  Brain,
  Video
} from 'lucide-react';
import { HEALTH_YOUTUBE_VIDEOS, RECOVERY_RESOURCES } from '../utils/mockData';
import HospitalMapModal from '../components/HospitalMapModal';

export default function Resources({ isDarkMode, _onOpenBreathingModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isHospitalMapOpen, setIsHospitalMapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Neuroscience', 'Brain Health', 'Coping Technique', 'Mindfulness'];

  const filteredVideos = HEALTH_YOUTUBE_VIDEOS.filter((v) => {
    const matchesCat = activeCategory === 'All' || v.category === activeCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold border border-indigo-500/20 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>RECOVERY SCIENCE & YOUTUBE HEALTH HUB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Recovery Resources & Education</h1>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Curated videos from Stanford Neuroscientists, medical articles, and 24/7 Google Maps ER location search.
        </p>
      </div>

      {/* Emergency ER Locator Action Banner */}
      <div className={`p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Hospital className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold">Find Nearby Rehabilitation Centers & ER Hospitals</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Interactive Google Maps search for emergency medical support near your location
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsHospitalMapOpen(true)}
          className="py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition flex items-center space-x-2 shrink-0"
        >
          <MapPin className="w-4 h-4" />
          <span>Search Hospitals on Google Maps</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : isDarkMode
                    ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lectures or topics..."
            className={`w-full pl-10 pr-4 py-2 rounded-2xl text-xs outline-none border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

      </div>

      {/* YouTube Lectures Video Grid */}
      <div>
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-1.5">
          <Video className="w-4 h-4 text-indigo-500" />
          <span>Curated Educational Videos & Stanford Lectures</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`group rounded-3xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] shadow-xl flex flex-col justify-between ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg backdrop-blur-md">
                    {video.duration}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    {video.category} • {video.speaker}
                  </span>
                  <h3 className="text-base font-extrabold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-snug">
                    {video.title}
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <span className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center space-x-1.5 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Play className="w-3.5 h-3.5" />
                  <span>Watch Video Lecture</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Articles Section */}
      <div className="pt-6">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-1.5">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>Evidence-Based Medical Guides</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECOVERY_RESOURCES.map((art) => (
            <div
              key={art.id}
              className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                  {art.category} • {art.readTime}
                </span>
                <h3 className="text-lg font-extrabold">{art.title}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {art.summary}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs leading-relaxed text-indigo-600 dark:text-indigo-400 font-medium">
                {art.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>

            <div className="p-2 text-white">
              <span className="text-xs font-bold text-indigo-400 block uppercase">
                {selectedVideo.category} • {selectedVideo.speaker}
              </span>
              <h3 className="text-xl font-black mt-1">{selectedVideo.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <HospitalMapModal
        isOpen={isHospitalMapOpen}
        onClose={() => setIsHospitalMapOpen(false)}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
