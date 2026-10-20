'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { READING_ARTICLES } from '@/data/reading';
import { ReadingArticle } from '@/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { ExerciseEngine } from '@/components/exercises/ExerciseEngine';
import {
  BookMarked,
  Eye,
  EyeOff,
  BookOpen,
  Sparkles,
  Volume2,
  Info,
} from 'lucide-react';

export default function ReadingAcademyPage() {
  const [activeArticle, setActiveArticle] = useState<ReadingArticle>(READING_ARTICLES[0]);
  const [showParallelEnglish, setShowParallelEnglish] = useState(true);
  const [selectedToken, setSelectedToken] = useState<{ word: string; meaning: string } | null>(null);

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Graded Parallel Texts & Interactive Vocab</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German Reading Academy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Read level-appropriate German passages with optional parallel English translations and clickable interactive vocabulary definitions.
          </p>
        </div>

        {/* Article Selector Chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          {READING_ARTICLES.map((art) => (
            <button
              key={art.id}
              type="button"
              onClick={() => {
                setActiveArticle(art);
                setSelectedToken(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeArticle.id === art.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/10 dark:bg-white/10 font-black">
                {art.level}
              </span>
              <span>{art.title}</span>
            </button>
          ))}
        </div>

        {/* Reading Viewer Card */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-white font-extrabold text-xs">
                  Level {activeArticle.level}
                </span>
                <span className="text-xs text-slate-400">{activeArticle.category}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeArticle.germanTitle}
              </h2>
              <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                {activeArticle.title}
              </p>
            </div>

            {/* Toggle Parallel English */}
            <button
              type="button"
              onClick={() => setShowParallelEnglish(!showParallelEnglish)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer shrink-0"
            >
              {showParallelEnglish ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  <span>German Only</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Show Parallel English</span>
                </>
              )}
            </button>
          </div>

          {/* Clickable Token Definition Tooltip Banner */}
          {selectedToken && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 flex items-center justify-between gap-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-extrabold text-sm text-amber-950 dark:text-amber-200 mr-2">
                    {selectedToken.word}:
                  </span>
                  <span className="text-xs text-amber-900 dark:text-amber-300">
                    {selectedToken.meaning}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AudioButton text={selectedToken.word} size="sm" />
                <button
                  type="button"
                  onClick={() => setSelectedToken(null)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Text Paragraphs */}
          <div className="space-y-6">
            {activeArticle.paragraphs.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FDFBF7] dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-3"
              >
                {/* German Paragraph with audio & token buttons */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {p.german}
                    </p>

                    {/* Clickable Tokens */}
                    {p.tokens && p.tokens.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                          Click for definition:
                        </span>
                        {p.tokens.map((token, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => setSelectedToken(token)}
                            className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-amber-100 hover:text-amber-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                          >
                            {token.word}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <AudioButton text={p.german} size="sm" />
                </div>

                {/* Parallel English Translation */}
                {showParallelEnglish && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <p className="text-xs text-slate-500 italic leading-relaxed">
                      {p.english}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reading Comprehension Quiz */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Reading Comprehension Assessment</span>
          </h3>

          <ExerciseEngine
            key={activeArticle.id}
            exercises={activeArticle.comprehensionQuestions}
            xpReward={40}
          />
        </div>
      </div>
    </AppLayout>
  );
}
