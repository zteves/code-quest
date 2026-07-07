const TOPICS = [
{
  id:"sprites",
  title:"Pixels Come Alive",
  sub:"Sprites from arrays",
  lesson:
    "<p>In Level 1 your hero was one plain square. Time to level up! A "+W("sprite","a small game picture, here built from a grid of colored squares")+" "+
    "is a tiny picture made of colored dots. And here is the cool part: a sprite is just an "+
    "<b>array</b> — the same list you learned in Level 1!</p>"+
    "<p>Each row is a string of letters. Each letter is a color: <code>g</code> is green, "+
    "<code>k</code> is black, and <code>.</code> means see-through (draw nothing).</p>"+
    "<pre><code>const slimeSprite = [\n  \"..kkkk..\",\n  \".kggggk.\",\n  \"kggggggk\"\n];</code></pre>"+
    "<p>See the <code>k</code> around the edge? That is a black <b>outline</b>. Always give a "+
    "sprite an outline so it stands out — a green blob with no outline would vanish on green "+
    "grass!</p>"+
    "<p>The workshop gives you two helpers for free: <code>PALETTE</code> (the "+W("color map","a list that says which color each letter stands for")+") "+
    "and <code>drawSprite</code>, which loops the grid and stamps each colored dot onto the screen:</p>"+
    "<pre><code>drawSprite(slimeSprite, 100, 100, 8, PALETTE);\n// sprite, x, y, how-big-each-dot-is, colors</code></pre>",
  model:"A sprite is colored graph paper. Each letter is one square; drawSprite stamps the whole grid onto the canvas. The dark outline is what makes it pop.",
  mistakes:[
    "No outline. A one-color sprite with no <code>k</code> edge disappears on a same-color background.",
    "Rows of different lengths. Keep every row the same number of letters.",
    "Using a letter that is not in <code>PALETTE</code> — that dot just won't show up."
  ],
  exercise:{
    intro:"Run it to meet a slime on a dark background so it's easy to see. Then change some letters to invent your own creature. Try <code>r</code> for red or <code>b</code> for blue, and make it bigger by raising the <code>10</code>.",
    starter:'const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\n\n// dark background so the sprite stands out clearly\nctx.fillStyle = "#22303a";\nctx.fillRect(0, 0, 320, 320);\n\ndrawSprite(slimeSprite, 112, 120, 10, PALETTE);\nconsole.log("A wild slime appears! Change the letters to remix it.");'
  },
  summary:"A sprite is an array of rows of color letters, wrapped in a dark outline so it stays visible. drawSprite(sprite, x, y, dotSize, PALETTE) paints it. It's arrays and loops from Level 1, now making pictures."
},
{
  id:"facing",
  title:"Which Way, Hero?",
  sub:"Facing four directions",
  lesson:
    "<p>A real hero looks the way they walk. So we make <b>four</b> sprites — one for each "+
    "direction — and keep them together in an object (from Level 1!):</p>"+
    "<pre><code>const heroSprites = {\n  down: heroDown,\n  up: heroUp,\n  left: heroLeft,\n  right: heroRight\n};</code></pre>"+
    "<p>We remember which way the hero currently looks in a property called <code>facing</code>:</p>"+
    "<pre><code>let hero = { facing: \"down\" };</code></pre>"+
    "<p>To draw the right picture we just look it up with the facing as the key:</p>"+
    "<pre><code>drawSprite(heroSprites[hero.facing], 100, 100, 8, PALETTE);</code></pre>"+
    "<p>When a key is pressed we change <code>facing</code> (this is the "+W("event listener","code that waits for something to happen, like a key press, then runs")+" from Level 1). Same idea, new use.</p>",
  model:"heroSprites is a wardrobe with four outfits. hero.facing is the label that picks which outfit to wear right now.",
  mistakes:[
    "Forgetting to click the game screen first, so the keys are not heard.",
    "Spelling a direction differently in two places — <code>\"up\"</code> must match everywhere.",
    "Looking up a facing that has no sprite, like <code>heroSprites[\"north\"]</code> — use the four you made."
  ],
  exercise:{
    intro:"Run it, click the screen, and press the arrow keys to turn your hero. Notice the outlined sprite changes to face the way you press.",
    starter:'const heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\n\nlet hero = { facing: "down" };\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === "ArrowUp")    hero.facing = "up";\n  if (event.key === "ArrowDown")  hero.facing = "down";\n  if (event.key === "ArrowLeft")  hero.facing = "left";\n  if (event.key === "ArrowRight") hero.facing = "right";\n});\n\nfunction draw() {\n  ctx.fillStyle = "#4c9a2a";\n  ctx.fillRect(0, 0, 320, 320);\n  drawSprite(heroSprites[hero.facing], 120, 116, 10, PALETTE);\n  ctx.fillStyle = "#fff";\n  ctx.font = "14px monospace";\n  ctx.fillText("Facing: " + hero.facing, 8, 24);\n  requestAnimationFrame(draw);\n}\ndraw();\nconsole.log("Click the screen, then press the arrow keys to turn!");'
  },
  summary:"Store four sprites in an object keyed by direction. hero.facing picks which to draw. Key events change facing — objects + events working together."
},
{
  id:"enemy-object",
  title:"Meet the Monster",
  sub:"The enemy object",
  lesson:
    "<p>An enemy is not just a picture — it has facts: where it is, how much "+W("health","how many hits something can take before it is defeated")+" "+
    "it has, and what it looks like. That is a job for an <b>object</b> (Level 1!). We bundle "+
    "all the facts together:</p>"+
    "<pre><code>let slime = {\n  x: 120,\n  y: 110,\n  health: 3,\n  sprite: slimeSprite\n};</code></pre>"+
    "<p>Now everything about that slime lives in one tidy box. We reach any fact with a dot:</p>"+
    "<pre><code>drawSprite(slime.sprite, slime.x, slime.y, 8, PALETTE);\nslime.health = slime.health - 1;   // it took a hit!</code></pre>"+
    "<p>Giving each enemy its own object is the secret that lets us have <i>lots</i> of enemies "+
    "next — each one keeping track of itself.</p>",
  model:"An enemy object is a monster's ID card: name a fact (x, y, health, sprite) and its value sits right next to it.",
  mistakes:[
    "Using a fact you never added — <code>slime.speed</code> is <code>undefined</code> until you put it in the object.",
    "Forgetting commas between the facts inside the <code>{ }</code>.",
    "Mixing up the dot for objects (<code>slime.health</code>) with the brackets for arrays."
  ],
  exercise:{
    intro:"Run it to draw a slime from an object, then hit it. Watch its <code>health</code> drop in the messages. Try changing its starting <code>x</code> and <code>y</code>.",
    starter:'const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\n\nlet slime = {\n  x: 120,\n  y: 108,\n  health: 3,\n  sprite: slimeSprite\n};\n\nctx.fillStyle = "#4c9a2a";\nctx.fillRect(0, 0, 320, 320);\ndrawSprite(slime.sprite, slime.x, slime.y, 10, PALETTE);\n\nconsole.log("Slime at", slime.x, slime.y, "with health", slime.health);\n\nslime.health = slime.health - 1;   // whack!\nconsole.log("After one hit, health is", slime.health);'
  },
  summary:"An enemy is an object holding its own facts (x, y, health, sprite). Reach them with a dot. One object per monster keeps each one organized."
},
{
  id:"enemy-array",
  title:"Here Comes the Horde",
  sub:"An army of enemies in a loop",
  lesson:
    "<p>One slime is lonely. A real dungeon has many! Instead of a separate variable for each, "+
    "we keep them all in one <b>array</b> — a list of enemy objects:</p>"+
    "<pre><code>let enemies = [\n  { x: 40,  y: 40,  health: 2 },\n  { x: 210, y: 60,  health: 2 },\n  { x: 120, y: 200, health: 2 }\n];</code></pre>"+
    "<p>Now a single <b>loop</b> can draw the whole horde. This is arrays and loops from Level 1, "+
    "teaming up:</p>"+
    "<pre><code>for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n  const enemy = enemies[enemyIndex];\n  drawSprite(slimeSprite, enemy.x, enemy.y, 8, PALETTE);\n}</code></pre>"+
    "<p>Notice the readable name <code>enemyIndex</code> instead of a lonely <code>i</code> — it "+
    "tells the reader exactly what the loop is counting. Add a hundred enemies and this same loop "+
    "still draws them all.</p>",
  model:"The enemies array is a lineup of monsters. The loop walks down the line and draws each one in turn.",
  mistakes:[
    "Writing <code>enemies[enemyIndex].x</code> before checking the loop stops at <code>enemies.length</code>.",
    "Starting the count at 1 instead of 0 — the first enemy is <code>enemies[0]</code>.",
    "Naming the counter just <code>i</code>. Say what it counts: <code>enemyIndex</code>."
  ],
  exercise:{
    intro:"Run it to draw a whole horde with one loop. Then add another enemy to the list, or change their positions, and run again.",
    starter:'const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\n\nlet enemies = [\n  { x: 40,  y: 40,  health: 2 },\n  { x: 210, y: 60,  health: 2 },\n  { x: 120, y: 200, health: 2 },\n  { x: 240, y: 220, health: 2 }\n];\n\nctx.fillStyle = "#4c9a2a";\nctx.fillRect(0, 0, 320, 320);\n\nfor (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n  const enemy = enemies[enemyIndex];\n  drawSprite(slimeSprite, enemy.x, enemy.y, 8, PALETTE);\n}\n\nconsole.log("Drew " + enemies.length + " slimes with a single loop!");'
  },
  summary:"Keep many enemies in one array of objects, then use one loop over enemies.length to handle them all. Name the counter clearly: enemyIndex."
},
{
  id:"hearts",
  title:"Hearts on the Line",
  sub:"Health & damage",
  lesson:
    "<p>Fighting only matters if the hero can get hurt. We track the hero's health in a number "+
    "and draw it as hearts at the top of the screen — the "+W("HUD","heads-up display: the score, hearts, and info drawn on top of the game")+".</p>"+
    "<pre><code>let heroHealth = 3;\nconst MAX_HEALTH = 3;</code></pre>"+
    "<p>A small function handles taking damage, and never lets health go below zero:</p>"+
    "<pre><code>function takeDamage(amount) {\n  heroHealth = heroHealth - amount;\n  if (heroHealth < 0) heroHealth = 0;\n}</code></pre>"+
    "<p>To draw the hearts we loop <code>MAX_HEALTH</code> times. We make them big with a gold "+
    "outline, and we also print the number — so you can always read your exact health, even a "+
    "half or a quarter later on:</p>"+
    "<pre><code>ctx.fillText(\"Health: \" + heroHealth, 120, 28);</code></pre>",
  model:"heroHealth is a stack of hearts. Taking damage removes from the top; the HUD loop redraws the stack and the number.",
  mistakes:[
    "Letting health go negative. Clamp it: <code>if (heroHealth < 0) heroHealth = 0;</code>.",
    "Drawing the hearts too small to see a change. Make them big, and print the number too.",
    "Forgetting to redraw the hearts after damage, so the screen lies about your health."
  ],
  exercise:{
    intro:"Run it to see three big hearts, then one is lost to damage. Change how much damage <code>takeDamage</code> deals, or raise <code>MAX_HEALTH</code>, and run again.",
    starter:'let heroHealth = 3;\nconst MAX_HEALTH = 3;\n\nfunction takeDamage(amount) {\n  heroHealth = heroHealth - amount;\n  if (heroHealth < 0) heroHealth = 0;\n}\n\nfunction drawHearts() {\n  for (let heartIndex = 0; heartIndex < MAX_HEALTH; heartIndex++) {\n    const heartX = 10 + heartIndex * 34;\n    const isFull = heartIndex < heroHealth;\n    ctx.fillStyle = isFull ? "#e23b3b" : "#3a1a1a";\n    ctx.fillRect(heartX, 10, 26, 26);\n    ctx.strokeStyle = "#ffd700";\n    ctx.lineWidth = 2;\n    ctx.strokeRect(heartX, 10, 26, 26);\n  }\n  ctx.fillStyle = "#fff";\n  ctx.font = "14px monospace";\n  ctx.fillText("Health: " + heroHealth, 120, 28);\n}\n\nctx.fillStyle = "#1c2530";\nctx.fillRect(0, 0, 320, 320);\n\ntakeDamage(1);   // ouch!\ndrawHearts();\nconsole.log("Hero health is now", heroHealth);'
  },
  summary:"Track health in a number and draw it as a big HUD with a loop, plus the number. A takeDamage function lowers it and clamps at 0."
},
{
  id:"chase",
  title:"The Hunt Begins",
  sub:"Enemies that chase",
  lesson:
    "<p>Right now enemies just sit there. Let's give them a tiny brain: each frame, step a little "+
    "closer to the hero. This simple "+W("AI","artificial intelligence: code that makes a game character act on its own")+" "+
    "compares positions and nudges the enemy the right way.</p>"+
    "<pre><code>if (enemy.x < hero.x) enemy.x = enemy.x + ENEMY_SPEED;\nif (enemy.x > hero.x) enemy.x = enemy.x - ENEMY_SPEED;\nif (enemy.y < hero.y) enemy.y = enemy.y + ENEMY_SPEED;\nif (enemy.y > hero.y) enemy.y = enemy.y - ENEMY_SPEED;</code></pre>"+
    "<p>Read it in plain English: <i>if the enemy is left of the hero, step right; if above, step "+
    "down.</i> Do that every frame and the horde creeps toward you. <code>ENEMY_SPEED</code> is "+
    "how big each step is — small numbers feel smooth.</p>",
  model:"Each enemy plays 'warmer/colder': every frame it takes one small step in the direction of the hero.",
  mistakes:[
    "A big <code>ENEMY_SPEED</code> makes enemies teleport and jitter. Keep steps small.",
    "Calling the move code once instead of every frame — put it inside the game loop.",
    "Comparing to the wrong thing. Enemies chase <code>hero.x</code> and <code>hero.y</code>."
  ],
  exercise:{
    intro:"Run it and watch the slimes hunt the gold hero. Move the hero's start position, or change <code>ENEMY_SPEED</code>, and see how the chase feels.",
    starter:'const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\nconst ENEMY_SPEED = 1;\n\nlet hero = { x: 150, y: 150 };\nlet enemies = [ { x: 20, y: 20 }, { x: 270, y: 40 }, { x: 40, y: 260 } ];\n\nfunction moveEnemiesTowardHero() {\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    const enemy = enemies[enemyIndex];\n    if (enemy.x < hero.x) enemy.x = enemy.x + ENEMY_SPEED;\n    if (enemy.x > hero.x) enemy.x = enemy.x - ENEMY_SPEED;\n    if (enemy.y < hero.y) enemy.y = enemy.y + ENEMY_SPEED;\n    if (enemy.y > hero.y) enemy.y = enemy.y - ENEMY_SPEED;\n  }\n}\n\nfunction draw() {\n  ctx.fillStyle = "#4c9a2a";\n  ctx.fillRect(0, 0, 320, 320);\n  moveEnemiesTowardHero();\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    drawSprite(slimeSprite, enemies[enemyIndex].x, enemies[enemyIndex].y, 6, PALETTE);\n  }\n  ctx.fillStyle = "#ffd700";\n  ctx.fillRect(hero.x, hero.y, 22, 22);\n  requestAnimationFrame(draw);\n}\ndraw();\nconsole.log("The slimes are hunting the hero!");'
  },
  summary:"Give enemies a simple brain: each frame step toward the hero by comparing x and y. Run it inside the game loop. Keep ENEMY_SPEED small for smooth chasing."
},
{
  id:"touch-damage",
  title:"Don't Touch That!",
  sub:"Touch damage & cooldown",
  lesson:
    "<p>When an enemy touches the hero, the hero should lose health. We already know how to check "+
    "if two boxes overlap (Level 1 collision!):</p>"+
    "<pre><code>function isTouching(a, b) {\n  return a.x < b.x + b.width &&\n         a.x + a.width > b.x &&\n         a.y < b.y + b.height &&\n         a.y + a.height > b.y;\n}</code></pre>"+
    "<p>But there is a trap: the game loop runs many times a second. If touching cost health every "+
    "frame, you'd lose it all instantly! The fix is a "+W("cooldown","a short wait before something can happen again")+" — "+
    "after getting hurt, the hero is safe for a moment:</p>"+
    "<pre><code>if (hurtCooldown > 0) hurtCooldown = hurtCooldown - 1;\n\nif (hurtCooldown === 0 && isTouching(hero, enemy)) {\n  heroHealth = heroHealth - 1;\n  hurtCooldown = 60;   // safe for about 1 second\n}</code></pre>"+
    "<p><code>hurtCooldown</code> counts down each frame. Only when it reaches 0 can the hero be "+
    "hurt again. This is how flashing 'invincible' moments work in real games.</p>",
  model:"A cooldown is a kitchen timer. Get hurt, start the timer; you can't be hurt again until it rings (reaches 0).",
  mistakes:[
    "No cooldown, so one touch drains all your health in a blink.",
    "Forgetting to count the timer down each frame, so it never reaches 0 again.",
    "Setting the cooldown but forgetting to check it before taking damage."
  ],
  exercise:{
    intro:"Run it and watch the screen: a slime presses against the hero. Each time it lands a hit, the hero <b>flashes</b> and is safe for a moment (the cooldown) before it can be hurt again. Change the <code>60</code> to <code>20</code> to make the safe time shorter.",
    starter:'const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\n\nlet hero  = { x: 132, y: 150, size: 24 };\nlet enemy = { x: 152, y: 150, size: 22 };\nlet heroHealth = 3;\nconst MAX_HEALTH = 3;\nlet hurtCooldown = 0;\n\nfunction isTouching(a, b) {\n  return a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y;\n}\n\nfunction drawHearts() {\n  for (let heartIndex = 0; heartIndex < MAX_HEALTH; heartIndex++) {\n    const heartX = 10 + heartIndex * 34;\n    ctx.fillStyle = heartIndex < heroHealth ? "#e23b3b" : "#3a1a1a";\n    ctx.fillRect(heartX, 10, 26, 26);\n    ctx.strokeStyle = "#ffd700";\n    ctx.lineWidth = 2;\n    ctx.strokeRect(heartX, 10, 26, 26);\n  }\n}\n\nfunction loop() {\n  // update: count the cooldown down, and take damage only when it reaches 0\n  if (hurtCooldown > 0) hurtCooldown = hurtCooldown - 1;\n  if (hurtCooldown === 0 && isTouching(hero, enemy)) {\n    heroHealth = heroHealth - 1;\n    hurtCooldown = 60;\n    console.log("Ouch! Health is now " + heroHealth);\n    if (heroHealth <= 0) { heroHealth = 3; console.log("(demo refilled the hearts)"); }\n  }\n\n  // draw the scene\n  ctx.fillStyle = "#4c9a2a";\n  ctx.fillRect(0, 0, 320, 320);\n  drawSprite(slimeSprite, enemy.x, enemy.y, 3, PALETTE);\n  // the hero blinks while it is safe (the invincible flash)\n  const isFlashing = hurtCooldown > 0 && Math.floor(hurtCooldown / 6) % 2 === 0;\n  if (!isFlashing) {\n    ctx.fillStyle = "#ffd700";\n    ctx.fillRect(hero.x, hero.y, hero.size, hero.size);\n  }\n  drawHearts();\n  ctx.fillStyle = "#fff";\n  ctx.font = "13px monospace";\n  ctx.fillText(hurtCooldown > 0 ? "SAFE! cooldown " + hurtCooldown : "Can be hurt!", 10, 62);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("The hero flashes while it is safe. Watch the hearts drop, then pause.");'
  },
  summary:"Touch damage uses box overlap. A cooldown timer that counts down each frame stops the hero losing everything in one touch — the classic 'invincible flash'."
},
{
  id:"attack",
  title:"Swing Your Sword",
  sub:"Attacking & defeating enemies",
  lesson:
    "<p>Time to fight back! When the hero attacks, we make an invisible box — the "+W("hitbox","an invisible box that decides what an attack can reach")+" — "+
    "just in front of the hero, in the way they are facing:</p>"+
    "<pre><code>function getSwordHitbox() {\n  const REACH = 22;\n  if (hero.facing === \"right\") return { x: hero.x + hero.size, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === \"left\")  return { x: hero.x - REACH, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === \"up\")    return { x: hero.x, y: hero.y - REACH, width: hero.size, height: REACH };\n  return { x: hero.x, y: hero.y + hero.size, width: hero.size, height: REACH };\n}</code></pre>"+
    "<p>Any enemy touching that box takes a hit. When an enemy's health reaches 0, we remove it "+
    "from the array with <code>splice</code>. Notice we loop <b>backwards</b> so removing one "+
    "enemy doesn't skip the next:</p>"+
    "<pre><code>for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex--) {\n  const enemy = enemies[enemyIndex];\n  if (isTouching(sword, enemy)) {\n    enemy.health = enemy.health - 1;\n    if (enemy.health <= 0) enemies.splice(enemyIndex, 1);\n  }\n}</code></pre>",
  model:"An attack is a quick invisible box in front of the hero. Any monster caught in the box gets hurt; at 0 health it leaves the lineup.",
  mistakes:[
    "Looping forwards while removing enemies — that skips one. Loop backwards when you <code>splice</code>.",
    "Building the hitbox in the wrong direction. It should sit in front of <code>hero.facing</code>.",
    "Forgetting <code>enemy.health &lt;= 0</code> lets an enemy live at 0 health."
  ],
  exercise:{
    intro:"Run it, click the game screen, and press <b>SPACE</b> to swing your sword at the slime. You'll see the silver blade flash in front of the hero — two hits defeat the slime. Change the enemy's <code>health</code> to 3 and see how many swings it takes.",
    starter:'const slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\n\nlet hero = { x: 118, y: 145, size: 24, facing: "right" };\nlet enemies = [ { x: 196, y: 146, size: 22, health: 2 } ];\nlet attackTimer = 0;\nlet message = "Click here, then press SPACE to swing!";\n\nfunction isTouching(a, b) {\n  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;\n}\n\nfunction getSwordHitbox() {\n  const REACH = 22;\n  if (hero.facing === "right") return { x: hero.x + hero.size, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "left")  return { x: hero.x - REACH, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "up")    return { x: hero.x, y: hero.y - REACH, width: hero.size, height: REACH };\n  return { x: hero.x, y: hero.y + hero.size, width: hero.size, height: REACH };\n}\n\nfunction swingSword() {\n  const sword = getSwordHitbox();\n  for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex--) {\n    const enemy = enemies[enemyIndex];\n    const enemyBox = { x: enemy.x, y: enemy.y, width: enemy.size, height: enemy.size };\n    if (isTouching(sword, enemyBox)) {\n      enemy.health = enemy.health - 1;\n      message = "Hit! Enemy health: " + enemy.health;\n      if (enemy.health <= 0) { enemies.splice(enemyIndex, 1); message = "Enemy defeated!"; }\n    }\n  }\n}\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && attackTimer <= 0) {\n    swingSword();\n    attackTimer = 12;\n  }\n});\n\nfunction loop() {\n  if (attackTimer > 0) attackTimer = attackTimer - 1;\n\n  ctx.fillStyle = "#4c9a2a";\n  ctx.fillRect(0, 0, 320, 320);\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++)\n    drawSprite(slimeSprite, enemies[enemyIndex].x, enemies[enemyIndex].y, 3, PALETTE);\n  // show the sword for a few frames after a swing\n  if (attackTimer > 0) {\n    const sword = getSwordHitbox();\n    ctx.fillStyle = "#e8e8e8";\n    ctx.fillRect(sword.x, sword.y, sword.width, sword.height);\n  }\n  ctx.fillStyle = "#ffd700";\n  ctx.fillRect(hero.x, hero.y, hero.size, hero.size);\n  ctx.fillStyle = "#fff";\n  ctx.font = "13px monospace";\n  ctx.fillText(message, 10, 24);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to attack the slime!");'
  },
  summary:"An attack is a hitbox in front of hero.facing. Enemies it touches lose health; at 0 they are spliced out. Loop backwards when removing from an array."
},
{
  id:"final-1",
  title:"Final Quest · Step 1",
  sub:"Enter the arena",
  isFinal:true,
  lesson:
    "<p>&#127894; <b>The Final Quest of Level 2 begins!</b> Over three steps you will build the "+
    "re-envisioned game: a real sprite hero, a room of monsters, sword fighting, and a "+
    "'clear the room' victory.</p>"+
    "<p><b>Step 1: enter the arena.</b> We put it together — a tiled room, the four-direction "+
    "sprite hero, and smooth movement while a key is <i>held down</i> (we remember held keys in "+
    "an object called <code>keysHeld</code>).</p>"+
    "<p>One pro trick: screens refresh at different speeds (some 60 times a second, some 120). If "+
    "we moved a fixed amount every frame, the game would run twice as fast on a fast screen! So we "+
    "measure the time between frames as "+W("frameScale","a number that keeps the game the same speed on fast and slow screens")+" "+
    "and multiply movement by it. Now the hero moves the same speed on every screen.</p>",
  model:"Hold-to-move: keydown flips a key 'on' in keysHeld, keyup flips it 'off', and every frame the loop moves the hero. frameScale keeps that speed steady on any screen.",
  mistakes:[
    "Forgetting to click the game screen first, so no keys are heard.",
    "Moving a fixed amount each frame (no frameScale) — the game speeds up on 120Hz screens.",
    "Skipping the wall clamp, so the hero walks off into the void."
  ],
  exercise:{
    intro:"Run it, click the screen, and walk your sprite hero around the arena with the arrow keys. Next step: the monsters wake up!",
    starter:'const TILE_SIZE = 32;\nconst arena = [\n  [1,1,1,1,1,1,1,1,1,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\n\nconst heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\n\nlet hero = { x: 150, y: 150, size: 24, speed: 2, facing: "down" };\nlet keysHeld = {};\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nfunction moveHero(frameScale) {\n  let moveX = 0;\n  let moveY = 0;\n  if (keysHeld["ArrowLeft"])  { moveX = -hero.speed; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { moveX =  hero.speed; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { moveY = -hero.speed; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { moveY =  hero.speed; hero.facing = "down"; }\n  const nextX = hero.x + moveX * frameScale;\n  const nextY = hero.y + moveY * frameScale;\n  if (nextX > TILE_SIZE && nextX + hero.size < 320 - TILE_SIZE) hero.x = nextX;\n  if (nextY > TILE_SIZE && nextY + hero.size < 320 - TILE_SIZE) hero.y = nextY;\n}\n\nfunction drawArena() {\n  for (let rowIndex = 0; rowIndex < arena.length; rowIndex++) {\n    for (let colIndex = 0; colIndex < arena[rowIndex].length; colIndex++) {\n      ctx.fillStyle = arena[rowIndex][colIndex] === 1 ? "#5b3a1a" : "#4c9a2a";\n      ctx.fillRect(colIndex * TILE_SIZE, rowIndex * TILE_SIZE, TILE_SIZE, TILE_SIZE);\n    }\n  }\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  moveHero(frameScale);\n  drawArena();\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen, then walk with the arrow keys!");'
  },
  summary:"The arena assembles the tilemap, the four-direction sprite hero, hold-to-move with keysHeld, wall clamping, and time-based movement (frameScale) so it runs the same speed on any screen."
},
{
  id:"final-2",
  title:"Final Quest · Step 2",
  sub:"The monsters awaken",
  isFinal:true,
  lesson:
    "<p><b>Step 2: the monsters awaken.</b> We add an <code>enemies</code> array of slimes that "+
    "<b>chase</b> the hero, deal <b>touch damage</b> with a cooldown, and a <b>hearts HUD</b> that "+
    "shows your exact health. If the hero runs out of hearts, it's game over.</p>"+
    "<p>To keep the fight fair and fun, the monsters move <b>slowly</b>, and each one gets a little "+
    ""+W("random","a surprise value the computer picks, so things aren't the same every time")+" "+
    "wobble — so they wander their own way toward you instead of all charging in a straight line at "+
    "once.</p>"+
    "<p>And a touch costs only a <b>quarter of a heart</b>, not a whole one. The hearts drain a "+
    "little at a time, and the number next to them shows your exact health, like <code>2.75</code> "+
    "— so you can watch it tick down.</p>",
  model:"The game loop is a stage manager: each frame it cues the hero, the enemies, the damage check, and the HUD, in order — all kept steady by frameScale.",
  mistakes:[
    "Fast enemies that all beeline at once overwhelm the hero. Keep them slow and give each a wander.",
    "Forgetting the hurt cooldown, so touching a slime drains hearts instantly.",
    "Drawing the hearts under the arena. Draw the HUD last, on top, so you can always see it."
  ],
  exercise:{
    intro:"Run it, click the screen, and survive! Slimes chase you and cost a quarter heart on touch. Watch the Health number drop by 0.25 each hit. Lose all three hearts and it's game over. Next step: fight back!",
    starter:'const TILE_SIZE = 32;\nconst arena = [\n  [1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\nconst heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\n\nlet hero = { x: 150, y: 150, size: 24, speed: 2, facing: "down" };\nlet heroHealth = 3;\nconst MAX_HEALTH = 3;\nlet hurtCooldown = 0;\nlet gameOver = false;\nlet keysHeld = {};\n\nlet enemies = [\n  { x: 48,  y: 48,  size: 22, speed: 0.3,  wander: 0.6, health: 2 },\n  { x: 250, y: 60,  size: 22, speed: 0.34, wander: 0.6, health: 2 },\n  { x: 150, y: 250, size: 22, speed: 0.28, wander: 0.6, health: 2 }\n];\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nfunction isTouching(a, b) {\n  return a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y;\n}\n\nfunction moveHero(frameScale) {\n  let moveX = 0, moveY = 0;\n  if (keysHeld["ArrowLeft"])  { moveX = -hero.speed; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { moveX =  hero.speed; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { moveY = -hero.speed; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { moveY =  hero.speed; hero.facing = "down"; }\n  const nextX = hero.x + moveX * frameScale, nextY = hero.y + moveY * frameScale;\n  if (nextX > TILE_SIZE && nextX + hero.size < 320 - TILE_SIZE) hero.x = nextX;\n  if (nextY > TILE_SIZE && nextY + hero.size < 320 - TILE_SIZE) hero.y = nextY;\n}\n\nfunction moveEnemies(frameScale) {\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    const enemy = enemies[enemyIndex];\n    if (enemy.x < hero.x) enemy.x = enemy.x + enemy.speed * frameScale;\n    if (enemy.x > hero.x) enemy.x = enemy.x - enemy.speed * frameScale;\n    if (enemy.y < hero.y) enemy.y = enemy.y + enemy.speed * frameScale;\n    if (enemy.y > hero.y) enemy.y = enemy.y - enemy.speed * frameScale;\n    enemy.x = enemy.x + (Math.random() - 0.5) * enemy.wander * frameScale;\n    enemy.y = enemy.y + (Math.random() - 0.5) * enemy.wander * frameScale;\n  }\n}\n\nfunction checkHurt(frameScale) {\n  if (hurtCooldown > 0) hurtCooldown = hurtCooldown - frameScale;\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    if (hurtCooldown <= 0 && isTouching(hero, enemies[enemyIndex])) {\n      heroHealth = heroHealth - 0.25;\n      hurtCooldown = 60;\n      if (heroHealth <= 0) { heroHealth = 0; gameOver = true; }\n    }\n  }\n}\n\nfunction drawArena() {\n  for (let rowIndex = 0; rowIndex < arena.length; rowIndex++)\n    for (let colIndex = 0; colIndex < arena[rowIndex].length; colIndex++) {\n      ctx.fillStyle = arena[rowIndex][colIndex] === 1 ? "#5b3a1a" : "#4c9a2a";\n      ctx.fillRect(colIndex * TILE_SIZE, rowIndex * TILE_SIZE, TILE_SIZE, TILE_SIZE);\n    }\n}\n\nfunction drawHearts() {\n  for (let heartIndex = 0; heartIndex < MAX_HEALTH; heartIndex++) {\n    const heartX = 10 + heartIndex * 34;\n    let heartFill = heroHealth - heartIndex;\n    if (heartFill > 1) heartFill = 1;\n    if (heartFill < 0) heartFill = 0;\n    ctx.fillStyle = "#3a1a1a";\n    ctx.fillRect(heartX, 10, 26, 26);\n    ctx.fillStyle = "#e23b3b";\n    ctx.fillRect(heartX, 10 + 26 * (1 - heartFill), 26, 26 * heartFill);\n    ctx.strokeStyle = "#ffd700";\n    ctx.lineWidth = 2;\n    ctx.strokeRect(heartX, 10, 26, 26);\n  }\n  ctx.fillStyle = "#fff";\n  ctx.font = "13px monospace";\n  ctx.fillText("Health: " + heroHealth, 120, 28);\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (!gameOver) {\n    moveHero(frameScale);\n    moveEnemies(frameScale);\n    checkHurt(frameScale);\n  }\n  drawArena();\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++)\n    drawSprite(slimeSprite, enemies[enemyIndex].x, enemies[enemyIndex].y, 3, PALETTE);\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  drawHearts();\n  if (gameOver) {\n    ctx.fillStyle = "rgba(0,0,0,.6)";\n    ctx.fillRect(0, 130, 320, 60);\n    ctx.fillStyle = "#ff6b6b";\n    ctx.font = "22px monospace";\n    ctx.fillText("GAME OVER", 95, 168);\n  }\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen and survive the slimes!");'
  },
  summary:"Step 2 wakes the monsters: slow, wandering enemies that chase, quarter-heart touch damage with a cooldown, a big hearts HUD with a number, and a game-over state — all kept steady by frameScale."
},
{
  id:"final-3",
  title:"Final Quest · Step 3",
  sub:"Hero's victory",
  isFinal:true,
  lesson:
    "<p><b>Step 3: fight back and win!</b> We add the <b>sword</b> (press the <b>space bar</b>), so "+
    "the hero can defeat enemies. Each defeat gives a reward — <b>rupees</b> and "+W("XP","experience points: a score that shows how much your hero has battled and grown")+" — "+
    "shown on the HUD. Clear every monster and you get <b>ROOM CLEARED!</b></p>"+
    "<p>This is the whole Level 2 game in one place: outlined sprites, objects, arrays, the game "+
    "loop, chasing AI, health with a cooldown, and sword combat with a win condition. You built "+
    "every piece in the dungeons before this — now they're one game.</p>"+
    "<p><b>Your mission:</b> defeat all three slimes without losing your three hearts. Then tinker — "+
    "add more enemies, make the sword reach farther, or speed up the hero. It's your game now!</p>",
  model:"A finished level = a world + a hero who can act + enemies who react + a way to win. Every system you learned is one gear in that machine.",
  mistakes:[
    "Attacking every single frame while space is held. Use a short attack timer so each swing is one hit.",
    "Forgetting to check for the win (no enemies left) — the player never learns they won.",
    "Rewarding before the enemy is actually defeated. Give rupees/XP only when health reaches 0."
  ],
  exercise:{
    intro:"THE BATTLE. Run it, click the screen, move with the arrows, and press SPACE to swing your sword. Defeat all three slimes to clear the room — then make it your own!",
    starter:'const TILE_SIZE = 32;\nconst arena = [\n  [1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\nconst heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\n\nlet hero = { x: 150, y: 150, size: 24, speed: 2, facing: "down" };\nlet heroHealth = 3;\nconst MAX_HEALTH = 3;\nlet hurtCooldown = 0;\nlet attackTimer = 0;\nlet rupees = 0;\nlet experience = 0;\nlet gameOver = false;\nlet roomCleared = false;\nlet keysHeld = {};\n\nlet enemies = [\n  { x: 48,  y: 48,  size: 22, speed: 0.3,  wander: 0.6, health: 2 },\n  { x: 250, y: 60,  size: 22, speed: 0.34, wander: 0.6, health: 2 },\n  { x: 150, y: 250, size: 22, speed: 0.28, wander: 0.6, health: 2 }\n];\n\nwindow.addEventListener("keyup", function(event) { keysHeld[event.key] = false; });\nwindow.addEventListener("keydown", function(event) {\n  keysHeld[event.key] = true;\n  if (event.key === " " && attackTimer <= 0 && !gameOver && !roomCleared) {\n    swingSword();\n    attackTimer = 12;\n  }\n});\n\nfunction isTouching(a, b) {\n  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;\n}\n\nfunction getSwordHitbox() {\n  const REACH = 22;\n  if (hero.facing === "right") return { x: hero.x + hero.size, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "left")  return { x: hero.x - REACH, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "up")    return { x: hero.x, y: hero.y - REACH, width: hero.size, height: REACH };\n  return { x: hero.x, y: hero.y + hero.size, width: hero.size, height: REACH };\n}\n\nfunction swingSword() {\n  const sword = getSwordHitbox();\n  for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex--) {\n    const enemy = enemies[enemyIndex];\n    const enemyBox = { x: enemy.x, y: enemy.y, width: enemy.size, height: enemy.size };\n    if (isTouching(sword, enemyBox)) {\n      enemy.health = enemy.health - 1;\n      if (enemy.health <= 0) {\n        enemies.splice(enemyIndex, 1);\n        rupees = rupees + 5;\n        experience = experience + 10;\n      }\n    }\n  }\n  if (enemies.length === 0) roomCleared = true;\n}\n\nfunction moveHero(frameScale) {\n  let moveX = 0, moveY = 0;\n  if (keysHeld["ArrowLeft"])  { moveX = -hero.speed; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { moveX =  hero.speed; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { moveY = -hero.speed; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { moveY =  hero.speed; hero.facing = "down"; }\n  const nextX = hero.x + moveX * frameScale, nextY = hero.y + moveY * frameScale;\n  if (nextX > TILE_SIZE && nextX + hero.size < 320 - TILE_SIZE) hero.x = nextX;\n  if (nextY > TILE_SIZE && nextY + hero.size < 320 - TILE_SIZE) hero.y = nextY;\n}\n\nfunction moveEnemies(frameScale) {\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    const enemy = enemies[enemyIndex];\n    if (enemy.x < hero.x) enemy.x = enemy.x + enemy.speed * frameScale;\n    if (enemy.x > hero.x) enemy.x = enemy.x - enemy.speed * frameScale;\n    if (enemy.y < hero.y) enemy.y = enemy.y + enemy.speed * frameScale;\n    if (enemy.y > hero.y) enemy.y = enemy.y - enemy.speed * frameScale;\n    enemy.x = enemy.x + (Math.random() - 0.5) * enemy.wander * frameScale;\n    enemy.y = enemy.y + (Math.random() - 0.5) * enemy.wander * frameScale;\n  }\n}\n\nfunction checkHurt(frameScale) {\n  if (hurtCooldown > 0) hurtCooldown = hurtCooldown - frameScale;\n  const heroBox = { x: hero.x, y: hero.y, width: hero.size, height: hero.size };\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    const enemy = enemies[enemyIndex];\n    const enemyBox = { x: enemy.x, y: enemy.y, width: enemy.size, height: enemy.size };\n    if (hurtCooldown <= 0 && isTouching(heroBox, enemyBox)) {\n      heroHealth = heroHealth - 0.25;\n      hurtCooldown = 60;\n      if (heroHealth <= 0) { heroHealth = 0; gameOver = true; }\n    }\n  }\n}\n\nfunction drawArena() {\n  for (let rowIndex = 0; rowIndex < arena.length; rowIndex++)\n    for (let colIndex = 0; colIndex < arena[rowIndex].length; colIndex++) {\n      ctx.fillStyle = arena[rowIndex][colIndex] === 1 ? "#5b3a1a" : "#4c9a2a";\n      ctx.fillRect(colIndex * TILE_SIZE, rowIndex * TILE_SIZE, TILE_SIZE, TILE_SIZE);\n    }\n}\n\nfunction drawHud() {\n  for (let heartIndex = 0; heartIndex < MAX_HEALTH; heartIndex++) {\n    const heartX = 10 + heartIndex * 34;\n    let heartFill = heroHealth - heartIndex;\n    if (heartFill > 1) heartFill = 1;\n    if (heartFill < 0) heartFill = 0;\n    ctx.fillStyle = "#3a1a1a";\n    ctx.fillRect(heartX, 10, 26, 26);\n    ctx.fillStyle = "#e23b3b";\n    ctx.fillRect(heartX, 10 + 26 * (1 - heartFill), 26, 26 * heartFill);\n    ctx.strokeStyle = "#ffd700";\n    ctx.lineWidth = 2;\n    ctx.strokeRect(heartX, 10, 26, 26);\n  }\n  ctx.fillStyle = "#fff";\n  ctx.font = "13px monospace";\n  ctx.fillText("Health: " + heroHealth, 120, 22);\n  ctx.fillText("Rupees: " + rupees + "   XP: " + experience, 120, 38);\n}\n\nfunction drawSword() {\n  if (attackTimer <= 0) return;\n  const sword = getSwordHitbox();\n  ctx.fillStyle = "#e8e8e8";\n  ctx.fillRect(sword.x, sword.y, sword.width, sword.height);\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (!gameOver && !roomCleared) {\n    moveHero(frameScale);\n    moveEnemies(frameScale);\n    checkHurt(frameScale);\n    if (attackTimer > 0) attackTimer = attackTimer - frameScale;\n  }\n  drawArena();\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++)\n    drawSprite(slimeSprite, enemies[enemyIndex].x, enemies[enemyIndex].y, 3, PALETTE);\n  drawSword();\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  drawHud();\n  if (gameOver) {\n    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 130, 320, 60);\n    ctx.fillStyle = "#ff6b6b"; ctx.font = "22px monospace";\n    ctx.fillText("GAME OVER", 95, 168);\n  }\n  if (roomCleared) {\n    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 130, 320, 60);\n    ctx.fillStyle = "#ffe14d"; ctx.font = "20px monospace";\n    ctx.fillText("ROOM CLEARED!", 62, 168);\n  }\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen. Arrows to move, SPACE to swing your sword!");'
  },
  summary:"The full Level 2 game: an outlined sprite hero who moves and swings a sword, slow wandering enemies, quarter-heart health with a cooldown, rupee/XP rewards, and a room-cleared win — all time-based so it plays the same on any screen."
}
];
