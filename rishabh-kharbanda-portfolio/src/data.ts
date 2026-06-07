import { ExperienceItem, ProjectItem, SkillItem, CertificationItem } from './types';

export const portfolioExperiences: ExperienceItem[] = [
  {
    company: 'Head Digital Works',
    role: 'Senior Marketing Analyst',
    period: 'SEPT 2024 - PRESENT',
    descriptionTitle: 'Key Strategic Initiatives',
    points: [
      'Strategically optimized marketing channels via hyper-local geo-segmentation, drastically increasing ROAS across Tier 1 markets.',
      'Engineered a reduction in monthly operational budget from ₹4Cr to ₹1.8Cr while maintaining peak acquisition rates.',
      'Implemented targeted automated onboarding journeys via WebEngage, resulting in a 15% reduction in early-stage churn.'
    ],
    metrics: [
      { label: 'CAC REDUCTION', value: '17%', trend: 'down', subLabel: 'CAC Reduced' },
      { label: 'BUDGET EFFICIENCY', value: '₹2.2Cr', trend: 'down', subLabel: 'Saved Monthly' },
      { label: 'CHURN', value: '15% ↓', trend: 'down', subLabel: 'Churn Reduced' },
      { label: 'OPTIMIZED BUDGET', value: '₹1.8Cr', trend: 'down', subLabel: 'Monthly Budget' }
    ]
  },
  {
    company: 'KSKT Agromart',
    role: 'Data Analyst',
    period: 'DEC 2023 - AUG 2024',
    descriptionTitle: 'Growth & Analytics',
    points: [
      'Architected 3 comprehensive KPI dashboards for real-time monitoring of supply chain and sales performance.',
      'Developed churn prediction models that successfully identified at-risk segments with 85% accuracy.',
      'Enhanced the customer analytics framework, leading to a 60% increase in Average Order Value (AOV) via personalized cross-selling.'
    ],
    metrics: [
      { label: 'SALES GROWTH', value: '70%', trend: 'up', subLabel: 'Sales Growth' },
      { label: 'RETENTION', value: '80%', trend: 'neutral', subLabel: 'User Base' },
      { label: 'AOV INCREASE', value: '60% ↑', trend: 'up', subLabel: 'AOV Growth' },
      { label: 'DASHBOARDS', value: '3', trend: 'neutral', subLabel: 'Built' }
    ]
  },
  {
    company: 'DaddyTech',
    role: 'Data Analyst',
    period: 'FEB 2023 - NOV 2023',
    descriptionTitle: 'Business Intelligence',
    points: [
      'Built a custom predictive analytics engine that automated lead scoring and scaled customer acquisition 100x.',
      'Optimized top-of-funnel acquisition strategies, resulting in 30% quarterly revenue growth.',
      'Improved user retention by 22% through detailed cohort analysis and feature adoption tracking.'
    ],
    metrics: [
      { label: 'REVENUE GROWTH', value: '30%', trend: 'up', subLabel: 'Revenue Growth' },
      { label: 'DAILY VOLUME', value: '100+', trend: 'up', subLabel: 'New Customers' }
    ]
  }
];

export const portfolioProjects: ProjectItem[] = [
  {
    id: 'perf-marketing',
    title: 'Performance Marketing Revolution',
    description: 'Geo-segmentation strategy that revolutionized campaign efficiency and budget allocation.',
    tags: ['Geo Segmentation', 'CAC Optimization'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE-0EoQIvw-Clvv4exGUOlpiDWqL-eA0vl2xYKPmQKruYQ0sdXRTEG5xPbdqGor1qxI8z5EH1OXbBzaIJLKJUmQVEjt2OuLmW5i7hh8blw3ymuHzgXbAwdGN0B2ULFUm_jM8rxJnfztWoRBZp8AW-2ZtiYp3FuycE-CzqDjxdQOIkaGc3bC2hZYsvnhB6dHlI2t1Op9YI1Z9z_EtN6EnJUyQUaYUo0OaSHCoOfMDtsvgwabEi-z2iKCwSR3CQzVvI6LoDKFEjw9jjg',
    metricValue: '₹2.2Cr',
    metricLabel: 'Cost Saved',
    longDescription: 'Developed a robust hyper-local targeting model utilizing cohort performance indexing across key Indian municipalities for digital tournament acquisition. Built customizable alert grids that automated bidding adjusters instantly when region-specific CPA limits were breached, creating sustained operational margins and improving return on ad spend.'
  },
  {
    id: 'user-behavior',
    title: 'User Behavior Intelligence',
    description: 'Advanced analysis identifying churn patterns and implementing targeted user journeys.',
    tags: ['Churn Analysis', 'WebEngage'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPX_FpLloml4t6EAfX_qFlku9p_zGzy5JPc5-Mr444LiOwbH8QG9gJVlGkTR-12kPfOOKIFmuQos4BIh1vY6TBS5RGgIE_yPfHub_V0UrtLQujGDl0Bur2BdEPbZlEsCfMG5rQKQ6yLs1j1AK21VTod95kkruV1GXdFETfC_8x98yg06cVrN_v9p6F0_9nFbvL76R9IYp4UVshrJ9PNGk-D1GJlgSdhYRxHAPlF6D59KK9GUZzVjDh8g949gUUz7p3E5B7xMY3uxaj',
    metricValue: '15% ↓',
    metricLabel: 'Churn Reduced',
    longDescription: 'Created a predictive retention index based on historical user cohort pathways inside WebEngage. By mapping active gameplay, session intervals, and localized notification thresholds, we executed real-time reactive trigger paths that brought churn indicators down by a stable absolute 15% mark within the first month.'
  },
  {
    id: 'ecommerce-growth',
    title: 'E-commerce Growth Engine',
    description: 'Comprehensive strategy that skyrocketed online sales by 70% MoM for KSKT Agromart.',
    tags: ['Growth Strategy', 'Retention'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxB_5iAI8DahKYG2v23N2IG6zf2UquBlffrQAaWZZaAZ7TcACc8bALrJnnNNB75fCEZcGR_d8Gc0NKw_wxrEJMK-uA0KYKFeBnb5PbibVB4c5RKyzk6719gwyiVydGfi1nCTZXm066iEzl0AJT8tKcn-NxyD0r4u_QiOm7nBXtsHIxVbPmS1qyl4ijNYGIYUeZbqZ0KcpvQ2g3xs0f5NadCf-Kxr8nGVOEiTxCjj-yhPO8ZbscZTmGWdZxk7QfgoevUjvDgAb_NNf1',
    metricValue: '70% ↑',
    metricLabel: 'Sales Growth',
    longDescription: 'Supercharged the rural agromart user journey. Designed real-time inventory-demand predictive models that dynamically matched seasonal regional requests and personalized discount recommendations across SMS and regional app interfaces. This unified CRM approach drove month-on-month sales spikes of 70% and heightened customer life-time values.'
  }
];

export const portfolioSkills: SkillItem[] = [
  { name: 'Tableau', icon: 'BarChart3', category: 'tool' },
  { name: 'Power BI', icon: 'LineChart', category: 'tool' },
  { name: 'Python', icon: 'Terminal', category: 'tool' },
  { name: 'SQL', icon: 'Database', category: 'tool' },
  { name: 'Excel', icon: 'Table', category: 'tool' },
  { name: 'Snowflake', icon: 'Cloud', category: 'tool' }
];

export const portfolioCertifications: CertificationItem[] = [
  { title: 'Google Digital Marketing', issuer: 'Certified Professional' },
  { title: 'Python Developer', issuer: 'Udemy Specialization' }
];
