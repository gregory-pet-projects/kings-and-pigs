const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; //1024
canvas.height = 64 * 9; //576  ratio




let y = 100;
c.fillRect(100, y, 100, 100);
let playerHeight = 100;
let bottom = y + playerHeight;
function animate() {
  window.requestAnimationFrame(animate);

  //playground
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //player
  c.fillStyle = "red";
  c.fillRect(100, y, 100, playerHeight);
  if (bottom < canvas.height) {
    y++;
    bottom = y + 100;
  }
}

animate();
