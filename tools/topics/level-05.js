const TOPICS = [
{
  id:"game-states",
  title:"The Game's Moods",
  sub:"Game states",
  lesson:
    "<p>A real game isn't always 'playing'. Sometimes it's showing a title screen, sometimes you "+
    "won, sometimes it's game over. Each of these is a "+W("game state","which mode the game is in right now — like title, playing, or victory")+". "+
    "We remember it in one word:</p>"+
    "<pre><code>let gameState = \"title\";   // \"title\", \"playing\", \"victory\", \"gameover\"</code></pre>"+
    "<p>The game loop then draws a different screen depending on the state — like a big if/else "+
    "that decides the whole game's mood:</p>"+
    "<pre><code>if (gameState === \"title\")   drawTitle();\nelse if (gameState === \"playing\") drawGame();\nelse if (gameState === \"victory\") drawVictory();</code></pre>"+
    "<p>Change that one word and the entire game switches screens. It's the same trick as "+
    "<code>hero.facing</code> and <code>currentFloor</code> — one label steering everything.</p>",
  model:"gameState is the game's mood ring. The loop reads it and shows the matching screen. Change the word, change the whole game.",
  mistakes:[
    "Spelling a state differently in two places — <code>\"gameover\"</code> must match everywhere.",
    "Updating the game (moving the hero) even on the title or victory screen.",
    "Forgetting a state, so one screen never shows."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to move through the game's moods: title → playing → victory → back to title. One word changes the whole screen.",
    starter:'let gameState = "title";\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    if (gameState === "title") gameState = "playing";\n    else if (gameState === "playing") gameState = "victory";\n    else gameState = "title";\n    actionCooldown = 16;\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  if (gameState === "title") {\n    ctx.fillStyle = "#1c2530"; ctx.fillRect(0, 0, 320, 320);\n    ctx.fillStyle = "#ffe14d"; ctx.font = "20px monospace"; ctx.fillText("TITLE SCREEN", 70, 150);\n  } else if (gameState === "playing") {\n    ctx.fillStyle = "#2e5d34"; ctx.fillRect(0, 0, 320, 320);\n    ctx.fillStyle = "#fff"; ctx.font = "20px monospace"; ctx.fillText("PLAYING...", 90, 150);\n  } else {\n    ctx.fillStyle = "#3a2a5a"; ctx.fillRect(0, 0, 320, 320);\n    ctx.fillStyle = "#7cffb0"; ctx.font = "20px monospace"; ctx.fillText("VICTORY!", 100, 150);\n  }\n  ctx.fillStyle = "#fff"; ctx.font = "12px monospace";\n  ctx.fillText("state: " + gameState + "  (press SPACE)", 60, 300);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to change the game state.");'
  },
  summary:"gameState is one word (title/playing/victory/gameover) that the loop reads to decide which screen to draw. Change the word to switch the whole game."
},
{
  id:"title-screen",
  title:"Press Start",
  sub:"The title screen",
  lesson:
    "<p>Every adventure needs a beginning. The title screen shows the game's name and waits for the "+
    "player to press a key to start. When they do, we flip the state to <code>\"playing\"</code>:</p>"+
    "<pre><code>if (event.key === \" \" && gameState === \"title\") {\n  gameState = \"playing\";\n}</code></pre>"+
    "<p>That's it — a title screen is just the <code>\"title\"</code> state that draws a welcome and "+
    "listens for the start key. It makes your game feel <i>real</i>, like something you'd pop into a "+
    "console.</p>",
  model:"The title screen is the front door. It waits politely until the player knocks (presses start), then lets them into the game.",
  mistakes:[
    "Starting the action before the player presses start.",
    "Forgetting to tell the player which key starts the game.",
    "Only checking the start key while already 'playing' — check it on the title screen."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to begin your quest. The title screen hands you into the game.",
    starter:'let gameState = "title";\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && gameState === "title") gameState = "playing";\n});\n\nfunction loop() {\n  if (gameState === "title") {\n    ctx.fillStyle = "#141a2a"; ctx.fillRect(0, 0, 320, 320);\n    ctx.fillStyle = "#ffe14d"; ctx.font = "22px monospace"; ctx.fillText("CODE QUEST", 78, 130);\n    ctx.fillStyle = "#9fd0ff"; ctx.font = "13px monospace"; ctx.fillText("The Grand Quest", 100, 156);\n    ctx.fillStyle = "#fff"; ctx.font = "13px monospace"; ctx.fillText("Press SPACE to start", 84, 220);\n  } else {\n    ctx.fillStyle = "#2e5d34"; ctx.fillRect(0, 0, 320, 320);\n    ctx.fillStyle = "#fff"; ctx.font = "16px monospace"; ctx.fillText("Your quest begins!", 60, 150);\n  }\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to start.");'
  },
  summary:"A title screen is the \"title\" state: draw the game's name and a 'press start' hint, and when the start key is pressed, switch gameState to \"playing\"."
},
{
  id:"meet-boss",
  title:"Meet the Boss",
  sub:"A bigger enemy",
  lesson:
    "<p>Every great quest ends with a <b>boss</b> — a giant enemy. Ours is the <b>King Slime</b>! A "+
    "boss is an object just like the slimes, but <b>bigger</b> and with way more health:</p>"+
    "<pre><code>let boss = {\n  x: 130, y: 110,\n  size: 44,        // much bigger than a slime\n  health: 12,      // takes many hits\n  maxHealth: 12\n};</code></pre>"+
    "<p>We draw the boss from a bigger sprite at a larger scale so it looms over the hero. Same "+
    "<code>drawSprite</code> you've always used — just a grander picture.</p>",
  model:"A boss is a super-sized enemy object: same idea as a slime, but bigger, tougher, and drawn larger so it feels dangerous.",
  mistakes:[
    "Giving the boss the same tiny health as a slime — a boss should take many hits.",
    "Drawing the boss at the same scale as a slime, so it doesn't feel big.",
    "Forgetting the boss is still just an object with x, y, size, and health."
  ],
  exercise:{
    intro:"Run it to meet the King Slime! Try changing the <code>8</code> in <code>drawSprite</code> to make the boss even bigger or smaller.",
    starter:'const kingSlimeSprite = ["...kkkkkk...","..kyyyyyyk..",".kggggggggk.","kggggggggggk","kgkkggggkkgk","kggggggggggk","kgggkkkkgggk","kggggggggggk",".kgGGGGGGgk.","..kGGGGGGk..","...kkkkkk..."];\n\nlet boss = { x: 60, y: 70, size: 96, health: 12, maxHealth: 12 };\n\nctx.fillStyle = "#3a2a4a";\nctx.fillRect(0, 0, 320, 320);\ndrawSprite(kingSlimeSprite, boss.x, boss.y, 8, PALETTE);\n\nctx.fillStyle = "#ffe14d"; ctx.font = "16px monospace";\nctx.fillText("The King Slime!", 80, 300);\nconsole.log("The boss has " + boss.health + " health — much tougher than a slime.");'
  },
  summary:"A boss is a big, tough enemy object (large size, high health) drawn from a bigger sprite at a larger scale. Otherwise it's the same object idea as a slime."
},
{
  id:"boss-health",
  title:"The Boss Health Bar",
  sub:"Showing the boss's health",
  lesson:
    "<p>A boss fight needs drama — you have to <i>see</i> the boss weakening. We draw a big "+
    "<b>health bar</b> that shrinks as the boss takes hits. It's the same fraction trick as the XP "+
    "bar:</p>"+
    "<pre><code>const fraction = boss.health / boss.maxHealth;\nctx.fillStyle = \"#e23b3b\";\nctx.fillRect(20, 20, 280 * fraction, 16);   // shrinks as health drops</code></pre>"+
    "<p>Full health means <code>fraction</code> is 1 (full-width bar). Half health means 0.5 (half "+
    "bar). Every hit makes the red shrink — a countdown to victory the player can watch.</p>",
  model:"The boss health bar is a melting ice block: every hit shaves a slice off, and when it's gone, the boss falls.",
  mistakes:[
    "Letting the bar go negative when health drops below 0 — stop it at 0.",
    "Using a fixed width instead of <code>maxWidth * fraction</code>, so it never shrinks.",
    "Forgetting to redraw the bar after each hit."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to strike the boss. Watch its health bar shrink. Keep hitting until it's DEFEATED!",
    starter:'const kingSlimeSprite = ["...kkkkkk...","..kyyyyyyk..",".kggggggggk.","kggggggggggk","kgkkggggkkgk","kggggggggggk","kgggkkkkgggk","kggggggggggk",".kgGGGGGGgk.","..kGGGGGGk..","...kkkkkk..."];\nlet boss = { x: 112, y: 120, size: 48, health: 12, maxHealth: 12 };\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0 && boss.health > 0) {\n    boss.health = boss.health - 2;\n    if (boss.health < 0) boss.health = 0;\n    actionCooldown = 12;\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = "#3a2a4a"; ctx.fillRect(0, 0, 320, 320);\n\n  let fraction = boss.health / boss.maxHealth;\n  if (fraction < 0) fraction = 0;\n  ctx.fillStyle = "#4a2020"; ctx.fillRect(20, 20, 280, 16);\n  ctx.fillStyle = "#e23b3b"; ctx.fillRect(20, 20, 280 * fraction, 16);\n  ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2; ctx.strokeRect(20, 20, 280, 16);\n\n  drawSprite(kingSlimeSprite, boss.x, boss.y, 4, PALETTE);\n  ctx.fillStyle = "#fff"; ctx.font = "13px monospace";\n  ctx.fillText(boss.health > 0 ? "Boss health: " + boss.health + "  (SPACE to hit)" : "DEFEATED!", 60, 300);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to strike the boss.");'
  },
  summary:"Draw a boss health bar as maxWidth * (boss.health / boss.maxHealth). It shrinks with every hit, giving the player a countdown to victory."
},
{
  id:"attack-patterns",
  title:"The Boss Fights Back",
  sub:"Attack patterns",
  lesson:
    "<p>A boss that only chases is boring. Great bosses switch between <b>moves</b> — an "+W("attack pattern","a repeating routine a boss follows, like chase for a while, then charge")+". "+
    "We give the boss a <code>mode</code> and a timer that switches it:</p>"+
    "<pre><code>boss.modeTimer = boss.modeTimer - frameScale;\nif (boss.modeTimer <= 0) {\n  if (boss.mode === \"chase\") { boss.mode = \"charge\"; boss.modeTimer = 60; }\n  else { boss.mode = \"chase\"; boss.modeTimer = 150; }\n}</code></pre>"+
    "<p>In <code>\"chase\"</code> it creeps toward you; in <code>\"charge\"</code> it dashes fast. "+
    "The timer is a "+W("state machine","code that switches between a few named modes on a schedule")+" — the boss's little brain, cycling through its moves.</p>",
  model:"A boss's brain is a spinning wheel of moves. A timer turns the wheel; whichever move it lands on decides how the boss acts right now.",
  mistakes:[
    "Never resetting the timer, so the boss picks one mode forever.",
    "Making 'charge' so fast it's impossible to dodge — keep it fair.",
    "Forgetting to multiply the boss's speed by <code>frameScale</code>."
  ],
  exercise:{
    intro:"Run it and watch the King Slime hunt the gold hero. It <b>chases</b> slowly, then <b>charges</b> fast, over and over. The label shows its current move.",
    starter:'const kingSlimeSprite = ["...kkkkkk...","..kyyyyyyk..",".kggggggggk.","kggggggggggk","kgkkggggkkgk","kggggggggggk","kgggkkkkgggk","kggggggggggk",".kgGGGGGGgk.","..kGGGGGGk..","...kkkkkk..."];\nlet hero = { x: 150, y: 240 };\nlet boss = { x: 130, y: 40, size: 48, mode: "chase", modeTimer: 150 };\n\nlet previousTime = 0;\nfunction loop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  boss.modeTimer = boss.modeTimer - frameScale;\n  if (boss.modeTimer <= 0) {\n    if (boss.mode === "chase") { boss.mode = "charge"; boss.modeTimer = 60; }\n    else { boss.mode = "chase"; boss.modeTimer = 150; }\n  }\n  const bossSpeed = boss.mode === "charge" ? 1.4 : 0.4;\n  if (boss.x < hero.x) boss.x = boss.x + bossSpeed * frameScale;\n  if (boss.x > hero.x) boss.x = boss.x - bossSpeed * frameScale;\n  if (boss.y < hero.y) boss.y = boss.y + bossSpeed * frameScale;\n  if (boss.y > hero.y) boss.y = boss.y - bossSpeed * frameScale;\n\n  ctx.fillStyle = "#3a2a4a"; ctx.fillRect(0, 0, 320, 320);\n  drawSprite(kingSlimeSprite, boss.x, boss.y, 4, PALETTE);\n  ctx.fillStyle = "#ffd700"; ctx.fillRect(hero.x, hero.y, 22, 22);\n  ctx.fillStyle = "#fff"; ctx.font = "14px monospace";\n  ctx.fillText("Boss move: " + boss.mode.toUpperCase(), 80, 20);\n  requestAnimationFrame(loop);\n}\nrequestAnimationFrame(loop);\nconsole.log("Watch the boss switch between CHASE and CHARGE.");'
  },
  summary:"Give the boss a mode and a modeTimer that switches it (chase → charge → chase). Each mode acts differently — a simple state machine that makes the boss feel alive."
},
{
  id:"win-lose",
  title:"Victory & Defeat",
  sub:"Win and lose states",
  lesson:
    "<p>A boss fight needs stakes: beat the boss to <b>win</b>, run out of hearts to <b>lose</b>. We "+
    "watch both health bars and flip <code>gameState</code> when one hits zero:</p>"+
    "<pre><code>if (boss.health <= 0) gameState = \"victory\";\nif (heroHealth <= 0) gameState = \"gameover\";</code></pre>"+
    "<p>Once the state changes, the loop stops updating the fight and shows the ending screen "+
    "instead. Those two little checks are the difference between a demo and a real game with a "+
    "beginning, middle, and end.</p>",
  model:"Win and lose are finish lines. The loop watches both health bars; whoever hits zero first ends the game on that screen.",
  mistakes:[
    "Checking only one health bar — you need both win and lose.",
    "Still moving the hero after the game ended — stop updating once the state changes.",
    "Forgetting to tell the player how to play again."
  ],
  exercise:{
    intro:"Run it, click the screen. Press <b>A</b> to attack the boss and <b>H</b> to take a hit. Beat the boss to WIN, or lose all hearts to get GAME OVER. Then press SPACE to restart.",
    starter:'let gameState = "playing";\nlet bossHealth = 6;\nlet heroHealth = 3;\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (actionCooldown > 0) return;\n  if (gameState === "playing") {\n    if (event.key === "a" || event.key === "A") { bossHealth = bossHealth - 1; actionCooldown = 10; }\n    if (event.key === "h" || event.key === "H") { heroHealth = heroHealth - 1; actionCooldown = 10; }\n    if (bossHealth <= 0) gameState = "victory";\n    if (heroHealth <= 0) gameState = "gameover";\n  } else if (event.key === " ") {\n    bossHealth = 6; heroHealth = 3; gameState = "playing"; actionCooldown = 12;\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = "#2a2a3a"; ctx.fillRect(0, 0, 320, 320);\n  if (gameState === "playing") {\n    ctx.fillStyle = "#fff"; ctx.font = "14px monospace";\n    ctx.fillText("Boss health: " + bossHealth, 20, 120);\n    ctx.fillText("Your hearts: " + heroHealth, 20, 160);\n    ctx.fillText("A = attack boss,  H = take a hit", 20, 220);\n  } else if (gameState === "victory") {\n    ctx.fillStyle = "#7cffb0"; ctx.font = "24px monospace"; ctx.fillText("VICTORY!", 90, 150);\n    ctx.fillStyle = "#fff"; ctx.font = "13px monospace"; ctx.fillText("Press SPACE to play again", 60, 200);\n  } else {\n    ctx.fillStyle = "#ff6b6b"; ctx.font = "24px monospace"; ctx.fillText("GAME OVER", 75, 150);\n    ctx.fillStyle = "#fff"; ctx.font = "13px monospace"; ctx.fillText("Press SPACE to try again", 62, 200);\n  }\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen. A = attack boss, H = take a hit.");'
  },
  summary:"Watch both health bars: boss.health <= 0 sets gameState to \"victory\", heroHealth <= 0 sets \"gameover\". The ending screen then shows and offers a restart."
},
{
  id:"restart",
  title:"Play Again",
  sub:"Restarting the game",
  lesson:
    "<p>When the game ends, players want another go. <b>Restarting</b> just means putting every "+
    "value back to its starting point in one function:</p>"+
    "<pre><code>function resetGame() {\n  heroHealth = 3;\n  score = 0;\n  gameState = \"playing\";\n}</code></pre>"+
    "<p>Call <code>resetGame()</code> when the player presses start on the game-over screen, and the "+
    "whole adventure begins fresh. Keeping the reset in one tidy function means you never forget to "+
    "put something back.</p>",
  model:"Restarting is tidying the board to play again: one function sweeps every score, health, and flag back to its start value.",
  mistakes:[
    "Forgetting to reset one value, so a bit of the old game leaks into the new one.",
    "Resetting the score but not the game state, so the ending screen never leaves.",
    "Scattering the resets everywhere instead of one <code>resetGame()</code> function."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to collect points. At 5 points you WIN — then press SPACE to reset everything and play again from zero.",
    starter:'let score = 0;\nlet gameState = "playing";\nlet actionCooldown = 0;\n\nfunction resetGame() {\n  score = 0;\n  gameState = "playing";\n}\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key !== " " || actionCooldown > 0) return;\n  actionCooldown = 10;\n  if (gameState === "playing") {\n    score = score + 1;\n    if (score >= 5) gameState = "victory";\n  } else {\n    resetGame();\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = "#1c2e2a"; ctx.fillRect(0, 0, 320, 320);\n  if (gameState === "playing") {\n    ctx.fillStyle = "#fff"; ctx.font = "18px monospace"; ctx.fillText("Score: " + score, 110, 140);\n    ctx.font = "13px monospace"; ctx.fillText("SPACE to score (need 5)", 70, 190);\n  } else {\n    ctx.fillStyle = "#7cffb0"; ctx.font = "22px monospace"; ctx.fillText("YOU WIN!", 100, 140);\n    ctx.fillStyle = "#fff"; ctx.font = "13px monospace"; ctx.fillText("SPACE to reset & play again", 50, 190);\n  }\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE.");'
  },
  summary:"Put every starting value back in one resetGame() function, then call it when the player restarts. Tidy resets mean no leftovers from the last game."
},
{
  id:"screen-shake",
  title:"Feel the Hit",
  sub:"Screen shake (polish)",
  lesson:
    "<p>Now for <b>polish</b> — the little touches that make a game feel juicy. <b>Screen shake</b> "+
    "makes hits feel powerful. When something big happens, we jiggle the whole picture for a few "+
    "frames by shifting where everything draws:</p>"+
    "<pre><code>if (shakeTimer > 0) {\n  ctx.save();\n  ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);\n}\n// ...draw the game...\nif (shakeTimer > 0) ctx.restore();</code></pre>"+
    "<p><code>ctx.translate</code> nudges the whole drawing by a small random amount each frame; "+
    "<code>save</code> and <code>restore</code> put it back so the shake doesn't drift away. Set "+
    "<code>shakeTimer</code> when you get hit, and count it down.</p>",
  model:"Screen shake is a flinch. For a few frames the camera trembles a little, so a hit lands with a jolt instead of a shrug.",
  mistakes:[
    "Shaking forever — count <code>shakeTimer</code> down so it stops.",
    "Forgetting <code>ctx.restore()</code>, so the whole game slides off screen.",
    "Shaking so hard it's dizzying — a few pixels is plenty."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to take a hit. The whole screen shakes for a moment — feel the impact!",
    starter:'let shakeTimer = 0;\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) { shakeTimer = 18; actionCooldown = 20; }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  if (shakeTimer > 0) shakeTimer = shakeTimer - 1;\n\n  ctx.save();\n  if (shakeTimer > 0) ctx.translate((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);\n  ctx.fillStyle = "#2e5d34"; ctx.fillRect(0, 0, 320, 320);\n  ctx.fillStyle = "#ffd700"; ctx.fillRect(140, 140, 40, 40);\n  ctx.fillStyle = "#fff"; ctx.font = "14px monospace"; ctx.fillText("SPACE to shake!", 90, 260);\n  ctx.restore();\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to feel the hit.");'
  },
  summary:"Screen shake nudges the whole drawing by a small random amount for a few frames (ctx.save/translate/restore), triggered by a shakeTimer you set on a hit and count down."
},
{
  id:"particles",
  title:"Sparkles!",
  sub:"Particle effects (polish)",
  lesson:
    "<p>More polish: <b>particles</b> — little sparks that burst out when something is defeated. Each "+
    "spark is a tiny object with a position and a "+W("velocity","how fast and which way something is moving, as a change in x and y")+", "+
    "and they all live in an array:</p>"+
    "<pre><code>particles.push({ x: 100, y: 100, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, life: 30 });</code></pre>"+
    "<p>Each frame we move every spark by its velocity, shrink its <code>life</code>, and remove it "+
    "when its life runs out (looping backward to splice, from Level 2!). Arrays + loops making magic "+
    "again.</p>",
  model:"Particles are confetti. Toss a handful, each flies its own way and fades; when a piece's life hits zero, it's swept up.",
  mistakes:[
    "Never removing dead particles, so they pile up forever and slow the game.",
    "Looping forward while splicing — loop backward when removing (Level 2!).",
    "Giving every spark the same velocity, so they don't spread out."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to burst a shower of sparkles. Each spark flies its own way and fades out.",
    starter:'let particles = [];\nlet actionCooldown = 0;\n\nfunction burst(x, y) {\n  for (let i = 0; i < 24; i++) {\n    particles.push({ x: x, y: y, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, life: 30, color: i % 2 === 0 ? "#ffe14d" : "#7cffb0" });\n  }\n}\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) { burst(160, 160); actionCooldown = 14; }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  for (let i = particles.length - 1; i >= 0; i--) {\n    const spark = particles[i];\n    spark.x = spark.x + spark.vx;\n    spark.y = spark.y + spark.vy;\n    spark.life = spark.life - 1;\n    if (spark.life <= 0) particles.splice(i, 1);\n  }\n  ctx.fillStyle = "#1c2530"; ctx.fillRect(0, 0, 320, 320);\n  for (let i = 0; i < particles.length; i++) {\n    ctx.fillStyle = particles[i].color;\n    ctx.fillRect(particles[i].x, particles[i].y, 4, 4);\n  }\n  ctx.fillStyle = "#fff"; ctx.font = "14px monospace"; ctx.fillText("SPACE for sparkles!", 80, 300);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE for sparkles.");'
  },
  summary:"Particles are an array of tiny objects with a velocity and a life. Each frame: move them, shrink life, and splice out the dead ones (loop backward). Burst some on a defeat for polish."
},
{
  id:"final-1",
  title:"Final Quest · Step 1",
  sub:"The boss battle",
  isFinal:true,
  lesson:
    "<p>&#127894; <b>The Final Quest of Level 5 begins!</b> First we build the <b>boss battle</b> on "+
    "its own: the King Slime with attack patterns and a health bar, your sword, hearts, a victory "+
    "and a game-over screen, plus <b>screen shake</b> and <b>sparkles</b> for polish.</p>"+
    "<p><b>Step 1: the boss battle.</b> Everything from this level in one arena — game states, the "+
    "boss's chase-and-charge pattern, win/lose, restart, and juicy polish. Beat the King Slime to "+
    "win; lose your hearts and try again.</p>",
  model:"A boss battle is a whole tiny game: a title-less arena with one big enemy, two health bars, an ending, and polish that makes every hit feel great.",
  mistakes:[
    "Forgetting the hurt cooldown, so the charging boss drains all your hearts at once.",
    "Not stopping updates after the game ends — freeze the fight on the ending screen.",
    "Skipping the polish — shake and sparkles are what make a boss fight feel epic."
  ],
  exercise:{
    intro:"THE BOSS BATTLE. Run it, click the screen, arrows to move, SPACE to swing your sword. Dodge the charge, chip down the King Slime's health bar, and win! Lose all hearts and press SPACE to retry.",
    starter:'const heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst kingSlimeSprite = ["...kkkkkk...","..kyyyyyyk..",".kggggggggk.","kggggggggggk","kgkkggggkkgk","kggggggggggk","kgggkkkkgggk","kggggggggggk",".kgGGGGGGgk.","..kGGGGGGk..","...kkkkkk..."];\nconst TILE = 32;\n\nlet gameState = "playing";\nlet hero, boss, heroHealth, maxHealth, hurtCooldown, attackTimer, shakeTimer, particles, keysHeld;\n\nfunction resetGame() {\n  hero = { x: 150, y: 250, size: 24, speed: 2, facing: "up" };\n  boss = { x: 130, y: 40, size: 44, health: 14, maxHealth: 14, mode: "chase", modeTimer: 150 };\n  heroHealth = 4; maxHealth = 4; hurtCooldown = 0; attackTimer = 0; shakeTimer = 0;\n  particles = []; keysHeld = {};\n  gameState = "playing";\n}\nresetGame();\n\nwindow.addEventListener("keyup", function(event) { keysHeld[event.key] = false; });\nwindow.addEventListener("keydown", function(event) {\n  keysHeld[event.key] = true;\n  if (event.key === " ") {\n    if (gameState === "playing" && attackTimer <= 0) { swingSword(); attackTimer = 12; }\n    else if (gameState !== "playing") resetGame();\n  }\n});\n\nfunction box(t) { return { x: t.x, y: t.y, width: t.size, height: t.size }; }\nfunction isTouching(a, b) { return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y; }\n\nfunction burst(x, y, color) {\n  for (let i = 0; i < 16; i++) particles.push({ x: x, y: y, vx: (Math.random()-0.5)*6, vy: (Math.random()-0.5)*6, life: 26, color: color });\n}\n\nfunction getSwordHitbox() {\n  const REACH = 24;\n  if (hero.facing === "right") return { x: hero.x + hero.size, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "left")  return { x: hero.x - REACH, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "up")    return { x: hero.x, y: hero.y - REACH, width: hero.size, height: REACH };\n  return { x: hero.x, y: hero.y + hero.size, width: hero.size, height: REACH };\n}\n\nfunction swingSword() {\n  if (isTouching(getSwordHitbox(), box(boss))) {\n    boss.health = boss.health - 1;\n    burst(boss.x + boss.size / 2, boss.y + boss.size / 2, "#ffe14d");\n    if (boss.health <= 0) { gameState = "victory"; burst(160, 120, "#7cffb0"); }\n  }\n}\n\nfunction moveHero(frameScale) {\n  if (keysHeld["ArrowLeft"])  { hero.x = hero.x - hero.speed * frameScale; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { hero.x = hero.x + hero.speed * frameScale; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { hero.y = hero.y - hero.speed * frameScale; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { hero.y = hero.y + hero.speed * frameScale; hero.facing = "down"; }\n  if (hero.x < TILE) hero.x = TILE;\n  if (hero.x + hero.size > 320 - TILE) hero.x = 320 - TILE - hero.size;\n  if (hero.y < TILE) hero.y = TILE;\n  if (hero.y + hero.size > 320 - TILE) hero.y = 320 - TILE - hero.size;\n}\n\nfunction updateBoss(frameScale) {\n  boss.modeTimer = boss.modeTimer - frameScale;\n  if (boss.modeTimer <= 0) {\n    if (boss.mode === "chase") { boss.mode = "charge"; boss.modeTimer = 55; }\n    else { boss.mode = "chase"; boss.modeTimer = 150; }\n  }\n  const bossSpeed = boss.mode === "charge" ? 1.5 : 0.45;\n  if (boss.x < hero.x) boss.x = boss.x + bossSpeed * frameScale;\n  if (boss.x > hero.x) boss.x = boss.x - bossSpeed * frameScale;\n  if (boss.y < hero.y) boss.y = boss.y + bossSpeed * frameScale;\n  if (boss.y > hero.y) boss.y = boss.y - bossSpeed * frameScale;\n\n  if (hurtCooldown > 0) hurtCooldown = hurtCooldown - frameScale;\n  if (hurtCooldown <= 0 && isTouching(box(hero), box(boss))) {\n    heroHealth = heroHealth - 0.5; hurtCooldown = 60; shakeTimer = 16;\n    if (heroHealth <= 0) { heroHealth = 0; gameState = "gameover"; }\n  }\n}\n\nfunction updateParticles(frameScale) {\n  for (let i = particles.length - 1; i >= 0; i--) {\n    const spark = particles[i];\n    spark.x = spark.x + spark.vx * frameScale; spark.y = spark.y + spark.vy * frameScale;\n    spark.life = spark.life - frameScale;\n    if (spark.life <= 0) particles.splice(i, 1);\n  }\n}\n\nfunction drawHearts() {\n  for (let heartIndex = 0; heartIndex < maxHealth; heartIndex++) {\n    const heartX = 8 + heartIndex * 20;\n    let heartFill = heroHealth - heartIndex;\n    if (heartFill > 1) heartFill = 1;\n    if (heartFill < 0) heartFill = 0;\n    ctx.fillStyle = "#3a1a1a"; ctx.fillRect(heartX, 300, 16, 16);\n    ctx.fillStyle = "#e23b3b"; ctx.fillRect(heartX, 300 + 16 * (1 - heartFill), 16, 16 * heartFill);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(heartX, 300, 16, 16);\n  }\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (gameState === "playing") {\n    moveHero(frameScale);\n    updateBoss(frameScale);\n    if (attackTimer > 0) attackTimer = attackTimer - frameScale;\n    if (shakeTimer > 0) shakeTimer = shakeTimer - frameScale;\n  }\n  updateParticles(frameScale);\n\n  ctx.save();\n  if (shakeTimer > 0) ctx.translate((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9);\n  ctx.fillStyle = "#3a2a4a"; ctx.fillRect(0, 0, 320, 320);\n\n  let fraction = boss.health / boss.maxHealth;\n  if (fraction < 0) fraction = 0;\n  ctx.fillStyle = "#4a2020"; ctx.fillRect(20, 12, 280, 14);\n  ctx.fillStyle = "#e23b3b"; ctx.fillRect(20, 12, 280 * fraction, 14);\n  ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2; ctx.strokeRect(20, 12, 280, 14);\n  ctx.fillStyle = "#fff"; ctx.font = "11px monospace"; ctx.fillText("KING SLIME", 128, 23);\n\n  drawSprite(kingSlimeSprite, boss.x, boss.y, 4, PALETTE);\n  if (attackTimer > 0) { const sword = getSwordHitbox(); ctx.fillStyle = "#e8e8e8"; ctx.fillRect(sword.x, sword.y, sword.width, sword.height); }\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  for (let i = 0; i < particles.length; i++) { ctx.fillStyle = particles[i].color; ctx.fillRect(particles[i].x, particles[i].y, 4, 4); }\n  drawHearts();\n  ctx.restore();\n\n  if (gameState === "victory") {\n    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 120, 320, 80);\n    ctx.fillStyle = "#7cffb0"; ctx.font = "24px monospace"; ctx.fillText("VICTORY!", 95, 160);\n    ctx.fillStyle = "#fff"; ctx.font = "12px monospace"; ctx.fillText("Press SPACE to play again", 62, 185);\n  } else if (gameState === "gameover") {\n    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 120, 320, 80);\n    ctx.fillStyle = "#ff6b6b"; ctx.font = "24px monospace"; ctx.fillText("GAME OVER", 80, 160);\n    ctx.fillStyle = "#fff"; ctx.font = "12px monospace"; ctx.fillText("Press SPACE to try again", 64, 185);\n  }\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen. Arrows move, SPACE swings. Beat the King Slime!");'
  },
  summary:"The boss battle is a whole mini-game: game states, the boss's chase/charge pattern, two health bars, win/lose with restart, and polish (screen shake + particle bursts) — everything Level 5 teaches, in one arena."
},
{
  id:"final-2",
  title:"Final Quest · Step 2",
  sub:"The Grand Quest",
  isFinal:true,
  lesson:
    "<p><b>Step 2: THE GRAND QUEST.</b> This is it — the whole adventure, every level joined into one "+
    "game. A <b>title screen</b>, a <b>three-floor dungeon</b> to descend, <b>slimes</b> to fight and "+
    "<b>chests</b> to loot, <b>XP and leveling</b> to grow strong, and the <b>King Slime boss</b> "+
    "waiting at the bottom. Beat the boss to win the whole quest.</p>"+
    "<p>Everything you have learned across five levels lives here: sprites, objects, arrays, loops, "+
    "functions, events, the game loop, collision, combat, items, leveling, multi-floor navigation, "+
    "game states, a boss, and polish. You didn't just learn to code — <b>you built a game.</b></p>"+
    "<p><b>Your mission:</b> press start, descend the dungeon, grow strong, and defeat the King "+
    "Slime. Then make it yours — new floors, new enemies, a tougher boss. The quest is yours now!</p>",
  model:"The finished game is every system you built, stacked together: states wrap the game, floors hold the world, combat and leveling drive the middle, and the boss is the finish line.",
  mistakes:[
    "Forgetting to level up on the way down — rush the boss underpowered and it's very hard.",
    "Storing the boss globally instead of on the bottom floor, so it appears everywhere.",
    "Not rebuilding the world on restart, so a replay starts already half-cleared."
  ],
  exercise:{
    intro:"THE GRAND QUEST. Press SPACE to start. Arrows move, SPACE swings your sword. Descend all three floors (grey stairs), fight slimes and loot chests to level up, then defeat the King Slime on the bottom floor to win the whole adventure!",
    starter:'const heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\nconst kingSlimeSprite = ["...kkkkkk...","..kyyyyyyk..",".kggggggggk.","kggggggggggk","kgkkggggkkgk","kggggggggggk","kgggkkkkgggk","kggggggggggk",".kgGGGGGGgk.","..kGGGGGGk..","...kkkkkk..."];\nconst chestClosedSprite = [".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."];\nconst chestOpenSprite   = ["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."];\nconst doorSprite        = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".knynnk.",".knnnnk.",".knnnnk.",".kkkkkk."];\nconst downStairsSprite  = ["kkkkkkkk","keeeeeek","kekkkkek","kek..kek","kek..kek","kekkkkek","keeeeeek","kkkkkkkk"];\nconst TILE = 32;\n\nconst F0 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\nconst F1 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\nconst F2 = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];\n\nlet gameState = "title";\nlet floors, currentFloor, hero, heroHealth, maxHealth, attackPower, level, experience, experienceToNext, rupees;\nlet hurtCooldown, attackTimer, transitionCooldown, shakeTimer, particles, keysHeld, message;\n\nfunction makeFloors() {\n  return [\n    { map: F0, floorColor: "#4c9a2a", wallColor: "#5b3a1a", entryFromAbove: {col:5,row:2}, entryFromBelow: {col:5,row:7},\n      enemies: [ {x:80,y:90,size:22,speed:0.3,wander:0.6,health:2}, {x:230,y:200,size:22,speed:0.3,wander:0.6,health:2} ],\n      chest: {x:64,y:64,size:24,opened:false}, boss: null },\n    { map: F1, floorColor: "#5a7a6a", wallColor: "#3a3a4a", entryFromAbove: {col:5,row:2}, entryFromBelow: {col:5,row:7},\n      enemies: [ {x:70,y:200,size:22,speed:0.34,wander:0.6,health:2}, {x:230,y:120,size:22,speed:0.34,wander:0.7,health:3} ],\n      chest: {x:230,y:230,size:24,opened:false}, boss: null },\n    { map: F2, floorColor: "#5a3a5a", wallColor: "#2a2a3a", entryFromAbove: {col:5,row:2}, entryFromBelow: {col:5,row:7},\n      enemies: [], chest: {x:64,y:230,size:24,opened:false},\n      boss: {x:130,y:110,size:44,health:16,maxHealth:16,mode:"chase",modeTimer:150} }\n  ];\n}\n\nfunction resetGame() {\n  floors = makeFloors(); currentFloor = 0;\n  hero = { x: 150, y: 120, size: 24, speed: 2, facing: "down" };\n  heroHealth = 4; maxHealth = 4; attackPower = 1; level = 1; experience = 0; experienceToNext = 24; rupees = 0;\n  hurtCooldown = 0; attackTimer = 0; transitionCooldown = 0; shakeTimer = 0; particles = []; keysHeld = {};\n  message = "Descend and defeat the King Slime!";\n  gameState = "playing";\n}\n\nwindow.addEventListener("keyup", function(event) { if (keysHeld) keysHeld[event.key] = false; });\nwindow.addEventListener("keydown", function(event) {\n  if (gameState !== "playing") { if (event.key === " ") resetGame(); return; }\n  keysHeld[event.key] = true;\n  if (event.key === " " && attackTimer <= 0) { swingSword(); attackTimer = 12; }\n});\n\nfunction getFloor() { return floors[currentFloor]; }\nfunction box(t) { return { x: t.x, y: t.y, width: t.size, height: t.size }; }\nfunction isTouching(a, b) { return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y; }\nfunction burst(x, y, color) { for (let i = 0; i < 14; i++) particles.push({ x:x, y:y, vx:(Math.random()-0.5)*6, vy:(Math.random()-0.5)*6, life:26, color:color }); }\n\nfunction addExperience(amount) {\n  experience = experience + amount;\n  while (experience >= experienceToNext) {\n    experience = experience - experienceToNext;\n    level = level + 1; maxHealth = maxHealth + 1; attackPower = attackPower + 1; heroHealth = maxHealth;\n    experienceToNext = level * 18;\n    message = "LEVEL UP! You are level " + level;\n  }\n}\n\nfunction getSwordHitbox() {\n  const REACH = 24;\n  if (hero.facing === "right") return { x: hero.x + hero.size, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "left")  return { x: hero.x - REACH, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "up")    return { x: hero.x, y: hero.y - REACH, width: hero.size, height: REACH };\n  return { x: hero.x, y: hero.y + hero.size, width: hero.size, height: REACH };\n}\n\nfunction swingSword() {\n  const sword = getSwordHitbox();\n  const enemies = getFloor().enemies;\n  for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex--) {\n    if (isTouching(sword, box(enemies[enemyIndex]))) {\n      enemies[enemyIndex].health = enemies[enemyIndex].health - attackPower;\n      if (enemies[enemyIndex].health <= 0) { burst(enemies[enemyIndex].x, enemies[enemyIndex].y, "#ffe14d"); enemies.splice(enemyIndex, 1); rupees = rupees + 5; addExperience(12); }\n    }\n  }\n  const boss = getFloor().boss;\n  if (boss && isTouching(sword, box(boss))) {\n    boss.health = boss.health - attackPower;\n    burst(boss.x + boss.size / 2, boss.y + boss.size / 2, "#ffe14d");\n    if (boss.health <= 0) { getFloor().boss = null; gameState = "victory"; burst(160, 120, "#7cffb0"); }\n  }\n}\n\nfunction moveHero(frameScale) {\n  if (keysHeld["ArrowLeft"])  { hero.x = hero.x - hero.speed * frameScale; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { hero.x = hero.x + hero.speed * frameScale; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { hero.y = hero.y - hero.speed * frameScale; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { hero.y = hero.y + hero.speed * frameScale; hero.facing = "down"; }\n  if (hero.x < TILE) hero.x = TILE;\n  if (hero.x + hero.size > 320 - TILE) hero.x = 320 - TILE - hero.size;\n  if (hero.y < TILE) hero.y = TILE;\n  if (hero.y + hero.size > 320 - TILE) hero.y = 320 - TILE - hero.size;\n}\n\nfunction moveEnemies(frameScale) {\n  const enemies = getFloor().enemies;\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    const enemy = enemies[enemyIndex];\n    if (enemy.x < hero.x) enemy.x = enemy.x + enemy.speed * frameScale;\n    if (enemy.x > hero.x) enemy.x = enemy.x - enemy.speed * frameScale;\n    if (enemy.y < hero.y) enemy.y = enemy.y + enemy.speed * frameScale;\n    if (enemy.y > hero.y) enemy.y = enemy.y - enemy.speed * frameScale;\n    enemy.x = enemy.x + (Math.random() - 0.5) * enemy.wander * frameScale;\n    enemy.y = enemy.y + (Math.random() - 0.5) * enemy.wander * frameScale;\n  }\n}\n\nfunction updateBoss(frameScale) {\n  const boss = getFloor().boss;\n  if (!boss) return;\n  boss.modeTimer = boss.modeTimer - frameScale;\n  if (boss.modeTimer <= 0) {\n    if (boss.mode === "chase") { boss.mode = "charge"; boss.modeTimer = 55; }\n    else { boss.mode = "chase"; boss.modeTimer = 150; }\n  }\n  const bossSpeed = boss.mode === "charge" ? 1.4 : 0.45;\n  if (boss.x < hero.x) boss.x = boss.x + bossSpeed * frameScale;\n  if (boss.x > hero.x) boss.x = boss.x - bossSpeed * frameScale;\n  if (boss.y < hero.y) boss.y = boss.y + bossSpeed * frameScale;\n  if (boss.y > hero.y) boss.y = boss.y - bossSpeed * frameScale;\n}\n\nfunction checkHurt(frameScale) {\n  if (hurtCooldown > 0) hurtCooldown = hurtCooldown - frameScale;\n  const floor = getFloor();\n  let hit = false;\n  for (let enemyIndex = 0; enemyIndex < floor.enemies.length; enemyIndex++) {\n    if (hurtCooldown <= 0 && isTouching(box(hero), box(floor.enemies[enemyIndex]))) { heroHealth = heroHealth - 0.25; hit = true; }\n  }\n  if (floor.boss && hurtCooldown <= 0 && isTouching(box(hero), box(floor.boss))) { heroHealth = heroHealth - 0.5; hit = true; }\n  if (hit) { hurtCooldown = 60; shakeTimer = 14; if (heroHealth <= 0) { heroHealth = 0; gameState = "gameover"; } }\n}\n\nfunction openChest() {\n  const chest = getFloor().chest;\n  if (!chest.opened && isTouching(box(hero), box(chest))) { chest.opened = true; rupees = rupees + 5; heroHealth = maxHealth; message = "Chest! +5 rupees, full heal"; }\n}\n\nfunction checkStairs(frameScale) {\n  if (transitionCooldown > 0) { transitionCooldown = transitionCooldown - frameScale; return; }\n  const heroCol = Math.floor((hero.x + hero.size / 2) / TILE);\n  const heroRow = Math.floor((hero.y + hero.size / 2) / TILE);\n  const tile = getFloor().map[heroRow][heroCol];\n  if (tile === 2 && currentFloor < floors.length - 1) {\n    currentFloor = currentFloor + 1; const e = getFloor().entryFromAbove; hero.x = e.col * TILE; hero.y = e.row * TILE;\n    transitionCooldown = 20; message = currentFloor === floors.length - 1 ? "The King Slime awaits!" : "Descended to floor " + (currentFloor + 1);\n  } else if (tile === 3 && currentFloor > 0) {\n    currentFloor = currentFloor - 1; const e = getFloor().entryFromBelow; hero.x = e.col * TILE; hero.y = e.row * TILE;\n    transitionCooldown = 20; message = "Climbed to floor " + (currentFloor + 1);\n  }\n}\n\nfunction updateParticles(frameScale) {\n  for (let i = particles.length - 1; i >= 0; i--) {\n    const spark = particles[i];\n    spark.x = spark.x + spark.vx * frameScale; spark.y = spark.y + spark.vy * frameScale; spark.life = spark.life - frameScale;\n    if (spark.life <= 0) particles.splice(i, 1);\n  }\n}\n\nfunction drawFloor() {\n  const floor = getFloor();\n  for (let row = 0; row < floor.map.length; row++)\n    for (let col = 0; col < floor.map[row].length; col++) {\n      const tile = floor.map[row][col];\n      ctx.fillStyle = tile === 1 ? floor.wallColor : floor.floorColor;\n      ctx.fillRect(col * TILE, row * TILE, TILE, TILE);\n      if (tile === 2) drawSprite(downStairsSprite, col * TILE, row * TILE, 4, PALETTE);\n      if (tile === 3) drawSprite(doorSprite, col * TILE, row * TILE, 4, PALETTE);\n    }\n}\n\nfunction drawHud() {\n  for (let heartIndex = 0; heartIndex < maxHealth; heartIndex++) {\n    const heartX = 8 + heartIndex * 18;\n    let heartFill = heroHealth - heartIndex;\n    if (heartFill > 1) heartFill = 1;\n    if (heartFill < 0) heartFill = 0;\n    ctx.fillStyle = "#3a1a1a"; ctx.fillRect(heartX, 6, 14, 14);\n    ctx.fillStyle = "#e23b3b"; ctx.fillRect(heartX, 6 + 14 * (1 - heartFill), 14, 14 * heartFill);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(heartX, 6, 14, 14);\n  }\n  ctx.fillStyle = "#fff"; ctx.font = "11px monospace";\n  ctx.fillText("Lv " + level + "  Atk " + attackPower + "  Rupees " + rupees, 8, 34);\n  ctx.fillText(message, 8, 314);\n  const boss = getFloor().boss;\n  if (boss) {\n    let f = boss.health / boss.maxHealth; if (f < 0) f = 0;\n    ctx.fillStyle = "#4a2020"; ctx.fillRect(90, 40, 150, 10);\n    ctx.fillStyle = "#e23b3b"; ctx.fillRect(90, 40, 150 * f, 10);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(90, 40, 150, 10);\n    ctx.fillStyle = "#fff"; ctx.fillText("KING SLIME", 130, 62);\n  }\n  for (let f = 0; f < floors.length; f++) {\n    ctx.fillStyle = f === currentFloor ? "#ffe14d" : "#204020";\n    ctx.fillRect(298, 6 + f * 16, 12, 12);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(298, 6 + f * 16, 12, 12);\n  }\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (gameState === "title") {\n    ctx.fillStyle = "#141a2a"; ctx.fillRect(0, 0, 320, 320);\n    ctx.fillStyle = "#ffe14d"; ctx.font = "22px monospace"; ctx.fillText("CODE QUEST", 78, 120);\n    ctx.fillStyle = "#9fd0ff"; ctx.font = "14px monospace"; ctx.fillText("The Grand Quest", 96, 150);\n    ctx.fillStyle = "#fff"; ctx.font = "13px monospace"; ctx.fillText("Press SPACE to start", 84, 210);\n    ctx.fillText("Arrows move  -  SPACE swings", 56, 240);\n    requestAnimationFrame(gameLoop); return;\n  }\n\n  if (gameState === "playing") {\n    moveHero(frameScale); moveEnemies(frameScale); updateBoss(frameScale);\n    checkHurt(frameScale); openChest(); checkStairs(frameScale);\n    if (attackTimer > 0) attackTimer = attackTimer - frameScale;\n    if (shakeTimer > 0) shakeTimer = shakeTimer - frameScale;\n  }\n  updateParticles(frameScale);\n\n  ctx.save();\n  if (shakeTimer > 0) ctx.translate((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9);\n  drawFloor();\n  const chest = getFloor().chest;\n  drawSprite(chest.opened ? chestOpenSprite : chestClosedSprite, chest.x, chest.y, 3, PALETTE);\n  const enemies = getFloor().enemies;\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) drawSprite(slimeSprite, enemies[enemyIndex].x, enemies[enemyIndex].y, 3, PALETTE);\n  const boss = getFloor().boss;\n  if (boss) drawSprite(kingSlimeSprite, boss.x, boss.y, 4, PALETTE);\n  if (attackTimer > 0) { const sword = getSwordHitbox(); ctx.fillStyle = "#e8e8e8"; ctx.fillRect(sword.x, sword.y, sword.width, sword.height); }\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  for (let i = 0; i < particles.length; i++) { ctx.fillStyle = particles[i].color; ctx.fillRect(particles[i].x, particles[i].y, 4, 4); }\n  ctx.restore();\n\n  drawHud();\n\n  if (gameState === "victory") {\n    ctx.fillStyle = "rgba(0,0,0,.65)"; ctx.fillRect(0, 110, 320, 100);\n    ctx.fillStyle = "#7cffb0"; ctx.font = "22px monospace"; ctx.fillText("QUEST COMPLETE!", 40, 150);\n    ctx.fillStyle = "#ffe14d"; ctx.font = "13px monospace"; ctx.fillText("You beat the King Slime!", 66, 176);\n    ctx.fillStyle = "#fff"; ctx.fillText("Press SPACE to play again", 62, 198);\n  } else if (gameState === "gameover") {\n    ctx.fillStyle = "rgba(0,0,0,.65)"; ctx.fillRect(0, 120, 320, 80);\n    ctx.fillStyle = "#ff6b6b"; ctx.font = "22px monospace"; ctx.fillText("GAME OVER", 82, 158);\n    ctx.fillStyle = "#fff"; ctx.font = "12px monospace"; ctx.fillText("Press SPACE to try again", 64, 184);\n  }\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen, then press SPACE to start the Grand Quest!");'
  },
  summary:"The Grand Quest is the whole series in one game: a title screen, a 3-floor dungeon to descend, slimes and chests, XP and leveling, and the King Slime boss at the bottom — with game states, win/lose/restart, and polish. You built a complete game."
}
];
