/**
 * Portfolio backend — contact form + visit analytics
 *
 * Setup:
 * 1. https://script.google.com → New project → paste this file
 * 2. Project Settings → Script properties → add STATS_SECRET = your private PIN
 * 3. Run → authorizeSetup → Allow all permissions (creates analytics spreadsheet)
 * 4. Deploy → New deployment → Web app (Execute as: Me, Anyone)
 * 5. Optional: Triggers → Add → sendDailyVisitDigest → Day timer → 8am–9am
 * 6. Copy Web app URL → VITE_PORTFOLIO_API_URL (GitHub secret + .env)
 */

const RECIPIENT_EMAIL = 'rishabhkharbanda08@gmail.com';

/** Run once from the Apps Script editor to grant spreadsheet + email permissions. */
function authorizeSetup() {
  const ss = getSpreadsheet_();
  Logger.log('Authorized. Analytics sheet: ' + ss.getUrl());
}
const VISITS_SHEET = 'Visits';
const UNIQUES_SHEET = 'UniqueVisitors';

function doPost(e) {
  const params = getParams_(e);
  const action = String(params.action || 'contact').toLowerCase();

  if (action === 'visit') return logVisit_(params);
  if (action === 'contact') return handleContact_(params);
  return jsonResponse_({ result: 'error', message: 'Unknown action.' });
}

function doGet(e) {
  const params = getParams_(e);
  const action = String(params.action || 'health').toLowerCase();
  const callback = sanitizeCallback_(params.callback);

  // GET + JSONP is the most reliable transport from GitHub Pages (no CORS).
  if (action === 'visit') return logVisit_(params, callback);
  if (action === 'stats') return getStats_(params, callback);
  if (action === 'health') {
    return jsonResponse_(
      {
        result: 'ok',
        message: 'Portfolio API is live.',
        analytics: true,
      },
      callback
    );
  }
  return jsonResponse_({ result: 'error', message: 'Unknown action.' }, callback);
}

function sanitizeCallback_(name) {
  const value = String(name || '').trim();
  if (/^rkCb_[a-zA-Z0-9_]+$/.test(value)) return value;
  return '';
}

function getParams_(e) {
  const params = {};
  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(function (key) {
      params[key] = e.parameter[key];
    });
  }

  if (e && e.postData && e.postData.contents) {
    const contentType = String(e.postData.type || '');
    if (contentType.indexOf('application/x-www-form-urlencoded') >= 0) {
      parseUrlEncoded_(e.postData.contents).forEach(function (pair) {
        params[pair[0]] = pair[1];
      });
    }
  }

  return params;
}

function parseUrlEncoded_(body) {
  return String(body || '')
    .split('&')
    .filter(function (part) {
      return part.length > 0;
    })
    .map(function (part) {
      const idx = part.indexOf('=');
      if (idx === -1) return [decodeURIComponent(part.replace(/\+/g, ' ')), ''];
      return [
        decodeURIComponent(part.slice(0, idx).replace(/\+/g, ' ')),
        decodeURIComponent(part.slice(idx + 1).replace(/\+/g, ' ')),
      ];
    });
}

