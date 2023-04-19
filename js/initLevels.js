function initLevel(levelData) {
  parsedCollisions = levelData.collisions.parse2D();

  collisionBlocks = parsedCollisions.createObjectsFrom2D();
  player.collisionBlocks = collisionBlocks;
  player.position.x = levelData.playerPosition.x;
  player.position.y = levelData.playerPosition.y;

  if (player.currentAnimation) {
    player.currentAnimation.isActive = false;
  }
  background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: levelData.backgroundImgSrc,
  });

  doors = [
    new Sprite({
      position: levelData.doorPositions,
      imageSrc: "./img/doorOpen.png",
      frameRate: 5,
      frameBuffer: 5,
      loop: false,
      autoplay: false,
    }),
  ];
}

function initLevel1() {
  initLevel({
    collisions: collisionsLevel1,
    playerPosition: { x: player.position.x, y: player.position.y },
    backgroundImgSrc: "./img/backgroundLevel1.png",
    doorPositions: { x: 767, y: 270 },
  });
}

function initLevel2() {
  initLevel({
    collisions: collisionsLevel2,
    playerPosition: { x: 96, y: 140 },
    backgroundImgSrc: "./img/backgroundLevel2.png",
    doorPositions: { x: 772, y: 336 },
  });
}

function initLevel3() {
  initLevel({
    collisions: collisionsLevel3,
    playerPosition: { x: 750, y: 230 },
    backgroundImgSrc: "./img/backgroundLevel3.png",
    doorPositions: { x: 176, y: 335 },
  });
}

function resetLevelData() {
  gsap.to(overlay, {
    opacity: 1,
    onComplete: () => {
      level++;
      if (level === 4) {
        level = 1;
      }
      levels[level].init();
      player.switchSprite("idleRight");
      player.preventInput = false;
      gsap.to(overlay, { opacity: 0 });
    },
  });
}
