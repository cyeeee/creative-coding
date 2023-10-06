/*
Week 1 - Sol Lewitt drawing exercise
Author: Chenyi Wang
Date: 09/18/23

Instructions:
- Wall Drawing #65 (1971): Lines not short, not straight, crossing and touching, 
drawn at random, using four colors, uniformly dispersed with maximum density, 
covering the entire surface of the wall.

The drawing used 200 bezier shapes, and the control points for each bezier were randomly assigned.

The drawing will be slightly different every time it is recompiled.
 */

function wallDrawing() {
  noFill();

  for (var i = 0; i < 50; i++) {
    stroke(65);
    bezier(-50, -50, control_x1[i], control_y1[i], control_x2[i], control_y2[i], 450, 450);

    stroke(255, 50, 50);
    bezier(450, -50, control_x1[i], control_y1[i], control_x2[i], control_y2[i], -50, 450);

    stroke(50, 255, 50);
    bezier(200, -100, control_x1[i], control_y1[i], control_x2[i], control_y2[i], 500, 200);

    stroke(50, 50, 255);
    bezier(-100, 200, control_x1[i], control_y1[i], control_x2[i], control_y2[i], 200, 500);
  }
}

function initializeControlPoints() {
  for (var i = 0; i < 50; i++) {
    var r1 = random(-150, 550);
    var r2 = random(-150, 550);
    var r3 = random(-150, 550);
    var r4 = random(-150, 550);

    control_x1.push(r1);
    control_y1.push(r2);
    control_x2.push(r3);
    control_y2.push(r4);
  }
}

var control_x1 = [];
var control_y1 = [];
var control_x2 = [];
var control_y2 = [];

function setup() {
  createCanvas(400, 400);

  initializeControlPoints();
}

function draw() {
  background(255, 255, 234);

  wallDrawing();
}
