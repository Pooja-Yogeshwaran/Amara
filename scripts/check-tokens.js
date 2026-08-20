#!/usr/bin/env node
// Mechanizes qa-checklist.md #1 (spacing on-grid) and #3 (type scale discipline).
// Usage: node scripts/check-tokens.js <theme.json> <preview.html> [--exclude=selA,selB,...]
//
// Parses the page's <style> block into individual rules, drops any rule whose
// selector is in --exclude (the surrounding documentation-page chrome: intro
// text, kicker labels, the token-strip demo -- none of that is "the generated
// system", only the widget markup is), then checks every remaining px value
// used in padding/margin/gap and font-size against the theme's declared
// spacing.scale / typography.scale. Also checks inline style="..." attributes.
// Exits non-zero on failure.

const fs = require("fs");

const args = process.argv.slice(2);
const excludeFlag = args.find((a) => a.startsWith("--exclude="));
const excludeSelectors = new Set(excludeFlag ? excludeFlag.split("=")[1].split(",") : []);
const [themePath, htmlPath] = args.filter((a) => !a.startsWith("--"));
if (!themePath || !htmlPath) {
  console.error("Usage: node check-tokens.js <theme.json> <preview.html> [--exclude=selA,selB,...]");
  process.exit(2);
}

const theme = JSON.parse(fs.readFileSync(themePath, "utf8"));
const html = fs.readFileSync(htmlPath, "utf8");

const spacingScale = new Set((theme.spacing?.scale || []).map(Number));
const typeScale = new Set((theme.typography?.scale || []).map((s) => Number(s.px)));

const styleTagMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const styleBody = (styleTagMatch ? styleTagMatch[1] : "").replace(/\/\*[\s\S]*?\*\//g, "");

// Split the stylesheet into { selector, decls } rules, drop excluded selectors.
const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
let ruleMatch;
const keptDecls = [];
const droppedSelectors = [];
while ((ruleMatch = ruleRe.exec(styleBody))) {
  const selector = ruleMatch[1].trim();
  const decls = ruleMatch[2];
  if (excludeSelectors.has(selector)) {
    droppedSelectors.push(selector);
    continue;
  }
  keptDecls.push(decls);
}

// Inline style="..." attributes always count (rare in these files, but real when present).
const inlineDecls = [...html.matchAll(/style="([^"]*)"/g)].map((m) => m[1]);

const css = [...keptDecls, ...inlineDecls].join(";\n");

function findValues(css, propNames) {
  const propAlt = propNames.join("|");
  const re = new RegExp(`(?:^|[;{])\\s*(?:${propAlt})\\s*:\\s*([^;{}]+)`, "gi");
  const found = [];
  let m;
  while ((m = re.exec(css))) {
    for (const n of m[1].matchAll(/(-?\d+(?:\.\d+)?)px/g)) {
      found.push({ value: Number(n[1]), context: m[0].trim().slice(0, 70) });
    }
  }
  return found;
}

const spacingProps = ["padding(?:-\\w+)?", "margin(?:-\\w+)?", "gap", "row-gap", "column-gap"];
const spacingHits = findValues(css, spacingProps);
const fontSizeHits = findValues(css, ["font-size"]);

let failed = false;

console.log(`\n=== ${htmlPath}`);
if (excludeSelectors.size) {
  console.log(`excluded ${droppedSelectors.length}/${excludeSelectors.size} requested selectors (doc-page chrome, not part of the generated system): ${droppedSelectors.join(", ")}`);
}
console.log(`spacing.scale: [${[...spacingScale].join(", ")}]`);
console.log(`typography.scale px: [${[...typeScale].join(", ")}]`);

const spacingOffScale = spacingHits.filter((h) => !spacingScale.has(Math.abs(h.value)) && h.value !== 0);
const uniqueOffSpacing = [...new Map(spacingOffScale.map((h) => [h.value, h])).values()];
if (uniqueOffSpacing.length) {
  failed = true;
  console.log(`\nFAIL -- spacing values not in spacing.scale (${uniqueOffSpacing.length} distinct):`);
  for (const h of uniqueOffSpacing) console.log(`  ${h.value}px  <-  ${h.context}`);
} else {
  console.log(`PASS -- every padding/margin/gap value traces to spacing.scale (${spacingHits.length} declarations checked)`);
}

const distinctFontSizes = [...new Set(fontSizeHits.map((h) => h.value))];
const fontOffScale = distinctFontSizes.filter((v) => !typeScale.has(v));
console.log(`\ndistinct font-size values used: [${distinctFontSizes.sort((a, b) => a - b).join(", ")}] (${distinctFontSizes.length} of them)`);
if (distinctFontSizes.length > 5) {
  failed = true;
  console.log(`FAIL -- more than 5 distinct sizes on screen (qa-checklist.md #3 caps this at 5)`);
}
if (fontOffScale.length) {
  failed = true;
  console.log(`FAIL -- sizes not present in typography.scale: [${fontOffScale.join(", ")}]`);
} else {
  console.log(`PASS -- every font-size used matches a declared typography.scale step`);
}

process.exit(failed ? 1 : 0);
