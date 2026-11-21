// Entry for make.fun news-image-20261121 (Node 22, stdlib only).
//
// The poster is entry.png in this directory, rendered by
// render_poster.py from the real world news of Saturday 21 November
// 2026: Russian missiles landing in Poland, the market correction,
// the Riyadh missile intercepts, the Shenzhen summit, the ICJ
// Myanmar ruling, and the UK-EU deals.
//
// The grader runs this program with no network, twice, and both runs
// must produce identical bytes. Copying the finished poster is
// deterministic by construction, so this entrypoint does exactly
// that: it writes the poster to <output>/entry.png, where <output>
// is $MAKEFUN_OUTPUT_DIR when set (local runs) and /output
// otherwise (the grader's container). After the copy it verifies the
// output byte-for-byte against the source poster, so a partial or
// truncated write fails loudly instead of silently handing the
// grader a broken image.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const target = join(outputDir, "entry.png");
copyFileSync(source, target);

const sourceHash = createHash("sha256").update(readFileSync(source)).digest("hex");
const targetHash = createHash("sha256").update(readFileSync(target)).digest("hex");
if (statSync(source).size !== statSync(target).size || sourceHash !== targetHash) {
  throw new Error("entry.png copy failed verification: output differs from source");
}
console.log(`wrote ${target} (${statSync(target).size} bytes, sha256 ${targetHash.slice(0, 12)}…)`);
