'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdAutoAwesome, MdEdit, MdFlag, MdLocalFireDepartment, MdSettings, MdVerified } from 'react-icons/md';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { BottomNav } from '../../components/BottomNav';

export default function ProfilePage() {
  const [user] = useLocalStorage<{ name: string } | null>('pengueng-user', null);
  const [progress] = useState({ wordsLearned: 1284, streak: 12, accuracy: 94 });

  useEffect(() => {
    if (!user) return;
  }, [user]);

  return (
    <main className="app-shell min-h-screen pb-28">
      <div className="mx-auto max-w-xl px-6 pt-24 pb-8">
        <header className="mb-8 rounded-[2rem] bg-[#fff8f6] p-6 shadow-soft">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-[2.5rem] bg-primary-container p-1 shadow-lg">
                <Image src="/images/penguin-illustration.svg" alt="Penguin avatar" width={112} height={112} className="h-full w-full rounded-[2.25rem] object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-md border-4 border-white">
                <MdEdit className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-black">{user?.name ?? 'Pengueng Kullanıcısı'}</p>
              <p className="text-on-surface-variant">Phrasal Verb Explorer</p>
            </div>
          </div>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface-container-low px-5 py-3 font-bold text-primary shadow-sm transition hover:bg-surface-container">
            <MdSettings className="h-5 w-5" />
            Settings
          </button>
        </header>

        <section className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-[2rem] bg-surface-container-low p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Total Progress</p>
            <p className="mt-4 text-4xl font-black">{progress.wordsLearned}</p>
            <p className="mt-2 text-sm text-on-surface-variant">Words Learned</p>
          </div>
          <div className="rounded-[2rem] bg-secondary-container p-6 text-center text-on-secondary-container shadow-soft">
            <MdLocalFireDepartment className="mx-auto mb-3 h-8 w-8" />
            <p className="text-3xl font-black">{progress.streak}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.28em]">Days Streak</p>
          </div>
          <div className="rounded-[2rem] bg-tertiary-container p-6 text-center text-on-tertiary-container shadow-soft col-span-2">
            <MdFlag className="mx-auto mb-3 h-8 w-8" />
            <p className="text-3xl font-black">{progress.accuracy}%</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.28em]">Accuracy %</p>
          </div>
        </section>

        <section className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Earned Badges</h2>
            <span className="text-primary font-bold">View All</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <div className="min-w-[170px] rounded-[2rem] bg-surface-container-lowest p-5 shadow-sm border border-[#c1cab1]/15">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-high">
                <MdVerified className="text-secondary h-10 w-10" />
              </div>
              <p className="font-bold">Master of Off</p>
              <p className="mt-2 text-[11px] text-on-surface-variant">Completed 'Off' series</p>
            </div>
            <div className="min-w-[170px] rounded-[2rem] bg-surface-container-lowest p-5 shadow-sm border border-[#c1cab1]/15">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container/20">
                <MdAutoAwesome className="text-primary h-10 w-10" />
              </div>
              <p className="font-bold">Phrasal Pro</p>
              <p className="mt-2 text-[11px] text-on-surface-variant">100 accurate matches</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-soft">
          <h3 className="mb-4 text-on-surface font-extrabold">Activity Insights</h3>
          <div className="flex items-end gap-2 h-40">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, idx) => (
              <div key={label} className="flex-1 text-center">
                <div className={`mx-auto mb-3 h-full w-9 rounded-t-[1.5rem] ${idx === 3 ? 'bg-primary' : 'bg-primary/40'}`} style={{ minHeight: `${30 + idx * 8}%` }} />
                <p className="text-[11px] text-on-surface-variant">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <BottomNav active="profile" />
    </main>
  );
}
