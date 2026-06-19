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
    const visitorType = normalizeVisitorType_(params.visitorType, userAgent, referrer);
    const visitorConfidence = String(params.visitorConfidence || '').slice(0, 20);
    const atsVendor = String(params.atsVendor || '').slice(0, 80);
    const classificationSignals = String(params.classificationSignals || '').slice(0, 200);
    const visitorLanguage = String(params.visitorLanguage || '').slice(0, 20);
    const visitorTimezone = String(params.visitorTimezone || '').slice(0, 60);
    const screenSize = String(params.screenSize || '').slice(0, 20);
    const deviceType = String(params.deviceType || '').slice(0, 20);
    const now = new Date();

    const ss = getSpreadsheet_();
    const visits = ss.getSheetByName(VISITS_SHEET);
    const uniques = ss.getSheetByName(UNIQUES_SHEET);
    ensureVisitColumns_(visits);

    const row = findVisitorRow_(uniques, visitorId);
    const isNewUnique = row === -1;

    visits.appendRow([
      now,
      visitorId,
      isNewUnique,
      referrer,
      page,
      userAgent,
      visitorType,
      visitorConfidence,
      atsVendor,
      classificationSignals,
    ]);

    if (isNewUnique) {
      uniques.appendRow([visitorId, now, now, 1, visitorType, atsVendor]);
    } else {
      const count = Number(uniques.getRange(row, 4).getValue()) || 0;
      uniques.getRange(row, 3, 1, 2).setValues([[now, count + 1]]);
    }

    const visitCount = isNewUnique
      ? 1
      : Number(uniques.getRange(row, 4).getValue()) || 1;

    notifyVisit_({
      visitorId: visitorId,
      referrer: referrer,
      page: page,
      userAgent: userAgent,
      visitorType: visitorType,
      visitorConfidence: visitorConfidence,
      atsVendor: atsVendor,
      classificationSignals: classificationSignals,
      isNewUnique: isNewUnique,
      visitCount: visitCount,
      visitorLanguage: visitorLanguage,
      visitorTimezone: visitorTimezone,
      screenSize: screenSize,
      deviceType: deviceType,
      visitedAt: now,
    });

    return jsonResponse_(
      {
        result: 'success',
        isNewUnique: isNewUnique,
        visitorType: visitorType,
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
    const typeStats = getVisitorTypeStats_(visits, uniques);

    return jsonResponse_(
      {
        result: 'success',
        uniqueVisitors: uniqueVisitors,
        totalPageViews: totalPageViews,
        todayPageViews: todayPageViews,
        todayNewUniques: todayNewUniques,
        humanPageViews: typeStats.humanPageViews,
        atsPageViews: typeStats.atsPageViews,
        botPageViews: typeStats.botPageViews,
        unknownPageViews: typeStats.unknownPageViews,
        humanUniques: typeStats.humanUniques,
        atsUniques: typeStats.atsUniques,
        todayHumanPageViews: typeStats.todayHumanPageViews,
        todayAtsPageViews: typeStats.todayAtsPageViews,
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

  const typeStats = getVisitorTypeStats_(visits, uniques);

  const body =
    'Portfolio visit summary\n\n' +
    'Unique visitors (all time): ' + uniqueVisitors + '\n' +
    'Total page views (all time): ' + totalPageViews + '\n' +
    'Page views today: ' + todayPageViews + '\n' +
    'New unique visitors today: ' + todayNewUniques + '\n\n' +
    'Human page views: ' + typeStats.humanPageViews + '\n' +
    'ATS page views: ' + typeStats.atsPageViews + '\n' +
    'Human uniques: ' + typeStats.humanUniques + '\n' +
    'ATS uniques: ' + typeStats.atsUniques + '\n\n' +
    'Full data: ' + ss.getUrl();

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: '[Portfolio] Daily visit summary',
    body: body,
  });
}

function notifyVisit_(details) {
  try {
    const ss = getSpreadsheet_();
    const uniqueVisitors = Math.max(0, ss.getSheetByName(UNIQUES_SHEET).getLastRow() - 1);
    const typeStats = getVisitorTypeStats_(ss.getSheetByName(VISITS_SHEET), ss.getSheetByName(UNIQUES_SHEET));
    const profile = buildVisitorProfile_(details);
    const visitLabel = details.isNewUnique
      ? 'First-time visitor'
      : 'Returning visitor (visit #' + details.visitCount + ')';

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: profile.subject,
      body:
        'Who visited your portfolio\n' +
        '========================\n\n' +
        'Visitor type: ' + profile.typeLabel + '\n' +
        'Confidence: ' + (details.visitorConfidence || 'n/a') + '\n' +
        'Visit status: ' + visitLabel + '\n\n' +
        'When: ' + profile.when + '\n' +
        'Page: ' + details.page + '\n' +
        'Came from: ' + profile.referrerLabel + '\n\n' +
        'Device: ' + profile.deviceLabel + '\n' +
        'Browser: ' + profile.browserLabel + '\n' +
        'Screen: ' + (details.screenSize || 'unknown') + '\n' +
        'Language: ' + (details.visitorLanguage || 'unknown') + '\n' +
        'Timezone: ' + (details.visitorTimezone || 'unknown') + '\n\n' +
        'Signals: ' + (details.classificationSignals || 'none') + '\n' +
        'User agent: ' + details.userAgent + '\n' +
        'Visitor ID: ' + details.visitorId.slice(0, 12) + '…\n\n' +
        '---\n' +
        'All-time uniques: ' + uniqueVisitors + '\n' +
        'Human uniques: ' + typeStats.humanUniques + ' | ATS uniques: ' + typeStats.atsUniques + '\n' +
        'Human page views: ' + typeStats.humanPageViews + ' | ATS page views: ' + typeStats.atsPageViews + '\n\n' +
        'Dashboard: ' + ss.getUrl(),
    });
  } catch (error) {
    // Non-blocking if email fails
  }
}

