export type HeaderTheme = 'hero' | 'light' | 'lightWithCta';

export type ButtonVariant = 
  | 'white' 
  | 'outlineLight' 
  | 'outlineDark' 
  | 'cobalt' 
  | 'teal' 
  | 'amber' 
  | 'cyan';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  thumb?: string;
  caption: string;
  duration?: string;
  aspect?: string;
}

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
  accent: 'cyan' | 'amber';
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  heroImage: string;
  secondaryImages: string[];
  description: string;
  deliverables: string[];
  stats?: { label: string; value: string }[];
  videoUrl?: string;
  year?: string;
  subtitle?: string;
  impactMetric?: { label: string; value: string };
}
