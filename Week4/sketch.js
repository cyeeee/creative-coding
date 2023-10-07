/*
Week4 - Interaction
Author: Chenyi Wang
Date: 10/07/2023

Instruction:
Create a sketch that adds objects based on interaction (mouse press, keystroke, etc) 
that interact with each other (collision, repulsion, etc.)

This sketch implements a simple bubble gun
*/

class bubbleObj {
  constructor(x, y, s) {
    this.pos = new p5.Vector(x, y);
    this.size = s;
    this.direction = new p5.Vector(random(-1, 1), random(-1, 1));
  }

  display() {
    //draw bubbles
    fill(230, 100); //TODO: random color
    circle(this.pos.x, this.pos.y, this.size);
    
    this.update();
  }

  update() {
    //update the postion of bubble
    this.pos.x += this.direction.x;
    this.pos.y += this.direction.y;
    // bounce off the borders
    if (this.pos.x >= width - this.size/2 || this.pos.x < this.size/2) {
      this.direction.x = -this.direction.x;
    }
    if (this.pos.y >= height - this.size/2 || this.pos.y < this.size/2) {
      this.direction.y = -this.direction.y;
    }
  }

  repel() {
    //implement repulsion between bubbles
  }
}

var bubbles = [];
function initBubbles() {
  // Add some bubbles to display on initialization
  for (let i = 0; i < 10; i++) {
    // add bubbles at random position with random size
    bubbles.push(new bubbleObj(random(50, 550), random(50, 550), random(10, 30)));
  }
}
// If mouse pressed, push new elements to bubbles array till mouse released
// mousePressed(), mouseReleased()
// mouseClicked()?

var bubble_gun;
var gun_size = 40;
function preload() {
  bubble_gun = loadImage("bubble_gun.png");
}

function setup() {
  createCanvas(600, 600);
  initBubbles();
}

function draw() {
  background(30);

  // Display bubble gun image at the mouse location
  image(bubble_gun, mouseX-gun_size/2, mouseY-gun_size/2, gun_size, gun_size);

  // Display bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
  }
}
