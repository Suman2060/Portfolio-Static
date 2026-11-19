'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_GITHUB_USERNAME,
  fetchGitHubData,
  isGitHubCacheFresh,
  readGitHubCache,
  type GitHubData,
} from '../utils/github';

export interface GitHubState {
  data: GitHubData | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  fromCache: boolean;
  username: string;
  refresh: () => void;
}

const sharedByUser: Record<string, GitHubData> = {};
const pendingByUser: Record<string, Promise<GitHubData>> = {};

function requestFor(username: string): Promise<GitHubData> {
  const pending = pendingByUser[username];
  if (pending) return pending;

  const request = fetchGitHubData(username)
    .then((data) => {
      sharedByUser[username] = data;
      return data;
    })
    .finally(() => {
      delete pendingByUser[username];
    });

  pendingByUser[username] = request;
  return request;
}

export function useGitHub(username: string = DEFAULT_GITHUB_USERNAME): GitHubState {
  const [data, setData] = useState<GitHubData | null>(() => sharedByUser[username] ?? null);
  const [loading, setLoading] = useState(() => !sharedByUser[username]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const requestId = useRef(0);

  const load = useCallback(
    async (force: boolean) => {
      const shared = sharedByUser[username] ?? null;
      const cached = shared ?? readGitHubCache(username);

      if (cached) {
        setData(cached);
        setFromCache(true);
        setLoading(false);
        if (!force && isGitHubCacheFresh(cached)) return;
      } else {
        setLoading(true);
      }

      if (force) setRefreshing(true);

      const id = ++requestId.current;

      try {
        const fresh = await requestFor(username);
        if (requestId.current !== id) return;
        setData(fresh);
        setFromCache(false);
        setError(null);
      } catch (err) {
        if (requestId.current !== id) return;
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load projects from GitHub right now.'
        );
      } finally {
        if (requestId.current === id) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [username]
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      void load(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [load]);

  const refresh = useCallback(() => {
    void load(true);
  }, [load]);

  return {
    data,
    loading,
    refreshing,
    error,
    fromCache,
    username,
    refresh,
  };
}
