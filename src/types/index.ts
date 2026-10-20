export type CEFRLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type UserGoal = 'work' | 'university' | 'daily' | 'travel' | 'exam';

export type DailyTimeMinutes = 15 | 30 | 45 | 60;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: CEFRLevel;
  goal: UserGoal;
  dailyGoalMinutes: DailyTimeMinutes;
  streakDays: number;
  lastActiveDate: string;
  xp: number;
  completedLessons: string[]; // lesson ids
  bookmarkedVocabIds: string[];
  bookmarkedGrammarIds: string[];
  notes: Record<string, string>;
  theme: 'light' | 'dark' | 'system';
  speechSpeed: number; // 0.75, 1.0, 1.25
  isGuest?: boolean;
}

export interface AlphabetLetter {
  letter: string;
  isUmlaut?: boolean;
  isSpecial?: boolean;
  germanName: string;
  englishApprox: string;
  ipa: string;
  exampleWord: string;
  exampleTranslation: string;
  audioText: string;
  mistakeTip: string;
  category: 'vowel' | 'consonant' | 'umlaut' | 'special';
}

export interface MinimalPair {
  id: string;
  title: string;
  explanation: string;
  wordA: string;
  meaningA: string;
  ipaA: string;
  wordB: string;
  meaningB: string;
  ipaB: string;
  practiceQuestion: string;
  correctWord: string;
}

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'word_order'
  | 'article_select'
  | 'verb_conjugation'
  | 'translate_de_en'
  | 'translate_en_de'
  | 'speaking';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  instruction: string;
  germanText?: string;
  englishText?: string;
  audioPrompt?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  grammarNote?: string;
  hint?: string;
}

export interface LessonContentItem {
  type: 'explanation' | 'dialogue' | 'vocabulary' | 'grammar_tip' | 'audio_sample';
  title?: string;
  body?: string;
  german?: string;
  english?: string;
  speaker?: string;
  notes?: string;
  audioText?: string;
}

export interface Lesson {
  id: string;
  level: CEFRLevel;
  moduleOrder: number;
  lessonOrder: number;
  title: string;
  germanTitle: string;
  estimatedMinutes: number;
  description: string;
  outcome: string;
  content: LessonContentItem[];
  vocabularyPreview: string[]; // vocab item ids
  grammarPoints: string[];
  exercises: Exercise[];
  xpReward: number;
}

export interface CourseModule {
  id: string;
  level: CEFRLevel;
  order: number;
  title: string;
  germanTitle: string;
  description: string;
  lessons: Lesson[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  germanTitle: string;
  level: CEFRLevel;
  category:
    | 'verbs'
    | 'cases'
    | 'sentence_structure'
    | 'nouns_articles'
    | 'prepositions'
    | 'adjectives'
    | 'advanced_syntax';
  summary: string;
  formula: string;
  explanation: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  examples: {
    german: string;
    english: string;
    note?: string;
  }[];
  correctVsIncorrect: {
    correct: string;
    incorrect: string;
    reason: string;
  }[];
  commonMistakes: string[];
  memoryTrick?: string;
  prerequisites?: string[];
  quiz: Exercise[];
}

export interface VocabularyItem {
  id: string;
  level: CEFRLevel;
  category: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'preposition' | 'conjunction';
  german: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
  english: string;
  exampleSentence: string;
  exampleTranslation: string;
  conjugation?: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
    pastParticiple?: string;
    auxiliaryVerb?: 'haben' | 'sein';
  };
  comparative?: string;
  superlative?: string;
  audioText?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FlashcardProgress {
  vocabId: string;
  box: number; // Leitner box 1-5
  intervalDays: number;
  repetition: number;
  easeFactor: number; // SM-2 default 2.5
  dueDate: string;
  lastReviewed: string;
  status: 'new' | 'learning' | 'mastered';
}

export interface ListeningLesson {
  id: string;
  level: CEFRLevel;
  title: string;
  context: string;
  audioDurationSeconds: number;
  transcript: {
    speaker: string;
    german: string;
    english: string;
  }[];
  vocabularyHighlights: string[];
  questions: Exercise[];
}

export interface ReadingArticle {
  id: string;
  level: CEFRLevel;
  title: string;
  germanTitle: string;
  category: string;
  paragraphs: {
    german: string;
    english: string;
    tokens?: {
      word: string;
      meaning: string;
      audio?: string;
    }[];
  }[];
  comprehensionQuestions: Exercise[];
}

export interface ConversationScenario {
  id: string;
  title: string;
  level: CEFRLevel;
  role: string;
  aiRole: string;
  context: string;
  openingGerman: string;
  openingEnglish: string;
  suggestedPhrases: {
    german: string;
    english: string;
  }[];
  objectives: string[];
}

export interface WorkModule {
  id: string;
  title: string;
  germanTitle: string;
  description: string;
  level: CEFRLevel;
  lessons: {
    id: string;
    title: string;
    germanTitle: string;
    overview: string;
    keyPhrases: {
      german: string;
      english: string;
      formalAlternative?: string;
      audioText?: string;
    }[];
    dialogue: {
      speaker: string;
      german: string;
      english: string;
    }[];
    sampleTemplate?: {
      title: string;
      content: string;
      notes: string;
    };
    exercise: Exercise[];
  }[];
}

export interface MockExam {
  id: string;
  title: string;
  level: CEFRLevel;
  estimatedMinutes: number;
  passingScorePercent: number;
  sections: {
    name: 'Lesen' | 'Hören' | 'Schreiben' | 'Sprechen';
    description: string;
    allocatedMinutes: number;
    exercises: Exercise[];
    readingPassage?: string;
    listeningTranscript?: string;
    writingPrompt?: string;
  }[];
}