function buildVisitorProfile_(details) {
  const typeLabel =
    details.visitorType === 'ats'
      ? 'ATS / recruiting crawler' + (details.atsVendor ? ' (' + details.atsVendor + ')' : '')
      : details.visitorType === 'human'
        ? 'Likely human'
        : details.visitorType === 'bot'
          ? 'Bot / crawler'
          : 'Unclassified visitor';

  const subjectPrefix =
    details.visitorType === 'human'
      ? '[Portfolio] Human visited your site'
      : details.visitorType === 'ats'
        ? '[Portfolio] ATS visited your site'
        : details.visitorType === 'bot'
          ? '[Portfolio] Bot visited your site'
          : '[Portfolio] Someone visited your site';

  const subjectSuffix = details.isNewUnique ? '' : ' (returning)';

  return {
    typeLabel: typeLabel,
    subject: subjectPrefix + subjectSuffix + (details.atsVendor ? ' — ' + details.atsVendor : ''),
    when: Utilities.formatDate(details.visitedAt, Session.getScriptTimeZone(), 'EEE, MMM d, yyyy h:mm a z'),
    referrerLabel: formatReferrerSource_(details.referrer),
    deviceLabel: formatDeviceLabel_(details.deviceType, details.userAgent),
    browserLabel: parseBrowserLabel_(details.userAgent),
  };
}

