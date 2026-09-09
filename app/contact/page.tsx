'use client';

import React from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ContactCtaSection } from '@/components/sections/ContactCtaSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#090909] selection:bg-[#052DC8] selection:text-white flex flex-col font-sans">
      <SiteHeader
        slogan={['PEOPLE', 'PLACES', 'POSSIBILITIES']}
        onContactClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigate={(id) => {
          window.location.href = `/#${id}`;
        }}
      />

      <main className="flex-1 w-full pt-28">
        <ContactCtaSection />
      </main>

      <SiteFooter
        onNavigate={(id) => {
          window.location.href = `/#${id}`;
        }}
      />
    </div>
  );
}
