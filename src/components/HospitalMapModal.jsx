import React, { useState } from 'react';
import { X, Hospital, MapPin, Phone, ExternalLink, Navigation } from 'lucide-react';
import { NEARBY_HOSPITALS } from '../utils/mockData';

export default function HospitalMapModal({ isOpen, onClose, isDarkMode }) {
  const [selectedHospital, setSelectedHospital] = useState(NEARBY_HOSPITALS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto flex flex-col ${
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

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
            <Hospital className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black">Nearby Emergency ER & Rehab Centers</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Google Maps Live Medical Facilities Locator
            </p>
          </div>
        </div>

        {/* Embedded Google Maps View */}
        <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 mb-6 relative">
          <iframe
            title="Google Maps Medical Locator"
            src={selectedHospital.embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Hospital Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NEARBY_HOSPITALS.map((hosp) => (
            <div
              key={hosp.id}
              onClick={() => setSelectedHospital(hosp)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedHospital.id === hosp.id
                  ? 'bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/30'
                  : isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500">
                  Open 24/7
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{hosp.distance}</span>
              </div>

              <h4 className="text-sm font-bold block mb-1">{hosp.name}</h4>
              <p className={`text-xs block mb-3 line-clamp-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {hosp.address}
              </p>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`tel:${hosp.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-[11px] flex items-center justify-center space-x-1"
                >
                  <Phone className="w-3 h-3 fill-slate-950" />
                  <span>Call</span>
                </a>

                <a
                  href={hosp.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="py-1.5 px-2.5 rounded-xl bg-indigo-500 text-white font-bold text-[11px] flex items-center justify-center space-x-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
