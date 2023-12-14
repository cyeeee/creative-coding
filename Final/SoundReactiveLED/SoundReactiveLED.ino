/*
Final
Author: Chenyi Wang
Date: 12/14/22

Sound Reactive Installation

LED Panel Library: https://fastled.io/

*/

#include "FastLED.h"

FASTLED_USING_NAMESPACE

#define DATA_PIN    6
#define LED_TYPE    WS2811
#define COLOR_ORDER GRB
#define NUM_LEDS    64
#define WIDTH       8
CRGB leds[NUM_LEDS];

#define BRIGHTNESS         30
bool rows[WIDTH] = {false};

const int SoundSensor = A0;
int soundValue = 0; 
int reversedValue = 0;

void setup() {
  delay(3000); // 3 second delay for recovery
  
  // tell FastLED about the LED strip configuration
  FastLED.addLeds<LED_TYPE,DATA_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);

  // set master brightness control
  FastLED.setBrightness(BRIGHTNESS);

  pinMode(SoundSensor, INPUT);

  Serial.begin(9600);
}

void loop() {
  
  soundValue = analogRead(SoundSensor); // 0-1023: when the soundsensor is HIGH (no sound detected), the vaule is 1023

  setRows();

  for (int i = 0; i < WIDTH; i++) {
    if (rows[i]) {
      for( int j = 0; j < WIDTH; j++) { 
        leds[j+8*i] = CRGB::OrangeRed;
      }
    }
    else {
      for( int j = 0; j < WIDTH; j++) { 
        leds[j+8*i] = CRGB::Black;
      }
    }
  }
  FastLED.show();
  
}

void setRows() {
  // by testing, when it's lound, sound value is around 70
  // when it's quiet, sound value is 1023
  // since there are 8 rows, interval would be approximately 130

  if (soundValue < 1023 && soundValue >= 870) {
    rows[0] = true;
    rows[1] = false;
    rows[2] = false;
    rows[3] = false;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 870 && soundValue >= 740) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = false;
    rows[3] = false;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 740 && soundValue >= 610) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = false;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 610 && soundValue >= 480) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 480 && soundValue >= 350) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = true;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 350 && soundValue >= 220) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = true;
    rows[5] = true;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 220 && soundValue >= 90) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = true;
    rows[5] = true;
    rows[6] = true;
    rows[7] = false;
  }
  else if (soundValue < 90) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = true;
    rows[5] = true;
    rows[6] = true;
    rows[7] = true;
  }
  
}
