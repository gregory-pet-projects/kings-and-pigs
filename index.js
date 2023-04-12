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
function moveBySidesHandler() {
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 5;
  } else if (keys.a.pressed) {
    player.velocity.x = -5;
  }
}
function animate() {
  window.requestAnimationFrame(animate);

  //playground
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  moveBySidesHandler();

  player.draw();
  player.update();
}

animate();
