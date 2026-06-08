/**
 * Portfolio contact form — Google Apps Script
 *
 * Setup (one time):
 * 1. Go to https://script.google.com → New project
 * 2. Paste this file, save as "ContactForm"
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL into VITE_CONTACT_FORM_URL (or src/config/contact.ts)
 */

const RECIPIENT_EMAIL = 'rishabhkharbanda08@gmail.com';

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const name = String(params.name || '').trim();
    const email = String(params.email || '').trim();
    const subject = String(params.subject || 'Portfolio inquiry').trim();
    const message = String(params.message || '').trim();

    if (!name || !email || !message) {
      return jsonResponse({ result: 'error', message: 'Missing required fields.' });
    }

    const body =
      'New message from your portfolio contact form\n\n' +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Subject: ' + subject + '\n\n' +
      'Message:\n' + message + '\n\n' +
      '---\n' +
      'Sent from https://rishabhkharbanda.github.io/Rishabh-Resume/';

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: '[Portfolio] ' + subject,
      body: body,
      replyTo: email,
      name: name + ' (Portfolio)',
    });

    return jsonResponse({ result: 'success' });
  } catch (error) {
    return jsonResponse({ result: 'error', message: String(error) });
  }
}

function doGet() {
  return jsonResponse({ result: 'ok', message: 'Contact form endpoint is live.' });
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
