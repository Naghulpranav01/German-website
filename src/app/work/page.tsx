'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { WORK_MODULES } from '@/data/work';
import { AudioButton } from '@/components/ui/AudioButton';
import { ExerciseEngine } from '@/components/exercises/ExerciseEngine';
import {
  Briefcase,
  FileText,
  UserCheck,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
} from 'lucide-react';

export default function GermanForWorkPage() {
  const [selectedModule, setSelectedModule] = useState(WORK_MODULES[0]);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  const activeLesson = selectedModule.lessons[activeLessonIdx] || selectedModule.lessons[0];

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>High Priority Career Track · B1–B2 Professional Fluency</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German for Working in Germany
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            From your German CV (Lebenslauf) and formal cover letter (Anschreiben) to job interviews, business meetings, salary negotiation, and relocation bureaucracy (Anmeldung, Steuer-ID).
          </p>
        </div>

        {/* Module Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          {WORK_MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedModule(m);
                setActiveLessonIdx(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedModule.id === m.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/10 dark:bg-white/10 font-black">
                {m.level}
              </span>
              <span>{m.title}</span>
            </button>
          ))}
        </div>

        {/* Lesson Sub-tabs */}
        {selectedModule.lessons.length > 1 && (
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            {selectedModule.lessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                type="button"
                onClick={() => setActiveLessonIdx(idx)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeLessonIdx === idx
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        )}

        {/* Active Lesson Station */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
              {activeLesson.germanTitle}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {activeLesson.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-[#FDFBF7] dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              {activeLesson.overview}
            </p>
          </div>

          {/* Key Phrases with Audio */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Professional Phrasing & Terminology:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {activeLesson.keyPhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-bold">
                      {phrase.german}
                    </strong>
                    <span className="text-slate-500">{phrase.english}</span>
                  </div>
                  <AudioButton text={phrase.german} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Sample Template / Dialogue */}
          {activeLesson.sampleTemplate && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {activeLesson.sampleTemplate.title}
              </span>
              <pre className="font-mono text-xs whitespace-pre-line text-slate-800 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                {activeLesson.sampleTemplate.content}
              </pre>
              <p className="text-[11px] text-slate-500 italic">
                {activeLesson.sampleTemplate.notes}
              </p>
            </div>
          )}

          {activeLesson.dialogue && activeLesson.dialogue.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Authentic Workplace Dialogue:
              </h3>
              <div className="space-y-2">
                {activeLesson.dialogue.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px]">
                        {d.speaker}
                      </span>
                      <p className="font-bold text-slate-900 dark:text-white">{d.german}</p>
                      <p className="text-slate-500 italic text-[11px]">{d.english}</p>
                    </div>
                    <AudioButton text={d.german} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lesson Practical Verification Exercise */}
        {activeLesson.exercise && activeLesson.exercise.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Verify Workplace German Concepts</span>
            </h3>

            <ExerciseEngine
              key={activeLesson.id}
              exercises={activeLesson.exercise}
              xpReward={40}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
