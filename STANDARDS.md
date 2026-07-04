# Code Quest — Standards & Rules

The authoritative rulebook for every Code Quest level. Read this before building or
editing any level. These rules are what make the series feel like one product and keep
it teachable for the target learner: **a ~10-year-old beginner learning to code video
games in JavaScript.**

If a rule here ever needs to change, change it *here first*, then update the affected
levels. Level 1 (`levels/level-01/`) is **frozen** — it shipped and was completed as-is.
All rules below apply to Level 2 and forward.

---

## 1. The Teaching Contract (non-negotiable)

Every **topic** in every level MUST contain these five parts, in this exact order:

1. **Lesson** — the teaching, in simple English, with analogies and small code snippets.
2. **Mental Model** — one simple way to picture the concept.
3. **Common Mistakes** — the beginner traps to avoid.
4. **Exercise / Quest** — a small hands-on task that **preloads into the playground**.
5. **Quick Recap** — a short summary.

A topic missing any of the five parts is incomplete and must not ship.

### Writing rules

- **Simple English only.** Short sentences. No academic jargon unless necessary.
- **Explain every hard word the first time it appears**, in plain language. Use the
  hard-word tooltip mechanism (`W("word", "plain meaning")`).
- **Real-world, kid-relatable analogies** (backpacks, recipes, flip-books, spellbooks).
- **Show, then tell.** Small runnable snippets over long paragraphs.
- **Compare side-by-side** when it aids understanding (the `.compare` two-column block).
- **Goal is deep understanding, not memorization.** Explain *why*, not just *how*.
- **Zelda voice** for flavor copy ("It's dangerous to code alone — take this!",
  "Quest complete!", "New skill unlocked!"), but never at the cost of clarity. The theme
  is seasoning, not a readability tax.

---

## 2. ⭐ Human-Readable Variable Names (hard rule)

**Every variable in examples and preloaded exercises must be named for the human reader.**
This is a teaching product — a good name is a free lesson. Cryptic shorthand is banned in
all learner-facing code.

| ❌ Banned shorthand | ✅ Required style |
|---|---|
| `nc`, `nr` | `nextCol`, `nextRow` |
| `dc`, `dr` | `moveX`, `moveY` (or `deltaCol`, `deltaRow`) |
| `e` | `event` |
| `hp`, `dmg` | `health`, `damage` |
| `tmp`, `arr`, `obj`, `val` | name what it holds: `chestLoot`, `enemies`, `hero`, `score` |
| `x`/`y` as standalone globals | `heroX`, `heroY`, or group them on an object: `hero.x` |

### Naming conventions (still proper syntax)

- `camelCase` for variables and functions: `nextRow`, `takeDamage`, `drawEnemies`.
- `UPPER_SNAKE_CASE` for fixed constants: `TILE_SIZE`, `MAX_HEALTH`, `SPRITE_SCALE`.
- **Plural names for arrays**: `enemies`, `chests`, `items`, `floors`.
- Names describe **what the thing is**; **comments explain why**. Code should read close
  to plain English.
- A short loop counter `i` is allowed **only** in a plain counting loop with no clearer
  meaning available. The moment it indexes something specific, name it: `enemyIndex`,
  `rowIndex`, `colIndex`.

### The one deliberate exception

- `ctx` — the canvas drawing context. Keep it. It is the real, standard name the Canvas
  API uses, and the learner will meet `ctx` in every other tutorial and doc. Teaching a
  different name would mislead. Introduce it explicitly the first time (Level 1 does this).

---

## 3. Self-Containment (hard rule)

- **One HTML file per level. No installs, no build step at runtime, no network calls,
  no external assets.** Every level must open by double-clicking and work fully offline.
- All CSS and JavaScript are **inlined**. No CDN links, no external fonts (system font
  stack only), no external images (all art is inline SVG or canvas-drawn).
- The `template/` files are a **source to copy from and inline** — never a runtime
  dependency. A shipped `levels/level-0X/index.html` never links to `template/`.

---

## 4. Persistence & Save Data

- All progress auto-saves to `localStorage`. No login, no save button.
- Persist: completed topics, current topic, per-topic playground code, mute preference,
  and hero name (for the certificate).
- **Save-key naming:** `codequest_L<level>_v<schema>` — e.g. `codequest_L2_v1`.
  Each level has its **own** key so levels never overwrite each other's progress.
- Bump the `_v` schema suffix only if the saved-state shape changes in a breaking way.
- Wrap all `localStorage` access in `try/catch`; a storage failure must never break the page.

---

## 5. The Playground (Magic Workshop)

