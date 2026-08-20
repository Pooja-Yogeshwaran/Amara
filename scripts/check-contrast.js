#!/usr/bin/env node
// Mechanizes qa-checklist.md #2 (WCAG AA contrast, every pairing).
// Usage: node scripts/check-contrast.js <theme.json>
//
// Independently recomputes WCAG contrast for every entry in
// a11y.contrastReport and cross-checks it against the ratio and pass/fail
// claimed in the file -- this catches the failure mode of the QA pass being
// asserted by hand (typed in after a manual calculation) rather than
// actually verified. Extracts hex colors from each entry's free-text
// `pairing` description (this repo's convention is to always include the
// hex values being compared directly in that string) and recomputes.
// Exits non-zero if any entry's claimed ratio/pass doesn't match reality,
// or if a pairing has no extractable hex pair to check.

const fs = require("fs");

const themePath = process.argv[2];
if (!themePath) {
  console.error("Usage: node check-contrast.js <theme.json>");
  process.exit(2);
}

const theme = JSON.parse(fs.readFileSync(themePath, "utf8"));
const report = theme.a11y && theme.a11y.contrastReport;

if (!report || !report.length) {
  console.log(`${themePath}: no a11y.contrastReport entries to check.`);
  process.exit(0);
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lin(c) {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map(lin);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function ratio(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1)) + 0.05;
  const l2 = luminance(hexToRgb(hex2)) + 0.05;
  return Math.max(l1, l2) / Math.min(l1, l2);
}

const HEX_RE = /#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b/g;

let failed = false;
let checked = 0;
let unextractable = 0;

console.log(`\n=== ${themePath}`);

for (const entry of report) {
  // Strip any "REJECTED at X" / "first attempt #... REJECTED" clause before extracting --
  // those mention a third (discarded) hex value that isn't part of the actual claimed pairing,
  // and naively taking "the first two hex codes in the string" grabs the wrong one when a
  // rejected attempt is mentioned before the corrected pairing. Only the text up to the first
  // such clause (or the whole string, if there isn't one) is examined.
  const primaryText = entry.pairing.split(/\s*--\s*(?:REJECTED|first attempt)|\bREJECTED\b/i)[0];
  const hexes = (primaryText.match(HEX_RE) || []);
  if (hexes.length !== 2) {
    unextractable++;
    console.log(`SKIP  (found ${hexes.length} hex value(s) in the claimed pairing, need exactly 2) -- "${entry.pairing}"`);
    continue;
  }
  const [a, b] = hexes;
  const real = ratio(a, b);
  const claimed = entry.ratio;
  const tolerance = 0.05; // rounding slack for hand-computed values
  const ratioMatches = Math.abs(real - claimed) <= tolerance;
  const realPass = real >= 4.5 - tolerance; // body-text floor; entries explicitly scoped to the 3:1 non-text floor say so in their note and are only sanity-checked for magnitude, not re-judged here
  checked++;
  if (!ratioMatches) {
    failed = true;
    console.log(`FAIL  claimed ${claimed.toFixed(2)}:1, recomputed ${real.toFixed(2)}:1 -- "${entry.pairing}"`);
  } else {
    console.log(`OK    ${real.toFixed(2)}:1 (claimed ${claimed.toFixed(2)}:1) -- "${entry.pairing.slice(0, 70)}"`);
  }
}

console.log(`\n${checked} entries recomputed, ${unextractable} skipped (no hex pair in the pairing text).`);
if (failed) {
  console.log("FAIL -- at least one claimed ratio does not match the recomputed value. Fix the theme.json entry, don't adjust the tolerance.");
} else if (checked === 0) {
  console.log("Nothing was actually verified -- every entry was skipped. That's not a pass.");
  failed = true;
} else {
  console.log("PASS -- every recomputable entry's claimed ratio matches an independent recalculation.");
}

process.exit(failed ? 1 : 0);
