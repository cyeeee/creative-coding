/*
Midterm
Author: Chenyi Wang
Date: 10/27/22

*/

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
    hammer.hit = 1;
  }
  if (keyArray[65] === 1) { // A
    WASD = 'A';
    hammer.hit = 1;
  }
  if (keyArray[83] === 1) { // S
    WASD = 'S';
    hammer.hit = 1;
  }
  if (keyArray[68] === 1) { // D
    WASD = 'D';
    hammer.hit = 1;
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

function mouseClicked() {
  if (game.interface === 0) {
    game.interface = 1;
    game.timer.start();
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

  game.display();

  if (game.timer.expired()) {
    game.interface = 2;
  }
}
