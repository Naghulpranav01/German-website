'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SpeechInput } from '@/components/ui/SpeechInput';
import { AudioButton } from '@/components/ui/AudioButton';
import { Mic, Volume2, Sparkles, CheckCircle2, RotateCcw, Lightbulb, ArrowRight } from 'lucide-react';
import { useLearnerStore } from '@/lib/store';

interface SpeakingPrompt {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  germanText: string;
  englishMeaning: string;
  pronunciationTip: string;
  category: string;
}

const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  {
    id: 'sp_1',
    level: 'A1',
    germanText: 'Guten Tag, mein Name ist Alex.',
    englishMeaning: 'Good day, my name is Alex.',
    pronunciationTip: 'Remember: hard G in "Tag" and the long "Ah" in "Name".',
    category: 'Introductions',
  },
  {
    id: 'sp_2',
    level: 'A1',
    germanText: 'Ich hätte gern ein Glas Wasser, bitte.',
    englishMeaning: 'I would like a glass of water, please.',
    pronunciationTip: 'Say "hätte" with short open Ä. German W in "Wasser" sounds like English V.',
    category: 'Restaurant & Dining',
  },
  {
    id: 'sp_3',
    level: 'A1',
    germanText: 'Entschuldigung, wo ist der nächste Bahnhof?',
    englishMeaning: 'Excuse me, where is the nearest train station?',
    pronunciationTip: 'Pronounce "sch" like "sh" in "shoe". "Z" in "nächste" sounds like "ts".',
    category: 'Directions',
  },
  {
    id: 'sp_4',
    level: 'A2',
    germanText: 'Ich bin gestern mit dem Zug nach Berlin gefahren.',
    englishMeaning: 'I traveled to Berlin by train yesterday.',
    pronunciationTip: 'Keep "Zug" long [tsuːk]. "gefahren" has silent H that lengthens the "a".',
    category: 'Past Experiences (Perfekt)',
  },
  {
    id: 'sp_5',
    level: 'A2',
    germanText: 'Könnten Sie mir bitte zeitnah Bescheid geben?',
    englishMeaning: 'Could you please let me know promptly?',
    pronunciationTip: 'Round your lips for the Umlaut Ö in "könnten". "ei" in "Bescheid" sounds like "eye".',
    category: 'Polite Requests',
  },
  {
    id: 'sp_6',
    level: 'B1',
    germanText: 'Ich bewerbe mich um die Stelle als Softwareentwickler.',
    englishMeaning: 'I am applying for the position as a software developer.',
    pronunciationTip: 'Stress on "-wickler". "W" is pronounced as English "V".',
    category: 'Job Interview',
  },
  {
    id: 'sp_7',
    level: 'B2',
    germanText: 'Aus technischer Sicht halte ich diese Architektur für äußerst zukunftssicher.',
    englishMeaning: 'From a technical standpoint, I consider this architecture extremely future-proof.',
    pronunciationTip: 'The "ch" in "technischer" is the soft ich-sound [ç]. "äu" in "äußerst" sounds like "oy".',
    category: 'Technical Presentation',
  },
];

export default function SpeakingLabPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lastAccuracy, setLastAccuracy] = useState<number | null>(null);
  const { store } = useLearnerStore();

  const currentPrompt = SPEAKING_PROMPTS[currentIdx];

  const handleNext = () => {
    setLastAccuracy(null);
    if (currentIdx < SPEAKING_PROMPTS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>Interactive Voice & Pronunciation Verification</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German Speaking Laboratory
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Listen to native German audio, shadow the sentence, record your microphone input, and get real-time word-by-word accuracy scoring.
          </p>
        </div>

        {/* Practice Station Card */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-extrabold text-xs">
                Level {currentPrompt.level}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Exercise {currentIdx + 1} of {SPEAKING_PROMPTS.length} · {currentPrompt.category}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Next Sentence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Model Sentence Display */}
          <div className="p-6 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-center space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Read and Speak this German Sentence:
            </span>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              „{currentPrompt.germanText}“
            </h2>

            <p className="text-sm font-medium text-slate-500 italic">
              {currentPrompt.englishMeaning}
            </p>

            <div className="pt-2 flex items-center justify-center gap-2">
              <AudioButton
                text={currentPrompt.germanText}
                size="md"
                label="Listen to Model"
              />
            </div>
          </div>

          {/* Pronunciation Tip */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200">Acoustic Guide: </strong>
              <span className="text-slate-600 dark:text-slate-400">{currentPrompt.pronunciationTip}</span>
            </div>
          </div>

          {/* Interactive Microphone Verification */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Record Your Voice:
            </span>
            <SpeechInput
              key={currentPrompt.id}
              expectedText={currentPrompt.germanText}
              onResult={(diff) => {
                setLastAccuracy(diff.accuracyScore);
                if (diff.accuracyScore >= 75) {
                  store.completeLesson(`speaking_${currentPrompt.id}`, 25);
                }
              }}
            />
          </div>

          {lastAccuracy !== null && lastAccuracy >= 75 && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                    Ausgezeichnet! (Excellent Pronunciation)
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400">
                    Your speech matched the German pronunciation model at {lastAccuracy}% accuracy. +25 XP awarded!
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                Next Prompt
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
