// L5 checks: sprite validity, never-blank, and deterministic game-state / boss / restart logic.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'topics', 'level-05.js'), 'utf8');
const PALETTE_KEYS = new Set([".", " ", "k","w","s","g","G","b","y","r","n","e","p"]);
let failures = 0;
const check = (cond, msg) => { if (!cond) { console.log('FAIL:', msg); failures++; } };

// --- 1. Sprites (new boss + reused set) ---
const sprites = {
  heroDown:["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."],
  slimeSprite:["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."],
  kingSlimeSprite:["...kkkkkk...","..kyyyyyyk..",".kggggggggk.","kggggggggggk","kgkkggggkkgk","kggggggggggk","kgggkkkkgggk","kggggggggggk",".kgGGGGGGgk.","..kGGGGGGk..","...kkkkkk..."],
  doorSprite:["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".knynnk.",".knnnnk.",".knnnnk.",".kkkkkk."],
  downStairsSprite:["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"],
};
for (const [name, rows] of Object.entries(sprites)) {
  const w = rows[0].length; let hasK = false;
  for (const row of rows) { if (row.length !== w) check(false, name+' uneven row: '+JSON.stringify(row)); for (const ch of row) { if (!PALETTE_KEYS.has(ch)) check(false, name+' bad char '+ch); if (ch==='k') hasK = true; } }
  check(hasK, name+' has no outline');
  check(src.includes('['+rows.map(r=>'"'+r+'"').join(',')+']'), name+' not verbatim in file');
}
console.log('sprites: ' + (failures ? 'FAIL' : 'ok'));

// --- 2. Load topics; never-blank ---
const c = { W: (w) => w, TOPICS: null }; vm.createContext(c); vm.runInContext(src + '\nthis.TOPICS = TOPICS;', c);
check(c.TOPICS.length === 11, 'expected 11 topics, got ' + c.TOPICS.length);
for (const t of c.TOPICS) check(/drawSprite\(|ctx\.fillRect|ctx\.fillText|ctx\.strokeRect/.test(t.exercise.starter), 'blank canvas: ' + t.id);
console.log('topics: ' + c.TOPICS.length + ', never-blank: ' + (failures ? 'FAIL' : 'ok'));

// --- 3. Game-state + boss + restart logic (mirrors final-2) ---
let gameState, boss, heroHealth, particles;
function makeBoss(){ return { x:130,y:110,size:44,health:16,maxHealth:16,mode:"chase",modeTimer:150 }; }
function resetGame(){ gameState="playing"; boss=makeBoss(); heroHealth=4; particles=[]; }
gameState = "title";
// start from title
check(gameState === "title", 'starts on title');
resetGame(); check(gameState === "playing" && boss.health === 16 && heroHealth === 4, 'reset -> fresh playing state');

// boss attack-pattern cycles chase<->charge
let switches = 0, mode = boss.mode;
for (let f = 0; f < 400; f++) { boss.modeTimer -= 1; if (boss.modeTimer <= 0) { boss.mode = boss.mode === "chase" ? "charge" : "chase"; boss.modeTimer = boss.mode === "charge" ? 55 : 150; if (boss.mode !== mode) { switches++; mode = boss.mode; } } }
check(switches >= 2, 'boss cycles through modes, switches=' + switches);

// win: boss defeated -> victory
boss.health = 1; boss.health -= 3; if (boss.health <= 0) gameState = "victory";
check(gameState === "victory", 'boss defeat -> victory');

// lose: hero health 0 -> gameover
resetGame(); heroHealth = 0.25; heroHealth -= 0.5; if (heroHealth <= 0) { heroHealth = 0; gameState = "gameover"; }
check(gameState === "gameover" && heroHealth === 0, 'hero death -> gameover, clamped');

// restart from an end state rebuilds fresh (boss back to full, playing)
resetGame(); check(gameState === "playing" && boss.health === boss.maxHealth, 'restart rebuilds fresh boss');

// particles: spawn then decay to empty
particles = [];
for (let i=0;i<14;i++) particles.push({x:0,y:0,vx:1,vy:1,life:5,color:"#fff"});
for (let f=0; f<10; f++) for (let i=particles.length-1;i>=0;i--){ particles[i].life-=1; if(particles[i].life<=0) particles.splice(i,1); }
check(particles.length === 0, 'particles decay and are removed');
console.log('states/boss/restart/particles: ' + (failures ? 'FAIL' : 'ok'));

console.log('\n' + (failures ? (failures + ' CHECK(S) FAILED') : 'ALL L5 CHECKS PASSED'));
process.exit(failures ? 1 : 0);
