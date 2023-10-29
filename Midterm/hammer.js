/*
This file contains the settings for the hammer object
*/

class hammerObj {
    constructor(x, y) {
      this.pos = new p5.Vector(x, y);
      this.size = 80;
      this.hit = 0;
    }
  
    display() {
      imageMode(CENTER);
      image(hammerImg, this.pos.x, this.pos.y, this.size, this.size);
    }
  
    move() {
      checkKeyPress();
      debouncing();
  
      switch(WASD) {
        case 'W':
          // let the hammer located above the corresponding hole
          this.pos = new p5.Vector(holesPos[0].x+20, holesPos[0].y-60);
          // if the mole is not currently appearing, reset the hammer status
          if (holes[0].mole === 0) {
            this.hit = 0;
          }
          break;
        case 'A':
          this.pos = new p5.Vector(holesPos[1].x+20, holesPos[1].y-60);
          if (holes[1].mole === 0) {
            this.hit = 0;
          }
          break;
        case 'S':
          this.pos = new p5.Vector(holesPos[2].x+20, holesPos[2].y-60);
          if (holes[2].mole === 0) {
            this.hit = 0;
          }
          break;
        case 'D':
          this.pos = new p5.Vector(holesPos[3].x+20, holesPos[3].y-60);
          if (holes[3].mole === 0) {
            this.hit = 0;
          }
          break;
        default:
          break;
      }
    }
  }
  