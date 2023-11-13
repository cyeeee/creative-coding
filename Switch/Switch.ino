/*
Switch
Author: Chenyi Wang
Date: 11/11/2023

Prompt: Build a circuit with a switch you make on your own that can be operated without using your hands

The circuit uses a light-sensitive switch which is implemented by a photocell.
When the ambient light decreases to a certain brightness, the LED turns on with a fading effect.
When the ambient light increases to a certain brightness, the LED turns off with a fading effect.
*/

/* pins */
const int LED = 9;                // the PWM pin that LED is attached to
const int SWITCH = A1;            // input pin for photocell

/* photocell variables */
const int initValue = 1000;       // initial value of sensor (bright illumination)
int currValue = 0;   // current measured value

/* led variables */
int brightness = 0;  // how bright the LED is
int fadeAmount = 1;  // how many points to fade the LED by

void setup() {
  // declare pin A1 to be an input
  pinMode(SWITCH, INPUT);
  // declare pin 9 to be an output
  pinMode(LED, OUTPUT);
}

void loop() {
  // read current value of the photocell
  currValue = analogRead(SWITCH);
  // set the brightnes of pin 9
  analogWrite(LED, brightness);

  // two if statements for Schmitt Trigger
  if (currValue < initValue / 3 && brightness < 255) {
    brightness += fadeAmount; // fade in the led
  }
  else if (currValue > initValue / 2 && brightness > 0) {
    brightness -= fadeAmount; // fade out the led
  }
  // wait for 30 milliseconds to see the dimming effect
  delay(30);
}
