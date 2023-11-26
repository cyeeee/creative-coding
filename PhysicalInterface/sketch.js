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
    this.fadeAmount = 2;
    this.selected = 0;
    this.assigned = 0;
    this.piece = 0;
  }

  display() {
    if (this.selected === 0) this.opacity = 0;  // reset opacity for unselected box
    noStroke();
    fill(120, this.opacity);
    rect(this.x, this.y, this.w, this.h);
    this.fill();
  }

  flash() {
    // don't flash assigned box
    if (this.assigned === 1) {
      this.opacity = 0;
      return;
    }

    this.opacity += this.fadeAmount;
    if (this.opacity <= 0 || this.opacity >= 190) {
      this.fadeAmount = -this.fadeAmount;
    }
  }

  fill() {
    if (this.assigned === 0) return;
    
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

  assign() {
    // can't re-assign
    if (this.assigned === 1) return;

    if (btnValue === 1) { 
      this.piece = 1;
      turn = 2;
    }
    else if (btnValue === 2) {
      this.piece = 2;
      turn = 1;
    }
    this.assigned = 1;
  }

  reset() {
    this.opacity = 0;
    this.selected = 0;
    this.assigned = 0;
    this.piece = 0;
  }
}

function keyPressed() {
  if (keyCode === 82) { // R
    init = 1;
  }
}

function restart() {
  init = 0;
  turn = 1;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].reset();
  }
}

var boxes = [];
var turn = 1;
var init = 0;
var serial;
var portName = "COM3";
var currInput;
var potValue = 0;
var btnValue = 0;

function setup() {
  createCanvas(600, 600);

  boxes = [new boxObj(0, 0), new boxObj(width/3, 0), new boxObj(width/3*2, 0), 
    new boxObj(0, height/3), new boxObj(width/3, height/3), new boxObj(width/3*2, height/3),
    new boxObj(0, height/3*2), new boxObj(width/3, height/3*2), new boxObj(width/3*2, height/3*2),];

  serial = new p5.SerialPort();

  //serial.onList(gotList);
  serial.list();

  //serial.onOpen(gotOpen);
  serial.openPort(portName);

  serial.onData(gotData);
}

function draw() {
  background(50);

  if (init === 1) {
    restart();
  }

  // border
  noStroke();
  fill(40, 150, 120);
  rect(width/3-5, 0, 10, height);
  rect(width/3*2-5, 0, 10, height);
  rect(0, height/3-5, width, 10);
  rect(0, height/3*2-5, width, 10);

  // boxes
  for (let i = 0; i < boxes.length; i++) {
    if (i === potValue) {
      boxes[i].selected = 1;
      boxes[i].flash();
    }
    else {
      boxes[i].selected = 0;
    }

    boxes[i].display();
  }

  // turn
  noStroke();
  fill(45, 210, 160);
  textStyle(BOLD);
  textFont('Courier New', 16);
  textAlign(CENTER, CENTER);
  if (turn === 1) { 
    text('× Turn', 300, 15);
  }
  else if (turn === 2) {
    text('○ Turn', 300, 15);
  }

  // restart
  noStroke();
  fill(45, 210, 160);
  textStyle(BOLD);
  textFont('Courier New', 14);
  textAlign(CENTER, CENTER);
  text('Press [R] to restart', 300, 585);
}

// function gotList(ports) {
//   for (let i = 0; i < ports.length; i++) {
//     console.log(ports[i]);
//   }
// }

// function gotOpen() {
//   console.log("Port Open!");
// }

function gotData() {
  let newData = serial.readLine();
  if (newData.length <= 0) return;
  //console.log(newData);

  if (newData === "potentiometer" || newData === "button") {
    currInput = newData;
  }
  else {
    if (currInput === "potentiometer") {
      potValue = int(newData);
    }
    if (currInput === "button") {
      btnValue = int(newData);
      if (btnValue === turn) {
        boxes[potValue].assign();
      }
    }
  }
}

