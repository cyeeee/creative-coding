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
          this.timer.pause();
          fill(0);
          textStyle(BOLD);
          textAlign(CENTER);
          textFont('Courier New', 40);
          text("Whack A Mole", 300, 300);
        
          // create buttons using p5.clickable library
          this.playButton.locate(250, 350);
          this.playButton.draw();
          this.playButton.text = "▷\nPLAY";
          this.playButton.textSize = 15;

          this.playButton2.locate(250, 420);
          this.playButton2.draw();
          this.playButton2.text = "TWO-PLAYER\nMODE";
          this.playButton2.textSize = 14;
        }
          break;
        
        case 1:
        {   //game page
          hammer.display();
          hammer.move();
  
          if (this.mode === 1) {
            if (frameCount % 120 === 0) { // generate a new number every 2 sec
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
  
          fill(0);
          textStyle(BOLD);
          textAlign(LEFT);
          textFont('Courier New', 16);
          text("SCORE: " + this.score, 20, 50);
          textAlign(RIGHT);
          textFont('Courier New', 16);
          text(Math.round(this.timer.getRemainingTime()/1000), width-20, 50);
        }
          break;
  
        case 2: 
        {   // game-over page
          fill(0);
          textStyle(BOLD);
          textAlign(CENTER);
          textFont('Courier New', 40);
          text("GAME OVER", 300, 270);
          textFont('Courier New', 25);
          text("SCORE: " + this.score, 300, 320);

          this.rePlayButton.locate(250, 350);
          this.rePlayButton.draw();
          this.rePlayButton.text = "↻\nREPLAY";
          this.rePlayButton.textSize = 15;

          this.homeButton.locate(250, 420);
          this.homeButton.draw();
          this.homeButton.text = "⌂\nHOME";
          this.homeButton.textSize = 15;
        }
          
          break;
        default:
          break;
      }
    }
  }
  