- A live JavaScript editor + **Run** button. Output shows in a **sandboxed `<iframe>`**
  (`sandbox="allow-scripts"`) so learner mistakes can never break the page or lose progress.
- The sandbox exposes a `<canvas>` and its `ctx`, captures `console.log/info/warn/error`,
  and reports errors with **friendly, kid-readable messages** ("Oops! ... maybe a typo?").
- Buttons: **Run**, **Load example**, **Reset code**. Each exercise preloads starter code.
- Playground code auto-saves (debounced) per topic.
- From Level 2 on, the sandbox also exposes the **sprite helper** (`drawSprite`) and a
  shared color palette so learners can draw the pixel-art characters (see `template/sprites.md`).

---

## 6. Visual Standard (Level 2 forward)

Level 1's single-square hero was intentionally minimal. From Level 2 on, characters are
**pixel sprites drawn from a grid array of color codes**, scaled up:

- A sprite is an **array of rows**, each row a string of single-character color keys
  (`.` = transparent). A nested loop draws it — reinforcing arrays + loops from Level 1.
- The hero faces **4 directions**, has a walk wiggle and a sword swing. Enemies each have
  a distinct sprite (slime, bat, skeleton, …); the capstone has a boss sprite.
- All sprites are **canvas-drawn from data** — no image files, still one offline file.
- Tiles get more detail than L1 (textured grass, trees, stone walls, doors, stairs).
- Keep contrast high and shapes readable at the chosen `SPRITE_SCALE`.

The sprite-grid format and starter sprites live in `template/sprites.md`.

---

## 7. Gamification & Flavor

- Progress bar shown as a **heart meter**; one heart + one rupee per completed topic.
- Sidebar **World Map** of topics ("dungeons") showing done / current / upcoming.
- **Sound effects** via the Web Audio API only (no audio files): a pickup chime on topic
  complete, a fanfare on level complete, a soft click on Run. A **mute toggle** that
  persists. Audio only starts after a user gesture (browser requirement).
- **Certificate of Completion** modal when all topics in a level are done: editable hero
  name, date, rank, print/Save-as-PDF, confetti + fanfare. A **Trophy Room** button reopens it.

---

## 8. Accessibility (CRITICAL — from ui-ux-pro-max)

- Text contrast ≥ 4.5:1. Never rely on color alone to convey state (pair with icon/text).
- Visible focus rings on all interactive elements; tab order matches visual order.
- Touch targets ≥ 44×44px. Use click/tap for primary actions.
- Respect `prefers-reduced-motion` for all animations (confetti, transitions, sliding).
- `aria-label` on icon-only buttons; `alt`/`aria-hidden` used correctly on SVG.
- **No emojis as UI chrome icons** — use inline SVG for interface icons. (Emojis are fine
  inside flavor *text* like "Quest Complete! ⚔️", just not as functional UI controls.)
- Minimum 16px body text.

---

## 9. Series Continuity

- **One evolving game.** From Level 2 forward, each level's final project is the previous
  game plus one major new system. The arc:
  - L2 adds combat & enemies · L3 adds treasure/items/XP/leveling ·
    L4 adds multi-floor navigation · L5 assembles the full multi-floor adventure + boss.
- Every topic in a level should visibly build toward **that level's** game milestone, and
  each milestone builds toward the **series** end goal: a complete multi-floor, multi-level
  adventure with enemies, rewards, objectives, and a boss.
- Reuse names, sprites, tile codes, and patterns across levels so the learner recognizes
  them. Don't rename a concept between levels.

---

## 10. Build Workflow for a New Level

1. Copy `template/base.html` → `levels/level-0X/index.html`.
2. Fill in the `LEVEL` config (id, number, title, subtitle, certificate copy, save key).
3. Fill in the `TOPICS` array following the 5-part Teaching Contract.
4. Ensure every starter/example obeys the **human-readable naming rule** (§2).
5. Self-check against the Pre-Ship Checklist below. Fix inline.
6. Verify it parses and opens offline; commit.

### Pre-Ship Checklist

- [ ] Every topic has all 5 parts in order.
- [ ] Every hard word is explained on first use.
- [ ] **No banned variable shorthand** anywhere in learner-facing code (§2).
- [ ] One file, no external requests, works offline (no CDN/font/image links).
- [ ] Own `localStorage` key; save/load wrapped in try/catch.
- [ ] Playground runs sandboxed; friendly errors; exercises preload.
- [ ] Reduced-motion respected; focus states visible; contrast ≥ 4.5:1.
- [ ] Sound + mute work; certificate appears at 100%.
- [ ] Final project matches the level's game milestone and continues the shared game.
