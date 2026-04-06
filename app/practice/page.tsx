'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MdChecklistRtl } from 'react-icons/md';
import phrasals from '../../data/phrasals.json';
import { BottomNav } from '../../components/BottomNav';
import { useUserProgress } from '../../lib/useUserProgress';

export default function PracticePage() {
  const { recordPractice, getLearningStatus, progress } = useUserProgress();
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const practiceItems = useMemo(
    () => phrasals.filter((item) => getLearningStatus(item.id) !== 'mastered'),
    [getLearningStatus, progress.verbProgress]
  );

  const current = useMemo(() => practiceItems[currentIndex] ?? phrasals[currentIndex % phrasals.length], [currentIndex, practiceItems]);
  const question = current.quiz[0];
  const correct = selectedOption === question.answer;

  useEffect(() => {
    if (currentIndex >= practiceItems.length && practiceItems.length > 0) {
      setCurrentIndex(0);
    }
  }, [practiceItems.length, currentIndex]);

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    setIsSubmitted(true);
    recordPractice(current.id, correct);
  };

  const handleNext = () => {
    setSelectedOption('');
    setIsSubmitted(false);
    setCurrentIndex((prev) => (prev + 1) % (practiceItems.length || phrasals.length));
  };

  return (
    <main className="app-shell min-h-screen pb-28">
      <div className="mx-auto max-w-xl px-6 pt-24 pb-8">
        <header className="mb-6 flex items-center justify-between rounded-[2rem] bg-[#fff8f6] p-5 shadow-soft">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Practice</p>
            <h1 className="text-2xl font-black">Alıştırma</h1>
            <p className="mt-2 text-sm text-on-surface-variant">Doğruluk oranın: {progress.attempts ? Math.round((progress.correct / progress.attempts) * 100) : 0}%</p>
          </div>
          <div className="rounded-3xl bg-surface-container-low p-3 text-primary">
            <MdChecklistRtl className="h-6 w-6" />
          </div>
        </header>

        <div className="mb-6 overflow-hidden rounded-[2rem] bg-white shadow-soft">
          <Image src="/images/practice-illustration.svg" alt="Practice illustration" width={720} height={240} className="w-full" />
        </div>

        <article className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-soft border border-[#c1cab1]/15">
          <div className="mb-8">
            <div className="inline-block rounded-full bg-tertiary-container/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-tertiary">
              Fill in the blanks
            </div>
            <p className="mt-6 text-xl leading-relaxed text-on-surface">"{question.prompt.split('___').join(' ')}"</p>
            <p className="mt-4 italic text-on-surface-variant">"{current.examples[0].translation}"</p>
          </div>

          <div className="grid gap-3">
            {question.options.map((option) => {
              const active = selectedOption === option;
              const correctAnswer = isSubmitted && option === question.answer;
              const wrongAnswer = isSubmitted && active && option !== question.answer;
              return (
                <button
                  key={option}
                  type="button"
                  className={`w-full rounded-[2rem] border px-6 py-5 text-left transition ${
                    correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : wrongAnswer
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : active
                      ? 'border-primary bg-primary/10 text-on-surface'
                      : 'border-[#c1cab1]/20 bg-white text-on-surface hover:bg-surface-container-low'
                  }`}
                  onClick={() => {
                    if (isSubmitted) return;
                    setSelectedOption(option);
                  }}
                >
                  <span className="font-bold">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedOption || isSubmitted}
              className="w-full rounded-[2rem] bg-gradient-to-br from-primary to-primary-container py-5 text-white font-bold shadow-lg shadow-primary/20 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitted ? 'Değerlendirildi' : 'Kontrol Et'}
            </button>
          </div>

          {isSubmitted && (
            <div className={`mt-6 rounded-[2rem] p-5 text-sm font-semibold ${correct ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
              {correct ? 'Tebrikler! Doğru cevap.' : `Yanlış cevap. Doğru cevap: ${question.answer}`}
            </div>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="mt-6 w-full rounded-[2rem] bg-white py-5 font-bold text-on-surface shadow-sm transition hover:bg-surface-container-low"
          >
            Devam Et
          </button>
        </article>
      </div>
      <BottomNav active="practice" />
    </main>
  );
}
