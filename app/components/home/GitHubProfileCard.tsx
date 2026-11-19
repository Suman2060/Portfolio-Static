'use client';

import { useMemo } from 'react';
import type { GitHubState } from '../../hooks/useGitHub';
import {
  formatCount,
  githubProfileUrl,
  languageColor,
} from '../../utils/github';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ${spinning ? 'animate-spin' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 11a8.1 8.1 0 0 0-14.9-3M4 4v4h4M4 13a8.1 8.1 0 0 0 14.9 3M20 20v-4h-4" />
    </svg>
  );
}

export default function GitHubProfileCard({ github }: { github: GitHubState }) {
  const { data, loading, error, refreshing, refresh, username } = github;
  const profile = data?.profile;
  const repos = useMemo(() => data?.repos ?? [], [data]);

  const totalStars = useMemo(
    () => repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    [repos]
  );

  const topLanguages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [repos]);

  const displayName = profile?.name || username;
  const avatar =
    profile?.avatar_url || `https://github.com/${username}.png?size=200`;
  const profileUrl = profile?.html_url || githubProfileUrl(username);

  if (loading && !data) {
    return (
      <div className="gh-card">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-slate-700/50" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-28 rounded bg-slate-700/50" />
            <div className="h-3 w-20 rounded bg-slate-700/30" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((n) => (
            <div key={n} className="h-14 rounded-lg bg-slate-700/30 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="gh-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt={`${displayName} avatar`}
              width={52}
              height={52}
              className="w-[52px] h-[52px] rounded-full object-cover ring-2 ring-brand/40 shadow-[0_0_20px_rgba(0,242,254,0.25)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[var(--canvas)]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-faint">
              Live from GitHub
            </p>
            <h3 className="font-display font-bold text-ink text-base truncate">
              {displayName}
            </h3>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-brand hover:underline"
            >
              @{username}
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={refreshing}
          className="icon-btn shrink-0"
          title="Refresh GitHub data"
          aria-label="Refresh GitHub data"
        >
          <RefreshIcon spinning={refreshing} />
        </button>
      </div>

      <p className="mt-3 text-xs text-mid leading-relaxed line-clamp-2">
        {profile?.bio || 'Building and shipping software in public. Explore the repositories below.'}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="gh-stat">
          <span className="gh-stat__value">{formatCount(profile?.public_repos ?? repos.length)}</span>
          <span className="gh-stat__label">Repos</span>
        </div>
        <div className="gh-stat">
          <span className="gh-stat__value">{formatCount(totalStars)}</span>
          <span className="gh-stat__label">Stars</span>
        </div>
        <div className="gh-stat">
          <span className="gh-stat__value">{formatCount(profile?.followers)}</span>
          <span className="gh-stat__label">Followers</span>
        </div>
      </div>

      {topLanguages.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {topLanguages.map(([language, count]) => (
            <span key={language} className="tag">
              <span
                className="language-dot"
                style={{ backgroundColor: languageColor(language) }}
              />
              {language}
              <span className="text-faint">{count}</span>
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between gap-3">
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink hover:text-brand transition-colors"
        >
          <GithubIcon className="w-4 h-4" /> Visit profile
          <span className="text-brand">↗</span>
        </a>
        <span className="text-[10px] font-mono text-faint">
          {error
            ? 'cached data'
            : data
              ? `${repos.length} public repos`
              : 'syncing…'}
        </span>
      </div>

      {error && !data && (
        <p className="mt-3 text-[11px] font-mono text-amber-400/90 leading-relaxed">
          {error}
        </p>
      )}
    </div>
  );
}
