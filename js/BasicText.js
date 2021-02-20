"use strict";

//Source for main structure: Pippin Barr
// BasicText
//
// A class that represents a simple text object

class BasicText {
  // constructor
  //
  // Sets the initial values for the video properties
  constructor(x, y, text) {
    // Position
    this.x = x;
    this.y = y;
    this.text = text;
  }

  display() {
    push();
    fill(128 + sin(frameCount * 0.1) * 128);
    textFont(monarchFont);
    textAlign(CENTER);
    textSize(30);
    text(this.text, this.x, this.y);
    pop();
  }
}
