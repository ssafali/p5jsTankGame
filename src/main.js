let ROTATE_AMOUNT = 0.05;
let blueTankP1;
let redTankP2;

let blueTankImage;
let redTankImage;
let backgroundImage;

function preload() {
  blueTankImage = loadImage('assets/tankBlue.png');
  redTankImage = loadImage('assets/tankRed.png');
  backgroundImage = loadImage('assets/tankBackground.png');
}

function setup() {
  createCanvas(540, 540);
  blueTankP1 = new Tank(blueTankImage);
  redTankP2 = new Tank(redTankImage);
  
}

function draw() {
  background(backgroundImage);
  blueTankP1.draw();
  redTankP2.draw();
  blueTankP1.update();
  redTankP2.update();
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    redTankP2.rotateAmount = ROTATE_AMOUNT;
  } else if (keyCode == RIGHT_ARROW) {
    redTankP2.rotateAmount = -ROTATE_AMOUNT;
  } else if (keyCode == 68) {
    // d
    blueTankP1.rotateAmount = ROTATE_AMOUNT;
  } else if (keyCode == 65) { 
  	// a
    blueTankP1.rotateAmount = -ROTATE_AMOUNT;
  }

  if(keyCode == 16) {
    redTankP2.shoot();
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    redTankP2.rotateAmount = 0;
  } else if (keyCode === 65 || keyCode === 68) {
    blueTankP1.rotateAmount = 0;
  }
}



