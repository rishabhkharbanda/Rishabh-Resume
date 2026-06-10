import { PORTFOLIO_API_URL } from './api';

/** Same Google Apps Script endpoint as analytics (action=contact) */
export const CONTACT_FORM_ENDPOINT = PORTFOLIO_API_URL;

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Submit via hidden iframe — avoids CORS issues with Google Apps Script POST. */
export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  if (!CONTACT_FORM_ENDPOINT) {
    throw new Error(
      'Contact form is not configured. Please email rishabhkharbanda08@gmail.com directly.'
    );
  }

  return new Promise((resolve, reject) => {
    const iframeName = 'rk_contact_iframe';
    let iframe = document.getElementById(iframeName) as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.id = iframeName;
      iframe.title = 'Contact form response';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = CONTACT_FORM_ENDPOINT;
    form.target = iframeName;
    form.style.display = 'none';
    form.acceptCharset = 'UTF-8';

    const fields: Record<string, string> = {
      action: 'contact',
      name: payload.name.trim(),
      email: payload.email.trim(),
      subject: payload.subject.trim(),
      message: payload.message.trim(),
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    const timeout = window.setTimeout(() => {
      cleanup();
      resolve();
    }, 4000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      form.remove();
    };

    iframe.onload = () => {
      cleanup();
      resolve();
    };

    iframe.onerror = () => {
      cleanup();
      reject(
        new Error(
          'Unable to send your message right now. Please email rishabhkharbanda08@gmail.com directly.'
        )
      );
    };

    document.body.appendChild(form);
    form.submit();
  });
}
