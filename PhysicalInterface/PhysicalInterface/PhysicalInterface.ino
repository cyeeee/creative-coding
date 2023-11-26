/*
Physical Interface
Author: Chenyi Wang
Date: 11/26/2023

Prompt: Build a sketch with a physical interface - take one of your early p5 sketches and make it controllable with digital or analog inputs using serial.

Iteration on tic-tac-toe game - switch the game board to a p5 sketch interface while keeping the player controls physical
*/

/* pins */
const int DIAL = A0;            // input pin for potentiometer
const int BTN_1 = 2;            // input pin for pushbutton 1
const int BTN_2 = 4;            // input pin for pushbutton 2

/* potentiometer values */
int dialCurrValue = 0;
int dialMaxValue = 1023;

/* button */
enum btn_states {
  BTN_PRESSED,
  PRESSED_TO_RELEASED,
  BTN_RELEASED,
  RELEASED_TO_PRESSED
};
btn_states button = BTN_RELEASED;
int buttonState = 0;

void setup() {
  // declare pins
  pinMode(DIAL, INPUT);
  pinMode(BTN_1, INPUT);
  pinMode(BTN_2, INPUT);

  Serial.begin(9600);
}

void loop() {
  
  dialCurrValue = analogRead(DIAL);

  if (dialCurrValue <= dialMaxValue/9) {
    Serial.println("potentiometer");
    Serial.println(0);  // box index 0 selected
  }
  else if (dialCurrValue > dialMaxValue/9 && dialCurrValue <= dialMaxValue/9*2) {
    Serial.println("potentiometer");
    Serial.println(1);  // box index 1 selected
  }
  else if (dialCurrValue > dialMaxValue/9*2 && dialCurrValue <= dialMaxValue/9*3) {
    Serial.println("potentiometer");
    Serial.println(2);  // box index 2 selected
  }
  else if (dialCurrValue > dialMaxValue/9*3 && dialCurrValue <= dialMaxValue/9*4) {
    Serial.println("potentiometer");
    Serial.println(3);  // box index 3 selected
  }
  else if (dialCurrValue > dialMaxValue/9*4 && dialCurrValue <= dialMaxValue/9*5) {
    Serial.println("potentiometer");
    Serial.println(4);  // box index 4 selected
  }
  else if (dialCurrValue > dialMaxValue/9*5 && dialCurrValue <= dialMaxValue/9*6) {
    Serial.println("potentiometer");
    Serial.println(5);  // box index 5 selected
  }
  else if (dialCurrValue > dialMaxValue/9*6 && dialCurrValue <= dialMaxValue/9*7) {
    Serial.println("potentiometer");
    Serial.println(6);  // box index 6 selected
  }
  else if (dialCurrValue > dialMaxValue/9*7 && dialCurrValue <= dialMaxValue/9*8) {
    Serial.println("potentiometer");
    Serial.println(7);  // box index 7 selected
  }
  else if (dialCurrValue > dialMaxValue/9*8) {
    Serial.println("potentiometer");
    Serial.println(8);  // box index 8 selected
  }

  pushbutton(BTN_1);
  pushbutton(BTN_2);
}

void pushbutton(int btn) {
  // read the state of the pushbutton value
  buttonState = digitalRead(btn);

  // determines next state based on the current pushbutton state
  switch (button) {
    // if button is pushed, go to transition state, if not, stay in current state
    case BTN_RELEASED:
      if (buttonState == HIGH) button = RELEASED_TO_PRESSED;
      else button = BTN_RELEASED;
      break;
    // while in transition state, wait for 50 ms for the pushbutton to become steady
    // afterwards, send serial msg, then go to the pressed state
    case RELEASED_TO_PRESSED:
      delay(50);
      button = BTN_PRESSED;
      if (btn == BTN_1) {
        Serial.println("button");
        Serial.println(1);  // button 1 pressed
      }
      else if (btn == BTN_2) { 
        Serial.println("button");
        Serial.println(2);  // button 2 pressed
      }
      break;
    // if button is released, go to transition state, if not, stay in current state
    case BTN_PRESSED:
      if (buttonState == LOW) button = PRESSED_TO_RELEASED;
      else button = BTN_PRESSED;
      break;
    // while in transition state, wait for 50 ms for the pushbutton to become steady, then go to the released state
    case PRESSED_TO_RELEASED:
      delay(50);
      button = BTN_RELEASED;
      break;
  }
}

