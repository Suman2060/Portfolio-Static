'use client';

import { useMemo, useState } from 'react';
import { useSite } from '../../store/siteStore';
import { SectionHeading } from '../ui/Heading';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types/project';
import type { GitHubState } from '../../hooks/useGitHub';
import {
  githubProfileUrl,
  isSelectedProjectName,
  normalizeGithubUrl,
  repoToProject,
} from '../../utils/github';

type SortMode = 'recent' | 'stars' | 'name';

function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m20 20-3.5-3.5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Work({
  projects,
  loading,
  github,
}: {
  projects: Project[];
  loading: boolean;
  github: GitHubState;
}) {
  const { site } = useSite();
  const labels = site.labels;

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('recent');

  const githubProjects = useMemo(
    () =>
      (github.data?.repos ?? [])
        .filter((repo) => isSelectedProjectName(repo.name))
        .map(repoToProject),
    [github.data]
  );

  const merged = useMemo(() => {
    const githubUrls = new Set(
      githubProjects.map((p) => normalizeGithubUrl(p.githubUrl)).filter(Boolean)
    );
    const curated = projects.filter(
      (p) =>
        isSelectedProjectName(p.title) &&
        (!p.githubUrl || !githubUrls.has(normalizeGithubUrl(p.githubUrl)))
    );
    return [...githubProjects, ...curated];
  }, [githubProjects, projects]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = q
      ? merged.filter((project) => {
          const haystack = [
            project.title,
            project.shortDescription,
            project.language,
            ...(project.techStack ?? []),
            ...(project.topics ?? []),
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return haystack.includes(q);
        })
      : merged;

    return [...filtered].sort((a, b) => {
      if (sort === 'stars') return (b.stars ?? 0) - (a.stars ?? 0);
      if (sort === 'name') return a.title.localeCompare(b.title);
      return (
        new Date(b.updatedAt ?? 0).getTime() -
        new Date(a.updatedAt ?? 0).getTime()
      );
    });
  }, [merged, query, sort]);

  const isInitialLoading = (loading || github.loading) && !github.data;
  const profileUrl = githubProfileUrl(github.username);

  return (
    <section id="work" className="section-shell relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="file-label mb-3 text-brand">
              ✦ {labels.work || 'Featured Engineering'}
            </div>
            <SectionHeading text={labels.workHeading || 'Engineered Projects'} />
            <p className="mt-4 text-sm md:text-base text-mid max-w-xl leading-relaxed">
              A complete archive of my public GitHub repositories and selected work.
              Search or sort to explore everything.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="file-chip text-xs">
              <span className="status-dot" />
              {isInitialLoading
                ? 'Loading projects…'
                : `${merged.length} ${merged.length === 1 ? 'project' : 'projects'}`}
            </span>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost text-xs py-2 px-3.5"
            >
              <GithubIcon /> @{github.username}
              <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        <div className="work-toolbar">
          <label className="search-box sm:max-w-md">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, tech, topics…"
              aria-label="Search projects"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="text-faint hover:text-ink"
              >
                ✕
              </button>
            )}
          </label>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-faint whitespace-nowrap">
              {visible.length} shown
            </span>
            <select
              className="select"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              aria-label="Sort projects"
            >
              <option value="recent">Recently updated</option>
              <option value="stars">Most stars</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {github.error && (
          <div className="notice mt-5">
            <span className="text-amber-400">⚠ {github.error}</span>
            <button type="button" onClick={github.refresh} className="notice__action">
              {github.refreshing ? 'Retrying…' : 'Retry'}
            </button>
          </div>
        )}

        {isInitialLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="project-card animate-pulse">
                <div className="h-44 bg-slate-700/20" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 rounded bg-slate-700/30" />
                  <div className="h-3 w-full rounded bg-slate-700/20" />
                  <div className="h-3 w-4/5 rounded bg-slate-700/20" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-5 w-14 rounded bg-slate-700/20" />
                    <div className="h-5 w-16 rounded bg-slate-700/20" />
                    <div className="h-5 w-12 rounded bg-slate-700/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="panel p-12 mt-8 text-center">
            <p className="text-sm font-mono text-mid">
              {merged.length === 0
                ? labels.workEmpty || 'No projects currently published.'
                : 'No projects match your search.'}
            </p>
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="btn btn-ghost text-xs mt-5"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <div className="mt-10 panel p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink">
              Want to see the full activity, commits, and experiments?
            </p>
            <p className="text-xs text-mid mt-1">
              Browse every repository directly on my GitHub profile.
            </p>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-brand text-xs shrink-0"
          >
            <GithubIcon /> View GitHub profile <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
