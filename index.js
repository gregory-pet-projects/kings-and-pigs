const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; //1024
canvas.height = 64 * 9; //576  ratio

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

const player = new Player({
  imageSrc: "./img/king/idle.png",
  frameRate: 11,
  animations: {
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
      onComplete: resetLevelData,
    },
  },
});
let level = 1;
let levels = {
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
  collisionBlocks.forEach((collisionBlocks) => {
    collisionBlocks.draw();
  });
}

function drawDoor() {
  doors.forEach((door) => {
    door.draw();
  });
}

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();

  //drawCollisionBlocks();

  drawDoor();

  player.handleInput(keys);

  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();

animate();
