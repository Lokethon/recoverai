import React, { useState } from 'react';
import { X, Phone, User, Heart, ShieldCheck, Check, Save, MessageSquare } from 'lucide-react';
import { getStoredProfile, saveStoredProfile } from '../utils/storage';
import { sanitizeInput } from '../utils/security';

export default function EditContactsModal({ isOpen, onClose, onContactsSaved, isDarkMode }) {
  const profile = getStoredProfile();

  const [caregiverName, setCaregiverName] = useState(profile.trustedContact?.name || '');
  const [caregiverPhone, setCaregiverPhone] = useState(profile.trustedContact?.phone || '');
  const [caregiverWhatsapp, setCaregiverWhatsapp] = useState(profile.trustedContact?.whatsapp || '+15553829910');
  const [caregiverRelation, setCaregiverRelation] = useState(profile.trustedContact?.relation || 'Primary Support');

  const [therapistName, setTherapistName] = useState(profile.therapistContact?.name || '');
  const [therapistPhone, setTherapistPhone] = useState(profile.therapistContact?.phone || '');
  const [therapistWhatsapp, setTherapistWhatsapp] = useState(profile.therapistContact?.whatsapp || '+15559014433');

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();

    const cleanWhatsapp = caregiverWhatsapp.trim().replace(/[^0-9+]/g, '');

    const updatedProfile = {
      ...profile,
      trustedContact: {
        name: sanitizeInput(caregiverName.trim()) || 'Family Contact',
        relation: sanitizeInput(caregiverRelation.trim()) || 'Primary Support',
        phone: sanitizeInput(caregiverPhone.trim()) || '+1 (555) 382-9910',
        whatsapp: cleanWhatsapp || '+15553829910'
      },
      therapistContact: {
        name: sanitizeInput(therapistName.trim()) || 'Dr. Ananya Sharma',
        relation: 'Addiction Specialist',
        phone: sanitizeInput(therapistPhone.trim()) || '+1 (555) 901-4433',
        whatsapp: therapistWhatsapp.trim().replace(/[^0-9+]/g, '') || '+15559014433'
      }
    };

    saveStoredProfile(updatedProfile);
    setSavedSuccess(true);
    if (onContactsSaved) onContactsSaved(updatedProfile);

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
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

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold">Manage Emergency Contacts</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Add phone numbers & WhatsApp numbers for real emergency dispatch
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold flex items-center justify-center space-x-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Emergency & WhatsApp Contacts Saved!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          
          {/* Caregiver Contact Section */}
          <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              1. Trusted Caregiver / Family Contact
            </span>

            <div>
              <label className="block text-xs font-semibold mb-1">Caregiver Name</label>
              <input
                type="text"
                required
                value={caregiverName}
                onChange={(e) => setCaregiverName(e.target.value)}
                placeholder="e.g. Priya (Sister) or Mom"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Relationship</label>
              <input
                type="text"
                value={caregiverRelation}
                onChange={(e) => setCaregiverRelation(e.target.value)}
                placeholder="e.g. Sister / Mother / Best Friend"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Phone Number (For Real Phone Call)</label>
              <input
                type="tel"
                required
                value={caregiverPhone}
                onChange={(e) => setCaregiverPhone(e.target.value)}
                placeholder="+1 (555) 382-9910"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Number (For Emergency Message & Video SOS)</span>
              </label>
              <input
                type="tel"
                required
                value={caregiverWhatsapp}
                onChange={(e) => setCaregiverWhatsapp(e.target.value)}
                placeholder="+15553829910 (Include country code)"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500' : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500'
                }`}
              />
            </div>
          </div>

          {/* Therapist Contact Section */}
          <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-500 block">
              2. Therapist / Specialist Contact
            </span>

            <div>
              <label className="block text-xs font-semibold mb-1">Therapist Name</label>
              <input
                type="text"
                required
                value={therapistName}
                onChange={(e) => setTherapistName(e.target.value)}
                placeholder="e.g. Dr. Ananya Sharma"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Phone Number (For Real Phone Call)</label>
              <input
                type="tel"
                required
                value={therapistPhone}
                onChange={(e) => setTherapistPhone(e.target.value)}
                placeholder="+1 (555) 901-4433"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-sky-500 flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Therapist WhatsApp Number</span>
              </label>
              <input
                type="tel"
                value={therapistWhatsapp}
                onChange={(e) => setTherapistWhatsapp(e.target.value)}
                placeholder="+15559014433"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4 fill-white" />
            <span>Save Contacts</span>
          </button>
        </form>

      </div>
    </div>
  );
}
