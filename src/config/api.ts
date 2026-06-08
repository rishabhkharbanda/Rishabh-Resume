/** Google Apps Script web app — contact form + visit analytics */
export const PORTFOLIO_API_URL =
  import.meta.env.VITE_PORTFOLIO_API_URL ||
  import.meta.env.VITE_CONTACT_FORM_URL ||
  'https://script.google.com/macros/s/AKfycbwRFtwcgbRbNpqjZfTfHQCvHPwhfOoZYVG214tJRPAx3pBqzaWKCoWERDqWkpuObzJdeA/exec';

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

/** Log one page view per browser session (unique visitors tracked server-side). */
export async function trackVisit(): Promise<void> {
  if (sessionStorage.getItem(SESSION_VISIT_KEY)) return;

  const formData = new FormData();
  formData.append('action', 'visit');
  formData.append('visitorId', getVisitorId());
  formData.append('page', window.location.pathname + window.location.search);
  formData.append('referrer', document.referrer || 'direct');
  formData.append('userAgent', navigator.userAgent);

  try {
    await fetch(PORTFOLIO_API_URL, {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    });
    sessionStorage.setItem(SESSION_VISIT_KEY, '1');
  } catch {
    // Silent fail — analytics should never block the site
  }
}

export async function fetchVisitStats(pin: string): Promise<VisitStats> {
  const url = `${PORTFOLIO_API_URL}?action=stats&key=${encodeURIComponent(pin)}`;
  const response = await fetch(url, { redirect: 'follow' });

  if (!response.ok) {
    throw new Error('Could not load stats. Check your PIN and API URL.');
  }

  const data = (await response.json()) as VisitStats & { result?: string; message?: string };

  if (data.result === 'error') {
    throw new Error(data.message || 'Invalid PIN.');
  }

  return {
    uniqueVisitors: data.uniqueVisitors ?? 0,
    totalPageViews: data.totalPageViews ?? 0,
    todayPageViews: data.todayPageViews ?? 0,
    todayNewUniques: data.todayNewUniques ?? 0,
    sheetUrl: data.sheetUrl,
    updatedAt: data.updatedAt,
  };
}
