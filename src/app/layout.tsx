import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Bharat Life Care | Social Media AI Steward',
  description:
    'End-to-end social media manager purpose-built for Bharat Life Care. Plan, create, schedule, and measure campaigns with an AI-native workspace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.variable}>
      <body className="min-h-screen bg-white/60 antialiased">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
