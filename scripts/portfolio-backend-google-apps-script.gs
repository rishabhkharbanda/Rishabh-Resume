/**
 * Portfolio backend — contact form + visit analytics (Google Sheets)
 *
 * Sheets: Visits (every page view), UniqueVisitors (one row per visitor), Contacts (form submissions)
 * Setup:
 * 1. https://script.google.com → New project → paste this file
 * 2. Project Settings → Script properties → add STATS_SECRET = your private PIN
 * 3. Run → authorizeSetup → Allow all permissions (creates analytics spreadsheet)
 * 4. Deploy → New deployment → Web app (Execute as: Me, Anyone)
 * 5. Optional: Triggers → Add → sendDailyVisitDigest → Day timer → 8am–9am
 * 6. Copy Web app URL → VITE_PORTFOLIO_API_URL (GitHub secret + .env)
 *
 * IMPORTANT: Pushing this repo does NOT update Apps Script. After pulling changes here,
 * paste this file into script.google.com and Deploy → Manage deployments → New version.
 */

const RECIPIENT_EMAIL = 'rishabhkharbanda08@gmail.com';

/** Run from Apps Script editor to recalculate visitor types in the sheet. */
function runRecalculateAnalytics() {
  const ss = getSpreadsheet_();
  const visits = ss.getSheetByName(VISITS_SHEET);
  const uniques = ss.getSheetByName(UNIQUES_SHEET);
  ensureSheetColumns_(visits, VISIT_HEADERS);
  ensureSheetColumns_(uniques, UNIQUE_HEADERS);
  const changed = recalculateAllVisitorTypes_(visits, true) + recalculateAllVisitorTypes_(uniques, false);
  Logger.log('Recalculated visitor types. Rows updated: ' + changed);
}

/** Run once from the Apps Script editor to grant spreadsheet + email permissions. */
function authorizeSetup() {
  const ss = getSpreadsheet_();
  Logger.log('Authorized. Analytics sheet: ' + ss.getUrl());
}
const VISITS_SHEET = 'Visits';
const UNIQUES_SHEET = 'UniqueVisitors';
const CONTACTS_SHEET = 'Contacts';

const VISIT_HEADERS = [
  'Timestamp',
  'VisitorId',
  'IsNewUnique',
  'VisitNumber',
  'Referrer',
  'Page',
  'UserAgent',
  'VisitorType',
  'VisitorConfidence',
  'AtsVendor',
  'ClassificationSignals',
  'VisitorLanguage',
  'VisitorTimezone',
  'ScreenSize',
  'DeviceType',
  'Browser',
  'DeviceLabel',
  'ReferrerSource',
  'VisitorIp',
  'VisitorCity',
  'VisitorRegion',
  'VisitorCountry',
];

const UNIQUE_HEADERS = [
  'VisitorId',
  'FirstSeen',
  'LastSeen',
  'VisitCount',
  'VisitorType',
  'AtsVendor',
  'VisitorConfidence',
  'ClassificationSignals',
  'FirstReferrer',
  'LastReferrer',
  'LastPage',
  'UserAgent',
  'VisitorLanguage',
  'VisitorTimezone',
  'ScreenSize',
  'DeviceType',
  'Browser',
  'DeviceLabel',
  'ReferrerSource',
  'VisitorIp',
  'VisitorCity',
  'VisitorRegion',
  'VisitorCountry',
];

