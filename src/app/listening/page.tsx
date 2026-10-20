'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { LISTENING_LESSONS } from '@/data/listening';
import { ListeningLesson } from '@/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { ExerciseEngine } from '@/components/exercises/ExerciseEngine';
import {
  Headphones,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  BookOpen,
  Volume2,
} from 'lucide-react';

export default function ListeningLabPage() {
  const [activeLesson, setActiveLesson] = useState<ListeningLesson>(LISTENING_LESSONS[0]);
  const [showTranscript, setShowTranscript] = useState(false);

  // Concatenate full script text for universal playback
  const fullScriptGerman = activeLesson.transcript.map((t) => t.german).join(' ');

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 mb-2">
            <Headphones className="w-3.5 h-3.5" />
            <span>Auditory Comprehension & Natural Speech</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German Listening Laboratory
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Train your ear with authentic German train station announcements, medical appointments, radio podcasts, and agile sprint discussions.
          </p>
        </div>

        {/* Lesson Selector Chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          {LISTENING_LESSONS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setActiveLesson(l);
                setShowTranscript(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeLesson.id === l.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/10 dark:bg-white/10 font-black">
                {l.level}
              </span>
              <span>{l.title}</span>
            </button>
          ))}
        </div>

        {/* Main Audio Player Card */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-white font-extrabold text-xs">
                  Level {activeLesson.level}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{activeLesson.audioDurationSeconds}s</span>
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                {activeLesson.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeLesson.context}</p>
            </div>

            {/* Master Audio Button */}
            <div className="flex items-center gap-2">
              <AudioButton
                text={fullScriptGerman}
                size="lg"
                label="Play Full Audio"
              />
            </div>
          </div>

          {/* Key Vocabulary Preview */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 mr-2">
              Key Vocabulary to Listen For:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {activeLesson.vocabularyHighlights.map((v, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Transcript Toggle Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {showTranscript ? (
                <>
                  <EyeOff className="w-4 h-4 text-slate-500" />
                  <span>Hide German Transcript (Challenge Mode)</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>Reveal German Transcript & Translation</span>
                </>
              )}
            </button>
          </div>

          {/* Revealed Transcript Box */}
          {showTranscript && (
            <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-3 animate-in fade-in duration-200">
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300">
                Transcript & English Translation:
              </h3>
              <div className="space-y-3">
                {activeLesson.transcript.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                        {line.speaker}
                      </span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {line.german}
                      </p>
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        {line.english}
                      </p>
                    </div>
                    <AudioButton text={line.german} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comprehension Questions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Listening Comprehension Assessment</span>
          </h3>

          <ExerciseEngine
            key={activeLesson.id}
            exercises={activeLesson.questions}
            xpReward={40}
          />
        </div>
      </div>
    </AppLayout>
  );
}
