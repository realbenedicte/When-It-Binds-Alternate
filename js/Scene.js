///Parent Class for all the scenes!
"use strict";

class Scene {
  constructor() {}

  draw() {
    // This will be defined in child classes for their draw
  }

  mousePressed() {
    // This will be called by the main program when it detects a mouse press
  }

  mouseReleased() {
    // This will be called by the main program when it detects a mouse released
  }

  mouseDragged() {
    // This will be called by the main program when it detects a mouse dragged
  }

  mouseMoved() {
    // This will be called by the main program when it detects a mouse dragged
  }
  // more methods:
  //the flashing 'enter' text as seen in the 'TitleState' scene
  drawTitleClickMeText() {
    push();
    imageMode(CENTER);
    fill(128 + sin(frameCount * 0.1) * 128);
    textFont(monarchFont);
    textAlign(CENTER);
    textSize(30);
    text('enter', 0, 0);
    pop();
  }

  //function for the 3rd scene
  showScene3() {
    //this is all the captured videos
    for (let i = 0; i < capArray.length; i++) {
      capArray[i].display();
    }
    //Water Video, centre screen
    waterVideo.display();
  }

  masterRotate() {
    let time = millis();
    rotateZ(time / 4444);
  }

}