const CONTACT_HEADERS = ['Timestamp', 'Name', 'Email', 'Subject', 'Message'];
const BACKEND_VERSION = 5;

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
        backendVersion: BACKEND_VERSION,
        features: ['humanAtsStats', 'fullSheetLogging', 'contactLogging'],
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

    logContactToSheet_({
      name: name,
      email: email,
      subject: subject,
      message: message,
      submittedAt: new Date(),
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

    const ss = getSpreadsheet_();
    const visits = ss.getSheetByName(VISITS_SHEET);
    const uniques = ss.getSheetByName(UNIQUES_SHEET);
    ensureSheetColumns_(visits, VISIT_HEADERS);
    ensureSheetColumns_(uniques, UNIQUE_HEADERS);

    const row = findVisitorRow_(uniques, visitorId);
    const isNewUnique = row === -1;
    const visitCountCol =
      getSheetColumnIndex_(uniques, 'VisitCount', UNIQUE_HEADERS.indexOf('VisitCount')) + 1;
    const visitCount = isNewUnique
      ? 1
      : (Number(uniques.getRange(row, visitCountCol).getValue()) || 0) + 1;

    const details = buildVisitDetails_(params, {
      visitorId: visitorId,
      isNewUnique: isNewUnique,
      visitCount: visitCount,
      visitedAt: new Date(),
    });

    appendVisitRow_(visits, details);
    upsertUniqueVisitor_(uniques, row, details);

    notifyVisit_(details);

    return jsonResponse_(
      {
        result: 'success',
        isNewUnique: isNewUnique,
        visitorType: details.visitorType,
        uniqueVisitors: Math.max(0, uniques.getLastRow() - 1),
        totalPageViews: Math.max(0, visits.getLastRow() - 1),
      },
      callback
    );
  } catch (error) {
    return jsonResponse_({ result: 'error', message: String(error) }, callback);
  }
}

function buildVisitDetails_(params, meta) {
  const referrer = String(params.referrer || 'direct').slice(0, 500);
  const page = String(params.page || '/').slice(0, 200);
  const userAgent = String(params.userAgent || '').slice(0, 300);
  const visitorType = normalizeVisitorType_(
    params.visitorType,
    userAgent,
    referrer,
    page,
    String(params.classificationSignals || '')
  );
  const deviceType = String(params.deviceType || '').slice(0, 20);

  return {
    visitorId: meta.visitorId,
    isNewUnique: meta.isNewUnique,
    visitCount: meta.visitCount,
    visitedAt: meta.visitedAt,
    referrer: referrer,
    page: page,
    userAgent: userAgent,
    visitorType: visitorType,
    visitorConfidence: String(params.visitorConfidence || '').slice(0, 20),
    atsVendor: String(params.atsVendor || '').slice(0, 80),
    classificationSignals: String(params.classificationSignals || '').slice(0, 200),
    visitorLanguage: String(params.visitorLanguage || '').slice(0, 20),
    visitorTimezone: String(params.visitorTimezone || '').slice(0, 60),
    screenSize: String(params.screenSize || '').slice(0, 20),
    deviceType: deviceType,
    browserLabel: parseBrowserLabel_(userAgent),
    deviceLabel: formatDeviceLabel_(deviceType, userAgent),
    referrerLabel: formatReferrerSource_(referrer),
    visitorIp: String(params.visitorIp || '').slice(0, 45),
    visitorCity: String(params.visitorCity || '').slice(0, 80),
    visitorRegion: String(params.visitorRegion || '').slice(0, 80),
    visitorCountry: String(params.visitorCountry || '').slice(0, 80),
  };
}

function visitValueMap_(details) {
  return {
    Timestamp: details.visitedAt,
    VisitorId: details.visitorId,
    IsNewUnique: details.isNewUnique,
    VisitNumber: details.visitCount,
    Referrer: details.referrer,
    Page: details.page,
    UserAgent: details.userAgent,
    VisitorType: details.visitorType,
    VisitorConfidence: details.visitorConfidence,
    AtsVendor: details.atsVendor,
    ClassificationSignals: details.classificationSignals,
    VisitorLanguage: details.visitorLanguage,
    VisitorTimezone: details.visitorTimezone,
    ScreenSize: details.screenSize,
    DeviceType: details.deviceType,
    Browser: details.browserLabel,
    DeviceLabel: details.deviceLabel,
    ReferrerSource: details.referrerLabel,
    VisitorIp: details.visitorIp,
    VisitorCity: details.visitorCity,
    VisitorRegion: details.visitorRegion,
    VisitorCountry: details.visitorCountry,
  };
}

