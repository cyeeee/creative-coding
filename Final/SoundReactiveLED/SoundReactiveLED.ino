/*
Final
Author: Chenyi Wang
Date: 12/14/22

Sound Reactive Installation

LED Panel Tutorial: https://www.instructables.com/Getting-Started-With-NeoPixle-WS2812-RGB-LED/
LED Panel Library: https://fastled.io/

*/

#include "FastLED.h"

FASTLED_USING_NAMESPACE

#define DATA_PIN    6
#define LED_TYPE    WS2811
#define COLOR_ORDER GRB
#define NUM_LEDS    64
CRGB leds[NUM_LEDS];

// #define BRIGHTNESS         30
int brightness = 0;

const int SoundSensor = A0;
int soundValue = 0; 
int reversedValue = 0;

void setup() {
  delay(3000); // 3 second delay for recovery
  
  // tell FastLED about the LED strip configuration
  FastLED.addLeds<LED_TYPE,DATA_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);

  // set master brightness control
  // FastLED.setBrightness(BRIGHTNESS);

  pinMode(SoundSensor, INPUT);

  Serial.begin(9600);
}

void loop() {
  
  soundValue = analogRead(SoundSensor); // 0-1023
  reversedValue = 1023 - soundValue;    // when the soundsensor is HIGH (no sound detected), the vaule is 1023

  brightness = reversedValue / 30;

  FastLED.setBrightness(brightness);

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::OrangeRed;
  }
  FastLED.show();
  
}
