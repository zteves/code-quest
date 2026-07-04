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
- **Workshop must be big and stable (learned in L1/L2).** The editor and output panels are
  tall (≥ 500px), the game canvas is displayed large enough to read, the output panel scrolls
  on its own, and **arrow keys / space never scroll the sandbox** while playing (the sandbox
  intercepts them with `preventDefault`). A game that scrolls out of view while you press keys
  is a broken game.
- **Canvas default background must be dark and neutral (learned in L2).** The sandbox canvas
  starts on a dark background (not grass green), so any sprite is visible even before an
  exercise paints its own background. Never leave the default canvas the same hue as the
  sprites drawn on it.

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

### Sprite contrast (hard rule — learned in L2)

The single biggest visual bug in early L2 was **green sprites disappearing on green grass.**
To prevent it:

- **Every character sprite has a dark outline** (`k`) around its silhouette, so it reads
  against any tile — including a same-hue background. A mono-color sprite with no outline is
  banned.
- **A sprite's body color must differ from the tile it usually stands on.** A green slime on
  green grass only works *because* of its outline; don't rely on hue alone.
- **Teaching demos that exist just to show a sprite** paint a **contrasting background**
  (dark slate or parchment), not grass, so the shape is unmistakable. Say so in the lesson.
- Verify every sprite before shipping: **all rows equal length**, and **every character is a
  key in `PALETTE`** (a stray letter draws nothing — an invisible pixel).

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

## 10. Game Loop & Motion (hard rule — learned in L2)

**All movement and timers must be time-based, never per-frame.** `requestAnimationFrame`
does not run at a fixed 60fps — on 120Hz/144Hz and Mac ProMotion displays it runs faster
(and Macs ramp the refresh rate up *while the user is actively pressing keys*, which made
L2's enemies visibly "speed up" during play). Per-frame movement therefore runs 2× fast on
those screens.

- The game loop takes the timestamp `requestAnimationFrame` passes it and computes a
  **`frameScale`** = time-since-last-frame ÷ (1000/60). It is `1` at 60fps, `0.5` at 120fps.
- **Multiply every per-frame change by `frameScale`:** hero movement, enemy movement, wander,
  and countdown timers (hurt cooldown, attack timer). Speed numbers stay written "per 60fps
  frame," so they remain intuitive.
- Because timers become fractional, compare them with `<= 0`, never `=== 0` (they may skip
  the exact zero). Clamp `frameScale` to a small max (e.g. 4) so a paused/backgrounded tab
  doesn't teleport everything on return.
- Start the loop with `requestAnimationFrame(gameLoop)` so the first call gets a timestamp.

This pattern is the default for every game loop in every level from L2 on.

---

## 11. Combat & Difficulty Tuning (learned in L2)

Defaults that made L2 fair for a 10-year-old beginner. Treat as starting points, not law:

- **Enemies move slowly** relative to the hero (hero clearly faster, so the player can kite).
  L2 used enemy speed ~0.3 vs hero speed ~2 (per 60fps frame).
- **Give each enemy its own path,** not a synchronized beeline: vary per-enemy speed and add a
  small **random wander** so they don't converge as one wall.
- **Small, fractional damage over one-shot damage.** L2 enemies deal **0.25 heart** per touch
  with a ~1s hurt cooldown, so a bump is a setback, not a disaster. Fractional health is fine
  (0.25 is exact in binary — no float drift; game-over at `<= 0`).
- **Keep the enemy count low** enough to fight (L2: 3). More enemies × more damage overwhelms
  fast; tune them together.

---

## 12. HUD Readability (learned in L2)

If the player can't *see* a value change, they'll think the logic is broken (this happened
with L2's quarter-hearts on tiny 16px squares).

- **Make stat displays big enough to read the smallest change.** Quarter-heart steps need
  hearts large enough that a quarter is obvious (L2 uses 26px hearts with a gold outline and a
  bottom-up partial fill).
- **Pair any fractional/graphical stat with a plain numeric readout** (e.g. `Health: 2.75`),
  so the exact value is verifiable at a glance — for the player *and* for us during testing.
- Draw the HUD **last**, on top of everything, so it's never hidden behind the world.

---

## 13. Build Workflow for a New Level

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
- [ ] **Sprites:** every one has a dark outline, rows are equal length, and every character
      is a `PALETTE` key; sprite bodies contrast with the tile they stand on (§6).
- [ ] **Motion is time-based** (`frameScale`), timers compared with `<= 0`; verified constant
      speed regardless of refresh rate (§10).
- [ ] **HUD** is large enough to read the smallest stat change and has a numeric readout (§12);
      arrow/space keys don't scroll the sandbox (§5).
- [ ] Combat is fair: slow, varied enemies; small fractional damage; low count (§11).
- [ ] Final project matches the level's game milestone and continues the shared game.