function uniqueValueMap_(details, options) {
  const firstReferrer = options && options.firstReferrer ? options.firstReferrer : details.referrer;
  return {
    VisitorId: details.visitorId,
    FirstSeen: details.visitedAt,
    LastSeen: details.visitedAt,
    VisitCount: options && options.isNew ? 1 : details.visitCount,
    VisitorType: details.visitorType,
    AtsVendor: details.atsVendor,
    VisitorConfidence: details.visitorConfidence,
    ClassificationSignals: details.classificationSignals,
    FirstReferrer: firstReferrer,
    LastReferrer: details.referrer,
    LastPage: details.page,
    UserAgent: details.userAgent,
    VisitorLanguage: details.visitorLanguage,
    VisitorTimezone: details.visitorTimezone,
    ScreenSize: details.screenSize,
    DeviceType: details.deviceType,
    Browser: details.browserLabel,
    DeviceLabel: details.deviceLabel,
    ReferrerSource: details.referrerLabel,
    VisitorIp: details.visitorIp,
    VisitorCity: details.visitorCity,
    VisitorRegion: details.visitorRegion,
    VisitorCountry: details.visitorCountry,
  };
}

function appendVisitRow_(visits, details) {
  visits.appendRow(buildRowForSheet_(visits, visitValueMap_(details)));
}

function upsertUniqueVisitor_(uniques, row, details) {
  if (row === -1) {
    uniques.appendRow(buildRowForSheet_(uniques, uniqueValueMap_(details, { isNew: true })));
    return;
  }

  const firstReferrerCol = getSheetColumnIndex_(uniques, 'FirstReferrer', UNIQUE_HEADERS.indexOf('FirstReferrer')) + 1;
  const firstReferrer =
    firstReferrerCol > 0 ? uniques.getRange(row, firstReferrerCol).getValue() || details.referrer : details.referrer;

  updateSheetRowByHeaders_(uniques, row, uniqueValueMap_(details, { firstReferrer: firstReferrer }), [
    'VisitorId',
    'FirstSeen',
  ]);
}

function logContactToSheet_(contact) {
  try {
    const ss = getSpreadsheet_();
    let contacts = ss.getSheetByName(CONTACTS_SHEET);
    if (!contacts) {
      contacts = ss.insertSheet(CONTACTS_SHEET);
      contacts.appendRow(CONTACT_HEADERS);
    } else {
      ensureSheetColumns_(contacts, CONTACT_HEADERS);
    }

    contacts.appendRow(
      buildRowForSheet_(contacts, {
        Timestamp: contact.submittedAt,
        Name: contact.name,
        Email: contact.email,
        Subject: contact.subject,
        Message: contact.message,
      })
    );
  } catch (error) {
    // Non-blocking if sheet logging fails
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
    ensureSheetColumns_(visits, VISIT_HEADERS);
    ensureSheetColumns_(uniques, UNIQUE_HEADERS);
    repairVisitorTypes_(visits, true);
    repairVisitorTypes_(uniques, false);

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
        botUniques: typeStats.botUniques,
        unknownUniques: typeStats.unknownUniques,
        todayHumanPageViews: typeStats.todayHumanPageViews,
        todayAtsPageViews: typeStats.todayAtsPageViews,
        backendVersion: BACKEND_VERSION,
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
        'Timezone: ' + (details.visitorTimezone || 'unknown') + '\n' +
        'IP address: ' + (details.visitorIp || 'unknown') + '\n' +
        'Location: ' + formatVisitorLocation_(details) + '\n\n' +
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

function formatVisitorLocation_(details) {
  const parts = [details.visitorCity, details.visitorRegion, details.visitorCountry].filter(function (part) {
    return part && String(part).trim().length > 0;
  });

  if (parts.length === 0) return 'unknown';
  return parts.join(', ');
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
  setupSheets_(ss);
  return ss;
}

function setupSheets_(ss) {
  let visits = ss.getSheetByName(VISITS_SHEET);
  if (!visits) {
    visits = ss.insertSheet(VISITS_SHEET);
    visits.appendRow(VISIT_HEADERS);
  } else {
    ensureSheetColumns_(visits, VISIT_HEADERS);
  }

  let uniques = ss.getSheetByName(UNIQUES_SHEET);
  if (!uniques) {
    uniques = ss.insertSheet(UNIQUES_SHEET);
    uniques.appendRow(UNIQUE_HEADERS);
  } else {
    ensureSheetColumns_(uniques, UNIQUE_HEADERS);
  }

  let contacts = ss.getSheetByName(CONTACTS_SHEET);
  if (!contacts) {
    contacts = ss.insertSheet(CONTACTS_SHEET);
    contacts.appendRow(CONTACT_HEADERS);
  } else {
    ensureSheetColumns_(contacts, CONTACT_HEADERS);
  }
}

function ensureSheetColumns_(sheet, expectedHeaders) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(expectedHeaders);
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headerSet = {};
  currentHeaders.forEach(function (header) {
    if (header) headerSet[String(header)] = true;
  });

  let nextColumn = currentHeaders.length;
  expectedHeaders.forEach(function (header) {
    if (!headerSet[header]) {
      nextColumn += 1;
      sheet.getRange(1, nextColumn).setValue(header);
      headerSet[header] = true;
    }
  });
}

function getSheetHeaders_(sheet) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (header) {
    return String(header || '').trim();
  });
}

