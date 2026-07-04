# Code Quest — Curriculum Plan (Levels 2–5)

The roadmap for the Code Quest series. Level 1 shipped and was completed. Levels 2–5
build on it, teaching progressively advanced game programming and evolving **one shared
game** toward a complete multi-floor, multi-level adventure with enemies, rewards, and a boss.

All levels follow `STANDARDS.md`. Each level is a single self-contained HTML file built
from `template/base.html`.

---

## The through-line

- **Level 1 (shipped):** JavaScript fundamentals → a tiny top-down game (move a hero, grab
  a key, reach a door). Single-square hero.
- **Level 2 onward:** the game is **re-envisioned with pixel-sprite characters** (richer,
  more engaging visuals — see `template/sprites.md`) and grows one major system per level.

```
L1  move + key + door                      (fundamentals)
 └─ L2  + real characters + combat          (enemies you fight)
     └─ L3  + treasure, items, XP, leveling (rewards & growth)
         └─ L4  + multi-floor dungeon        (a bigger world)
             └─ L5  = full adventure + boss  (the shared end goal)
```

Every topic inside a level funnels into that level's **game milestone**; every milestone
is the previous game plus one new system.

---

## Level 2 — *The Monsters Awaken*
**Theme:** Combat & enemies. **Save key:** `codequest_L2_v1`.

**New concepts (topics):**
1. Sprites from arrays — "a picture is a grid of colored letters" (recaps arrays + loops).
2. Facing directions — one sprite per direction; `hero.facing`.
3. The enemy object — position, health, speed, sprite.
4. An array of enemies — many objects, one list.
5. Updating many things in the game loop — loop the enemies each frame.
6. Health & damage — `heroHealth`, `takeDamage()`, hearts HUD.
7. Enemy movement — simple chase / patrol toward the hero.
8. Touch damage & cooldown timers — invincibility frames so you don't lose all hearts at once.
9. Attacking — a hitbox in the hero's facing direction; the sword swing.
10. Defeating enemies — remove from the array, small reward on defeat.
11. Win condition — "clear the room."

**Game milestone:** A re-envisioned game — a detailed 4-direction hero with a sword, a room
of pixel-sprite enemies (slime, bat) that chase and deal damage and can be defeated, a hearts
HUD, and a "clear the room" goal.

---

## Level 3 — *Treasure & Power*
**Theme:** Items, rewards, XP & leveling. **Save key:** `codequest_L3_v1`.

**New concepts (topics):**
1. The treasure-chest object — closed/open sprites, `opened` flag.
2. Opening a chest — collision + state change.
3. Item objects — `{ type, name, effect }`.
4. Inventory — an array of items the hero carries.
5. Item effects — potion heals, heart-container raises max health, key opens, rupee counts.
6. A little randomness — `Math.random()` for loot drops.
7. Experience points — `experience` as a number; enemies grant XP on defeat.
8. Leveling up — thresholds + a `levelUp()` function.
9. Stats that scale — `maxHealth`, `attackPower` grow with level.
10. Drawing a HUD — level, XP bar, rupees, hearts, inventory panel.
11. Saving game state inside the game — persist run progress.

**Game milestone:** Chests scattered in the room drop items/rupees/hearts/XP; defeating
enemies grants XP; the hero levels up (more health & damage); a HUD shows level, XP bar,
rupees, hearts, and inventory.

---

## Level 4 — *Deeper into the Dungeon*
**Theme:** Multi-floor navigation. **Save key:** `codequest_L4_v1`.

**New concepts (topics):**
1. Many maps in one place — a `floors` structure (array/object of tilemaps).
2. The current floor — a `currentFloor` variable; drawing the active floor.
3. Doorways & stairs tiles — special tiles that mean "go somewhere."
4. Edge transitions — walk off the edge → arrive on the matching tile of a new floor.
5. Entry points — where the hero lands on the new floor.
6. Remembering each floor's state — enemies/chests you cleared stay cleared.
7. Organizing growing code — split into functions as the game gets bigger (refactoring).
8. Optional: a mini-map of the floors.

**Game milestone:** A 3-floor dungeon connected by doorways/stairs; each floor has its own
layout, enemies, and chests; the hero travels between floors and progress persists.

---

## Level 5 — *The Grand Quest* (Capstone)
**Theme:** Assemble everything + polish. **Save key:** `codequest_L5_v1`.

**New concepts (topics):**
1. Game states — title / playing / game-over / victory as a `gameState` variable.
2. A title screen and a real ending.
3. The boss — a big sprite with its own health bar.
4. Attack patterns — the boss does more than chase (timed moves).
5. Win/lose logic — beat the boss to win; lose all hearts to fail (then retry).
6. Polish — screen shake, particle sparkles, sound hooks.
7. "Make it yours" — open-ended extension challenges (new floors, new enemies, new items).

**Game milestone (the series end goal):** A complete multi-floor adventure — title screen →
explore floors → fight enemies, collect loot, and level up → find what you need → beat the
boss → victory ending. Replayable and extendable.

---

## Build order & notes

- Build in order L2 → L3 → L4 → L5; each reuses the prior game's code, sprites, and tile codes.
- Every level starts from `template/base.html` (copy → fill `LEVEL` + `TOPICS`).
- Keep sprite names, tile codes, and variable names **consistent across levels** so the
  learner recognizes them (`enemies`, `chests`, `hero`, `TILE_SIZE`, `heroHealth`, …).
- Run the Pre-Ship Checklist in `STANDARDS.md §10` before committing each level.
- One immediate next step after this plan is approved: **build Level 2.**
