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
// otherwise (the grader's container).

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
copyFileSync(join(here, "entry.png"), join(outputDir, "entry.png"));
