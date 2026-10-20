'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLearnerStore } from '@/lib/store';
import { A1_LESSONS } from '@/data/courses';
import { VOCABULARY_LIST } from '@/data/vocabulary';
import {
  Flame,
  Star,
  Clock,
  Compass,
  ArrowRight,
  BookOpen,
  Headphones,
  Mic,
  Library,
  Briefcase,
  Play,
  RotateCw,
  Award,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, srsData, minutesToday, store } = useLearnerStore();

  // Find next uncompleted lesson
  const nextLesson =
    A1_LESSONS.find((l) => !profile.completedLessons.includes(l.id)) ||
    A1_LESSONS[0];

  const totalA1Lessons = A1_LESSONS.length;
  const completedCount = profile.completedLessons.length;
  const a1ProgressPercent = Math.min(100, Math.round((completedCount / totalA1Lessons) * 100));

  // Count SRS due reviews inside useEffect to keep prerender stable
  const [dueReviewsCount, setDueReviewsCount] = React.useState(0);
  const [masteredVocabCount, setMasteredVocabCount] = React.useState(0);

  React.useEffect(() => {
    const now = new Date();
    setDueReviewsCount(
      Object.values(srsData).filter((item) => new Date(item.dueDate) <= now).length
    );
    setMasteredVocabCount(
      Object.values(srsData).filter((item) => item.status === 'mastered').length
    );
  }, [srsData]);

  return (
    <AppLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Greeting & Active Level Banner */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Goal: {profile.goal.toUpperCase()} Fluency · Daily Target: {profile.dailyGoalMinutes} min</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Guten Tag, {profile.name}!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
                You are currently advancing on <strong>Level {profile.level}</strong>. You have completed {completedCount} of {totalA1Lessons} beginner modules.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/courses/${profile.level.toLowerCase()}/${nextLesson.id}`}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all duration-150 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume Lesson {nextLesson.lessonOrder}</span>
              </Link>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-500">Level {profile.level} Completion Progress</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{a1ProgressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${a1ProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Learning Streak</span>
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {profile.streakDays} Days
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Study today to keep it active!</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total XP</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {profile.xp}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">+50 XP per completed lesson</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Study Time</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {minutesToday}m
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Daily target: {profile.dailyGoalMinutes} min</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Flashcards Due</span>
              <RotateCw className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {dueReviewsCount > 0 ? dueReviewsCount : '0'} Due
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{masteredVocabCount} words mastered</p>
          </div>
        </div>

        {/* Recommended Daily Study Plan & Spaced Repetition */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Today's Curriculum Plan */}
          <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Today's Recommended Study Path
                </h2>
                <p className="text-xs text-slate-500">
                  Curated sequence balancing grammar, vocabulary, listening, and speaking.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                ~25 Mins
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {/* Task 1: Next Lesson */}
              <Link
                href={`/courses/${profile.level.toLowerCase()}/${nextLesson.id}`}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-sm">
                    {nextLesson.lessonOrder}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                      {nextLesson.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {nextLesson.germanTitle} · {nextLesson.estimatedMinutes} min
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Task 2: SRS Flashcards */}
              <Link
                href="/vocabulary"
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-400 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center">
                    <Library className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                      Spaced Repetition Review
                    </h3>
                    <p className="text-xs text-slate-500">
                      Strengthen memory retention with Leitner flashcard deck
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full">
                  5 min
                </span>
              </Link>

              {/* Task 3: Listening / Speaking Lab */}
              <Link
                href="/speaking"
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      Pronunciation Laboratory
                    </h3>
                    <p className="text-xs text-slate-500">
                      Listen and speak German phrases with microphone feedback
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                  10 min
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Skill Accelerators */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Skill Accelerators
              </h2>

              <div className="space-y-2.5">
                <Link
                  href="/alphabet"
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 flex items-center gap-3 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Alphabet & Sounds Grid (30 Letters)</span>
                </Link>

                <Link
                  href="/grammar"
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 flex items-center gap-3 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>Grammar Reference & Quizzes</span>
                </Link>

                <Link
                  href="/tutor"
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-400 flex items-center gap-3 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>16 Practical Conversation Scenarios</span>
                </Link>

                <Link
                  href="/work"
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 flex items-center gap-3 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                  <span>German for Work & IT Engineers</span>
                </Link>
              </div>
            </div>

            {/* Quick Practice Tip */}
            <div className="p-5 rounded-3xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs space-y-2">
              <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>German Rule of the Day</span>
              </span>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                Remember: <strong>Every single German noun is capitalized!</strong> Neglecting noun capitalization is penalised as an error on Goethe and telc exams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
