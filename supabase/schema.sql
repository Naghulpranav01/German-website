-- =========================================================================
-- DeutschPath: Supabase PostgreSQL Schema & Security Policies
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Learner account & gamification state)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    cefr_level TEXT NOT NULL DEFAULT 'A1',
    learning_goal TEXT NOT NULL DEFAULT 'work',
    daily_goal_minutes INTEGER NOT NULL DEFAULT 30,
    total_xp INTEGER NOT NULL DEFAULT 0,
    current_streak_days INTEGER NOT NULL DEFAULT 0,
    last_active_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 2. COURSES & CURRICULUM (Public read-only)
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    level TEXT NOT NULL, -- 'A1', 'A2', 'B1', 'B2', 'C1'
    title TEXT NOT NULL,
    german_title TEXT NOT NULL,
    description TEXT,
    estimated_hours INTEGER NOT NULL DEFAULT 80,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public courses are readable by all"
    ON public.courses FOR SELECT
    TO PUBLIC
    USING (true);

CREATE TABLE IF NOT EXISTS public.modules (
    id TEXT PRIMARY KEY,
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    title TEXT NOT NULL,
    german_title TEXT NOT NULL,
    description TEXT
);

ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public modules are readable by all"
    ON public.modules FOR SELECT
    TO PUBLIC
    USING (true);

CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT REFERENCES public.modules(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    level TEXT NOT NULL,
    title TEXT NOT NULL,
    german_title TEXT NOT NULL,
    estimated_minutes INTEGER DEFAULT 20,
    outcome TEXT,
    xp_reward INTEGER DEFAULT 50,
    content JSONB NOT NULL DEFAULT '[]'::jsonb
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public lessons are readable by all"
    ON public.lessons FOR SELECT
    TO PUBLIC
    USING (true);

-- 3. LESSON PROGRESS (Private per learner)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    score_percent INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own lesson progress"
    ON public.lesson_progress FOR ALL
    USING (auth.uid() = user_id);

-- 4. VOCABULARY & SPACED REPETITION (SM-2)
CREATE TABLE IF NOT EXISTS public.vocabulary_items (
    id TEXT PRIMARY KEY,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    part_of_speech TEXT NOT NULL,
    german TEXT NOT NULL,
    article TEXT, -- 'der', 'die', 'das'
    plural TEXT,
    english TEXT NOT NULL,
    example_sentence TEXT,
    example_translation TEXT,
    conjugation JSONB,
    audio_text TEXT
);

ALTER TABLE public.vocabulary_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vocabulary items are readable by all"
    ON public.vocabulary_items FOR SELECT
    TO PUBLIC
    USING (true);

CREATE TABLE IF NOT EXISTS public.spaced_repetition_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vocab_id TEXT NOT NULL REFERENCES public.vocabulary_items(id) ON DELETE CASCADE,
    leitner_box INTEGER NOT NULL DEFAULT 1,
    ease_factor NUMERIC(4,2) NOT NULL DEFAULT 2.50,
    interval_days INTEGER NOT NULL DEFAULT 1,
    repetition_count INTEGER NOT NULL DEFAULT 0,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'learning', -- 'learning', 'mastered'
    UNIQUE(user_id, vocab_id)
);

ALTER TABLE public.spaced_repetition_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own flashcard progress"
    ON public.spaced_repetition_reviews FOR ALL
    USING (auth.uid() = user_id);

-- 5. GRAMMAR TOPICS
CREATE TABLE IF NOT EXISTS public.grammar_topics (
    id TEXT PRIMARY KEY,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    german_title TEXT NOT NULL,
    summary TEXT,
    formula TEXT,
    explanation TEXT,
    table_content JSONB,
    examples JSONB,
    correct_vs_incorrect JSONB,
    common_mistakes TEXT[]
);

ALTER TABLE public.grammar_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Grammar topics are readable by all"
    ON public.grammar_topics FOR SELECT
    TO PUBLIC
    USING (true);

-- 6. EXERCISES & USER ATTEMPTS
CREATE TABLE IF NOT EXISTS public.exercise_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exercise_id TEXT NOT NULL,
    user_answer TEXT,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.exercise_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own exercise attempts"
    ON public.exercise_attempts FOR ALL
    USING (auth.uid() = user_id);

-- 7. STUDY SESSIONS & STREAKS
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    duration_minutes INTEGER NOT NULL,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    xp_earned INTEGER NOT NULL DEFAULT 0,
    activity_type TEXT NOT NULL DEFAULT 'lesson'
);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own study sessions"
    ON public.study_sessions FOR ALL
    USING (auth.uid() = user_id);

-- 8. USER BOOKMARKS & NOTES
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL, -- 'vocab', 'grammar', 'lesson'
    item_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);

ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own bookmarks"
    ON public.user_bookmarks FOR ALL
    USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.user_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    context_key TEXT NOT NULL,
    note_text TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, context_key)
);

ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own notes"
    ON public.user_notes FOR ALL
    USING (auth.uid() = user_id);

-- 9. WRITING SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.writing_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_id TEXT NOT NULL,
    submission_text TEXT NOT NULL,
    score INTEGER NOT NULL,
    feedback JSONB,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.writing_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own writing submissions"
    ON public.writing_submissions FOR ALL
    USING (auth.uid() = user_id);

-- Auto profile creation trigger on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
