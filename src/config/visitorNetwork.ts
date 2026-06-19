export interface VisitorNetworkInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
}

const EMPTY_NETWORK: VisitorNetworkInfo = {
  ip: '',
  city: '',
  region: '',
  country: '',
};

async function fetchJsonWithTimeout<T>(url: string, timeoutMs = 3000): Promise<T | null> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

/** Resolve the visitor's public IP (and rough location when available). */
export async function fetchVisitorNetwork(): Promise<VisitorNetworkInfo> {
  const [ipData, geoData] = await Promise.all([
    fetchJsonWithTimeout<{ ip?: string }>('https://api.ipify.org?format=json'),
    fetchJsonWithTimeout<{
      ip?: string;
      city?: string;
      region?: string;
      country_name?: string;
      error?: boolean;
    }>('https://ipapi.co/json/'),
  ]);

  const ip = String(ipData?.ip || geoData?.ip || '').slice(0, 45);
  if (!ip) return EMPTY_NETWORK;

  if (geoData && !geoData.error) {
    return {
      ip,
      city: String(geoData.city || '').slice(0, 80),
      region: String(geoData.region || '').slice(0, 80),
      country: String(geoData.country_name || '').slice(0, 80),
    };
  }

  return { ip, city: '', region: '', country: '' };
}
