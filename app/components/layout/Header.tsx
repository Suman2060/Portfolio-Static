'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSite } from '../../store/siteStore';
import DarkModeToggle from '../ui/DarkModeToggle';
import { DEFAULT_GITHUB_USERNAME, extractGithubUsername, githubProfileUrl } from '../../utils/github';

const NAV_LINKS = [
  { href: '#work', label: 'Projects' },
  { href: '#skills', label: 'Tech Stack' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const { site } = useSite();
  const hero = site.hero;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const githubUsername =
    extractGithubUsername(site.socials.github) || DEFAULT_GITHUB_USERNAME;
  const githubUrl = githubProfileUrl(githubUsername);

  return (
    <header
      className="border-b glass sticky top-0 z-50 transition-colors"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 h-16">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 font-display font-bold uppercase tracking-tight text-lg group">
            <span className="w-3 h-3 bg-brand rounded-sm rotate-12 shadow-[0_0_10px_var(--brand)] group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-ink group-hover:text-brand transition-colors">
              {hero.name || 'Suman Dangol'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="nav-link text-sm font-medium text-mid hover:text-brand transition-colors relative py-1"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex btn btn-ghost text-xs py-1.5 px-3"
            title="View GitHub profile"
          >
            GitHub ↗
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex btn btn-brand text-xs py-1.5 px-3.5"
          >
            Hire Me ↗
          </a>

          <DarkModeToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-ink hover:text-brand focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-b border-hairline px-6 py-4 space-y-3 mobile-menu-enter">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-ink hover:text-brand transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-ink hover:text-brand transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-brand w-full mt-2 justify-center"
          >
            Start a conversation <span className="arrow">↗</span>
          </a>
        </div>
      )}
    </header>
  );
}

