'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { MOCK_EXAMS } from '@/data/exams';
import { MockExam } from '@/types';
import { ExerciseEngine } from '@/components/exercises/ExerciseEngine';
import { AudioButton } from '@/components/ui/AudioButton';
import {
  FileCheck2,
  Clock,
  Award,
  AlertTriangle,
  BookOpen,
  Headphones,
  PenTool,
  Sparkles,
} from 'lucide-react';

export default function MockExamsPage() {
  const [activeExam, setActiveExam] = useState<MockExam>(MOCK_EXAMS[0]);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const currentSection = activeExam.sections[activeSectionIdx] || activeExam.sections[0];

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Goethe-Zertifikat & telc Inspired Practice</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German Mock Examinations
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Timed practice test simulations following official CEFR examination formats across Lesen (Reading), Hören (Listening), and Schreiben (Writing).
          </p>
        </div>

        {/* Disclaimer Callout */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Unofficial Examination Practice:</strong> These practice tests are independently authored pedagogical simulations designed to build communicative competencies assessed by Goethe-Institut, telc gGmbH, and ÖSD. Official certification requires taking an in-person exam at an accredited test center.
          </p>
        </div>

        {/* Exam Level Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          {MOCK_EXAMS.map((exam) => (
            <button
              key={exam.id}
              type="button"
              onClick={() => {
                setActiveExam(exam);
                setActiveSectionIdx(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeExam.id === exam.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/10 dark:bg-white/10 font-black">
                {exam.level}
              </span>
              <span>{exam.title}</span>
            </button>
          ))}
        </div>

        {/* Exam Test Station */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          {/* Exam Section Sub-navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 mb-1">
                <span>Total Allocated: ~{activeExam.estimatedMinutes} Minutes</span>
                <span>·</span>
                <span>Passing Threshold: {activeExam.passingScorePercent}%</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeExam.title}
              </h2>
            </div>

            {/* Section Tabs */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0">
              {activeExam.sections.map((sec, idx) => (
                <button
                  key={sec.name}
                  type="button"
                  onClick={() => setActiveSectionIdx(idx)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeSectionIdx === idx
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {sec.name} ({sec.allocatedMinutes}m)
                </button>
              ))}
            </div>
          </div>

          {/* Active Section Description */}
          <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">
              Section: {currentSection.name} ({currentSection.allocatedMinutes} Minutes)
            </strong>
            <p className="text-slate-500">{currentSection.description}</p>
          </div>

          {/* Section Passage or Listening Audio */}
          {currentSection.readingPassage && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Text zur Aufgabe:
              </span>
              <p className="text-sm font-serif text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                {currentSection.readingPassage}
              </p>
            </div>
          )}

          {currentSection.listeningTranscript && (
            <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 block mb-1">
                  Hörtext (Audio Announcement):
                </span>
                <p className="text-xs text-purple-900 dark:text-purple-200 italic">
                  Press play to listen to the prompt before answering questions.
                </p>
              </div>
              <AudioButton text={currentSection.listeningTranscript} size="md" label="Play Audio Track" />
            </div>
          )}

          {currentSection.writingPrompt && (
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 whitespace-pre-line">
              <strong>Schreibaufgabe:</strong>
              <p className="mt-1">{currentSection.writingPrompt}</p>
            </div>
          )}

          {/* Exam Questions via ExerciseEngine */}
          <div className="pt-2">
            <ExerciseEngine
              key={`${activeExam.id}_${currentSection.name}`}
              exercises={currentSection.exercises}
              xpReward={50}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
