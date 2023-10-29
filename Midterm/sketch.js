/*
Midterm
Author: Chenyi Wang
Date: 10/28/22

Prompt: Make your own interactive, screen based artwork. 
Your sketch needs to contain at least 2 objects that behave independently from one another.

My midterm project is a simple game "whack-a-mole"

The game has three interfaces: home page, game page, and game-over page
The main game has two modes: single-player mode, and two-player mode, user can pick the mode in the home page
For single-player mode, user can control the hammer by using WASD keys
For two-player mode, user can in addition control the moles by using arrow keys
Both modes have a time limit of 60 seconds
When the time is up, it will auto switch to the game-over page
User can then choose to either play again or go back to the home page

The images of the mole and hammer are from the internet:
https://www.istockphoto.com/illustrations/whack-a-mole
The buttons in the home and ending pages are using the p5.clickable library:
https://github.com/Lartu/p5.clickable
The timer in the game is using the p5.timer library:
https://github.com/scottkildall/p5.timer
Other than that, everything else is created from the scratch
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
  // control moles manually using arrow keys for two-player mode
  if (game.mode === 2) {
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
}

var holesPos = [];
var holes = [];
var hammer;
var game;

function setup() {
  createCanvas(600, 600);
  frameRate(60);

  game = new gameObj();

  holesPos = [new p5.Vector(300, 210), new p5.Vector(130, 320), new p5.Vector(300, 450), new p5.Vector(470, 320)];
  holes = [new holeObj(holesPos[0]), new holeObj(holesPos[1]), new holeObj(holesPos[2]), new holeObj(holesPos[3])]; 

  hammer = new hammerObj(300, 330);
}

function draw() {

  game.display();

  // enter single-plyer mode
  game.playButton.onPress = function() {
    if (game.interface === 0) {
      game.mode = 1;
      game.interface = 1;
      game.timer.start();
    }
  }

  // enter two-player mode
  game.playButton2.onPress = function() {
    if (game.interface === 0) {
      game.mode = 2;
      game.interface = 1;
      game.timer.start();
    }
  }

  // time up, switch to game-over page
  if (game.timer.expired()) {
    game.interface = 2;
  }

  // replay with the same mode
  game.rePlayButton.onPress = function() {
    if (game.interface === 2) {
      game.interface = 1;
      game.timer.reset();
      game.timer.start();
    }
  }

  // back to start page
  game.homeButton.onPress = function() {
    if (game.interface === 2) {
      game.interface = 0;
      game.timer.reset();
    }
  }

  // button hovering animation
  switch (game.interface) {
    case 0:
      game.playButton.onOutside = function() {
        game.playButton.color = [255, 255, 220];
      }
      game.playButton.onHover = function() {
        game.playButton.color = [205, 205, 170];
      }

      game.playButton2.onOutside = function() {
        game.playButton2.color = [255, 255, 220];
      }
      game.playButton2.onHover = function() {
        game.playButton2.color = [205, 205, 170];
      }
      break;

    case 2:
      game.rePlayButton.onOutside = function() {
        game.rePlayButton.color = [255, 255, 220];
      }
      game.rePlayButton.onHover = function() {
        game.rePlayButton.color = [205, 205, 170];
      }

      game.homeButton.onOutside = function() {
        game.homeButton.color = [255, 255, 220];
      }
      game.homeButton.onHover = function() {
        game.homeButton.color = [205, 205, 170];
      }
      break;

    default:
      break;
  }

}
