import {
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  EducationItem,
  LanguageItem,
} from './types';

export const profileSummary =
  'Results-driven Senior Marketing Analyst with 5+ years of experience across gaming, e-commerce, and B2C growth — specialising in performance marketing, funnel optimization, and life-cycle analytics. Proven track record of reducing CAC by 17%, cutting ad spend by 55% while maintaining outcomes, and driving 70% MoM e-commerce growth.';

export const portfolioExperiences: ExperienceItem[] = [
  {
    company: 'Yong Yung Casino',
    role: 'Freelance Marketing Analyst',
    period: 'OCT 2025 - MAY 2026',
    location: 'Malaysia, Australia & Papua New Guinea',
    descriptionTitle: 'International Growth & Analytics',
    points: [
      'Developed 8+ Tableau dashboards to monitor CAC, ROI, ROAS, and campaign performance across Malaysia, Australia, and Papua New Guinea — improving reporting efficiency and reducing turnaround time by 40%.',
      'Analysed paid media performance across multiple channels and international markets, optimizing bidding strategies, audience targeting, and creatives to increase conversion rates by 18% and reduce Cost per Lead (CPL).',
      'Redesigned and optimised 10+ landing pages through user journey analysis and UX enhancements, reducing funnel drop-offs and increasing campaign sign-ups by 25%.',
      'Designed wireframes and user interfaces in Figma for 3+ government websites, collaborating with developers and stakeholders to deliver user-centric, accessible digital experiences.',
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
    descriptionTitle: 'Key Strategic Initiatives',
    points: [
      'Strategically optimized marketing channels based on geo-segmentation and player value tiers (HVP, MVP), resulting in a 17% reduction in CAC.',
      'Revamped the performance strategy to achieve better results with a reduced monthly budget of ₹1.8 Cr, compared to the earlier spend of ₹4 Cr.',
      'Leveraged D0–D30 user behavior analysis to identify churn patterns and implemented targeted onboarding journeys via WebEngage, resulting in a 15% decrease in new user churn.',
      'Led detailed competitor benchmarking and identified feature gaps, enabling product enhancements that expanded the company’s SOM.',
      'Led high-impact poker tournaments across Goa casinos and premier institutes (IITs & IIMs), fostering early-stage user loyalty and accelerating brand recognition.',
    ],
    metrics: [
      { label: 'CAC REDUCTION', value: '17%', trend: 'down', subLabel: 'CAC Reduced' },
      { label: 'BUDGET EFFICIENCY', value: '₹2.2Cr', trend: 'down', subLabel: 'Saved Monthly' },
      { label: 'CHURN', value: '15% ↓', trend: 'down', subLabel: 'Churn Reduced' },
      { label: 'OPTIMIZED BUDGET', value: '₹1.8Cr', trend: 'down', subLabel: 'Monthly Budget' },
    ],
  },
  {
    company: 'KSKT Agromart',
    role: 'Data Analyst',
    period: 'DEC 2023 - AUG 2024',
    location: 'Gurugram, India',
    descriptionTitle: 'Growth & Analytics',
    points: [
      'Spearheaded e-commerce strategy, increasing online sales by 70% MoM.',
      'Designed and implemented 3 dashboards for key performance metrics (KPIs), enabling data-driven decision-making.',
      'Increased customer retention by 80% through deep customer understanding and targeted initiatives.',
      'Crafted and optimized marketing programs, raising AOV (Average Order Value) by 60% and improved ROAS by 20%.',
      'Utilized Python for data cleaning and analysis.',
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
    descriptionTitle: 'Business Intelligence',
    points: [
      'Executed in-depth data analysis with Tableau and Power BI, unveiling key trends that led to a 22% increase in customer retention and a 30% boost in quarterly revenue.',
      'Developed and deployed statistical models and predictive analyses which resulted in 100 new customers on average daily.',
      'Maintained 100% data accuracy, consistency, and security.',
      'Coordinated with IT, business development, marketing, and operations teams to launch a new product line, resulting in a 20% increase in sales and a 15% reduction in project turnaround time.',
      'Delivered presentations with clarity and coherence, achieving a 95% satisfaction rate from stakeholders.',
    ],
    metrics: [
      { label: 'REVENUE GROWTH', value: '30%', trend: 'up', subLabel: 'Quarterly Revenue' },
      { label: 'DAILY VOLUME', value: '100+', trend: 'up', subLabel: 'New Customers' },
      { label: 'RETENTION', value: '22% ↑', trend: 'up', subLabel: 'Customer Retention' },
      { label: 'DATA ACCURACY', value: '100%', trend: 'neutral', subLabel: 'Integrity' },
    ],
  },
  {
    company: 'FabHotels',
    role: 'Key Account Manager',
    period: 'APR 2021 - AUG 2022',
    location: 'Gurugram, India',
    descriptionTitle: 'Account & Operations',
    points: [
      'Proactively resolved issues, leading to a 75% reduction in client escalations.',
      'Streamlined operations as the single point of contact and reduced complaints by 80% by resolving client issues.',
      'Actively participated in team meetings and brainstorming sessions, leading to innovative solutions and a 25% increase in productivity.',
      'Handled GST management, payments, and UTR generation and reported a growth of 200%.',
      'Generated MIS reports to facilitate efficient tracking and monitoring, improving decision-making processes by 25%.',
    ],
    metrics: [
      { label: 'ESCALATIONS', value: '75% ↓', trend: 'down', subLabel: 'Client Escalations' },
      { label: 'COMPLAINTS', value: '80% ↓', trend: 'down', subLabel: 'Complaint Reduction' },
      { label: 'PRODUCTIVITY', value: '25% ↑', trend: 'up', subLabel: 'Team Productivity' },
      { label: 'FINANCIAL GROWTH', value: '200%', trend: 'up', subLabel: 'GST & Payments' },
    ],
  },
];

export const portfolioProjects: ProjectItem[] = [
  {
    id: 'sales-dashboard',
    title: 'Sales Performance Dashboard',
    description: 'Interactive retail sales dashboard with Python data pipeline and Tableau visualizations.',
    tags: ['Tableau', 'Python', 'Retail Analytics'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE-0EoQIvw-Clvv4exGUOlpiDWqL-eA0vl2xYKPmQKruYQ0sdXRTEG5xPbdqGor1qxI8z5EH1OXbBzaIJLKJUmQVEjt2OuLmW5i7hh8blw3ymuHzgXbAwdGN0B2ULFUm_jM8rxJnfztWoRBZp8AW-2ZtiYp3FuycE-CzqDjxdQOIkaGc3bC2hZYsvnhB6dHlI2t1Op9YI1Z9z_EtN6EnJUyQUaYUo0OaSHCoOfMDtsvgwabEi-z2iKCwSR3CQzVvI6LoDKFEjw9jjg',
    metricValue: 'Multi-Region',
    metricLabel: 'Sales Tracking',
    longDescription:
      'Developed a sales performance dashboard for a retail company. Used Python to clean and pre-process sales data, then created interactive visualizations in Tableau. The dashboard included key metrics like total sales, sales growth, top-performing products, and sales by region — enabling stakeholders to track and analyze sales performance and improve sales strategies.',
  },
  {
    id: 'customer-segmentation',
    title: 'Customer Segmentation Analysis',
    description: 'ML-driven customer clustering for targeted marketing and personalized experiences.',
    tags: ['Excel', 'Tableau', 'Clustering'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPX_FpLloml4t6EAfX_qFlku9p_zGzy5JPc5-Mr444LiOwbH8QG9gJVlGkTR-12kPfOOKIFmuQos4BIh1vY6TBS5RGgIE_yPfHub_V0UrtLQujGDl0Bur2BdEPbZlEsCfMG5rQKQ6yLs1j1AK21VTod95kkruV1GXdFETfC_8x98yg06cVrN_v9p6F0_9nFbvL76R9IYp4UVshrJ9PNGk-D1GJlgSdhYRxHAPlF6D59KK9GUZzVjDh8g949gUUz7p3E5B7xMY3uxaj',
    metricValue: 'Cohort',
    metricLabel: 'Segments Built',
    longDescription:
      'Established a customer segmentation project for an e-commerce platform using Python for data analysis and machine learning. Applied clustering algorithms to segment customers based on purchasing behavior and demographic data. Visualized the segments in Tableau, highlighting key characteristics of each segment — providing insights for targeted marketing strategies and personalized customer experiences.',
  },
  {
    id: 'international-campaigns',
    title: 'International Campaign Analytics',
    description: 'Multi-market performance dashboards and CRO for Malaysia, Australia, and Papua New Guinea.',
    tags: ['AppsFlyer', 'Tableau', 'CRO'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxB_5iAI8DahKYG2v23N2IG6zf2UquBlffrQAaWZZaAZ7TcACc8bALrJnnNNB75fCEZcGR_d8Gc0NKw_wxrEJMK-uA0KYKFeBnb5PbibVB4c5RKyzk6719gwyiVydGfi1nCTZXm066iEzl0AJT8tKcn-NxyD0r4u_QiOm7nBXtsHIxVbPmS1qyl4ijNYGIYUeZbqZ0KcpvQ2g3xs0f5NadCf-Kxr8nGVOEiTxCjj-yhPO8ZbscZTmGWdZxk7QfgoevUjvDgAb_NNf1',
    metricValue: '18% ↑',
    metricLabel: 'Conversion Rate',
    longDescription:
      'Built 8+ Tableau dashboards tracking CAC, ROI, and ROAS across three international markets. Optimized paid media bidding and audience targeting while redesigning 10+ landing pages — increasing conversion rates by 18% and campaign sign-ups by 25%.',
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
  { title: 'Python Developer Certification', issuer: 'Udemy' },
];

export const portfolioEducation: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Applications (B.CA)',
    institution: 'NEFTU',
    period: '2019 - 2023',
    detail: 'Concentrated on business analytics and data-driven decision-making.',
  },
  {
    degree: 'Higher Secondary',
    institution: 'M.G. Convent School, Lucknow',
    period: '2017 - 2019',
    detail: 'Strong foundation in mathematics and science.',
  },
  {
    degree: 'High School',
    institution: 'Rasphil Academy, Lucknow',
    period: '2013 - 2015',
    detail: 'Developed strong communication and teamwork skills.',
  },
];

export const portfolioLanguages: LanguageItem[] = [
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Fluent' },
];

export const resumePdfUrl = `${import.meta.env.BASE_URL}Rishabh_Kharbanda_CV_v2.pdf`;
