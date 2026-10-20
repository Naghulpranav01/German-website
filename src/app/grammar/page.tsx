'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GRAMMAR_TOPICS } from '@/data/grammar';
import { GrammarTopic, CEFRLevel } from '@/types';
import { useLearnerStore } from '@/lib/store';
import { AudioButton } from '@/components/ui/AudioButton';
import { ExerciseEngine } from '@/components/exercises/ExerciseEngine';
import {
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Table,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function GrammarAcademyPage() {
  const { profile, store } = useLearnerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTopic, setActiveTopic] = useState<GrammarTopic>(GRAMMAR_TOPICS[0]);

  const filteredTopics = GRAMMAR_TOPICS.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.germanTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || t.level === selectedLevel;
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCat;
  });

  const isBookmarked = profile.bookmarkedGrammarIds.includes(activeTopic.id);

  return (
    <AppLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Reference (A1–C1)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German Grammar Academy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Clear structural formulas, declension tables, right vs. wrong comparisons, and mastery quizzes with zero unexplained jargon.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search grammar topic..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Level Selector */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold cursor-pointer"
            >
              <option value="all">All CEFR Levels</option>
              <option value="A1">Level A1</option>
              <option value="A2">Level A2</option>
              <option value="B1">Level B1</option>
              <option value="B2">Level B2</option>
              <option value="C1">Level C1</option>
            </select>

            {/* Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="nouns_articles">Nouns & Articles</option>
              <option value="verbs">Verbs & Tenses</option>
              <option value="cases">Cases (Akk, Dat, Gen)</option>
              <option value="sentence_structure">Sentence Structure & V2</option>
              <option value="prepositions">Prepositions</option>
            </select>
          </div>
        </div>

        {/* 2-Column Main Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Topics Sidebar list */}
          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredTopics.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No matching grammar topics found.
              </div>
            ) : (
              filteredTopics.map((topic) => {
                const isSelected = activeTopic.id === topic.id;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setActiveTopic(topic)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 shadow-xs ring-1 ring-amber-400'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {topic.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {topic.level}
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mb-1">
                      {topic.germanTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {topic.summary}
                    </p>
                  </button>
                );
              })
            )}
          </div>

          {/* Right 2 Columns: Full Topic Study & Quiz */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-white font-extrabold text-xs">
                      {activeTopic.level}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 capitalize">
                      Category: {activeTopic.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {activeTopic.title}
                  </h2>
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {activeTopic.germanTitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => store.toggleBookmarkGrammar(activeTopic.id)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                  title="Bookmark topic"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Formula Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
                  Construction Formula:
                </span>
                <p className="font-mono text-sm font-bold text-amber-950 dark:text-amber-200">
                  {activeTopic.formula}
                </p>
              </div>

              {/* Explanation in English */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Why and How it is Used:
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeTopic.explanation}
                </p>
              </div>

              {/* Table If Applicable */}
              {activeTopic.table && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Table className="w-4 h-4 text-blue-500" />
                    <span>Declension / Conjugation Matrix:</span>
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          {activeTopic.table.headers.map((h, i) => (
                            <th key={i} className="p-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-600 dark:text-slate-300">
                        {activeTopic.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Examples with Audio */}
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Real German Examples:
                </h3>
                <div className="space-y-2">
                  {activeTopic.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white block">
                          {ex.german}
                        </span>
                        <span className="text-xs text-slate-500">
                          {ex.english}
                        </span>
                      </div>
                      <AudioButton text={ex.german} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right vs Wrong Comparisons */}
              {activeTopic.correctVsIncorrect && (
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Correct vs. Incorrect (Common English Pitfalls):
                  </h3>
                  <div className="space-y-2">
                    {activeTopic.correctVsIncorrect.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#FDFBF7] dark:bg-slate-900 text-xs space-y-1.5"
                      >
                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Richtig: {item.correct}</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 line-through">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>Falsch: {item.incorrect}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] italic pl-6">
                          Why: {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Memory Trick */}
              {activeTopic.memoryTrick && (
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs space-y-1">
                  <strong className="text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Memory Trick (Eselsbrücke):</span>
                  </strong>
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                    {activeTopic.memoryTrick}
                  </p>
                </div>
              )}
            </div>

            {/* Interactive Mastery Quiz for Active Topic */}
            {activeTopic.quiz && activeTopic.quiz.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Test Your Mastery of This Rule
                </h3>
                <ExerciseEngine
                  exercises={activeTopic.quiz}
                  xpReward={30}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
