/*
Multiple Input - Multiple Output
Author: Chenyi Wang
Date: 11/19/2023

Prompt: Using analog inputs and analog or digital outputs, design and make a machine that two or more people can use.

tic-tac-toe game
*/

/* pins */
const int DIAL = A0;            // input pin for potentiometer
const int BTN_1 = 4;            // input pin for pushbutton 1
const int BTN_2 = 2;            // input pin for pushbutton 2
const int LED_1 = 13;
const int LED_2 = 12;
const int LED_3 = 11;
const int LED_4 = 10;
const int LED_5 = 9;
const int LED_6 = 8;
const int LED_7 = 7;
const int LED_8 = 6;
const int LED_9 = 5;

int dialCurrValue = 0;
int dialMaxValue = 1023;

enum led_states {
  IDLE,
  SELECTED,
  ON,
  OFF
};

class LEDObj {
  public:
    int pin;
    led_states state = IDLE;
};

LEDObj* Led_1 = new LEDObj();
LEDObj* Led_2 = new LEDObj();
LEDObj* Led_3 = new LEDObj();
LEDObj* Led_4 = new LEDObj();
LEDObj* Led_5 = new LEDObj();
LEDObj* Led_6 = new LEDObj();
LEDObj* Led_7 = new LEDObj();
LEDObj* Led_8 = new LEDObj();
LEDObj* Led_9 = new LEDObj();

enum btn_states {
  BTN_PRESSED,
  PRESSED_TO_RELEASED,
  BTN_RELEASED,
  RELEASED_TO_PRESSED
};

btn_states button = BTN_RELEASED;
int buttonState = 0;

void setup() {
  Led_1->pin = LED_1;
  Led_2->pin = LED_2;
  Led_3->pin = LED_3;
  Led_4->pin = LED_4;
  Led_5->pin = LED_5;
  Led_6->pin = LED_6;
  Led_7->pin = LED_7;
  Led_8->pin = LED_8;
  Led_9->pin = LED_9;

  // declare pins
  pinMode(DIAL, INPUT);
  pinMode(BTN_1, INPUT);
  pinMode(BTN_2, INPUT);
  pinMode(Led_1->pin, OUTPUT);
  pinMode(Led_2->pin, OUTPUT);
  pinMode(Led_3->pin, OUTPUT);
  pinMode(Led_4->pin, OUTPUT);
  pinMode(Led_5->pin, OUTPUT);
  pinMode(Led_6->pin, OUTPUT);
  pinMode(Led_7->pin, OUTPUT);
  pinMode(Led_8->pin, OUTPUT);
  pinMode(Led_9->pin, OUTPUT);
}

