'use client';

import React from 'react';
import Link from 'next/link';
import { useLearnerStore } from '@/lib/store';
import { Flame, Star, Moon, Sun, Clock, User, Compass } from 'lucide-react';

export function AppHeader() {
  const { profile, minutesToday, store } = useLearnerStore();

  const toggleTheme = () => {
    const nextTheme = profile.theme === 'dark' ? 'light' : 'dark';
    store.setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & German Flag Accent */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex flex-col gap-0.5 w-6 h-5 rounded-xs overflow-hidden shadow-xs border border-slate-300 dark:border-slate-700">
              <div className="bg-slate-900 h-1/3 w-full" />
              <div className="bg-red-600 h-1/3 w-full" />
              <div className="bg-amber-400 h-1/3 w-full" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center">
                Deutsch<span className="text-amber-600 dark:text-amber-400">Path</span>
              </span>
            </div>
          </Link>

          {/* Current Level Pill */}
          <Link
            href="/courses"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60 hover:bg-amber-100 transition-colors"
          >
            <Compass className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Level {profile.level}</span>
          </Link>
        </div>

        {/* Learning Stats (Streak, XP, Study Timer, Theme) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Daily Study Time Goal */}
          <div
            title={`Today: ${minutesToday} of ${profile.dailyGoalMinutes} min target`}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {minutesToday} / {profile.dailyGoalMinutes}m
            </span>
          </div>

          {/* Streak Counter */}
          <div
            title={`${profile.streakDays} Day Learning Streak`}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/60"
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>{profile.streakDays}d</span>
          </div>

          {/* Total XP */}
          <div
            title={`${profile.xp} Experience Points`}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{profile.xp} XP</span>
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {profile.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Profile / Settings link */}
          <Link
            href="/settings"
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors"
            title="Profile & Settings"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
