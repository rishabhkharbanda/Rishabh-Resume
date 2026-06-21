import {
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  EducationItem,
  LanguageItem,
} from './types';

export const profileSummary =
  'Senior Marketing Analyst with 5+ years of experience driving growth across gaming, fantasy sports, e-commerce, and B2C markets. Specialises in performance marketing, lifecycle analytics, and paid media optimisation — with a track record of reducing CAC by 17%, cutting ad spend by 55% while sustaining results, and delivering 70% MoM e-commerce growth. Deep expertise in cohort analysis, attribution modeling, retention marketing, and user segmentation. Experienced across international markets (Malaysia, Australia, Papua New Guinea) and experienced in Tableau, Power BI, Python, SQL, AppsFlyer, Clevertap, and WebEngage. Leverages AI tools daily for faster insight generation, campaign ideation, and data summarisation.';

export const portfolioExperiences: ExperienceItem[] = [
  {
    company: 'Yong Yuan Casino',
    role: 'Senior Marketing Analyst',
    period: 'OCT 2025 - MAY 2026',
    location: 'Malaysia, Australia & Papua New Guinea',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Built 8+ Tableau dashboards tracking CAC, ROI, ROAS, and paid media KPIs across three markets (Malaysia, Australia, Papua New Guinea), reducing reporting turnaround by 40%.',
      },
      {
        text: 'Optimised bidding strategies, audience segmentation, and ad creatives across paid media channels, lifting conversion rates by 18% and lowering Cost per Lead (CPL) through attribution modeling.',
      },
      {
        text: 'Redesigned 10+ landing pages through user journey analysis and UX improvements, cutting funnel drop-offs and increasing campaign sign-ups by 25%.',
      },
      {
        text: 'Drove lifecycle marketing strategy using cohort analysis and user segmentation to identify retention windows and build personalised re-engagement flows.',
      },
      {
        text: 'Designed wireframes and UX flows in Figma for 3+ government digital platforms, collaborating closely with developers to deliver accessible, user-centric experiences.',
      },
    ],
    metrics: [
      { label: 'DASHBOARDS', value: '8+', trend: 'up', subLabel: 'Built' },
      { label: 'REPORTING', value: '40%', trend: 'down', subLabel: 'Faster Turnaround' },
      { label: 'CONVERSIONS', value: '18% ↑', trend: 'up', subLabel: 'Rate Increase' },
      { label: 'SIGN-UPS', value: '25% ↑', trend: 'up', subLabel: 'Landing Page CRO' },
    ],
  },
  {
    company: 'Head Digital Works',
    role: 'Senior Marketing Analyst',
    period: 'SEP 2024 - SEP 2025',
    location: 'Hyderabad, India · Gaming & Fantasy Sports',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Optimised performance marketing across channels using geo-segmentation and player value tiers (HVP, MVP), reducing CAC by 17% through strategic paid media reallocation and creative testing.',
      },
      {
        text: 'Restructured performance strategy and budget allocation, delivering stronger results on ₹1.8 Cr/month vs a prior spend of ₹4 Cr — a 55% cost reduction with no drop in outcomes.',
      },
      {
        text: 'Conducted D0–D30 cohort analysis to map churn patterns; deployed targeted onboarding journeys via WebEngage with AppsFlyer MMP tracking, reducing new user churn by 15%.',
      },
      {
        text: 'Ran detailed competitor benchmarking and market research, identifying product feature gaps that directly informed roadmap decisions and expanded share of market (SOM).',
      },
      {
        text: 'Executed offline acquisition events (poker tournaments at IITs, IIMs, and Goa casinos), generating early-stage user loyalty and brand recognition in a competitive market.',
      },
    ],
    metrics: [
      { label: 'CAC REDUCTION', value: '17%', trend: 'down', subLabel: 'CAC Reduced' },
      { label: 'AD SPEND CUT', value: '55%', trend: 'down', subLabel: 'Cost Reduction' },
      { label: 'CHURN', value: '15% ↓', trend: 'down', subLabel: 'Churn Reduced' },
      { label: 'OPTIMIZED BUDGET', value: '₹1.8Cr', trend: 'down', subLabel: 'Monthly Budget' },
    ],
  },
  {
    company: 'KSKT Agromart',
    role: 'Data Analyst',
    period: 'DEC 2023 - AUG 2024',
    location: 'Gurugram, India',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Led e-commerce growth strategy, scaling online sales by 70% MoM through data-driven campaign optimisation, paid media targeting, and retention marketing initiatives.',
      },
      {
        text: 'Designed and deployed 3 KPI dashboards covering sales, marketing, and operations, enabling faster, evidence-based decision-making.',
      },
      {
        text: 'Grew customer retention by 80% via deep user segmentation, personalised lifecycle campaigns, and post-purchase re-engagement flows.',
      },
      {
        text: 'Raised Average Order Value (AOV) by 60% and improved ROAS by 20% through optimised marketing programs; used Python for data cleaning, cohort analysis, and LTV modelling.',
      },
    ],
    metrics: [
      { label: 'SALES GROWTH', value: '70%', trend: 'up', subLabel: 'MoM Growth' },
      { label: 'RETENTION', value: '80%', trend: 'up', subLabel: 'Customer Retention' },
      { label: 'AOV INCREASE', value: '60% ↑', trend: 'up', subLabel: 'AOV Growth' },
      { label: 'ROAS', value: '20% ↑', trend: 'up', subLabel: 'Return on Ad Spend' },
    ],
  },
  {
    company: 'DaddyTech',
    role: 'Data Analyst',
    period: 'SEP 2022 - NOV 2023',
    location: 'Gurugram, India',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Used Tableau and Power BI to surface actionable trends from large datasets, contributing to a 22% increase in customer retention and 30% quarterly revenue growth.',
      },
      {
        text: 'Developed and deployed predictive statistical models that drove an average of 100 net-new customers per day.',
      },
      {
        text: 'Maintained 100% data integrity across pipelines; led cross-functional product launch coordination resulting in 20% sales uplift and 15% faster project delivery.',
      },
    ],
    metrics: [
      { label: 'REVENUE GROWTH', value: '30%', trend: 'up', subLabel: 'Quarterly Revenue' },
      { label: 'DAILY VOLUME', value: '100+', trend: 'up', subLabel: 'Net-New Customers' },
      { label: 'RETENTION', value: '22% ↑', trend: 'up', subLabel: 'Customer Retention' },
      { label: 'DATA INTEGRITY', value: '100%', trend: 'neutral', subLabel: 'Pipeline Accuracy' },
    ],
  },
  {
    company: 'FabHotels',
    role: 'Key Account Manager',
    period: 'APR 2021 - AUG 2022',
    location: 'Gurugram, India',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Proactively resolved client issues, reducing escalations by 75% and complaints by 80% as single point of contact.',
      },
      {
        text: 'Generated MIS reports to support efficient tracking, improving decision-making processes by 25%.',
      },
      {
        text: 'Handled GST management, payments, and UTR generation; reported 200% financial growth in managed accounts.',
      },
    ],
    metrics: [
      { label: 'ESCALATIONS', value: '75% ↓', trend: 'down', subLabel: 'Client Escalations' },
      { label: 'COMPLAINTS', value: '80% ↓', trend: 'down', subLabel: 'Complaint Reduction' },
      { label: 'DECISION SPEED', value: '25% ↑', trend: 'up', subLabel: 'MIS Reporting' },
      { label: 'FINANCIAL GROWTH', value: '200%', trend: 'up', subLabel: 'Managed Accounts' },
    ],
  },
];

