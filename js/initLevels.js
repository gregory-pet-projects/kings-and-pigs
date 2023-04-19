function initLevel1() {
  parsedCollisions = collisionsLevel1.parse2D();

  collisionBlocks = parsedCollisions.createObjectsFrom2D();
  player.collisionBlocks = collisionBlocks;
  background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./img/backgroundLevel1.png",
  });

  doors = [
    new Sprite({
      position: {
        x: 767,
        y: 270,
      },
      imageSrc: "./img/doorOpen.png",
      frameRate: 5,
      frameBuffer: 5,
      loop: false,
      autoplay: false,
    }),
  ];
}
function initLevel2() {
  parsedCollisions = collisionsLevel2.parse2D();

  collisionBlocks = parsedCollisions.createObjectsFrom2D();
  player.collisionBlocks = collisionBlocks;
  player.position.x = 96;
  player.position.y = 140;
  background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./img/backgroundLevel2.png",
  });

  doors = [
    new Sprite({
      position: {
        x: 772,
        y: 336,
      },
      imageSrc: "./img/doorOpen.png",
      frameRate: 5,
      frameBuffer: 5,
      loop: false,
      autoplay: false,
    }),
  ];
}
