'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, BookOpen, BotMessageSquare, Library } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Courses', href: '/courses', icon: Layers },
    { label: 'Grammar', href: '/grammar', icon: BookOpen },
    { label: 'Vocab', href: '/vocabulary', icon: Library },
    { label: 'AI Tutor', href: '/tutor', icon: BotMessageSquare },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around h-16 px-2">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg text-xs font-semibold transition-colors ${
              isActive
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
