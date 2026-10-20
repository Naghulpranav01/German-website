import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DeutschPath — Learn German from Zero to Professional Fluency (A1–C1)',
  description:
    'Complete German learning academy engineered for English speakers. Comprehensive curriculum from A0 alphabet and A1 basics to B2/C1 workplace fluency and Goethe/telc exam preparation.',
  keywords: [
    'Learn German',
    'German for English Speakers',
    'CEFR A1 German',
    'German for Work',
    'German for IT Professionals',
    'Goethe-Zertifikat Practice',
    'German Pronunciation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FDFBF7] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
