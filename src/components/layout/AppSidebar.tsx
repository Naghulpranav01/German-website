'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  BookOpen,
  Library,
  Headphones,
  Mic,
  BookMarked,
  PenTool,
  BotMessageSquare,
  Briefcase,
  Terminal,
  FileCheck2,
  LineChart,
  StickyNote,
  Settings,
} from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();

  const navGroups = [
    {
      title: 'Core Curriculum',
      items: [
        { label: 'Learner Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Courses Map (A1–C1)', href: '/courses', icon: Layers },
        { label: 'Alphabet & Sounds Lab', href: '/alphabet', icon: Sparkles },
        { label: 'Grammar Academy', href: '/grammar', icon: BookOpen },
        { label: 'Vocabulary & Flashcards', href: '/vocabulary', icon: Library },
      ],
    },
    {
      title: 'Skills Laboratory',
      items: [
        { label: 'Listening Laboratory', href: '/listening', icon: Headphones },
        { label: 'Speaking Laboratory', href: '/speaking', icon: Mic },
        { label: 'Reading Academy', href: '/reading', icon: BookMarked },
        { label: 'Writing Practice', href: '/writing', icon: PenTool },
        { label: 'AI Conversation Tutor', href: '/tutor', icon: BotMessageSquare },
      ],
    },
    {
      title: 'Career & Fluency',
      items: [
        { label: 'German for Work', href: '/work', icon: Briefcase },
        { label: 'German for IT & Tech', href: '/it-german', icon: Terminal },
        { label: 'Mock Examinations', href: '/exams', icon: FileCheck2 },
      ],
    },
    {
      title: 'Personal Learning',
      items: [
        { label: 'Study Analytics', href: '/analytics', icon: LineChart },
        { label: 'Notebook & Bookmarks', href: '/notebook', icon: StickyNote },
        { label: 'Profile & Settings', href: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-4 overflow-y-auto">
      <div className="space-y-6">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-3">
              {group.title}
            </p>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border-l-4 border-amber-500 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
