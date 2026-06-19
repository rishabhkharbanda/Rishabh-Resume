export type VisitorType = 'human' | 'ats' | 'bot' | 'unknown';
export type VisitorConfidence = 'high' | 'medium' | 'low';

export interface VisitorClassification {
  type: VisitorType;
  confidence: VisitorConfidence;
  atsVendor: string | null;
  signals: string[];
}

type PatternRule = {
  pattern: RegExp;
  vendor?: string;
  signal: string;
};

const ATS_UA_RULES: PatternRule[] = [
  { pattern: /greenhouse/i, vendor: 'Greenhouse', signal: 'ua:greenhouse' },
  { pattern: /lever(?:hire|\.co)/i, vendor: 'Lever', signal: 'ua:lever' },
  { pattern: /workday/i, vendor: 'Workday', signal: 'ua:workday' },
  { pattern: /taleo|oracle.?hcm/i, vendor: 'Taleo', signal: 'ua:taleo' },
  { pattern: /icims/i, vendor: 'iCIMS', signal: 'ua:icims' },
  { pattern: /smartrecruiters/i, vendor: 'SmartRecruiters', signal: 'ua:smartrecruiters' },
  { pattern: /ashby/i, vendor: 'Ashby', signal: 'ua:ashby' },
  { pattern: /bamboohr/i, vendor: 'BambooHR', signal: 'ua:bamboohr' },
  { pattern: /jazzhr/i, vendor: 'JazzHR', signal: 'ua:jazzhr' },
  { pattern: /jobvite/i, vendor: 'Jobvite', signal: 'ua:jobvite' },
  { pattern: /successfactors|sap.?sf/i, vendor: 'SuccessFactors', signal: 'ua:successfactors' },
  { pattern: /eightfold/i, vendor: 'Eightfold', signal: 'ua:eightfold' },
  { pattern: /phenom/i, vendor: 'Phenom', signal: 'ua:phenom' },
  { pattern: /workable/i, vendor: 'Workable', signal: 'ua:workable' },
  { pattern: /recruitee/i, vendor: 'Recruitee', signal: 'ua:recruitee' },
  { pattern: /breezy(?:hr)?/i, vendor: 'Breezy HR', signal: 'ua:breezy' },
  { pattern: /bullhorn/i, vendor: 'Bullhorn', signal: 'ua:bullhorn' },
  { pattern: /cornerstone/i, vendor: 'Cornerstone', signal: 'ua:cornerstone' },
  { pattern: /applicant.?tracking|ats.?parser|resume.?parser/i, vendor: 'ATS Parser', signal: 'ua:ats-parser' },
  { pattern: /hirevue|beamery|gem\.com/i, vendor: 'Recruiting Platform', signal: 'ua:recruiting-platform' },
];

const ATS_REFERRER_RULES: PatternRule[] = [
  { pattern: /greenhouse\.io/i, vendor: 'Greenhouse', signal: 'ref:greenhouse' },
  { pattern: /lever\.co/i, vendor: 'Lever', signal: 'ref:lever' },
  { pattern: /myworkdayjobs\.com|workday\.com/i, vendor: 'Workday', signal: 'ref:workday' },
  { pattern: /icims\.com/i, vendor: 'iCIMS', signal: 'ref:icims' },
  { pattern: /smartrecruiters\.com/i, vendor: 'SmartRecruiters', signal: 'ref:smartrecruiters' },
  { pattern: /ashbyhq\.com/i, vendor: 'Ashby', signal: 'ref:ashby' },
  { pattern: /bamboohr\.com/i, vendor: 'BambooHR', signal: 'ref:bamboohr' },
  { pattern: /jazzhr\.com/i, vendor: 'JazzHR', signal: 'ref:jazzhr' },
  { pattern: /jobvite\.com/i, vendor: 'Jobvite', signal: 'ref:jobvite' },
  { pattern: /workable\.com/i, vendor: 'Workable', signal: 'ref:workable' },
  { pattern: /recruitee\.com/i, vendor: 'Recruitee', signal: 'ref:recruitee' },
  { pattern: /eightfold\.ai/i, vendor: 'Eightfold', signal: 'ref:eightfold' },
  { pattern: /phenom\.com/i, vendor: 'Phenom', signal: 'ref:phenom' },
  { pattern: /linkedin\.com\/jobs/i, vendor: 'LinkedIn Jobs', signal: 'ref:linkedin-jobs' },
];

