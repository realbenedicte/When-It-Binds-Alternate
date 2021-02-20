//Child class of Scene
//This is the first scene

"use strict";

class TitleScene extends Scene {
  constructor() {
    super();
  }

  draw() {
    background(179);
    //draw the enter text, this function is defined in parent class: Scene
    this.drawTitleClickMeText();
  }

  mousePressed() {
    // currentScene and titleScene are global variables defined in the main script
    // and we use them to change the current state of the program
    // so this will switch the state to the instructions
    //if you click on the water image's location you can go to the next scene
    let d = dist(mouseX, mouseY, waterImage.x, waterImage.y);
    //distance between the mouse and the edge of the video
    if (d < (waterImage.width - waterImage.width / 2)) {
      currentScene = scene2;
      //playVideo will be called so the waterVideo  can start to play
      waterVideo.playVideo();
    }
  }
  mouseMoved(){
  }
}
