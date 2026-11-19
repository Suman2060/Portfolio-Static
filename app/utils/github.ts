import type { Project } from '../types/project';

export const DEFAULT_GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || 'Suman2060';

export const GITHUB_CACHE_TTL = 1000 * 60 * 10;

// Keep this allowlist in sync with the repositories that should appear in the
// portfolio. Aliases below accommodate repository naming and spelling variants.
export const SELECTED_PROJECT_TITLES = [
  'Buying and rental ecommerce',
  'Travel Operator',
  'Inventory Management',
  'Asterid Resolver',
  'Invoice detail Extraction',
] as const;

function normalizeProjectName(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

const SELECTED_PROJECT_NAMES: Record<
  string,
  (typeof SELECTED_PROJECT_TITLES)[number]
> = Object.fromEntries(
  [
    ['Buying-and-rental-ecommerce', SELECTED_PROJECT_TITLES[0]],
    ['Travel_operator', SELECTED_PROJECT_TITLES[1]],
    ['Inventory_Management', SELECTED_PROJECT_TITLES[2]],
    ['Astroid_Resolver', SELECTED_PROJECT_TITLES[3]],
    ['Asteroid_Resolver', SELECTED_PROJECT_TITLES[3]],
    ['Invoice-Detail-Extraction', SELECTED_PROJECT_TITLES[4]],
  ].map(([name, title]) => [normalizeProjectName(name), title])
) as Record<string, (typeof SELECTED_PROJECT_TITLES)[number]>;

export function selectedProjectTitle(name: string): string | null {
  return SELECTED_PROJECT_NAMES[normalizeProjectName(name)] ?? null;
}

export function isSelectedProjectName(name: string): boolean {
  return selectedProjectTitle(name) !== null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  default_branch: string;
  owner: { login: string; avatar_url: string };
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
  blog: string | null;
  company: string | null;
  created_at: string;
}

export interface GitHubData {
  username: string;
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  fetchedAt: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  'Jupyter Notebook': '#DA5B0B',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  Solidity: '#AA6746',
};

export function languageColor(language?: string | null): string {
  if (!language) return '#64748b';
  return LANGUAGE_COLORS[language] ?? '#64748b';
}

export function extractGithubUsername(url?: string | null): string | null {
  if (!url) return null;
  try {
    const match = url.match(/github\.com\/([^/?#\s]+)/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export function githubProfileUrl(username: string): string {
  return `https://github.com/${username}`;
}

export function normalizeGithubUrl(url?: string | null): string {
  if (!url) return '';
  return url
    .trim()
    .toLowerCase()
    .replace(/^http:\/\//, 'https://')
    .replace(/\.git$/, '')
    .replace(/\/+$/, '');
}

export function prettifyRepoName(name: string): string {
  return name
    .split(/[-_.]+/)
    .filter(Boolean)
    .map((word) => {
      if (word.length > 1 && word.toUpperCase() === word) return word;
      if (/^[A-Z]{2,}$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function prettifyTopic(topic: string): string {
  return topic
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function normalizeHomepage(homepage: string): string {
  const trimmed = homepage.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function repoToProject(repo: GitHubRepo): Project {
  const techStack = Array.from(
    new Set(
      [repo.language, ...(repo.topics ?? [])]
        .filter((value): value is string => Boolean(value && value.trim()))
        .map((value) => prettifyTopic(value))
    )
  ).slice(0, 8);

  return {
    id: `github-${repo.id}`,
    title: selectedProjectTitle(repo.name) ?? prettifyRepoName(repo.name),
    slug: repo.name,
    shortDescription:
      repo.description || 'Public GitHub repository — open the source to explore the code.',
    description: repo.description ?? undefined,
    techStack,
    githubUrl: repo.html_url,
    liveUrl: repo.homepage ? normalizeHomepage(repo.homepage) : '',
    coverImageUrl: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    isFeatured:
      repo.stargazers_count > 0 ||
      repo.forks_count > 0 ||
      techStack.length >= 4,
    source: 'github',
    language: repo.language ?? undefined,
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    openIssues: repo.open_issues_count,
    updatedAt: repo.pushed_at || repo.updated_at,
    createdAt: repo.created_at,
    homepage: repo.homepage ?? undefined,
  };
}

export function formatCount(value?: number): string {
  if (!value || value < 0) return '0';
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(value);
}

export function relativeTime(iso?: string): string {
  if (!iso) return 'recently';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return 'recently';

  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

function cacheKey(username: string): string {
  return `github-portfolio:${username.toLowerCase()}`;
}

export function readGitHubCache(username: string): GitHubData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GitHubData;
    if (!parsed || !Array.isArray(parsed.repos)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isGitHubCacheFresh(data: GitHubData | null): boolean {
  return Boolean(data && Date.now() - data.fetchedAt < GITHUB_CACHE_TTL);
}

export function writeGitHubCache(data: GitHubData): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(cacheKey(data.username), JSON.stringify(data));
  } catch {
    // Storage can be unavailable in private browsing — fail silently.
  }
}

export function clearGitHubCache(username: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(cacheKey(username));
  } catch {
    // ignore
  }
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error(
        'GitHub API rate limit reached. Please try again in a few minutes.'
      );
    }
    if (response.status === 404) {
      throw new Error(`GitHub user could not be found.`);
    }
    throw new Error(`GitHub request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function fetchGitHubData(
  username: string = DEFAULT_GITHUB_USERNAME,
  signal?: AbortSignal
): Promise<GitHubData> {
  const [profile, repos] = await Promise.all([
    getJson<GitHubProfile>(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      signal
    ).catch(() => null),
    getJson<GitHubRepo[]>(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
      signal
    ),
  ]);

  const publicRepos = (Array.isArray(repos) ? repos : [])
    .filter((repo) => !repo.fork && !repo.archived)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );

  const data: GitHubData = {
    username,
    profile,
    repos: publicRepos,
    fetchedAt: Date.now(),
  };

  writeGitHubCache(data);
  return data;
}
