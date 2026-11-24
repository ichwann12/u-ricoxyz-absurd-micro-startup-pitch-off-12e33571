// Absurd Micro-Startup Pitch-Off — u-ricoxyz-absurd-micro-startup-pitch-off-12e33571
// Reads the one-sentence entry from entry.txt at the repo root and writes it
// to the output directory given by MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR.
// Node 22, stdlib only, no network, no wall clock.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));

const entryPath = join(repoRoot, "entry.txt");
const entry = readFileSync(entryPath, "utf8").trim();

if (entry.length === 0) {
  throw new Error("entry.txt is empty");
}
if (entry.length >= 200) {
  throw new Error(`entry is ${entry.length} characters, must be under 200`);
}

const outputDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outputDir, { recursive: true });

const outPath = join(outputDir, "entry.txt"); // same name as the source file
writeFileSync(outPath, entry + "\n", "utf8");
console.log(entry); // also echo the entry to stdout for the run log
