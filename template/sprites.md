# Sprite Standard — Pixel Art From Arrays

From Level 2 forward, every character is a **pixel sprite drawn from a grid of color
codes**, scaled up on the canvas. No image files — the art is *data*. This is also a
teaching win: a sprite is "just an array of colored pixels," which reinforces arrays and
nested loops from Level 1.

This file defines the shared format, the palette, the drawing helper, and starter sprites.
The `template/base.html` playground sandbox exposes `drawSprite` and `PALETTE` so learner
exercises can draw sprites directly.

---

## The format

A sprite is an **array of rows**. Each row is a **string** of single-character color keys.
`.` means transparent (draw nothing). All rows should be the same length.

```js
// A little green slime (8x6)
const slimeSprite = [
  "........",
  "..gggg..",
  ".gggggg.",
  "gg g gg.",   // spaces are just transparent too
  "gggggggg",
  ".g.gg.g.",
];
```

## The palette

One shared color map, so every level's art matches. Keys are single characters.

```js
const PALETTE = {
  ".": null,        // transparent
  " ": null,        // transparent (allows readable gaps in the grid)
  "k": "#1a1a1a",   // black / outline
  "w": "#ffffff",   // white
  "s": "#f2c79a",   // skin
  "g": "#3aa63a",   // green (tunic / slime)
  "G": "#1f6d1f",   // dark green
  "b": "#3a6ea6",   // blue
  "y": "#ffd23f",   // gold / yellow
  "r": "#d63a3a",   // red
  "n": "#8a5a2a",   // brown (wood / hair)
  "e": "#e8e8e8",   // light grey (bone / steel)
  "p": "#9a4ecf",   // purple (magic / boss)
};
```

## The drawing helper

`drawSprite` loops the grid and paints one filled square per non-transparent cell,
scaled by `pixelSize`. Named for readability per STANDARDS §2.

```js
function drawSprite(sprite, screenX, screenY, pixelSize, palette) {
  for (let rowIndex = 0; rowIndex < sprite.length; rowIndex++) {
    const row = sprite[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const colorKey = row[colIndex];
      const color = palette[colorKey];
      if (!color) continue;               // transparent — skip it
      ctx.fillStyle = color;
      ctx.fillRect(
        screenX + colIndex * pixelSize,
        screenY + rowIndex * pixelSize,
        pixelSize,
        pixelSize
      );
    }
  }
}

// Draw the slime at (100, 100), each pixel 6 screen-pixels big:
drawSprite(slimeSprite, 100, 100, 6, PALETTE);
```

## Facing directions

The hero needs to face 4 ways. Store one sprite per direction in an object keyed by
direction, and pick the current one with `hero.facing`:

```js
const heroSprites = {
  down:  [ /* rows... */ ],
  up:    [ /* rows... */ ],
  left:  [ /* rows... */ ],
  right: [ /* rows... */ ],
};

drawSprite(heroSprites[hero.facing], hero.x, hero.y, SPRITE_SCALE, PALETTE);
```

A simple **walk wiggle**: nudge `screenY` by 1 pixel on alternating animation frames.
A **sword swing**: draw a short sword sprite in front of the hero in the facing direction
for a few frames after the attack key is pressed.

## Conventions

- Use a consistent `SPRITE_SCALE` (constant, `UPPER_SNAKE_CASE`) per level, e.g. `4` or `6`.
- Give each entity type its own named sprite constant: `heroSprites`, `slimeSprite`,
  `batSprite`, `skeletonSprite`, `bossSprite`, `chestClosedSprite`, `chestOpenSprite`.
- **Always wrap the silhouette in a dark outline (`k`)** so it reads against any tile —
  including a same-hue one. This is a hard rule (see STANDARDS §6): the top L2 bug was a
  green slime vanishing on green grass. A mono-color sprite with no outline is banned.
- **A sprite's body color must differ from the tile it usually stands on.** The green slime
  works on green grass only *because* of its outline — never rely on hue alone.
- Keep grids small (roughly 8×8 to 16×16). Bigger sprites cost readability and clarity.
- Enemies and hero share the same `PALETTE` so the world looks unified.
- The sandbox canvas starts on a **dark** background so sprites are visible even before an
  exercise paints a background. Sprite-only teaching demos should paint a contrasting
  (dark or parchment) background, not grass.

## Verify before shipping

Every sprite: **all rows the same length**, and **every character is a key in `PALETTE`**
(a stray letter = an invisible pixel). Check with a quick script, don't eyeball it.

## Reference: the L2 outlined sprites

These shipped in Level 2 — reuse and extend them so the series stays visually consistent.

```js
// Hero, 8 wide, black-outlined, one per facing
const heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];
const heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];
const heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];
const heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];
// Slime enemy, 8 wide, black-outlined green with black eyes
const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];
```

## Starter sprites (expand per level as needed)

```js
// Hero facing down — a small green-tunic adventurer with a cap (10x12)
const heroDown = [
  "...nn...",
  "..nnnn..",
  "..ssss..",
  "..sksk..",   // eyes
  "..ssss..",
  ".gggggg.",
  "gg gggg gg",
  "gggggggg",
  ".g.gg.g.",
  ".n.nn.n.",   // boots
];

// Bat (10x6)
const batSprite = [
  "k......k",
  "kk....kk",
  "kkk.kkkkk",
  ".kkkkkk.",
  "..k..k..",
];

// Treasure chest, closed (8x7)
const chestClosedSprite = [
  ".nnnnnn.",
  "nyyyyyyn",
  "nynnnnyn",
  "nyy yy yn",
  "nyyyyyyn",
  "nyynnyyn",
  ".nnnnnn.",
];
```

These are starting points. Each level may add or refine sprites, but must keep the shared
`PALETTE` and the `drawSprite` helper so the whole series looks like one game.