function formatReferrerSource_(referrer) {
  const value = String(referrer || 'direct').trim();
  if (!value || value === 'direct') return 'Direct / no referrer';

  try {
    const host = value.replace(/^https?:\/\//i, '').split('/')[0].toLowerCase();
    if (host.indexOf('google.') >= 0) return 'Google (' + host + ')';
    if (host.indexOf('linkedin.') >= 0) return 'LinkedIn (' + host + ')';
    if (host.indexOf('greenhouse.io') >= 0) return 'Greenhouse ATS';
    if (host.indexOf('lever.co') >= 0) return 'Lever ATS';
    if (host.indexOf('myworkdayjobs.com') >= 0 || host.indexOf('workday.com') >= 0) return 'Workday ATS';
    return host;
  } catch (error) {
    return value.slice(0, 120);
  }
}

function formatDeviceLabel_(deviceType, userAgent) {
  const ua = String(userAgent || '');
  let os = 'Unknown OS';

  if (/windows nt/i.test(ua)) os = 'Windows';
  else if (/mac os x|macintosh/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  const device = String(deviceType || 'desktop');
  return device.charAt(0).toUpperCase() + device.slice(1) + ' · ' + os;
}

function parseBrowserLabel_(userAgent) {
  const ua = String(userAgent || '');

  if (/edg\//i.test(ua)) return 'Microsoft Edge';
  if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) return 'Chrome';
  if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) return 'Safari';
  if (/firefox\//i.test(ua)) return 'Firefox';
  if (/linkedinbot/i.test(ua)) return 'LinkedIn crawler';
  if (/greenhouse/i.test(ua)) return 'Greenhouse crawler';

  return ua.slice(0, 80) || 'Unknown browser';
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
    visits.appendRow([
      'Timestamp',
      'VisitorId',
      'IsNewUnique',
      'Referrer',
      'Page',
      'UserAgent',
      'VisitorType',
      'VisitorConfidence',
      'AtsVendor',
      'ClassificationSignals',
    ]);
  } else {
    ensureVisitColumns_(visits);
  }

  let uniques = ss.getSheetByName(UNIQUES_SHEET);
  if (!uniques) {
    uniques = ss.insertSheet(UNIQUES_SHEET);
    uniques.appendRow(['VisitorId', 'FirstSeen', 'LastSeen', 'VisitCount', 'VisitorType', 'AtsVendor']);
  } else if (uniques.getLastColumn() < 6) {
    const headers = uniques.getRange(1, 1, 1, Math.max(uniques.getLastColumn(), 4)).getValues()[0];
    if (!headers[4]) uniques.getRange(1, 5).setValue('VisitorType');
    if (!headers[5]) uniques.getRange(1, 6).setValue('AtsVendor');
  }
}

function ensureVisitColumns_(visits) {
  const expected = [
    'Timestamp',
    'VisitorId',
    'IsNewUnique',
    'Referrer',
    'Page',
    'UserAgent',
    'VisitorType',
    'VisitorConfidence',
    'AtsVendor',
    'ClassificationSignals',
  ];

  if (visits.getLastRow() === 0) {
    visits.appendRow(expected);
    return;
  }

  const headers = visits.getRange(1, 1, 1, visits.getLastColumn()).getValues()[0];
  for (let i = 0; i < expected.length; i++) {
    if (!headers[i]) {
      visits.getRange(1, i + 1).setValue(expected[i]);
    }
  }
}

function normalizeVisitorType_(rawType, userAgent, referrer) {
  const value = String(rawType || '').toLowerCase().trim();
  if (value === 'human' || value === 'ats' || value === 'bot' || value === 'unknown') {
    return value;
  }

  const ua = String(userAgent || '').toLowerCase();
  const ref = String(referrer || '').toLowerCase();

  if (
    /greenhouse|lever|workday|taleo|icims|smartrecruiters|ashby|bamboohr|jazzhr|jobvite|successfactors|eightfold|phenom|workable|recruitee|breezy|bullhorn|applicant.?tracking|ats.?parser|resume.?parser/.test(
      ua
    ) ||
    /greenhouse\.io|lever\.co|myworkdayjobs\.com|icims\.com|smartrecruiters\.com|ashbyhq\.com|workable\.com|eightfold\.ai|phenom\.com/.test(
      ref
    )
  ) {
    return 'ats';
  }

  if (/bot|crawler|spider|headless|puppeteer|playwright|selenium|python-requests|curl\//.test(ua)) {
    return 'bot';
  }

  return 'unknown';
}

function getVisitorTypeStats_(visits, uniques) {
  const stats = {
    humanPageViews: 0,
    atsPageViews: 0,
    botPageViews: 0,
    unknownPageViews: 0,
    humanUniques: 0,
    atsUniques: 0,
    todayHumanPageViews: 0,
    todayAtsPageViews: 0,
  };

  const visitLastRow = visits.getLastRow();
  if (visitLastRow >= 2) {
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const rows = visits.getRange(2, 1, visitLastRow - 1, 7).getValues();

    rows.forEach(function (row) {
      const timestamp = row[0];
      const type = normalizeVisitorType_(row[6], row[5], row[3]);
      const isToday =
        timestamp &&
        Utilities.formatDate(new Date(timestamp), Session.getScriptTimeZone(), 'yyyy-MM-dd') === today;

      if (type === 'human') {
        stats.humanPageViews++;
        if (isToday) stats.todayHumanPageViews++;
      } else if (type === 'ats') {
        stats.atsPageViews++;
        if (isToday) stats.todayAtsPageViews++;
      } else if (type === 'bot') {
        stats.botPageViews++;
      } else {
        stats.unknownPageViews++;
      }
    });
  }

  const uniqueLastRow = uniques.getLastRow();
  if (uniqueLastRow >= 2) {
    const cols = Math.max(uniques.getLastColumn(), 5);
    const rows = uniques.getRange(2, 1, uniqueLastRow - 1, cols).getValues();
    rows.forEach(function (row) {
      const type = normalizeVisitorType_(row[4], '', '');
      if (type === 'human') stats.humanUniques++;
      if (type === 'ats') stats.atsUniques++;
    });
  }

  return stats;
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
