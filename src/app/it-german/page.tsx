'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { IT_GLOSSARY, IT_STANDUP_SCRIPTS, IT_CODE_REVIEW_PHRASES } from '@/data/it';
import { AudioButton } from '@/components/ui/AudioButton';
import {
  Terminal,
  GitBranch,
  Search,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Code2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function ITGermanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredGlossary = IT_GLOSSARY.filter((item) => {
    const matchesSearch =
      item.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = Array.from(new Set(IT_GLOSSARY.map((g) => g.category)));

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Specialized Tech Track · Software Engineers & DevOps</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            German for IT & Software Professionals
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Communicate naturally in agile teams in Berlin, Munich, or Frankfurt. Master Daily Standups, Pull Request code reviews, bug reports, and architecture discussions.
          </p>
        </div>

        {/* Section 1: The German Daily Scrum Masterclass */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400 flex items-center justify-center font-bold">
                <Code2 className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                How to Deliver Your Daily Scrum Update in German
              </h2>
            </div>
            <AudioButton text={IT_STANDUP_SCRIPTS[0].scriptGerman} size="sm" label="Listen to Standup" />
          </div>

          <p className="text-xs text-slate-500">
            German tech teams use a mix of standard German and international developer terminology. Follow this reliable three-step formula:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <strong className="text-slate-900 dark:text-white block font-bold">
                1. Gestern habe ich...
              </strong>
              <p className="text-slate-500 italic">"Gestern habe ich die API-Endpunkte für den Checkout fertiggestellt."</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <strong className="text-slate-900 dark:text-white block font-bold">
                2. Heute arbeite ich an...
              </strong>
              <p className="text-slate-500 italic">"Heute schreibe ich die Unit-Tests und bereite den Pull Request vor."</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <strong className="text-slate-900 dark:text-white block font-bold">
                3. Blocker habe ich...
              </strong>
              <p className="text-slate-500 italic">"Ich habe aktuell keine Blocker, bräuchte aber nachher kurz ein Review."</p>
            </div>
          </div>
        </div>

        {/* Section 2: Pull Request & Code Review Phrasing */}
        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Authentic Pull Request Review Phrases
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Diplomatic, constructive code review phrases used in German engineering teams:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {IT_CODE_REVIEW_PHRASES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FDFBF7] dark:bg-slate-950/40 text-xs flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 block">
                    {item.context}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    „{item.german}“
                  </p>
                  <p className="text-slate-500 italic text-[11px]">{item.english}</p>
                </div>
                <AudioButton text={item.german} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: IT & Software Engineering Glossary */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                German Tech & Software Engineering Glossary
              </h2>
              <p className="text-xs text-slate-500">
                100+ terms covering Git, Databases, DevOps, Agile, Frontend, and Privacy.
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter tech term..."
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold cursor-pointer"
              >
                <option value="all">All Domains</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.category}
                    </span>
                    <AudioButton text={item.german} size="sm" />
                  </div>

                  <strong className="font-extrabold text-base text-slate-900 dark:text-white block mt-1">
                    {item.german}
                  </strong>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-2">
                    {item.english}
                  </span>

                  <p className="text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    "{item.example}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
