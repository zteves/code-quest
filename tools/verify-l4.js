// L4-specific checks: sprite validity, never-blank, floor-transition + leveling logic.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'topics', 'level-04.js'), 'utf8');
const PALETTE_KEYS = new Set([".", " ", "k","w","s","g","G","b","y","r","n","e","p"]);
let failures = 0;
const check = (cond, msg) => { if (!cond) { console.log('FAIL:', msg); failures++; } };

// --- 1. Sprites: equal rows, palette-only, outlined, present verbatim ---
const sprites = {
  heroDown:["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."],
  heroUp:["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."],
  heroLeft:["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."],
  heroRight:["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."],
  slimeSprite:["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."],
  chestClosedSprite:[".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."],
  chestOpenSprite:["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."],
  doorSprite:["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".knynnk.",".knnnnk.",".knnnnk.",".kkkkkk."],
  downStairsSprite:["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"],
};
for (const [name, rows] of Object.entries(sprites)) {
  const w = rows[0].length; let hasK = false;
  for (const row of rows) { if (row.length !== w) check(false, name+' uneven row'); for (const ch of row) { if (!PALETTE_KEYS.has(ch)) check(false, name+' bad char '+ch); if (ch==='k') hasK = true; } }
  check(hasK, name+' has no outline');
  check(src.includes('['+rows.map(r=>'"'+r+'"').join(',')+']'), name+' not verbatim in file');
}
console.log('sprites: ' + (failures ? 'FAIL' : 'ok'));

// --- 2. Load topics; never-blank guard ---
const c = { W: (w) => w, TOPICS: null }; vm.createContext(c); vm.runInContext(src + '\nthis.TOPICS = TOPICS;', c);
check(c.TOPICS.length === 11, 'expected 11 topics, got ' + c.TOPICS.length);
for (const t of c.TOPICS) check(/drawSprite\(|ctx\.fillRect|ctx\.fillText|ctx\.strokeRect/.test(t.exercise.starter), 'blank canvas: ' + t.id);
console.log('topics loaded: ' + c.TOPICS.length + ', never-blank: ' + (failures ? 'FAIL' : 'ok'));

// --- 3. Floor-transition logic (mirrors final-2) ---
const TILE = 32;
const F0 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];
const F1 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];
const F2 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];
let floors = [
  { map: F0, entryFromAbove:{col:5,row:2}, entryFromBelow:{col:5,row:7}, enemies:[{h:1},{h:1}] },
  { map: F1, entryFromAbove:{col:5,row:2}, entryFromBelow:{col:5,row:7}, enemies:[{h:1}] },
  { map: F2, entryFromAbove:{col:5,row:2}, entryFromBelow:{col:5,row:7}, enemies:[{h:1},{h:1}] },
];
let currentFloor = 0;
let hero = { x: 0, y: 0, size: 24 };
let transitionCooldown = 0;
const getFloor = () => floors[currentFloor];
function tileUnderHero() {
  const col = Math.floor((hero.x + hero.size/2)/TILE), row = Math.floor((hero.y + hero.size/2)/TILE);
  return getFloor().map[row][col];
}
function checkStairs() {
  if (transitionCooldown > 0) { transitionCooldown--; return; }
  const tile = tileUnderHero();
  if (tile === 2 && currentFloor < floors.length-1) { currentFloor++; const e=getFloor().entryFromAbove; hero.x=e.col*TILE; hero.y=e.row*TILE; transitionCooldown=20; }
  else if (tile === 3 && currentFloor > 0) { currentFloor--; const e=getFloor().entryFromBelow; hero.x=e.col*TILE; hero.y=e.row*TILE; transitionCooldown=20; }
}
// stand on floor 0 down-stairs (col5,row8)
hero.x = 5*TILE; hero.y = 8*TILE; checkStairs();
check(currentFloor === 1, 'descended to floor 1, got ' + currentFloor);
check(hero.x === 5*TILE && hero.y === 2*TILE, 'landed at entryFromAbove');
check(tileUnderHero() === 0, 'landed on a floor tile (no instant re-trigger)');
// no re-trigger over several frames while standing still
for (let i=0;i<30;i++) checkStairs();
check(currentFloor === 1, 'no infinite loop; still on floor 1, got ' + currentFloor);
// defeat an enemy on floor 1, leave, come back — persistence
floors[1].enemies.pop();
check(floors[1].enemies.length === 0, 'floor 1 enemy removed');
hero.x = 5*TILE; hero.y = 1*TILE; transitionCooldown = 0; checkStairs(); // up-door on floor 1
check(currentFloor === 0, 'climbed to floor 0');
hero.x = 5*TILE; hero.y = 8*TILE; transitionCooldown = 0; checkStairs(); // back down
check(currentFloor === 1 && floors[1].enemies.length === 0, 'floor 1 still remembers its defeat');
check(floors[0].enemies.length === 2 && floors[2].enemies.length === 2, 'other floors unaffected');
console.log('floor transitions + per-floor memory: ' + (failures ? 'FAIL' : 'ok'));

// --- 4. Leveling logic (mirrors final-2) ---
let level=1, experience=0, experienceToNext=30, maxHealth=3, attackPower=1, heroHealth=3;
function addExperience(a){ experience+=a; while(experience>=experienceToNext){ experience-=experienceToNext; level++; maxHealth++; attackPower++; heroHealth=maxHealth; experienceToNext=level*20; } }
addExperience(15); check(level===1, 'no level at 15xp');
addExperience(15); check(level===2 && maxHealth===4 && attackPower===2, 'level 2 scales stats');
addExperience(100); check(level>=3, 'big reward multi-levels');
console.log('leveling: ' + (failures ? 'FAIL' : 'ok') + ' (final level ' + level + ')');

console.log('\n' + (failures ? (failures + ' CHECK(S) FAILED') : 'ALL L4 CHECKS PASSED'));
process.exit(failures ? 1 : 0);
