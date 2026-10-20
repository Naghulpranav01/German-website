'use client';

import React, { useState } from 'react';
import { Exercise } from '@/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { SpeechInput } from '@/components/ui/SpeechInput';
import { useLearnerStore } from '@/lib/store';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExerciseEngineProps {
  exercises: Exercise[];
  lessonId?: string;
  onFinish?: (scorePercent: number) => void;
  xpReward?: number;
}

export function ExerciseEngine({
  exercises,
  lessonId,
  onFinish,
  xpReward = 50,
}: ExerciseEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelected, setUserSelected] = useState<string>('');
  const [selectedWordOrder, setSelectedWordOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const { store } = useLearnerStore();
  const current = exercises[currentIndex];

  if (!current) {
    return (
      <div className="p-8 text-center text-slate-500">
        No exercises available for this section.
      </div>
    );
  }

  const handleWordOrderClick = (word: string, isFromSelected: boolean) => {
    if (submitted) return;
    if (isFromSelected) {
      setSelectedWordOrder((prev) => prev.filter((_, idx) => idx !== prev.indexOf(word)));
    } else {
      setSelectedWordOrder((prev) => [...prev, word]);
    }
  };

  const handleSubmit = () => {
    if (submitted) return;

    let answerToCheck = userSelected.trim();
    if (current.type === 'word_order') {
      answerToCheck = selectedWordOrder.join(' ').trim();
    }

    const expected = Array.isArray(current.correctAnswer)
      ? current.correctAnswer.map((a) => a.toLowerCase().trim())
      : [current.correctAnswer.toLowerCase().trim()];

    const cleanInput = answerToCheck
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
      .trim();

    const matched = expected.some((ans) => {
      const cleanExpected = ans.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim();
      return cleanInput === cleanExpected;
    });

    setIsCorrect(matched);
    if (matched) {
      setScoreCount((prev) => prev + 1);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserSelected('');
      setSelectedWordOrder([]);
      setSubmitted(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      // Finished all exercises
      const finalScorePercent = Math.round(((scoreCount + (isCorrect ? 1 : 0)) / exercises.length) * 100);
      setCompleted(true);

      if (finalScorePercent >= 60) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
      }

      if (lessonId) {
        store.completeLesson(lessonId, xpReward);
      }
      onFinish?.(finalScorePercent);
    }
  };

  const handleRetryCurrent = () => {
    setUserSelected('');
    setSelectedWordOrder([]);
    setSubmitted(false);
    setIsCorrect(false);
  };

  if (completed) {
    const finalScorePercent = Math.round((scoreCount / exercises.length) * 100);
    const passed = finalScorePercent >= 60;

    return (
      <div className="p-8 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm max-w-xl mx-auto">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          passed ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' : 'bg-slate-100 text-slate-500'
        }`}>
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {passed ? 'Wunderbar! Lesson Mastered!' : 'Good Effort! Keep Practicing'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          You scored <strong className="text-slate-900 dark:text-white">{scoreCount} of {exercises.length}</strong> correct ({finalScorePercent}%).
          {passed ? ` +${xpReward} XP awarded to your learning profile!` : ' Review the explanations below and try again to unlock mastery.'}
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setCurrentIndex(0);
              setScoreCount(0);
              setCompleted(false);
              setUserSelected('');
              setSelectedWordOrder([]);
              setSubmitted(false);
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-medium text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      {/* Exercise Header Progress */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            Question {currentIndex + 1} of {exercises.length}
          </span>
          <span className="text-xs text-slate-500 capitalize">
            {current.type.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-24 md:w-32 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Prompt & Instruction */}
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
          {current.instruction}
        </p>
        <div className="flex items-center gap-3">
          <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {current.prompt}
          </h4>
          {current.audioPrompt && (
            <AudioButton text={current.audioPrompt} size="sm" />
          )}
        </div>
      </div>

      {/* Render Exercise Type Specific UI */}
      <div className="mb-6">
        {/* Type 1: Article Select (der / die / das) */}
        {current.type === 'article_select' && (
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { val: 'der', label: 'der (Masc)', color: 'border-blue-300 hover:border-blue-500 text-blue-700 bg-blue-50/50 dark:bg-blue-950/30 dark:text-blue-300' },
              { val: 'die', label: 'die (Fem)', color: 'border-red-300 hover:border-red-500 text-red-700 bg-red-50/50 dark:bg-red-950/30 dark:text-red-300' },
              { val: 'das', label: 'das (Neut)', color: 'border-emerald-300 hover:border-emerald-500 text-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30 dark:text-emerald-300' },
            ].map((art) => (
              <button
                key={art.val}
                type="button"
                disabled={submitted}
                onClick={() => setUserSelected(art.val)}
                className={`py-3.5 px-4 rounded-xl border-2 font-bold text-base transition-all duration-150 cursor-pointer ${art.color} ${
                  userSelected === art.val
                    ? 'ring-2 ring-amber-500 scale-102 shadow-sm'
                    : 'opacity-90'
                }`}
              >
                {art.label}
              </button>
            ))}
          </div>
        )}

        {/* Type 2: Multiple Choice & Verb Conjugation */}
        {(current.type === 'multiple_choice' || current.type === 'verb_conjugation' || current.type === 'fill_blank') && (
          <div className="space-y-2.5 max-w-xl">
            {current.options?.map((opt, i) => (
              <button
                key={i}
                type="button"
                disabled={submitted}
                onClick={() => setUserSelected(opt)}
                className={`w-full text-left p-3.5 rounded-xl border-2 font-medium text-sm md:text-base transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  userSelected === opt
                    ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900'
                }`}
              >
                <span>{opt}</span>
                <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs">
                  {userSelected === opt && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Type 3: Word Order */}
        {current.type === 'word_order' && (
          <div className="space-y-4 max-w-xl">
            {/* Target construction box */}
            <div className="min-h-14 p-3.5 rounded-xl border-2 border-dashed border-amber-300 dark:border-amber-800/80 bg-amber-50/20 dark:bg-amber-950/10 flex flex-wrap gap-2 items-center">
              {selectedWordOrder.length === 0 ? (
                <span className="text-sm text-slate-400 italic">Click words below to arrange the sentence</span>
              ) : (
                selectedWordOrder.map((w, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={submitted}
                    onClick={() => handleWordOrderClick(w, true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-white font-medium text-sm shadow-sm hover:bg-amber-600 transition-colors cursor-pointer"
                  >
                    {w}
                  </button>
                ))
              )}
            </div>

            {/* Word bank */}
            <div className="flex flex-wrap gap-2 pt-2">
              {current.options?.map((w, idx) => {
                const isUsed = selectedWordOrder.includes(w);
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={submitted || isUsed}
                    onClick={() => handleWordOrderClick(w, false)}
                    className={`px-3 py-1.5 rounded-lg border font-medium text-sm transition-all duration-150 cursor-pointer ${
                      isUsed
                        ? 'opacity-30 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-400 text-slate-800 dark:text-slate-200 shadow-xs'
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Type 4: Speaking Exercise */}
        {current.type === 'speaking' && (
          <div className="space-y-4 max-w-xl">
            <SpeechInput
              expectedText={String(current.correctAnswer)}
              onResult={(diff) => {
                if (diff.accuracyScore >= 70) {
                  setUserSelected(String(current.correctAnswer));
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Feedback banner after submission */}
      {submitted && (
        <div
          className={`p-4 rounded-xl mb-6 flex items-start gap-3.5 ${
            isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-sm">
            <div className="font-bold text-base mb-1">
              {isCorrect ? 'Richtig! (Correct)' : 'Nicht ganz! (Not quite)'}
            </div>
            <p className="mb-2 leading-relaxed">{current.explanation}</p>
            {!isCorrect && (
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Correct answer: <span className="underline decoration-amber-500 font-bold">{Array.isArray(current.correctAnswer) ? current.correctAnswer.join(' / ') : current.correctAnswer}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div>
          {current.hint && !submitted && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-slate-500 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
          )}
          {showHint && current.hint && (
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 italic">
              Hint: {current.hint}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {submitted && !isCorrect && (
            <button
              type="button"
              onClick={handleRetryCurrent}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-medium text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          )}

          {!submitted ? (
            <button
              type="button"
              disabled={
                current.type === 'word_order'
                  ? selectedWordOrder.length === 0
                  : !userSelected
              }
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:hover:bg-amber-500 text-white font-bold text-sm shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
            >
              Check Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-sm shadow-sm transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{currentIndex < exercises.length - 1 ? 'Next Question' : 'Complete Lesson'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
