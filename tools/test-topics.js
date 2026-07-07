// Run every topic's exercise starter against a mock canvas sandbox to catch runtime errors.
// Run from project root:  node tools/test-topics.js tools/topics/level-04.js
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const topicsPath = process.argv[2];
if (!topicsPath) { console.error('usage: node tools/test-topics.js <topics-file>'); process.exit(1); }
const topicsSrc = fs.readFileSync(path.resolve(topicsPath), 'utf8');

const loadCtx = { W: (w, m) => `<span>${w}</span>`, TOPICS: null };
vm.createContext(loadCtx);
vm.runInContext(topicsSrc + '\nthis.TOPICS = TOPICS;', loadCtx);
const TOPICS = loadCtx.TOPICS;

const PALETTE = {".":null," ":null,"k":"#1a1a1a","w":"#ffffff","s":"#f2c79a","g":"#3aa63a","G":"#1f6d1f","b":"#3a6ea6","y":"#ffd23f","r":"#d63a3a","n":"#8a5a2a","e":"#e8e8e8","p":"#9a4ecf"};

function makeCtx() {
  const noop = () => {};
  const ctx = { fillRect: noop, clearRect: noop, strokeRect: noop, fillText: noop, beginPath: noop,
    moveTo: noop, lineTo: noop, arc: noop, fill: noop, stroke: noop, save: noop, restore: noop,
    translate: noop, scale: noop, drawImage: noop, closePath: noop };
  for (const p of ['fillStyle','strokeStyle','font','lineWidth','globalAlpha','textAlign'])
    Object.defineProperty(ctx, p, { set: noop, get: () => '' });
  return ctx;
}

function runTopic(topic) {
  const ctx = makeCtx();
  function drawSprite(sprite, x, y, pixelSize, palette) {
    palette = palette || PALETTE;
    if (!Array.isArray(sprite)) throw new Error('drawSprite got a non-array sprite');
    for (let r = 0; r < sprite.length; r++) for (let c = 0; c < sprite[r].length; c++) {
      if (palette[sprite[r][c]]) ctx.fillRect(x + c * pixelSize, y + r * pixelSize, pixelSize, pixelSize);
    }
  }
  const canvas = { width: 320, height: 320, focus: () => {}, getContext: () => ctx };
  const handlers = {};
  const windowMock = { addEventListener: (t, fn) => { (handlers[t] = handlers[t] || []).push(fn); }, removeEventListener: () => {} };
  let rafCallback = null;
  const requestAnimationFrame = (cb) => { rafCallback = cb; };
  const fire = (t, e) => (handlers[t] || []).forEach(fn => fn(e));

  const sandbox = { ctx, canvas, window: windowMock, document: { getElementById: () => null, addEventListener: () => {} },
    requestAnimationFrame, PALETTE, drawSprite,
    console: { log: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    Math, Date, JSON, Array, Object, String, Number, Boolean };
  vm.createContext(sandbox);
  vm.runInContext(topic.exercise.starter, sandbox, { timeout: 3000 });

  if (rafCallback) {
    let simTime = 1000;
    for (let frame = 0; frame < 240; frame++) {
      if (frame === 3) fire('keydown', { key: 'ArrowRight', preventDefault(){} });
      if (frame === 30) { fire('keyup', { key: 'ArrowRight', preventDefault(){} }); fire('keydown', { key: 'ArrowDown', preventDefault(){} }); }
      if (frame === 90) { fire('keyup', { key: 'ArrowDown', preventDefault(){} }); fire('keydown', { key: 'ArrowUp', preventDefault(){} }); }
      if (frame % 14 === 0) { fire('keydown', { key: ' ', preventDefault(){} }); fire('keydown', { key: 'f', preventDefault(){} }); }
      if (frame % 14 === 4) { fire('keyup', { key: ' ', preventDefault(){} }); fire('keyup', { key: 'f', preventDefault(){} }); }
      const cb = rafCallback; rafCallback = null; simTime += 16; cb(simTime);
      if (!rafCallback) rafCallback = cb;
    }
  }
}

let pass = 0, fail = 0;
for (const topic of TOPICS) {
  try { runTopic(topic); console.log('PASS  ' + topic.id.padEnd(15) + ' — ' + topic.sub); pass++; }
  catch (err) { console.log('FAIL  ' + topic.id.padEnd(15) + ' — ' + err.message); fail++; }
}
console.log('\n' + pass + ' passed, ' + fail + ' failed of ' + TOPICS.length);
process.exit(fail ? 1 : 0);
