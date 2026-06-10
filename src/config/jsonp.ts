declare global {
  interface Window {
    [key: string]: unknown;
  }
}

/** JSONP avoids CORS blocks when calling Google Apps Script from GitHub Pages. */
export function jsonpRequest<T>(
  baseUrl: string,
  params: Record<string, string>
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (!baseUrl) {
      reject(new Error('API URL is not configured.'));
      return;
    }

    const callback = `rkCb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const url = new URL(baseUrl);
    Object.entries({ ...params, callback }).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const script = document.createElement('script');
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(
        new Error(
          'Analytics request timed out. Authorize Apps Script (Run → authorizeSetup) and redeploy the web app.'
        )
      );
    }, 20000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      delete window[callback];
      script.remove();
    };

    window[callback] = (data: T) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(
        new Error(
          'Could not reach analytics backend. Check VITE_PORTFOLIO_API_URL and Apps Script deployment.'
        )
      );
    };

    script.src = url.toString();
    document.head.appendChild(script);
  });
}
