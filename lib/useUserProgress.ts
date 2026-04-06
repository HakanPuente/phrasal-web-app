'use client';

import { useEffect } from 'react';
import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import phrasals from '../data/phrasals.json';
import { LearningStatus, PhrasalVerb } from './types';

export interface VerbProgress {
  status: LearningStatus;
  attempts: number;
  correct: number;
  lastSeen: string | null;
}

export interface UserProgress {
  learnedIds: string[];
  dailyTarget: number;
  dailyCount: number;
  streak: number;
  lastVisit: string;
  attempts: number;
  correct: number;
  verbProgress: Record<string, VerbProgress>;
}

const getDateKey = () => new Date().toISOString().slice(0, 10);
const yesterdayKey = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
};

const defaultProgress: UserProgress = {
  learnedIds: [],
  dailyTarget: 3,
  dailyCount: 0,
  streak: 0,
  lastVisit: getDateKey(),
  attempts: 0,
  correct: 0,
  verbProgress: {}
};

export function useUserProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('pengueng-progress', defaultProgress);

  useEffect(() => {
    const today = getDateKey();
    if (progress.lastVisit !== today) {
      const nextStreak = progress.lastVisit === yesterdayKey() ? progress.streak + 1 : 1;
      setProgress((prev) => ({
        ...prev,
        lastVisit: today,
        dailyCount: 0,
        streak: prev.lastVisit ? nextStreak : 1
      }));
    }
  }, [progress.lastVisit, progress.streak, setProgress]);

  const accuracy = useMemo(() => {
    if (progress.attempts === 0) return 0;
    return Math.round((progress.correct / progress.attempts) * 100);
  }, [progress.attempts, progress.correct]);

  const categoryCounts = useMemo(() => {
    return phrasals.reduce(
      (acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        if (progress.learnedIds.includes(item.id)) {
          acc[`${item.category}_learned`] = (acc[`${item.category}_learned`] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );
  }, [progress.learnedIds]);

  const verbsByCategory = (category: string) => phrasals.filter((item) => item.category === category);

  const markVerbAsLearned = (id: string) => {
    setProgress((prev) => {
      const learnedAlready = prev.learnedIds.includes(id);
      return {
        ...prev,
        learnedIds: learnedAlready ? prev.learnedIds : [...prev.learnedIds, id],
        dailyCount: learnedAlready ? prev.dailyCount : prev.dailyCount + 1,
        verbProgress: {
          ...prev.verbProgress,
          [id]: {
            status: 'mastered',
            attempts: prev.verbProgress[id]?.attempts ?? 0,
            correct: prev.verbProgress[id]?.correct ?? 0,
            lastSeen: getDateKey()
          }
        }
      };
    });
  };

  const recordPractice = (id: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const existing = prev.verbProgress[id] ?? {
        status: 'learning',
        attempts: 0,
        correct: 0,
        lastSeen: null
      };
      const nextStatus = existing.status === 'new' ? 'learning' : existing.status;
      return {
        ...prev,
        attempts: prev.attempts + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        verbProgress: {
          ...prev.verbProgress,
          [id]: {
            ...existing,
            status: nextStatus,
            attempts: existing.attempts + 1,
            correct: existing.correct + (isCorrect ? 1 : 0),
            lastSeen: getDateKey()
          }
        }
      };
    });
  };

  const getLearningStatus = (id: string): LearningStatus => {
    return progress.verbProgress[id]?.status ?? 'new';
  };

  const nextPracticeVerb = useMemo(() => {
    const notMastered = phrasals.filter((item) => getLearningStatus(item.id) !== 'mastered');
    return notMastered.length > 0 ? notMastered[0] : phrasals[0];
  }, [progress.verbProgress]);

  return {
    progress,
    accuracy,
    categoryCounts,
    verbsByCategory,
    markVerbAsLearned,
    recordPractice,
    getLearningStatus,
    nextPracticeVerb
  };
}
