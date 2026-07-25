import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredApiKey,
  setStoredApiKey,
  getStoredProfile,
  saveStoredProfile,
  getCravingLogs,
  addCravingLog,
  getMeetingLogs,
  addMeetingLog,
  getStoredJournals,
  addJournalEntry,
  updateJournalEntry,
  getStoredPledgeState,
  savePledgeState,
  getStoredChatMessages,
  saveChatMessages,
  INITIAL_USER_PROFILE,
} from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('API key storage', () => {
  it('returns an empty string when no key is stored', () => {
    expect(getStoredApiKey()).toBe('');
  });

  it('round-trips a stored key', () => {
    setStoredApiKey('test-key-123');
    expect(getStoredApiKey()).toBe('test-key-123');
  });

  it('clears the key when given a falsy value', () => {
    setStoredApiKey('test-key-123');
    setStoredApiKey('');
    expect(getStoredApiKey()).toBe('');
  });
});

describe('user profile', () => {
  it('falls back to the initial profile when nothing is stored', () => {
    expect(getStoredProfile()).toEqual(INITIAL_USER_PROFILE);
  });

  it('merges stored values over the initial profile', () => {
    saveStoredProfile({ ...INITIAL_USER_PROFILE, name: 'Alex' });
    expect(getStoredProfile().name).toBe('Alex');
  });

  it('recovers from corrupted JSON', () => {
    localStorage.setItem('recoverai_user_profile_v3', '{not json');
    expect(getStoredProfile()).toEqual(INITIAL_USER_PROFILE);
  });
});

describe('craving logs', () => {
  it('prepends new entries so the newest is first', () => {
    const before = getCravingLogs().length;
    const updated = addCravingLog({ id: 'c1', intensity: 7 });
    expect(updated).toHaveLength(before + 1);
    expect(updated[0].id).toBe('c1');
  });

  it('persists across reads', () => {
    addCravingLog({ id: 'c2', intensity: 3 });
    expect(getCravingLogs()[0].id).toBe('c2');
  });
});

describe('meeting logs', () => {
  it('increments the profile meeting counter', () => {
    const before = getStoredProfile().supportMeetingsAttended || 0;
    addMeetingLog({ id: 'm1', type: 'NA' });
    expect(getStoredProfile().supportMeetingsAttended).toBe(before + 1);
    expect(getMeetingLogs()[0].id).toBe('m1');
  });
});

describe('journals', () => {
  it('adds and updates entries by id', () => {
    addJournalEntry({ id: 'j1', text: 'first draft' });
    updateJournalEntry('j1', { text: 'revised' });
    const entry = getStoredJournals().find((j) => j.id === 'j1');
    expect(entry.text).toBe('revised');
  });

  it('leaves other entries untouched on update', () => {
    addJournalEntry({ id: 'j1', text: 'one' });
    addJournalEntry({ id: 'j2', text: 'two' });
    updateJournalEntry('j2', { text: 'changed' });
    expect(getStoredJournals().find((j) => j.id === 'j1').text).toBe('one');
  });
});

describe('daily pledge', () => {
  it('reports no pledge before one is made', () => {
    expect(getStoredPledgeState().isPledgedToday).toBe(false);
  });

  it('marks today as pledged after saving', () => {
    savePledgeState({ gratefulFor: ['family'] });
    const state = getStoredPledgeState();
    expect(state.isPledgedToday).toBe(true);
    expect(state.gratefulFor).toEqual(['family']);
  });

  it('does not count a pledge from a previous day', () => {
    localStorage.setItem(
      'recoverai_daily_pledge_v3',
      JSON.stringify({ pledgedDate: '2020-01-01', gratefulFor: [] })
    );
    expect(getStoredPledgeState().isPledgedToday).toBe(false);
  });
});

describe('chat messages', () => {
  it('seeds a personalised welcome message', () => {
    const messages = getStoredChatMessages('Alex');
    expect(messages).toHaveLength(1);
    expect(messages[0].sender).toBe('ai');
    expect(messages[0].text).toContain('Alex');
  });

  it('round-trips saved messages', () => {
    saveChatMessages([{ id: '1', sender: 'user', text: 'hi' }]);
    expect(getStoredChatMessages('Alex')[0].text).toBe('hi');
  });
});
