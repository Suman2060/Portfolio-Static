export interface Project {
  id: number | string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImageUrl?: string;
  isFeatured?: boolean;
  source?: string;
  language?: string;
  topics?: string[];
  stars?: number;
  forks?: number;
  watchers?: number;
  openIssues?: number;
  updatedAt?: string;
  createdAt?: string;
  homepage?: string;
}

