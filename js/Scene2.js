//Child class of Scene
//This is the Second scene

//References:
//
//Dragging:
//https://codepen.io/shshaw/pen/KggoZX
//
//Lerp:
//https://www.youtube.com/watch?v=8uLVnM36XUc
//
//Easing:
//https://p5js.org/examples/input-easing.html
//
//Moused Stopped:
//https://forum.processing.org/two/discussion/11384/how-to-detect-if-mouse-has-stopped-moving
//
//NOTES:
//The draggable vs. non draggable items could be in a seperate classes like BasicImage and BasicVideo,
//However they load faster this way!

"use strict";

class Scene2 extends Scene {
  constructor() {
    super();

    //this is the center of the screen:
    this.centerX = windowWidth / 2;
    this.centerY = windowHeight / 2;

    //dragging boolean to know if we are dragging
    this.dragging = false;

    //When we start dragging, get time reference
    this.startTime = 0;

    // After done dragging, how do the objects move/decelerate?
    this.decelerating = false;
    this.decelX = 0;
    this.decelY = 0;

    //friction value
    this.friction = 0.95;

    //This is the initial start position of the mouse as soon as we start dragging
    this.startX = 0;
    this.startY = 0;

    //variables to do with rotation
    this.rotation = false;
    this.showExplanation = false;

    //counting how many times you clicked questionMark1
    this.pressCounter = 0;
    this.pressCounter2 = 0;

    // An array for all the objects in this scene
    //These objects will be able to be moved by dragging.
    this.objects = [

      { // background01
        asset: background01,
        x: this.centerX - 200,
        y: this.centerY,
        offsetX: 0,
        offsetY: 0,
        easing: 0.06,
        isDraggable: true // if the object is draggable or not
      },

      { // background02
        asset: background02,
        x: this.centerX - 200,
        y: this.centerY,
        offsetX: 0,
        offsetY: 0,
        easing: 0.06,
        isDraggable: false,
      },

      { // wateroval
        asset: waterOval,
        x: this.centerX + 200,
        y: this.centerY,
        offsetX: 0,
        offsetY: 0,
        easing: 0.03,
        isDraggable: true
      },

      { //rock
        asset: rock,
        x: this.centerX - 110,
        y: this.centerY,
        offsetX: 0,
        offsetY: 0,
        easing: 0.08,
        isDraggable: true
      },
    ];
  }

  draw() {
    //our background color
    background(220);
    //display cover art
    push();
    texture(coverArt);
     translate(0, 0, 0);
    noStroke();
    plane(400, 400)
    pop();

    //we want the menu items to be on top so they are out of this push/pop pair
    push();
    if (this.rotation == true) {
      this.masterRotate();
    }
    //need to call this.mouseStopped so that the sound stops playing when you aren't moving mouse:
    this.mouseStopped();
  
        // //central water video:
    // waterVideo.displayMoving();

    //Function that calculates deceleration of draggable obects:
    this.decelerationMath();

    //display all the objects:
    this.masterObjectDisplay();
    pop();


    //display menu items!
    questionMark1.display();
    questionMark2.display();

    //display instructions
    if (this.showExplanation == true) {
      explanation.display();
    }
  }

  //A function that deals with displaying our objects and getting some positions,
  //needs to be called in our draw loop
  masterObjectDisplay() {
    //loop over objects and display them
    //display is defined in our BasicImage class
    for (let i = 0; i < this.objects.length; i++) {
      let obj = this.objects[i];
      push();
      //they move based on translation
      //their x and y values constantly change if they are being dragged (see mouse dragged)
      //they move in relation to the origin (centerX and centerY)
      translate(obj.x - this.centerX, obj.y - this.centerY)
      //If the object is decelerating (and draggable) do the following:
      //lerping between obj.x and obj.x + this.decelX, by this much: obj.easing * 6
      //This prevents jumping between values, now it will slowly reach the target defined in our deceleration
      if (this.decelerating && obj.isDraggable) {
        obj.x = lerp(obj.x, obj.x + this.decelX, obj.easing * 7);
        obj.y = lerp(obj.y, obj.y + this.decelY, obj.easing * 7);
      }
      //loop over objects and display them
      //display is defined in our BasicImage class
      if (!obj.isDraggable) {
        //Updating position of the object in respect to easing
        let targetX = mouseX - obj.offsetX;
        //the change in x, is the targetX minus the position of the object
        let dx = targetX - obj.x;
        obj.x += dx * obj.easing;

        let targetY = mouseY - obj.offsetY;
        let dy = targetY - obj.y;
        obj.y += dy * obj.easing;
      }
      //display all of our objects!
      obj.asset.display();
      pop();
    }
  }

