/*
This file contains the settings for the hole (and mole) object
*/

class holeObj {
    // This class is for both holes and moles 
    constructor(pos) {
      this.pos = pos;
      this.size = 120;
      this.mole = 0;
      this.hit = 0;
      this.scored = 0;
      this.currFrame = frameCount;
    }
  
    display() {
      fill(0);
      imageMode(CENTER);
      image(holeImg, this.pos.x, this.pos.y, this.size, this.size);
      if (this.mole === 1) { 
        if (hammer.pos.x === this.pos.x+20 && hammer.pos.y === this.pos.y-60 || this.hit === 1) {
          this.hit = 1;
          image(moleHitImg, this.pos.x, this.pos.y, this.size, this.size);
          if (this.scored === 0) {
            game.score++;
            this.scored = 1;
          }
        }
        else {
          image(moleImg, this.pos.x, this.pos.y, this.size, this.size);
        }
      }
      if ((frameCount - this.currFrame) > 30) {  // let moles stays for 30 frames
        this.mole = 0;
        this.hit = 0;
        this.scored = 0;
      }
    }
  }
  