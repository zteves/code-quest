const TOPICS = [
{
  id:"chest",
  title:"The Treasure Chest",
  sub:"The chest object",
  lesson:
    "<p>Every good dungeon has treasure! A chest is an "+W("object","a bundle that keeps related facts together, like a treasure's ID card")+" — "+
    "just like the enemies you built in Level 2. It knows where it is and whether it has been "+
    "opened yet:</p>"+
    "<pre><code>let chest = {\n  x: 90,\n  y: 130,\n  opened: false\n};</code></pre>"+
    "<p>We make <b>two</b> sprites: a closed chest and an open one. Then we pick which to draw "+
    "based on the <code>opened</code> fact — a "+W("boolean","a true/false value, like a light switch")+" from Level 1:</p>"+
    "<pre><code>const chestSprite = chest.opened ? chestOpenSprite : chestClosedSprite;\ndrawSprite(chestSprite, chest.x, chest.y, 8, PALETTE);</code></pre>"+
    "<p>That little <code>? :</code> is a quick if/else: <i>if opened, use the open picture, "+
    "otherwise use the closed one.</i></p>",
  model:"A chest is an object with a switch called opened. The switch decides which picture you draw — closed or open.",
  mistakes:[
    "Forgetting the two sprites are different — pick with <code>chest.opened</code>.",
    "Writing <code>opened = true</code> as a string <code>\"true\"</code>. A boolean has no quotes.",
    "Drawing the chest off the edge — keep x and y between 0 and 320."
  ],
  exercise:{
    intro:"Run it to see a closed chest. Then change <code>opened: false</code> to <code>opened: true</code> and Run again — the very same code now draws the open chest!",
    starter:'const chestClosedSprite = [".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."];\nconst chestOpenSprite   = ["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."];\n\nlet chest = { x: 128, y: 120, opened: false };\n\nctx.fillStyle = "#4c9a2a";\nctx.fillRect(0, 0, 320, 320);\n\nconst chestSprite = chest.opened ? chestOpenSprite : chestClosedSprite;\ndrawSprite(chestSprite, chest.x, chest.y, 8, PALETTE);\n\nctx.fillStyle = "#fff";\nctx.font = "13px monospace";\nctx.fillText("opened: " + chest.opened, 110, 100);\nconsole.log("The chest is " + (chest.opened ? "OPEN" : "closed") + ". Flip opened to true and Run again!");'
  },
  summary:"A chest is an object with x, y, and an opened boolean. Two sprites (closed/open) and a quick if/else pick which one to draw."
},
{
  id:"open-chest",
  title:"Open It!",
  sub:"Opening a chest by touching it",
  lesson:
    "<p>A chest should open when the hero <b>walks into it</b>. That is "+W("collision","checking whether two things are touching on screen")+" — "+
    "the same box-overlap test from Level 1 and 2. When the hero touches a closed chest, we flip "+
    "its switch:</p>"+
    "<pre><code>if (!chest.opened && isTouching(hero, chest)) {\n  chest.opened = true;\n  console.log(\"You opened the chest!\");\n}</code></pre>"+
    "<p>The <code>!chest.opened</code> means <i>not opened</i> — we only open a chest that is "+
    "still closed. Once <code>opened</code> is true, the picture changes and it stays open.</p>",
  model:"Opening a chest is a collision plus a switch flip: touch it while it's closed, set opened to true, and it stays open.",
  mistakes:[
    "Forgetting <code>!chest.opened</code>, so it 'opens' every frame forever.",
    "Not clicking the game screen first, so the arrow keys don't move the hero.",
    "Checking the wrong boxes — the hero must touch the <b>chest</b>."
  ],
  exercise:{
    intro:"Run it, click the screen, and walk the gold hero into the chest with the arrow keys. Watch it pop open!",
    starter:'const heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroSprites = { down: heroDown, up: heroDown, left: heroDown, right: heroDown };\nconst chestClosedSprite = [".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."];\nconst chestOpenSprite   = ["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."];\n\nlet hero  = { x: 60, y: 150, size: 24, speed: 2, facing: "down" };\nlet chest = { x: 210, y: 150, size: 24, opened: false };\nlet keysHeld = {};\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nfunction isTouching(a, b) {\n  return a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y;\n}\n\nlet previousTime = 0;\nfunction loop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (keysHeld["ArrowLeft"])  hero.x = hero.x - hero.speed * frameScale;\n  if (keysHeld["ArrowRight"]) hero.x = hero.x + hero.speed * frameScale;\n  if (keysHeld["ArrowUp"])    hero.y = hero.y - hero.speed * frameScale;\n  if (keysHeld["ArrowDown"])  hero.y = hero.y + hero.speed * frameScale;\n\n  if (!chest.opened && isTouching(hero, chest)) {\n    chest.opened = true;\n    console.log("You opened the chest!");\n  }\n\n  ctx.fillStyle = "#4c9a2a";\n  ctx.fillRect(0, 0, 320, 320);\n  drawSprite(chest.opened ? chestOpenSprite : chestClosedSprite, chest.x, chest.y, 3, PALETTE);\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  ctx.fillStyle = "#fff";\n  ctx.font = "13px monospace";\n  ctx.fillText(chest.opened ? "Chest opened!" : "Walk into the chest!", 10, 24);\n  requestAnimationFrame(loop);\n}\nrequestAnimationFrame(loop);\nconsole.log("Click the screen, then walk into the chest with the arrow keys!");'
  },
  summary:"When the hero touches a still-closed chest, flip opened to true. Use !chest.opened so it only opens once. Collision + a boolean switch."
},
{
  id:"items",
  title:"Loot Inside",
  sub:"Item objects",
  lesson:
    "<p>What is inside the chest? <b>Items!</b> Each item is a small object with a <code>type</code> "+
    "(what kind it is) and a <code>name</code> (what to call it):</p>"+
    "<pre><code>let potion = { type: \"potion\", name: \"Red Potion\" };\nlet key    = { type: \"key\",    name: \"Rusty Key\" };</code></pre>"+
    "<p>The <code>type</code> is the important part — later, code will look at <code>item.type</code> "+
    "to decide what the item <i>does</i>. The <code>name</code> is just the friendly label we show "+
    "the player.</p>"+
    "<p>Giving every item a <code>type</code> is what lets one piece of code handle potions, keys, "+
    "and anything else you invent.</p>",
  model:"An item is a labeled object. type tells the code what it is; name tells the player what to call it.",
  mistakes:[
    "Forgetting the <code>type</code> — without it, code can't tell a potion from a key.",
    "Spelling a type differently later (<code>\"potion\"</code> vs <code>\"Potion\"</code>). Keep it exactly the same.",
    "Putting the name where the type goes. type is for code; name is for people."
  ],
  exercise:{
    intro:"Run it to draw two items with their icons and names. Then invent a third item object and draw it too!",
    starter:'const potionSprite = ["..kk..",".kwwk.",".krrk.","krrrrk","krrrrk",".kkkk."];\nconst keySprite    = [".kk...","kyyk..","kyyk..","kkk...",".ky...",".kyk.."];\n\nlet potion = { type: "potion", name: "Red Potion" };\nlet key    = { type: "key",    name: "Rusty Key" };\n\nctx.fillStyle = "#22303a";\nctx.fillRect(0, 0, 320, 320);\n\ndrawSprite(potionSprite, 70, 110, 8, PALETTE);\ndrawSprite(keySprite,   190, 110, 8, PALETTE);\n\nctx.fillStyle = "#fff";\nctx.font = "13px monospace";\nctx.fillText(potion.name, 55, 190);\nctx.fillText(key.name,   180, 190);\nconsole.log("An item has a type (" + potion.type + ") and a name (" + potion.name + ").");'
  },
  summary:"Items are objects with a type (for the code) and a name (for the player). The type is what lets one bit of code handle many kinds of item."
},
{
  id:"inventory",
  title:"The Backpack",
  sub:"Inventory (an array of items)",
  lesson:
    "<p>The hero needs somewhere to keep collected items. That's an "+W("inventory","the list of items a character is carrying")+" — "+
    "an <b>array</b> of item objects, exactly like the array of enemies from Level 2:</p>"+
    "<pre><code>let inventory = [];        // start empty\n\ninventory.push(potion);    // pick up a potion\ninventory.push(key);       // pick up a key\nconsole.log(inventory.length);  // 2 items</code></pre>"+
    "<p>Because it's an array, we can <b>loop</b> over it to draw everything the hero is carrying, "+
    "one icon after another. Arrays + loops, doing real work again.</p>",
  model:"The inventory is a backpack (an array). push drops an item in; length counts them; a loop shows them all.",
  mistakes:[
    "Forgetting to start it empty: <code>let inventory = [];</code>.",
    "Using <code>inventory.push</code> but reading <code>inventory[5]</code> when there's only 2 items.",
    "Mixing up <code>.length</code> (how many) with the last index (<code>length - 1</code>)."
  ],
  exercise:{
    intro:"Run it to fill the backpack and draw every item with a loop. Then push another item and run again — the loop draws it with no extra work.",
    starter:'const potionSprite = ["..kk..",".kwwk.",".krrk.","krrrrk","krrrrk",".kkkk."];\nconst keySprite    = [".kk...","kyyk..","kyyk..","kkk...",".ky...",".kyk.."];\n\nlet potion = { type: "potion", name: "Red Potion", sprite: potionSprite };\nlet key    = { type: "key",    name: "Rusty Key",  sprite: keySprite };\n\nlet inventory = [];\ninventory.push(potion);\ninventory.push(key);\ninventory.push(potion);\n\nctx.fillStyle = "#22303a";\nctx.fillRect(0, 0, 320, 320);\n\nfor (let itemIndex = 0; itemIndex < inventory.length; itemIndex++) {\n  const item = inventory[itemIndex];\n  drawSprite(item.sprite, 30 + itemIndex * 60, 130, 7, PALETTE);\n}\n\nctx.fillStyle = "#fff";\nctx.font = "13px monospace";\nctx.fillText("Backpack: " + inventory.length + " items", 10, 24);\nconsole.log("You are carrying " + inventory.length + " items.");'
  },
  summary:"An inventory is an array of item objects. push adds, length counts, and a loop draws every item the hero carries."
},
{
  id:"use-items",
  title:"Drink the Potion",
  sub:"Item effects",
  lesson:
    "<p>Items should <i>do</i> something. We look at the item's <code>type</code> and act — a "+
    "potion heals, a key would unlock, and so on. That's <b>if/else</b> from Level 1:</p>"+
    "<pre><code>function useItem(item) {\n  if (item.type === \"potion\") {\n    heroHealth = heroHealth + 1;\n    if (heroHealth > maxHealth) heroHealth = maxHealth;\n  } else if (item.type === \"key\") {\n    console.log(\"A door unlocks somewhere...\");\n  }\n}</code></pre>"+
    "<p>Notice we don't let health go above <code>maxHealth</code> — you can't overfill your "+
    "hearts. One <code>useItem</code> function handles every kind of item, just by checking "+
    "<code>item.type</code>.</p>",
  model:"Using an item is a sorting hat: check its type, then run the matching effect. One function, many item kinds.",
  mistakes:[
    "Healing past the max. Clamp with <code>if (heroHealth > maxHealth) heroHealth = maxHealth;</code>.",
    "Comparing with one <code>=</code>. Use <code>===</code> to check the type.",
    "Forgetting a type — an item with a type your if/else doesn't know just does nothing."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to drink a potion. Watch a heart refill (you start hurt). Each press uses one potion from the backpack.",
    starter:'let heroHealth = 1;\nlet maxHealth = 3;\nlet inventory = [ { type: "potion", name: "Red Potion" }, { type: "potion", name: "Red Potion" } ];\nlet message = "Press SPACE to drink a potion";\nlet actionCooldown = 0;\n\nfunction useItem(item) {\n  if (item.type === "potion") {\n    heroHealth = heroHealth + 1;\n    if (heroHealth > maxHealth) heroHealth = maxHealth;\n    message = "Glug! Health is now " + heroHealth;\n  }\n}\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    if (inventory.length > 0) {\n      useItem(inventory[inventory.length - 1]);\n      inventory.pop();\n    } else {\n      message = "Backpack is empty!";\n    }\n    actionCooldown = 12;\n  }\n});\n\nfunction drawHearts() {\n  for (let heartIndex = 0; heartIndex < maxHealth; heartIndex++) {\n    const heartX = 10 + heartIndex * 30;\n    ctx.fillStyle = heartIndex < heroHealth ? "#e23b3b" : "#3a1a1a";\n    ctx.fillRect(heartX, 40, 24, 24);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;\n    ctx.strokeRect(heartX, 40, 24, 24);\n  }\n}\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = "#22303a";\n  ctx.fillRect(0, 0, 320, 320);\n  drawHearts();\n  ctx.fillStyle = "#fff";\n  ctx.font = "13px monospace";\n  ctx.fillText(message, 10, 24);\n  ctx.fillText("Potions left: " + inventory.length, 10, 90);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to drink a potion.");'
  },
  summary:"Give items effects by checking item.type in an if/else. A potion heals (clamped at maxHealth). One useItem function handles every item kind."
},
{
  id:"random-loot",
  title:"Lucky Loot",
  sub:"Randomness with Math.random",
  lesson:
    "<p>Real treasure is a surprise! <code>Math.random()</code> gives a "+W("random","a surprise number the computer picks, different (almost) every time")+" "+
    "number from 0 up to 1. To pick a random item from a list, we turn that into a slot number:</p>"+
    "<pre><code>const lootTable = [\"potion\", \"key\", \"rupee\"];\nconst slot = Math.floor(Math.random() * lootTable.length);\nconst prize = lootTable[slot];</code></pre>"+
    "<p><code>Math.random() * lootTable.length</code> gives something like 0 to 3, and "+
    "<code>Math.floor</code> chops off the decimal to make it a whole slot number (0, 1, or 2). "+
    "Now every chest can hold a different surprise.</p>",
  model:"Math.random is a spinner. Multiply by how many prizes there are and floor it, and it lands on one random slot.",
  mistakes:[
    "Forgetting <code>Math.floor</code> — <code>lootTable[1.7]</code> is <code>undefined</code>.",
    "Multiplying by the wrong length, so some slots never get picked.",
    "Expecting it to feel fair — random can repeat the same prize a few times in a row."
  ],
  exercise:{
    intro:"Run it again and again — each time the chest gives a different random prize. That's real loot luck!",
    starter:'const potionSprite = ["..kk..",".kwwk.",".krrk.","krrrrk","krrrrk",".kkkk."];\nconst keySprite    = [".kk...","kyyk..","kyyk..","kkk...",".ky...",".kyk.."];\nconst rupeeSprite  = ["..kk..",".kggk.","kgGGgk","kgGGgk",".kggk.","..kk.."];\n\nconst lootTable = [\n  { name: "Red Potion", sprite: potionSprite },\n  { name: "Rusty Key",  sprite: keySprite },\n  { name: "Green Rupee", sprite: rupeeSprite }\n];\n\nconst slot = Math.floor(Math.random() * lootTable.length);\nconst prize = lootTable[slot];\n\nctx.fillStyle = "#22303a";\nctx.fillRect(0, 0, 320, 320);\ndrawSprite(prize.sprite, 128, 120, 9, PALETTE);\nctx.fillStyle = "#fff";\nctx.font = "14px monospace";\nctx.fillText("You found: " + prize.name + "!", 60, 210);\nconsole.log("Loot rolled slot " + slot + ": " + prize.name + ". Run again for different loot!");'
  },
  summary:"Math.random() gives 0..1. Multiply by a list's length and Math.floor it to pick a random slot. That's how chests give surprise loot."
},
{
  id:"xp",
  title:"Experience Points",
  sub:"Earning XP",
  lesson:
    "<p>Every hero grows by doing brave things. We track that with "+W("XP","experience points — a score that goes up as your hero battles and grows")+", "+
    "a number that goes up when you defeat enemies:</p>"+
    "<pre><code>let experience = 0;\nexperience = experience + 10;   // defeated a slime!</code></pre>"+
    "<p>To show it, we draw an <b>XP bar</b> that fills up toward the next level. The fill is just "+
    "a fraction — how far along you are:</p>"+
    "<pre><code>const fraction = experience / experienceToNext;\nctx.fillRect(10, 40, 200 * fraction, 14);   // wider = more XP</code></pre>"+
    "<p>Multiplying the bar's full width by the fraction gives a bar that grows as you earn XP.</p>",
  model:"XP is a jar you fill. Each win drops points in; the bar shows how full the jar is toward the next level.",
  mistakes:[
    "Letting the bar overflow past full. Cap the fraction at 1 when you draw it.",
    "Drawing the bar with a fixed width — multiply the width by the fraction so it grows.",
    "Forgetting XP is just a number you add to."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to 'defeat a slime' and earn 10 XP. Watch the blue bar fill up.",
    starter:'let experience = 0;\nconst experienceToNext = 60;\nlet actionCooldown = 0;\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    experience = experience + 10;\n    if (experience > experienceToNext) experience = experienceToNext;\n    console.log("Slime defeated! XP is now " + experience);\n    actionCooldown = 12;\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = "#22303a";\n  ctx.fillRect(0, 0, 320, 320);\n\n  let fraction = experience / experienceToNext;\n  if (fraction > 1) fraction = 1;\n  ctx.fillStyle = "#204020";\n  ctx.fillRect(20, 150, 280, 20);\n  ctx.fillStyle = "#5ad0ff";\n  ctx.fillRect(20, 150, 280 * fraction, 20);\n  ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;\n  ctx.strokeRect(20, 150, 280, 20);\n\n  ctx.fillStyle = "#fff";\n  ctx.font = "14px monospace";\n  ctx.fillText("XP: " + experience + " / " + experienceToNext, 20, 130);\n  ctx.fillText("Press SPACE to defeat a slime", 20, 210);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to earn XP.");'
  },
  summary:"XP is a number you add to on each win. Draw it as a bar whose width is fullWidth * (experience / experienceToNext), capped at full."
},
{
  id:"level-up",
  title:"Level Up!",
  sub:"Thresholds & leveling",
  lesson:
    "<p>When the XP jar fills, the hero <b>levels up</b>! We check XP against a "+W("threshold","the amount you need to reach before something happens")+" — "+
    "the XP needed for the next level:</p>"+
    "<pre><code>function addExperience(amount) {\n  experience = experience + amount;\n  while (experience >= experienceToNext) {\n    experience = experience - experienceToNext;   // carry the extra over\n    level = level + 1;\n    experienceToNext = level * 20;                // next level costs more\n    console.log(\"LEVEL UP! Now level \" + level);\n  }\n}</code></pre>"+
    "<p>We use <code>while</code>, not <code>if</code>, so a big XP reward can raise you two levels "+
    "at once. Any leftover XP carries over toward the next level. Each level costs a bit more.</p>",
  model:"Leveling is a filling cup that pours over: when XP passes the line, level up, keep the spillover, and raise the line for next time.",
  mistakes:[
    "Using <code>if</code> instead of <code>while</code> — a huge reward should be able to level you up twice.",
    "Forgetting to subtract the threshold, so XP just keeps climbing and levels up forever.",
    "Not raising <code>experienceToNext</code>, so every level costs the same."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to earn XP. When the bar fills, you LEVEL UP and the bar resets a little higher. Try it a few times!",
    starter:'let level = 1;\nlet experience = 0;\nlet experienceToNext = 40;\nlet actionCooldown = 0;\nlet message = "Press SPACE to earn XP";\n\nfunction addExperience(amount) {\n  experience = experience + amount;\n  while (experience >= experienceToNext) {\n    experience = experience - experienceToNext;\n    level = level + 1;\n    experienceToNext = level * 20;\n    message = "LEVEL UP! You are level " + level;\n  }\n}\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    addExperience(15);\n    if (!message.startsWith("LEVEL")) message = "Earned 15 XP";\n    actionCooldown = 12;\n  }\n});\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = "#22303a";\n  ctx.fillRect(0, 0, 320, 320);\n\n  ctx.fillStyle = "#ffe14d";\n  ctx.font = "20px monospace";\n  ctx.fillText("Level " + level, 20, 60);\n\n  let fraction = experience / experienceToNext;\n  if (fraction > 1) fraction = 1;\n  ctx.fillStyle = "#204020"; ctx.fillRect(20, 150, 280, 20);\n  ctx.fillStyle = "#5ad0ff"; ctx.fillRect(20, 150, 280 * fraction, 20);\n  ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2; ctx.strokeRect(20, 150, 280, 20);\n\n  ctx.fillStyle = "#fff";\n  ctx.font = "13px monospace";\n  ctx.fillText("XP " + experience + " / " + experienceToNext, 20, 140);\n  ctx.fillText(message, 20, 210);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to level up.");'
  },
  summary:"Leveling checks XP against a threshold in a while loop: subtract the threshold, add a level, carry the extra, and raise the next threshold."
},
{
  id:"stats",
  title:"Growing Stronger",
  sub:"Stats that scale",
  lesson:
    "<p>Leveling up should <i>feel</i> powerful. So each level raises the hero's "+W("stats","the numbers that describe a character: health, attack power, and so on")+": "+
    "more <code>maxHealth</code> (a new heart) and more <code>attackPower</code> (harder hits):</p>"+
    "<pre><code>function levelUp() {\n  level = level + 1;\n  maxHealth = maxHealth + 1;\n  attackPower = attackPower + 1;\n  heroHealth = maxHealth;   // a full refill as a reward\n}</code></pre>"+
    "<p>Later, the sword will do <code>enemy.health = enemy.health - attackPower</code>, so a "+
    "higher level means enemies fall faster. Growing numbers are how games make you feel stronger "+
    "over time.</p>",
  model:"A level-up is a growth spurt: bump the stat numbers up, and everything that uses them (hearts, sword) automatically gets stronger.",
  mistakes:[
    "Raising <code>maxHealth</code> but forgetting to refill <code>heroHealth</code>, so the new heart starts empty.",
    "Changing a stat name in one place but not the others.",
    "Making the jumps huge — small steps (+1) keep the game fair."
  ],
  exercise:{
    intro:"Run it, click the screen, and press <b>SPACE</b> to level up. Watch a new heart appear and your Attack number grow each time.",
    starter:'let level = 1;\nlet maxHealth = 3;\nlet heroHealth = 3;\nlet attackPower = 1;\nlet actionCooldown = 0;\n\nfunction levelUp() {\n  level = level + 1;\n  maxHealth = maxHealth + 1;\n  attackPower = attackPower + 1;\n  heroHealth = maxHealth;\n}\n\nwindow.addEventListener("keydown", function(event) {\n  if (event.key === " " && actionCooldown <= 0) {\n    levelUp();\n    console.log("Level " + level + ": maxHealth " + maxHealth + ", attackPower " + attackPower);\n    actionCooldown = 14;\n  }\n});\n\nfunction drawHearts() {\n  for (let heartIndex = 0; heartIndex < maxHealth; heartIndex++) {\n    const heartX = 10 + heartIndex * 28;\n    ctx.fillStyle = heartIndex < heroHealth ? "#e23b3b" : "#3a1a1a";\n    ctx.fillRect(heartX, 40, 22, 22);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;\n    ctx.strokeRect(heartX, 40, 22, 22);\n  }\n}\n\nfunction loop() {\n  if (actionCooldown > 0) actionCooldown = actionCooldown - 1;\n  ctx.fillStyle = "#22303a";\n  ctx.fillRect(0, 0, 320, 320);\n  ctx.fillStyle = "#ffe14d"; ctx.font = "18px monospace";\n  ctx.fillText("Level " + level, 10, 24);\n  drawHearts();\n  ctx.fillStyle = "#fff"; ctx.font = "14px monospace";\n  ctx.fillText("Attack Power: " + attackPower, 10, 100);\n  ctx.fillText("Press SPACE to level up", 10, 130);\n  requestAnimationFrame(loop);\n}\nloop();\nconsole.log("Click the screen, then press SPACE to grow stronger.");'
  },
  summary:"Leveling raises stats: maxHealth (a new heart) and attackPower (harder hits), with a full heal. Everything that reads those numbers gets stronger automatically."
},
{
  id:"final-1",
  title:"Final Quest · Step 1",
  sub:"Loot the dungeon",
  isFinal:true,
  lesson:
    "<p>&#127894; <b>The Final Quest of Level 3 begins!</b> You'll turn Level 2's arena into a "+
    "treasure dungeon: chests to open for loot, and a full <b>HUD</b> showing your hearts, level, "+
    "XP bar, rupees, and potions.</p>"+
    "<p><b>Step 1: loot the dungeon.</b> Walk the hero around and open every chest. Each chest "+
    "gives a <b>random</b> reward — rupees, a heart, or a potion for your backpack. Everything you "+
    "learned this level comes together: chest objects, collision, random loot, inventory, and a "+
    "HUD drawn on top.</p>",
  model:"The dungeon = a world of chests + a HUD. Touch a chest, roll random loot, update your counters and backpack, and show it all on the HUD.",
  mistakes:[
    "Opening a chest every frame — check <code>!chest.opened</code> so each gives loot once.",
    "Forgetting to draw the HUD last, so loot updates hide behind the world.",
    "Not clicking the game screen first, so the arrow keys don't work."
  ],
  exercise:{
    intro:"Run it, click the screen, and use the arrow keys to open all three chests. Watch your rupees, hearts, and potions change on the HUD as you loot!",
    starter:'const TILE_SIZE = 32;\nconst arena = [\n  [1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\nconst heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst chestClosedSprite = [".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."];\nconst chestOpenSprite   = ["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."];\n\nlet hero = { x: 150, y: 150, size: 24, speed: 2, facing: "down" };\nlet heroHealth = 2;\nlet maxHealth = 3;\nlet rupees = 0;\nlet inventory = [];\nlet keysHeld = {};\nlet message = "Open all the chests!";\n\nlet chests = [\n  { x: 48,  y: 60,  size: 24, opened: false },\n  { x: 240, y: 70,  size: 24, opened: false },\n  { x: 150, y: 250, size: 24, opened: false }\n];\n\nwindow.addEventListener("keydown", function(event) { keysHeld[event.key] = true; });\nwindow.addEventListener("keyup",   function(event) { keysHeld[event.key] = false; });\n\nfunction isTouching(a, b) {\n  return a.x < b.x + b.size && a.x + a.size > b.x && a.y < b.y + b.size && a.y + a.size > b.y;\n}\n\nfunction openChest(chest) {\n  chest.opened = true;\n  const prize = Math.floor(Math.random() * 3);\n  if (prize === 0) { rupees = rupees + 5; message = "Found 5 rupees!"; }\n  else if (prize === 1) { heroHealth = heroHealth + 1; if (heroHealth > maxHealth) heroHealth = maxHealth; message = "Found a heart!"; }\n  else { inventory.push({ type: "potion", name: "Red Potion" }); message = "Found a potion!"; }\n}\n\nfunction moveHero(frameScale) {\n  if (keysHeld["ArrowLeft"])  { hero.x = hero.x - hero.speed * frameScale; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { hero.x = hero.x + hero.speed * frameScale; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { hero.y = hero.y - hero.speed * frameScale; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { hero.y = hero.y + hero.speed * frameScale; hero.facing = "down"; }\n  if (hero.x < TILE_SIZE) hero.x = TILE_SIZE;\n  if (hero.x + hero.size > 320 - TILE_SIZE) hero.x = 320 - TILE_SIZE - hero.size;\n  if (hero.y < TILE_SIZE) hero.y = TILE_SIZE;\n  if (hero.y + hero.size > 320 - TILE_SIZE) hero.y = 320 - TILE_SIZE - hero.size;\n}\n\nfunction drawArena() {\n  for (let rowIndex = 0; rowIndex < arena.length; rowIndex++)\n    for (let colIndex = 0; colIndex < arena[rowIndex].length; colIndex++) {\n      ctx.fillStyle = arena[rowIndex][colIndex] === 1 ? "#5b3a1a" : "#4c9a2a";\n      ctx.fillRect(colIndex * TILE_SIZE, rowIndex * TILE_SIZE, TILE_SIZE, TILE_SIZE);\n    }\n}\n\nfunction drawHud() {\n  for (let heartIndex = 0; heartIndex < maxHealth; heartIndex++) {\n    const heartX = 8 + heartIndex * 22;\n    ctx.fillStyle = heartIndex < heroHealth ? "#e23b3b" : "#3a1a1a";\n    ctx.fillRect(heartX, 8, 18, 18);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;\n    ctx.strokeRect(heartX, 8, 18, 18);\n  }\n  ctx.fillStyle = "#fff"; ctx.font = "12px monospace";\n  ctx.fillText("Rupees " + rupees + "   Potions " + inventory.length, 8, 40);\n  ctx.fillText(message, 8, 312);\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  moveHero(frameScale);\n  for (let chestIndex = 0; chestIndex < chests.length; chestIndex++) {\n    const chest = chests[chestIndex];\n    if (!chest.opened && isTouching(hero, chest)) openChest(chest);\n  }\n\n  drawArena();\n  for (let chestIndex = 0; chestIndex < chests.length; chestIndex++) {\n    const chest = chests[chestIndex];\n    drawSprite(chest.opened ? chestOpenSprite : chestClosedSprite, chest.x, chest.y, 3, PALETTE);\n  }\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  drawHud();\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen, then open every chest with the arrow keys!");'
  },
  summary:"The loot dungeon ties it together: chest objects you open by collision, random rewards (rupees/heart/potion), an inventory, and a HUD drawn on top — all time-based."
},
{
  id:"final-2",
  title:"Final Quest · Step 2",
  sub:"The hero grows",
  isFinal:true,
  lesson:
    "<p><b>Step 2: the hero grows.</b> Now we bring back Level 2's slimes and sword, and add the "+
    "reward that changes everything: <b>XP and leveling</b>. Each slime you defeat gives XP; fill "+
    "the bar and you <b>level up</b> — a new heart and a stronger sword — right in the middle of "+
    "the fight.</p>"+
    "<p>This is the whole Level 3 game: outlined sprites, chests with loot, slow wandering enemies, "+
    "quarter-heart damage with a cooldown, sword combat that scales with <code>attackPower</code>, "+
    "XP, leveling, and a full HUD. Everything you've built across two levels, working as one.</p>"+
    "<p><b>Your mission:</b> open the chests, defeat all the slimes, and level up along the way. "+
    "Then tinker — add chests, add slimes, change the rewards. It's your dungeon now!</p>",
  model:"A full level = a world + a hero who fights and grows + rewards that scale. XP turns winning into getting stronger, which makes winning easier — the core loop of every RPG.",
  mistakes:[
    "Giving XP before the enemy is truly defeated. Reward only when its health hits 0.",
    "Forgetting to use <code>attackPower</code> for sword damage, so leveling doesn't help.",
    "Drawing the HUD before the world, so it hides behind the arena. HUD goes last."
  ],
  exercise:{
    intro:"THE GRAND LOOP. Run it, click the screen, arrows to move, SPACE to swing your sword. Open chests, defeat all the slimes, and level up as you go. Clear the room to win!",
    starter:'const TILE_SIZE = 32;\nconst arena = [\n  [1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],\n  [1,1,1,1,1,1,1,1,1,1]\n];\nconst heroDown  = ["..kkkk..",".knnnnk.",".kssssk.",".kskksk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroUp    = ["..kkkk..",".knnnnk.",".knnnnk.",".knnnnk.",".kssssk.","kggggggk","kggggggk",".kn..nk."];\nconst heroLeft  = ["..kkkk..",".knnnnk.","kkssssk.","kskssk..","kkssssk.","kgggggk.","kgggggk.",".kn.nk.."];\nconst heroRight = ["..kkkk..",".knnnnk.",".ksssskk","..kssksk",".ksssskk",".kgggggk",".kgggggk","..kn.nk."];\nconst heroSprites = { down: heroDown, up: heroUp, left: heroLeft, right: heroRight };\nconst slimeSprite = ["..kkkk..",".kggggk.","kggggggk","kgkggkgk","kggggggk",".kkkkkk."];\nconst chestClosedSprite = [".kkkkkk.",".knnnnk.",".kyyyyk.",".knnnnk.",".knyynk.",".knnnnk.",".kkkkkk."];\nconst chestOpenSprite   = ["kk......",".kk.....",".kyyyyk.",".kyyyyk.",".knnnnk.",".knnnnk.",".kkkkkk."];\n\nlet hero = { x: 150, y: 150, size: 24, speed: 2, facing: "down" };\nlet heroHealth = 3;\nlet maxHealth = 3;\nlet attackPower = 1;\nlet level = 1;\nlet experience = 0;\nlet experienceToNext = 30;\nlet rupees = 0;\nlet inventory = [];\nlet hurtCooldown = 0;\nlet attackTimer = 0;\nlet gameOver = false;\nlet roomCleared = false;\nlet keysHeld = {};\nlet message = "Loot chests and defeat the slimes!";\n\nlet chests = [\n  { x: 48,  y: 60,  size: 24, opened: false },\n  { x: 244, y: 240, size: 24, opened: false }\n];\nlet enemies = [\n  { x: 250, y: 60,  size: 22, speed: 0.3,  wander: 0.6, health: 2 },\n  { x: 60,  y: 250, size: 22, speed: 0.28, wander: 0.6, health: 2 },\n  { x: 250, y: 250, size: 22, speed: 0.34, wander: 0.6, health: 2 }\n];\n\nwindow.addEventListener("keyup", function(event) { keysHeld[event.key] = false; });\nwindow.addEventListener("keydown", function(event) {\n  keysHeld[event.key] = true;\n  if (event.key === " " && attackTimer <= 0 && !gameOver && !roomCleared) {\n    swingSword();\n    attackTimer = 12;\n  }\n});\n\nfunction isTouching(a, b) {\n  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;\n}\nfunction box(thing) { return { x: thing.x, y: thing.y, width: thing.size, height: thing.size }; }\n\nfunction addExperience(amount) {\n  experience = experience + amount;\n  while (experience >= experienceToNext) {\n    experience = experience - experienceToNext;\n    level = level + 1;\n    maxHealth = maxHealth + 1;\n    attackPower = attackPower + 1;\n    heroHealth = maxHealth;\n    experienceToNext = level * 20;\n    message = "LEVEL UP! You are level " + level;\n  }\n}\n\nfunction getSwordHitbox() {\n  const REACH = 22;\n  if (hero.facing === "right") return { x: hero.x + hero.size, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "left")  return { x: hero.x - REACH, y: hero.y, width: REACH, height: hero.size };\n  if (hero.facing === "up")    return { x: hero.x, y: hero.y - REACH, width: hero.size, height: REACH };\n  return { x: hero.x, y: hero.y + hero.size, width: hero.size, height: REACH };\n}\n\nfunction swingSword() {\n  const sword = getSwordHitbox();\n  for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex--) {\n    const enemy = enemies[enemyIndex];\n    if (isTouching(sword, box(enemy))) {\n      enemy.health = enemy.health - attackPower;\n      if (enemy.health <= 0) {\n        enemies.splice(enemyIndex, 1);\n        rupees = rupees + 5;\n        addExperience(15);\n      }\n    }\n  }\n  if (enemies.length === 0) { roomCleared = true; message = "ROOM CLEARED!"; }\n}\n\nfunction moveHero(frameScale) {\n  if (keysHeld["ArrowLeft"])  { hero.x = hero.x - hero.speed * frameScale; hero.facing = "left"; }\n  if (keysHeld["ArrowRight"]) { hero.x = hero.x + hero.speed * frameScale; hero.facing = "right"; }\n  if (keysHeld["ArrowUp"])    { hero.y = hero.y - hero.speed * frameScale; hero.facing = "up"; }\n  if (keysHeld["ArrowDown"])  { hero.y = hero.y + hero.speed * frameScale; hero.facing = "down"; }\n  if (hero.x < TILE_SIZE) hero.x = TILE_SIZE;\n  if (hero.x + hero.size > 320 - TILE_SIZE) hero.x = 320 - TILE_SIZE - hero.size;\n  if (hero.y < TILE_SIZE) hero.y = TILE_SIZE;\n  if (hero.y + hero.size > 320 - TILE_SIZE) hero.y = 320 - TILE_SIZE - hero.size;\n}\n\nfunction moveEnemies(frameScale) {\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    const enemy = enemies[enemyIndex];\n    if (enemy.x < hero.x) enemy.x = enemy.x + enemy.speed * frameScale;\n    if (enemy.x > hero.x) enemy.x = enemy.x - enemy.speed * frameScale;\n    if (enemy.y < hero.y) enemy.y = enemy.y + enemy.speed * frameScale;\n    if (enemy.y > hero.y) enemy.y = enemy.y - enemy.speed * frameScale;\n    enemy.x = enemy.x + (Math.random() - 0.5) * enemy.wander * frameScale;\n    enemy.y = enemy.y + (Math.random() - 0.5) * enemy.wander * frameScale;\n  }\n}\n\nfunction checkHurt(frameScale) {\n  if (hurtCooldown > 0) hurtCooldown = hurtCooldown - frameScale;\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {\n    if (hurtCooldown <= 0 && isTouching(box(hero), box(enemies[enemyIndex]))) {\n      heroHealth = heroHealth - 0.25;\n      hurtCooldown = 60;\n      if (heroHealth <= 0) { heroHealth = 0; gameOver = true; message = "GAME OVER"; }\n    }\n  }\n}\n\nfunction openChests() {\n  for (let chestIndex = 0; chestIndex < chests.length; chestIndex++) {\n    const chest = chests[chestIndex];\n    if (!chest.opened && isTouching(box(hero), box(chest))) {\n      chest.opened = true;\n      if (Math.random() < 0.5) { rupees = rupees + 5; message = "Found 5 rupees!"; }\n      else { inventory.push({ type: "potion", name: "Red Potion" }); message = "Found a potion!"; }\n    }\n  }\n}\n\nfunction drawArena() {\n  for (let rowIndex = 0; rowIndex < arena.length; rowIndex++)\n    for (let colIndex = 0; colIndex < arena[rowIndex].length; colIndex++) {\n      ctx.fillStyle = arena[rowIndex][colIndex] === 1 ? "#5b3a1a" : "#4c9a2a";\n      ctx.fillRect(colIndex * TILE_SIZE, rowIndex * TILE_SIZE, TILE_SIZE, TILE_SIZE);\n    }\n}\n\nfunction drawHud() {\n  for (let heartIndex = 0; heartIndex < maxHealth; heartIndex++) {\n    const heartX = 8 + heartIndex * 20;\n    let heartFill = heroHealth - heartIndex;\n    if (heartFill > 1) heartFill = 1;\n    if (heartFill < 0) heartFill = 0;\n    ctx.fillStyle = "#3a1a1a"; ctx.fillRect(heartX, 6, 16, 16);\n    ctx.fillStyle = "#e23b3b"; ctx.fillRect(heartX, 6 + 16 * (1 - heartFill), 16, 16 * heartFill);\n    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(heartX, 6, 16, 16);\n  }\n  ctx.fillStyle = "#fff"; ctx.font = "11px monospace";\n  ctx.fillText("Lv " + level, 8, 40);\n  let fraction = experience / experienceToNext;\n  if (fraction > 1) fraction = 1;\n  ctx.fillStyle = "#204020"; ctx.fillRect(44, 30, 90, 11);\n  ctx.fillStyle = "#5ad0ff"; ctx.fillRect(44, 30, 90 * fraction, 11);\n  ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1; ctx.strokeRect(44, 30, 90, 11);\n  ctx.fillStyle = "#fff";\n  ctx.fillText("Rupees " + rupees + "  Potions " + inventory.length + "  Atk " + attackPower, 8, 56);\n  ctx.fillText(message, 8, 312);\n}\n\nfunction drawSword() {\n  if (attackTimer <= 0) return;\n  const sword = getSwordHitbox();\n  ctx.fillStyle = "#e8e8e8";\n  ctx.fillRect(sword.x, sword.y, sword.width, sword.height);\n}\n\nlet previousTime = 0;\nfunction gameLoop(currentTime) {\n  let frameScale = 1;\n  if (previousTime) frameScale = (currentTime - previousTime) / (1000 / 60);\n  if (frameScale > 4) frameScale = 4;\n  previousTime = currentTime;\n\n  if (!gameOver && !roomCleared) {\n    moveHero(frameScale);\n    moveEnemies(frameScale);\n    checkHurt(frameScale);\n    openChests();\n    if (attackTimer > 0) attackTimer = attackTimer - frameScale;\n  }\n  drawArena();\n  for (let chestIndex = 0; chestIndex < chests.length; chestIndex++) {\n    const chest = chests[chestIndex];\n    drawSprite(chest.opened ? chestOpenSprite : chestClosedSprite, chest.x, chest.y, 3, PALETTE);\n  }\n  for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++)\n    drawSprite(slimeSprite, enemies[enemyIndex].x, enemies[enemyIndex].y, 3, PALETTE);\n  drawSword();\n  drawSprite(heroSprites[hero.facing], hero.x, hero.y, 3, PALETTE);\n  drawHud();\n  if (gameOver || roomCleared) {\n    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 135, 320, 54);\n    ctx.fillStyle = roomCleared ? "#ffe14d" : "#ff6b6b";\n    ctx.font = "20px monospace";\n    ctx.fillText(roomCleared ? "ROOM CLEARED!" : "GAME OVER", roomCleared ? 62 : 95, 168);\n  }\n  requestAnimationFrame(gameLoop);\n}\nrequestAnimationFrame(gameLoop);\nconsole.log("Click the screen. Arrows move, SPACE swings. Loot, fight, and level up!");'
  },
  summary:"The full Level 3 game: loot chests, fight slow wandering slimes with a sword that scales with attackPower, earn XP, level up (new hearts, stronger hits), and clear the room — all time-based, on one HUD."
}
];
