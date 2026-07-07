# Code Quest

**Learn to code video games in JavaScript — one adventure at a time.**

Code Quest is a five-level, Zelda-themed coding course built for a curious ~10-year-old
beginner. Each level is a **single, self-contained HTML file**: no installs, no accounts,
no internet required — just double-click and play. Every level pairs plain-English lessons
with a **live code playground**, and across the five levels the learner builds one evolving
game, from a single moving square all the way to a multi-floor dungeon crawler with a boss.

It was made for one kid and is shared freely (MIT) for any kid, parent, teacher, or tinkerer.

- 🎮 **Play it:** open any `levels/level-0X/index.html` in a browser.
- 🧩 **Fully offline & private:** everything runs on the device; no data ever leaves it.
- 💾 **Auto-saves:** close it, come back days later, pick up exactly where you left off.

---

## The levels

The series teaches fundamentals first, then builds up — and each level ends by growing the
**same game** one big step further.

| # | Title | New skills | Ends with |
|---|-------|-----------|-----------|
| **1** | *(JavaScript Fundamentals)* | variables → data types → math → strings → if/else → loops → functions → arrays → objects → events → canvas → the game loop → collision | a tiny top-down game: move a hero, grab a key, reach the door |
| **2** | **The Monsters Awaken** | pixel sprites, enemy objects, arrays of enemies, health & damage, chasing AI, hurt cooldowns, sword combat | a battle arena: fight off a horde of slimes and clear the room |
| **3** | **Treasure & Power** | chests, item objects, inventory, item effects, random loot, experience points, leveling up, stats that scale | a treasure dungeon: loot chests, defeat slimes, earn XP, grow stronger |
| **4** | **Deeper into the Dungeon** | floors as data, the `currentFloor` bookmark, stairs & door tiles, entry points, edge paths, per-floor memory, floor objects, a mini-map | a 3-floor dungeon you descend, each floor with its own enemies and loot |
| **5** | **The Grand Quest** | game states, a title screen, a boss with attack patterns and a health bar, win/lose & restart, screen shake, particles | **the full adventure:** title → descend → fight, loot & level up → beat the King Slime |

Every level is its own file with its own saved progress, so learners can jump in anywhere —
but the magic is doing them in order and watching their little square grow into a real game.

---

## How to play

1. **Open a level.** Double-click `levels/level-01/index.html` (or any level) — it opens in
   your browser. Nothing to install.
2. **Read the scroll.** The parchment panel teaches one idea at a time, in simple English.
   Hard words are underlined — hover (or tab to) them for a plain-language definition.
3. **Do the quest.** Click **"Load this quest into the Workshop"** to drop the exercise's
   starter code into the **Magic Workshop**, then press **▶ Run** to see it work. The output
   and the game screen appear on the right.
4. **Play & experiment.** For the game exercises: **click the game screen first**, then use
   the **arrow keys** to move and the **space bar** to swing your sword / act / start. Then
   change the code — tweak a number, a color letter, a starting position — and Run again.
   Breaking things and fixing them is the whole point.
5. **Earn your hearts.** Press **"Mark complete"** to clear a dungeon; the heart meter fills
   and you collect a rupee. Use the **World Map** sidebar to move between topics.
6. **Finish the quest.** Clear all the topics and a printable **Certificate of Completion**
   appears — type your name and save it. Toggle **Sound** any time, or **"Start a new game"**
   to reset progress.

Nothing you do can break the page — the playground runs your code in a safe sandbox, so a
mistake just shows a friendly, kid-readable error and never loses your progress.

---

## How to teach with this

Code Quest is designed to be handed to a kid with very little setup, and to reward
curiosity over memorization. Some notes for parents, teachers, and mentors:

- **Who it's for.** A motivated beginner around 8–12. Level 1 starts from *absolute* zero
  ("what is code?"), so no prior experience is required. It pairs well with a beginner
  JavaScript book or class, but stands on its own.
- **Deep understanding, not memorization.** Every topic follows the same five-part shape:
  **Lesson → Mental Model → Common Mistakes → Exercise → Recap.** The mental model and the
  "watch out" mistakes matter as much as the code — talk through them together.
- **Let them tinker.** The single most valuable habit: after an exercise runs, have them
  **change something and Run again.** Every exercise's starter code is theirs to remix, and
  each level's final game literally invites them to "make it yours" (add enemies, move the
  treasure, change colors). That's where real learning happens.
- **Pace it gently.** One topic (or two) per sitting is plenty. There's no timer and no
  pressure — progress saves automatically, so it's easy to stop mid-adventure and resume
  later. The heart meter gives a natural sense of "how far to go."
- **Sit alongside for the games.** The interactive game topics need a click on the game
  screen before the keys work — a common first stumble. After that, it's arrows to move,
  space to act. Playing the boy's own creation together is the payoff.
- **It's private and offline by design.** No accounts, no sign-in, no network calls, no
  analytics — nothing leaves the computer. Progress lives in that one browser's local
  storage. Great for young kids: you can hand it over without worrying about the internet.
