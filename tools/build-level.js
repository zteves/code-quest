// Build a Code Quest level's index.html from the shared template + a topics file.
// Run from the project root:  node tools/build-level.js <levelNumber>
// Reads/writes only project files (no /private/tmp) so the OS sandbox stays stable.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE = path.join(ROOT, 'template', 'base.html');

const LEVELS = {
  5: {
    topics: 'level-05.js',
    out: 'levels/level-05/index.html',
    config: `const LEVEL = {
  number: 5,
  id: "l5-grand-quest",
  title: "Code Quest · Level 5 — The Grand Quest",
  subtitle: "Boss, Game States & the Full Adventure",
  saveKey: "codequest_L5_v1",
  certBody: "For bravely clearing every dungeon of <b>Level 5: The Grand Quest</b> — mastering "
    + "game states, a title screen, a boss with attack patterns and a health bar, win/lose and "
    + "restart, and polish (screen shake and particles) — and building the complete adventure: "
    + "a title screen, a three-floor dungeon, combat, loot, leveling, and the King Slime boss. "
    + "You didn't just learn to code — you built a game. A true game-maker!"
};`
  },
  4: {
    topics: 'level-04.js',
    out: 'levels/level-04/index.html',
    config: `const LEVEL = {
  number: 4,
  id: "l4-dungeon",
  title: "Code Quest · Level 4 — Deeper into the Dungeon",
  subtitle: "Multi-Floor Dungeons",
  saveKey: "codequest_L4_v1",
  certBody: "For bravely clearing every dungeon of <b>Level 4: Deeper into the Dungeon</b> — "
    + "mastering floors of maps, the currentFloor bookmark, stairs and doors, entry points, "
    + "edge paths, per-floor state, tidy floor objects, and a mini-map — and building a "
    + "3-floor dungeon to descend, fight through, loot, and clear. A true game-maker!"
};`
  }
};

const TEMPLATE_LEVEL = `const LEVEL = {
  number: 0,                       // e.g. 2
  id: "template",                  // short slug, e.g. "l2-combat"
  title: "Code Quest — Template",  // shown in the browser tab
  subtitle: "Level template",      // short tagline
  saveKey: "codequest_template_v1",// UNIQUE per level: codequest_L<n>_v<schema>
  // Certificate body (HTML). Describe what THIS level taught + the game milestone.
  certBody: "For bravely clearing every dungeon of this level and building the next "
    + "piece of the Code Quest adventure. A true coder and game-maker!"
};`;

const levelNumber = process.argv[2];
const level = LEVELS[levelNumber];
if (!level) { console.error('Unknown level:', levelNumber); process.exit(1); }

function must(c, m) { if (!c) { console.error('FAIL:', m); process.exit(1); } }

let s = fs.readFileSync(BASE, 'utf8');
const topics = fs.readFileSync(path.join(__dirname, 'topics', level.topics), 'utf8').trim();

must(s.includes(TEMPLATE_LEVEL), 'template LEVEL block anchor');
s = s.replace(TEMPLATE_LEVEL, level.config);

const topicsStart = s.indexOf('const TOPICS = [');
const stateBanner = s.indexOf('/* ============================================================\n   State + storage');
must(topicsStart !== -1 && stateBanner !== -1 && stateBanner > topicsStart, 'TOPICS splice anchors');
s = s.slice(0, topicsStart) + topics + '\n\n' + s.slice(stateBanner);

const outPath = path.join(ROOT, level.out);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, s);
console.log('built', level.out, '(' + s.length + ' bytes)');
