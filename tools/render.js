// Render one topic's sandbox to a /tmp HTML file for a headless screenshot.
// SAFE: reads only the project index.html, WRITES only to /tmp. Never points a browser
// at a Documents path (that revokes macOS file permissions).
// Usage: node tools/render.js <level-index-path> <topic-id> <out-dir>
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const idxPath = process.argv[2];
const topicId = process.argv[3];
const outDir  = process.argv[4] || '/tmp';
const s = fs.readFileSync(path.resolve(idxPath), 'utf8');

const start = s.indexOf('const TOPICS = [');
const end = s.indexOf('/* ============================================================\n   State + storage');
const topicsText = s.slice(start, end);
const ctxObj = { W: (w, m) => '<span class="word" data-tip="'+m+'">'+w+'</span>', TOPICS: null };
vm.createContext(ctxObj);
vm.runInContext(topicsText + '\nthis.TOPICS = TOPICS;', ctxObj);
const topic = ctxObj.TOPICS.find(t => t.id === topicId) || ctxObj.TOPICS[0];

const head =
  '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
  'html,body{margin:0;padding:8px;background:#0f2410;color:#e8ffd0;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;overflow:hidden;box-sizing:border-box;}' +
  '#stageC{width:384px;height:384px;max-width:100%;background:#1c2530;display:block;margin:0 auto 8px;border:3px solid #d4af37;border-radius:4px;image-rendering:pixelated;outline:none;}' +
  '#out{max-height:110px;overflow:auto;}#out div{white-space:pre-wrap;line-height:1.5;padding:1px 0;}' +
  '.ok{color:#d9f7b0;}.err{color:#ff9b9b;font-weight:bold;}.info{color:#9fd0ff;}' +
  '</style></head><body><canvas id="stageC" width="320" height="320" tabindex="0"></canvas><div id="out"></div><script>(function(){' +
  'var out=document.getElementById("out");var canvas=document.getElementById("stageC");var ctx=canvas.getContext("2d");canvas.focus();' +
  'function show(cls,args){var d=document.createElement("div");d.className=cls;d.textContent=args.map(function(a){if(a&&typeof a==="object"){try{return JSON.stringify(a);}catch(e){return String(a);}}return String(a);}).join(" ");out.appendChild(d);}' +
  'console.log=function(){show("ok",[].slice.call(arguments));};console.error=function(){show("err",[].slice.call(arguments));};' +
  'window.onerror=function(msg,src,line){show("err",["Oops! "+String(msg)+(line?("  [line "+line+"]"):"")]);return true;};';
const helpers =
  'var PALETTE={".":null," ":null,"k":"#1a1a1a","w":"#ffffff","s":"#f2c79a","g":"#3aa63a","G":"#1f6d1f","b":"#3a6ea6","y":"#ffd23f","r":"#d63a3a","n":"#8a5a2a","e":"#e8e8e8","p":"#9a4ecf"};' +
  'function drawSprite(sprite,screenX,screenY,pixelSize,palette){palette=palette||PALETTE;for(var rowIndex=0;rowIndex<sprite.length;rowIndex++){var row=sprite[rowIndex];for(var colIndex=0;colIndex<row.length;colIndex++){var color=palette[row[colIndex]];if(!color)continue;ctx.fillStyle=color;ctx.fillRect(screenX+colIndex*pixelSize,screenY+rowIndex*pixelSize,pixelSize,pixelSize);}}}';
const tail = '\n})();<\/scr'+'ipt></body></html>';
const userWrapped = 'try{\n' + topic.exercise.starter + '\n}catch(e){show("err",["Oops! "+e.message]);}';

const outPath = path.join(outDir, 'render-' + topic.id + '.html');
fs.writeFileSync(outPath, head + helpers + userWrapped + tail);
console.log(outPath);
