'use client';

import React from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ArrowRight, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#090909] selection:bg-[#052DC8] selection:text-white flex flex-col font-sans">
      <SiteHeader
        slogan={['SPACES', 'INTO', 'STORIES']}
        onContactClick={() => {
          window.location.href = '/#contact';
        }}
        onNavigate={(id) => {
          window.location.href = `/#${id}`;
        }}
      />

      <main className="flex-1 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 pt-36 sm:pt-44 pb-28">
        {/* Editorial Eyebrow & Headline */}
        <div className="border-b border-[#C8C8C8] pb-16 mb-16">
          <div className="text-xs uppercase tracking-editorial text-[#17B8C2] font-semibold mb-4">
            About the Studio / Manifesto
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light tracking-tight-display text-[#090909] leading-tight mb-8">
            Real estate, <br />
            seen differently.
          </h1>
          <p className="text-xl sm:text-2xl text-[#323232] font-light max-w-4xl leading-relaxed">
            Most real estate media is built for fast inventory turnover: ultra-wide lenses that warp dimensions, bland lifestyle cliches, and repetitive drone shots. OFFSET builds cinema-grade campaigns and bespoke web platforms that treat spaces as living works of architecture.
          </p>
        </div>

        {/* Studio Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              number: '01',
              title: 'Cinematography',
              desc: 'We reject generic fisheye pans. Every frame is composed with natural light, directional shadows, and intentional camera movement.',
              accent: 'border-t-2 border-[#17B8C2]',
            },
            {
              number: '02',
              title: 'Narrative Identity',
              desc: 'Properties don’t sell purely on square footage; they sell on emotional resonance and the aspirational lifestyle they unlock.',
              accent: 'border-t-2 border-[#E35D43]',
            },
            {
              number: '03',
              title: 'Realtor Stature',
              desc: 'Transforming top brokers into influential market leaders through high-production personal films and podcast-grade interviews.',
              accent: 'border-t-2 border-[#F0AD37]',
            },
            {
              number: '04',
              title: 'Bespoke Digital',
              desc: 'High-performance websites tailored to individual estates and premier brokerages, built on modern React and Tailwind architecture.',
              accent: 'border-t-2 border-[#052DC8]',
            },
          ].map((pillar) => (
            <div key={pillar.number} className={`p-8 border border-[#C8C8C8] bg-[#FCFBF8] ${pillar.accent}`}>
              <span className="text-xs uppercase tracking-editorial text-[#747474] font-medium block mb-6">
                Pillar {pillar.number}
              </span>
              <h2 className="text-2xl font-light text-[#090909] mb-4">{pillar.title}</h2>
              <p className="text-sm text-[#747474] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Technical Rig & Standards */}
        <div className="border border-[#C8C8C8] p-8 sm:p-12 lg:p-16 mb-24 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-editorial text-[#747474] mb-3 block">
                Engineering & Hardware
              </span>
              <h3 className="text-3xl sm:text-4xl font-light text-[#090909] mb-6">
                Technical standards calibrated for luxury.
              </h3>
              <p className="text-base text-[#747474] leading-relaxed">
                From 8K RAW cinema capture to bespoke web architecture with sub-second page loads, our production pipeline leaves nothing to chance.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'RED V-Raptor & Sony Cinema Lines',
                'Master Anamorphic & Cinema Primes',
                'ACES Color Managed Workflow',
                'FAA Part 107 Licensed Aerial Drone Ops',
                'Next.js 15 & React 19 Digital Architecture',
                'Tailwind CSS Sub-Second Page Speeds',
                'Spatial Audio & Custom Score Mixing',
                'Bespoke Interactive 3D & Floorplans',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-3 border-b border-[#E8E8E8]">
                  <div className="w-5 h-5 rounded-full bg-[#17B8C2]/10 text-[#17B8C2] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm text-[#090909] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#090909] text-white p-12 sm:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-editorial text-[#17B8C2] block mb-3">
              Commence Collaboration
            </span>
            <h4 className="text-2xl sm:text-4xl font-light">Have an extraordinary property in mind?</h4>
          </div>
          <button
            onClick={() => {
              window.location.href = '/#contact';
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#090909] hover:bg-[#17B8C2] hover:text-white transition-colors uppercase text-xs tracking-button font-medium"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <SiteFooter
        onNavigate={(id) => {
          window.location.href = `/#${id}`;
        }}
      />
    </div>
  );
}
