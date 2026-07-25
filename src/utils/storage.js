import {
  INITIAL_USER_PROFILE,
  INITIAL_MOOD_HISTORY,
  INITIAL_RISK_TREND,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_CRAVING_LOGS,
  INITIAL_MEETING_LOGS,
  HEALTH_RECOVERY_MILESTONES
} from './mockData';

export { INITIAL_USER_PROFILE };

const PROFILE_KEY = 'recoverai_user_profile_v3';
const MOOD_KEY = 'recoverai_mood_history_v3';
const RISK_KEY = 'recoverai_risk_trend_v3';
const JOURNALS_KEY = 'recoverai_journals_v3';
const CHAT_MESSAGES_KEY = 'recoverai_chat_messages_v3';
const AUTH_SESSION_KEY = 'recoverai_auth_session_v3';
const CRAVINGS_KEY = 'recoverai_craving_logs_v3';
const MEETINGS_KEY = 'recoverai_meeting_logs_v3';
const PLEDGE_KEY = 'recoverai_daily_pledge_v3';
const API_KEY_STORAGE_KEY = 'recoverai_gemini_api_key_v3';

// Optional build-time fallback, used for demo/preview deployments where the
// operator supplies the key. A key entered in Settings always takes priority.
// Note: any VITE_* value is inlined into the client bundle and is therefore
// public — never use a production or unrestricted key here. See SECURITY.md.
const ENV_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || '';

export const getStoredApiKey = () => {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || ENV_API_KEY;
  } catch (e) {
    return ENV_API_KEY;
  }
};

export const setStoredApiKey = (key) => {
  try {
    if (key) {
      localStorage.setItem(API_KEY_STORAGE_KEY, key);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to store API key:', e);
  }
};

export const getStoredProfile = () => {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (!data) return INITIAL_USER_PROFILE;
    const parsed = JSON.parse(data);
    if (parsed.name === 'Rahul') {
      localStorage.removeItem(PROFILE_KEY);
      return INITIAL_USER_PROFILE;
    }
    return { ...INITIAL_USER_PROFILE, ...parsed };
  } catch (e) {
    return INITIAL_USER_PROFILE;
  }
};

export const saveStoredProfile = (profile) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
};

// Auth Session Management
export const getAuthSession = () => {
  try {
    const data = localStorage.getItem(AUTH_SESSION_KEY);
    if (!data) return { isLoggedIn: true, user: getStoredProfile() };
    const parsed = JSON.parse(data);
    if (parsed?.user?.name === 'Rahul') {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return { isLoggedIn: true, user: getStoredProfile() };
    }
    return parsed;
  } catch (e) {
    return { isLoggedIn: true, user: getStoredProfile() };
  }
};

export const setAuthSession = (session) => {
  try {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save auth session:', e);
  }
};

// Craving Logs Storage
export const getCravingLogs = () => {
  try {
    const data = localStorage.getItem(CRAVINGS_KEY);
    if (!data) return INITIAL_CRAVING_LOGS;
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_CRAVING_LOGS;
  }
};

export const addCravingLog = (entry) => {
  try {
    const current = getCravingLogs();
    const updated = [entry, ...current];
    localStorage.setItem(CRAVINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return INITIAL_CRAVING_LOGS;
  }
};

// Support Meeting Logs
export const getMeetingLogs = () => {
  try {
    const data = localStorage.getItem(MEETINGS_KEY);
    if (!data) return INITIAL_MEETING_LOGS;
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_MEETING_LOGS;
  }
};

export const addMeetingLog = (entry) => {
  try {
    const current = getMeetingLogs();
    const updated = [entry, ...current];
    localStorage.setItem(MEETINGS_KEY, JSON.stringify(updated));

    // Increment user profile total meetings counter
    const prof = getStoredProfile();
    prof.supportMeetingsAttended = (prof.supportMeetingsAttended || 0) + 1;
    saveStoredProfile(prof);

    return updated;
  } catch (e) {
    return INITIAL_MEETING_LOGS;
  }
};

// Daily Pledge Storage
export const getStoredPledgeState = () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = localStorage.getItem(PLEDGE_KEY);
    if (!data) return { pledgedDate: '', isPledgedToday: false, gratefulFor: [] };
    const parsed = JSON.parse(data);
    return {
      ...parsed,
      isPledgedToday: parsed.pledgedDate === today
    };
  } catch (e) {
    return { pledgedDate: '', isPledgedToday: false, gratefulFor: [] };
  }
};

export const savePledgeState = (pledgeObj) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const payload = { ...pledgeObj, pledgedDate: today };
    localStorage.setItem(PLEDGE_KEY, JSON.stringify(payload));
    return payload;
  } catch (e) {
    return pledgeObj;
  }
};

// Mood History
export const getStoredMoodHistory = () => {
  try {
    const data = localStorage.getItem(MOOD_KEY);
    if (!data) return INITIAL_MOOD_HISTORY;
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_MOOD_HISTORY;
  }
};

export const saveMoodEntry = (entry) => {
  try {
    const history = getStoredMoodHistory();
    const updated = [...history.slice(1), entry];
    localStorage.setItem(MOOD_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return INITIAL_MOOD_HISTORY;
  }
};

// Risk Trends
export const getStoredRiskTrend = () => {
  try {
    const data = localStorage.getItem(RISK_KEY);
    if (!data) return INITIAL_RISK_TREND;
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_RISK_TREND;
  }
};

export const saveRiskEntry = (entry) => {
  try {
    const history = getStoredRiskTrend();
    const updated = [...history.slice(1), entry];
    localStorage.setItem(RISK_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return INITIAL_RISK_TREND;
  }
};

// Journals
export const getStoredJournals = () => {
  try {
    const data = localStorage.getItem(JOURNALS_KEY);
    if (!data) return INITIAL_JOURNAL_ENTRIES;
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_JOURNAL_ENTRIES;
  }
};

export const addJournalEntry = (entry) => {
  try {
    const current = getStoredJournals();
    const updated = [entry, ...current];
    localStorage.setItem(JOURNALS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return INITIAL_JOURNAL_ENTRIES;
  }
};

export const updateJournalEntry = (id, updates) => {
  try {
    const current = getStoredJournals();
    const updated = current.map(j => j.id === id ? { ...j, ...updates } : j);
    localStorage.setItem(JOURNALS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return INITIAL_JOURNAL_ENTRIES;
  }
};

// Chat Messages
export const getStoredChatMessages = (userName = 'Member') => {
  try {
    const data = localStorage.getItem(CHAT_MESSAGES_KEY);
    if (!data) {
      return [
        {
          id: 'welcome-1',
          sender: 'ai',
          text: `Hello ${userName}! I'm RecoverAI, your personal addiction recovery companion. How are you feeling today? You can speak to me or type any thoughts or cravings you are experiencing.`,
          timestamp: 'Just now'
        }
      ];
    }
    const parsed = JSON.parse(data);
    return parsed.map(msg => ({
      ...msg,
      text: msg.text ? msg.text.replace(/Rahul/g, userName) : msg.text
    }));
  } catch (e) {
    return [];
  }
};

export const saveChatMessages = (messages) => {
  try {
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save chat messages:', e);
  }
};
