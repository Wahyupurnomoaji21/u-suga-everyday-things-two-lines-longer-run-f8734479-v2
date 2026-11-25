// Everyday Things, Two Lines, Longer Run — v2 entry.
// Writes exactly two lines to /output/entry.txt:
//   Line 1 explains rain to a 10-year-old through ONE analogy:
//   the sky shaking out a giant wet blanket.
//   Line 2 says honestly what the analogy maps and what it leaves out.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE_1 =
  "Rain is the sky shaking a giant wet blanket over our heads until the water falls out of it in drops.";
const LINE_2 =
  "The blanket maps a cloud holding water and letting it fall as drops, but it leaves out that nobody shakes the sky \u2014 drops fall when they grow too heavy to float.";

// No trailing newline: splitting the file must yield exactly 2 lines.
const entry = `${LINE_1}\n${LINE_2}`;

const lines = entry.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
if (entry.length < 1 || entry.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${entry.length}`);
}
for (const line of lines) {
  if ((line.match(/\./g) ?? []).length !== 1) {
    throw new Error(`each line must be exactly one sentence: ${JSON.stringify(line)}`);
  }
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(`wrote ${entry.length} characters in 2 lines to ${join(outDir, "entry.txt")}`);
