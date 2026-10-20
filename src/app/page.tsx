'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Briefcase,
  Terminal,
  Headphones,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { CEFR_LEVELS_OVERVIEW } from '@/data/courses';
import { AudioButton } from '@/components/ui/AudioButton';

export default function LandingPage() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 antialiased">
      {/* Navigation Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex flex-col gap-0.5 w-6 h-5 rounded-xs overflow-hidden shadow-xs border border-slate-300 dark:border-slate-700">
              <div className="bg-slate-900 h-1/3 w-full" />
              <div className="bg-red-600 h-1/3 w-full" />
              <div className="bg-amber-400 h-1/3 w-full" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Deutsch<span className="text-amber-600 dark:text-amber-400">Path</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <Link href="/courses" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Curriculum (A1–C1)
            </Link>
            <Link href="/alphabet" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Alphabet Lab
            </Link>
            <Link href="/grammar" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Grammar
            </Link>
            <Link href="/work" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Career & IT
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all duration-150 active:scale-95 flex items-center gap-1.5"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Complete CEFR German Academy · Zero to Professional Fluency</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          From your first German word to <span className="text-amber-600 dark:text-amber-400 underline decoration-amber-400/40">professional fluency</span>.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Engineered specifically for English speakers. Master the German alphabet, cases, sentence mechanics, workplace communication, and CEFR exams with authentic pronunciation audio and structured practice.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md shadow-amber-500/20 transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5" />
            <span>Take Placement Test / Get Started</span>
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 font-bold text-base transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Audio Preview Card */}
        <div className="max-w-xl mx-auto p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-left">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Interactive Audio Test
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Standard German (de-DE)</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-base text-slate-900 dark:text-white">
                „Herzlich willkommen bei DeutschPath!“
              </p>
              <p className="text-xs text-slate-500">
                “Cordially welcome to DeutschPath!”
              </p>
            </div>
            <AudioButton text="Herzlich willkommen bei DeutschPath!" size="md" />
          </div>
        </div>
      </section>

      {/* The CEFR Progression Track */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              The Complete CEFR Learning Journey (A1–C1)
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Systematic progression adhering strictly to Common European Framework of Reference descriptors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {levels.map((lvl) => {
              const info = CEFR_LEVELS_OVERVIEW[lvl];
              return (
                <Link
                  key={lvl}
                  href={`/courses/${lvl.toLowerCase()}`}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 bg-[#FDFBF7] dark:bg-slate-900/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-lg text-sm font-extrabold bg-amber-500 text-white">
                      Level {lvl}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {info.estimatedHours}h
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-3">
                    {info.outcome}
                  </p>
                  <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <span>Explore Level</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Everything You Need for Real German Fluency
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Not just vocabulary drills or passive flashcards. DeutschPath covers all four language skills plus professional German tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              Alphabet & Sound Laboratory
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              All 26 standard letters plus Ä, Ö, Ü, and ß. Interactive audio with slow-speed replay, minimal pair comparisons (ich vs ach, ei vs ie), and the golden noun capitalization rule.
            </p>
            <Link href="/alphabet" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
              <span>Open Alphabet Lab</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              Grammar Academy (Zero Jargon)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Clear English explanations, sentence formulas, declension tables, right vs. wrong comparisons, and specific pitfalls for native English speakers.
            </p>
            <Link href="/grammar" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>Browse Grammar Topics</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              German for Work & IT Engineers
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Dedicated track for career relocation: German Lebenslauf, cover letters (Anschreiben), job interviews, Daily Scrum meetings, and relocation bureaucracy (Anmeldung, Steuer-ID).
            </p>
            <Link href="/work" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
              <span>Explore Career Track</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center mb-4">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              Listening & Speaking Labs
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Tiered native-speed German audio, transcript toggle, and speech recognition comparison that highlights missing or mispronounced words in real time.
            </p>
            <Link href="/speaking" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
              <span>Open Speaking Lab</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              German for Software Developers
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              100+ technical terms, Git terminology in German, code review phrases, sprint planning, and architecture presentation templates.
            </p>
            <Link href="/it-german" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
              <span>View IT German Track</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              Goethe & telc Mock Exams
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Realistic timed practice tests for A1, A2, and B1 certifications with Reading, Listening, and Writing sections to build examination confidence.
            </p>
            <Link href="/exams" className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1">
              <span>Take Mock Exams</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950 text-slate-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">DeutschPath</span>
            <span>— The Serious German Learning Academy for English Speakers.</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Created by Naghul Pranav K R | Contact: <a href="mailto:naghul695@gmail.com" className="underline">naghul695@gmail.com</a></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/courses" className="hover:text-slate-900 dark:hover:text-white">
              Curriculum
            </Link>
            <Link href="/onboarding" className="hover:text-slate-900 dark:hover:text-white">
              Placement Test
            </Link>
            <Link href="/auth" className="hover:text-slate-900 dark:hover:text-white">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