function getSheetColumnIndex_(sheet, headerName, fallbackIndex) {
  const headers = getSheetHeaders_(sheet);
  for (let i = 0; i < headers.length; i++) {
    if (headers[i] === headerName) return i;
  }
  return typeof fallbackIndex === 'number' ? fallbackIndex : -1;
}

function buildRowForSheet_(sheet, valueByHeader) {
  const headers = getSheetHeaders_(sheet);
  return headers.map(function (header) {
    return Object.prototype.hasOwnProperty.call(valueByHeader, header) ? valueByHeader[header] : '';
  });
}

function updateSheetRowByHeaders_(sheet, row, valueByHeader, skipHeaders) {
  const headers = getSheetHeaders_(sheet);
  const skip = {};
  (skipHeaders || []).forEach(function (header) {
    skip[header] = true;
  });

  headers.forEach(function (header, index) {
    if (skip[header]) return;
    if (Object.prototype.hasOwnProperty.call(valueByHeader, header)) {
      sheet.getRange(row, index + 1).setValue(valueByHeader[header]);
    }
  });
}

function getVisitColumnIndex_(headerName) {
  return VISIT_HEADERS.indexOf(headerName);
}

function getLegacyVisitTypeIndex_(sheet) {
  if (getSheetColumnIndex_(sheet, 'VisitNumber', -1) >= 0) return -1;
  return getSheetColumnIndex_(sheet, 'VisitorType', 6);
}

function findCellInRow_(row, matcher) {
  for (let i = 0; i < row.length; i++) {
    const value = row[i];
    if (matcher(value)) return { index: i, value: value };
  }
  return { index: -1, value: '' };
}

function findUserAgentInRow_(row) {
  const match = findCellInRow_(row, function (value) {
    return /mozilla\/5\.0/i.test(String(value || ''));
  });
  return String(match.value || '');
}

function findReferrerInRow_(row) {
  const match = findCellInRow_(row, function (value) {
    const text = String(value || '').trim();
    if (!text || text === 'true' || text === 'false') return false;
    if (/^\d+$/.test(text)) return false;
    if (/mozilla\/5\.0/i.test(text)) return false;
    if (/^(human|ats|bot|unknown|high|medium|low)$/i.test(text)) return false;
    return /direct|https?:\/\/|linkedin|google|\.io|\.com/i.test(text);
  });
  return String(match.value || 'direct');
}

function findVisitorTypeInRow_(row) {
  const match = findCellInRow_(row, function (value) {
    const text = String(value || '').toLowerCase().trim();
    return text === 'human' || text === 'ats' || text === 'bot' || text === 'unknown';
  });
  return String(match.value || '');
}

function getRowIndices_(sheet, isVisitsSheet) {
  return {
    type: getSheetColumnIndex_(
      sheet,
      'VisitorType',
      isVisitsSheet ? getVisitColumnIndex_('VisitorType') : UNIQUE_HEADERS.indexOf('VisitorType')
    ),
    ua: getSheetColumnIndex_(
      sheet,
      'UserAgent',
      isVisitsSheet ? getVisitColumnIndex_('UserAgent') : UNIQUE_HEADERS.indexOf('UserAgent')
    ),
    ref: getSheetColumnIndex_(
      sheet,
      isVisitsSheet ? 'Referrer' : 'LastReferrer',
      isVisitsSheet ? getVisitColumnIndex_('Referrer') : UNIQUE_HEADERS.indexOf('LastReferrer')
    ),
    page: getSheetColumnIndex_(
      sheet,
      isVisitsSheet ? 'Page' : 'LastPage',
      isVisitsSheet ? getVisitColumnIndex_('Page') : UNIQUE_HEADERS.indexOf('LastPage')
    ),
    signals: getSheetColumnIndex_(
      sheet,
      'ClassificationSignals',
      isVisitsSheet
        ? getVisitColumnIndex_('ClassificationSignals')
        : UNIQUE_HEADERS.indexOf('ClassificationSignals')
    ),
  };
}

