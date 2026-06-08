import { PORTFOLIO_API_URL } from './api';

/** Same Google Apps Script endpoint as analytics (action=contact) */
export const CONTACT_FORM_ENDPOINT = PORTFOLIO_API_URL;

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  const formData = new FormData();
  formData.append('action', 'contact');
  formData.append('name', payload.name.trim());
  formData.append('email', payload.email.trim());
  formData.append('subject', payload.subject.trim());
  formData.append('message', payload.message.trim());

  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(
      'Unable to send your message right now. Please email rishabhkharbanda08@gmail.com directly.'
    );
  }

  try {
    const data = (await response.json()) as { result?: string; message?: string };
    if (data.result === 'error') {
      throw new Error(data.message || 'Message could not be sent. Please try again or email directly.');
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('could not be sent')) {
      throw error;
    }
    // Google Apps Script may return a non-JSON body on success — treat as sent.
  }
}
