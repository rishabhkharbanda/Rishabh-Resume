import {
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  EducationItem,
  LanguageItem,
} from './types';

export const profileSummary =
  'Senior Marketing Analyst with 5+ years of experience driving growth across gaming, fantasy sports, e-commerce, and B2C markets. Specialises in performance marketing, lifecycle analytics, and paid media optimisation — with a track record of reducing CAC by 17%, cutting ad spend by 55% while sustaining results, and delivering 70% MoM e-commerce growth. Deep expertise in cohort analysis, attribution modeling, retention marketing, and user segmentation. Experienced across international markets (Malaysia, Australia, Papua New Guinea) and proficient in Tableau, Power BI, Python, SQL, AppsFlyer, Clevertap, and WebEngage.';

export const portfolioExperiences: ExperienceItem[] = [
  {
    company: 'Yong Yuan Casino',
    role: 'Senior Marketing Analyst',
    period: 'OCT 2025 - MAY 2026',
    location: 'Malaysia, Australia & Papua New Guinea (Remote)',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Built 8+ Tableau dashboards tracking player acquisition, retention, engagement, and revenue KPIs across multiple markets, reducing reporting time by 40%.',
      },
      {
        text: 'Analyzed player journeys and behavioral data to identify conversion opportunities, improving player registration and engagement rates by 18%.',
      },
      {
        text: 'Conducted funnel analysis across 10+ landing pages and onboarding flows, increasing player sign-ups by 25% through user experience improvements.',
      },
      {
        text: 'Performed cohort analysis and player segmentation to identify churn patterns, supporting targeted retention campaigns and personalized re-engagement strategies.',
      },
    ],
    metrics: [
      { label: 'DASHBOARDS', value: '8+', trend: 'up', subLabel: 'Built' },
      { label: 'REPORTING', value: '40%', trend: 'down', subLabel: 'Faster Reporting' },
      { label: 'ENGAGEMENT', value: '18% ↑', trend: 'up', subLabel: 'Player Registration' },
      { label: 'SIGN-UPS', value: '25% ↑', trend: 'up', subLabel: 'Onboarding CRO' },
    ],
  },
  {
    company: 'Head Digital Works (A23)',
    role: 'Senior Marketing Analyst',
    period: 'SEP 2024 - SEP 2025',
    location: 'Hyderabad, India · Gaming & Fantasy Sports',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Analyzed player behavior and segmented users by geography and value tiers (HVP/MVP), improving retention efficiency and reducing CAC by 17%.',
      },
      {
        text: 'Optimized player acquisition and retention investments, reducing monthly marketing spend by 55% while maintaining player growth and engagement targets.',
      },
      {
        text: 'Built D0–D30 player cohort analyses and personalized onboarding journeys using WebEngage and AppsFlyer, reducing new-player churn by 15%.',
      },
      {
        text: 'Conducted player and competitor analysis to identify engagement opportunities, contributing to product enhancements and retention-focused initiatives.',
      },
      {
        text: 'Executed poker acquisition events across IITs, IIMs, and Goa poker venues, driving player acquisition, community engagement, and brand loyalty.',
      },
    ],
    metrics: [
      { label: 'CAC REDUCTION', value: '17%', trend: 'down', subLabel: 'CAC Reduced' },
      { label: 'AD SPEND CUT', value: '55%', trend: 'down', subLabel: 'Cost Reduction' },
      { label: 'CHURN', value: '15% ↓', trend: 'down', subLabel: 'New-Player Churn' },
      { label: 'COHORTS', value: 'D0–D30', trend: 'up', subLabel: 'Lifecycle Analysis' },
    ],
  },
  {
    company: 'KSKT Agromart',
    role: 'Marketing Analyst',
    period: 'DEC 2023 - AUG 2024',
    location: 'Gurugram, India',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Scaled online sales by 70% MoM through data-driven campaign optimization and retention marketing.',
      },
      {
        text: 'Built KPI dashboards for sales, marketing, and operations reporting.',
      },
      {
        text: 'Increased customer retention by 80% through audience segmentation and lifecycle campaigns.',
      },
      {
        text: 'Improved AOV by 60% and ROAS by 20% through targeted marketing initiatives.',
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
    role: 'Marketing Analyst',
    period: 'FEB 2023 - NOV 2023',
    location: 'Gurugram, India · Poker Platform',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Used Tableau and Power BI to identify actionable insights, contributing to a 22% increase in customer retention.',
      },
      {
        text: 'Developed predictive models that acquired an average of 100 new customers daily.',
      },
      {
        text: 'Maintained data accuracy across reporting pipelines and dashboards.',
      },
      {
        text: 'Collaborated with cross-functional teams to support product launches, driving a 20% increase in sales.',
      },
    ],
    metrics: [
      { label: 'RETENTION', value: '22% ↑', trend: 'up', subLabel: 'Customer Retention' },
      { label: 'DAILY VOLUME', value: '100+', trend: 'up', subLabel: 'New Customers' },
      { label: 'SALES', value: '20% ↑', trend: 'up', subLabel: 'Product Launches' },
      { label: 'DATA QUALITY', value: '100%', trend: 'neutral', subLabel: 'Pipeline Accuracy' },
    ],
  },
  {
    company: 'FabHotels',
    role: 'Key Account Manager',
    period: 'APR 2022 - JAN 2023',
    location: 'Gurugram, India',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Resolved client issues, reducing escalations by 75% and complaints by 80%.',
      },
      {
        text: 'Generated MIS reports to support business tracking and decision-making.',
      },
      {
        text: 'Managed GST processing, payments, and UTR generation.',
      },
      {
        text: 'Maintained strong client relationships and ensured smooth account operations.',
      },
    ],
    metrics: [
      { label: 'ESCALATIONS', value: '75% ↓', trend: 'down', subLabel: 'Client Escalations' },
      { label: 'COMPLAINTS', value: '80% ↓', trend: 'down', subLabel: 'Complaint Reduction' },
      { label: 'MIS REPORTING', value: 'Active', trend: 'up', subLabel: 'Business Tracking' },
      { label: 'ACCOUNTS', value: 'Managed', trend: 'neutral', subLabel: 'Client Operations' },
    ],
  },
  {
    company: 'Junglee Games',
    role: 'Customer Service Executive',
    period: 'SEP 2021 - APR 2022',
    location: 'Gurugram, India',
    descriptionTitle: 'Role Highlights',
    points: [
      {
        text: 'Resolved customer queries and issues through email and live chat support.',
      },
      {
        text: 'Handled customer escalations and ensured timely issue resolution.',
      },
      {
        text: 'Verified KYC documents and supported user onboarding processes.',
      },
      {
        text: 'Maintained high customer satisfaction by providing prompt and professional assistance.',
      },
      {
        text: 'Worked closely with internal teams to improve the overall player experience.',
      },
    ],
    metrics: [
      { label: 'SUPPORT', value: 'Email', trend: 'neutral', subLabel: 'Live Chat' },
      { label: 'KYC', value: 'Verified', trend: 'up', subLabel: 'User Onboarding' },
      { label: 'ESCALATIONS', value: 'Resolved', trend: 'down', subLabel: 'Issue Resolution' },
      { label: 'CSAT', value: 'High', trend: 'up', subLabel: 'Customer Satisfaction' },
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
      'Developed an end-to-end marketing attribution and performance analytics platform to measure channel effectiveness across the customer acquisition funnel. Integrated campaign data from multiple paid media sources and built automated dashboards tracking CAC, CPL, ROAS, conversion rates, and revenue contribution by channel. Performed audience, creative, and campaign-level analysis to identify optimisation opportunities and improve budget allocation decisions, implementing attribution models to evaluate customer touchpoints and support data-driven marketing strategies.',
    achievements: [
      'Built automated dashboards for campaign performance monitoring.',
      'Developed channel-level attribution and ROI measurement frameworks.',
      'Identified acquisition optimisation opportunities through audience segmentation.',
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
      'Designed a customer lifecycle analytics framework to track user behaviour across acquisition, activation, engagement, retention, and re-engagement stages. Built cohort models covering D0, D7, D30, and D90 retention periods to analyse customer behaviour and identify churn patterns. Implemented customer segmentation models based on engagement frequency, transaction behaviour, and customer value, creating retention dashboards and performance reports that supported personalised lifecycle marketing campaigns and customer journey optimisation initiatives.',
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
      'Built a centralized marketing intelligence platform that consolidated marketing, customer, and revenue data into a unified reporting environment. Designed executive dashboards tracking acquisition performance, campaign effectiveness, customer retention, revenue growth, and key business KPIs. Automated data processing workflows and reporting pipelines to reduce manual effort and improve reporting accuracy, delivering real-time visibility into business performance for faster leadership decision-making.',
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
    tags: ['Tableau', 'Python'],
    accentClass: 'from-secondary/80 via-primary/70 to-surface-container-high',
    metricValue: 'Multi-Region',
    metricLabel: 'Sales Tracking',
    longDescription:
      'Developed a sales performance dashboard for a retail company. Used Python for data cleaning and preprocessing, then built interactive Tableau visualisations covering total sales, growth trends, top-performing products, and regional breakdowns.',
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
      'Built a customer segmentation model for an e-commerce platform using Python and clustering algorithms to segment users by purchasing behaviour and demographic data. Visualised segments in Tableau for targeted lifecycle marketing.',
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
    period: 'Passed: 2023',
    detail: 'Concentrated on business analytics and data-driven decision-making.',
  },
  {
    degree: 'Intermediate / Class XII (NIOS)',
    institution: 'M.G. Convent School, Lucknow',
    period: 'Passed: 2019',
    detail: 'Science stream foundation.',
  },
  {
    degree: 'High School / Class X (CBSE)',
    institution: 'Rasphil Academy, Lucknow',
    period: 'Passed: 2015',
    detail: 'Strong foundation in mathematics and science.',
  },
];

export const portfolioLanguages: LanguageItem[] = [
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Fluent' },
];

export const resumePdfFilename = 'Rishabh_Kharbanda.pdf';
export const resumePdfUrl = `${import.meta.env.BASE_URL}${resumePdfFilename}?v=4`;
