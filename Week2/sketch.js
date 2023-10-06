/* 
Week 2 - Animation (Clock Design)
Author: Chenyi Wang
Date: 09/23/23

The canvas size of this sketch is 400 x 600
The canvas is divided into 3 sections for seconds, minutes, and hours

The time is expressed by the number of particles in each section

The upper section represents seconds, the middle section represents minutes, and the bottom represents hours
 */

class particleObj {
  constructor(x, y, s, c, d1, d2, speed) {
    this.pos = new p5.Vector(x, y);
    this.size = s;
    this.color = c;
    this.top = d1;
    this.bot = d2;
    this.direction = new p5.Vector(random(-speed, speed), random(-speed, speed));
  }

  draw() { 
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  move() {
    this.pos.x += this.direction.x;
    this.pos.y += this.direction.y;
    // bounce off the borders and dividers
    if (this.pos.x >= width - this.size/2 || this.pos.x < this.size/2) {
      this.direction.x = -this.direction.x;
    }
    if (this.pos.y >= this.bot - this.size/2 || this.pos.y < this.top + this.size/2) {
      this.direction.y = -this.direction.y;
    }
  }
}

var hrs = [];
var mins = [];
var secs = [];
var divider1;
var divider2;
var midX;
var midY1;
var midY2;
var midY3;
var secColor;
var minColor;
var hrColor;
var secSize;
var minSize;
var hrSize;

function setup() {
  createCanvas(400, 600);

  divider1 = height/4;
  divider2 = height/5*3;
  midX = 200;
  midY1 = 75;
  midY2 = 240;
  midY3 = 480;
  secColor = color(170, 230, 230, 130);
  minColor = color(100, 230, 230, 100);
  hrColor = color(0, 220, 220, 80);
  secSize = 20;
  minSize = 35;
  hrSize = 70;
}

function draw() {
  background(35);

  stroke(220, 160)
  // set up dividers
  line(0, divider1, width, divider1);
  line(0, divider2, width, divider2);

  // Seconds
  if (secs.length < second()) {
    secs.push(new particleObj(midX, midY1, secSize, secColor, 0, divider1, 2));
  }
  if (second() === 0) {
    secs = [];
  }
  for (var i = 0; i < secs.length; i++) {
    secs[i].draw();
    secs[i].move();
  }
  
  // Minutes
  if (mins.length < minute()) {
    mins.push(new particleObj(midX, midY2, minSize, minColor, divider1, divider2, 1.2));
  }
  if (minute() === 0) {
    mins = [];
  }
  for (var i = 0; i < mins.length; i++) {
    mins[i].draw();
    mins[i].move();
  }

  // Hours
  if (hrs.length < hour()) {
    hrs.push(new particleObj(midX, midY3, hrSize, hrColor, divider2, height, 1));
  }
  if (hour() === 0) {
    hrs = [];
  }
  for (var i = 0; i < hrs.length; i++) {
    hrs[i].draw();
    hrs[i].move();
  }
}
