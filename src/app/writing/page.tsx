'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { WRITING_TASKS, analyzeGermanWriting } from '@/data/writing';
import { useLearnerStore } from '@/lib/store';
import {
  PenTool,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Eye,
  EyeOff,
  RotateCcw,
} from 'lucide-react';

export default function WritingPracticePage() {
  const [activeTask, setActiveTask] = useState(WRITING_TASKS[0]);
  const [userText, setUserText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    wordCount: number;
    feedback: string[];
  } | null>(null);
  const [showModelSolution, setShowModelSolution] = useState(false);

  const { store } = useLearnerStore();

  const handleEvaluate = () => {
    const result = analyzeGermanWriting(userText);
    setAnalysisResult(result);
    if (result.score >= 70) {
      store.completeLesson(`writing_${activeTask.id}`, 35);
    }
  };

  const handleReset = () => {
    setUserText('');
    setAnalysisResult(null);
    setShowModelSolution(false);
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <PenTool className="w-3.5 h-3.5" />
            <span>Practical Composition & German Email Standards</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German Writing Practice
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Draft real-world German emails, invitations, landlord maintenance requests, and job application cover letters with automated grammar and layout feedback.
          </p>
        </div>

        {/* Task Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          {WRITING_TASKS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActiveTask(t);
                handleReset();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTask.id === t.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/10 dark:bg-white/10 font-black">
                {t.level}
              </span>
              <span>{t.title}</span>
            </button>
          ))}
        </div>

        {/* Writing Station */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor & Analysis (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Task Prompt Card */}
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-white font-extrabold text-xs">
                  Level {activeTask.level} · {activeTask.targetAudience.toUpperCase()} Register
                </span>
                <span className="text-xs text-slate-400">
                  Target: ~{activeTask.recommendedWordCount} words
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeTask.germanTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {activeTask.prompt}
              </p>
            </div>

            {/* Editor Area */}
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Write your German text below:</span>
                <span>
                  Words:{' '}
                  <strong className="text-slate-900 dark:text-white">
                    {userText.trim().split(/\s+/).filter(Boolean).length}
                  </strong>{' '}
                  / {activeTask.recommendedWordCount}
                </span>
              </div>

              <textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                rows={9}
                placeholder="Sehr geehrte Damen und Herren, ..."
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-[#FDFBF7] dark:bg-slate-950/60 font-sans text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed resize-y"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModelSolution(!showModelSolution)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                >
                  {showModelSolution ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Hide Model Solution</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>View Native Model Solution</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {analysisResult && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={!userText.trim()}
                    onClick={handleEvaluate}
                    className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold text-sm shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
                  >
                    Evaluate Submission
                  </button>
                </div>
              </div>

              {/* Analysis Result Banner */}
              {analysisResult && (
                <div
                  className={`p-5 rounded-2xl border text-sm space-y-3 animate-in fade-in duration-200 ${
                    analysisResult.score >= 70
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>Linguistic Assessment Score: {analysisResult.score}/100</span>
                    </span>
                    {analysisResult.score >= 70 && (
                      <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                        +35 XP Awarded
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {analysisResult.feedback.map((fb, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {fb}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Native Model Solution Display */}
              {showModelSolution && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Model German Response:
                  </span>
                  <p className="text-xs font-mono whitespace-pre-line text-slate-800 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    {activeTask.sampleSolution}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Col: Phrase Bank & Quality Checklist */}
          <div className="space-y-5">
            {/* Phrase Bank */}
            <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Essential German Phrases:</span>
              </h3>
              <div className="space-y-2.5">
                {activeTask.essentialPhrases.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <p className="font-bold text-slate-900 dark:text-white mb-0.5">
                      {p.phrase}
                    </p>
                    <p className="text-slate-500 text-[11px] italic">
                      {p.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Exam Writing Checklist:</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {activeTask.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
