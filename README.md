# DeutschPath — Learn German from Zero to Professional Fluency (A1–C1)

> **DeutschPath** is an enterprise-grade, comprehensive German language learning platform built for English speakers, international students, and tech professionals relocating to Germany.

![DeutschPath](https://img.shields.io/badge/CEFR-A0_to_C1-indigo.svg)
![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-cyan.svg)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald.svg)

---

## 🌟 Key Features

1. **20 Complete, Interactive A1 Lessons**: Authored by linguistic principles with outcomes, grammatical analysis, dialogues, vocabulary, and interactive exercises.
2. **Phonetics & Alphabet Lab (`/alphabet`)**: 30 German characters (`A–Z`, `Ä`, `Ö`, `Ü`, `ß`), IPA symbols, audio pronunciation with 1.0x & 0.72x slow mode, and minimal pairs discrimination tests.
3. **Grammar Academy (`/grammar`)**: 10+ core topics (V2 word order, der/die/das grammatical gender rules, accusative, dative, two-way prepositions, Perfekt tense, modal verbs, subordinate clauses) with formulas, memory tricks, right vs. wrong pairs, and mastery quizzes.
4. **Spaced Repetition System (`/vocabulary`)**: SuperMemo SM-2 & Leitner 5-box algorithm powering 300+ flashcards with 3D flip card animations and color-coded gender indicators (der: blue, die: red, das: green).
5. **German for Tech Professionals (`/it-german`)**: Daily Scrum standup scripts, PR code review phrasing, and a 100+ word bilingual software engineering glossary.
6. **German for Work & Relocation (`/work`)**: Bureaucratic guidance for *Anmeldung*, *Steuerklasse*, *Krankenkasse*, German CV (*Lebenslauf*) guidelines, and formal cover letters (*Anschreiben*).
7. **Interactive Labs**:
   - **Listening Lab (`/listening`)**: Tiered audio tracks with toggleable transcript challenge mode.
   - **Speaking Lab (`/speaking`)**: Browser microphone input with word-by-word diff pronunciation evaluation.
   - **Reading Academy (`/reading`)**: Dual-column parallel texts with interactive word glossaries.
   - **Writing Practice (`/writing`)**: Practical prompts with automated syntax and capitalization checking.
   - **AI Tutor (`/tutor`)**: 16 practical conversation scenarios (baker, doctor, job interview, train station) with hints and simulated dialogues.
   - **Mock Exams (`/exams`)**: Goethe-Zertifikat & telc style timed practice assessments.
   - **Analytics & Notebook (`/analytics`, `/notebook`)**: Study velocity metrics, CEFR radar, bookmarks, and notes.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start learning immediately.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🗄️ Database Setup (Supabase)

DeutschPath runs seamlessly **offline** using `localStorage` without any setup required.

To connect your own **Supabase** backend:
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the SQL Editor and run the script in `supabase/schema.sql`.
3. Create a `.env.local` file with your credentials:
```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🎙️ Audio & Speech Recognition

DeutschPath utilizes the **Web Speech API**:
- **SpeechSynthesis (`de-DE`)**: Native, zero-latency German speech with speed controls (1.0x normal, 0.72x slow).
- **SpeechRecognition (`de-DE`)**: In-browser speech-to-text with Levenshtein-distance word diff analysis for pronunciation feedback.

---

## 🏛️ Project Structure

- `src/app/`: Next.js 16 App Router pages (24 routes)
- `src/components/`: Reusable UI, layout, flashcard, and exercise components
- `src/data/`: Comprehensive curriculum datasets (Alphabet, 20 Lessons, Vocabulary, Grammar, IT, Work, Scenarios)
- `src/lib/`: Universal audio engine, SM-2 SRS algorithm, reactive store, and Supabase client
- `src/types/`: Full TypeScript models and domain types
- `supabase/schema.sql`: PostgreSQL schema with Row-Level Security (RLS)

---

## 📄 License
MIT License. Built with passion for German language mastery.
