const GRAVITY = 1;
const EPSILON = 0.01;
const BUFFER = 0.1;
const VERTICAL_AXIS = "vertical";

class Player {
  constructor({ collisionBlocks = [] }) {
    this.position = {
      x: 200,
      y: 200,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 25;
    this.height = 25;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = GRAVITY;
    this.collisionBlocks = collisionBlocks;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.checkForCollisions();
    this.applyGravity();
    this.checkForCollisions(VERTICAL_AXIS);
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForCollisions(axis) {
    const isVertical = axis === VERTICAL_AXIS;
    const buffer = isVertical ? BUFFER : EPSILON;

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      //if collision exist
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width && //right side
        this.position.x + this.width >= collisionBlock.position.x && //left side
        this.position.y + this.height >= collisionBlock.position.y && //bottom
        this.position.y <= collisionBlock.position.y + collisionBlock.height //top
      ) {
        if (isVertical) {
          if (this.velocity.y < 0) {
            this.velocity.y = 0;
            this.position.y =
              collisionBlock.position.y + collisionBlock.height + buffer;
            break;
          }
          if (this.velocity.y > 0) {
            this.velocity.y = 0;
            this.position.y = collisionBlock.position.y - this.height - buffer;
            break;
          }
        } else {
          if (this.velocity.x < 0) {
            this.position.x =
              collisionBlock.position.x + collisionBlock.width + buffer;
            break;
          }
          if (this.velocity.x > 0) {
            this.position.x = collisionBlock.position.x - this.width - buffer;
            break;
          }
        }
      }
    }
  }
}
