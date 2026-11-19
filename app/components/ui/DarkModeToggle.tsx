'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored
      ? stored === 'dark'
      : prefersDark || document.documentElement.classList.contains('dark');

    document.documentElement.classList.toggle('dark', dark);

    const frame = requestAnimationFrame(() => setIsDark(dark));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    setIsDark((previous) => {
      const next = !previous;
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {
        // Storage can be unavailable in private browsing.
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="file-chip cursor-pointer"
      title={isDark ? 'Switch to light' : 'Switch to dark'}
    >
      {isDark ? '◐ light' : '◐ dark'}
    </button>
  );
}
