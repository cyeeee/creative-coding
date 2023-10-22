
class hammerObj {
  constructor(x, y) {
    this.pos = new p5.Vector(x, y);
    this.size = 80;
  }

  display() {
    imageMode(CENTER);
    image(hammerImg, this.pos.x, this.pos.y, this.size, this.size);
  }

  move() {
    checkKeyPress();
    debouncing();

    // TODO: add animation for hammer movement, maybe use tween library
    switch(WASD) {
      case 'W':
        this.pos = new p5.Vector(holesPos[0].x+20, holesPos[0].y-60);
        break;
      case 'A':
        this.pos = new p5.Vector(holesPos[1].x+20, holesPos[1].y-60);
        break;
      case 'S':
        this.pos = new p5.Vector(holesPos[2].x+20, holesPos[2].y-60);
        break;
      case 'D':
        this.pos = new p5.Vector(holesPos[3].x+20, holesPos[3].y-60);
        break;
      default:
        break;
    }
  }
}

class holeObj {
  // This class is for both holes and moles 
  constructor(pos) {
    this.pos = pos;
  }

  display() {
    fill(0);
    ellipse(this.pos.x, this.pos.y, 120, 60);
    // TODO: swith between different images to animate the mole movement
  }
}

var hammerImg;
function preload() {
  hammerImg = loadImage("hammer.png");
}

var keyArray = [];
var freezeFrame;
var currKey;
function keyPressed() {
  keyArray[keyCode] = 1;
  freezeFrame = frameCount;
  currKey = keyCode;
}
// add debouncing logic for key press to avoid extra calls
function debouncing() {
  if (frameCount === freezeFrame+1) { // reset key status after 1 frame (~16.67 ms)
    keyArray[currKey] = 0;
  }
}

var WASD;
function checkKeyPress() {
  if (keyArray[87] === 1) { // W
    WASD = 'W';
  }
  if (keyArray[65] === 1) { // A
    WASD = 'A';
  }
  if (keyArray[83] === 1) { // S
    WASD = 'S';
  }
  if (keyArray[68] === 1) { // D
    WASD = 'D';
  }
}

var holesPos = [];
var holes = [];
var hammer;

function setup() {
  createCanvas(600, 600);
  frameRate(60);

  holesPos = [new p5.Vector(300, 150), new p5.Vector(150, 300), new p5.Vector(300, 450), new p5.Vector(450, 300)];
  holes = [new holeObj(holesPos[0]), new holeObj(holesPos[1]), new holeObj(holesPos[2]), new holeObj(holesPos[3])]; 

  hammer = new hammerObj(300, 300);
}

function draw() {
  background(220);

  for (let i = 0; i < holes.length; i++) {
    holes[i].display();
  }

  hammer.display();
  hammer.move();
}
