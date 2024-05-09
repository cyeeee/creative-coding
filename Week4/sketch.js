/*
Week4 - Interaction
Author: Chenyi Wang
Date: 10/08/2023

Instruction:
Create a sketch that adds objects based on interaction (mouse press, keystroke, etc) 
that interact with each other (collision, repulsion, etc.)

This sketch implements a simple bubble gun
In a 600x600 canvas, the mouse represents a bubble gun as there's a bubble gun icon attached to the cursor
When the mouse is pressed, the gun emits bubbles and will stop when the mouse is released OR there are too many bubbles on the display
Each bubble will bounce off each other and at the border if it's not too small
The initial size of each bubble is small and will increase over time
The opacity of the bubble will also decrease as its size increases
The bubble will disappear when its size is too big

*/

class bubbleObj {
  constructor(x, y, s = random(7, 15)) {
    this.pos = new p5.Vector(x, y);
    this.size = s;
    this.direction = new p5.Vector(random(-s/100, s/100), random(-s/100, s/100));
    this.currFrame = frameCount;
    this.r = random(0, 150);
    this.g = random(150, 255);
    this.b = random(150, 255);
    this.opacity = 160;
  }

  display() {
    //draw bubbles
    stroke(this.r+50, this.g+50, this.b+50, 160);
    fill(this.r, this.g, this.b, this.opacity);
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

    //increase the size and decrease the opacity every 30 frames
    if (this.currFrame < frameCount - 30) {
      this.currFrame = frameCount;
      this.size += 0.5;
      this.opacity -= 3;
    }

    this.collide();
  }

  collide() {
    //implement collision between bubbles
    for (let i = 0; i < bubbles.length; i++) {
      if (this !== bubbles[i] && this.size > 14) {
        // collide with another bubble if the bubble size is not too small
        if (dist(this.pos.x, this.pos.y, bubbles[i].pos.x, bubbles[i].pos.y) 
              <= this.size/2+bubbles[i].size/2) {
          // change moving directions
          var v = new p5.Vector(this.pos.x - bubbles[i].pos.x, this.pos.y - bubbles[i].pos.y);
          var heading1 = this.direction.heading();
          var heading2 = v.heading();
          var angle = abs(heading2 - heading1);
          if (angle > TWO_PI) angle = -angle;
          this.direction.rotate(angle*2);
          v.mult(0.01);
          this.direction.x += v.x;
          this.direction.y += v.y;
          v.mult(-1);
          bubbles[i].direction.x += v.x;
          bubbles[i].direction.y += v.y;
        }
        bubbles[i].direction.normalize();
      }
    }
  }
}

var bubbles = [];
function initBubbles() {
  // Add some bubbles to display on initialization
  for (let i = 0; i < 10; i++) {
    // add bubbles at random position with random size
    bubbles.push(new bubbleObj(random(50, 550), random(50, 550), random(15, 30)));
  }
}

// If mouse pressed, emit bubbles till mouse released
var emit = false;
function mousePressed() {
  emit = true;
}
function mouseReleased() {
  emit = false;
}

var bubble_gun;
var gun_size = 40;
function preload() {
  bubble_gun = loadImage("bubble_gun.png");
}

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  initBubbles();
}

function draw() {
  background(30);

  // Display bubble gun image at the mouse location
  image(bubble_gun, mouseX-gun_size/2, mouseY-gun_size/2, gun_size, gun_size);

  // emit bubbles when mouse pressed and there are not too many bubbles
  if (emit && bubbles.length < 200) {
    bubbles.push(new bubbleObj(mouseX-gun_size/2, mouseY-gun_size/2));
  }

  // Display bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    // Remove the bubble when its size is too big
    if (bubbles[i].size > 40) {
      bubbles.splice(i, 1);
    }
  }

  // Add instruction at the bottom of the canvas
  fill(220);
  textStyle(NORMAL);
  textAlign(CENTER);
  textFont('Courier New', 16);
  text("Click or Drag to shoot bubbles", width/2, 580);
}
