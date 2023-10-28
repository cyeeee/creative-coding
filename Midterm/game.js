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
    }
  
    display() {
      switch (this.interface) {
        case 0: 
        {
          this.timer.pause();
          fill(0);
          textStyle(BOLD);
          textAlign(CENTER);
          textFont('Courier New', 40);
          text("Whack A Mole", 300, 300);
          textFont('Courier New', 25);
          text("Click to start", 300, 350);
        }
          break;
        
        case 1:
        {
          hammer.display();
          hammer.move();
  
          if (frameCount % 120 === 0) { // generate a new number every 2 sec
            this.curr_mole = Math.round(random(0, 3));
            while (this.curr_mole === this.prev_mole && holes[this.prev_mole].mole === 1) {
              this.curr_mole = Math.round(random(0, 3));
            }
            this.prev_mole = this.curr_mole;
          }
          for (let i = 0; i < holes.length; i++) {
            if (i === this.curr_mole && holes[i].mole === 0) {
              holes[i].mole = 1;
              holes[i].currFrame = frameCount;
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
        {
          fill(0);
          textStyle(BOLD);
          textAlign(CENTER);
          textFont('Courier New', 40);
          text("GAME OVER", 300, 300);
          textFont('Courier New', 25);
          text("SCORE: " + this.score, 300, 350);
        }
          
          break;
        default:
          break;
      }
    }
  }
  