- **Two learners, one machine?** Progress is per-browser. Use a different browser or browser
  profile for a second child, or use **"Start a new game"** to reset a level for the next kid.
- **If it feels too hard or too easy.** Difficulty (enemy speed, damage, XP pace, boss
  health) is deliberately gentle and lives in plain numbers near the top of each final
  game's code — a great "grown-up tweak," or a great thing to explore with the learner.
- **The through-line.** Point out that it's *one game growing up*: the square from Level 1
  becomes a sprite that fights (L2), collects loot and levels up (L3), explores floors (L4),
  and faces a boss (L5). Seeing the whole arc is motivating.

---

## Features

- **Self-contained & offline** — one HTML file per level; no installs, no dependencies, no
  network. Works from a USB stick or an airplane.
- **Live playground ("Magic Workshop")** — a real JavaScript editor with **Run**, **Load
  example**, and **Reset code**, running in a sandboxed `<iframe>` with a `<canvas>` so kids
  can draw and animate. Errors come back friendly and kid-readable.
- **Auto-saved progress** — completed topics, current spot, and the code in the editor all
  persist to `localStorage`, per level (each level has its own save key).
- **Gamified** — a heart-meter progress bar, rupees, a World Map of "dungeons," Web-Audio
  sound effects with a mute toggle, and a printable completion **certificate**.
- **Readable, teachable code** — spelled-out variable names, small functions, and lessons
  that explain every hard word.

---

## Repository layout

```
LICENSE                     MIT license.
README.md                   You're reading it.
STANDARDS.md                The rulebook every level follows (13 sections + a pre-ship checklist).

levels/
  level-01/index.html       Level 1 — JS fundamentals (frozen; shipped as completed).
  level-02..05/index.html   One self-contained, playable file per level.

template/
  base.html                 The shared shell every template-based level is built from
                            (Zelda theme, sidebar, sandboxed playground, save engine,
                            sounds, certificate, sprite helpers).
  sprites.md                The pixel-sprite format, shared color palette, and reference sprites.

tools/                      The in-project build & verification system (Node, no deps).
  build-level.js            Regenerates a level's index.html from the template + its topics.
  topics/level-0X.js        The lesson/exercise source for levels 2–5.
  test-topics.js            Runs every exercise's starter in a mock sandbox to catch errors.
  verify-l4.js, verify-l5.js  Deterministic logic checks (transitions, boss, leveling, …).
  render.js                 Safe headless-screenshot helper for visual checks.

docs/
  curriculum-plan.md        The full topic-by-topic roadmap for Levels 2–5.
  design-2026-07-03.md      The approved series design.
```

---

## Building & regenerating levels

Levels 2–5 are generated from the shared template plus a topics file, so they stay
consistent and reproducible. You only need **Node.js** (no packages to install).

```bash
# Rebuild a level's index.html from template/base.html + tools/topics/level-0X.js
node tools/build-level.js 5

# Run every exercise's starter code in a mock sandbox (catches runtime errors)
node tools/test-topics.js tools/topics/level-05.js

# Deep, deterministic checks for the game logic
node tools/verify-l5.js
```

> **Level 1 is intentionally not part of the builder.** It predates the template/topics
> system — it's the original standalone course with its topics inline — and is kept frozen.

### Authoring a new level

1. Write `tools/topics/level-0X.js` — a `TOPICS` array of lessons following the five-part
   contract and the human-readable-naming rule in `STANDARDS.md`.
2. Add its config (title, save key, certificate text) to `tools/build-level.js`.
3. Build it, run `test-topics.js`, and add checks.
4. Work through the **Pre-Ship Checklist** in **`STANDARDS.md` §13** before shipping.

`STANDARDS.md` is the source of truth for *how* levels are built — the teaching contract,
readable-naming rule, self-containment, sprite/contrast rules, time-based motion, HUD
readability, and the "never leave the game screen blank" rule, among others.

---

## How it works (for the curious developer)

- **No framework, no build step at runtime.** Each shipped level is plain HTML/CSS/JS in one
  file. The `tools/` build is just text assembly (template + topics) run with Node.
- **The playground** injects the learner's code into a sandboxed `srcdoc` iframe
  (`sandbox="allow-scripts"`), exposing a `<canvas>`, its `ctx`, and helpers — so bad code
  can't touch the page or the saved progress.
- **Sprites are data.** Characters are drawn from arrays of single-character color codes
  (a shared `PALETTE` + a `drawSprite` helper) — no image files, and a neat lesson in arrays.
- **Motion is time-based.** Game loops scale movement by the real time between frames, so the
  game runs the same speed on 60 Hz and 120 Hz displays.
- **Sound** is synthesized with the Web Audio API — no audio files.

---

## Contributing

Remixes and contributions are welcome. New levels, new enemies, translations, accessibility
improvements, and bug fixes are all fair game. Please keep the core promises intact:
**one self-contained offline file per level, simple English, readable code, and nothing that
leaves the device.** Read `STANDARDS.md` first — it captures the lessons that keep the series
consistent and kid-friendly.

## License

Released under the [MIT License](LICENSE) — free to use, copy, modify, teach with, and share.