  mousePressed() {
    this.decelerating = false; // can only decelerate if mouse has been released
    this.decelX = 0; // decel values must be zero.
    this.decelY = 0;
    // loop over objects and update offsets on mouse press
    for (let i = 0; i < this.objects.length; i++) {
      let obj = this.objects[i];
      if (obj.isDraggable) { //this only applies to the object if it is draggable!
        //the distance of the object from mouseX/Y
        obj.offsetX = mouseX - obj.x;
        obj.offsetY = mouseY - obj.y;
        let d = dist(mouseX, mouseY, waterImage.x, waterImage.y);
        //distance between the mouse and the edge of the video
        if (d < (waterImage.width - waterImage.width / 2)) {
          waterVideo.playVideo();
        }
      }
    }
    //Checking if the masterRotate button was clicked (aka questionmark1)!
    let d = dist((-windowWidth / 2) + mouseX, (-windowHeight / 2) + mouseY, questionMark1.x, questionMark1.y);
    //distance between the mouse and the question mark
    if (d <= 20) {
      this.rotation = true;
      this.pressCounter = this.pressCounter + 1;
    }
    //counting how many times you clicked questionMark1
    if (this.pressCounter == 2) {
      this.rotation = false;
      //reset counter
      this.pressCounter = 0;
    }
    //pressing questionmark2
    let distance = dist((-windowWidth / 2) + mouseX, (-windowHeight / 2) + mouseY, questionMark2.x, questionMark2.y);
    //distance between the mouse and the question mark
    if (distance <= 20) {
      this.showExplanation = true;
      this.pressCounter2 = this.pressCounter2 + 1;
    }
    //counting how many times you clicked questionMark2
    if (this.pressCounter2 == 2) {
      this.showExplanation = false;
      //reset counter
      this.pressCounter2 = 0;
    }
  }

  //mousedragging
  //When the mouse is dragged we want our objects to move,
  //in respect to their individual easing values,
  //these values allow for a parallaxing effect
  mouseDragged() {
    if (!this.dragging) {
      this.dragging = true;
      this.decelerating = false;
      this.startTime = millis();
      this.startX = mouseX;
      this.startY = mouseY;
    }
    // loop over objects and update obj positions
    for (let i = 0; i < this.objects.length; i++) {
      let obj = this.objects[i];
      if (obj.isDraggable) { //this only applies to the object if it is draggable!
        //Updating position of the object in respect to easing
        let targetX = mouseX - obj.offsetX;
        //the change in x, is the targetX minus the position of the object
        let dx = targetX - obj.x;
        obj.x += dx * obj.easing;

        let targetY = mouseY - obj.offsetY;
        let dy = targetY - obj.y;
        obj.y += dy * obj.easing;
        //  check if the object is out of bounds
        this.checkBounds(obj)
      }
    }
  }

  //After mouse released the deceleration needs to happen
  mouseReleased() {
    if (this.dragging) {
      //after its done dragging we calculate the dif in the starting mousex vs. current mousex,
      //in relation to time
      let offsetX = mouseX - this.startX;
      let offsetY = mouseY - this.startY;
      let timeOffset = (millis() - this.startTime) / 24;
      this.decelX = offsetX / timeOffset;
      this.decelY = offsetY / timeOffset;
      this.decelerating = true;
      this.dragging = false;
    }
  }

  //Function that calculates deceleration
  decelerationMath() {
    //If you have dragged and released the mouse do the following:
    //decelerating
    if (this.decelerating) {
      //decelX and decelY get smaller and smaller, approaching zero,
      //everytime they are multiplied by our friction value that we defined above
      this.decelX = this.decelX * this.friction;
      this.decelY = this.decelY * this.friction;

      //Math.abs -> if value is negative it makes it positive
      if (Math.abs(this.decelX) < 0.01) { //force the value to be zero if it's less than 0.01
        this.decelX = 0;
      }
      if (Math.abs(this.decelY) < 0.01) {
        this.decelY = 0;
      }
      //if decelX&Y are both zero it means it's stopped decelerating
      //and objects are at rest:
      if (this.decelX === 0 && this.decelY === 0) {
        this.decelerating = false;
      }
    }
  }

  //handleWrapping for the draggable objects
  checkBounds(obj) {
    if (obj.x > windowWidth + 960) {
      obj.x = -100;
      obj.offsetX = mouseX - obj.x;
    }

    if (obj.x < -200) {
      obj.x = windowWidth + 960;
      obj.offsetX = mouseX - obj.x;
    }

    if (obj.y > windowHeight + 540) {
      obj.y = -100;
      obj.offsetY = mouseY - obj.y;
    }

    if (obj.y < -200) {
      obj.y = windowHeight + 540;
      obj.offsetY = mouseY - obj.y;
    }
  }

  //Functions to do with the sound generation!
  //note isMoving and many other variables in here are defined in script.js as global variables
  //start playing the song!
  mouseMoved() {
    isMoving = true;
    //start a counter because we only want to retrigger the audio clip if the mouse has started and stopped
    mouseMoving = mouseMoving + 1;
    if (mouseMoving === 1) {
      pattern.start();
    }
  }

  //stop the song from playing!
  mouseStopped() {
    if (mouseX == pmouseX && mouseY == pmouseY) {
      isMoving = false
      pattern.stop();
      //reset counter!
      mouseMoving = 0;
    }
  }
}
