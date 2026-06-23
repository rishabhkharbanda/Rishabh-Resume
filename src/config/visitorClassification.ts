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
  { pattern: /teamtailor/i, vendor: 'Teamtailor', signal: 'ua:teamtailor' },
  { pattern: /pinpoint|pinpointhq/i, vendor: 'Pinpoint', signal: 'ua:pinpoint' },
  { pattern: /comeet/i, vendor: 'Comeet', signal: 'ua:comeet' },
  { pattern: /freshteam/i, vendor: 'Freshteam', signal: 'ua:freshteam' },
  { pattern: /hireez|hiretual/i, vendor: 'HireEZ', signal: 'ua:hireez' },
  { pattern: /seekout/i, vendor: 'SeekOut', signal: 'ua:seekout' },
  { pattern: /beamery/i, vendor: 'Beamery', signal: 'ua:beamery' },
  { pattern: /gem\.com|gem-ats/i, vendor: 'Gem', signal: 'ua:gem' },
  { pattern: /applicant.?tracking|ats.?parser|resume.?parser|resume.?screen/i, vendor: 'ATS Parser', signal: 'ua:ats-parser' },
  { pattern: /hirevue/i, vendor: 'HireVue', signal: 'ua:hirevue' },
  { pattern: /personio/i, vendor: 'Personio', signal: 'ua:personio' },
  { pattern: /rippling/i, vendor: 'Rippling', signal: 'ua:rippling' },
  { pattern: /brassring/i, vendor: 'Brassring', signal: 'ua:brassring' },
];

const ATS_REFERRER_RULES: PatternRule[] = [
  { pattern: /greenhouse\.io|grnh\.se|boards\.greenhouse/i, vendor: 'Greenhouse', signal: 'ref:greenhouse' },
  { pattern: /lever\.co|jobs\.lever/i, vendor: 'Lever', signal: 'ref:lever' },
  { pattern: /myworkdayjobs\.com|workday\.com/i, vendor: 'Workday', signal: 'ref:workday' },
  { pattern: /icims\.com/i, vendor: 'iCIMS', signal: 'ref:icims' },
  { pattern: /smartrecruiters\.com/i, vendor: 'SmartRecruiters', signal: 'ref:smartrecruiters' },
  { pattern: /ashbyhq\.com|jobs\.ashbyhq/i, vendor: 'Ashby', signal: 'ref:ashby' },
  { pattern: /bamboohr\.com/i, vendor: 'BambooHR', signal: 'ref:bamboohr' },
  { pattern: /jazzhr\.com|jazz\.co/i, vendor: 'JazzHR', signal: 'ref:jazzhr' },
  { pattern: /jobvite\.com/i, vendor: 'Jobvite', signal: 'ref:jobvite' },
  { pattern: /workable\.com|apply\.workable/i, vendor: 'Workable', signal: 'ref:workable' },
  { pattern: /recruitee\.com/i, vendor: 'Recruitee', signal: 'ref:recruitee' },
  { pattern: /eightfold\.ai/i, vendor: 'Eightfold', signal: 'ref:eightfold' },
  { pattern: /phenom\.com/i, vendor: 'Phenom', signal: 'ref:phenom' },
  { pattern: /teamtailor\.com/i, vendor: 'Teamtailor', signal: 'ref:teamtailor' },
  { pattern: /pinpointhq\.com/i, vendor: 'Pinpoint', signal: 'ref:pinpoint' },
  { pattern: /comeet\.co/i, vendor: 'Comeet', signal: 'ref:comeet' },
  { pattern: /freshteam\.com/i, vendor: 'Freshteam', signal: 'ref:freshteam' },
  { pattern: /taleo\.net|oraclecloud\.com/i, vendor: 'Taleo', signal: 'ref:taleo' },
  { pattern: /brassring\.com/i, vendor: 'Brassring', signal: 'ref:brassring' },
  { pattern: /successfactors\.com|sap\.com/i, vendor: 'SuccessFactors', signal: 'ref:successfactors' },
  { pattern: /linkedin\.com\/(jobs|talent|recruiter)/i, vendor: 'LinkedIn Recruiting', signal: 'ref:linkedin-recruiting' },
  { pattern: /indeed\.com|glassdoor\.com|monster\.com|naukri\.com|shine\.com/i, vendor: 'Job Board', signal: 'ref:job-board' },
  { pattern: /gem\.com/i, vendor: 'Gem', signal: 'ref:gem' },
  { pattern: /hireez\.com|hiretual\.com/i, vendor: 'HireEZ', signal: 'ref:hireez' },
];

const ATS_URL_RULES: PatternRule[] = [
  { pattern: /utm_source=(greenhouse|lever|workday|icims|ashby|smartrecruiters)/i, vendor: 'ATS Campaign', signal: 'url:utm-ats' },
  { pattern: /(gh_jid|gh_src|lever-|workday|icims)/i, vendor: 'ATS Link', signal: 'url:ats-param' },
];

