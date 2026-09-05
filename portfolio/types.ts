export type PortfolioTheme = 'recruiter' | 'viewer';

export interface Project {
  id: number;
  title: string;
  category: 'Full Stack' | 'Security & Systems' | 'AI & ML';
  tagline: string;
  description: string;
  problemSolved: string;
  myRole: string;
  metrics?: string;
  keyFeatures: string[];
  tags: string[];
  image: string;
  link: string;
}

export interface Experience {
  id: number;
  role: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}