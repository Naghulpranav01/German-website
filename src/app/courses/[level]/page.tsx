'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { CEFR_LEVELS_OVERVIEW, A1_LESSONS, A2_MODULES, B1_MODULES, B2_MODULES, C1_MODULES } from '@/data/courses';
import { useLearnerStore } from '@/lib/store';
import { CEFRLevel, Lesson } from '@/types';
import { ArrowLeft, Play, CheckCircle2, Clock, Star, BookOpen, Sparkles } from 'lucide-react';

function CourseLevelContent() {
  const params = useParams();
  const rawLevel = String(params?.level || 'a1').toUpperCase() as CEFRLevel;
  const level: CEFRLevel = CEFR_LEVELS_OVERVIEW[rawLevel] ? rawLevel : 'A1';

  const { profile } = useLearnerStore();
  const levelInfo = CEFR_LEVELS_OVERVIEW[level];

  // Retrieve lessons for this level
  let lessons: Lesson[] = [];
  if (level === 'A1') {
    lessons = A1_LESSONS;
  } else if (level === 'A2') {
    lessons = A2_MODULES.flatMap((m) => m.lessons);
  } else if (level === 'B1') {
    lessons = B1_MODULES.flatMap((m) => m.lessons);
  } else if (level === 'B2') {
    lessons = B2_MODULES.flatMap((m) => m.lessons);
  } else if (level === 'C1') {
    lessons = C1_MODULES.flatMap((m) => m.lessons);
  }

  const completedCount = lessons.filter((l) => profile.completedLessons.includes(l.id)).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Navigation back */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Courses</span>
      </Link>

      {/* Level Banner */}
      <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-500 text-white font-extrabold text-sm">
                Level {level}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {lessons.length} Structured Lessons · ~{levelInfo.estimatedHours} Hours
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              {levelInfo.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {levelInfo.subtitle}. {levelInfo.outcome}
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 shrink-0">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Completion</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{progressPercent}%</span>
            <span className="text-[11px] text-slate-500">{completedCount} of {lessons.length} done</span>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <span>Curriculum Lessons & Milestones</span>
        </h2>

        <div className="space-y-3">
          {lessons.map((lesson) => {
            const isCompleted = profile.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`p-5 rounded-2xl border transition-all duration-150 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : lesson.lessonOrder}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {lesson.title}
                      </h3>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Mastered
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      {lesson.germanTitle}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 max-w-2xl">
                      {lesson.description}
                    </p>

                    {/* Grammar Points Preview */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {lesson.grammarPoints.slice(0, 3).map((gp, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {gp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right text-xs text-slate-400 hidden sm:block">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.estimatedMinutes}m</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>+{lesson.xpReward} XP</span>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${level.toLowerCase()}/${lesson.id}`}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      isCompleted
                        ? 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs active:scale-95'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CourseLevelPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading course...</div>}>
        <CourseLevelContent />
      </Suspense>
    </AppLayout>
  );
}
