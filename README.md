# Code Quest

A series of **self-contained, offline HTML courses** that teach a young beginner to code
video games in JavaScript — one file per level, no installs, no dependencies, works by
double-clicking. Each level is a gamified, Zelda-themed adventure with lessons, a live code
playground, auto-saved progress, sounds, and a completion certificate.

## How to use

Open any level's `index.html` in a browser. Progress saves automatically to that browser
(via `localStorage`); close it and come back anytime. Each level keeps its own save data.

## Levels

| Level | Title | Teaches | Status |
|---|---|---|---|
| 1 | (JS Fundamentals) | variables → loops → functions → objects → events → canvas → game loop → collision | ✅ Shipped (`levels/level-01/`) |
| 2 | The Monsters Awaken | sprites, enemies, combat, health & damage | ✅ Shipped (`levels/level-02/`) |
| 3 | Treasure & Power | chests, items, inventory, XP & leveling | ✅ Shipped (`levels/level-03/`) |
| 4 | Deeper into the Dungeon | multi-floor navigation | ✅ Shipped (`levels/level-04/`) |
| 5 | The Grand Quest | game states, boss, full multi-floor adventure | ✅ Shipped (`levels/level-05/`) |

Each level builds on the last and evolves **one shared game** toward a complete multi-floor
adventure with enemies, rewards, and a boss.

## Repository layout

```
STANDARDS.md              The rulebook — read before building/editing any level.
template/
  base.html               Master shell to copy for each new level (theme, playground,
                          save engine, sounds, certificate, sprite helpers).
  sprites.md              Pixel-sprite format, shared palette, starter sprites.
levels/
  level-01/index.html     Level 1 (frozen — shipped as completed).
  level-0X/index.html     One self-contained file per level.
docs/
  curriculum-plan.md      Full topic-by-topic roadmap for Levels 2–5.
  design-2026-07-03.md    Approved series design.
```

## Building a new level

1. Copy `template/base.html` → `levels/level-0X/index.html`.
2. Fill the `LEVEL` config and the `TOPICS` array.
3. Follow every rule in `STANDARDS.md` (especially the 5-part topic contract and the
   human-readable variable-name rule).
4. Run the Pre-Ship Checklist in `STANDARDS.md §10`.

## Principles

- **Self-contained & offline** — one HTML file per level, no external requests or assets.
- **Teach for deep understanding** — simple English, real-world analogies, explain every
  hard word, practice in a live playground.
- **Human-readable code** — variable names are a free lesson; no cryptic shorthand.
