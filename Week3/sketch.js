/*
Week3 - Dance Party
Author: Chenyi Wang
Date: 09/29/2023

The canvas size of this sketch is 600 x 600
The color of the background will change dynamically
There are two groups of dancers dancing in this sketch:
One group dancing on the stairs;
another group dancing at the bottom
Both groups of dancers will loop back to the left side of the screen after they reach the right-most boundary

*/

var tileMap = [
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "   ss   ",
  "  s  s  ",
  " s    s ",
  "s      s",
  "        ",
  "        ",
  "        ",
];

class stairObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var stairs = [];
function initTileMap() {
  for (var i = 0; i < tileMap.length; i++) {
    for (var j = 0; j < tileMap[i].length; j++) {
      if (tileMap[i][j] === 's') {
        stairs.push(new stairObj(j*75, i*50));
      }
    }
  }
}

function displayTileMap() {
  fill(200);
  noStroke();
  for (var i = 0; i < stairs.length; i++) {
    rect(stairs[i].x, stairs[i].y, 75, 25);
  }
}

class dancer1Obj {
  constructor(x, y, c, w, h) {
    this.pos = new p5.Vector(x ,y);
    this.color = c;
    this.width = w;
    this.height = h;
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.inAir = 0;
  }

  draw() {
    noStroke();
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.width, this.height, 30, 30, 10, 10);

    this.acceleration.set(0, 0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  move() {
    for (var i = 0; i < stairs.length; i++) {
      if (this.pos.x >= stairs[i].x && this.pos.x <= stairs[i].x+65 && this.pos.y+this.height >= stairs[i].y) {
        this.pos.y = stairs[i].y-this.height;
        this.velocity.y = 0;
        this.jump = 0;
        this.inAir = 0;
      } 
      else {
        if (this.pos.x < stairs[i].x && this.inAir === 0) {
          this.jump = 1;
        }
        else {
          this.jump = 0;
        }
        this.force.set(0, 0);
      }
    }
  }

  update() {
    this.velocity.x = 0;
    this.force.set(walkForce);
    if (this.jump === 1) {
      this.force.add(jumpForce);
      this.inAir = 1;
    }
    this.applyForce(this.force);
    this.applyForce(gravity);
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.move();

    if (this.pos.x > width) {
      this.pos.x = 0;
    }
  }
}

function initDancers1() {
  dancers1 = [
    new dancer1Obj(380, 294, color(255, 255, 100), 30, 26),
    new dancer1Obj(290, 254, color(100, 255, 255), 30, 26),
    new dancer1Obj(230, 254, color(180, 100, 255), 30, 26),
    new dancer1Obj(150, 294, color(50, 160, 255), 30, 26),
    new dancer1Obj(70, 344, color(150, 255, 50), 30, 26),
    new dancer1Obj(0, 374, color(255, 100, 100), 30, 26)
  ];
}

class dancer2Obj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.headSize = 30;
    this.currFrame = frameCount;
    this.i = 0;
  }

  draw() {
    fill(255);
    circle(this.x, this.y, this.headSize);  //head
    stroke(255);
    strokeWeight(3);
    line(this.x, this.y+this.headSize/2, this.x, this.y+this.headSize/2+20);  //body

    switch(this.i) {
      case 0:
        line(this.x, this.y+this.headSize/2+20, this.x-15, this.y+this.headSize/2+50); //legs
        line(this.x, this.y+this.headSize/2+20, this.x+15, this.y+this.headSize/2+50);
        line(this.x, this.y+this.headSize/2+10, this.x-25, this.y+this.headSize/2+15); //arms
        line(this.x, this.y+this.headSize/2+10, this.x+25, this.y+this.headSize/2+15);
        break;
      case 1:
        line(this.x, this.y+this.headSize/2+20, this.x-10, this.y+this.headSize/2+50); //legs
        line(this.x, this.y+this.headSize/2+20, this.x+10, this.y+this.headSize/2+50);
        line(this.x, this.y+this.headSize/2+10, this.x-25, this.y+this.headSize/2+20); //arms
        line(this.x, this.y+this.headSize/2+10, this.x+25, this.y+this.headSize/2);
        break;
      case 2:
        line(this.x, this.y+this.headSize/2+20, this.x-5, this.y+this.headSize/2+50); //legs
        line(this.x, this.y+this.headSize/2+20, this.x+5, this.y+this.headSize/2+50);
        line(this.x, this.y+this.headSize/2+10, this.x-25, this.y+this.headSize/2); //arms
        line(this.x, this.y+this.headSize/2+10, this.x+25, this.y+this.headSize/2);
        break;
      default:
        break;
    }

    this.move();
  }

  move() {
    this.x += 0.6;
    if (this.x > width+this.headSize/2) {
      this.x = -this.headSize/2;
    }

    if (this. currFrame < frameCount - 30) {
      this.currFrame = frameCount;
      this.i++;
      if (this.i > 2) {
        this.i = 0;
      }
    }
  }
}

function initDancers2() {
  dancers2 = [
    new dancer2Obj(50, 500),
    new dancer2Obj(130, 500),
    new dancer2Obj(210, 500),
    new dancer2Obj(290, 500),
    new dancer2Obj(370, 500),];
}

function dynamicBackground() {
  if (bgLerpIdx > 2) bgLerpIdx = 0;

  if (bgLerpArr[bgLerpIdx] >= 1) {
    bgLerpArr[bgLerpIdx] = 0;
    bgLerpIdx++;
  }
  switch (bgLerpIdx) {
    case 0:
      background(lerpColor(bgColor3, bgColor1, bgLerpArr[bgLerpIdx]));
      bgLerpArr[bgLerpIdx] += 0.005;
      break;
    case 1:
      background(lerpColor(bgColor1, bgColor2, bgLerpArr[bgLerpIdx]));
      bgLerpArr[bgLerpIdx] += 0.005;
      break;
    case 2:
      background(lerpColor(bgColor2, bgColor3, bgLerpArr[bgLerpIdx]));
      bgLerpArr[bgLerpIdx] += 0.005;
      break;
    default:
      break;
  }
}

var bgLerpArr = [];
var bgLerpIdx;
var bgColor1;
var bgColor2;
var bgColor3;

var dancers1, dancers2;
var gravity, walkForce, jumpForce;

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  initTileMap();
  initDancers1();
  initDancers2();

  bgLerpArr = [0, 0, 0];
  bgLerpIdx = 0;
  bgColor1 = color(232, 30, 122);
  bgColor2 = color(90, 170, 70);
  bgColor3 = color(20, 64, 118);

  gravity = new p5.Vector(0, 0.15);
  walkForce = new p5.Vector(0.7, 0);
  jumpForce = new p5.Vector(0, -5);
}

function draw() {
  dynamicBackground();
  displayTileMap();

  for (var i = 0; i < dancers1.length; i++) {
    dancers1[i].update();
    dancers1[i].draw();
  }

  for (var i = 0; i < dancers2.length; i++) {
    dancers2[i].draw();
  }

}