function handleContact_(params) {
  try {
    const name = String(params.name || '').trim();
    const email = String(params.email || '').trim();
    const subject = String(params.subject || 'Portfolio inquiry').trim();
    const message = String(params.message || '').trim();

    if (!name || !email || !message) {
      return jsonResponse_({ result: 'error', message: 'Missing required fields.' });
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

    return jsonResponse_({ result: 'success' });
  } catch (error) {
    return jsonResponse_({ result: 'error', message: String(error) });
  }
}

function logVisit_(params, callback) {
  try {
    const visitorId = String(params.visitorId || '').trim();
    if (!visitorId) {
      return jsonResponse_({ result: 'error', message: 'Missing visitorId.' }, callback);
    }

    const referrer = String(params.referrer || 'direct').slice(0, 500);
    const page = String(params.page || '/').slice(0, 200);
    const userAgent = String(params.userAgent || '').slice(0, 300);
    const now = new Date();

    const ss = getSpreadsheet_();
    const visits = ss.getSheetByName(VISITS_SHEET);
    const uniques = ss.getSheetByName(UNIQUES_SHEET);

    const row = findVisitorRow_(uniques, visitorId);
    const isNewUnique = row === -1;

    visits.appendRow([now, visitorId, isNewUnique, referrer, page, userAgent]);

    if (isNewUnique) {
      uniques.appendRow([visitorId, now, now, 1]);
      notifyNewUniqueVisitor_(visitorId, referrer, page);
    } else {
      const count = Number(uniques.getRange(row, 4).getValue()) || 0;
      uniques.getRange(row, 3, 1, 2).setValues([[now, count + 1]]);
    }

    return jsonResponse_(
      {
        result: 'success',
        isNewUnique: isNewUnique,
        uniqueVisitors: Math.max(0, uniques.getLastRow() - 1),
        totalPageViews: Math.max(0, visits.getLastRow() - 1),
      },
      callback
    );
  } catch (error) {
    return jsonResponse_({ result: 'error', message: String(error) }, callback);
  }
}

function getStats_(params, callback) {
  try {
    const key = String(params.key || '');
    const secret =
      PropertiesService.getScriptProperties().getProperty('STATS_SECRET') || 'rk2026';

    if (key !== secret) {
      return jsonResponse_({ result: 'error', message: 'Invalid access PIN.' }, callback);
    }

    const ss = getSpreadsheet_();
    const visits = ss.getSheetByName(VISITS_SHEET);
    const uniques = ss.getSheetByName(UNIQUES_SHEET);

    const uniqueVisitors = Math.max(0, uniques.getLastRow() - 1);
    const totalPageViews = Math.max(0, visits.getLastRow() - 1);
    const todayPageViews = countTodayRows_(visits);
    const todayNewUniques = countTodayNewUniques_(visits);

    return jsonResponse_(
      {
        result: 'success',
        uniqueVisitors: uniqueVisitors,
        totalPageViews: totalPageViews,
        todayPageViews: todayPageViews,
        todayNewUniques: todayNewUniques,
        sheetUrl: ss.getUrl(),
        updatedAt: new Date().toISOString(),
      },
      callback
    );
  } catch (error) {
    return jsonResponse_({ result: 'error', message: String(error) }, callback);
  }
}

/** Optional daily email — add as time-driven trigger in Apps Script */
function sendDailyVisitDigest() {
  const ss = getSpreadsheet_();
  const visits = ss.getSheetByName(VISITS_SHEET);
  const uniques = ss.getSheetByName(UNIQUES_SHEET);

  const uniqueVisitors = Math.max(0, uniques.getLastRow() - 1);
  const totalPageViews = Math.max(0, visits.getLastRow() - 1);
  const todayPageViews = countTodayRows_(visits);
  const todayNewUniques = countTodayNewUniques_(visits);

  const body =
    'Portfolio visit summary\n\n' +
    'Unique visitors (all time): ' + uniqueVisitors + '\n' +
    'Total page views (all time): ' + totalPageViews + '\n' +
    'Page views today: ' + todayPageViews + '\n' +
    'New unique visitors today: ' + todayNewUniques + '\n\n' +
    'Full data: ' + ss.getUrl();

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: '[Portfolio] Daily visit summary',
    body: body,
  });
}

function notifyNewUniqueVisitor_(visitorId, referrer, page) {
  try {
    const ss = getSpreadsheet_();
    const uniqueVisitors = Math.max(0, ss.getSheetByName(UNIQUES_SHEET).getLastRow() - 1);

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: '[Portfolio] New unique visitor #' + uniqueVisitors,
      body:
        'Someone new visited your portfolio.\n\n' +
        'Unique visitors total: ' + uniqueVisitors + '\n' +
        'Page: ' + page + '\n' +
        'Referrer: ' + referrer + '\n' +
        'Visitor ID: ' + visitorId.slice(0, 8) + '…\n\n' +
        'Dashboard: ' + ss.getUrl(),
    });
  } catch (error) {
    // Non-blocking if email fails
  }
}

function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  let sheetId = props.getProperty('SHEET_ID');

  if (!sheetId) {
    const created = SpreadsheetApp.create('Portfolio Site Analytics');
    sheetId = created.getId();
    props.setProperty('SHEET_ID', sheetId);
    setupSheets_(created);
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: '[Portfolio] Analytics sheet created',
      body: 'Your visit analytics spreadsheet:\n' + created.getUrl(),
    });
  }

  const ss = SpreadsheetApp.openById(sheetId);
  if (!ss.getSheetByName(VISITS_SHEET)) setupSheets_(ss);
  return ss;
}

function setupSheets_(ss) {
  let visits = ss.getSheetByName(VISITS_SHEET);
  if (!visits) {
    visits = ss.insertSheet(VISITS_SHEET);
    visits.appendRow(['Timestamp', 'VisitorId', 'IsNewUnique', 'Referrer', 'Page', 'UserAgent']);
  }

  let uniques = ss.getSheetByName(UNIQUES_SHEET);
  if (!uniques) {
    uniques = ss.insertSheet(UNIQUES_SHEET);
    uniques.appendRow(['VisitorId', 'FirstSeen', 'LastSeen', 'VisitCount']);
  }
}

function findVisitorRow_(sheet, visitorId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]) === visitorId) return i + 2;
  }
  return -1;
}

function countTodayRows_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const timestamps = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let count = 0;

  timestamps.forEach(function (row) {
    const value = row[0];
    if (!value) return;
    const date = Utilities.formatDate(new Date(value), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    if (date === today) count++;
  });

  return count;
}

function countTodayNewUniques_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const rows = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  let count = 0;

  rows.forEach(function (row) {
    const value = row[0];
    const isNew = row[2] === true || String(row[2]).toLowerCase() === 'true';
    if (!value || !isNew) return;
    const date = Utilities.formatDate(new Date(value), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    if (date === today) count++;
  });

  return count;
}

function jsonResponse_(payload, callback) {
  const text = JSON.stringify(payload);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + text + ')').setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
  }
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}
