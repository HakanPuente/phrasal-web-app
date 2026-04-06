'use client';

import Link from 'next/link';
import { MdFitnessCenter, MdHome, MdMenuBook, MdPerson } from 'react-icons/md';

const icons = {
  home: MdHome,
  learn: MdMenuBook,
  practice: MdFitnessCenter,
  profile: MdPerson
} as const;

export function BottomNav({ active }: { active: 'home' | 'learn' | 'practice' | 'profile' }) {
  const links = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/learn', label: 'Learn', id: 'learn' },
    { href: '/practice', label: 'Practice', id: 'practice' },
    { href: '/profile', label: 'Profile', id: 'profile' }
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#c1cab1]/15 bg-white shadow-[0_-4px_20px_rgba(43,22,16,0.05)] rounded-t-[2rem] px-4 pb-6 pt-3">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-2">
        {links.map((item) => {
          const isActive = item.id === active;
          const Icon = icons[item.id];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 rounded-full px-4 py-2 transition-all duration-200 ${
                isActive ? 'bg-[#85cd1e] text-[#406900]' : 'text-[#2b1610]/70 hover:text-[#2b1610]'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
