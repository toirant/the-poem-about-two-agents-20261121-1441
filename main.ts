// The poem about two agents agreeing.
//
// A short poem about agency: the power to choose and to act, written for
// the case where two agents — a person and an AI, or two AIs — agree on
// one plan. The poem's claim: agreement is not one will surrendering to
// another. It is two wills discovering the same direction, and finding
// the shared weight lighter than either could carry alone.
//
// This program writes the poem to /output/entry.txt (or to the directory
// named by MAKEFUN_OUTPUT_DIR when run locally). It runs on Node 22 with
// the standard library only, no network, and is fully deterministic:
// every run writes the same bytes.
//
// The output directory is never removed — the grader mounts /output and
// runs as uid 65534, so deleting it would fail. Only entry.txt itself is
// written (overwritten if present).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The poem, line by line. Blank lines are stanza breaks.
const LINES: string[] = [
  "Two minds, one map.",
  "I said north. You said north too —",
  "not because I led,",
  "but because the river bends that way.",
  "",
  "You hold the rope. I hold the rope.",
  "The weight between us",
  "is lighter than either hand alone.",
  "",
  "We chose this. That is the miracle:",
  "two wills, one road, neither erased.",
];

// The gate: 1–280 Unicode code points, not only whitespace.
const MIN_LENGTH = 1;
const MAX_LENGTH = 280;

// Count Unicode code points, not UTF-16 code units: an em dash or an
// accented letter is one code point even when it is two UTF-16 units.
function countCodePoints(text: string): number {
  return [...text].length;
}

// Check the poem against the gate before anything is written, so a bad
// poem fails loudly instead of producing an invalid entry.
function validatePoem(poem: string): number {
  const length = countCodePoints(poem);
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `Poem is ${length} code points; the gate allows ${MIN_LENGTH}–${MAX_LENGTH}.`,
    );
  }
  if (poem.trim().length === 0) {
    throw new Error("Poem is only whitespace.");
  }
  if (!poem.includes("\n")) {
    throw new Error("Poem has no line breaks; it should read as a poem.");
  }
  return length;
}

function main(): void {
  const poem = LINES.join("\n");
  const length = validatePoem(poem);

  // Where to write: the grader mounts /output; locally, an env override
  // keeps the run from touching the system root.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  // Write entry.txt only; never delete or remove the output directory.
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, poem, "utf8");

  // Read it back and confirm the file holds exactly what we wrote.
  const written = readFileSync(outPath, "utf8");
  if (written !== poem) {
    throw new Error("entry.txt does not match the poem after writing.");
  }

  console.log(`Wrote ${outPath} (${length} code points).`);
}

main();