function hasConfirmedHumanSignals_(signalsText) {
  return /behavior:(interaction|pointer-move)/i.test(String(signalsText || ''));
}

function hasLegacyAutoHumanSignals_(signalsText) {
  const signals = String(signalsText || '');
  if (/behavior:/i.test(signals)) return false;
  return /ua:browser|lang:present|pointer:present|screen:present|webdriver:false/i.test(signals);
}

function resolveStoredVisitorType_(storedType, userAgent, referrer, page, signalsText) {
  if (matchesAtsSignals_(userAgent, referrer, page)) return 'ats';
  if (matchesBotSignals_(userAgent)) return 'bot';
  if (hasConfirmedHumanSignals_(signalsText)) return 'human';

  const stored = String(storedType || '').toLowerCase().trim();
  if (stored === 'ats' || stored === 'bot') return stored;
  if (stored === 'human') {
    if (hasLegacyAutoHumanSignals_(signalsText) || !String(signalsText || '').trim()) return 'unknown';
    return 'human';
  }

  return 'unknown';
}

function inferVisitorTypeFromRow_(row, indices) {
  let userAgent = findUserAgentInRow_(row);
  if (!userAgent && indices.ua >= 0) userAgent = row[indices.ua];

  let referrer = findReferrerInRow_(row);
  if ((!referrer || referrer === 'direct') && indices.ref >= 0 && row[indices.ref]) {
    referrer = row[indices.ref];
  }

  const page = indices.page >= 0 ? String(row[indices.page] || '') : '';
  const signals = indices.signals >= 0 ? String(row[indices.signals] || '') : '';

  let stored = '';
  if (indices.type >= 0) stored = String(row[indices.type] || '').toLowerCase().trim();
  if (!stored || /^(high|medium|low)$/.test(stored)) {
    stored = findVisitorTypeInRow_(row).toLowerCase();
  }

  return resolveStoredVisitorType_(stored, userAgent, referrer, page, signals);
}

function matchesAtsSignals_(userAgent, referrer, page) {
  const ua = String(userAgent || '').toLowerCase();
  const ref = String(referrer || '').toLowerCase();
  const path = String(page || '').toLowerCase();

  if (
    /greenhouse|lever|workday|taleo|icims|smartrecruiters|ashby|bamboohr|jazzhr|jobvite|successfactors|eightfold|phenom|workable|recruitee|breezy|bullhorn|teamtailor|pinpoint|comeet|freshteam|hireez|hiretual|seekout|beamery|personio|rippling|brassring|applicant.?tracking|ats.?parser|resume.?parser|resume.?screen|hirevue/.test(
      ua
    )
  ) {
    return true;
  }

  if (
    /greenhouse\.io|grnh\.se|boards\.greenhouse|lever\.co|jobs\.lever|myworkdayjobs\.com|workday\.com|icims\.com|smartrecruiters\.com|ashbyhq\.com|jobs\.ashbyhq|bamboohr\.com|jazzhr\.com|jazz\.co|jobvite\.com|workable\.com|apply\.workable|recruitee\.com|eightfold\.ai|phenom\.com|teamtailor\.com|pinpointhq\.com|comeet\.co|freshteam\.com|taleo\.net|oraclecloud\.com|brassring\.com|successfactors\.com|gem\.com|hireez\.com|hiretual\.com|linkedin\.com\/(jobs|talent|recruiter)|indeed\.com|glassdoor\.com|monster\.com|naukri\.com|shine\.com/.test(
      ref
    )
  ) {
    return true;
  }

  if (/utm_source=(greenhouse|lever|workday|icims|ashby|smartrecruiters)|gh_jid|gh_src|lever-|workday|icims/.test(path)) {
    return true;
  }

  return false;
}

