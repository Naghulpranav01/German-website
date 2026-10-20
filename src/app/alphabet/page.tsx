'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ALPHABET_LETTERS, MINIMAL_PAIRS, PRONUNCIATION_TOPICS } from '@/data/alphabet';
import { AlphabetLetter, MinimalPair } from '@/types';
import { AudioButton } from '@/components/ui/AudioButton';
import {
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  RotateCw,
  Lightbulb,
} from 'lucide-react';

export default function AlphabetLabPage() {
  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter>(ALPHABET_LETTERS[0]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'vowel' | 'consonant' | 'umlaut' | 'special'>('all');
  const [minimalPairAnswers, setMinimalPairAnswers] = useState<Record<string, string>>({});

  const filteredLetters = ALPHABET_LETTERS.filter((l) => {
    if (filterCategory === 'all') return true;
    return l.category === filterCategory;
  });

  const handleMinimalPairSelect = (pairId: string, word: string) => {
    setMinimalPairAnswers((prev) => ({ ...prev, [pairId]: word }));
  };

  return (
    <AppLayout>
      <div className="space-y-10 max-w-5xl mx-auto">
        {/* Page Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phonetics & Pronunciation Laboratory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German Alphabet & Sound Lab
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Click any letter to listen to its German name, IPA transcription, English approximation, and example vocabulary with natural and slow playback.
          </p>
        </div>

        {/* Interactive Alphabet Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Alphabet Grid & Filters */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All 30 Letters' },
                { id: 'vowel', label: 'Vowels (A, E, I, O, U)' },
                { id: 'umlaut', label: 'Umlauts (Ä, Ö, Ü)' },
                { id: 'special', label: 'Eszett (ß)' },
                { id: 'consonant', label: 'Consonants' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilterCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    filterCategory === cat.id
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Letter Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
              {filteredLetters.map((l) => {
                const isSelected = selectedLetter.letter === l.letter;
                const isSpecial = l.isUmlaut || l.isSpecial;

                return (
                  <button
                    key={l.letter}
                    type="button"
                    onClick={() => setSelectedLetter(l)}
                    className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400 scale-102 shadow-sm'
                        : isSpecial
                        ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/20 text-slate-900 dark:text-slate-100 hover:border-amber-300'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl font-black">{l.letter}</span>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                      [{l.germanName}]
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Col: Active Letter Inspector */}
          <div className="p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-800/80 bg-white dark:bg-slate-900 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-3xl shadow-sm">
                  {selectedLetter.letter}
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                    {selectedLetter.germanName}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    IPA: {selectedLetter.ipa}
                  </span>
                </div>
              </div>

              <AudioButton
                text={`${selectedLetter.letter}. ${selectedLetter.exampleWord}.`}
                size="md"
              />
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">
                  English Sound Approximation:
                </strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {selectedLetter.englishApprox}
                </p>
              </div>

              <div>
                <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">
                  Example Vocabulary:
                </strong>
                <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      {selectedLetter.exampleWord}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {selectedLetter.exampleTranslation}
                    </span>
                  </div>
                  <AudioButton text={selectedLetter.exampleWord} size="sm" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-[11px]">
                <strong className="text-red-900 dark:text-red-300 block mb-0.5">
                  English Speaker Pitfall:
                </strong>
                <p className="text-red-800 dark:text-red-400">
                  {selectedLetter.mistakeTip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Pairs Listening Discrimination Lab */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 mb-2">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Acoustic Discrimination (Minimal Pairs)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Minimal Pair Discrimination Quizzes
            </h2>
            <p className="text-xs text-slate-500">
              Listen to subtle phonetic differences that completely change word meanings in German.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MINIMAL_PAIRS.map((pair) => {
              const selectedWord = minimalPairAnswers[pair.id];
              const isSubmitted = Boolean(selectedWord);
              const isCorrect = selectedWord === pair.correctWord;

              return (
                <div
                  key={pair.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FDFBF7] dark:bg-slate-950/40 space-y-3"
                >
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {pair.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pair.explanation}
                  </p>

                  {/* Audio comparison chips */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm block">{pair.wordA}</span>
                        <span className="text-[10px] text-slate-400">{pair.meaningA}</span>
                      </div>
                      <AudioButton text={pair.wordA} size="sm" />
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm block">{pair.wordB}</span>
                        <span className="text-[10px] text-slate-400">{pair.meaningB}</span>
                      </div>
                      <AudioButton text={pair.wordB} size="sm" />
                    </div>
                  </div>

                  {/* Practice question */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {pair.practiceQuestion}
                    </p>
                    <div className="flex gap-2">
                      {[pair.wordA, pair.wordB].map((word) => (
                        <button
                          key={word}
                          type="button"
                          onClick={() => handleMinimalPairSelect(pair.id, word)}
                          className={`flex-1 py-1.5 px-3 rounded-xl font-bold text-xs border transition-colors cursor-pointer ${
                            selectedWord === word
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : 'bg-red-500 text-white border-red-500'
                              : 'border-slate-300 dark:border-slate-700 hover:border-amber-400'
                          }`}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Special Pronunciation Masterclasses */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Pronunciation Deep-Dives & Spelling Rules</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRONUNCIATION_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2"
              >
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {topic.title}
                </h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {topic.description}
                </p>
                <div className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed pt-1">
                  {topic.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
