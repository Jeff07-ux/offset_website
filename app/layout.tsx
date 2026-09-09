import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OFFSET — Real Estate Photography, Film & Digital Experiences',
  description:
    'OFFSET creates architectural photography, cinematic property films, personal-brand content, and bespoke digital experiences for luxury villas, realtors, and hospitality brands.',
  keywords: [
    'Real Estate Photography',
    'Cinematic Property Films',
    'Personal Branding for Realtors',
    'Luxury Villa Branding',
    'Architectural Media Studio',
    'Real Estate Web Design',
  ],
  authors: [{ name: 'OFFSET Visual Studio' }],
  creator: 'OFFSET',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://offsetstudio.com',
    title: 'OFFSET — Real Estate Photography, Film & Digital Experiences',
    description:
      'Real estate, seen differently. High-concept photography, cinematic films, and digital platforms for spaces that demand attention.',
    siteName: 'OFFSET',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 900,
        alt: 'OFFSET Studio Architectural Production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OFFSET — Real Estate Photography, Film & Digital Experiences',
    description:
      'Real estate, seen differently. Cinematic films and digital platforms for luxury spaces.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#090909] antialiased selection:bg-[#052DC8] selection:text-white">
        {children}
      </body>
    </html>
  );
}