const BOT_UA_RULES: PatternRule[] = [
  { pattern: /googlebot/i, signal: 'ua:googlebot' },
  { pattern: /bingbot/i, signal: 'ua:bingbot' },
  { pattern: /slurp|duckduckbot|baiduspider|yandexbot/i, signal: 'ua:search-bot' },
  { pattern: /facebookexternalhit|twitterbot|linkedinbot/i, signal: 'ua:social-bot' },
  { pattern: /headlesschrome|phantomjs|puppeteer|playwright|selenium|webdriver/i, signal: 'ua:automation' },
  { pattern: /python-requests|curl\/|wget\/|scrapy|httpclient|java\/|go-http/i, signal: 'ua:script-client' },
  { pattern: /\b(bot|crawler|spider|scraper)\b/i, signal: 'ua:generic-bot' },
];

function matchRules(value: string, rules: PatternRule[]) {
  for (const rule of rules) {
    if (rule.pattern.test(value)) {
      return rule;
    }
  }
  return null;
}

function hasHumanBrowserSignals(): string[] {
  const signals: string[] = [];

  if (typeof navigator !== 'undefined') {
    if (navigator.languages && navigator.languages.length > 0) {
      signals.push('lang:present');
    }
    if (window.matchMedia('(pointer: fine)').matches || window.matchMedia('(pointer: coarse)').matches) {
      signals.push('pointer:present');
    }
    if (screen.width >= 320 && screen.height >= 320) {
      signals.push('screen:present');
    }
    if (!navigator.webdriver) {
      signals.push('webdriver:false');
    }
  }

  return signals;
}

/** Synchronous classification from user agent, referrer, and browser signals. */
export function classifyVisitor(
  userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '',
  referrer = typeof document !== 'undefined' ? document.referrer : '',
): VisitorClassification {
  const signals: string[] = [];
  const ua = userAgent.slice(0, 500);
  const ref = referrer.slice(0, 500);

  const atsUa = matchRules(ua, ATS_UA_RULES);
  if (atsUa) {
    return {
      type: 'ats',
      confidence: 'high',
      atsVendor: atsUa.vendor ?? 'ATS',
      signals: [...signals, atsUa.signal],
    };
  }

  const atsRef = matchRules(ref, ATS_REFERRER_RULES);
  if (atsRef) {
    return {
      type: 'ats',
      confidence: 'high',
      atsVendor: atsRef.vendor ?? 'ATS',
      signals: [...signals, atsRef.signal],
    };
  }

  const botUa = matchRules(ua, BOT_UA_RULES);
  if (botUa) {
    return {
      type: 'bot',
      confidence: 'high',
      atsVendor: null,
      signals: [...signals, botUa.signal],
    };
  }

  if (typeof navigator !== 'undefined' && navigator.webdriver) {
    return {
      type: 'bot',
      confidence: 'high',
      atsVendor: null,
      signals: [...signals, 'webdriver:true'],
    };
  }

  const humanSignals = hasHumanBrowserSignals();
  signals.push(...humanSignals);

  if (humanSignals.length >= 3) {
    return {
      type: 'human',
      confidence: 'medium',
      atsVendor: null,
      signals,
    };
  }

  return {
    type: 'unknown',
    confidence: 'low',
    atsVendor: null,
    signals,
  };
}

/** Wait briefly for real interaction before finalizing ambiguous visits as human. */
export function classifyVisitorWithBehavior(
  options: { timeoutMs?: number } = {},
): Promise<VisitorClassification> {
  const { timeoutMs = 2500 } = options;
  const initial = classifyVisitor();

  if (initial.type !== 'unknown') {
    return Promise.resolve(initial);
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = (result: VisitorClassification) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const onInteraction = () => {
      finish({
        type: 'human',
        confidence: 'high',
        atsVendor: null,
        signals: [...initial.signals, 'behavior:interaction'],
      });
    };

    const events = ['mousemove', 'scroll', 'keydown', 'touchstart', 'click'] as const;
    const cleanup = () => {
      events.forEach((event) => window.removeEventListener(event, onInteraction, true));
      window.clearTimeout(timer);
    };

    events.forEach((event) => window.addEventListener(event, onInteraction, { once: true, capture: true }));

    const timer = window.setTimeout(() => {
      finish(initial);
    }, timeoutMs);
  });
}

export function isHumanVisitor(classification: VisitorClassification): boolean {
  return classification.type === 'human';
}

export function isAtsVisitor(classification: VisitorClassification): boolean {
  return classification.type === 'ats';
}

export function getDeviceType(userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''): string {
  if (/ipad|tablet/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

export function getVisitorContext() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return {
      visitorLanguage: '',
      visitorTimezone: '',
      screenSize: '',
      deviceType: 'unknown',
    };
  }

  return {
    visitorLanguage: navigator.language || '',
    visitorTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    screenSize: `${window.screen.width}x${window.screen.height}`,
    deviceType: getDeviceType(),
  };
}
