const TOPICS = [
{
  id:"many-floors",
  title:"Many Floors",
  sub:"Storing more than one map",
  lesson:
    "<p>A real dungeon has more than one room — it has <b>floors</b> you climb down into. In Level 2 "+
    "you built one map (a grid of tiles). Now we keep <b>several maps</b> together in one array — a "+
    "list of maps:</p>"+
    "<pre><code>const floors = [\n  floor1Map,   // the top floor\n  floor2Map,   // one floor down\n  floor3Map    // the deepest floor\n];</code></pre>"+
    "<p>Each map is itself an array of rows (from Level 2), so <code>floors</code> is a "+W("list of lists","an array where each item is itself an array — here, each floor is a whole map")+". "+
    "To draw one floor, we pick it out: <code>floors[0]</code> is the first floor.</p>",
  model:"floors is a stack of maps — like a tall building. Each item in the array is one whole floor's grid.",
  mistakes:[
    "Forgetting the first floor is <code>floors[0]</code>, not <code>floors[1]</code>.",
    "Mixing up a floor (a whole map) with a single row of tiles.",
    "Drawing every floor at once — draw one floor at a time."
  ],
  exercise:{
    intro:"Run it to draw the first floor. Then change <code>floors[0]</code> to <code>floors[1]</code> or <code>floors[2]</code> and Run again to see the other floors — same code, different map!",
    starter:'const floors = [\n  [[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1]],\n  [[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,1,1,1]],\n  [[1,1,1,1,1],[1,0,0,0,1],[1,1,0,1,1],[1,0,0,0,1],[1,1,1,1,1]]\n];\n\nconst map = floors[0];\nconst TILE = 60;\n\nctx.fillStyle = "#22303a";\nctx.fillRect(0, 0, 320, 320);\nfor (let row = 0; row < map.length; row++) {\n  for (let col = 0; col < map[row].length; col++) {\n    ctx.fillStyle = map[row][col] === 1 ? "#5b3a1a" : "#4c9a2a";\n    ctx.fillRect(10 + col * TILE, 10 + row * TILE, TILE - 2, TILE - 2);\n  }\n}\nctx.fillStyle = "#fff"; ctx.font = "14px monospace";\nctx.fillText("There are " + floors.length + " floors. This is floor 1.", 10, 312);\nconsole.log("floors is an array of " + floors.length + " maps.");'
  },
  summary:"Keep several maps in one array called floors — a list of lists. floors[0] is the first floor's whole grid. Draw one floor at a time."
},
{
  id:"current-floor",
  title:"Which Floor Am I On?",
  sub:"The currentFloor variable",
  lesson:
    "<p>We need to remember which floor the hero is standing on. That's one number — "+
    "<code>currentFloor</code> — used as the index into the <code>floors</code> array:</p>"+
    "<pre><code>let currentFloor = 0;\nconst map = floors[currentFloor];   // always the active floor</code></pre>"+
    "<p>Change <code>currentFloor</code> and the game draws a different map. It's the same idea as "+
    "<code>hero.facing</code> from Level 2 — one label that decides what to draw. To go one floor "+
    "down, we just add 1:</p>"+
    "<pre><code>currentFloor = currentFloor + 1;</code></pre>",
  model:"currentFloor is a bookmark. It points at one floor in the stack; move the bookmark and the whole game switches floors.",
  mistakes:[
    "Going past the last floor: <code>floors[3]</code> when there are only 3 floors (0,1,2) is <code>undefined</code>.",
    "Forgetting to redraw after changing floors.",
    "Using the wrong variable to pick the map — always <code>floors[currentFloor]</code>."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to move down through the floors. Each floor has its own layout AND its own color.",
    starter:'const floors = [\n  [[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1]],\n  [[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,1,1,1]],\n  [[1,1,1,1,1],[1,0,0,0,1],[1,1,0,1,1],[1,0,0,0,1],[1,1,1,1,1]]\n];\nconst floorColors = ["#4c9a2a", "#4a7ab0", "#7a5a8a"];\nlet currentFloor = 0;\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    currentFloor = (currentFloor + 1) % floors.length;\n    actionCooldown = 14;\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  const map = floors[currentFloor];\n  const TILE = 60;\n  ctx.fillStyle = "#22303a";\n  ctx.fillRect(0, 0, 320, 320);\n  for (let row = 0; row < map.length; row++)\n    for (let col = 0; col < map[row].length; col++) {\n      ctx.fillStyle = map[row][col] === 1 ? "#3a2a15" : floorColors[currentFloor];\n      ctx.fillRect(10 + col * TILE, 10 + row * TILE, TILE - 2, TILE - 2);\n    }\n  ctx.fillStyle = "#fff"; ctx.font = "14px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + "  (press SPACE)", 10, 312);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to change floors.");'
  },
  summary:"currentFloor is the index of the active floor. floors[currentFloor] is the map to draw. Add 1 to go down; the whole game switches floors."
},
{
  id:"door-tiles",
  title:"Doors & Stairs",
  sub:"Special tiles",
  lesson:
    "<p>How do you get from one floor to another? Through <b>special tiles</b>. So far tiles were "+
    "<code>0</code> (floor) and <code>1</code> (wall). Now we add two more:</p>"+
    "<ul><li><code>2</code> — <b>stairs down</b> (go deeper)</li><li><code>3</code> — <b>a door up</b> (go back)</li></ul>"+
    "<p>When we draw the map, we check the tile number and draw the matching picture on top of the "+
    "floor:</p>"+
    "<pre><code>if (tile === 2) drawSprite(downStairsSprite, x, y, 4, PALETTE);\nif (tile === 3) drawSprite(doorSprite, x, y, 4, PALETTE);</code></pre>"+
    "<p>The number in the grid is just a code. <i>You</i> decide what each number means and what "+
    "it looks like.</p>",
  model:"A tilemap is a secret code: 0 floor, 1 wall, 2 stairs, 3 door. The drawing code turns each number into a picture.",
  mistakes:[
    "Drawing the stairs but forgetting to draw the floor under it first.",
    "Using a tile number your drawing code doesn't know — it'll just look like blank floor.",
    "Putting a door where the hero can never reach it."
  ],
  exercise:{
    intro:"Run it to see a dungeon floor with a door (top) and stairs down (bottom). Change some 0s to 1s to build walls, or move the 2 and 3 around.",
    starter:'const doorSprite        = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".knynnk.",".knnnnk.",".knnnnk.",".kkkkkk."];\nconst downStairsSprite  = ["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"];\nconst map = [\n  [1,1,1,1,1,1,1,1,1,1],\n  [1,0,0,0,0,3,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,2,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\nconst TILE = 32;\nfor (let row = 0; row < map.length; row++)\n  for (let col = 0; col < map[row].length; col++) {\n    const tile = map[row][col];\n    ctx.fillStyle = tile === 1 ? "#5b3a1a" : "#4c9a2a";\n    ctx.fillRect(col * TILE, row * TILE, TILE, TILE);\n    if (tile === 2) drawSprite(downStairsSprite, col * TILE, row * TILE, 4, PALETTE);\n    if (tile === 3) drawSprite(doorSprite, col * TILE, row * TILE, 4, PALETTE);\n  }\nconsole.log("Tile 3 is a door (up). Tile 2 is stairs (down).");'
  },
  summary:"Add special tile codes (2 = stairs down, 3 = door up) to the grid. The drawing code turns each number into its own picture on top of the floor."
},
{
  id:"through-door",
  title:"Through the Doorway",
  sub:"Stepping onto stairs changes floors",
  lesson:
    "<p>Now the magic: when the hero <b>stands on</b> a stairs tile, we change floors. First we find "+
    "which tile the hero is on by turning its pixel position into grid numbers:</p>"+
    "<pre><code>const heroCol = Math.floor((hero.x + hero.size / 2) / TILE);\nconst heroRow = Math.floor((hero.y + hero.size / 2) / TILE);\nconst tile = floors[currentFloor][heroRow][heroCol];</code></pre>"+
    "<p>Then, if that tile is the stairs, we go down:</p>"+
    "<pre><code>if (tile === 2) currentFloor = currentFloor + 1;</code></pre>"+
    "<p>We divide the hero's pixel position by <code>TILE</code> and <code>Math.floor</code> it to "+
    "get the grid square — the reverse of drawing, where we multiplied a grid square by TILE.</p>",
  model:"Pixels ÷ TILE (floored) = which grid square you're standing on. Read the tile there; if it's stairs, change floors.",
  mistakes:[
    "Forgetting to divide by TILE — pixel 160 is grid square 5, not 160.",
    "Reading <code>[heroCol][heroRow]</code> — it's <code>[heroRow][heroCol]</code>.",
    "Not clicking the game screen first, so the arrows don't move the hero."
  ],
  exercise:{
    intro:"Run it, click the screen, and walk the hero down onto the stairs. Watch the floor change color and number! (You'll land at the top — the next topic fixes where you land.)",
    starter:'const heroDown = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroSprites = { down: heroDown, up: heroDown, left: heroDown, right: heroDown };\nconst downStairsSprite = ["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"];\nconst floorColors = ["#4c9a2a", "#4a7ab0", "#7a5a8a"];\nconst TILE = 32;\nconst blank = [\n  [1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\nconst floors = [blank, blank, blank];\nlet currentFloor = 0;\nlet hero = { x: 150, y: 90, size: 24, speed: 2 };\nlet keysHeld = {};\nlet transitionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nlet previousTime = 0;\nfunction loop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (keysHeld["ArrowLeft"])  hero.x = hero.x - hero.speed * frameScale;\n  if (keysHeld["ArrowRight"]) hero.x = hero.x + hero.speed * frameScale;\n  if (keysHeld["ArrowUp"])    hero.y = hero.y - hero.speed * frameScale;\n  if (keysHeld["ArrowDown"])  hero.y = hero.y + hero.speed * frameScale;\n  if (hero.x < TILE) hero.x = TILE;\n  if (hero.x + hero.size > 288) hero.x = 288 - hero.size;\n  if (hero.y < TILE) hero.y = TILE;\n  if (hero.y + hero.size > 288) hero.y = 288 - hero.size;\n\n  if (transitionCooldown > 0) transitionCooldown = transitionCooldown - frameScale;\n  const heroCol = Math.floor((hero.x + hero.size / 2) / TILE);\n  const heroRow = Math.floor((hero.y + hero.size / 2) / TILE);\n  const tile = floors[currentFloor][heroRow][heroCol];\n  if (tile === 2 && transitionCooldown <= 0 && currentFloor < floors.length - 1) {\n    currentFloor = currentFloor + 1;\n    hero.y = 90;\n    transitionCooldown = 20;\n    console.log("Went down to floor " + (currentFloor + 1));\n  }\n\n  const map = floors[currentFloor];\n  for (let row = 0; row < map.length; row++)\n    for (let col = 0; col < map[row].length; col++) {\n      ctx.fillStyle = map[row][col] === 1 ? "#3a2a15" : floorColors[currentFloor];\n      ctx.fillRect(col * TILE, row * TILE, TILE, TILE);\n      if (map[row][col] === 2) drawSprite(downStairsSprite, col * TILE, row * TILE, 4, PALETTE);\n    }\n  drawSprite(heroSprites.down, hero.x, hero.y, 3, PALETTE);\n  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + " — walk onto the stairs", 8, 20);\n  requestAnimationFrame(loop);\n}\nrequestAnimationFrame(loop);\nconsole.log("Click the screen, then walk down onto the stairs.");'
  },
  summary:"Turn the hero's pixel position into a grid square with Math.floor(pixels / TILE). Read the tile there; if it's stairs, change currentFloor."
},
{
  id:"entry-points",
  title:"Where You Land",
  sub:"Entry points",
  lesson:
    "<p>When you arrive on a new floor, <i>where</i> should the hero appear? Not on top of the "+
    "stairs (you'd bounce straight back!), but at a chosen spot: an "+W("entry point","the tile where the hero appears when they arrive on a floor")+".</p>"+
    "<p>We give each floor an <code>entry</code> — a grid square — and place the hero there when "+
    "they arrive:</p>"+
    "<pre><code>const entry = floorEntries[currentFloor];\nhero.x = entry.col * TILE;\nhero.y = entry.row * TILE;</code></pre>"+
    "<p>Multiplying the grid square by <code>TILE</code> turns it back into pixels — the same trick "+
    "you use to draw a tile. Now the hero lands somewhere safe and sensible on the new floor.</p>",
  model:"An entry point is a welcome mat. Every floor has one; when you arrive, you land on the mat, not on the stairs you came through.",
  mistakes:[
    "Landing right on the stairs, so you instantly transport again (a loop!).",
    "Forgetting to multiply the entry grid square by <code>TILE</code> to get pixels.",
    "Giving a floor an entry inside a wall."
  ],
  exercise:{
    intro:"Run it, click the screen, and walk onto the stairs. Now you land on a green <b>marked spot</b> (the entry point) instead of at the top — no more bouncing!",
    starter:'const heroDown = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst downStairsSprite = ["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"];\nconst floorColors = ["#4c9a2a", "#4a7ab0", "#7a5a8a"];\nconst TILE = 32;\nconst blank = [\n  [1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\nconst floors = [blank, blank, blank];\nconst floorEntries = [ { col: 5, row: 2 }, { col: 2, row: 2 }, { col: 7, row: 2 } ];\nlet currentFloor = 0;\nlet hero = { x: 150, y: 90, size: 24, speed: 2 };\nlet keysHeld = {};\nlet transitionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nlet previousTime = 0;\nfunction loop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (keysHeld["ArrowLeft"])  hero.x = hero.x - hero.speed * frameScale;\n  if (keysHeld["ArrowRight"]) hero.x = hero.x + hero.speed * frameScale;\n  if (keysHeld["ArrowUp"])    hero.y = hero.y - hero.speed * frameScale;\n  if (keysHeld["ArrowDown"])  hero.y = hero.y + hero.speed * frameScale;\n  if (hero.x < TILE) hero.x = TILE;\n  if (hero.x + hero.size > 288) hero.x = 288 - hero.size;\n  if (hero.y < TILE) hero.y = TILE;\n  if (hero.y + hero.size > 288) hero.y = 288 - hero.size;\n\n  if (transitionCooldown > 0) transitionCooldown = transitionCooldown - frameScale;\n  const heroCol = Math.floor((hero.x + hero.size / 2) / TILE);\n  const heroRow = Math.floor((hero.y + hero.size / 2) / TILE);\n  if (floors[currentFloor][heroRow][heroCol] === 2 && transitionCooldown <= 0 && currentFloor < floors.length - 1) {\n    currentFloor = currentFloor + 1;\n    const entry = floorEntries[currentFloor];\n    hero.x = entry.col * TILE;\n    hero.y = entry.row * TILE;\n    transitionCooldown = 20;\n    console.log("Landed on floor " + (currentFloor + 1) + " at the entry point");\n  }\n\n  const map = floors[currentFloor];\n  for (let row = 0; row < map.length; row++)\n    for (let col = 0; col < map[row].length; col++) {\n      ctx.fillStyle = map[row][col] === 1 ? "#3a2a15" : floorColors[currentFloor];\n      ctx.fillRect(col * TILE, row * TILE, TILE, TILE);\n      if (map[row][col] === 2) drawSprite(downStairsSprite, col * TILE, row * TILE, 4, PALETTE);\n    }\n  const entry = floorEntries[currentFloor];\n  ctx.fillStyle = "#ffe14d";\n  ctx.fillRect(entry.col * TILE + 12, entry.row * TILE + 12, 8, 8);\n  drawSprite(heroDown, hero.x, hero.y, 3, PALETTE);\n  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + " — gold dot is the entry", 8, 20);\n  requestAnimationFrame(loop);\n}\nrequestAnimationFrame(loop);\nconsole.log("Click the screen, walk onto the stairs, and land on the entry point.");'
  },
  summary:"Give every floor an entry point (a grid square). On arrival, place the hero there with entry.col * TILE and entry.row * TILE. No more bouncing on the stairs."
},
{
  id:"off-the-edge",
  title:"Off the Edge",
  sub:"Paths at the edge of the screen",
  lesson:
    "<p>Stairs aren't the only way through. Sometimes a <b>path at the edge of the screen</b> leads "+
    "to the next area — walk off the right side and appear on the left side of a new floor. We "+
    "check if the hero has gone past an edge:</p>"+
    "<pre><code>if (hero.x > 320) {           // walked off the right edge\n  currentFloor = currentFloor + 1;\n  hero.x = 0;                 // appear on the left of the new floor\n}</code></pre>"+
    "<p>It's the same idea as stairs — change <code>currentFloor</code> and reposition the hero — "+
    "but the trigger is <i>reaching the edge</i> instead of standing on a tile. Notice the hero "+
    "enters the new floor from a <b>different spot</b> (the opposite edge).</p>",
  model:"An edge exit is a hallway off the screen. Cross the edge and you step onto the next floor from the far side.",
  mistakes:[
    "Clamping the hero to the screen so hard it can never reach the edge to leave.",
    "Forgetting to move the hero to the opposite side, so it leaves again instantly.",
    "Running off the last floor's edge with nowhere to go — check the floor exists first."
  ],
  exercise:{
    intro:"Run it, click the screen, and walk off the <b>right edge</b> of the screen. You'll step onto the next floor from the left. Walk off the left edge to go back!",
    starter:'const heroDown = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst floorColors = ["#4c9a2a", "#4a7ab0", "#7a5a8a"];\nlet currentFloor = 0;\nlet hero = { x: 150, y: 150, size: 24, speed: 2 };\nlet keysHeld = {};\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nlet previousTime = 0;\nfunction loop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (keysHeld["ArrowLeft"])  hero.x = hero.x - hero.speed * frameScale;\n  if (keysHeld["ArrowRight"]) hero.x = hero.x + hero.speed * frameScale;\n  if (keysHeld["ArrowUp"])    hero.y = hero.y - hero.speed * frameScale;\n  if (keysHeld["ArrowDown"])  hero.y = hero.y + hero.speed * frameScale;\n  if (hero.y < 0) hero.y = 0;\n  if (hero.y + hero.size > 320) hero.y = 320 - hero.size;\n\n  if (hero.x > 320 && currentFloor < 2) {\n    currentFloor = currentFloor + 1;\n    hero.x = 0;\n    console.log("Walked right into floor " + (currentFloor + 1));\n  }\n  if (hero.x + hero.size < 0 && currentFloor > 0) {\n    currentFloor = currentFloor - 1;\n    hero.x = 320 - hero.size;\n    console.log("Walked left into floor " + (currentFloor + 1));\n  }\n\n  ctx.fillStyle = floorColors[currentFloor];\n  ctx.fillRect(0, 0, 320, 320);\n  drawSprite(heroDown, hero.x, hero.y, 3, PALETTE);\n  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + " — walk off the left/right edge", 8, 20);\n  requestAnimationFrame(loop);\n}\nrequestAnimationFrame(loop);\nconsole.log("Click the screen, then walk off the right edge of the screen.");'
  },
  summary:"An edge exit checks if the hero crossed a screen edge, then changes floors and moves the hero to the opposite side — arriving from a different spot."
},
{
  id:"floor-memory",
  title:"Each Floor Remembers",
  sub:"Per-floor state",
  lesson:
    "<p>If you open a chest on floor 1, leave, and come back — it should still be open! The trick is "+
    "to store each floor's things <b>inside that floor</b>, not in one shared pile. We bundle a "+
    "floor's map and its chests together in an object:</p>"+
    "<pre><code>let floors = [\n  { map: floor1Map, chests: [ {x:60,y:60,opened:false} ] },\n  { map: floor2Map, chests: [ {x:90,y:90,opened:false} ] }\n];</code></pre>"+
    "<p>Now <code>floors[0].chests</code> belongs only to floor 0. Switching floors doesn't touch "+
    "the others, so every floor <b>remembers its own state</b> — opened chests stay opened, "+
    "forever.</p>",
  model:"Each floor is its own box holding its own stuff. Leaving a floor doesn't empty its box — the chest you opened is still opened when you return.",
  mistakes:[
    "Using one shared <code>chests</code> list for all floors, so they all change together.",
    "Reading <code>floors[currentFloor].chests</code> but writing to a different list.",
    "Forgetting each floor keeps its own map too."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to open the chest on this floor, then press <b>F</b> to switch floors. Each floor remembers whether its own chest is open!",
    starter:'const chestClosedSprite = [".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."];\nconst chestOpenSprite   = ["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."];\nconst floorColors = ["#4c9a2a", "#4a7ab0"];\nlet floors = [\n  { chest: { opened: false } },\n  { chest: { opened: false } }\n];\nlet currentFloor = 0;\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (actionCooldown > 0) return;\n  if (event.key === " ") { floors[currentFloor].chest.opened = true; actionCooldown = 12; }\n  if (event.key === "f" || event.key === "F") { currentFloor = (currentFloor + 1) % floors.length; actionCooldown = 12; }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  const chest = floors[currentFloor].chest;\n  ctx.fillStyle = floorColors[currentFloor];\n  ctx.fillRect(0, 0, 320, 320);\n  drawSprite(chest.opened ? chestOpenSprite : chestClosedSprite, 128, 120, 8, PALETTE);\n  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + " chest: " + (chest.opened ? "OPEN" : "closed"), 8, 24);\n  ctx.fillText("SPACE = open,  F = switch floor", 8, 312);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen. SPACE opens this floor\'s chest, F switches floors.");'
  },
  summary:"Store each floor's things inside a floor object (its own map, chests, enemies). Then every floor remembers its own state when you leave and come back."
},
{
  id:"floor-objects",
  title:"Tidy Dungeon Code",
  sub:"Bundling a floor into an object",
  lesson:
    "<p>As the game grows, loose variables get messy. The fix is to keep everything a floor needs in "+
    "one <b>floor object</b> — its map, its colors, its enemies, its chests, and its entry point:</p>"+
    "<pre><code>let floor = {\n  map: floor1Map,\n  floorColor: \"#4c9a2a\",\n  enemies: [ /* ... */ ],\n  chests: [ /* ... */ ],\n  entry: { col: 5, row: 2 }\n};</code></pre>"+
    "<p>A little helper keeps the code clean: <code>getFloor()</code> hands back the active floor so "+
    "we don't write <code>floors[currentFloor]</code> everywhere:</p>"+
    "<pre><code>function getFloor() { return floors[currentFloor]; }</code></pre>"+
    "<p>Tidy code with clear names and small helpers is how a growing game stays understandable.</p>",
  model:"A floor object is a labeled toolbox: everything for that floor in one place. getFloor() just hands you the toolbox you're using right now.",
  mistakes:[
    "Keeping map, enemies, and chests in separate lists that can drift out of sync.",
    "Writing <code>floors[currentFloor]</code> over and over instead of a <code>getFloor()</code> helper.",
    "Giving things unclear names — a good name is worth a comment."
  ],
  exercise:{
    intro:"Run it: each floor object carries its own color and its own slimes. Press <b>SPACE</b> to switch floors and see a completely different set-up, all from one tidy object.",
    starter:'const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\nlet floors = [\n  { floorColor: "#4c9a2a", enemies: [ { x: 80, y: 90 }, { x: 200, y: 180 } ] },\n  { floorColor: "#4a7ab0", enemies: [ { x: 150, y: 150 } ] },\n  { floorColor: "#7a5a8a", enemies: [ { x: 60, y: 200 }, { x: 220, y: 80 }, { x: 150, y: 240 } ] }\n];\nlet currentFloor = 0;\nlet actionCooldown = 0;\n\nfunction getFloor() { return floors[currentFloor]; }\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    currentFloor = (currentFloor + 1) % floors.length;\n    actionCooldown = 14;\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  const floor = getFloor();\n  ctx.fillStyle = floor.floorColor;\n  ctx.fillRect(0, 0, 320, 320);\n  for (let enemyIndex = 0; enemyIndex < floor.enemies.length; enemyIndex++) {\n    const enemy = floor.enemies[enemyIndex];\n    drawSprite(slimeSprite, enemy.x, enemy.y, 4, PALETTE);\n  }\n  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + " has " + floor.enemies.length + " slimes (press SPACE)", 8, 24);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE. Each floor object carries its own slimes.");'
  },
  summary:"Bundle each floor's map, colors, enemies, chests, and entry into one floor object. A getFloor() helper hands back the active one, keeping growing code tidy."
},
{
  id:"mini-map",
  title:"The Mini-Map",
  sub:"Showing where you are",
  lesson:
    "<p>In a tall dungeon it's easy to get lost. A <b>mini-map</b> is a tiny HUD picture that shows "+
    "all the floors and highlights the one you're on. We draw a small square for each floor and "+
    "light up the current one:</p>"+
    "<pre><code>for (let f = 0; f < floors.length; f++) {\n  ctx.fillStyle = (f === currentFloor) ? \"#ffe14d\" : \"#204020\";\n  ctx.fillRect(290, 8 + f * 20, 16, 16);\n}</code></pre>"+
    "<p>The loop stacks the floor markers top to bottom. The <code>f === currentFloor</code> check "+
    "paints your floor gold and the rest dark — so at a glance you know how deep you are.</p>",
  model:"A mini-map is an elevator panel: one button per floor, the current floor lit up so you always know where you are.",
  mistakes:[
    "Drawing the mini-map under the game, where it's hidden — draw it last, on top.",
    "Highlighting the wrong floor — compare <code>f === currentFloor</code>.",
    "Spacing the markers so they overlap or run off the screen."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to go deeper. Watch the mini-map on the right light up the floor you're on.",
    starter:'const floors = ["#4c9a2a", "#4a7ab0", "#7a5a8a", "#5a3a6a"];\nlet currentFloor = 0;\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    if (currentFloor < floors.length - 1) currentFloor = currentFloor + 1;\n    actionCooldown = 14;\n  }\n});\n\nfunction drawMiniMap() {\n  for (let f = 0; f < floors.length; f++) {\n    ctx.fillStyle = f === currentFloor ? "#ffe14d" : "#204020";\n    ctx.fillRect(290, 8 + f * 20, 16, 16);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1;\n    ctx.strokeRect(290, 8 + f * 20, 16, 16);\n  }\n}\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = floors[currentFloor];\n  ctx.fillRect(0, 0, 320, 320);\n  ctx.fillStyle = "#fff"; ctx.font = "16px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + " of " + floors.length, 20, 40);\n  ctx.fillText("Press SPACE to go deeper", 20, 300);\n  drawMiniMap();\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE. Watch the mini-map on the right.");'
  },
  summary:"A mini-map loops over the floors and draws a marker for each, painting the current one gold. Draw it last so it sits on top of the game."
},
{
  id:"final-1",
  title:"Final Quest · Step 1",
  sub:"Descend the dungeon",
  isFinal:true,
  lesson:
    "<p>&#127894; <b>The Final Quest of Level 4 begins!</b> You'll build a real <b>3-floor dungeon</b> "+
    "you can explore, with stairs down, doors back up, entry points, and a mini-map so you never get "+
    "lost.</p>"+
    "<p><b>Step 1: descend.</b> Each floor is a tidy floor object with its own map, colors, and entry "+
    "points. Walk onto the <b>stairs</b> (the grey hole) to go down, and back through the <b>door</b> "+
    "(the brown door) to climb up. The mini-map shows how deep you are. Everything you learned this "+
    "level, working together.</p>",
  model:"The dungeon is a stack of floor objects. Stairs and doors move the bookmark (currentFloor) and drop you at that floor's entry point; the mini-map shows the bookmark.",
  mistakes:[
    "Landing on a stairs tile, causing an instant loop — land at the entry point instead.",
    "Forgetting the up-door on lower floors, so you can't climb back.",
    "Drawing the mini-map before the floor, so it hides behind the map."
  ],
  exercise:{
    intro:"Run it, click the screen, and explore all three floors. Walk onto the grey stairs to go down, and the brown door to go back up. Watch the mini-map on the right!",
    starter:'const TILE = 32;\nconst heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst doorSprite       = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".knynnk.",".knnnnk.",".knnnnk.",".kkkkkk."];\nconst downStairsSprite = ["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"];\n\nconst floor0 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\nconst floor1 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\nconst floor2 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\n\nlet floors = [\n  { map: floor0, floorColor: "#4c9a2a", wallColor: "#5b3a1a", entryFromAbove: { col: 5, row: 2 }, entryFromBelow: { col: 5, row: 7 } },\n  { map: floor1, floorColor: "#5a7a6a", wallColor: "#3a3a4a", entryFromAbove: { col: 5, row: 2 }, entryFromBelow: { col: 5, row: 7 } },\n  { map: floor2, floorColor: "#7a5a8a", wallColor: "#2a2a3a", entryFromAbove: { col: 5, row: 2 }, entryFromBelow: { col: 5, row: 7 } }\n];\nlet currentFloor = 0;\nlet hero = { x: 150, y: 120, size: 24, speed: 2, facing: "down" };\nlet keysHeld = {};\nlet transitionCooldown = 0;\nlet message = "Find the stairs down!";\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nfunction getFloor() { return floors[currentFloor]; }\n\nfunction moveHero(frameScale) {\n  if (keysHeld["ArrowLeft"])  { hero.x = hero.x - hero.speed * frameScale; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { hero.x = hero.x + hero.speed * frameScale; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { hero.y = hero.y - hero.speed * frameScale; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { hero.y = hero.y + hero.speed * frameScale; hero.facing = "down"; }\n  if (hero.x < TILE) hero.x = TILE;\n  if (hero.x + hero.size > 320 - TILE) hero.x = 320 - TILE - hero.size;\n  if (hero.y < TILE) hero.y = TILE;\n  if (hero.y + hero.size > 320 - TILE) hero.y = 320 - TILE - hero.size;\n}\n\nfunction checkStairs(frameScale) {\n  if (transitionCooldown > 0) { transitionCooldown = transitionCooldown - frameScale; return; }\n  const heroCol = Math.floor((hero.x + hero.size / 2) / TILE);\n  const heroRow = Math.floor((hero.y + hero.size / 2) / TILE);\n  const tile = getFloor().map[heroRow][heroCol];\n  if (tile === 2 && currentFloor < floors.length - 1) {\n    currentFloor = currentFloor + 1;\n    const entry = getFloor().entryFromAbove;\n    hero.x = entry.col * TILE; hero.y = entry.row * TILE;\n    transitionCooldown = 20;\n    message = "Went down to floor " + (currentFloor + 1);\n  } else if (tile === 3 && currentFloor > 0) {\n    currentFloor = currentFloor - 1;\n    const entry = getFloor().entryFromBelow;\n    hero.x = entry.col * TILE; hero.y = entry.row * TILE;\n    transitionCooldown = 20;\n    message = "Climbed to floor " + (currentFloor + 1);\n  }\n}\n\nfunction drawFloor() {\n  const floor = getFloor();\n  for (let row = 0; row < floor.map.length; row++)\n    for (let col = 0; col < floor.map[row].length; col++) {\n      const tile = floor.map[row][col];\n      ctx.fillStyle = tile === 1 ? floor.wallColor : floor.floorColor;\n      ctx.fillRect(col * TILE, row * TILE, TILE, TILE);\n      if (tile === 2) drawSprite(downStairsSprite, col * TILE, row * TILE, 4, PALETTE);\n      if (tile === 3) drawSprite(doorSprite, col * TILE, row * TILE, 4, PALETTE);\n    }\n}\n\nfunction drawMiniMap() {\n  for (let f = 0; f < floors.length; f++) {\n    ctx.fillStyle = f === currentFloor ? "#ffe14d" : "#204020";\n    ctx.fillRect(294, 8 + f * 20, 16, 16);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1;\n    ctx.strokeRect(294, 8 + f * 20, 16, 16);\n  }\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  moveHero(frameScale);\n  checkStairs(frameScale);\n\n  drawFloor();\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  ctx.fillStyle = "#fff"; ctx.font = "12px monospace";\n  ctx.fillText("Floor " + (currentFloor + 1) + " of " + floors.length, 8, 18);\n  ctx.fillText(message, 8, 312);\n  drawMiniMap();\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen. Walk onto the grey stairs to descend, the brown door to climb.");'
  },
  summary:"A 3-floor dungeon of floor objects: stairs (tile 2) go down, doors (tile 3) go up, each transition drops you at that floor's entry point, and a mini-map shows how deep you are — all time-based."
},
{
  id:"final-2",
  title:"Final Quest · Step 2",
  sub:"The deep dungeon",
  isFinal:true,
  lesson:
    "<p><b>Step 2: the deep dungeon.</b> Now every floor gets its own <b>slimes</b> and <b>chest</b>, "+
    "and we bring back everything from Level 3 — sword combat, XP, and leveling. Because each floor "+
    "object holds its own enemies and chest, every floor <b>remembers</b> what you cleared.</p>"+
    "<p>This is the whole Level 4 game: a multi-floor dungeon you descend, fighting slimes, looting "+
    "chests, and leveling up as you go. Clear <b>every slime on every floor</b> to win.</p>"+
    "<p><b>Your mission:</b> descend all three floors, defeat every slime, and grow strong. Then make "+
    "it yours — add floors, add enemies, hide treasure deeper down. It's your dungeon!</p>",
  model:"The finished level is a tower of floor objects the hero moves through. Global stats (health, level, XP) travel with the hero; each floor keeps its own enemies and chest.",
  mistakes:[
    "Fighting the wrong floor's enemies — always act on <code>getFloor().enemies</code>.",
    "Storing enemies in one shared list, so cleared floors refill when you return.",
    "Forgetting the win check — count enemies across ALL floors and win at zero."
  ],
  exercise:{
    intro:"THE DEEP DUNGEON. Run it, click the screen, arrows to move, SPACE to swing. Descend the stairs, fight the slimes on every floor, open chests, and level up. Clear all three floors to win!",
    starter:'const TILE = 32;\nconst heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\nconst chestClosedSprite = [".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."];\nconst chestOpenSprite   = ["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."];\nconst doorSprite        = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".knynnk.",".knnnnk.",".knnnnk.",".kkkkkk."];\nconst downStairsSprite  = ["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"];\n\nconst floor0 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\nconst floor1 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\nconst floor2 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\n\nlet floors = [\n  { map: floor0, floorColor: "#4c9a2a", wallColor: "#5b3a1a", entryFromAbove: {col:5,row:2}, entryFromBelow: {col:5,row:7},\n    enemies: [ {x:80,y:90,size:22,speed:0.3,wander:0.6,health:2} ],\n    chest: {x:64,y:64,size:24,opened:false} },\n  { map: floor1, floorColor: "#5a7a6a", wallColor: "#3a3a4a", entryFromAbove: {col:5,row:2}, entryFromBelow: {col:5,row:7},\n    enemies: [ {x:70,y:200,size:22,speed:0.3,wander:0.6,health:2}, {x:230,y:120,size:22,speed:0.34,wander:0.6,health:2} ],\n    chest: {x:230,y:230,size:24,opened:false} },\n  { map: floor2, floorColor: "#7a5a8a", wallColor: "#2a2a3a", entryFromAbove: {col:5,row:2}, entryFromBelow: {col:5,row:7},\n    enemies: [ {x:80,y:230,size:22,speed:0.32,wander:0.7,health:3}, {x:230,y:200,size:22,speed:0.32,wander:0.7,health:3} ],\n    chest: {x:150,y:230,size:24,opened:false} }\n];\nlet currentFloor = 0;\nlet hero = { x: 150, y: 120, size: 24, speed: 2, facing: "down" };\nlet heroHealth = 3, maxHealth = 3, attackPower = 1, level = 1, experience = 0, experienceToNext = 30, rupees = 0;\nlet hurtCooldown = 0, attackTimer = 0, transitionCooldown = 0;\nlet gameOver = false, dungeonCleared = false;\nlet keysHeld = {};\nlet message = "Descend and clear every floor!";\n\nwindow.addEventListener("keyup", function(event) { keysHeld[event.key] = false; });\nwindow.addEventListener("keydown", function(event) {\n  keysHeld[event.key] = true;\n  if (event.key === " " && attackTimer <= 0 && !gameOver && !dungeonCleared) { swingSword(); attackTimer = 12; }\n});\n\nfunction getFloor() { return floors[currentFloor]; }\nfunction box(thing) { return { x: thing.x, y: thing.y, width: thing.size, height: thing.size }; }\nfunction isTouching(a, b) { return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y; }\nfunction countAllEnemies() { let total = 0; for (let f = 0; f < floors.length; f++) total = total + floors[f].enemies.length; return total; }\n\nfunction addExperience(amount) {\n  experience = experience + amount;\n  while (experience >= experienceToNext) {\n    experience = experience - experienceToNext;\n    level = level + 1; maxHealth = maxHealth + 1; attackPower = attackPower + 1; heroHealth = maxHealth;\n    experienceToNext = level * 20;\n    message = "LEVEL UP! You are level " + level;\n  }\n}\n\nfunction getSwordHitbox() {\n  const REACH = 22;\n  if (hero.facing === "right") return { x: hero.x + hero.size, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "left")  return { x: hero.x - REACH, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "up")    return { x: hero.x, y: hero.y - REACH, width: hero.size, height: REACH };\n  return { x: hero.x, y: hero.y + hero.size, width: hero.size, height: REACH };\n}\n\nfunction swingSword() {\n  const sword = getSwordHitbox();\n  const enemies = getFloor().enemies;\n  for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex--) {\n    if (isTouching(sword, box(enemies[enemyIndex]))) {\n      enemies[enemyIndex].health = enemies[enemyIndex].health - attackPower;\n      if (enemies[enemyIndex].health <= 0) { enemies.splice(enemyIndex, 1); rupees = rupees + 5; addExperience(15); }\n    }\n  }\n  if (countAllEnemies() === 0) { dungeonCleared = true; message = "DUNGEON CLEARED!"; }\n}\n\nfunction moveHero(frameScale) {\n  if (keysHeld["ArrowLeft"])  { hero.x = hero.x - hero.speed * frameScale; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { hero.x = hero.x + hero.speed * frameScale; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { hero.y = hero.y - hero.speed * frameScale; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { hero.y = hero.y + hero.speed * frameScale; hero.facing = "down"; }\n  if (hero.x < TILE) hero.x = TILE;\n  if (hero.x + hero.size > 320 - TILE) hero.x = 320 - TILE - hero.size;\n  if (hero.y < TILE) hero.y = TILE;\n  if (hero.y + hero.size > 320 - TILE) hero.y = 320 - TILE - hero.size;\n}\n\nfunction moveEnemies(frameScale) {\n  const enemies = getFloor().enemies;\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    const enemy = enemies[enemyIndex];\n    if (enemy.x < hero.x) enemy.x = enemy.x + enemy.speed * frameScale;\n    if (enemy.x > hero.x) enemy.x = enemy.x - enemy.speed * frameScale;\n    if (enemy.y < hero.y) enemy.y = enemy.y + enemy.speed * frameScale;\n    if (enemy.y > hero.y) enemy.y = enemy.y - enemy.speed * frameScale;\n    enemy.x = enemy.x + (Math.random() - 0.5) * enemy.wander * frameScale;\n    enemy.y = enemy.y + (Math.random() - 0.5) * enemy.wander * frameScale;\n  }\n}\n\nfunction checkHurt(frameScale) {\n  if (hurtCooldown > 0) hurtCooldown = hurtCooldown - frameScale;\n  const enemies = getFloor().enemies;\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    if (hurtCooldown <= 0 && isTouching(box(hero), box(enemies[enemyIndex]))) {\n      heroHealth = heroHealth - 0.25; hurtCooldown = 60;\n      if (heroHealth <= 0) { heroHealth = 0; gameOver = true; message = "GAME OVER"; }\n    }\n  }\n}\n\nfunction openChest() {\n  const chest = getFloor().chest;\n  if (!chest.opened && isTouching(box(hero), box(chest))) {\n    chest.opened = true; rupees = rupees + 5; message = "Found 5 rupees!";\n  }\n}\n\nfunction checkStairs(frameScale) {\n  if (transitionCooldown > 0) { transitionCooldown = transitionCooldown - frameScale; return; }\n  const heroCol = Math.floor((hero.x + hero.size / 2) / TILE);\n  const heroRow = Math.floor((hero.y + hero.size / 2) / TILE);\n  const tile = getFloor().map[heroRow][heroCol];\n  if (tile === 2 && currentFloor < floors.length - 1) {\n    currentFloor = currentFloor + 1;\n    const entry = getFloor().entryFromAbove; hero.x = entry.col * TILE; hero.y = entry.row * TILE;\n    transitionCooldown = 20; message = "Descended to floor " + (currentFloor + 1);\n  } else if (tile === 3 && currentFloor > 0) {\n    currentFloor = currentFloor - 1;\n    const entry = getFloor().entryFromBelow; hero.x = entry.col * TILE; hero.y = entry.row * TILE;\n    transitionCooldown = 20; message = "Climbed to floor " + (currentFloor + 1);\n  }\n}\n\nfunction drawFloor() {\n  const floor = getFloor();\n  for (let row = 0; row < floor.map.length; row++)\n    for (let col = 0; col < floor.map[row].length; col++) {\n      const tile = floor.map[row][col];\n      ctx.fillStyle = tile === 1 ? floor.wallColor : floor.floorColor;\n      ctx.fillRect(col * TILE, row * TILE, TILE, TILE);\n      if (tile === 2) drawSprite(downStairsSprite, col * TILE, row * TILE, 4, PALETTE);\n      if (tile === 3) drawSprite(doorSprite, col * TILE, row * TILE, 4, PALETTE);\n    }\n}\n\nfunction drawHud() {\n  for (let heartIndex = 0; heartIndex < maxHealth; heartIndex++) {\n    const heartX = 8 + heartIndex * 20;\n    let heartFill = heroHealth - heartIndex;\n    if (heartFill > 1) heartFill = 1;\n    if (heartFill < 0) heartFill = 0;\n    ctx.fillStyle = "#3a1a1a"; ctx.fillRect(heartX, 6, 16, 16);\n    ctx.fillStyle = "#e23b3b"; ctx.fillRect(heartX, 6 + 16 * (1 - heartFill), 16, 16 * heartFill);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(heartX, 6, 16, 16);\n  }\n  ctx.fillStyle = "#fff"; ctx.font = "11px monospace";\n  ctx.fillText("Lv " + level, 8, 40);\n  let fraction = experience / experienceToNext;\n  if (fraction > 1) fraction = 1;\n  ctx.fillStyle = "#204020"; ctx.fillRect(44, 30, 80, 11);\n  ctx.fillStyle = "#5ad0ff"; ctx.fillRect(44, 30, 80 * fraction, 11);\n  ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(44, 30, 80, 11);\n  ctx.fillStyle = "#fff";\n  ctx.fillText("Rupees " + rupees + "  Atk " + attackPower + "  Slimes left " + countAllEnemies(), 8, 56);\n  ctx.fillText(message, 8, 312);\n}\n\nfunction drawMiniMap() {\n  for (let f = 0; f < floors.length; f++) {\n    ctx.fillStyle = f === currentFloor ? "#ffe14d" : "#204020";\n    ctx.fillRect(296, 6 + f * 18, 14, 14);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(296, 6 + f * 18, 14, 14);\n  }\n}\n\nfunction drawSword() {\n  if (attackTimer <= 0) return;\n  const sword = getSwordHitbox();\n  ctx.fillStyle = "#e8e8e8"; ctx.fillRect(sword.x, sword.y, sword.width, sword.height);\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (!gameOver && !dungeonCleared) {\n    moveHero(frameScale);\n    moveEnemies(frameScale);\n    checkHurt(frameScale);\n    openChest();\n    checkStairs(frameScale);\n    if (attackTimer > 0) attackTimer = attackTimer - frameScale;\n  }\n  drawFloor();\n  const chest = getFloor().chest;\n  drawSprite(chest.opened ? chestOpenSprite : chestClosedSprite, chest.x, chest.y, 3, PALETTE);\n  const enemies = getFloor().enemies;\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++)\n    drawSprite(slimeSprite, enemies[enemyIndex].x, enemies[enemyIndex].y, 3, PALETTE);\n  drawSword();\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  drawHud();\n  drawMiniMap();\n  if (gameOver || dungeonCleared) {\n    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 135, 320, 54);\n    ctx.fillStyle = dungeonCleared ? "#ffe14d" : "#ff6b6b"; ctx.font = "19px monospace";\n    ctx.fillText(dungeonCleared ? "DUNGEON CLEARED!" : "GAME OVER", dungeonCleared ? 40 : 95, 168);\n  }\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen. Arrows move, SPACE swings. Descend and clear every floor!");'
  },
  summary:"The full Level 4 game: a 3-floor dungeon of floor objects, each with its own slimes and chest that it remembers. Descend the stairs, fight and loot, level up, and clear every floor to win — all time-based, on one HUD with a mini-map."
}
];
