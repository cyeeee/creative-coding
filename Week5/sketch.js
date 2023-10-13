/*
Week 5 - Data
Author: Chenyi Wang
Date: 10/13/2023

Instruction:
Create a sketch that calls an API, processes the data, and visualizes it somehow.

This sketch fetches data from a number API and displays a random fact of today's date
*/
class TextObj {
  // display the text, fade in
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.ocapity = 0;
    this.content = c;
    this.size = 28;
  }

  display() {
    this.fadeIn();
    fill(0, this.ocapity);
    textSize(this.size);
    //TODO: text font
    textWrap(WORD);
    text(this.content, this.x, this.y,400);  //TODO: text box width
  }

  fadeIn() {
    if (this.ocapity < 255) {
      this.ocapity += 2;
    }
  }
}

var greeting;
var greeting1;
var dateStr;
var dateFact;
var fact;
var cue;

function setup() {
  createCanvas(600, 600);

  apiRequest();

  greeting = new TextObj(100, 100, "Hello");

  dateStr = "Today is " + month() + "/" + day();
  greeting1 = new TextObj(100, 150, dateStr);

  cue = new TextObj(100, 200, "Let's learn about this day in history");
}

function draw() {
  background(220);

  greeting.display();

  if (greeting.ocapity >= 255) {
    greeting1.display();
  }

  if (greeting1.ocapity >= 255) {
    cue.display();
  }

  if (dateFact !== undefined) {
    //TODO: display the fact
    if (cue.ocapity >= 255) {
      textWrap(WORD);
      text(dateFact, 100, 300, 400);
    }
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
}
