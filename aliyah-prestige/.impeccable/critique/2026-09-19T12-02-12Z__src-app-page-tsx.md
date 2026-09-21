---
target: homepage
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:D:\\w-resort-marrakech\\src\\app\\page.tsx"
target_fingerprint: "sha256:71398407e6b972ecb40af49339c110b548d55623fd56ae29810b2f224d24af3f"
target_path: "D:\\w-resort-marrakech\\src\\app\\page.tsx"
timestamp: 2026-09-19T12-02-12Z
slug: src-app-page-tsx
---
Method: dual-agent (A: general-purpose source review · B: general-purpose detector + measurements). No Chrome extension connected: no live overlay. B used detector URL scan (headless Chrome) + CDP measurements. P0 verified by parent with 390/1440px screenshots.

## Design Health Score (8 of 10 applied; 7 and 10 n/a: single marketing funnel)
1 Visibility 3 · 2 Match real world 3 · 3 User control 2 · 4 Consistency 2 · 5 Error prevention 3 · 6 Recognition 3 · 8 Minimalist 2 · 9 Error recovery 2
Total 20/32 (62%) Acceptable.

## Design specificity verdict
Half authored. Dark + champagne gold + ivory with Cormorant Garamond / Manrope is coherent for luxury villas. Nothing Marrakech-specific: no zellige, arch, tadelakt, terracotta. Hero photo reads as generic modern waterfront villa. Category-interchangeable.
Deterministic: source scan 0 findings (blind to Tailwind arbitrary values). Rendered scan 96 findings on / (undersized-ui-text 38, nested-cards 17, image-hover-transform 16 advisory, kicker-above-heading 10, low-contrast 7, skipped-heading 2).

## Priority issues
- [P0] Hero/header clipped on mobile: px-18 (72px) stacked on .luxury-container in Hero.tsx:20, SiteHeader.tsx:124, FeaturedProject.tsx:14. At 390px "RESORT" and hero paragraph run off right edge, hamburger half cut. overflow-hidden hides scroll overflow. Fix: delete px-18. /impeccable adapt
- [P1] Typography not a scale: 35 rendered sizes, half-pixel steps, ~15 letter-spacing values, globals classes bypassed. Fix: --text-* tokens. /impeccable typeset
- [P1] Micro-type + contrast: 75/167 elements under 12px (45%). Footer legal #6F6C65 3.83:1, placeholders 3.56:1, text over images median 2.4:1, "JUST 12 KM" badge illegible over bright building. /impeccable typeset, /impeccable audit
- [P2] Surfaces/boundaries invisible: #070807 vs #0B0C0B 1.02:1, borders ~1.3:1, 17 nested cards, single hue family. /impeccable colorize, /impeccable quieter
- [P2] Keyboard/motion/touch: 21 outline-none, 0 focus-visible, no reduced-motion, logo is div role=banner, 26/45 targets <44px. /impeccable harden

## Spacing
144px section padding norm (~288px gaps). Outliers: #the-project 56px, 160px, 176px. Eyebrow mb-3 on inline spans collapses (VillaExplorer:35, Testimonial:24, Amenities:48, Concept:29). Inner gaps no scale.

## Typography
Pairing right. --font-display defined 3x, !important patching globals.css:88-93, font-script undefined (InvestmentSection.tsx:84). Body 13-16px actual vs 15.5 declared. Hero tagline md:25px shrink bug Hero.tsx:89. Heading skips h2->h4, h1->h3.

## Color
22 hexes, tokens unused (raw hex everywhere), off-token values. Gold overloaded. Selected state gold vs cream. Three primary button styles.

## Persona red flags
Casey: P0 clipping, tiny targets, hidden-scrollbar filter row. Sam: no focus, no reduced-motion, 3.6-3.8:1 text. Jordan: two competing names in hero, 5+ consultation modals.

## Minor
Location/phone/email contradictions, Riads & Penthouses vs villas-only, mixed radii, placeholder-like testimonials, no PRODUCT.md.
