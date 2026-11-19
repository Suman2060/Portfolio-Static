export interface HeroSettings {
  name: string;
  displayName: string;
  availability: string;
  openTo: string;
  lines: string[];
  emphasisLine: string;
  subline: string;
  stickyNote: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  heroImage: string;
  [key: string]: unknown;
}

export interface Metric {
  value: string;
  label: string;
}

export interface AboutSettings {
  label: string;
  lines: string[];
  emphasis: string;
  paragraph: string;
  metricsLabel: string;
  metrics: Metric[];
  [key: string]: unknown;
}

export interface LabelsSettings {
  work: string;
  workHeading: string;
  workEmpty: string;
  skillsLabel: string;
  skillsHeading: string;
  skillsDesc: string;
  skillsStartChip: string;
  experienceLabel: string;
  experienceHeading: string;
  experienceEmpty: string;
  contactLabel: string;
  contactLines: string[];
  contactEmphasis: string;
  contactSub: string;
  footerFrame: string;
  [key: string]: unknown;
}

export interface SocialsSettings {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl?: string;
  [key: string]: unknown;
}

export interface FooterSettings {
  tagline: string;
  email: string;
  copyrightName: string;
  madeWith: string;
  [key: string]: unknown;
}

export interface SeoSettings {
  title: string;
  description: string;
  author: string;
  ogImage: string;
  [key: string]: unknown;
}

export interface SiteSettings {
  hero: HeroSettings;
  about: AboutSettings;
  labels: LabelsSettings;
  socials: SocialsSettings;
  footer: FooterSettings;
  seo: SeoSettings;
}

export type SiteSection = keyof SiteSettings;

export function resolveMetricValue(
  value: string,
  projectsCount: number,
  experienceCount: number
): string {
  if (value === '__projects__') return String(projectsCount);
  if (value === '__experience__') return String(experienceCount);
  return value;
}

export const DEFAULT_SITE: SiteSettings = {
  hero: {
    name: 'Suman Dangol',
    displayName: 'Suman Dangol',
    availability: 'Available for Opportunities',
    openTo: 'Open to Full-Time Roles & High-Impact Contracts',
    lines: ['FULL-STACK', 'ENGINEER'],
    emphasisLine: '& ARCHITECT',
    subline:
      'Designing and shipping end-to-end web applications with React, Node.js, TypeScript, PostgreSQL, and modern cloud infrastructure.',
    stickyNote: 'Full-Stack · Scalable Systems · Clean Code',
    primaryCtaLabel: 'Get in Touch',
    primaryCtaHref: '#contact',
    secondaryCtaLabel: 'Explore Projects',
    secondaryCtaHref: '#work',
    heroImage: '',
  },
  about: {
    label: 'About the Engineer',
    lines: ['Engineering scalable', 'systems'],
    emphasis: 'systems',
    paragraph:
      'I am a full-stack engineer passionate about creating resilient backend services, scalable databases, and intuitive frontend experiences. With expertise across the entire JavaScript/TypeScript ecosystem, I build fast, reliable, and production-ready applications.',
    metricsLabel: 'By the Numbers',
    metrics: [
      { value: '__projects__', label: 'Projects Shipped' },
      { value: '1+', label: 'Years Experience' },
      { value: '100%', label: 'TypeScript' },
      { value: '__experience__', label: 'Companies' },
    ],
  },
  labels: {
    work: 'Featured Engineering',
    workHeading: 'Engineered Projects',
    workEmpty: 'No projects currently published.',
    skillsLabel: 'Technical Arsenal',
    skillsHeading: 'Skills & Capabilities',
    skillsDesc:
      'A practical, battle-tested full-stack toolkit focused on performance, clean architecture, and rapid shipping.',
    skillsStartChip: 'All',
    experienceLabel: 'Track Record',
    experienceHeading: 'Career & Experience',
    experienceEmpty: 'Experience logs loading...',
    contactLabel: 'Initiate Contact',
    contactLines: ["Let's build something extraordinary"],
    contactEmphasis: 'extraordinary',
    contactSub:
      "Whether you are looking to hire a full-stack engineer, build a new product, or discuss technical architecture — my inbox is always open.",
    footerFrame: 'Available for new opportunities',
  },
  socials: {
    email: 'sumandangol2060@gmail.com.com',
    github: 'https://github.com/Suman2060',
    linkedin: 'https://www.linkedin.com/in/suman-dangol-9310b6306/',
    twitter: '',
  },
  footer: {
    tagline: 'Available for full-time full-stack engineering roles.',
    email: 'sumandangol2060@gmail.com.co',
    copyrightName: 'Suman Dangol',
    madeWith: 'Engineered with React 19, TypeScript & Tailwind CSS',
  },
  seo: {
    title: 'Suman Dangol — Full-Stack Developer & Software Architect',
    description:
      'Full-Stack Developer crafting high-performance, scalable web systems and modern user interfaces.',
    author: 'Suman Dangol',
    ogImage: '',
  },
};

