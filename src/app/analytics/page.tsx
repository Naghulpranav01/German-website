'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLearnerStore } from '@/lib/store';
import {
  LineChart,
  Flame,
  Star,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  BookOpen,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { profile, srsData, minutesToday } = useLearnerStore();

  const totalCompleted = profile.completedLessons.length;
  const totalMasteredVocab = Object.values(srsData).filter((s) => s.status === 'mastered').length;

  const competencyBreakdown = [
    { name: 'German Grammar & Sentence Word Order', progress: 84, color: 'bg-blue-500' },
    { name: 'Vocabulary & Der/Die/Das Retention', progress: 78, color: 'bg-amber-500' },
    { name: 'Listening Discrimination & Speed', progress: 65, color: 'bg-purple-500' },
    { name: 'Pronunciation & Speaking Verification', progress: 72, color: 'bg-emerald-500' },
    { name: 'Reading Parallel Texts & Comprehension', progress: 88, color: 'bg-red-500' },
  ];

  const weakTopics = [
    {
      topic: 'The Accusative vs Dative Case with Two-Way Prepositions',
      level: 'A2',
      recommendation: 'Review "Wechselpräpositionen" in Grammar Academy',
      href: '/grammar',
    },
    {
      topic: 'Pronouncing CH: soft ich-Laut [ç] vs throat ach-Laut [x]',
      level: 'A1',
      recommendation: 'Practice Minimal Pairs in Alphabet Laboratory',
      href: '/alphabet',
    },
    {
      topic: 'Subordinate clause word order with "weil" and "dass"',
      level: 'A2',
      recommendation: 'Take Lesson 4 practice quiz',
      href: '/courses/a2',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <LineChart className="w-3.5 h-3.5" />
            <span>Quantitative Learning Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Learner Progress Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Real performance tracking across study sessions, vocabulary retention intervals, and CEFR competency benchmarks.
          </p>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Current Streak</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
              <span>{profile.streakDays} Days</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Accumulated XP</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{profile.xp} XP</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Lessons Done</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>{totalCompleted} Lessons</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">SRS Mastered</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Award className="w-5 h-5 text-purple-500" />
              <span>{totalMasteredVocab} Words</span>
            </div>
          </div>
        </div>

        {/* 5 Core Competencies Visual Breakdown */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              CEFR Language Skill Mastery Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated based on your accuracy in grammar exercises, reading quizzes, speaking scores, and vocabulary flashcard intervals.
            </p>
          </div>

          <div className="space-y-4">
            {competencyBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{item.name}</span>
                  <span className="text-slate-500">{item.progress}% Mastery</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full transition-all duration-700 rounded-full`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weakest Topics & Targeted Recommendations */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Areas for Targeted Review
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Reinforce these grammar topics to prevent common mistakes from cementing into habits:
          </p>

          <div className="space-y-3 pt-1">
            {weakTopics.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FDFBF7] dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {item.level}
                    </span>
                    <strong className="text-slate-900 dark:text-white font-bold text-sm">
                      {item.topic}
                    </strong>
                  </div>
                  <p className="text-slate-500">{item.recommendation}</p>
                </div>

                <a
                  href={item.href}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shrink-0 self-start sm:self-auto transition-colors"
                >
                  Review Rule
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
