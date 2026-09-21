import { CaseStudy, GalleryItem, ProcessStepItem } from '../types';

export const HERO_DATA = {
  eyebrow: 'VISUAL & DIGITAL STUDIO\nFOR REAL ESTATE',
  headline: 'Real estate,\nseen differently.',
  supporting: 'Digital presence for properties worth noticing.',
  trustStatement: 'TRUSTED BY PROPERTY OWNERS,\nREALTORS AND HOSPITALITY BRANDS.',
  slogan: ['SPACES', 'PEOPLE', 'POSSIBILITIES'],
  counter: '01 / 03',
  videoSrc: 'https://assets.mixkit.co/videos/47102/47102-720.mp4',
  posterImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=85',
};

export const AIRBNB_DATA = {
  number: '02',
  label: 'AIRBNB AND RENTAL BUSINESSES',
  slogan: ['SPACES', 'PEOPLE LOVE', 'BOOK'],
  headline: 'From visitors\nto bookers.',
  supporting: 'Photography curated to make\nevery stay feel worth choosing.',
  metadata: 'VILLA MARRAKECH · RENTAL CAMPAIGN',
  ctaText: 'VIEW CASE STUDY',
  handwrittenNote: 'More\nmemorable\nstays',
  steps: [
    { number: '01', label: 'CAPTURE ATTENTION' },
    { number: '02', label: 'BUILD DESIRE' },
    { number: '03', label: 'DRIVE BOOKINGS' },
  ],
  bottomLeft: 'REAL SPACES. REAL PEOPLE. GREATER RETURNS.',
  bottomRight: 'PHOTOGRAPHY / STRATEGY / RESULTS',
  images: {
    // IMG_6017: Blue bedroom with architectural light & deep blue textiles
    blueBedroom: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    // IMG_8245: Warm yellow/amber bedroom with morning light
    yellowBedroom: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=85',
    // IMG_4592: Breakfast setup with warm light, coffee and fruit
    breakfast: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
  },
};

export const REALTOR_DATA = {
  number: '03',
  label: 'REALTORS AND PERSONAL BRANDING',
  slogan: ['SPACES', 'PEOPLE', 'STORIES'],
  counter: '03 / 05',
  verticalLabel: 'REALTORS',
  headline: 'Build a name\npeople remember.',
  supporting: 'Personal-brand films and property content that help\nrealtors earn attention, trust and new business.',
  capabilities: ['VIDEOS', 'CAMPAIGNS', 'CONTENT ASSETS'],
  opportunityPanel: {
    words: ['PEOPLE', 'TURN SPACES', 'INTO', 'OPPORTUNITY.'],
    supporting: ['REAL STORIES.', 'REAL RESULTS.'],
  },
  portraitVideo: {
    // Derived from the design sheet (UI erased) until the original film poster exists.
    poster: '/assets/realtors/portrait.png',
    caption: 'A REPUTATION\nBUILT IN MOTION',
    duration: '01:24',
    videoUrl: 'https://assets.mixkit.co/videos/47102/47102-720.mp4',
  },
  imageLabels: ['THE PROPERTY', 'THE LIFESTYLE'],
  gallery: [
    {
      id: 'prop-1',
      title: 'THE PROPERTY',
      category: 'ARCHITECTURAL RESIDENCE',
      image: '/assets/realtors/property.png',
      thumb: '/assets/realtors/thumb-1.png',
      caption: 'ARCHITECTURAL FRAMING & SPATIAL INTEGRITY',
      aspect: '16:9',
    },
    {
      id: 'life-1',
      title: 'THE LIFESTYLE',
      category: 'CANDID MOMENTS',
      image: '/assets/realtors/lifestyle.png',
      thumb: '/assets/realtors/thumb-2.png',
      caption: 'NATURAL MOTION & CULINARY CONNECTION',
      aspect: '16:9',
    },
    {
      id: 'prop-2',
      title: 'LIGHT & TIMBER',
      category: 'INTERIOR ATMOSPHERE',
      image: '/assets/realtors/thumb-3.png',
      thumb: '/assets/realtors/thumb-3.png',
      caption: 'WARM WOOD TEXTURES & SCULPTURAL VOLUMES',
      aspect: '16:9',
    },
    {
      id: 'life-2',
      title: 'CREATIVE SPACES',
      category: 'HOST PROFILE',
      image: '/assets/realtors/thumb-4.png',
      thumb: '/assets/realtors/thumb-4.png',
      caption: 'PERSONAL BRAND IN CONVERSATION',
      aspect: '16:9',
    },
    {
      id: 'prop-3',
      title: 'PANORAMIC LIVING',
      category: 'WIDE PERSPECTIVES',
      image: '/assets/realtors/thumb-5.png',
      thumb: '/assets/realtors/thumb-5.png',
      caption: 'INDOOR-OUTDOOR ENTERTAINMENT FLOW',
      aspect: '16:9',
    },
  ] as GalleryItem[],
  ctaText: 'WATCH THE STORY',
  supportingStatement: 'A REPEATABLE CONTENT SYSTEM\nFOR MODERN REALTORS.',
};

