import { portfolioProjects } from '../data';
import { ViewTab } from '../types';

export const SITE_URL = 'https://rishabhkharbanda.github.io/Rishabh-Resume/';
export const SITE_NAME = 'Rishabh Kharbanda Portfolio';
export const PERSON_NAME = 'Rishabh Kharbanda';
export const JOB_TITLE = 'Senior Marketing Analyst & Data Strategist';
export const LOCALE = 'en_IN';

export const DEFAULT_DESCRIPTION =
  'Senior Marketing Analyst portfolio: performance marketing, lifecycle analytics, attribution, cohort retention, Tableau dashboards, Python, SQL, AppsFlyer, and paid media optimization across gaming, e-commerce, and B2C.';

export const DEFAULT_KEYWORDS =
  'Rishabh Kharbanda, marketing analyst, data strategist, performance marketing, Tableau, Python, SQL, cohort analysis, attribution, lifecycle marketing, portfolio, Hyderabad';

export const OG_IMAGE = `${SITE_URL}avatar.png`;
export const OG_IMAGE_WIDTH = 512;
export const OG_IMAGE_HEIGHT = 512;
export const OG_IMAGE_ALT = 'Rishabh Kharbanda — Senior Marketing Analyst portrait';

export const RESUME_PDF = 'Rishabh_Kharbanda.pdf';
export const RESUME_URL = `${SITE_URL}${RESUME_PDF}`;

export const CONTACT = {
  email: 'rishabhkharbanda08@gmail.com',
  phone: '+91-86047-26050',
  locality: 'Hyderabad',
  country: 'IN',
};

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/rishabh-kharbanda-7a3659209',
  github: 'https://github.com/rishikh',
  twitter: 'https://twitter.com/rishikh',
};

export const KNOWS_ABOUT = [
  'Performance Marketing',
  'Marketing Analytics',
  'Tableau',
  'Python',
  'SQL',
  'Cohort Analysis',
  'Attribution Modeling',
  'Lifecycle Marketing',
  'AppsFlyer',
  'Power BI',
];

type PageSeo = {
  title: string;
  description: string;
  keywords: string;
};

const TAB_SEO: Record<ViewTab, PageSeo> = {
  portfolio: {
    title: `${PERSON_NAME} | ${JOB_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
  },
  experience: {
    title: `Experience | ${PERSON_NAME} — Marketing Analyst Career`,
    description:
      'Marketing analyst experience across gaming, fantasy sports, e-commerce, and B2C: Yong Yuan Casino, Head Digital Works, KSKT Agromart, DaddyTech, and FabHotels with CAC, ROAS, and retention outcomes.',
    keywords:
      'marketing analyst experience, Head Digital Works, gaming analytics, CAC reduction, cohort analysis, Tableau dashboards',
  },
  skills: {
    title: `Skills & Tools | ${PERSON_NAME} — Tableau, Python, SQL`,
    description:
      'Technical toolkit for marketing analytics: Tableau, Power BI, Python, SQL, AppsFlyer, WebEngage, Clevertap, Snowflake, Google Analytics, and Figma for data-driven growth.',
    keywords:
      'Tableau, Python, SQL, AppsFlyer, WebEngage, marketing analytics tools, Power BI, cohort analysis skills',
  },
  contact: {
    title: `Contact ${PERSON_NAME} | Marketing Analyst Portfolio`,
    description:
      'Get in touch with Rishabh Kharbanda for marketing analytics, performance marketing, and data strategy opportunities. Based in Hyderabad, India.',
    keywords:
      'contact Rishabh Kharbanda, marketing analyst hire, Hyderabad marketing analyst, portfolio contact',
  },
  'sent-success': {
    title: `Message Sent | ${PERSON_NAME}`,
    description: 'Thank you for reaching out to Rishabh Kharbanda. Your message has been received.',
    keywords: DEFAULT_KEYWORDS,
  },
};

export function getPageSeo(tab: ViewTab): PageSeo {
  return TAB_SEO[tab] ?? TAB_SEO.portfolio;
}

export function buildJsonLdGraph(tab: ViewTab = 'portfolio') {
  const pageSeo = getPageSeo(tab);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE_URL}#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}#profilepage`,
        url: SITE_URL,
        name: pageSeo.title,
        description: pageSeo.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${SITE_URL}#website` },
        about: { '@id': `${SITE_URL}#person` },
        mainEntity: { '@id': `${SITE_URL}#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}#person`,
        name: PERSON_NAME,
        jobTitle: 'Senior Marketing Analyst',
        description:
          'Senior Marketing Analyst and data strategist specializing in performance marketing, lifecycle analytics, attribution, and executive reporting.',
        url: SITE_URL,
        image: OG_IMAGE,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: CONTACT.locality,
          addressCountry: CONTACT.country,
        },
        sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.twitter],
        knowsAbout: KNOWS_ABOUT,
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}#projects`,
        name: 'Featured Marketing Analytics Projects',
        description: 'Portfolio projects in attribution, lifecycle retention, and executive reporting.',
        itemListElement: portfolioProjects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            '@id': `${SITE_URL}#project-${project.id}`,
            name: project.title,
            description: project.description,
            keywords: project.tags.join(', '),
            author: { '@id': `${SITE_URL}#person` },
          },
        })),
      },
      {
        '@type': 'DigitalDocument',
        '@id': `${SITE_URL}#resume`,
        name: `${PERSON_NAME} Resume`,
        description: 'Downloadable PDF resume for Rishabh Kharbanda, Senior Marketing Analyst.',
        url: RESUME_URL,
        encodingFormat: 'application/pdf',
        author: { '@id': `${SITE_URL}#person` },
      },
    ],
  };
}

const JSON_LD_ID = 'portfolio-json-ld';

export function injectJsonLd(tab: ViewTab) {
  const graph = buildJsonLdGraph(tab);
  let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(graph);
}

export function setMetaContent(content: string, attr: 'name' | 'property', key: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export function applyPageSeo(tab: ViewTab) {
  const seo = getPageSeo(tab);

  document.title = seo.title;
  setMetaContent(seo.description, 'name', 'description');
  setMetaContent(seo.keywords, 'name', 'keywords');

  setMetaContent(seo.title, 'property', 'og:title');
  setMetaContent(seo.description, 'property', 'og:description');
  setMetaContent(SITE_URL, 'property', 'og:url');

  setMetaContent(seo.title, 'name', 'twitter:title');
  setMetaContent(seo.description, 'name', 'twitter:description');

  injectJsonLd(tab);
}
