'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLearnerStore } from '@/lib/store';
import { VOCABULARY_LIST } from '@/data/vocabulary';
import { GRAMMAR_TOPICS } from '@/data/grammar';
import { AudioButton } from '@/components/ui/AudioButton';
import {
  StickyNote,
  Bookmark,
  BookOpen,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  Library,
} from 'lucide-react';

export default function NotebookPage() {
  const { profile, store } = useLearnerStore();
  const [activeTab, setActiveTab] = useState<'notes' | 'vocab' | 'grammar'>('notes');
  const [newNoteKey, setNewNoteKey] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  // Resolve bookmarked items
  const bookmarkedVocab = VOCABULARY_LIST.filter((v) =>
    profile.bookmarkedVocabIds.includes(v.id)
  );

  const bookmarkedGrammar = GRAMMAR_TOPICS.filter((g) =>
    profile.bookmarkedGrammarIds.includes(g.id)
  );

  const handleSaveCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteKey.trim() || !newNoteText.trim()) return;
    store.saveNote(newNoteKey.trim(), newNoteText.trim());
    setNewNoteKey('');
    setNewNoteText('');
  };

  const handleDeleteNote = (key: string) => {
    const updated = { ...profile.notes };
    delete updated[key];
    store.saveProfile({ ...profile, notes: updated });
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
            <StickyNote className="w-3.5 h-3.5" />
            <span>Personal Working Memory on Disk</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My German Notebook & Bookmarks
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Access your saved vocabulary, bookmarked grammar formulas, and personal memory notes anytime.
          </p>
        </div>

        {/* Tab Navigator */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span>Personal Notes ({Object.keys(profile.notes).length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vocab')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'vocab'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Saved Vocab ({bookmarkedVocab.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('grammar')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'grammar'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Grammar ({bookmarkedGrammar.length})</span>
          </button>
        </div>

        {/* TAB 1: Personal Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Create Note Form */}
            <form
              onSubmit={handleSaveCustomNote}
              className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
            >
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-amber-500" />
                <span>Add a Personal Learning Note or Mnemonic</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={newNoteKey}
                  onChange={(e) => setNewNoteKey(e.target.value)}
                  placeholder="Topic / Title (e.g. Dative Prepositions)"
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <input
                  type="text"
                  required
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Your note or memory trick..."
                  className="sm:col-span-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(profile.notes).map(([key, text]) => (
                <div
                  key={key}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {key}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(key)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-[#FDFBF7] dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Bookmarked Vocabulary */}
        {activeTab === 'vocab' && (
          <div className="space-y-4">
            {bookmarkedVocab.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                You haven't bookmarked any vocabulary yet. Click the bookmark icon on any flashcard or dictionary item!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {bookmarkedVocab.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
                          {v.level}
                        </span>
                        {v.article && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                            {v.article}
                          </span>
                        )}
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {v.german}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{v.english}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <AudioButton text={v.audioText || v.german} size="sm" />
                      <button
                        type="button"
                        onClick={() => store.toggleBookmarkVocab(v.id)}
                        className="text-slate-400 hover:text-red-500 text-xs p-1"
                        title="Remove bookmark"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Bookmarked Grammar Topics */}
        {activeTab === 'grammar' && (
          <div className="space-y-4">
            {bookmarkedGrammar.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                No grammar topics bookmarked yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {bookmarkedGrammar.map((g) => (
                  <Link
                    key={g.id}
                    href="/grammar"
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between gap-4 hover:border-amber-400 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                          {g.level}
                        </span>
                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                          {g.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{g.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