export const BRANDED_VILLAS_DATA = {
  number: '04',
  label: 'BRANDED\nVILLAS',
  headline: 'Turn a villa into\na destination.',
  supporting: 'Cinematic stories and social content\nthat give branded properties a world\npeople want to enter.',
  slogan: ['PEOPLE', 'PLACES', 'POSSIBILITIES'],
  capabilities: ['HERO FILM', 'SOCIAL REELS', 'LIFESTYLE STILLS', 'CAMPAIGN CUTS'],
  ctaText: 'EXPLORE VILLA FILMS',
  mainVideo: {
    // Terracotta exterior / luxury pool shot
    poster: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/47102/47102-720.mp4',
    time: '0:00 / 1:28',
  },
  detailImages: [
    {
      // Pool texture / water caustics
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=85',
      captionLines: ['TEXTURES', 'THAT INSPIRE'],
    },
    {
      // Orchid botanical detail / greenery
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
      captionLines: ['DETAILS', 'THAT CONNECT'],
    },
  ],
  bottomLeft: 'VILLAS FOR A BRIGHTER TOMORROW',
  bottomRight: 'ARCHITECTURE   CONTENT   IMPACT',
};

export const WEBSITES_DATA = {
  number: '05',
  eyebrow: '05 — WEBSITES AND STRATEGIC APPROACH',
  headline: 'A digital presence\nas considered\nas the property.',
  supporting: 'We translate your brand into vibrant,\nhigh-performing websites built to\npresent, persuade and convert.',
  ctaText: 'VIEW PROJECT',
  projectMeta: 'PALM RESIDENCE —\nWEBSITE & DIGITAL EXPERIENCE',
  capabilities: 'STRATEGY / ART DIRECTION /\nRESPONSIVE DESIGN / DEVELOPMENT',
  headerCtaText: "LET'S TALK",
  stillLifeBackground: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
  mockupDesktop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  mockupMobile: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=85',
  processIntro: {
    eyebrow: 'WHY OFFSET',
    heading: 'Every project begins\nwith a reason.',
  },
  processSteps: [
    {
      number: '01',
      title: 'UNDERSTAND',
      description: 'We listen, explore and uncover what makes your property and audience unique.',
      accent: 'cyan',
    },
    {
      number: '02',
      title: 'POSITION',
      description: 'We define a clear strategy to elevate your brand in a competitive market.',
      accent: 'amber',
    },
    {
      number: '03',
      title: 'CREATE',
      description: 'We craft expressive visuals and digital experiences that bring the vision to life.',
      accent: 'cyan',
    },
    {
      number: '04',
      title: 'REFINE',
      description: 'We test, iterate and perfect every touchpoint to maximise impact.',
      accent: 'amber',
    },
  ] as ProcessStepItem[],
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'villa-marrakech': {
    id: 'villa-marrakech',
    title: 'Villa Marrakech',
    client: 'Private Luxury Estate',
    category: 'Rental Campaign & Photography',
    heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    secondaryImages: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A comprehensive editorial photo suite and visual styling campaign developed for an exclusive short-term rental destination. We crafted a narrative highlighting architectural light, texture, and tranquil morning rituals, driving direct reservations and commanding premium night rates.',
    deliverables: ['Editorial Photography (45 Stills)', 'Listing Optimisation Assets', 'Instagram Content Pack', 'Print Brand Identity Guide'],
    stats: [
      { label: 'Avg. Nightly Rate', value: '+38%' },
      { label: 'Booking Conversion', value: '+64%' },
      { label: 'Airbnb Superhost Rating', value: '4.98' },
    ],
  },
  'realtor-brand': {
    id: 'realtor-brand',
    title: 'Julian Vance — Personal Brand Film',
    client: 'Julian Vance & Partners',
    category: 'Personal Brand & Listing Video Suite',
    heroImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1600&q=85',
    secondaryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A cinematic brand film capturing the philosophy, discipline, and architectural curation of high-tier luxury broker Julian Vance. Designed to position the agent ahead of competing bids and build authentic rapport with high-net-worth sellers.',
    deliverables: ['60s Cinematic Brand Film', 'Three 15s Instagram Reels', 'High-Res Editorial Portraiture', 'Custom YouTube Series Assets'],
    stats: [
      { label: 'New High-Value Listings', value: '4 Exclusive' },
      { label: 'Direct Inquiries', value: '+120%' },
      { label: 'Audience Retention', value: '82%' },
    ],
  },
  'branded-villa-film': {
    id: 'branded-villa-film',
    title: 'Casa Solarium — Branded Destination',
    client: 'Solarium Hospitality Group',
    category: 'Cinematic Hero Film & Social Cutdowns',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    secondaryImages: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Elevating a standout Mediterranean villa into a globally desired holiday retreat. Through drone cinematography, macro architectural vignettes, and atmospheric sound design, we captured an unrepeatable sense of place.',
    deliverables: ['90s Cinema Hero Film', '4 Vertical Social Reels', 'Architectural Stills Series', 'Campaign Audio Landscape'],
    stats: [
      { label: 'Pre-season Bookings', value: '100% Sold' },
      { label: 'Instagram Reach', value: '340k+' },
      { label: 'Media Features', value: 'Architectural Digest' },
    ],
  },
  'palm-residence': {
    id: 'palm-residence',
    title: 'Palm Residence — Digital Experience',
    client: 'Belgrave Development',
    category: 'Brand Strategy, Web Design & Next.js Build',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    secondaryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A bespoke digital presence built for an ultra-luxury compound in the Palm hills. With custom micro-interactions, responsive floorplans, and an editorial typography system, the site delivers a tactile, memorable sales experience on desktop and mobile.',
    deliverables: ['Brand Positioning & Copywriting', 'Responsive Web App (React / Tailwind)', 'Interactive Spatial Tour', 'Private Private Client Ingestion Flow'],
    stats: [
      { label: 'Time On Site', value: '4m 12s' },
      { label: 'Qualified Buyer Leads', value: '19 Off-Market' },
      { label: 'Mobile Conversion', value: '+45%' },
    ],
  },
};
