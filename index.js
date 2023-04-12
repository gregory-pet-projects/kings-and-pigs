const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; //1024
canvas.height = 64 * 9; //576  ratio

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 100;
    this.height = 100;
  }
}

let y = 100;
c.fillRect(100, y, 100, 100);
//let playerHeight = 100;
//let bottom = y + playerHeight;
const player = new Player();

function animate() {
  window.requestAnimationFrame(animate);

  //playground
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //   if (bottom < canvas.height) {
  //     y++;
  //     bottom = y + 100;
  //   }
}

animate();
