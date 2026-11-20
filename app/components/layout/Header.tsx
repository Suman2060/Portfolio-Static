"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSite } from "../../store/siteStore";
import DarkModeToggle from "../ui/DarkModeToggle";
import {
  DEFAULT_GITHUB_USERNAME,
  extractGithubUsername,
  githubProfileUrl,
} from "../../utils/github";

const NAV_LINKS = [
  { href: "#work", label: "Projects" },
  { href: "#skills", label: "Tech Stack" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { site } = useSite();
  const hero = site.hero;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const githubUsername =
    extractGithubUsername(site.socials.github) || DEFAULT_GITHUB_USERNAME;
  const githubUrl = githubProfileUrl(githubUsername);
  const resumeUrl = site.socials.resumeUrl || "/cv/Suman_Resume.pdf?v=2";

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className="border-b glass sticky top-0 z-50 transition-colors"
        style={{ borderColor: "var(--hairline)" }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 h-16">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display font-bold uppercase tracking-tight text-base sm:text-lg group min-w-0"
          >
            <span className="w-3 h-3 bg-brand rounded-sm rotate-12 shadow-[0_0_10px_var(--brand)] group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-ink group-hover:text-brand transition-colors truncate max-w-[9rem] sm:max-w-none">
              {hero.name || "Suman Dangol"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5">
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
            className="hidden xl:inline-flex btn btn-ghost text-xs py-2 px-3"
            title="View GitHub profile"
          >
            GitHub ↗
          </a>
          <a
            href="#contact"
            className="hidden md:inline-flex btn btn-brand text-xs py-2 px-3.5"
          >
            Hire Me ↗
          </a>

          <a
            href={resumeUrl}
            className="hidden sm:inline-flex btn btn-brand text-xs py-2 px-3.5"
            type="application/pdf"
          >
            View CV
          </a>
          <a
            href={resumeUrl}
            download="Suman_Dangol_CV.pdf"
            className="hidden sm:inline-flex btn btn-ghost text-xs py-2 px-3"
            title="Download CV"
            aria-label="Download CV"
            type="application/pdf"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
          </a>
          <DarkModeToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-ink hover:text-brand focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-b border-hairline px-4 sm:px-6 py-4 space-y-3 mobile-menu-enter">
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
          <a
            href={resumeUrl}
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-brand w-full mt-2 justify-center"
            type="application/pdf"
          >
            View CV
          </a>
          <a
            href={resumeUrl}
            download="Suman_Dangol_CV.pdf"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-ghost w-full mt-2 justify-center"
            type="application/pdf"
          >
            Download CV
          </a>
        </div>
      )}
      </header>
    </>
  );
}
