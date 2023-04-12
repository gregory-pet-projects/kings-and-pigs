const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; //1024
canvas.height = 64 * 9; //576  ratio

let y = 100;
c.fillRect(100, y, 100, 100);
//let playerHeight = 100;
//let bottom = y + playerHeight;
const player = new Player();

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
function animate() {
  window.requestAnimationFrame(animate);

  //playground
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 1;
  } else if (keys.a.pressed) {
    player.velocity.x = -1;
  }

  player.draw();
  player.update();
}

animate();

function jump() {
  if (player.velocity.y === 0) {
    player.velocity.y = -20;
  }
}

function movePlayerToLeft(keydown = false) {
  keys.a.pressed = keydown;
}
function movePlayerToRight(keydown = false) {
  keys.d.pressed = keydown;
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      jump();
      break;
    case "a":
      movePlayerToLeft(true);
      break;
    case "d":
      movePlayerToRight(true);
      break;
    default:
      "";
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      movePlayerToLeft();
      break;
    case "d":
      movePlayerToRight();
      break;
    default:
      "";
  }
});
