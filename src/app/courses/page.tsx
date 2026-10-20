'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { CEFR_LEVELS_OVERVIEW } from '@/data/courses';
import { ArrowRight, Compass, CheckCircle2, Clock, Award, BookOpen } from 'lucide-react';
import { useLearnerStore } from '@/lib/store';
import { CEFRLevel } from '@/types';

export default function CoursesPage() {
  const { profile } = useLearnerStore();
  const levels: CEFRLevel[] = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>CEFR Curricular Roadmap (Common European Framework of Reference)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum Overview: A0 to C1
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Choose a level to explore its modules, communicative competencies, grammar focus, and structured lessons.
          </p>
        </div>

        {/* Level Cards */}
        <div className="space-y-6">
          {levels.map((lvl) => {
            const info = CEFR_LEVELS_OVERVIEW[lvl];
            const isCurrent = profile.level === lvl;

            return (
              <div
                key={lvl}
                className={`p-6 md:p-8 rounded-3xl border-2 transition-all bg-white dark:bg-slate-900 shadow-xs ${
                  isCurrent
                    ? 'border-amber-500 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-amber-500 text-white font-black text-sm">
                        Level {lvl}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                        {info.title}
                      </h2>
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          Your Active Level
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {info.subtitle}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200">CEFR Descriptor: </strong>
                        <span className="text-slate-600 dark:text-slate-400">{info.cefrDescriptor}</span>
                      </div>
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200">Communicative Outcome: </strong>
                        <span className="text-slate-600 dark:text-slate-400">{info.outcome}</span>
                      </div>
                    </div>

                    {/* Grammar Tags */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Grammar Matrix:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {info.grammarFocus.map((g, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Level Metrics & CTA */}
                  <div className="md:w-60 flex flex-col justify-between space-y-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
                    <div className="space-y-2 text-xs text-slate-500">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                          <span>Curriculum:</span>
                        </span>
                        <strong className="text-slate-800 dark:text-slate-200">{info.totalLessons} Lessons</strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          <span>Study Time:</span>
                        </span>
                        <strong className="text-slate-800 dark:text-slate-200">~{info.estimatedHours} Hours</strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Exam Goal:</span>
                        </span>
                        <strong className="text-slate-800 dark:text-slate-200 truncate max-w-[120px] text-right" title={info.examTarget}>
                          {info.examTarget}
                        </strong>
                      </div>
                    </div>

                    <Link
                      href={`/courses/${lvl.toLowerCase()}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Open Level {lvl} Curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
