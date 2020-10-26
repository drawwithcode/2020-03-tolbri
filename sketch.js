let brickTexture_A;
let brickTexture_B;
let brickSize = 40;
let brickBoard = [];

let tileSize = [2, 4];

let colorArray = ["#4287f5", "#39c20c", "#f54248", "#fff959"];
let activeColor = 0;

let soundFX = [];

function preload() {
  soundFormats('mp3', 'ogg');
  sfx1 = loadSound("assets/sounds/click_1");
  sfx2 = loadSound("assets/sounds/click_2");
  sfx3 = loadSound("assets/sounds/click_3");
  sfx4 = loadSound("assets/sounds/click_4");
  soundFX.push(sfx1, sfx2, sfx3, sfx4);

  brickTexture_A = loadImage("assets/brick_A.jpg");
  brickTexture_B = loadImage("assets/brick_B.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(RADIUS)
  imageMode(CENTER);
  frameRate(15);
  noCursor();
  for (var i = 0; i < width + brickSize; i += brickSize) {
    for (var j = 0; j < height + brickSize; j += brickSize) {
      brickBoard.push(new Brick(i, j));
    }
  }
}

function draw() {
  for (var i = 0; i < brickBoard.length; i++) {
    if (isOver(brickBoard[i])) {
      brickBoard[i].active = true;
      brickBoard[i].update();
    } else {
      brickBoard[i].active = false;
    }
    brickBoard[i].display();
  }
  push();
  noStroke();
  fill("#E3E3E3")
  rect(windowWidth / 2, windowHeight - 40, windowWidth / 2 - 20 ,20);
  fill("#000");
  textSize(16);
  textAlign(CENTER);
  text("C: Color      R: Rotate     Up/Down/Left/Right: Size      Click: Build      Double-click: Destroy", windowWidth / 2, windowHeight - 35);
  pop();
}

function isOver(temp_brick) {
  let brick = temp_brick;
  if (
    (brick.x - brickSize * tileSize[0] < mouseX) &&
    (brick.x > mouseX) &&
    (brick.y - brickSize * tileSize[1] < mouseY) &&
    (brick.y > mouseY)) {
    return true;
  } else {
    return false;
  }
}

function mouseClicked() {
  for (var i = 0; i < brickBoard.length; i++) {
    if (brickBoard[i].active) {
      brickBoard[i].builtColor = colorArray[activeColor];
      brickBoard[i].built = true;
      random(soundFX).play();
    }
  }
}

function doubleClicked() {
  for (var i = 0; i < brickBoard.length; i++) {
    if (brickBoard[i].active) {
      brickBoard[i].built = false;
    }
  }
}

function keyReleased() {
  if (keyCode == 67) {
    if (activeColor == colorArray.length - 1) {
      activeColor = 0;
    } else {
      activeColor = activeColor + 1;
    }
  } else if (keyCode == 82) {
    tileSize.reverse();
  } else if (keyCode == 37) {
    let currentWidth = tileSize[0];
    tileSize.splice(0, 1, currentWidth / 2);
  } else if (keyCode == 38) {
    let currentHeight = tileSize[1];
    tileSize.splice(1, 1, currentHeight - 1);
  } else if (keyCode == 39) {
    let currentWidth = tileSize[0];
    tileSize.splice(0, 1, currentWidth * 2);
  } else if (keyCode == 40) {
    let currentHeight = tileSize[1];
    tileSize.splice(1, 1, currentHeight + 1);
  }
}

class Brick {
  constructor(temp_x, temp_y) {
    this.x = temp_x;
    this.y = temp_y;
    this.active = false;
    this.built = false;
    this.activeColor = colorArray[activeColor];
    this.builtColor = colorArray[activeColor];
  }

  display() {
    push();
    if (this.active) {
      tint(color(this.activeColor));
      image(brickTexture_A, this.x, this.y, brickSize, brickSize);
    } else if (this.built) {
      tint(color(this.builtColor));
      image(brickTexture_A, this.x, this.y, brickSize, brickSize);
    } else {
      image(brickTexture_B, this.x, this.y, brickSize, brickSize);
    }
    pop();
  }
  update(temp_color) {
    this.activeColor = colorArray[activeColor];
  }
}
