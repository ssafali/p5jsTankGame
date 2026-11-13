const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;
const KEY_W = 87;
const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const SCROLL_KEYS = [KEY_SPACE, KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN];
const PIXEL_FONT = '"Press Start 2P"';

let blueTank;
let redTank;
let blueTankImage;
let redTankImage;
let backgroundImage;
let winner = null;

function preload() {
  blueTankImage = loadImage('assets/tankBlue.png');
  redTankImage = loadImage('assets/tankRed.png');
  backgroundImage = loadImage('assets/tankBackground.png');
}

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  blueTank = new Tank('Blue', blueTankImage, CANVAS_SIZE * 0.25, CANVAS_SIZE / 2, 0, color(60, 140, 255));
  redTank = new Tank('Red', redTankImage, CANVAS_SIZE * 0.75, CANVAS_SIZE / 2, PI, color(255, 70, 60));
}

function draw() {
  const dt = min(deltaTime / 1000, MAX_FRAME_TIME);

  if (!winner) {
    blueTank.update(dt, axis(KEY_A, KEY_D), axis(KEY_S, KEY_W));
    redTank.update(dt, axis(KEY_LEFT, KEY_RIGHT), axis(KEY_DOWN, KEY_UP));
    handleHits(blueTank.checkHits(redTank));
    handleHits(redTank.checkHits(blueTank));
    winner = findWinner();
    if (winner) sound.win();
  }
  effects.update(dt);

  background(backgroundImage);
  push();
  effects.applyShake();
  blueTank.draw();
  redTank.draw();
  effects.draw();
  pop();

  drawScoreboard();
  if (winner) {
    drawGameOver();
  }
}

function axis(negativeKey, positiveKey) {
  return (keyIsDown(positiveKey) ? 1 : 0) - (keyIsDown(negativeKey) ? 1 : 0);
}

function handleHits(hits) {
  for (const shell of hits) {
    effects.explode(shell.x, shell.y);
    sound.hit();
  }
}

function findWinner() {
  const blueWon = blueTank.score >= WIN_SCORE;
  const redWon = redTank.score >= WIN_SCORE;
  if (blueWon && redWon) return 'Nobody';
  if (blueWon) return 'Blue';
  if (redWon) return 'Red';
  return null;
}

function drawScoreboard() {
  const pip = 8;
  const gap = 4;
  const pipsWidth = WIN_SCORE * pip + (WIN_SCORE - 1) * gap;
  const panelWidth = 200;
  const panelX = (width - panelWidth) / 2;

  push();
  noStroke();
  fill(0, 150);
  rect(panelX, 6, panelWidth, 24, 6);

  textFont(PIXEL_FONT);
  textSize(8);
  textAlign(LEFT, CENTER);
  fill(blueTank.shellColor);
  text('BLUE', panelX + 10, 19);
  textAlign(RIGHT, CENTER);
  fill(redTank.shellColor);
  text('RED', panelX + panelWidth - 10, 19);

  drawPips(blueTank, width / 2 - 8 - pipsWidth, pip, gap);
  drawPips(redTank, width / 2 + 8, pip, gap);
  pop();
}

function drawPips(tank, startX, pip, gap) {
  for (let i = 0; i < WIN_SCORE; i++) {
    const x = startX + i * (pip + gap);
    stroke(tank.shellColor);
    strokeWeight(1.5);
    if (i < tank.score) fill(tank.shellColor);
    else noFill();
    rect(x, 14, pip, pip, 2);
  }
}

function drawGameOver() {
  push();
  noStroke();
  fill(0, 160);
  rect(0, 0, width, height);
  fill(255);
  textFont(PIXEL_FONT);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(`${winner} wins!`, width / 2, height / 2 - 20);
  textSize(12);
  text('Press R to play again', width / 2, height / 2 + 24);
  pop();
}

function restart() {
  blueTank.reset();
  redTank.reset();
  effects.clear();
  winner = null;
}

function keyPressed() {
  sound.unlock();

  if (key === 'r' || key === 'R') {
    restart();
  } else if (key === 'm' || key === 'M') {
    sound.toggleMute();
  } else if (!winner && keyCode === KEY_SPACE) {
    fire(blueTank);
  } else if (!winner && keyCode === KEY_ENTER) {
    fire(redTank);
  }

  if (SCROLL_KEYS.includes(keyCode)) {
    return false;
  }
}

function fire(tank) {
  const muzzle = tank.shoot();
  if (muzzle) {
    effects.muzzleFlash(muzzle.x, muzzle.y);
    sound.shoot();
  }
}