void loop() {
  
  dialCurrValue = analogRead(DIAL);

  // reset selected LEDs to idle
  if (Led_1->state == SELECTED) Led_1->state = IDLE;
  if (Led_2->state == SELECTED) Led_2->state = IDLE;
  if (Led_3->state == SELECTED) Led_3->state = IDLE;
  if (Led_4->state == SELECTED) Led_4->state = IDLE;
  if (Led_5->state == SELECTED) Led_5->state = IDLE;
  if (Led_6->state == SELECTED) Led_6->state = IDLE;
  if (Led_7->state == SELECTED) Led_7->state = IDLE;
  if (Led_8->state == SELECTED) Led_8->state = IDLE;
  if (Led_9->state == SELECTED) Led_9->state = IDLE;

  idleLED();
  
  if (dialCurrValue <= dialMaxValue/9) {
    if (Led_1->state == ON) {
      digitalWrite(Led_1->pin, HIGH);
    }
    else if (Led_1->state == OFF) {
      digitalWrite(Led_1->pin, LOW);
    }
    else {
      selectLED(Led_1);
      Led_1->state = SELECTED;
      pushbutton(BTN_1, Led_1);
      pushbutton(BTN_2, Led_1);
    }
  }
  else if (dialCurrValue > dialMaxValue/9 && dialCurrValue <= dialMaxValue/9*2) {
    if (Led_2->state == ON) {
      digitalWrite(Led_2->pin, HIGH);
    }
    else if (Led_2->state == OFF) {
      digitalWrite(Led_2->pin, LOW);
    }
    else {
      selectLED(Led_2);
      Led_2->state = SELECTED;
      pushbutton(BTN_1, Led_2);
      pushbutton(BTN_2, Led_2);
    }
  }
  else if (dialCurrValue > dialMaxValue/9*2 && dialCurrValue <= dialMaxValue/9*3) {
    if (Led_3->state == ON) {
      digitalWrite(Led_3->pin, HIGH);
    }
    else if (Led_3->state == OFF) {
      digitalWrite(Led_3->pin, LOW);
    }
    else {
      selectLED(Led_3);
      Led_3->state = SELECTED;
      pushbutton(BTN_1, Led_3);
      pushbutton(BTN_2, Led_3);
    }
  }
  else if (dialCurrValue > dialMaxValue/9*3 && dialCurrValue <= dialMaxValue/9*4) {
    if (Led_4->state == ON) {
      digitalWrite(Led_4->pin, HIGH);
    }
    else if (Led_4->state == OFF) {
      digitalWrite(Led_4->pin, LOW);
    }
    else {
      selectLED(Led_4);
      Led_4->state = SELECTED;
      pushbutton(BTN_1, Led_4);
      pushbutton(BTN_2, Led_4);
    }
  }
  else if (dialCurrValue > dialMaxValue/9*4 && dialCurrValue <= dialMaxValue/9*5) {
    if (Led_5->state == ON) {
      digitalWrite(Led_5->pin, HIGH);
    }
    else if (Led_5->state == OFF) {
      digitalWrite(Led_5->pin, LOW);
    }
    else {
      selectLED(Led_5);
      Led_5->state = SELECTED;
      pushbutton(BTN_1, Led_5);
      pushbutton(BTN_2, Led_5);
    }
  }
  else if (dialCurrValue > dialMaxValue/9*5 && dialCurrValue <= dialMaxValue/9*6) {
    if (Led_6->state == ON) {
      digitalWrite(Led_6->pin, HIGH);
    }
    else if (Led_6->state == OFF) {
      digitalWrite(Led_6->pin, LOW);
    }
    else {
      selectLED(Led_6);
      Led_6->state = SELECTED;
      pushbutton(BTN_1, Led_6);
      pushbutton(BTN_2, Led_6);
    }
  }
  else if (dialCurrValue > dialMaxValue/9*6 && dialCurrValue <= dialMaxValue/9*7) {
    if (Led_7->state == ON) {
      digitalWrite(Led_7->pin, HIGH);
    }
    else if (Led_7->state == OFF) {
      digitalWrite(Led_7->pin, LOW);
    }
    else {
      selectLED(Led_7);
      Led_7->state = SELECTED;
      pushbutton(BTN_1, Led_7);
      pushbutton(BTN_2, Led_7);
    }
  }
  else if (dialCurrValue > dialMaxValue/9*7 && dialCurrValue <= dialMaxValue/9*8) {
    if (Led_8->state == ON) {
      digitalWrite(Led_8->pin, HIGH);
    }
    else if (Led_8->state == OFF) {
      digitalWrite(Led_8->pin, LOW);
    }
    else {
      selectLED(Led_8);
      Led_8->state = SELECTED;
      pushbutton(BTN_1, Led_8);
      pushbutton(BTN_2, Led_8);
    }
  }
  else if (dialCurrValue > dialMaxValue/9*8) {
    if (Led_9->state == ON) {
      digitalWrite(Led_9->pin, HIGH);
    }
    else if (Led_9->state == OFF) {
      digitalWrite(Led_9->pin, LOW);
    }
    else {
      selectLED(Led_9);
      Led_9->state = SELECTED;
      pushbutton(BTN_1, Led_9);
      pushbutton(BTN_2, Led_9);
    }
  }

}

void selectLED(LEDObj* led) {
  digitalWrite(led->pin, HIGH);
  delay(300);
  digitalWrite(led->pin, LOW);
  delay(300);
}

void idleLED() {
  blinkLED(1000, Led_1);
  blinkLED(1000, Led_2);
  blinkLED(1000, Led_3);
  blinkLED(1000, Led_4);
  blinkLED(1000, Led_5);
  blinkLED(1000, Led_6);
  blinkLED(1000, Led_7);
  blinkLED(1000, Led_8);
  blinkLED(1000, Led_9);
}

int ledState = LOW;
unsigned long previousMillis = 0;

void blinkLED(int interval, LEDObj* led) {
  if (led->state != IDLE) return;

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    if (ledState == LOW) {
      ledState = HIGH;
    }
    else {
      ledState = LOW;
    }
  }

  digitalWrite(led->pin, ledState);
}

void pushbutton(int btn, LEDObj* led) {
  if (led->state != SELECTED) {
    return;
  }
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
    // afterwards, turn on or off the LED, then go to the pressed state
    case RELEASED_TO_PRESSED:
      delay(50);
      button = BTN_PRESSED;
      if (btn == BTN_2) {   // turn the LED on for button 2
        digitalWrite(led->pin, HIGH);
        led->state = ON;
      }
      else if (btn == BTN_1) {  // turn the LED off for button 1
        digitalWrite(led->pin, LOW);
        led->state = OFF;
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
