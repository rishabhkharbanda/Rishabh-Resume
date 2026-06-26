#!/usr/bin/env node
/**
 * Validates analytics sheet column alignment and client ↔ backend field coverage.
 * Run: npm test
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const gsPath = join(root, 'scripts/portfolio-backend-google-apps-script.gs');
const apiPath = join(root, 'src/config/api.ts');

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function extractStringArray(source, name) {
  const match = source.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
  if (!match) throw new Error(`Could not find ${name} in Apps Script file`);
  return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

function countAppendRowValues(source, functionName) {
  const fnMatch = source.match(
    new RegExp(`function ${functionName}\\([\\s\\S]*?appendRow\\(\\[([\\s\\S]*?)\\]\\)`)
  );
  if (!fnMatch) throw new Error(`Could not find appendRow in ${functionName}`);
  const body = fnMatch[1];
  return body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('//'))
    .length;
}

function countUpsertUpdateValues(source) {
  const match = source.match(/uniques\.getRange\(row, 3, 1, updateColCount\)\.setValues\(\[\[([\s\S]*?)\]\]\)/);
  if (!match) throw new Error('Could not find unique visitor update row');
  return match[1]
    .split('\n')
    .map((line) => line.trim().replace(/,$/, ''))
    .filter((line) => line && !line.startsWith('//'))
    .length;
}

function extractVisitPayloadKeys(source) {
  const match = source.match(/jsonpRequest<ApiResponse>\(PORTFOLIO_API_URL, \{([\s\S]*?)\}\);/);
  if (!match) throw new Error('Could not find trackVisit payload in api.ts');
  return [...match[1].matchAll(/^\s*([a-zA-Z]+):/gm)].map((m) => m[1]);
}

function extractBackendParamKeys(source) {
  return [...source.matchAll(/params\.([a-zA-Z]+)/g)].map((m) => m[1]);
}

const gs = readFileSync(gsPath, 'utf8');
const api = readFileSync(apiPath, 'utf8');

const visitHeaders = extractStringArray(gs, 'VISIT_HEADERS');
const uniqueHeaders = extractStringArray(gs, 'UNIQUE_HEADERS');
const contactHeaders = extractStringArray(gs, 'CONTACT_HEADERS');

const visitRowCount = countAppendRowValues(gs, 'appendVisitRow_');
const uniqueInsertCount = countAppendRowValues(gs, 'upsertUniqueVisitor_');
const uniqueUpdateCount = countUpsertUpdateValues(gs);
const contactRowCount = countAppendRowValues(gs, 'logContactToSheet_');

if (visitHeaders.length === visitRowCount) {
  pass(`Visits sheet: ${visitHeaders.length} headers match ${visitRowCount} row values`);
} else {
  fail(`Visits sheet mismatch: ${visitHeaders.length} headers vs ${visitRowCount} row values`);
}

if (uniqueHeaders.length === uniqueInsertCount) {
  pass(`UniqueVisitors insert: ${uniqueHeaders.length} headers match ${uniqueInsertCount} row values`);
} else {
  fail(`UniqueVisitors insert mismatch: ${uniqueHeaders.length} headers vs ${uniqueInsertCount} row values`);
}

const expectedUpdateCols = uniqueHeaders.length - 2;
if (uniqueUpdateCount === expectedUpdateCols) {
  pass(`UniqueVisitors update: ${uniqueUpdateCount} values for columns 3–${uniqueHeaders.length}`);
} else {
  fail(`UniqueVisitors update mismatch: expected ${expectedUpdateCols} values, found ${uniqueUpdateCount}`);
}

if (contactHeaders.length === contactRowCount) {
  pass(`Contacts sheet: ${contactHeaders.length} headers match ${contactRowCount} row values`);
} else {
  fail(`Contacts sheet mismatch: ${contactHeaders.length} headers vs ${contactRowCount} row values`);
}

const duplicateVisitHeaders = visitHeaders.filter((h, i) => visitHeaders.indexOf(h) !== i);
const duplicateUniqueHeaders = uniqueHeaders.filter((h, i) => uniqueHeaders.indexOf(h) !== i);
if (duplicateVisitHeaders.length === 0 && duplicateUniqueHeaders.length === 0) {
  pass('Sheet headers are unique');
} else {
  fail(`Duplicate headers found: ${[...duplicateVisitHeaders, ...duplicateUniqueHeaders].join(', ')}`);
}

const clientKeys = extractVisitPayloadKeys(api).filter((key) => key !== 'action');
const backendKeys = [
  ...new Set(
    extractBackendParamKeys(gs).filter((key) =>
      [
        'visitorId',
        'page',
        'referrer',
        'userAgent',
        'visitorType',
        'visitorConfidence',
        'atsVendor',
        'classificationSignals',
        'visitorLanguage',
        'visitorTimezone',
        'screenSize',
        'deviceType',
        'visitorIp',
        'visitorCity',
        'visitorRegion',
        'visitorCountry',
      ].includes(key)
    )
  ),
];

const missingOnClient = backendKeys.filter((key) => !clientKeys.includes(key));
const missingOnBackend = clientKeys.filter((key) => !backendKeys.includes(key));

if (missingOnClient.length === 0 && missingOnBackend.length === 0) {
  pass(`Client sends all ${clientKeys.length} analytics fields consumed by the backend`);
} else {
  if (missingOnClient.length) fail(`Backend expects fields not sent by client: ${missingOnClient.join(', ')}`);
  if (missingOnBackend.length) fail(`Client sends fields not read by backend: ${missingOnBackend.join(', ')}`);
}

if (process.exitCode) {
  console.error('\nAnalytics check failed.');
  process.exit(process.exitCode);
}

console.log('\nAll analytics checks passed.');
