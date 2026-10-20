'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { VOCABULARY_LIST } from '@/data/vocabulary';
import { VocabularyItem } from '@/types';
import { useLearnerStore } from '@/lib/store';
import { AudioButton } from '@/components/ui/AudioButton';
import { FlashcardDeck } from '@/components/flashcards/FlashcardDeck';
import {
  Search,
  Library,
  RotateCw,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  Volume2,
} from 'lucide-react';

export default function VocabularyPage() {
  const { profile, srsData, store } = useLearnerStore();

  const [activeTab, setActiveTab] = useState<'flashcards' | 'library'>('flashcards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = VOCABULARY_LIST.filter((item) => {
    const matchesSearch =
      item.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCat;
  });

  const categories = Array.from(new Set(VOCABULARY_LIST.map((v) => v.category)));

  // Filter flashcards by level if selected
  const flashcardItems = filteredItems.length > 0 ? filteredItems : VOCABULARY_LIST;

  const getArticleBadge = (article?: string) => {
    if (!article) return null;
    if (article === 'der') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          der
        </span>
      );
    }
    if (article === 'die') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
          die
        </span>
      );
    }
    if (article === 'das') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          das
        </span>
      );
    }
    return null;
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
              <Library className="w-3.5 h-3.5" />
              <span>300+ Core Words with Gender, Plural & Audio</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Vocabulary & Spaced Repetition
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Master nouns with color-coded articles, verb conjugations, and Leitner / SuperMemo SM-2 flashcard scheduling.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('flashcards')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flashcard Review</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'library'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              <span>Full Dictionary ({VOCABULARY_LIST.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Flashcards */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-500">Filter Deck:</span>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="A1">Level A1</option>
                  <option value="A2">Level A2</option>
                  <option value="B1">Level B1</option>
                  <option value="B2">Level B2</option>
                  <option value="C1">Level C1</option>
                </select>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <span>
                  Showing <strong>{flashcardItems.length}</strong> cards in queue
                </span>
              </div>
            </div>

            <FlashcardDeck items={flashcardItems} />
          </div>
        )}

        {/* TAB 2: Full Vocabulary Library */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search German or English word..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="A1">Level A1</option>
                  <option value="A2">Level A2</option>
                  <option value="B1">Level B1</option>
                  <option value="B2">Level B2</option>
                  <option value="C1">Level C1</option>
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold cursor-pointer max-w-[200px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vocabulary Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredItems.map((item) => {
                const isBookmarked = profile.bookmarkedVocabIds.includes(item.id);
                const srsStatus = srsData[item.id]?.status;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-3 hover:border-amber-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {item.level}
                          </span>
                          {getArticleBadge(item.article)}
                          {srsStatus === 'mastered' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              Mastered
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => store.toggleBookmarkVocab(item.id)}
                            className="p-1 rounded text-slate-400 hover:text-amber-500 cursor-pointer"
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-500" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                          <AudioButton text={item.audioText || item.german} size="sm" />
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {item.article ? `${item.article} ` : ''}
                        {item.german}
                      </h3>
                      {item.plural && (
                        <p className="text-xs text-slate-400 font-medium mb-1">
                          Plural: {item.plural}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                        {item.english}
                      </p>
                    </div>

                    {item.exampleSentence && (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.exampleSentence}
                        </p>
                        <p className="text-slate-500 text-[11px] italic">
                          {item.exampleTranslation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
