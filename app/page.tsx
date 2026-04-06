'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { MdLocalFireDepartment, MdTrendingUp, MdVerified } from 'react-icons/md';
import phrasals from '../data/phrasals.json';
import { useLocalStorage } from '../lib/useLocalStorage';
import { useUserProgress } from '../lib/useUserProgress';
import { BottomNav } from '../components/BottomNav';

const categories = [
  { id: 'basics', label: 'Basics', subtitle: 'Temelden başla', icon: '/images/basics-card.svg', accent: 'bg-tertiary-container text-on-tertiary-container' },
  { id: 'travel', label: 'Travel', subtitle: 'Seyahat ifadeleri', icon: '/images/travel-card.svg', accent: 'bg-surface-container-highest text-on-surface' },
  { id: 'business', label: 'Business', subtitle: 'İş dünyası phrasalları', icon: '/images/business-card.svg', accent: 'bg-primary-fixed text-primary' }
] as const;

export default function HomePage() {
  const { progress, accuracy } = useUserProgress();
  const [user, setUser] = useLocalStorage<{ name: string } | null>('pengueng-user', null);
  const [nameInput, setNameInput] = useState('');
  const featured = useMemo(() => phrasals.find((item) => item.category === 'basics') ?? phrasals[0], []);

  useEffect(() => {
    if (user?.name) {
      setNameInput(user.name);
    }
  }, [user]);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameInput.trim()) return;
    setUser({ name: nameInput.trim() });
  };

  const completed = progress.learnedIds.length;
  const progressRatio = Math.min(100, Math.round((progress.dailyCount / progress.dailyTarget) * 100));
  const remainingToday = Math.max(0, progress.dailyTarget - progress.dailyCount);

  if (!user?.name) {
    return (
      <main className="app-shell flex min-h-screen flex-col items-center justify-center px-6 py-12 text-on-surface">
        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-[#c1cab1]/15 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-[#2b1610] mb-4">Pengueng'e hoş geldin</h1>
          <p className="text-on-surface-variant mb-6">İngilizcedeki phrasal verbleri öğrenmek için bir kullanıcı adı gir.</p>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <label className="block text-sm font-semibold text-on-surface-variant">Adın</label>
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              className="w-full rounded-3xl border border-[#c1cab1]/35 bg-surface-container-low px-4 py-3 text-base outline-none transition focus:border-primary"
              placeholder="Deniz"
              autoFocus
            />
            <button type="submit" className="w-full rounded-3xl bg-primary px-5 py-3 text-white shadow-lg shadow-primary/20 transition hover:opacity-95">
              Başla
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell min-h-screen pb-28">
      <div className="mx-auto flex max-w-xl flex-col px-6 pt-24 pb-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] bg-[#fff8f6] p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">Günlük Ders</p>
            <h1 className="text-3xl font-black tracking-tight">Merhaba, {user.name}! 👋</h1>
            <p className="mt-2 text-sm text-on-surface-variant">Bugün ilk phrasal verbini öğrenmeye başla.</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-surface-container-low text-secondary">
            <MdLocalFireDepartment className="h-7 w-7" />
          </div>
        </header>

        <section className="grid gap-4">
          <article className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Günlük Hedef</p>
                <h2 className="mt-3 text-2xl font-black">{progress.dailyCount}/{progress.dailyTarget} tamamlandı</h2>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {remainingToday > 0
                    ? `${remainingToday} kelime daha öğrenerek bugünkü hedefini tamamla.`
                    : 'Bugün hedefine ulaştın! Yeni bir yolculuğa hazırlan.'}
                </p>
              </div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#e9f7d9]">
                <div className="absolute inset-0 rounded-full border border-[#c3dcb6]" />
                <div className="h-20 w-20 rounded-full bg-white shadow-inner flex flex-col items-center justify-center text-center text-sm font-black text-on-surface">
                  <span>{progressRatio}%</span>
                  <span className="text-[10px] text-on-surface-variant">bugün</span>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-secondary-container p-8 text-on-secondary-container shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-on-secondary-container/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
                Bugünün Kelimesi
              </span>
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-4xl font-black">{featured.phrase}</h2>
            <p className="mt-4 text-base italic opacity-90">"{featured.meaning}."</p>
            <div className="mt-6 rounded-3xl bg-on-secondary-container/10 p-5 text-on-secondary-container">
              <p className="text-sm font-bold">Türkçe Karşılığı</p>
              <p className="mt-2 text-base font-medium">{featured.meaning}</p>
            </div>
          </article>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Öğrenme Yolları</h2>
            <Link href="/learn" className="text-primary font-bold">
              Tümünü Gör
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/learn?category=${category.id}`}
                className={`min-w-[160px] snap-start rounded-[2rem] p-4 shadow-soft transition hover:-translate-y-1 ${category.accent}`}
              >
                <div className="mb-6 h-24 overflow-hidden rounded-[1.5rem] bg-white/20 relative">
                  <Image src={category.icon} alt={`${category.label} illustration`} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-black">{category.label}</h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-opacity-80">{category.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-[2rem] bg-surface-container-low p-6 text-center shadow-soft">
            <MdTrendingUp className="mx-auto mb-3 h-8 w-8 text-tertiary" />
            <p className="text-3xl font-black">{completed}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-on-surface-variant">Kazanılan Kelime</p>
          </div>
          <div className="rounded-[2rem] bg-surface-container-low p-6 text-center shadow-soft">
            <MdVerified className="mx-auto mb-3 h-8 w-8 text-primary" />
            <p className="text-3xl font-black">{accuracy}%</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-on-surface-variant">Doğruluk Oranı</p>
          </div>
        </section>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
