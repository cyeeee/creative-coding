/*
Week 5 - Data
Author: Chenyi Wang
Date: 10/14/2023

Instruction:
Create a sketch that calls an API, processes the data, and visualizes it somehow.

This sketch fetches data from a number API and displays a random fact of today's date

There's a welcome page that prompts users about what this sketch does, and they can switch the page by pressing the key

Users are able to keep fetching new facts as long as they want
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
    fill(0, this.ocapity);
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
function keyPressed() {
  keyArray[keyCode] = 1;
}

function keyReleased() {
  keyArray[keyCode] = 0;
}

function checkKeyPress() {
  if (interface === 1 && ready_switch && keyArray[32] === 1) {
    interface = 2;
    ready_switch = false;
  }

  if (interface === 3 && ready_update && keyArray[13] === 1) {
    apiRequest();
    ready_update = false;
  }
}

var text_box_x = 100;
var text_box_y = 100;
var greeting;
var showDate;
var dateStr;
var dateFact;
var generate;
var fact;
var cue;
var interface;
var ready_switch;
var ready_update;

function setup() {
  createCanvas(600, 600);

  apiRequest();
  generate = false;

  greeting = new TextObj(text_box_x, text_box_y, "Hello");

  dateStr = "Today is " + month() + "/" + day();
  showDate = new TextObj(text_box_x, text_box_y+70, dateStr);

  cue = new TextObj(text_box_x, text_box_y+140, "Let's learn about this day in history");

  interface = 1;
  ready_switch = false;
  ready_update = false;
}

function draw() {
  background(220);

  checkKeyPress();

  switch(interface) {
    case 1:
      greeting.display();
      greeting.fadeIn();

      if (greeting.set) {
        showDate.display();
        showDate.fadeIn();
      }

      if (showDate.set) {
        cue.display();
        cue.fadeIn();
      }

      if (cue.ocapity >= 255) {
        ready_switch = true;
        textStyle(BOLD);
        textFont('Courier New');
        textSize(22);
        text("⇾", 290, 550);
        textSize(16);
        text("Press SPACE to see the fact", 170, 575);
      }
      break;

    case 2:
      greeting.display();
      greeting.shift();
      showDate.display();
      showDate.shift();
      cue.display();
      cue.shift();
      if (cue.out) {
        interface = 3;
      }
      break;

    case 3:
      if (dateFact !== undefined) {
        fact.display();
        fact.fadeIn();
      }

      if (fact.set) {
        ready_update = true;
        textStyle(BOLD);
        textFont('Courier New');
        textSize(22);
        text("↻", 290, 550);
        textSize(16);
        text("Press ENTER to see another fact", 150, 575);
      }
      break;

    default:
      break;
  }

}

async function apiRequest() {
  // API: http://numbersapi.com/
  // Include the query parameter 'json' to return the metadata as a JSON object
  let link = "http://numbersapi.com/" + month() + "/" + day() + "/date?json";
  let request = await fetch(link);
  //console.log(request);
  let data = await request.json();
  //console.log(data);
  dateFact = data.text;
  //console.log(dateFact);
  fact = new TextObj(100, 100, dateFact);
}