const BOT_UA_RULES: PatternRule[] = [
  { pattern: /googlebot|google-inspectiontool|storebot-google/i, signal: 'ua:googlebot' },
  { pattern: /bingbot|msnbot/i, signal: 'ua:bingbot' },
  { pattern: /slurp|duckduckbot|baiduspider|yandexbot|petalbot|bytespider/i, signal: 'ua:search-bot' },
  { pattern: /facebookexternalhit|meta-externalagent/i, signal: 'ua:meta-bot' },
  { pattern: /twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp/i, signal: 'ua:social-bot' },
  { pattern: /headlesschrome|headless chrome|phantomjs|puppeteer|playwright|selenium|webdriver|lighthouse/i, signal: 'ua:automation' },
  { pattern: /python-requests|curl\/|wget\/|scrapy|httpclient|go-http|java\/|libwww|okhttp|axios\/|node-fetch|postmanruntime/i, signal: 'ua:script-client' },
  { pattern: /gptbot|chatgpt-user|claudebot|anthropic-ai|cohere-ai|perplexitybot|amazonbot|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot/i, signal: 'ua:crawler' },
  { pattern: /\b(bot|crawler|spider|scraper|archiver|preview)\b/i, signal: 'ua:generic-bot' },
];

function matchRules(value: string, rules: PatternRule[]) {
  for (const rule of rules) {
    if (rule.pattern.test(value)) {
      return rule;
    }
  }
  return null;
}

function getPageContext(): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.pathname}${window.location.search}`;
}

function hasAutomationSignals(): string[] {
  const signals: string[] = [];
  if (typeof navigator === 'undefined') return signals;

  if (navigator.webdriver) signals.push('automation:webdriver');
  if (/headless/i.test(navigator.userAgent)) signals.push('automation:headless-ua');

  const chrome = (window as Window & { chrome?: { runtime?: unknown } }).chrome;
  if (/chrome/i.test(navigator.userAgent) && chrome && !chrome.runtime && navigator.plugins.length === 0) {
    signals.push('automation:headless-chrome');
  }

  return signals;
}

function classifyFromSignals(
  userAgent: string,
  referrer: string,
  pageContext: string,
): VisitorClassification | null {
  const atsUa = matchRules(userAgent, ATS_UA_RULES);
  if (atsUa) {
    return { type: 'ats', confidence: 'high', atsVendor: atsUa.vendor ?? 'ATS', signals: [atsUa.signal] };
  }

  const atsRef = matchRules(referrer, ATS_REFERRER_RULES);
  if (atsRef) {
    return { type: 'ats', confidence: 'high', atsVendor: atsRef.vendor ?? 'ATS', signals: [atsRef.signal] };
  }

  const atsUrl = matchRules(pageContext, ATS_URL_RULES);
  if (atsUrl) {
    return { type: 'ats', confidence: 'medium', atsVendor: atsUrl.vendor ?? 'ATS', signals: [atsUrl.signal] };
  }

  const botUa = matchRules(userAgent, BOT_UA_RULES);
  if (botUa) {
    return { type: 'bot', confidence: 'high', atsVendor: null, signals: [botUa.signal] };
  }

  const automationSignals = hasAutomationSignals();
  if (automationSignals.length > 0) {
    return {
      type: 'bot',
      confidence: 'high',
      atsVendor: null,
      signals: automationSignals,
    };
  }

  return null;
}

/** Synchronous classification from user agent, referrer, and page context. */
export function classifyVisitor(
  userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '',
  referrer = typeof document !== 'undefined' ? document.referrer : '',
): VisitorClassification {
  const ua = userAgent.slice(0, 500);
  const ref = referrer.slice(0, 500);
  const pageContext = getPageContext().slice(0, 500);

  const matched = classifyFromSignals(ua, ref, pageContext);
  if (matched) return matched;

  return {
    type: 'unknown',
    confidence: 'low',
    atsVendor: null,
    signals: ['awaiting:behavior-or-explicit-signals'],
  };
}

/** Confirm humans only after deliberate interaction; ATS/bots never wait. */
export function classifyVisitorWithBehavior(
  options: { timeoutMs?: number } = {},
): Promise<VisitorClassification> {
  const { timeoutMs = 4000 } = options;
  const initial = classifyVisitor();

  if (initial.type === 'ats' || initial.type === 'bot') {
    return Promise.resolve(initial);
  }

  return new Promise((resolve) => {
    let settled = false;
    let pointerMoves = 0;

    const finish = (result: VisitorClassification) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const onPointerMove = () => {
      pointerMoves += 1;
      if (pointerMoves >= 8) {
        finish({
          type: 'human',
          confidence: 'high',
          atsVendor: null,
          signals: [...initial.signals, 'behavior:pointer-move'],
        });
      }
    };

    const onStrongInteraction = () => {
      finish({
        type: 'human',
        confidence: 'high',
        atsVendor: null,
        signals: [...initial.signals, 'behavior:interaction'],
      });
    };

    const strongEvents = ['click', 'keydown', 'touchstart'] as const;
    const cleanup = () => {
      strongEvents.forEach((event) => window.removeEventListener(event, onStrongInteraction, true));
      window.removeEventListener('pointermove', onPointerMove, true);
      window.clearTimeout(timer);
    };

    strongEvents.forEach((event) =>
      window.addEventListener(event, onStrongInteraction, { once: true, capture: true }),
    );
    window.addEventListener('pointermove', onPointerMove, { capture: true });

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
