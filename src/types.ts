export interface Metric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  subLabel?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  descriptionTitle?: string;
  points: string[];
  metrics: Metric[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imgUrl: string;
  metricValue: string;
  metricLabel: string;
  longDescription?: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  category: 'tool' | 'competency';
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export type ViewTab = 'portfolio' | 'experience' | 'skills' | 'contact' | 'sent-success';
