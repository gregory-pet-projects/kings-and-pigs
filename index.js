// This code initializes a canvas and its context, sets its width and height based on a 16:9 aspect ratio, defines variables to hold level data and player information, and defines functions for drawing collision blocks, doors, and animations.

const canvas = document.querySelector("canvas"); // Selects a canvas element from the HTML document
const c = canvas.getContext("2d"); // Gets the 2D rendering context for the canvas

canvas.width = 64 * 16; // Sets the width of the canvas to 1024 pixels
canvas.height = 64 * 9; // Sets the height of the canvas to 576 pixels to maintain a 16:9 aspect ratio

let parsedCollisions; // A variable to hold collision data
let collisionBlocks; // A variable to hold collision block objects
let background; // A variable to hold a background object
let doors; // A variable to hold door objects

const player = new Player({
  // Creates a new player object
  imageSrc: "./img/king/idle.png", // Sets the player's initial image
  frameRate: 11, // Sets the player's initial frame rate
  animations: {
    // Defines the player's animation states and their properties
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/king/enterDoor.png",
      onComplete: resetLevelData, // A function to call when the enterDoor animation is complete
    },
  },
});

let level = 1; // A variable to hold the current level
let levels = {
  // An object that defines the available levels and their initialization functions
  1: {
    init: initLevel1,
  },
  2: {
    init: initLevel2,
  },
  3: {
    init: initLevel3,
  },
};

function drawCollisionBlocks() {
  // A function to draw collision blocks
  collisionBlocks.forEach((collisionBlocks) => {
    // Loops through each collision block object and calls its draw function
    collisionBlocks.draw();
  });
}

function drawDoor() {
  // A function to draw doors
  doors.forEach((door) => {
    // Loops through each door object and calls its draw function
    door.draw();
  });
}

const overlay = {
  // An object to hold overlay properties
  opacity: 0, // Sets the initial opacity to 0
};

function fadeLevelOnEnterDoor() {
  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

function animate() {
  // The main animation loop
  window.requestAnimationFrame(animate); // Requests the next animation frame

  background.draw(); // Draws the background image

  //drawCollisionBlocks();
  drawDoor(); // Draws the doors

  player.handleInput(keys); // Handles player input
  player.draw(); // Draws the player
  player.update(); // Updates the player's animation state and position

  fadeLevelOnEnterDoor();
}

//=== START HERE ===
levels[level].init();
animate();
