/*
Midterm
Author: Chenyi Wang
Date: 10/27/22

*/
class gameObj {
  constructor() {
    this.score = 0;
  }
}

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
    this.size = 120;
    this.mole = 0;
    this.hit = 0;
    this.scored = 0;
    this.currFrame = frameCount;
  }

  display() {
    fill(0);
    imageMode(CENTER);
    image(holeImg, this.pos.x, this.pos.y, this.size, this.size);
    if (this.mole === 1) { 
      if (hammer.pos.x === this.pos.x+20 && hammer.pos.y === this.pos.y-60 || this.hit === 1) {
        this.hit = 1;
        image(moleHitImg, this.pos.x, this.pos.y, this.size, this.size);
        if (this.scored === 0) {
          game.score++;
          this.scored = 1;
        }
      }
      else {
        image(moleImg, this.pos.x, this.pos.y, this.size, this.size);
      }
    }
    if ((frameCount - this.currFrame) > 120) {  // let moles stays for 2 sec.
      this.mole = 0;
      this.hit = 0;
      this.scored = 0;
    }
    // TODO: let moles move automatically and randomly
  }
}

var hammerImg;
var holeImg;
var moleImg;
var moleHitImg;
function preload() {
  hammerImg = loadImage("hammer.png");
  holeImg = loadImage("hole.png");
  moleImg = loadImage("mole.png");
  moleHitImg = loadImage("mole_hit.png");
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
var arrowKey;
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
  //Tmp: control moles manually using arrow keys for testing
  if (keyArray[UP_ARROW] === 1) {
    holes[0].mole = 1;
    holes[0].currFrame = frameCount;
  }
  if (keyArray[LEFT_ARROW] === 1) {
    holes[1].mole = 1;
    holes[1].currFrame = frameCount;
  }
  if (keyArray[DOWN_ARROW] === 1) {
    holes[2].mole = 1;
    holes[2].currFrame = frameCount;
  }
  if (keyArray[RIGHT_ARROW] === 1) {
    holes[3].mole = 1;
    holes[3].currFrame = frameCount;
  }
}

var holesPos = [];
var holes = [];
var hammer;
var game;

function setup() {
  createCanvas(600, 600);
  frameRate(60);

  game = new gameObj();

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

  fill(0);
  textStyle(BOLD);
  textAlign(LEFT);
  textFont('Courier New', 16);
  text("SCORE: " + game.score, 20, 50);
}
