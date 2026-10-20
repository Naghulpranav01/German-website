'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { getLessonById } from '@/data/courses';
import { CEFRLevel } from '@/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { ExerciseEngine } from '@/components/exercises/ExerciseEngine';
import { useLearnerStore } from '@/lib/store';
import { ArrowLeft, BookOpen, CheckCircle2, Star, Clock, Sparkles, MessageSquare, Lightbulb, Play } from 'lucide-react';

function LessonPlayerContent() {
  const params = useParams();
  const router = useRouter();
  const level = String(params?.level || 'a1').toUpperCase() as CEFRLevel;
  const lessonId = String(params?.lessonId || 'a1_l1');

  const lesson = getLessonById(level, lessonId);
  const { profile, store } = useLearnerStore();
  const [activeTab, setActiveTab] = useState<'study' | 'practice'>('study');

  if (!lesson) {
    return (
      <div className="p-12 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2">Lesson not found</h2>
        <p className="text-slate-500 text-sm mb-4">
          Could not find lesson id "{lessonId}" for level {level}.
        </p>
        <Link
          href={`/courses/${level.toLowerCase()}`}
          className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs"
        >
          Back to Course
        </Link>
      </div>
    );
  }

  const isCompleted = profile.completedLessons.includes(lesson.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Navigation back */}
      <div className="flex items-center justify-between">
        <Link
          href={`/courses/${level.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Level {level} Lessons</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>+{lesson.xpReward} XP</span>
          </span>
          {isCompleted && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Completed</span>
            </span>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
          <span>Level {level} · Lesson {lesson.lessonOrder}</span>
          <span>·</span>
          <span>~{lesson.estimatedMinutes} Mins</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
          {lesson.title}
        </h1>
        <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3">
          {lesson.germanTitle}
        </p>
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs">
          <strong className="text-amber-900 dark:text-amber-200">Learning Outcome: </strong>
          <span className="text-amber-800 dark:text-amber-300">{lesson.outcome}</span>
        </div>
      </div>

      {/* Tabs: Study Content vs Practice Engine */}
      <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('study')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'study'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>1. Lesson Content & Audio</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('practice')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'practice'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>2. Interactive Practice Room ({lesson.exercises.length} Exercises)</span>
        </button>
      </div>

      {/* TAB 1: Study Content */}
      {activeTab === 'study' && (
        <div className="space-y-6">
          {lesson.content.map((item, index) => {
            if (item.type === 'explanation') {
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2"
                >
                  {item.title && (
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>{item.title}</span>
                    </h3>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {item.body}
                  </p>
                </div>
              );
            }

            if (item.type === 'grammar_tip') {
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 shadow-xs space-y-2"
                >
                  <h3 className="text-base font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed whitespace-pre-line">
                    {item.body}
                  </p>
                </div>
              );
            }

            if (item.type === 'dialogue') {
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-400">
                      {item.speaker}
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white">
                      {item.german}
                    </div>
                    <div className="text-xs text-slate-500 italic">
                      {item.english}
                    </div>
                  </div>
                  {item.german && (
                    <AudioButton text={item.german} size="sm" />
                  )}
                </div>
              );
            }

            if (item.type === 'audio_sample') {
              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 shadow-xs flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.german}
                    </div>
                    <div className="text-xs text-slate-500 mb-1">
                      {item.english}
                    </div>
                    {item.notes && (
                      <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                  {item.audioText && (
                    <AudioButton text={item.audioText} size="md" />
                  )}
                </div>
              );
            }

            return null;
          })}

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Ready to verify what you learned?
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Complete {lesson.exercises.length} interactive exercises to test your comprehension and earn +{lesson.xpReward} XP.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('practice')}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Go to Interactive Exercises
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Practice Room */}
      {activeTab === 'practice' && (
        <div>
          <ExerciseEngine
            exercises={lesson.exercises}
            lessonId={lesson.id}
            xpReward={lesson.xpReward}
            onFinish={(score) => {
              store.addStudyMinutes(lesson.estimatedMinutes);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function LessonPlayerPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading lesson...</div>}>
        <LessonPlayerContent />
      </Suspense>
    </AppLayout>
  );
}
