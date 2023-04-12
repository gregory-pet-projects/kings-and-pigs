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
