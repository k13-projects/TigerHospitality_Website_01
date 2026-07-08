# Lessons — THG-Website

Self-improvement log. Each entry is a correction from Kazim, codified so it sticks.

## 2026-07-07 · iCloud eviction makes the dev server hang silently — materialize first

**What happened:** `npm run dev` (`PORT=9131 node server.js`) started, the node process stayed alive, but it printed no log and never bound port 9131 (curl returned `000`). I wasted time chasing it as a sandbox/port/code bug. Kazim spotted the real cause: the project lives under `~/Desktop/PROJECTS`, which is in macOS iCloud "Desktop & Documents" sync. iCloud had evicted `node_modules` to dataless placeholders after the project sat idle, so `require('express')` was blocking on the iCloud download — not running. Once the files were materialized, the server bound instantly and logged `🚀 Server is running`.

**Lesson — do this every time, don't second-guess it again:**
1. **Check before running** any build/dev/test/install that reads local files: `find node_modules -flags dataless` (non-zero = evicted), or look for `*.icloud` placeholder files.
2. **If evicted, download them myself:** `brctl download node_modules` (or the needed path), or read/touch the files to trigger materialization; wait until the dataless count is 0.
3. **If I can't materialize them** (download stalls, offline, permissions): **ask Kazim to download the folder from iCloud**, wait for his OK, then run.
4. **Then run**, and give the first run extra time — materialization during `require()` can exceed a short poll window; don't declare failure early.

Symptom shorthand: dev process alive + empty log + no port bind = suspect iCloud eviction FIRST, not the code. Broadcast as a house rule to all K13 projects (they all sit under `~/Desktop/PROJECTS`), except EDISYN.
