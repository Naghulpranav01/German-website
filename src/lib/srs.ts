import { FlashcardProgress } from '@/types';

// SuperMemo SM-2 and Leitner inspired Spaced Repetition calculation
export type ReviewRating = 1 | 2 | 3 | 4; // 1: Again (failed), 2: Hard, 3: Good, 4: Easy

export function calculateNextReview(
  current: FlashcardProgress | undefined,
  vocabId: string,
  rating: ReviewRating
): FlashcardProgress {
  const now = new Date();
  const defaultProgress: FlashcardProgress = {
    vocabId,
    box: 1,
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: now.toISOString(),
    lastReviewed: now.toISOString(),
    status: 'learning',
  };

  const item = current || defaultProgress;
  let { box, intervalDays, repetition, easeFactor } = item;

  if (rating === 1) {
    // Again: reset repetitions, back to box 1, due tomorrow or today
    repetition = 0;
    box = 1;
    intervalDays = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    // 2 (Hard), 3 (Good), 4 (Easy)
    if (repetition === 0) {
      intervalDays = 1;
    } else if (repetition === 1) {
      intervalDays = rating === 2 ? 2 : 4;
    } else {
      let multiplier = easeFactor;
      if (rating === 2) multiplier = 1.2;
      if (rating === 4) multiplier = easeFactor * 1.3;
      intervalDays = Math.round(intervalDays * multiplier);
    }

    repetition += 1;
    box = Math.min(5, box + (rating >= 3 ? 1 : 0));

    // Update ease factor (SM-2 formula adaptation)
    const quality = rating + 1; // map 2..4 to 3..5
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);
  }

  const nextDue = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  const status = box >= 4 ? 'mastered' : 'learning';

  return {
    vocabId,
    box,
    intervalDays,
    repetition,
    easeFactor: Number(easeFactor.toFixed(2)),
    dueDate: nextDue.toISOString(),
    lastReviewed: now.toISOString(),
    status,
  };
}

export function isDue(progress: FlashcardProgress): boolean {
  return new Date(progress.dueDate) <= new Date();
}
