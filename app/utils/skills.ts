import type { Skill } from '../types/skill';

export const KNOWN_SKILL_META: Record<string, { category: string; summary: string; defaultBadge: string }> = {
  'react': {
    category: 'Frontend',
    summary: 'Building dynamic UIs with hooks, context, and component architecture.',
    defaultBadge: 'Primary',
  },
  'next.js': {
    category: 'Frontend',
    summary: 'SSR, SSG, and hybrid rendering for production React applications.',
    defaultBadge: 'Daily Driver',
  },
  'typescript': {
    category: 'Frontend',
    summary: 'Strict type safety across the entire stack for confident, refactorable code.',
    defaultBadge: 'Primary',
  },
  'tailwind css': {
    category: 'Frontend',
    summary: 'Utility-first CSS for rapidly building responsive, consistent UIs.',
    defaultBadge: 'Daily Driver',
  },
  'node.js': {
    category: 'Backend',
    summary: 'Scalable server-side JavaScript with event-driven, non-blocking I/O.',
    defaultBadge: 'Primary',
  },
  'express': {
    category: 'Backend',
    summary: 'Fast, minimalist REST API development with middleware pipelines.',
    defaultBadge: 'Daily Driver',
  },
  'postgresql': {
    category: 'Database',
    summary: 'Relational data modeling, complex queries, and transaction management.',
    defaultBadge: 'Primary',
  },
  'prisma': {
    category: 'Database',
    summary: 'Type-safe ORM for database schema, migrations, and queries.',
    defaultBadge: 'Daily Driver',
  },
  'docker': {
    category: 'DevOps & Tools',
    summary: 'Containerized applications for consistent dev and production environments.',
    defaultBadge: 'Production',
  },
  'git': {
    category: 'DevOps & Tools',
    summary: 'Version control, branching strategies, and collaborative code management.',
    defaultBadge: 'Daily Driver',
  },
};

export function cleanSkillName(skill: Skill): string {
  const name = (skill.name || '').trim();
  if (name.toLowerCase() === 'typesscript') return 'TypeScript';
  return name;
}

export function getSkillCategory(skill: Skill): string {
  if (skill.category && skill.category.trim()) {
    return skill.category.trim();
  }
  const lookup = KNOWN_SKILL_META[cleanSkillName(skill).toLowerCase()];
  return lookup?.category || 'General';
}

export function getSkillSummary(skill: Skill): string {
  const lookup = KNOWN_SKILL_META[cleanSkillName(skill).toLowerCase()];
  if (lookup?.summary) return lookup.summary;
  return `Practical production experience with ${cleanSkillName(skill)} across modern applications.`;
}

export function getSkillBadge(skill: Skill): string {
  if (skill.proficiency) {
    if (skill.proficiency >= 90) return 'Primary';
    if (skill.proficiency >= 80) return 'Daily Driver';
    if (skill.proficiency >= 70) return 'Production';
    return 'Proficient';
  }
  const lookup = KNOWN_SKILL_META[cleanSkillName(skill).toLowerCase()];
  return lookup?.defaultBadge || 'Proficient';
}

export function fillSkills(skills: Skill[]): Skill[] {
  return skills
    .filter((s) => s.name && s.name.trim())
    .map((s) => ({ ...s, name: cleanSkillName(s) }));
}

