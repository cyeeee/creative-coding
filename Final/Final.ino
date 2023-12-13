/*
Final
Author: Chenyi Wang
Date: 12/12/22

Sound Reactive Installation

Sound Sensor Tutorial: https://www.youtube.com/watch?v=PYkzJQhFNlA
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

const int SoundSensor = 4;
const int SAMPLE_TIME = 500;
unsigned long millisCurr;
unsigned long millisLast = 0;
unsigned long millisElapsed = 0;
int soundValue = 0;
int sampleBufferValue = 0;

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
  millisCurr = millis();
  millisElapsed = millisCurr - millisLast;

  soundValue = digitalRead(SoundSensor);

  if (soundValue == LOW) {  // there's sound
    sampleBufferValue++;
    // for( int i = 0; i < NUM_LEDS; i++) { 
    //   leds[i] = CRGB::White;
    // }
    // FastLED.show();  
    // delay(50);
  }
  // else {
  //   for( int i = 0; i < NUM_LEDS; i++) { 
  //     leds[i] = CRGB::Black;
  //   }
  //   FastLED.show();  
  //   delay(50);
  // }
  
  if (millisElapsed > SAMPLE_TIME) {
    Serial.println(sampleBufferValue);
    sampleBufferValue = 0;    // reset
    millisLast = millisCurr;  // update time
  }

  brightness = sampleBufferValue / 4;

  FastLED.setBrightness(brightness);

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::White;
  }
  FastLED.show();
  
}
