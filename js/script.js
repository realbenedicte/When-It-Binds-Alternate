"use strict";

//Audio/Visual Collage
//
//By Maxime Gordon
//
//Instructions:
//Move mouse, drag mouse, click mouse
//
//Main structure source: Pippin Barr
//
//Uses libraries: p5.js, Tone.js

//Global variables:
//

//waterVideo
let waterVideo;

//video from file
let vid1;

//Images
let waterImage;
let image1;
let flowerSnip01;
let flowerSnip01Img;
let rock;
let rock1Img;
let waterOval;
let waterOvalImg;
let background01;
let background01Img;
let background02;
let background02Img;

//Scenes
let currentScene; // To store the current scene;
let titleScene;
let scene2;

//Sounds
let arp;
let pattern;

//Sound Effects
let delayTimeVariableA;
let pingPong;
let reverb;
let panVol;

//fonts
let monarchFont;

//checking if mouse moving
let mouseMoving = 0;
let isMoving = false;

//Text
let questionMark1;
let questionMark2;
let explanation;

//coverart
let coverArt;
let player;
let soundFall;
//sounds

//Preload
//Loading up images, videos and fonts
function preload() {
  image1 = loadImage("assets/images/waterImage.png");
  flowerSnip01Img = loadImage("assets/images/flowerSnip01.png")
  rock1Img = loadImage("assets/images/1080/4wispsright.png")
  waterOvalImg = loadImage("assets/images/1080/3stars.png")
  background01Img = loadImage("assets/images/1080/1creature.png");
  background02Img = loadImage("assets/images/1080/2wispsleft.png");
  monarchFont = loadFont('assets/fonts/Monarch.ttf');
  coverArt =loadImage("assets/images/1080/WIB-1080.png");
  soundFall = loadSound("assets/sounds/FallOnMeHarp.wav");
}

// setup()
//
// Sets up a canvas
function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  // //creating the video image, for water video
  // vid1 = createVideo("assets/videos/water.mp4");
  // //hide the video for dom reasons
  // vid1.hide();

  // //creating videos:
  // waterVideo = new BasicVideo(0, 0, 375 * .7, 667 * .7, vid1);

  //creating images:
  waterImage = new BasicImage(windowWidth / 2, windowHeight / 2, 375, 667, image1, 0);
  flowerSnip01 = new BasicImage(-windowWidth / 2, 0, 607 * .4, 240 * .4, flowerSnip01Img, 3);
  waterOval = new BasicImage(0, 0, 1148 * .5, 2000 * .5, waterOvalImg, 0);
  rock = new BasicImage(700, 0, 551 * .7, 534 * .7, rock1Img, 0);
  background01 = new BasicImage(0, 0, windowWidth * 2, windowHeight * 2, background01Img, 0);
  background02 = new BasicImage(0, 0, windowWidth, windowHeight, background02Img, 0);

  //Creating scenes
  // titleScene = new TitleScene();
  scene2 = new Scene2();


  //Creating Text
  questionMark1 = new BasicText((-windowWidth / 2) + 50, (-windowHeight / 2) + 150, '¿');
  questionMark2 = new BasicText((-windowWidth / 2) + 50, (-windowHeight / 2) + 100, '?');
  explanation = new BasicText((-windowWidth / 2) + 200, (-windowHeight / 2) + 100, 'click, drag, move');


  // player = new Tone.Player().toDestination();
// play as soon as the buffer is loaded
  // player.autostart = true;

//  arpegiattor that plays its pattern with mouse movement
  arp = new Tone.Synth({
    "oscillator": {
      "type": "square4",
      "harmonicity": 0.5,
      "modulationType": "sawtooth",
      // "partials":[0.2,1,0,0.5,0.1],
      "spread": 50,
      "count": 3
    },
    "envelope": {
      "attackCurve": "linear",
      "attack": 0.05,
      "decay": 0.2,
      "sustain": 0.2,
      "release": 1.5,
    },
    "portamento": 0
  });

  //pattern for the arpegiattor
  pattern = new Tone.Pattern(function(time, note) {
    arp.triggerAttackRelease(note, 0.25);
    //Arp notes to play:

  }, ["F2", "C3", "A3", "C3", "G2",
    "D3", "G3", "D3", "A2", "E3",
    "C4", "E3", "C4", "B3", "C4", "B3",
    "A3",
    "F2","C3","A3","C3","G2","D3","G3","D3","A2","E3","D3","C3", "E3", "C3", "A2"

  ]);

  //Controlling volume
  panVol = new Tone.PanVol(0, -2);

  //Setting up sound effects
  pingPong = new Tone.PingPongDelay(0.1, 0.2);
  reverb = new Tone.Reverb();
  reverb.decay = 5;
  arp.disconnect();
  reverb.generate();
  reverb.wet.value = 0.6;
  pingPong.wet.value = 0.4;
  //arpeggiator chain --> gets routed thru ping pong delay, reverb, volume, and then sent to master volume
  // arp.chain(pingPong, reverb, panVol, Tone.Master);
  //Start off our scene on the title scene
  currentScene = scene2;
}

// windowResized()
//
//resize window!!!
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// draw()
function draw() {
  currentScene.draw();
  //updating sound variable
  updateVariable();
}

//clicking lets us change states
function mousePressed() {
  currentScene.mousePressed();
  //start the buffer
Tone.Transport.start();
}

//Update variable that change with mouse interaction
function updateVariable() {
  //ramping the pingpong delay, so smoothly transitions between values over 0.05s
  //the values of the delaytime change based on mousex values
  pingPong.delayTime.rampTo(map((mouseX - windowWidth / 2), -windowWidth / 2, windowWidth / 2, 0.05, 2), 0.2);
}

function mouseMoved() {
  currentScene.mouseMoved();
}

function mouseReleased() {
  currentScene.mouseReleased();
}

function mouseDragged() {
  currentScene.mouseDragged();
}
