/** Google Apps Script web app — contact form + visit analytics */
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
  sheetUrl?: string;
  updatedAt?: string;
}

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function buildApiUrl(params: Record<string, string>): string {
  if (!PORTFOLIO_API_URL) return '';

  const url = new URL(PORTFOLIO_API_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

async function postForm(params: Record<string, string>): Promise<Response | null> {
  if (!PORTFOLIO_API_URL) return null;

  return fetch(PORTFOLIO_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams(params).toString(),
    redirect: 'follow',
  });
}

/** Log one page view per browser session (unique visitors tracked server-side). */
export async function trackVisit(): Promise<void> {
  if (!PORTFOLIO_API_URL || sessionStorage.getItem(SESSION_VISIT_KEY)) return;

  const params = {
    action: 'visit',
    visitorId: getVisitorId(),
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent.slice(0, 300),
  };

  try {
    // GET is the most reliable transport for Google Apps Script from GitHub Pages.
    const getResponse = await fetch(buildApiUrl(params), { redirect: 'follow' });
    if (getResponse.ok) {
      const data = (await getResponse.json()) as { result?: string };
      if (data.result === 'success') {
        sessionStorage.setItem(SESSION_VISIT_KEY, '1');
        return;
      }
    }

    // Fallback to POST for older deployments.
    const postResponse = await postForm(params);
    if (postResponse?.ok) {
      sessionStorage.setItem(SESSION_VISIT_KEY, '1');
    }
  } catch {
    // Silent fail — analytics should never block the site
  }
}

function isAnalyticsBackend(data: Record<string, unknown>): boolean {
  return (
    data.result === 'success' &&
    typeof data.uniqueVisitors === 'number' &&
    typeof data.totalPageViews === 'number'
  );
}

export async function fetchVisitStats(pin: string): Promise<VisitStats> {
  if (!PORTFOLIO_API_URL) {
    throw new Error(
      'Analytics API is not configured. Add VITE_PORTFOLIO_API_URL in GitHub repository secrets and redeploy.'
    );
  }

  const url = buildApiUrl({ action: 'stats', key: pin.trim() });
  const response = await fetch(url, { redirect: 'follow' });

  if (!response.ok) {
    throw new Error('Could not load stats. Check your PIN and API URL.');
  }

  let data: Record<string, unknown>;
  try {
    data = (await response.json()) as Record<string, unknown>;
  } catch {
    throw new Error('Analytics backend returned an invalid response. Redeploy the portfolio Apps Script.');
  }

  if (data.result === 'error') {
    throw new Error(String(data.message || 'Invalid PIN.'));
  }

  if (!isAnalyticsBackend(data)) {
    throw new Error(
      'Analytics backend is not set up. In Google Apps Script, paste scripts/portfolio-backend-google-apps-script.gs, deploy as Web app (Anyone), then update the VITE_PORTFOLIO_API_URL GitHub secret and redeploy the site.'
    );
  }

  return {
    uniqueVisitors: data.uniqueVisitors as number,
    totalPageViews: data.totalPageViews as number,
    todayPageViews: (data.todayPageViews as number) ?? 0,
    todayNewUniques: (data.todayNewUniques as number) ?? 0,
    sheetUrl: data.sheetUrl as string | undefined,
    updatedAt: data.updatedAt as string | undefined,
  };
}