export const portfolioProjects: ProjectItem[] = [
  {
    id: 'marketing-attribution',
    title: 'Marketing Attribution & Performance Optimization Platform',
    category: 'Attribution & Paid Media',
    description:
      'End-to-end attribution platform measuring channel effectiveness across the acquisition funnel with automated CAC, CPL, ROAS, and revenue reporting.',
    tags: ['SQL', 'Python', 'Tableau', 'AppsFlyer'],
    accentClass: 'from-primary/90 via-secondary/80 to-tertiary/70',
    metricValue: 'Multi-Channel',
    metricLabel: 'Attribution Coverage',
    longDescription:
      'Developed an end-to-end marketing attribution and performance analytics platform to measure channel effectiveness across the customer acquisition funnel. Integrated campaign data from multiple paid media sources and built automated dashboards tracking CAC, CPL, ROAS, conversion rates, and revenue contribution by channel. Performed audience, creative, and campaign-level analysis to identify optimization opportunities and improve budget allocation decisions. Implemented attribution models to evaluate customer touchpoints and support data-driven marketing strategies.',
    achievements: [
      'Built automated dashboards for campaign performance monitoring.',
      'Developed channel-level attribution and ROI measurement frameworks.',
      'Identified acquisition optimization opportunities through audience segmentation.',
      'Delivered actionable insights for budget allocation and marketing efficiency improvements.',
    ],
  },
  {
    id: 'lifecycle-retention',
    title: 'Customer Lifecycle & Retention Analytics Framework',
    category: 'Lifecycle & Retention',
    description:
      'Lifecycle analytics framework tracking acquisition through re-engagement with D0–D90 cohort models, segmentation, and churn analysis.',
    tags: ['Python', 'SQL', 'Tableau', 'WebEngage'],
    accentClass: 'from-data-growth/90 via-primary/75 to-secondary/65',
    metricValue: 'D0–D90',
    metricLabel: 'Cohort Retention',
    longDescription:
      'Designed a customer lifecycle analytics framework to track user behavior across acquisition, activation, engagement, retention, and re-engagement stages. Built cohort models covering D0, D7, D30, and D90 retention periods to analyze customer behavior and identify churn patterns. Implemented customer segmentation models based on engagement frequency, transaction behavior, and customer value. Created retention dashboards and performance reports that supported personalized lifecycle marketing campaigns and customer journey optimization initiatives.',
    achievements: [
      'Developed retention and churn analysis models using cohort methodologies.',
      'Built customer segmentation frameworks for targeted marketing campaigns.',
      'Created executive dashboards for lifecycle performance tracking.',
      'Generated actionable insights to improve customer engagement and retention.',
    ],
  },
  {
    id: 'marketing-intelligence',
    title: 'Marketing Intelligence & Executive Reporting Platform',
    category: 'Executive Reporting',
    description:
      'Centralized marketing intelligence hub consolidating acquisition, retention, and revenue KPIs into automated executive dashboards.',
    tags: ['Tableau', 'Power BI', 'SQL', 'Python'],
    accentClass: 'from-tertiary/85 via-primary/70 to-secondary/60',
    metricValue: 'Unified KPI',
    metricLabel: 'Reporting Hub',
    longDescription:
      'Built a centralized marketing intelligence platform that consolidated marketing, customer, and revenue data into a unified reporting environment. Designed executive dashboards tracking acquisition performance, campaign effectiveness, customer retention, revenue growth, and key business KPIs. Automated data processing workflows and reporting pipelines to reduce manual effort and improve reporting accuracy. Delivered real-time visibility into business performance, enabling leadership teams to make faster and more informed decisions.',
    achievements: [
      'Automated marketing and business KPI reporting processes.',
      'Built executive dashboards for acquisition, retention, and revenue monitoring.',
      'Integrated multiple data sources into a centralized reporting framework.',
      'Reduced manual reporting effort through automated data workflows and dashboard refreshes.',
    ],
  },
  {
    id: 'sales-dashboard',
    title: 'Sales Performance Dashboard',
    category: 'Retail Analytics',
    description:
      'Retail sales analytics pipeline with Python preprocessing and interactive Tableau views for regional and product performance.',
    tags: ['Tableau', 'Python', 'SQL'],
    accentClass: 'from-secondary/80 via-primary/70 to-surface-container-high',
    metricValue: 'Multi-Region',
    metricLabel: 'Sales Tracking',
    longDescription:
      'Developed a sales performance dashboard for a retail company. Used Python for data cleaning and preprocessing, then built interactive Tableau visualisations covering total sales, growth trends, top-performing products, and regional breakdowns — enabling stakeholders to improve sales strategies.',
    achievements: [
      'Automated data cleaning and preprocessing with Python pipelines.',
      'Built interactive Tableau views for sales trends and regional breakdowns.',
      'Enabled faster stakeholder decisions with self-serve performance reporting.',
    ],
  },
  {
    id: 'customer-segmentation',
    title: 'Customer Segmentation Analysis',
    category: 'Segmentation & CRM',
    description:
      'Clustering-based segmentation model for e-commerce lifecycle marketing and personalised customer experiences.',
    tags: ['Python', 'Excel', 'Tableau'],
    accentClass: 'from-primary/75 via-tertiary/65 to-secondary/55',
    metricValue: 'Behavioral',
    metricLabel: 'Segment Models',
    longDescription:
      'Built a customer segmentation model for an e-commerce platform using Python and clustering algorithms to segment users by purchasing behaviour and demographic data. Visualised segments in Tableau, providing actionable insights for targeted lifecycle marketing and personalised customer experiences.',
    achievements: [
      'Segmented users by purchase behaviour and demographic attributes.',
      'Visualised cohorts in Tableau for marketing and CRM teams.',
      'Delivered targeting insights for lifecycle campaigns and personalisation.',
    ],
  },
];

