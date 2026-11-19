'use client';

import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import Marquee from './components/home/Marquee';
import Statement from './components/home/Statement';
import Work from './components/home/Work';
import Skills from './components/home/Skills';
import ExperienceSection from './components/home/Experience';
import Contact from './components/home/Contact';
import LoadingScreen from './components/ui/LoadingScreen';
import { useSite } from './store/siteStore';
import { useGitHub } from './hooks/useGitHub';
import {
  DEFAULT_GITHUB_USERNAME,
  extractGithubUsername,
  isSelectedProjectName,
} from './utils/github';
import { fillSkills } from './utils/skills';

export default function Home() {
  const { projects, skills, experience, dataLoaded, site } = useSite();
  const [showPreloader, setShowPreloader] = useState(true);

  const githubUsername =
    extractGithubUsername(site.socials.github) || DEFAULT_GITHUB_USERNAME;
  const github = useGitHub(githubUsername);

  const filledSkills = fillSkills(skills);
  const projectsCount =
    github.data?.repos.filter((repo) => isSelectedProjectName(repo.name)).length ??
    projects.length;

  // Apply dark mode on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const root = document.documentElement;
    if (stored === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <div className="ambient-backdrop" aria-hidden="true">
        <span className="ambient-blob ambient-blob--brand" />
        <span className="ambient-blob ambient-blob--violet" />
      </div>

      {showPreloader && (
        <LoadingScreen ready={dataLoaded} onComplete={() => setShowPreloader(false)} />
      )}

      <Header />

      <main className="flex-1">
        <Hero github={github} />
        <Marquee skills={filledSkills} />
        <Statement projectsCount={projectsCount} experienceCount={experience.length} />
        <Work projects={projects} loading={!dataLoaded} github={github} />
        <Skills skills={filledSkills} />
        <ExperienceSection experience={experience} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
