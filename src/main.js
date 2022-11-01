let game;

function setup() {
  createCanvas(540, 540);
  angleMode(DEGREES);
  imageMode(CENTER);
}

function preload() {
  game = new Game();
  game.preload();
}

function draw() {
  game.draw();
}

function keyPressed() {
  if(key == " ") {
    game.greenTankP1.rotate();
  }
}



