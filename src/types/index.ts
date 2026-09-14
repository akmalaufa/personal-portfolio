export interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  highlights: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string[];
}

export interface Organization {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface PortfolioData {
  profile: Profile;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  organization: Organization[];
}