export const portfolioSkills: SkillItem[] = [
  { name: 'Tableau', icon: 'BarChart3', category: 'tool' },
  { name: 'Power BI', icon: 'LineChart', category: 'tool' },
  { name: 'Python', icon: 'Terminal', category: 'tool' },
  { name: 'SQL', icon: 'Database', category: 'tool' },
  { name: 'AppsFlyer', icon: 'Activity', category: 'tool' },
  { name: 'WebEngage', icon: 'Workflow', category: 'tool' },
  { name: 'Clevertap', icon: 'Zap', category: 'tool' },
  { name: 'Figma', icon: 'Palette', category: 'tool' },
  { name: 'Snowflake', icon: 'Cloud', category: 'tool' },
  { name: 'Google Analytics', icon: 'Globe', category: 'tool' },
  { name: 'Excel', icon: 'Table', category: 'tool' },
  { name: 'Plotline', icon: 'TrendingUp', category: 'tool' },
];

export const portfolioCertifications: CertificationItem[] = [
  { title: 'Google Digital Marketing Certification', issuer: 'Google' },
  { title: 'Udemy Python Developer Certification', issuer: 'Udemy' },
];

export const portfolioEducation: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'North East Frontier Technical University (NEFTU)',
    period: '2019 - 2023',
    detail: 'Concentrated on business analytics and data-driven decision-making.',
  },
  {
    degree: 'Higher Secondary Certificate (Science)',
    institution: 'M.G. Convent School, Lucknow',
    period: '2017 - 2019',
    detail: 'Strong foundation in mathematics and science.',
  },
];

export const portfolioLanguages: LanguageItem[] = [
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Fluent' },
];

export const resumePdfFilename = 'Rishabh_Kharbanda.pdf';
export const resumePdfUrl = `${import.meta.env.BASE_URL}${resumePdfFilename}?v=3`;
