/*
Week 5 - Data
Author: Chenyi Wang
Date: 10/15/2023

Instruction:
Create a sketch that calls an API, processes the data, and visualizes it somehow.

This sketch generate a (fake) profile for a random person

There's a welcome page that prompts users about what this sketch does, and they can switch the page by pressing the key

Users are able to keep fetching new data for as long as they want
*/

class TextObj {
  // display the text, fade in
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.currY = y+50;  //slowly move up the text
    this.ocapity = 0;
    this.content = c;
    this.size = 32;
    this.textBoxW = width-this.x*2;
    this.set = false;
    this.out = false;
  }

  display() {
    fill(64, this.ocapity);
    textStyle(NORMAL);
    textFont('Georgia', this.size);
    textWrap(WORD);
    if (this.currY !== this.y) {
      this.currY--;
    }
    text(this.content, this.x, this.currY, this.textBoxW);
  }

  fadeIn() {
    if (this.ocapity < 255) {
      this.ocapity += 1.8;
    }
    else {
      this.set = true;
    }
  }

  shift() {
    if (this.x+this.textBoxW > 0 && this.ocapity > 0) {
      this.x -= 1.5;
      this.ocapity -= 1.8;
    }
    else {
      this.out = true;
    }
  }
}

var keyArray = [];
var freezeFrame;
var currKey;
function keyPressed() {
  keyArray[keyCode] = 1;
  freezeFrame = frameCount;
  currKey = keyCode;
}
function debouncing() {
  if (frameCount === freezeFrame+1) {
    keyArray[currKey] = 0;
  }
}

var interface;
var ready_switch;
function checkKeyPress() {
  if (interface === 1 && ready_switch && keyArray[32] === 1) {
    interface = 2;
    ready_switch = false;
  }

  if (interface === 3 && keyArray[13] === 1) {
    apiRequest();
  }
}

var greeting, cue;

var user_first_name;
var user_last_name;
var user_title;
var user_phone;
var user_email;
var user_location;

var text_box_x, text_box_w;

function setup() {
  createCanvas(500, 600);
  frameRate(60);

  apiRequest();

  text_box_x = 50;
  text_box_w = 400;

  greeting = new TextObj(text_box_x, 200, "Hello");

  cue = new TextObj(text_box_x, 270, "Please review some candidates");

  interface = 1;
  ready_switch = false;
}

function draw() {
  background(250);

  checkKeyPress();
  debouncing();

  switch(interface) {
    case 1:
      greeting.display();
      greeting.fadeIn();

      if (greeting.set) {
        cue.display();
        cue.fadeIn();
      }

      if (cue.set) {
        ready_switch = true;
        textStyle(BOLD);
        textFont('Courier New');
        textSize(22);
        text("⇾", 240, 560);
        textSize(16);
        text("Press SPACE to continue", 140, 585);
      }
      break;

    case 2:
      greeting.display();
      greeting.shift();
      cue.display();
      cue.shift();
      if (cue.out) {
        interface = 3;
      }
      break;

    case 3:
      textFont('Georgia');
      textWrap(WORD);

      if (user_first_name !== undefined && user_last_name !== undefined) {
        fill(1,135,136);
        textStyle(BOLD);
        textSize(32);
        text(user_first_name, text_box_x, 50, text_box_w);
        text(user_last_name, text_box_x, 80, text_box_w)
      }

      if (user_title !== undefined) {
        fill(64);
        textStyle(NORMAL);
        textSize(26);
        text(user_title, text_box_x, 120, text_box_w);
      }

      textStyle(BOLD);
      textSize(26);
      text("Personal Info", text_box_x, 200, text_box_w);

      textStyle(NORMAL);
      fill(1,135,136);
      textSize(20);
      text("Phone Number", text_box_x, 250, text_box_w);
      if (user_phone !== undefined) {
        fill(64);
        textSize(26);
        text(user_phone, text_box_x, 280, text_box_w);
      }

      textSize(20);
      fill(1,135,136);
      text("Email", text_box_x, 330, text_box_w);
      if (user_email !== undefined) {
        fill(64);
        textSize(26);
        text(user_email, text_box_x, 360, text_box_w);
      }

      textSize(20);
      fill(1,135,136);
      text("Address", text_box_x, 410, text_box_w);
      if (user_location !== undefined) {
        fill(64);
        textSize(26);
        text(user_location, text_box_x, 440, text_box_w);
      }

      textStyle(BOLD);
      textFont('Courier New');
      textSize(22);
      text("↻", 240, 560);
      textSize(16);
      text("Press ENTER to review another one", 90, 585);
      break;

    default:
      break;
  }

}

async function apiRequest() {
  let request = await fetch("https://randomuser.me/api/");
  //console.log(request);
  let data = await request.json();
  //console.log(data);
  let user = data.results[0];
  //console.log(user);
  user_first_name = user.name.first;
  user_last_name = user.name.last;
  user_title = user.name.title;
  user_phone = user.phone;
  user_email = user.email;
  user_location = user.location.city + ", " + user.location.state + ", " + user.location.country + ", " + user.location.postcode;
}
