'use client';

import { useState, useEffect } from 'react';
import { UserProfile, CEFRLevel, UserGoal, DailyTimeMinutes, FlashcardProgress } from '@/types';
import { calculateNextReview, ReviewRating } from './srs';

const STORAGE_KEY_PROFILE = 'deutschpath_profile';
const STORAGE_KEY_SRS = 'deutschpath_srs_progress';
const STORAGE_KEY_STUDY_TIME = 'deutschpath_study_time_today';

const DEFAULT_PROFILE: UserProfile = {
  id: 'guest_user_1',
  name: 'English Learner',
  email: 'learner@deutschpath.app',
  level: 'A1',
  goal: 'work',
  dailyGoalMinutes: 30,
  streakDays: 4,
  lastActiveDate: '2026-10-20',
  xp: 420,
  completedLessons: ['a1_l1', 'a1_l2'],
  bookmarkedVocabIds: ['vocab_hallo', 'vocab_danke', 'vocab_bitte'],
  bookmarkedGrammarIds: ['nouns_gender', 'present_verbs'],
  notes: {
    'a1_l1': 'Remember: all German nouns start with a CAPITAL letter!',
  },
  theme: 'light',
  speechSpeed: 1.0,
  isGuest: true,
};

// Check if localStorage is available
function getStoredProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function getStoredSRS(): Record<string, FlashcardProgress> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SRS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Global subscribers for reactive UI updates across components
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export const learnerStore = {
  getProfile(): UserProfile {
    return getStoredProfile();
  },

  saveProfile(profile: UserProfile) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    notify();
  },

  getSRSProgress(): Record<string, FlashcardProgress> {
    return getStoredSRS();
  },

  saveSRSProgress(data: Record<string, FlashcardProgress>) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_SRS, JSON.stringify(data));
    notify();
  },

  completeLesson(lessonId: string, xpEarned: number) {
    const profile = getStoredProfile();
    const today = new Date().toISOString().split('T')[0];
    const isNew = !profile.completedLessons.includes(lessonId);

    const updatedLessons = isNew
      ? [...profile.completedLessons, lessonId]
      : profile.completedLessons;

    // Check streak
    let newStreak = profile.streakDays;
    if (profile.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (profile.lastActiveDate === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const updatedProfile: UserProfile = {
      ...profile,
      xp: profile.xp + (isNew ? xpEarned : Math.round(xpEarned * 0.2)),
      completedLessons: updatedLessons,
      streakDays: newStreak,
      lastActiveDate: today,
    };

    this.saveProfile(updatedProfile);
  },

  recordFlashcardReview(vocabId: string, rating: ReviewRating) {
    const srs = getStoredSRS();
    const current = srs[vocabId];
    const updated = calculateNextReview(current, vocabId, rating);
    srs[vocabId] = updated;
    this.saveSRSProgress(srs);

    // Also award minor XP for review
    const profile = getStoredProfile();
    profile.xp += 5;
    this.saveProfile(profile);
  },

  toggleBookmarkVocab(vocabId: string) {
    const profile = getStoredProfile();
    const exists = profile.bookmarkedVocabIds.includes(vocabId);
    const updated = exists
      ? profile.bookmarkedVocabIds.filter((id) => id !== vocabId)
      : [...profile.bookmarkedVocabIds, vocabId];
    this.saveProfile({ ...profile, bookmarkedVocabIds: updated });
  },

  toggleBookmarkGrammar(grammarId: string) {
    const profile = getStoredProfile();
    const exists = profile.bookmarkedGrammarIds.includes(grammarId);
    const updated = exists
      ? profile.bookmarkedGrammarIds.filter((id) => id !== grammarId)
      : [...profile.bookmarkedGrammarIds, grammarId];
    this.saveProfile({ ...profile, bookmarkedGrammarIds: updated });
  },

  saveNote(key: string, noteText: string) {
    const profile = getStoredProfile();
    const notes = { ...profile.notes, [key]: noteText };
    this.saveProfile({ ...profile, notes });
  },

  updateLevel(level: CEFRLevel) {
    const profile = getStoredProfile();
    this.saveProfile({ ...profile, level });
  },

  updateGoal(goal: UserGoal, dailyMinutes: DailyTimeMinutes) {
    const profile = getStoredProfile();
    this.saveProfile({ ...profile, goal, dailyGoalMinutes: dailyMinutes });
  },

  setTheme(theme: 'light' | 'dark' | 'system') {
    const profile = getStoredProfile();
    this.saveProfile({ ...profile, theme });
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },

  setSpeechSpeed(speed: number) {
    const profile = getStoredProfile();
    this.saveProfile({ ...profile, speechSpeed: speed });
  },

  addStudyMinutes(minutes: number) {
    if (typeof window === 'undefined') return;
    const current = parseInt(localStorage.getItem(STORAGE_KEY_STUDY_TIME) || '12', 10);
    localStorage.setItem(STORAGE_KEY_STUDY_TIME, String(current + minutes));
    notify();
  },

  getStudyMinutesToday(): number {
    if (typeof window === 'undefined') return 18;
    return parseInt(localStorage.getItem(STORAGE_KEY_STUDY_TIME) || '18', 10);
  },

  resetProgress() {
    this.saveProfile({
      ...DEFAULT_PROFILE,
      xp: 0,
      streakDays: 1,
      completedLessons: [],
      bookmarkedVocabIds: [],
      bookmarkedGrammarIds: [],
      notes: {},
    });
    this.saveSRSProgress({});
  },

  loginAsGuest(name = 'Guest Learner') {
    const profile = getStoredProfile();
    this.saveProfile({ ...profile, name, isGuest: true });
  },

  loginWithEmail(email: string, name: string) {
    const profile = getStoredProfile();
    this.saveProfile({ ...profile, email, name, isGuest: false });
  },
};

// React Hook for using learner state
export function useLearnerStore() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [srsData, setSrsData] = useState<Record<string, FlashcardProgress>>({});
  const [minutesToday, setMinutesToday] = useState(18);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setProfile(learnerStore.getProfile());
      setSrsData(learnerStore.getSRSProgress());
      setMinutesToday(learnerStore.getStudyMinutesToday());
    };
    update();

    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  return {
    profile,
    srsData,
    minutesToday,
    mounted,
    store: learnerStore,
  };
}
