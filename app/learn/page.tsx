'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdLocalFireDepartment, MdVolumeUp } from 'react-icons/md';
import phrasals from '../../data/phrasals.json';
import { BottomNav } from '../../components/BottomNav';
import { useUserProgress } from '../../lib/useUserProgress';

type PhrasalVerb = (typeof phrasals)[number];

function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const categories = ['basics', 'travel', 'business'] as const;

export default function LearnPage() {
  const [category, setCategory] = useState<typeof categories[number]>('basics');
  const { verbsByCategory, getLearningStatus, markVerbAsLearned, progress } = useUserProgress();
  const items = useMemo(() => verbsByCategory(category), [category, verbsByCategory]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('category');
    if (categories.includes(value as typeof categories[number])) {
      setCategory(value as typeof categories[number]);
    }
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [category, items.length]);

  const item = useMemo(() => items[index] ?? items[0] ?? phrasals[0], [index, items]);
  const learningStatus = getLearningStatus(item.id);
  const categoryLearnedCount = useMemo(
    () => items.filter((verb) => progress.learnedIds.includes(verb.id)).length,
    [items, progress.learnedIds]
  );
  const isLearned = learningStatus === 'mastered';

  return (
    <main className="app-shell min-h-screen pb-28">
      <div className="mx-auto max-w-xl px-6 pt-24 pb-8">
        <header className="mb-6 flex items-center justify-between rounded-[2rem] bg-[#fff8f6] p-5 shadow-soft">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Learn · {category.toUpperCase()}</p>
            <h1 className="text-2xl font-black">Phrasal Verb Kartı</h1>
            <p className="mt-2 text-sm text-on-surface-variant">{categoryLearnedCount}/{items.length} kelime öğrendin.</p>
          </div>
          <div className="rounded-3xl bg-surface-container-low p-3 text-primary">
            <MdLocalFireDepartment className="h-6 w-6" />
          </div>
        </header>

        <article className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-soft border border-[#c1cab1]/15">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#424936]">Phrasal Verb</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">{item.phrase}</h2>
            </div>
            <button
              type="button"
              onClick={() => speak(item.phrase, 'en-US')}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-primary shadow-sm shadow-primary/20 transition hover:opacity-95"
            >
              <MdVolumeUp className="h-6 w-6" />
            </button>
          </div>

          <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-inner">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">Meaning / Anlamı</p>
              <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${isLearned ? 'bg-green-100 text-green-900' : 'bg-primary-container/15 text-primary'}`}>
                {isLearned ? 'Öğrendi' : 'Yeni'}
              </span>
            </div>
            <p className="text-2xl font-bold text-on-surface">{item.meaning}</p>
            <div className="mt-5 flex flex-wrap gap-2 pt-5 border-t border-[#c1cab1]/20">
              <span className="rounded-full bg-tertiary-container/30 px-3 py-1 text-sm font-semibold text-tertiary">Synonym: {item.synonyms.join(', ')}</span>
            </div>
          </section>

          <section className="space-y-5">
            {item.examples.map((example, idx) => (
              <div key={idx} className="rounded-[2rem] border border-[#c1cab1]/15 bg-surface-container-low p-5">
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => speak(example.sentence, 'en-US')}
                    className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#c1cab1]/30 bg-white text-on-surface-variant"
                  >
                    <MdVolumeUp className="h-6 w-6" />
                  </button>
                  <div>
                    <p className="text-xl font-medium leading-relaxed text-on-surface">"{example.sentence.replace(item.phrase, ` ${item.phrase} `)}"</p>
                    <div className="mt-4 rounded-3xl border-l-4 border-secondary bg-white/90 p-4 text-sm text-on-surface-variant italic">
                      <p>{example.translation}</p>
                      <button
                        type="button"
                        onClick={() => speak(example.translation, 'tr-TR')}
                        className="mt-3 inline-flex items-center gap-2 font-bold text-secondary"
                      >
                        <MdVolumeUp className="h-4 w-4" />
                        Listen Turkish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setIndex((prev) => (prev + items.length - 1) % items.length)}
              className="rounded-[2rem] border border-[#c1cab1]/30 bg-white py-4 font-bold text-on-surface-variant transition hover:bg-surface-container-low"
            >
              <MdArrowBackIos className="inline h-4 w-4 align-text-bottom" /> Previous
            </button>
            <button
              type="button"
              onClick={() => setIndex((prev) => (prev + 1) % items.length)}
              className="rounded-[2rem] bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
            >
              Next <MdArrowForwardIos className="inline h-4 w-4 align-text-bottom" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => markVerbAsLearned(item.id)}
            disabled={isLearned}
            className="mt-6 w-full rounded-[2rem] bg-secondary py-5 text-white font-bold shadow-lg shadow-secondary/20 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLearned ? 'Bu kelime zaten öğrenildi' : 'Bu kelimeyi öğrendim'}
          </button>
        </article>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-soft">
          <Image src="/images/review-illustration.svg" alt="Review illustration" width={720} height={360} className="w-full" />
        </div>
      </div>
      <BottomNav active="learn" />
    </main>
  );
}
