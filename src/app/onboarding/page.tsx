'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLearnerStore } from '@/lib/store';
import { CEFRLevel, UserGoal, DailyTimeMinutes } from '@/types';
import {
  Compass,
  ArrowRight,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Plane,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface PlacementQuestion {
  id: number;
  level: CEFRLevel;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 1,
    level: 'A1',
    question: 'Wie heißen _____? (Formal address)',
    options: ['Sie', 'du', 'ihr', 'er'],
    correct: 'Sie',
    explanation: 'Formal address uses capitalized "Sie".',
  },
  {
    id: 2,
    level: 'A1',
    question: 'Ich trinke _____ Kaffee. (der Kaffee -> accusative masculine)',
    options: ['einen', 'ein', 'eine', 'einem'],
    correct: 'einen',
    explanation: 'Masculine direct object becomes "einen".',
  },
  {
    id: 3,
    level: 'A1',
    question: 'Am Samstag _____ ich meine Freunde. (V2 word order)',
    options: ['treffe', 'ich treffe', 'treffen', 'getroffen'],
    correct: 'treffe',
    explanation: 'Verb occupies Position 2: "Am Samstag treffe ich...".',
  },
  {
    id: 4,
    level: 'A2',
    question: 'Gestern _____ wir nach Frankfurt gefahren. (movement auxiliary)',
    options: ['sind', 'haben', 'waren', 'hatten'],
    correct: 'sind',
    explanation: 'Fahren is a verb of movement, requiring "sein".',
  },
  {
    id: 5,
    level: 'A2',
    question: 'Ich bleibe heute zu Hause, _____ ich krank bin.',
    options: ['weil', 'denn', 'deshalb', 'trotzdem'],
    correct: 'weil',
    explanation: '"weil" pushes the verb "bin" to the end of the subordinate clause.',
  },
  {
    id: 6,
    level: 'A2',
    question: 'Kannst du _____ bitte helfen? (dative pronoun)',
    options: ['mir', 'mich', 'ich', 'mein'],
    correct: 'mir',
    explanation: 'Helfen always takes the dative case (mir).',
  },
  {
    id: 7,
    level: 'B1',
    question: 'Ich wünsche Ihnen einen _____ Urlaub! (schön: masc accusative adjective)',
    options: ['schönen', 'schöne', 'schöner', 'schönes'],
    correct: 'schönen',
    explanation: 'Adjective ending after "einen" is -en.',
  },
  {
    id: '8' as any,
    level: 'B1',
    question: 'Wenn ich mehr Zeit hätte, _____ ich mehr Sport treiben.',
    options: ['würde', 'werde', 'wurde', 'hatte'],
    correct: 'würde',
    explanation: 'Hypothetical Konjunktiv II: "würde ... treiben".',
  },
  {
    id: '9' as any,
    level: 'B1',
    question: 'Das neue Bürogebäude _____ nächsten Monat eröffnet. (Passiv)',
    options: ['wird', 'ist', 'hat', 'wurde'],
    correct: 'wird',
    explanation: 'Present passive voice: wird + Partizip II.',
  },
  {
    id: '10' as any,
    level: 'B2',
    question: 'Er ging zur Arbeit, _____ er starkes Fieber hatte.',
    options: ['obwohl', 'trotzdem', 'deshalb', 'weil'],
    correct: 'obwohl',
    explanation: 'Subordinating concessive conjunction: "obwohl".',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { store } = useLearnerStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [selectedGoal, setSelectedGoal] = useState<UserGoal>('work');
  const [selectedMinutes, setSelectedMinutes] = useState<DailyTimeMinutes>(30);

  // Placement test state
  const [testActive, setTestActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [recommendedLevel, setRecommendedLevel] = useState<CEFRLevel>('A1');

  const goals = [
    { id: 'work', title: 'Work in Germany / Career', desc: 'Pass B1/B2, write German CV/Anschreiben, communicate with colleagues & clients', icon: Briefcase },
    { id: 'university', title: 'University Studies (Studium)', desc: 'Prepare for TestDaF / DSH-2, understand academic lectures & scientific literature', icon: GraduationCap },
    { id: 'daily', title: 'Everyday Life & Relocation', desc: 'Anmeldung, renting apartments, grocery shopping, doctor visits, and friends', icon: MessageSquare },
    { id: 'travel', title: 'Travel & Culture', desc: 'Explore Germany, Austria & Switzerland with conversational confidence', icon: Plane },
    { id: 'exam', title: 'Pass an Official Examination', desc: 'Goethe-Zertifikat, telc, or DTZ (Deutsch-Test für Zuwanderer)', icon: Award },
  ];

  const handleAnswerQuestion = (selectedOption: string) => {
    const q = PLACEMENT_QUESTIONS[currentQuestionIdx];
    const isCorrect = selectedOption === q.correct;
    const newScore = isCorrect ? testScore + 1 : testScore;
    setTestScore(newScore);

    if (currentQuestionIdx < PLACEMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Completed test
      let rec: CEFRLevel = 'A1';
      if (newScore <= 3) rec = 'A1';
      else if (newScore <= 6) rec = 'A2';
      else if (newScore <= 8) rec = 'B1';
      else rec = 'B2';

      setRecommendedLevel(rec);
      setSelectedLevel(rec);
      setTestCompleted(true);
    }
  };

  const handleFinishOnboarding = () => {
    store.updateLevel(selectedLevel);
    store.updateGoal(selectedGoal, selectedMinutes);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Learning Path Setup</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tailor Your German Journey
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Step {step} of 3 · We adapt exercises, vocabulary and pace to your exact goals.
          </p>
        </div>

        {/* Step 1: Goal Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              What is your primary goal for learning German?
            </h2>

            <div className="space-y-3">
              {goals.map((g) => {
                const Icon = g.icon;
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGoal(g.id as UserGoal)}
                    className={`w-full p-4 rounded-2xl border-2 text-left flex items-start gap-4 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 ring-1 ring-amber-400'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-0.5">
                        {g.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {g.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Level Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Level Selection or Placement Test */}
        {step === 2 && !testActive && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Where would you like to start?
            </h2>

            <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm text-amber-950 dark:text-amber-200">
                  Unsure of your current level?
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-400">
                  Take our quick 10-question placement test to find your exact starting point.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTestActive(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                Start Placement Test
              </button>
            </div>

            <div className="space-y-3">
              {[
                { lvl: 'A0', title: 'Absolute Beginner (A0)', desc: 'No prior knowledge. Start with the German alphabet, sounds, and greetings.' },
                { lvl: 'A1', title: 'Beginner (A1)', desc: 'Know basic greetings. Learn verb conjugations, der/die/das, and the accusative case.' },
                { lvl: 'A2', title: 'Elementary (A2)', desc: 'Past tenses (Perfekt with haben/sein), dative case, and two-way prepositions.' },
                { lvl: 'B1', title: 'Intermediate (B1)', desc: 'Express opinions, Konjunktiv II politeness, passive voice, and work correspondence.' },
                { lvl: 'B2', title: 'Upper Intermediate (B2)', desc: 'Professional fluency, complex syntax, nominal style, and meeting discussions.' },
                { lvl: 'C1', title: 'Advanced & Professional (C1)', desc: 'Nuanced registers, academic analysis, legal phrasing, and high-level negotiations.' },
              ].map((item) => (
                <button
                  key={item.lvl}
                  type="button"
                  onClick={() => setSelectedLevel(item.lvl as CEFRLevel)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer ${
                    selectedLevel === item.lvl
                      ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 ring-1 ring-amber-400'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                    {selectedLevel === item.lvl && (
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all duration-150 cursor-pointer"
              >
                Continue to Daily Study Time
              </button>
            </div>
          </div>
        )}

        {/* Step 2 (Test Active): Placement Test In-Progress */}
        {step === 2 && testActive && !testCompleted && (
          <div className="p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Placement Question {currentQuestionIdx + 1} of {PLACEMENT_QUESTIONS.length}
              </span>
              <button
                type="button"
                onClick={() => setTestActive(false)}
                className="text-xs text-slate-400 hover:text-slate-700 underline"
              >
                Skip Test
              </button>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-1">
                Targeting: {PLACEMENT_QUESTIONS[currentQuestionIdx].level} proficiency
              </p>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {PLACEMENT_QUESTIONS[currentQuestionIdx].question}
              </h3>
            </div>

            <div className="space-y-2.5">
              {PLACEMENT_QUESTIONS[currentQuestionIdx].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswerQuestion(opt)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 font-medium text-sm transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/40"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 (Test Completed): Result card */}
        {step === 2 && testCompleted && (
          <div className="p-8 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Placement Result: Level {recommendedLevel}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              You answered <strong className="text-slate-900 dark:text-white">{testScore} of {PLACEMENT_QUESTIONS.length}</strong> questions correctly. We recommend starting at Level <strong>{recommendedLevel}</strong> to build rock-solid foundational mastery.
            </p>

            <button
              type="button"
              onClick={() => {
                setTestActive(false);
                setStep(3);
              }}
              className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all duration-150 cursor-pointer"
            >
              Accept Level & Continue
            </button>
          </div>
        )}

        {/* Step 3: Daily Study Habit & Commitment */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              How much time can you commit each day?
            </h2>
            <p className="text-xs text-slate-500">
              Consistency beats intensity. 15 focused minutes every day is proven to yield 4x faster retention than a 2-hour cram session once a week.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { mins: 15, label: 'Casual', desc: '15 min / day · 1 lesson + review' },
                { mins: 30, label: 'Recommended', desc: '30 min / day · Steady progress' },
                { mins: 45, label: 'Intensive', desc: '45 min / day · Rapid fluency' },
                { mins: 60, label: 'Immersive', desc: '60 min / day · Exam / relocation' },
              ].map((item) => (
                <button
                  key={item.mins}
                  type="button"
                  onClick={() => setSelectedMinutes(item.mins as DailyTimeMinutes)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer ${
                    selectedMinutes === item.mins
                      ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 ring-1 ring-amber-400'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-extrabold text-base">{item.mins} Mins</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-0.5">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white mb-1">Your Selected Path:</div>
              <div>• Starting Level: <strong className="text-amber-600">{selectedLevel}</strong></div>
              <div>• Target Goal: <strong className="text-amber-600 capitalize">{selectedGoal}</strong></div>
              <div>• Daily Commitment: <strong className="text-amber-600">{selectedMinutes} minutes/day</strong></div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all duration-150 cursor-pointer flex items-center gap-2"
              >
                <span>Launch My Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
