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
int brightness = 0;
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

  //litByBrightness();
  
  litByRows();
  
}

void litByBrightness() {
  reversedValue = 1023 - soundValue; 

  brightness = reversedValue / 30;

  FastLED.setBrightness(brightness);

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::DarkCyan;
  }
  FastLED.show();
}

void litByRows() {
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
  // during testing, the smallest value reached when it's lound is around 75
  // when it's quiet, sound value is 1023

  if (soundValue < 1023 && soundValue >= 1000) {
    rows[0] = false;
    rows[1] = false;
    rows[2] = false;
    rows[3] = false;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 1000 && soundValue >= 750) {
    rows[0] = true;
    rows[1] = false;
    rows[2] = false;
    rows[3] = false;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 750 && soundValue >= 500) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = false;
    rows[3] = false;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 500 && soundValue >= 300) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = false;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 300 && soundValue >= 100) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = false;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 100 && soundValue >= 80) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = true;
    rows[5] = false;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 80 && soundValue >= 75) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = true;
    rows[5] = true;
    rows[6] = false;
    rows[7] = false;
  }
  else if (soundValue < 75 && soundValue >= 74) {
    rows[0] = true;
    rows[1] = true;
    rows[2] = true;
    rows[3] = true;
    rows[4] = true;
    rows[5] = true;
    rows[6] = true;
    rows[7] = false;
  }
  else if (soundValue < 74) {
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
