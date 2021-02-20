"use strict";

//Source for main structure: Pippin Barr
// BasicImage
//
// A class that represents a simple image

class BasicImage {
  // constructor
  //
  // Sets the initial values for the image properties
  constructor(x, y, width, height, picture, speed) {
    // Position
    this.x = x;
    this.y = y;
    //width, heigth
    this.width = width;
    this.height = height;
    // Display properties
    this.picture = picture;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
  }

  // display
  //draw the image
  display() {
    push();
    imageMode(CENTER);
    image(this.picture, this.x, this.y, this.width, this.height);
    pop();
  }
}
