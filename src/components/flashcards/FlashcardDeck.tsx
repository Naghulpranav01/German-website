'use client';

import React, { useState } from 'react';
import { VocabularyItem } from '@/types';
import { useLearnerStore } from '@/lib/store';
import { AudioButton } from '@/components/ui/AudioButton';
import { Bookmark, BookmarkCheck, RotateCw, CheckCircle2 } from 'lucide-react';

interface FlashcardDeckProps {
  items: VocabularyItem[];
}

export function FlashcardDeck({ items }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const { store, profile, srsData } = useLearnerStore();
  const current = items[currentIndex];

  if (!current) {
    return (
      <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Alles erledigt! (All caught up!)
        </h3>
        <p className="text-slate-500 text-sm">
          No flashcards currently due in this deck. Review completed vocabulary or explore new words!
        </p>
      </div>
    );
  }

  const srsItem = srsData[current.id];
  const boxLevel = srsItem ? srsItem.box : 1;
  const isBookmarked = profile.bookmarkedVocabIds.includes(current.id);

  const handleRating = (rating: 1 | 2 | 3 | 4) => {
    store.recordFlashcardReview(current.id, rating);
    setReviewedCount((prev) => prev + 1);
    setIsFlipped(false);
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const getArticleBadge = (article?: string) => {
    if (!article) return null;
    if (article === 'der') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          der (Masc)
        </span>
      );
    }
    if (article === 'die') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800">
          die (Fem)
        </span>
      );
    }
    if (article === 'das') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          das (Neut)
        </span>
      );
    }
    return null;
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Top Deck Stats */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
        <span>
          Card {currentIndex + 1} of {items.length} · Reviewed today: {reviewedCount}
        </span>
        <div className="flex items-center gap-1.5">
          <span>Leitner Box:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((b) => (
              <span
                key={b}
                className={`w-4 h-2 rounded-sm ${
                  b <= boxLevel ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The 3D Flip Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        className="w-full min-h-[340px] md:min-h-[380px] p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex flex-col justify-between cursor-pointer hover:border-amber-400 transition-all select-none relative"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {current.level}
            </span>
            {getArticleBadge(current.article)}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                store.toggleBookmarkVocab(current.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 cursor-pointer"
              title="Bookmark card"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-amber-500" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <AudioButton text={current.audioText || current.german} size="sm" />
          </div>
        </div>

        {/* Card Center: German or English */}
        <div className="text-center py-6">
          {!isFlipped ? (
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                {current.article ? `${current.article} ` : ''}
                {current.german}
              </h2>
              {current.plural && (
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Plural: {current.plural}
                </p>
              )}
              <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Click to reveal English meaning</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                {current.english}
              </h3>

              {current.exampleSentence && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left max-w-md mx-auto">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {current.exampleSentence}
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    {current.exampleTranslation}
                  </p>
                </div>
              )}

              {current.conjugation && (
                <div className="text-xs text-slate-500 grid grid-cols-3 gap-1 pt-1">
                  <span>ich {current.conjugation.ich}</span>
                  <span>du {current.conjugation.du}</span>
                  <span>er/sie {current.conjugation.er_sie_es}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer: Category */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
          <span>Category: {current.category}</span>
          <span className="capitalize">{current.partOfSpeech}</span>
        </div>
      </div>

      {/* SRS Rating Actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => handleRating(1)}
          className="py-2.5 px-2 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-bold text-xs flex flex-col items-center gap-0.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Again</span>
          <span className="text-[10px] font-normal opacity-80">&lt; 1 day</span>
        </button>

        <button
          type="button"
          onClick={() => handleRating(2)}
          className="py-2.5 px-2 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-xs flex flex-col items-center gap-0.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Hard</span>
          <span className="text-[10px] font-normal opacity-80">2 days</span>
        </button>

        <button
          type="button"
          onClick={() => handleRating(3)}
          className="py-2.5 px-2 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold text-xs flex flex-col items-center gap-0.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Good</span>
          <span className="text-[10px] font-normal opacity-80">4 days</span>
        </button>

        <button
          type="button"
          onClick={() => handleRating(4)}
          className="py-2.5 px-2 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex flex-col items-center gap-0.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Easy</span>
          <span className="text-[10px] font-normal opacity-80">7+ days</span>
        </button>
      </div>
    </div>
  );
}
