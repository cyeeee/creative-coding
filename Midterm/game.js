/*
This file contains the settings for the entire game flow
*/

class gameObj {
    constructor() {
      this.score = 0;
      this.timer = new Timer(60000);  //initialize the countdown timer with 60 sec
      this.interface = 0;
      this.curr_mole;
      this.prev_mole = 0;
      this.playButton = new Clickable();
      this.rePlayButton = new Clickable();
      this.homeButton = new Clickable();
      this.mode = 1;    // single-player mode by defaule
      this.playButton2 = new Clickable();
    }
  
    display() {
      switch (this.interface) {
        case 0: 
        {   // home page (start page)
          background(110, 60, 0);

          this.timer.pause();
          noStroke();
          fill(255, 255, 220);
          textStyle(BOLD);
          textAlign(CENTER);
          textFont('Courier New', 60);
          text("Whack\nA\nMole", 300, 150);
        
          // create buttons using p5.clickable library
          this.playButton.locate(250, 350);
          this.playButton.draw();
          this.playButton.text = "▷\nPLAY";
          this.playButton.textSize = 15;
          this.playButton.textColor = [80, 30, 0];
          this.playButton.color = [255, 255, 220];
          this.playButton.stroke = [80, 30, 0];

          this.playButton2.locate(250, 420);
          this.playButton2.draw();
          this.playButton2.text = "DUO\nMODE";
          this.playButton2.textSize = 14;
          this.playButton2.textColor = [80, 30, 0];
          this.playButton2.color = [255, 255, 220];
          this.playButton2.stroke = [80, 30, 0];

          textStyle(NORMAL);
          textSize(12);
          text("© 2023 Chenyi Wang", 300, 590);
        }
          break;
        
        case 1:
        {   //game page
          background(255, 255, 200);
          this.displayGameUI();

          hammer.display();
          hammer.move();
  
          if (this.mode === 1) {
            if (frameCount % 60 === 0) { // generate a new number every 1 sec
                this.curr_mole = Math.round(random(0, 3));
                while (this.curr_mole === this.prev_mole && holes[this.prev_mole].mole === 1) {
                  this.curr_mole = Math.round(random(0, 3));
                }
                this.prev_mole = this.curr_mole;
              }
          }
          for (let i = 0; i < holes.length; i++) {
            if (this.mode === 1) {
                if (i === this.curr_mole && holes[i].mole === 0) {
                    holes[i].mole = 1;
                    holes[i].currFrame = frameCount;
                }
            }
            
            holes[i].display();
          }
        }
          break;
  
        case 2: 
        {   // game-over page
          background(110, 60, 0);

          noStroke();
          fill(255, 255, 220);
          textStyle(BOLD);
          textAlign(CENTER);
          textFont('Courier New', 50);
          text("GAME OVER", 300, 270);
          textFont('Courier New', 25);
          text("SCORE: " + this.score, 300, 310);

          this.rePlayButton.locate(250, 350);
          this.rePlayButton.draw();
          this.rePlayButton.text = "↻\nREPLAY";
          this.rePlayButton.textSize = 15;
          this.rePlayButton.textColor = [80, 30, 0];
          this.rePlayButton.color = [255, 255, 220];
          this.rePlayButton.stroke = [80, 30, 0];

          this.homeButton.locate(250, 420);
          this.homeButton.draw();
          this.homeButton.text = "⌂\nHOME";
          this.homeButton.textSize = 15;
          this.homeButton.textColor = [80, 30, 0];
          this.homeButton.color = [255, 255, 220];
          this.homeButton.stroke = [80, 30, 0];

          textStyle(NORMAL);
          textSize(12);
          text("© 2023 Chenyi Wang", 300, 590);
        }
          
          break;
        default:
          break;
      }
    }

    displayGameUI() {
      // basic layout
      noStroke();
      fill(130, 70, 0);
      rect(100, 30, 400, 100);
      stroke(120, 70, 0);
      strokeWeight(12);
      line(180, 0, 180, 30);
      line(420, 0, 420, 30);
      fill(200, 255, 150);
      quad(110, 170, 490, 170, 650, 530, -50, 530);

      noStroke();
      fill(250, 250, 240);
      textStyle(BOLD);
      textAlign(CENTER);
      textFont('Courier New', 20);
      // scoring
      text("SCORE: " + this.score, 300, 110);
      // countdown timer
      let time = Math.round(this.timer.getRemainingTime()/1000);
      if (time < 10) time = "0"+time;
      text("00:" + time, 300, 80);

      // timer progress bar
      noStroke();
      fill(200, 255, 200);
      if (time < 10) fill(255, 150, 150); // change the time bar color when less then 10 sec left
      let timerWidth = map(time, 60, 0, 360, 0);
      rect(120, 40, timerWidth, 10);
      
      // control hint
      fill(120, 70, 0);
      textAlign(CENTER);
      textFont('Courier New', 12);
      text("Use [W, A, S, D] to control the hammer", 300, 570);
      if (this.mode === 2) {  // this is for two-player mode only
        text("Use [↑, ←, ↓, →] to control the moles ", 300, 590);
      }
    }

    reset() {
      this.score = 0;
      this.timer.reset();
      for (let i = 0; i < holes.length; i++) {
        holes[i].mole = 0;
      }
    }
  }
  