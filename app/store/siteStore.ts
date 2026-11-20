'use client';

import { DEFAULT_SITE, type SiteSettings } from '../types/site';
import type { Project } from '../types/project';
import type { Skill } from '../types/skill';
import type { Experience } from '../types/experience';

// This portfolio is intentionally static: update the arrays below when the
// displayed skills, projects, or experience change. No backend is required.

const STATIC_SKILLS: Skill[] = [
  { id: 1, name: 'TypeScript', category: 'Frontend', proficiency: 92 },
  { id: 2, name: 'React', category: 'Frontend', proficiency: 90 },
  { id: 3, name: 'Next.js', category: 'Frontend', proficiency: 85 },
  { id: 4, name: 'Tailwind CSS', category: 'Frontend', proficiency: 90 },
  { id: 5, name: 'Node.js', category: 'Backend', proficiency: 88 },
  { id: 6, name: 'Express', category: 'Backend', proficiency: 85 },
  { id: 7, name: 'PostgreSQL', category: 'Database', proficiency: 82 },
  { id: 8, name: 'Prisma', category: 'Database', proficiency: 80 },
  { id: 10, name: 'Git', category: 'DevOps & Tools', proficiency: 90 },
  { id: 11, name: 'REST APIs', category: 'Backend', proficiency: 90 },
  { id: 12, name: 'Zustand', category: 'Frontend', },
];

const STATIC_PROJECTS: Project[] = [];


const STATIC_EXPERIENCE: Experience[] = [
  {
    id: 1,
    title: 'Full Stack Developer Intern',
    organization: 'Asteroid Studio, Jwagal',
    startDate: '2026-05-01',
    description:
      'Developing RESTful APIs using Node.js, Express.js, PostgreSQL, Prisma, and Knex.js with a structured Routes–Controller–Service architecture. Contributed to an Expense Management System built with React, TypeScript, Node.js, and PostgreSQL, implementing search, filtering, pagination, and role-based expense workflows. Built React interfaces using React Router, Tailwind CSS, TanStack Query, Axios, Zustand, React Hook Form, and Zod.',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    organization: 'I-Click Pvt Ltd, Kathmandu',
    startDate: '2026-01-01',
    description:
      'Building responsive user interfaces with React functional components, hooks (useState, useEffect, useContext, useRef), state management, and React Router. Fetching REST APIs with proper error handling and implementing client-side form validation. Styling with CSS3, Flexbox, Grid, and Tailwind CSS, with code splitting and lazy loading for performance. Using Git and pull requests for team collaboration.',
  },
  {
    id: 3,
    title: 'BIM: Information Management',
    organization: 'National College of Computer Studies, Kathmandu',
    startDate: '2022-09-01',
    endDate: '2026-06-01',
    description:
      'Studying information management and software development fundamentals. Built the Bike-Fram e-commerce project using Django, REST API, React, Redux, Tailwind CSS, SQLite, and the Khalti payment API. Participated in the NCCS Hackathon (January 2–4, 2026).',
  },
];

const STATIC_SITE: SiteSettings = {
  ...DEFAULT_SITE,
  socials: {
    email: 'sumandangol2060@gmail.com',
    github: 'https://github.com/Suman2060',
    linkedin: 'https://linkedin.com',
    twitter: '',
    resumeUrl: '/cv/Suman_Resume.pdf?v=2',
  },
  footer: {
    tagline: 'Available for full-time full-stack engineering roles.',
    email: 'sumandangol2060@gmail.com',
    copyrightName: 'Suman Dangol',
    madeWith: 'Engineered with Next.js, TypeScript & Tailwind CSS',
  },
};

// Keep this hook-compatible API so components do not depend on a state library.
const _site = STATIC_SITE;
const _projects = STATIC_PROJECTS;
const _skills = STATIC_SKILLS;
const _experience = STATIC_EXPERIENCE;

export function useSite() {
  return {
    site: _site,
    projects: _projects,
    skills: _skills,
    experience: _experience,
    dataLoaded: true,
    siteLoaded: true,
  };
}

export function useSiteStore<T>(selector: (state: {
  site: SiteSettings;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  dataLoaded: boolean;
  siteLoaded: boolean;
  initialize: () => Promise<void>;
}) => T): T {
  const state = {
    site: _site,
    projects: _projects,
    skills: _skills,
    experience: _experience,
    dataLoaded: true,
    siteLoaded: true,
    initialize: async () => {},
  };
  return selector(state);
}

