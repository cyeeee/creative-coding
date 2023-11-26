/*
Physical Interface
Author: Chenyi Wang
Date: 11/26/2023

Prompt: Build a sketch with a physical interface - take one of your early p5 sketches and make it controllable with digital or analog inputs using serial.

Iteration on tic-tac-toe game - switch the game board to a p5 sketch interface while keeping the player controls physical
*/

class boxObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = width/3;
    this.h = height/3;
    this.centerX = this.x+this.w/2;
    this.centerY = this.y+this.h/2;
    this.opacity = 0;
    this.fadeAmount = 0.2;
    this.selected = 0;
    this.piece = 1;
  }

  display() {
    noStroke();
    fill(120, this.opacity);
    rect(this.x, this.y, this.w, this.h);
  }

  flash() {
    this.opacity += this.fadeAmount;
    if (this.opacity <= 0 || this.opacity >= 190) {
      this.fadeAmount = -this.fadeAmount;
    }
    noStroke();
    fill(200);
    textFont('Helvetica', 18);
    textAlign(CENTER, CENTER);
    if (this.piece === 1) { 
      text('× Turn', this.centerX, this.centerY);
    }
    else if (this.piece === 2) {
      text('○ Turn', this.centerX, this.centerY);
    }
  }

  place() {
    noStroke();
    fill(235);
    textFont('Helvetica', 250);
    textAlign(CENTER, CENTER);
    if (this.piece === 1) { 
      text('×', this.centerX, this.centerY+15);
    }
    else if (this.piece === 2) {
      text('○', this.centerX, this.centerY);
    }
  }
}

var boxes = [];

function setup() {
  createCanvas(600, 600);

  boxes = [new boxObj(0, 0), new boxObj(width/3, 0), new boxObj(width/3*2, 0), 
    new boxObj(0, height/3), new boxObj(width/3, height/3), new boxObj(width/3*2, height/3),
    new boxObj(0, height/3*2), new boxObj(width/3, height/3*2), new boxObj(width/3*2, height/3*2),];
}

function draw() {
  background(50);

  // border
  noStroke();
  fill(40, 150, 120);
  rect(width/3-5, 0, 10, height);
  rect(width/3*2-5, 0, 10, height);
  rect(0, height/3-5, width, 10);
  rect(0, height/3*2-5, width, 10);

  // boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
}
