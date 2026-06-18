export type IntroChipId = 'experience' | 'skills' | 'projects' | 'hire';

export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  const greetings: Record<string, string[]> = {
    morning: [
      'Good morning! Coffee in hand, dashboards open — the usual.',
      'Morning! Hope your day\'s off to a better start than my last A/B test.',
      'Hey, early bird! Respect. I was up optimizing CAC before breakfast.',
    ],
    afternoon: [
      'Good afternoon! Perfect time to peek at what I\'ve been building.',
      'Afternoon! If you\'re here, something caught your eye. Smart move.',
      'Hey there — hope the day\'s treating you well. Let me show you around.',
    ],
    evening: [
      'Good evening! Still browsing portfolios? I like your dedication.',
      'Evening! Great time to discover someone who actually moves metrics.',
      'Hey! Winding down or hunting talent? Either way — you\'re in the right place.',
    ],
    night: [
      'Burning the midnight oil? Same energy. Let\'s talk growth.',
      'Late night scroll? I respect the hustle. Here\'s what I\'ve been up to.',
      'Hey night owl — you\'re reading this at the perfect weird hour.',
    ],
  };

  let bucket: keyof typeof greetings = 'afternoon';
  if (hour >= 5 && hour < 12) bucket = 'morning';
  else if (hour >= 12 && hour < 17) bucket = 'afternoon';
  else if (hour >= 17 && hour < 22) bucket = 'evening';
  else bucket = 'night';

  const options = greetings[bucket];
  return options[Math.floor(Math.random() * options.length)];
}

export const openingLine = "Psst — bet you wanna see what I've been up to 👀";

export const avatarClickLines = [
  "Click me again. I don't bite. I A/B test.",
  "Still here? Good. That means you're qualified to keep scrolling.",
  "Fun fact: I reduced CAC 17% while you were reading this.",
  "You're vibing with this. I can tell. Marketers always know.",
  "Meta moment: you're judging my marketing on my marketing site. Love it.",
  "Wave back. Or don't. I'll still out-optimize your last campaign.",
];

export const introChips: { id: IntroChipId; emoji: string; label: string }[] = [
  { id: 'experience', emoji: '🚀', label: 'Your experience' },
  { id: 'skills', emoji: '🛠️', label: 'Skills & tools' },
  { id: 'projects', emoji: '💡', label: 'Projects' },
  { id: 'hire', emoji: '📩', label: 'I want to hire you' },
];

export const overlayContent: Record<
  IntroChipId,
  { title: string; lines: string[]; cta: string; meta?: string }
> = {
  experience: {
    title: "Alright, here's the receipts.",
    lines: [
      "5+ years turning messy data into money moves — gaming, fantasy sports, e-commerce, APAC.",
      "Head Digital Works: cut ad spend 55% (₹4Cr → ₹1.8Cr) without killing results. CAC down 17%. Churn down 15%.",
      "Yong Yuan Casino: 8+ Tableau dashboards across Malaysia, Australia & PNG. Conversions up 18%.",
      "KSKT Agromart: 70% MoM sales growth. Because 'good enough' isn't in my vocabulary.",
      "I've run campaigns in three countries before breakfast. Your move.",
    ],
    cta: 'See the full timeline',
    meta: "You're reading a portfolio that markets itself. Very on-brand.",
  },
  skills: {
    title: "The stack that actually ships.",
    lines: [
      "Tableau · Power BI · SQL · Snowflake · Python — I speak data fluently.",
      "AppsFlyer · CleverTap · WebEngage · Plotline — lifecycle is my love language.",
      "Figma for wireframes. Claude, GPT-4, Gemini daily — AI isn't a buzzword, it's my co-pilot.",
      "Cohort analysis, attribution modeling, LTV forecasting — the unsexy stuff that prints ROI.",
      "I don't just pull reports. I pull levers.",
    ],
    cta: 'Browse the full arsenal',
  },
  projects: {
    title: "Stuff that moved the needle.",
    lines: [
      "Sales Performance Dashboard — Python pipeline + Tableau viz across regions. Stakeholders finally stopped guessing.",
      "Customer Segmentation Engine — clustering + lifecycle campaigns. Personalization that actually personalizes.",
      "APAC Multi-Market Campaigns — geo-segmented acquisition across Malaysia, Australia & PNG.",
      "Magic Frame AI — AI photo editing product (yes, I market AI while using AI).",
      "India Quest — educational quiz game for kids. Growth meets purpose.",
    ],
    cta: 'Explore featured work',
  },
  hire: {
    title: "Let's skip the small talk.",
    lines: [
      "Currently open to the right Senior Marketing Analyst role.",
      "Remote or hybrid. APAC-friendly timezone.",
      "I bring: performance marketing, lifecycle analytics, and opinions backed by data.",
      "You bring: a problem worth solving and budget that respects ROI.",
      "I'll even draft the outreach email for you. That's how confident I am.",
    ],
    cta: "Let's talk — I'm ready",
    meta: "This CTA converts. You're proof.",
  },
};