function matchesBotSignals_(userAgent) {
  const ua = String(userAgent || '').toLowerCase();
  return /googlebot|google-inspectiontool|bingbot|slurp|duckduckbot|baiduspider|yandexbot|petalbot|bytespider|facebookexternalhit|meta-externalagent|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|headlesschrome|headless chrome|phantomjs|puppeteer|playwright|selenium|webdriver|lighthouse|python-requests|curl\/|wget\/|scrapy|httpclient|go-http|java\/|libwww|okhttp|gptbot|chatgpt-user|claudebot|anthropic-ai|cohere-ai|perplexitybot|amazonbot|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|\b(bot|crawler|spider|scraper|archiver|preview)\b/.test(
    ua
  );
}

function recalculateAllVisitorTypes_(sheet, isVisitsSheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const typeCol = getSheetColumnIndex_(sheet, 'VisitorType', isVisitsSheet ? 6 : 4) + 1;
  if (typeCol <= 0) return 0;

  const indices = getRowIndices_(sheet, isVisitsSheet);
  const colCount = Math.max(sheet.getLastColumn(), isVisitsSheet ? VISIT_HEADERS.length : UNIQUE_HEADERS.length);
  const numRows = lastRow - 1;
  const rows = sheet.getRange(2, 1, numRows, colCount).getValues();
  let changed = 0;

  rows.forEach(function (row, index) {
    const current = indices.type >= 0 ? String(row[indices.type] || '').toLowerCase().trim() : '';
    const inferred = inferVisitorTypeFromRow_(row, indices);
    if (current !== inferred) {
      sheet.getRange(index + 2, typeCol).setValue(inferred);
      changed++;
    }
  });

  return changed;
}

function repairVisitorTypes_(sheet, isVisitsSheet) {
  return recalculateAllVisitorTypes_(sheet, isVisitsSheet);
}

function ensureVisitColumns_(visits) {
  ensureSheetColumns_(visits, VISIT_HEADERS);
}

function normalizeVisitorType_(rawType, userAgent, referrer, page, signalsText) {
  return resolveStoredVisitorType_(rawType, userAgent, referrer, page, signalsText);
}

function getVisitorTypeStats_(visits, uniques) {
  const stats = {
    humanPageViews: 0,
    atsPageViews: 0,
    botPageViews: 0,
    unknownPageViews: 0,
    humanUniques: 0,
    atsUniques: 0,
    botUniques: 0,
    unknownUniques: 0,
    todayHumanPageViews: 0,
    todayAtsPageViews: 0,
  };

  const visitLastRow = visits.getLastRow();
  if (visitLastRow >= 2) {
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const colCount = Math.max(visits.getLastColumn(), VISIT_HEADERS.length);
    const numRows = visitLastRow - 1;
    const rows = visits.getRange(2, 1, numRows, colCount).getValues();
    const indices = getRowIndices_(visits, true);

    rows.forEach(function (row) {
      const timestamp = row[0];
      const type = inferVisitorTypeFromRow_(row, indices);
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
    const cols = Math.max(uniques.getLastColumn(), UNIQUE_HEADERS.length);
    const numRows = uniqueLastRow - 1;
    const rows = uniques.getRange(2, 1, numRows, cols).getValues();
    const indices = getRowIndices_(uniques, false);
    rows.forEach(function (row) {
      const type = inferVisitorTypeFromRow_(row, indices);
      if (type === 'human') stats.humanUniques++;
      else if (type === 'ats') stats.atsUniques++;
      else if (type === 'bot') stats.botUniques++;
      else stats.unknownUniques++;
    });
  }

  return stats;
}

function findVisitorRow_(sheet, visitorId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const idCol = getSheetColumnIndex_(sheet, 'VisitorId', 0) + 1;
  const numRows = lastRow - 1;
  const values = sheet.getRange(2, idCol, numRows, 1).getValues();
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
  const colCount = Math.max(sheet.getLastColumn(), 3);
  const numRows = lastRow - 1;
  const rows = sheet.getRange(2, 1, numRows, colCount).getValues();
  const isNewIndex = getSheetColumnIndex_(sheet, 'IsNewUnique', 2);
  let count = 0;

  rows.forEach(function (row) {
    const value = row[0];
    const isNew = row[isNewIndex] === true || String(row[isNewIndex]).toLowerCase() === 'true';
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
