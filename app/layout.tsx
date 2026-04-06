import './globals.css';
import type { Metadata } from 'next';
import { ServiceWorkerRegister } from '../components/ServiceWorkerRegister';

export const metadata: Metadata = {
  title: 'Pengueng',
  description: 'Türkçe konuşanlara yönelik phrasal verb öğrenme uygulaması',
  metadataBase: new URL('https://pengueng.example.com'),
  icons: {
    icon: '/icon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
