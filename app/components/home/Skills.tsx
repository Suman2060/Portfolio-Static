'use client';

import { useMemo, useState } from 'react';
import { useSite } from '../../store/siteStore';
import { SectionHeading } from '../ui/Heading';
import { cleanSkillName, getSkillCategory } from '../../utils/skills';
import type { Skill } from '../../types/skill';

interface CategoryMeta {
  icon: string;
  blurb: string;
  accent: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  Frontend: {
    icon: '◈',
    blurb: 'Interfaces & client architecture',
    accent: '#38bdf8',
  },
  Backend: {
    icon: '⚙',
    blurb: 'APIs, services & server logic',
    accent: '#34d399',
  },
  Database: {
    icon: '◉',
    blurb: 'Modeling, queries & persistence',
    accent: '#a78bfa',
  },
  'DevOps & Tools': {
    icon: '⬡',
    blurb: 'Shipping, automation & workflow',
    accent: '#fbbf24',
  },
  General: {
    icon: '✦',
    blurb: 'Core engineering fundamentals',
    accent: '#94a3b8',
  },
};

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'DevOps & Tools', 'General'];

function metaFor(category: string): CategoryMeta {
  return (
    CATEGORY_META[category] ?? {
      icon: '✦',
      blurb: 'Core engineering toolkit',
      accent: '#38bdf8',
    }
  );
}

function orderIndex(category: string): number {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const { site } = useSite();
  const labels = site.labels;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const groups = useMemo(() => {
    const map = new Map<string, Skill[]>();

    for (const skill of skills) {
      const category = getSkillCategory(skill);
      const existing = map.get(category);
      if (existing) {
        existing.push(skill);
      } else {
        map.set(category, [skill]);
      }
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => orderIndex(a) - orderIndex(b) || a.localeCompare(b))
      .map(([category, items]) => ({
        category,
        items: [...items].sort((a, b) =>
          cleanSkillName(a).localeCompare(cleanSkillName(b))
        ),
        meta: metaFor(category),
      }));
  }, [skills]);

  const totalSkills = groups.reduce((sum, group) => sum + group.items.length, 0);
  const categories = ['All', ...groups.map((group) => group.category)];
  const visibleGroups =
    activeCategory === 'All'
      ? groups
      : groups.filter((group) => group.category === activeCategory);
  const visibleCount = visibleGroups.reduce(
    (sum, group) => sum + group.items.length,
    0
  );

  return (
    <section id="skills" className="section-shell relative">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="file-label mb-3 text-brand">
              ✦ {labels.skillsLabel || 'Technical Arsenal'}
            </div>
            <SectionHeading text={labels.skillsHeading || 'Skills & Capabilities'} />
          </div>
          <p className="text-sm md:text-base text-mid max-w-md leading-relaxed">
            {labels.skillsDesc ||
              'A practical, battle-tested full-stack toolkit focused on performance, clean architecture, and rapid shipping.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Skill categories">
            {categories.map((category) => {
              const count =
                category === 'All'
                  ? totalSkills
                  : groups.find((group) => group.category === category)?.items
                      .length ?? 0;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`skill-filter ${activeCategory === category ? 'is-active' : ''}`}
                >
                  {category}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-faint">
            {visibleGroups.length} {visibleGroups.length === 1 ? 'category' : 'categories'} ·{' '}
            {visibleCount} {visibleCount === 1 ? 'skill' : 'skills'}
          </span>
        </div>

        {visibleGroups.length === 0 ? (
          <div className="panel p-12 text-center text-sm font-mono text-mid">
            No skills found in this category.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {visibleGroups.map(({ category, items, meta }) => (
              <div key={category} className="panel skill-group">
                <div className="skill-group__head">
                  <span
                    className="skill-group__icon"
                    style={{ color: meta.accent }}
                    aria-hidden="true"
                  >
                    {meta.icon}
                  </span>
                  <div className="min-w-0">
                    <h3>{category}</h3>
                    <p>{meta.blurb}</p>
                  </div>
                  <span className="skill-group__count">{items.length}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill.id ?? skill.name} className="skill-pill">
                      <span
                        className="skill-pill__dot"
                        style={{ backgroundColor: meta.accent }}
                        aria-hidden="true"
                      />
                      {cleanSkillName(skill)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
