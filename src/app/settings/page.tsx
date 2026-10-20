'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLearnerStore } from '@/lib/store';
import { isSupabaseConfigured } from '@/lib/supabase';
import { CEFRLevel, UserGoal, DailyTimeMinutes } from '@/types';
import {
  Settings,
  User,
  Compass,
  Clock,
  Volume2,
  Moon,
  Sun,
  Database,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export default function SettingsPage() {
  const { profile, store } = useLearnerStore();
  const [name, setName] = useState(profile.name);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    store.saveProfile({ ...profile, name });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all lesson progress, flashcards, and XP? This cannot be undone.')) {
      store.resetProgress();
      alert('Progress has been reset.');
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences, Voice & Account</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Profile & Platform Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Configure your target CEFR level, daily study goals, audio playback speed, theme, and database synchronization.
          </p>
        </div>

        {savedBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-extrabold text-lg flex items-center justify-center">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h2>
              <p className="text-xs text-slate-500">{profile.email}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Update Name
            </button>
          </form>
        </div>

        {/* Curricular & Target Settings */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Curricular Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Target Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Active CEFR Level
              </label>
              <select
                value={profile.level}
                onChange={(e) => store.updateLevel(e.target.value as CEFRLevel)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold cursor-pointer"
              >
                <option value="A0">A0 (Absolute Beginner)</option>
                <option value="A1">A1 (Beginner)</option>
                <option value="A2">A2 (Elementary)</option>
                <option value="B1">B1 (Intermediate)</option>
                <option value="B2">B2 (Upper Intermediate)</option>
                <option value="C1">C1 (Professional & Advanced)</option>
              </select>
            </div>

            {/* Learning Goal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Primary Goal
              </label>
              <select
                value={profile.goal}
                onChange={(e) => store.updateGoal(e.target.value as UserGoal, profile.dailyGoalMinutes)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold cursor-pointer"
              >
                <option value="work">Work in Germany</option>
                <option value="university">University Admission</option>
                <option value="daily">Daily Communication</option>
                <option value="travel">Travel & Culture</option>
                <option value="exam">Official Examination</option>
              </select>
            </div>

            {/* Daily Minutes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Daily Study Target
              </label>
              <select
                value={profile.dailyGoalMinutes}
                onChange={(e) => store.updateGoal(profile.goal, Number(e.target.value) as DailyTimeMinutes)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold cursor-pointer"
              >
                <option value={15}>15 Minutes / day (Casual)</option>
                <option value={30}>30 Minutes / day (Recommended)</option>
                <option value={45}>45 Minutes / day (Intensive)</option>
                <option value={60}>60 Minutes / day (Immersive)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio & Theme Settings */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Audio & Appearance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Speech Rate */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Default German Speech Speed
              </label>
              <div className="flex gap-2">
                {[
                  { rate: 0.75, label: '0.75x (Slow & Clear)' },
                  { rate: 1.0, label: '1.0x (Standard)' },
                  { rate: 1.25, label: '1.25x (Fast Native)' },
                ].map((s) => (
                  <button
                    key={s.rate}
                    type="button"
                    onClick={() => store.setSpeechSpeed(s.rate)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      profile.speechSpeed === s.rate
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Theme
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => store.setTheme('light')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer ${
                    profile.theme === 'light'
                      ? 'bg-white text-slate-900 border-amber-500 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => store.setTheme('dark')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer ${
                    profile.theme === 'dark'
                      ? 'bg-slate-900 text-white border-amber-500 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Database & Cloud Sync Details */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Database & Cloud Sync Configuration
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>
                Status: {isSupabaseConfigured ? 'Supabase Cloud Connected' : 'Running in Offline / LocalStorage Mode'}
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              DeutschPath is designed to function 100% out of the box using client storage. To enable multi-device sync and PostgreSQL persistence, set <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your environment variables and run <code className="font-mono">supabase/schema.sql</code>.
            </p>
          </div>
        </div>

        {/* Danger Zone: Reset Progress */}
        <div className="p-6 rounded-3xl border border-red-200 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/10 space-y-3">
          <h3 className="font-bold text-sm text-red-900 dark:text-red-300">
            Danger Zone
          </h3>
          <p className="text-xs text-slate-500">
            Reset all your completed lessons, study streak, XP, and flashcard progress back to default.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
