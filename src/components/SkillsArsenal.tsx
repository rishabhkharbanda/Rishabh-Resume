import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  LineChart,
  Terminal,
  Database,
  Table,
  Cloud,
  CheckCircle,
  Award,
  Activity,
  Workflow,
  Zap,
  Palette,
  Globe,
  TrendingUp,
  GraduationCap,
  Languages,
} from 'lucide-react';
import {
  portfolioSkills,
  portfolioCertifications,
  portfolioEducation,
  portfolioLanguages,
} from '../data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  LineChart,
  Terminal,
  Database,
  Table,
  Cloud,
  Activity,
  Workflow,
  Zap,
  Palette,
  Globe,
  TrendingUp,
};

export default function SkillsArsenal() {
  const tools = portfolioSkills.map((skill) => ({
    name: skill.name,
    icon: iconMap[skill.icon] ?? BarChart3,
    exp: 'Professional',
    desc: `Applied across performance marketing, analytics, and growth projects.`,
  }));

  const competencies = [
    {
      name: 'Performance Marketing',
      value: 95,
      detail: 'Paid media optimisation, channel strategy, and creative testing across gaming, fantasy sports, and e-commerce.',
    },
    {
      name: 'Lifecycle Marketing',
      value: 93,
      detail: 'Cohort analysis, retention windows, onboarding journeys, and personalised re-engagement flows via WebEngage and Clevertap.',
    },
    {
      name: 'Attribution Modeling',
      value: 92,
      detail: 'AppsFlyer MMP tracking, paid media attribution, and CPL optimisation across multi-channel campaigns.',
    },
    {
      name: 'Cohort Analysis',
      value: 94,
      detail: 'D0–D30 behaviour mapping, churn pattern identification, and retention marketing strategy.',
    },
    {
      name: 'Funnel Optimisation',
      value: 91,
      detail: 'Landing page redesign, user journey analysis, and conversion rate improvements across international campaigns.',
    },
    {
      name: 'User Segmentation',
      value: 90,
      detail: 'Clustering, demographic and behavioural segmentation, and targeted lifecycle campaigns.',
    },
    {
      name: 'CAC/ROAS Analysis',
      value: 94,
      detail: 'Acquisition cost reduction, budget reallocation, and return on ad spend optimisation.',
    },
    {
      name: 'LTV Modelling',
      value: 89,
      detail: 'Python-driven LTV analysis, cohort modelling, and player value tier strategy (HVP, MVP).',
    },
    {
      name: 'A/B Testing',
      value: 88,
      detail: 'Structured experimentation on creatives, landing pages, and audience segments.',
    },
    {
      name: 'Dashboard Design',
      value: 93,
      detail: 'Tableau and Power BI dashboards tracking CAC, ROI, ROAS, and KPIs across multi-market operations.',
    },
    {
      name: 'Competitor Research',
      value: 91,
      detail: 'Benchmarking, feature-gap analysis, and market research to inform product roadmap decisions.',
    },
  ];

  const aiTools = [
    'ChatGPT (GPT-4)',
    'Claude',
    'Gemini',
    'Perplexity AI',
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <div
              key={idx}
              className="relative group/tooltip liquid-glass p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:scale-[1.03] hover:bg-surface/75 transition-all duration-300 rounded-3xl cursor-help"
            >
              <Icon className="w-9 h-9 text-on-surface-variant group-hover/tooltip:text-primary group-hover/tooltip:scale-110 transition-all duration-350" />
              <span className="font-mono text-xs font-bold leading-none tracking-wide text-center text-on-surface">
                {tool.name}
              </span>

              <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 w-56 p-4 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-300 pointer-events-none z-50 text-center text-xs backdrop-blur-xl">
                <div className="font-mono text-[9px] text-primary font-extrabold uppercase tracking-wider mb-1">
                  {tool.exp}
                </div>
                <p className="text-on-surface text-[11px] leading-snug font-sans font-medium">{tool.desc}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h3 className="font-headline text-2xl font-bold mb-8">Core Competencies</h3>
          <div className="space-y-6">
            {competencies.map((comp, idx) => (
              <div key={idx} className="relative group/tooltip cursor-help">
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider font-extrabold text-on-surface-variant">
                    {comp.name}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary">{comp.value}%</span>
                </div>
                <div className="h-3.5 bg-outline-variant/20 rounded-full overflow-hidden backdrop-blur-md relative border border-outline-variant/15 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${comp.value}%` }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                    className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary rounded-full relative shadow-[0_1px_4px_rgba(76,104,63,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: 'linear' }}
                      className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform skew-x-12"
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/90 shadow-md animate-pulse shrink-0" />
                  </motion.div>
                </div>

                <div className="absolute bottom-[108%] left-4 lg:left-1/2 lg:-translate-x-1/2 w-64 p-4 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-300 pointer-events-none z-50 text-left text-xs backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-extrabold uppercase tracking-wider mb-1">
                    Specialization Detail
                  </div>
                  <p className="text-on-surface text-[11px] leading-relaxed font-sans font-medium">{comp.detail}</p>
                  <div className="absolute top-full left-6 lg:left-1/2 lg:-translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
            ))}
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-outline-variant/40">
            <h3 className="font-headline text-xl font-bold mb-4">AI Tools</h3>
            <div className="flex flex-wrap gap-2">
              {aiTools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-full bg-primary-container/20 border border-primary/20 font-mono text-[10px] text-primary font-bold uppercase tracking-wide"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
              Used for campaign copy, data summarisation, insight generation, automation prompts, and creative production.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="liquid-glass-active p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-350">
              <Award className="w-32 h-32 text-primary" strokeWidth={1} />
            </div>

            <h3 className="font-headline text-2xl font-bold mb-8">Certifications</h3>

            <div className="space-y-6">
              {portfolioCertifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="font-headline text-lg font-bold text-on-surface leading-tight">{cert.title}</p>
                    <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider mt-1 font-extrabold">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-glass p-10 rounded-3xl border border-outline-variant/40">
            <h3 className="font-headline text-2xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              {portfolioEducation.map((item, idx) => (
                <div key={idx} className="border-l-2 border-primary/30 pl-4">
                  <p className="font-headline text-base font-bold text-on-surface">{item.degree}</p>
                  <p className="font-mono text-[11px] text-primary font-bold mt-1">{item.institution}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">{item.period}</p>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-outline-variant/40">
            <h3 className="font-headline text-xl font-bold mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {portfolioLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className="px-4 py-2 rounded-2xl bg-surface-container-high/50 border border-outline-variant/30"
                >
                  <span className="font-headline font-bold text-on-surface">{lang.name}</span>
                  <span className="font-mono text-[10px] text-on-surface-variant ml-2 uppercase">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
