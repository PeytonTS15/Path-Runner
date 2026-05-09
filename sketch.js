let player;
let obstacles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  player = createSprite(100, 200, 40, 40);
  player.shapeColor = "blue";
}

function draw() {
  background(150, 200, 255);

  if (!gameOver) {
    score++;

    if (keyDown("LEFT_ARROW")) player.position.x -= 5;
    if (keyDown("RIGHT_ARROW")) player.position.x += 5;
    if (keyDown("UP_ARROW")) player.position.y -= 5;
    if (keyDown("DOWN_ARROW")) player.position.y += 5;

    player.position.x = constrain(player.position.x, 0, width);
    player.position.y = constrain(player.position.y, 0, height);

    if (frameCount % 60 === 0) {
      let o = createSprite(600, random(0, 400), 30, 30);
      o.velocity.x = -4 - score * 0.01;
      o.shapeColor = "red";
      obstacles.push(o);
    }

    for (let o of obstacles) {
      if (player.overlap(o)) {
        gameOver = true;
      }
    }

  } else {
    textAlign(CENTER);
    textSize(40);
    text("GAME OVER", width / 2, height / 2);

    textSize(20);
    text("Press R to Restart", width / 2, height / 2 + 40);

    if (keyDown("r")) {
      restartGame();
    }
  }

  drawSprites();

  textSize(16);
  text("Score: " + score, 20, 20);
}

function restartGame() {
  score = 0;
  gameOver = false;

  for (let o of obstacles) {
    o.remove();
  }

  obstacles = [];
}