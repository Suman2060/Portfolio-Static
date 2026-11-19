'use client';

import { useState, useEffect } from 'react';
import { useSite } from '../../store/siteStore';
import GitHubProfileCard from './GitHubProfileCard';
import type { GitHubState } from '../../hooks/useGitHub';
import { githubProfileUrl } from '../../utils/github';

const ROLES = [
  'Full-Stack Developer',
  'Node.js & React Architect',
  'PostgreSQL & API Developer',
];

export default function Hero({ github }: { github: GitHubState }) {
  const { site } = useSite();
  const hero = site.hero;
  const nameParts = (hero.name || 'Suman Dangol').trim().split(/\s+/);
  const firstName = nameParts.slice(0, -1).join(' ');
  const lastName = nameParts[nameParts.length - 1];

  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetRole.length) {
          setCurrentText(targetRole.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(targetRole.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Glow highlight behind hero */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand/10 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center">

          {/* Left Column: Headline & Bio */}
          <div>
            <div className="mb-6 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                  <span className="status-dot" />
                  <span>{hero.availability || 'AVAILABLE FOR HIRE'}</span>
                </div>
                <span className="text-xs font-mono text-mid uppercase tracking-widest hidden sm:inline-block">
                  ✦ Full-Stack Engineering
                </span>
              </div>
              <p className="hero-eyebrow">I turn complex product ideas into dependable software.</p>
            </div>

            <div className="space-y-1">
              <p className="text-base md:text-lg font-mono text-brand font-medium tracking-wide">
                Hi, my name is
              </p>
              <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl tracking-tight text-ink">
                {firstName && <span>{firstName} </span>}
                <span className="gradient-text">{lastName}</span>
              </h1>

              <div className="h-10 sm:h-12 flex items-center font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                <span className="gradient-text">{currentText}</span>
                <span className="terminal-cursor" />
              </div>
            </div>

            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-mid">
              {hero.subline ||
                'I build scalable end-to-end web applications, robust REST APIs, distributed backends, and sleek modern user experiences.'}
            </p>

            {/* Quick Tech Highlights */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-faint uppercase mr-1">Core Stack:</span>
              {['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind'].map((tech) => (
                <span key={tech} className="file-chip text-[11px] py-1 px-2.5">
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a className="btn btn-brand" href={hero.primaryCtaHref || '#contact'}>
                {hero.primaryCtaLabel || 'Get in Touch'} <span className="arrow">↗</span>
              </a>
              <a className="btn btn-ghost" href={hero.secondaryCtaHref || '#work'}>
                {hero.secondaryCtaLabel || 'View Projects'} <span className="arrow">↓</span>
              </a>
              <a
                className="btn btn-ghost text-xs border-brand/40 text-brand hover:bg-brand/10"
                href={githubProfileUrl(github.username)}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span className="arrow">↗</span>
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-faint">
              <span><strong className="text-emerald-400">●</strong> Open to full-time roles</span>
              <span><strong className="text-brand">↗</strong> Remote / global</span>
              <span><strong className="text-purple">24h</strong> Typical reply</span>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal */}
          <div className="flex flex-col gap-5 mx-auto lg:mx-0 w-full max-w-md">
            {/* Terminal Window Card */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="terminal-dot red" />
                  <div className="terminal-dot yellow" />
                  <div className="terminal-dot green" />
                </div>
                <span className="text-[11px] text-faint font-mono">developer.ts</span>
                <span className="text-[11px] text-emerald-400 font-mono">● active</span>
              </div>

              <div className="p-4 sm:p-5 text-xs sm:text-sm font-mono leading-relaxed space-y-2 overflow-x-auto text-slate-300">
                <div>
                  <span className="text-purple">const</span> <span className="text-brand">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span> <span className="text-emerald-400">&#39;{hero.name || 'Suman Dangol'}&#39;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">role:</span> <span className="text-emerald-400">&#39;Full-Stack Software Engineer&#39;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">expertise:</span> [
                  <span className="text-amber-300">&#39;Frontend&#39;</span>, <span className="text-amber-300">&#39;Backend&#39;</span>,
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">status:</span> <span className="text-cyan-400">&#39;Ready for high-impact roles&#39;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">craft:</span> () =&gt; <span className="text-purple">new</span> <span className="text-brand">FullStackApp</span>().deploy()
                </div>
                <div>&#125;;</div>
              </div>
            </div>

            {/* Live GitHub profile */}
            <GitHubProfileCard github={github} />

            <a href="#contact" className="hero-next-step group">
              <span className="hero-next-step-icon">↘</span>
              <span>
                <strong>Have a product to ship?</strong>
                <small>Tell me what you are building</small>
              </span>
              <span className="arrow ml-auto">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

