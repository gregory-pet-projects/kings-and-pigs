const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; //1024
canvas.height = 64 * 9; //576  ratio

let y = 100;
c.fillRect(100, y, 100, 100);


const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/backgroundLevel1.png",
});
const player = new Player();

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

  backgroundLevel1.draw();

  moveBySidesHandler();

  player.draw();
  player.update();
}

animate();
