/** Google Apps Script web app — contact form + visit analytics */
import { jsonpRequest } from './jsonp';
import { classifyVisitorWithBehavior, getVisitorContext } from './visitorClassification';
import { fetchVisitorNetwork } from './visitorNetwork';

export const PORTFOLIO_API_URL =
  import.meta.env.VITE_PORTFOLIO_API_URL ||
  import.meta.env.VITE_CONTACT_FORM_URL ||
  '';

const VISITOR_ID_KEY = 'rk_visitor_id';
const SESSION_VISIT_KEY = 'rk_visit_logged';

export interface VisitStats {
  uniqueVisitors: number;
  totalPageViews: number;
  todayPageViews: number;
  todayNewUniques: number;
  humanPageViews: number;
  atsPageViews: number;
  botPageViews: number;
  unknownPageViews: number;
  humanUniques: number;
  atsUniques: number;
  todayHumanPageViews: number;
  todayAtsPageViews: number;
  sheetUrl?: string;
  updatedAt?: string;
  backendVersion?: number;
  backendNeedsUpgrade?: boolean;
}

interface ApiResponse {
  result?: string;
  message?: string;
  uniqueVisitors?: number;
  totalPageViews?: number;
  todayPageViews?: number;
  todayNewUniques?: number;
  humanPageViews?: number;
  atsPageViews?: number;
  botPageViews?: number;
  unknownPageViews?: number;
  humanUniques?: number;
  atsUniques?: number;
  todayHumanPageViews?: number;
  todayAtsPageViews?: number;
  sheetUrl?: string;
  updatedAt?: string;
  analytics?: boolean;
  backendVersion?: number;
  features?: string[];
}

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function formatApiError(message: string): string {
  if (message.includes('SpreadsheetApp') || message.includes('authorization')) {
    return 'Apps Script needs permission. Open script.google.com → Run → authorizeSetup → Allow → Deploy → Manage deployments → Edit → New version → Deploy.';
  }
  return message;
}

function supportsVisitorTypeStats(data: ApiResponse): boolean {
  return typeof data.humanPageViews === 'number';
}

export async function fetchBackendHealth(): Promise<{ backendVersion: number; needsUpgrade: boolean }> {
  if (!PORTFOLIO_API_URL) {
    return { backendVersion: 0, needsUpgrade: true };
  }

  try {
    const data = await jsonpRequest<ApiResponse>(PORTFOLIO_API_URL, { action: 'health' });
    const backendVersion = data.backendVersion ?? 0;
    return {
      backendVersion,
      needsUpgrade: backendVersion < 3,
    };
  } catch {
    return { backendVersion: 0, needsUpgrade: true };
  }
}

function isAnalyticsBackend(data: ApiResponse): boolean {
  return (
    data.result === 'success' &&
    typeof data.uniqueVisitors === 'number' &&
    typeof data.totalPageViews === 'number'
  );
}

/** Log one page view per browser session (unique visitors tracked server-side). */
export async function trackVisit(): Promise<void> {
  if (!PORTFOLIO_API_URL || sessionStorage.getItem(SESSION_VISIT_KEY)) return;

  try {
    const [classification, context, network] = await Promise.all([
      classifyVisitorWithBehavior({ timeoutMs: 2500 }),
      Promise.resolve(getVisitorContext()),
      fetchVisitorNetwork(),
    ]);

    const data = await jsonpRequest<ApiResponse>(PORTFOLIO_API_URL, {
      action: 'visit',
      visitorId: getVisitorId(),
      page: window.location.pathname + window.location.search,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent.slice(0, 300),
      visitorType: classification.type,
      visitorConfidence: classification.confidence,
      atsVendor: classification.atsVendor || '',
      classificationSignals: classification.signals.join(',').slice(0, 200),
      visitorLanguage: context.visitorLanguage,
      visitorTimezone: context.visitorTimezone,
      screenSize: context.screenSize,
      deviceType: context.deviceType,
      visitorIp: network.ip,
      visitorCity: network.city,
      visitorRegion: network.region,
      visitorCountry: network.country,
    });

    if (data.result === 'success') {
      sessionStorage.setItem(SESSION_VISIT_KEY, '1');
    }
  } catch {
    // Silent fail — analytics should never block the site
  }
}

export async function fetchVisitStats(pin: string): Promise<VisitStats> {
  if (!PORTFOLIO_API_URL) {
    throw new Error(
      'Analytics API is not configured. Add VITE_PORTFOLIO_API_URL in GitHub repository secrets and redeploy.'
    );
  }

  let data: ApiResponse;
  try {
    data = await jsonpRequest<ApiResponse>(PORTFOLIO_API_URL, {
      action: 'stats',
      key: pin.trim(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch';
    if (message === 'Failed to fetch') {
      throw new Error(
        'Could not reach analytics backend. Redeploy the latest portfolio-backend-google-apps-script.gs and authorize it (Run → authorizeSetup).'
      );
    }
    throw error;
  }

  if (data.result === 'error') {
    throw new Error(formatApiError(data.message || 'Invalid PIN.'));
  }

  if (!isAnalyticsBackend(data)) {
    throw new Error(
      'Analytics backend is not set up. Paste scripts/portfolio-backend-google-apps-script.gs in Apps Script, run authorizeSetup, deploy as Web app (Anyone), update VITE_PORTFOLIO_API_URL, and redeploy the site.'
    );
  }

  return {
    uniqueVisitors: data.uniqueVisitors ?? 0,
    totalPageViews: data.totalPageViews ?? 0,
    todayPageViews: data.todayPageViews ?? 0,
    todayNewUniques: data.todayNewUniques ?? 0,
    humanPageViews: data.humanPageViews ?? 0,
    atsPageViews: data.atsPageViews ?? 0,
    botPageViews: data.botPageViews ?? 0,
    unknownPageViews: data.unknownPageViews ?? 0,
    humanUniques: data.humanUniques ?? 0,
    atsUniques: data.atsUniques ?? 0,
    todayHumanPageViews: data.todayHumanPageViews ?? 0,
    todayAtsPageViews: data.todayAtsPageViews ?? 0,
    sheetUrl: data.sheetUrl,
    updatedAt: data.updatedAt,
    backendVersion: data.backendVersion,
    backendNeedsUpgrade: !supportsVisitorTypeStats(data),
  };
}
