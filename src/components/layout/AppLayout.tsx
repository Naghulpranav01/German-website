'use client';

import React, { Suspense } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { MobileNav } from './MobileNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 antialiased">
      <Suspense fallback={<div className="h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950" />}>
        <AppHeader />
      </Suspense>
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <div className="hidden md:block">
          <Suspense fallback={<aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-[calc(100vh-4rem)]" />}>
            <AppSidebar />
          </Suspense>
        </div>
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 pb-24 md:pb-12 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
      <Suspense fallback={null}>
        <MobileNav />
      </Suspense>
    </div>
  );
}
