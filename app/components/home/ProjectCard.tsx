'use client';

import { useState } from 'react';
import type { Project } from '../../types/project';
import { formatCount, languageColor, relativeTime } from '../../utils/github';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18v4.5M17.5 6.5 11 13" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2.5 2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="18" cy="5" r="2.2" />
      <circle cx="12" cy="19" r="2.2" />
      <path strokeLinecap="round" d="M6 7.2v1.3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.2M12 11.5v5.3" />
    </svg>
  );
}

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const [imageError, setImageError] = useState(false);
  const isGitHub = project.source === 'github';
  const cover = project.coverImageUrl;
  const initials = project.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <article
      className="project-card fade-up"
      style={{ animationDelay: `${Math.min(index, 9) * 55}ms` }}
    >
      <div className="project-card__media">
        {cover && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="project-card__image"
          />
        ) : (
          <div className="project-card__fallback" aria-hidden="true">
            <span>{initials || 'PR'}</span>
          </div>
        )}

        <div className="project-card__shade" aria-hidden="true" />

        {project.isFeatured && (
          <div className="project-card__badges">
            <span className="ml-auto badge badge--brand">Featured</span>
          </div>
        )}

        {project.language && (
          <span className="project-card__language">
            <span
              className="language-dot"
              style={{ backgroundColor: languageColor(project.language) }}
            />
            {project.language}
          </span>
        )}
      </div>

      <div className="project-card__body">
        <div className="flex items-start justify-between gap-3">
          <h3 className="project-card__title">{project.title}</h3>
          {project.githubUrl && (
            <a
              className="icon-btn shrink-0"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} source on GitHub`}
              title="View source on GitHub"
            >
              <GithubIcon />
            </a>
          )}
        </div>

        <p className="project-card__desc">{project.shortDescription}</p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="tag tag--muted">+{project.techStack.length - 4}</span>
            )}
          </div>
        )}

        <div className="project-card__meta">
          {(project.stars ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1.5" title="Stars">
              <StarIcon /> {formatCount(project.stars)}
            </span>
          )}
          {(project.forks ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1.5" title="Forks">
              <ForkIcon /> {formatCount(project.forks)}
            </span>
          )}
          {!isGitHub && (
            <span className="inline-flex items-center gap-1.5">✦ Curated</span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5" title="Last update">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {relativeTime(project.updatedAt)}
          </span>
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="project-card__actions">
            {project.githubUrl && (
              <a
                className="btn btn-ghost text-xs py-2 px-3 flex-1"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="w-3.5 h-3.5" /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                className="btn btn-brand text-xs py-2 px-3 flex-1"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live Demo <ExternalIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
