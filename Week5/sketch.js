/*
Week 5 - Data
Author: Chenyi Wang
Date: 10/15/2023

Instruction:
Create a sketch that calls an API, processes the data, and visualizes it somehow.

This sketch generate a (fake) profile for a random user
*/

var user_name;
var user_title;
var user_phone;
var user_email;
var user_location;

var text_box_x, text_box_w;

function setup() {
  createCanvas(500, 600);

  apiRequest();

  text_box_x = 50;
  text_box_w = 400;
}

function draw() {
  background(250);

  textFont('Georgia');
  textWrap(WORD);

  if (user_name !== undefined) {
    fill(1,135,136);
    textStyle(BOLD);
    textSize(32);
    text(user_name, text_box_x, 50, text_box_w);
  }

  if (user_title !== undefined) {
    fill(64);
    textStyle(NORMAL);
    textSize(26);
    text(user_title, text_box_x, 90, text_box_w);
  }

  textStyle(BOLD);
  textSize(26);
  text("Personal Info", text_box_x, 170, text_box_w);

  textStyle(NORMAL);
  fill(1,135,136);
  textSize(20);
  text("Phone Number", text_box_x, 220, text_box_w);
  if (user_phone !== undefined) {
    fill(64);
    textSize(26);
    text(user_phone, text_box_x, 250, text_box_w);
  }

  textSize(20);
  fill(1,135,136);
  text("Email", text_box_x, 300, text_box_w);
  if (user_email !== undefined) {
    fill(64);
    textSize(26);
    text(user_email, text_box_x, 330, text_box_w);
  }

  textSize(20);
  fill(1,135,136);
  text("Address", text_box_x, 380, text_box_w);
  if (user_location !== undefined) {
    fill(64);
    textSize(26);
    text(user_location, text_box_x, 410, text_box_w);
  }
}

async function apiRequest() {
  let request = await fetch("https://randomuser.me/api/");
  //console.log(request);
  let data = await request.json();
  //console.log(data);
  let user = data.results[0];
  console.log(user);
  user_name = user.name.first + " " + user.name.last;
  user_title = user.name.title;
  user_phone = user.phone;
  user_email = user.email;
  user_location = user.location.city + ", " + user.location.state + ", " + user.location.country + ", " + user.location.postcode;
}
