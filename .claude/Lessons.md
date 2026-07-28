# Lessons — THG-Website

Self-improvement log. Each entry is a correction from Kazim, codified so it sticks.

## 2026-07-10 · Leaflet forces `img { max-width/max-height: none !important }`

When putting an `<img>` inside a Leaflet `divIcon` (e.g. a food-hall logo under the marker
badges), Leaflet's own stylesheet rule `.leaflet-container img { max-width:none !important; max-height:none !important }`
overrides plain inline `max-width/max-height`, so the image blows up to its natural size and
covers the map. Fix: use **inline `!important`** on the image's size caps (inline important beats
a stylesheet's important) — e.g. `style="max-width:128px !important; max-height:24px !important"`.
Brand badge circles avoid this because they size the img via `width/height:100%` of a fixed-size
parent, not `max-*`. See `buildVenueIcon` in `js/main.js`.

## 2026-07-10 · Concept-card address rows must stay on ONE line

Kazim's rule: every address line in a concept card's `card-details` must render on a
single line — never wrap to a second line. Sky Deck wrapped because its visible text
("12841 El Camino Real Ste 206") was longer than the sibling addresses.

**How to keep it single-line:** abbreviate the *visible* text (Rd/St/Ave, `Ste 206` → `#206`,
or drop the suite entirely) so it's no longer than the longest non-wrapping neighbor
(e.g. "1720 North El Camino Real"). **Always keep the `href` as the full address** (the
Google Maps `query` still had `Ste 206`), so the link resolves to the exact spot even when
the shown text is shortened — "clicking goes to the right place is enough." When adding any
new card location, eyeball it at desktop width and confirm one line before shipping.

## 2026-07-07 · iCloud eviction makes the dev server hang silently — materialize first

**What happened:** `npm run dev` (`PORT=9131 node server.js`) started, the node process stayed alive, but it printed no log and never bound port 9131 (curl returned `000`). I wasted time chasing it as a sandbox/port/code bug. Kazim spotted the real cause: the project lives under `~/Desktop/PROJECTS`, which is in macOS iCloud "Desktop & Documents" sync. iCloud had evicted `node_modules` to dataless placeholders after the project sat idle, so `require('express')` was blocking on the iCloud download — not running. Once the files were materialized, the server bound instantly and logged `🚀 Server is running`.

**Lesson — do this every time, don't second-guess it again:**
1. **Check before running** any build/dev/test/install that reads local files: `find node_modules -flags dataless` (non-zero = evicted), or look for `*.icloud` placeholder files.
2. **If evicted, download them myself:** `brctl download node_modules` (or the needed path), or read/touch the files to trigger materialization; wait until the dataless count is 0.
3. **If I can't materialize them** (download stalls, offline, permissions): **ask Kazim to download the folder from iCloud**, wait for his OK, then run.
4. **Then run**, and give the first run extra time — materialization during `require()` can exceed a short poll window; don't declare failure early.

Symptom shorthand: dev process alive + empty log + no port bind = suspect iCloud eviction FIRST, not the code. Broadcast as a house rule to all K13 projects (they all sit under `~/Desktop/PROJECTS`), except EDISYN.
