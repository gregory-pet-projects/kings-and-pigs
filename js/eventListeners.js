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


  for (let i = 0; i < doors.length; i++) {
    const door = doors[i];
    if (
      player.hitbox.position.x + player.hitbox.width <=
        door.position.x + door.width &&
      player.hitbox.position.x >= door.position.x &&
      player.hitbox.position.y + player.hitbox.height >= door.position.y &&
      player.hitbox.position.y <= door.position.y + door.height
    ) {
      return;
    }
  }

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
