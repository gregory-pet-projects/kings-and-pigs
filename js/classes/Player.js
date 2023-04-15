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
    // Check if axis is vertical or not
    const isVertical = axis === VERTICAL_AXIS;
    // Set buffer based on axis
    const buffer = isVertical ? BUFFER : EPSILON;

    // Loop through all collision blocks
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // Check if collision exists with current block
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width && // Check if object is on right side of block
        this.position.x + this.width >= collisionBlock.position.x && // Check if object is on left side of block
        this.position.y + this.height >= collisionBlock.position.y && // Check if object is below block
        this.position.y <= collisionBlock.position.y + collisionBlock.height // Check if object is above block
      ) {
        // If axis is vertical
        if (isVertical) {
          // Check if object is moving up
          if (this.velocity.y < 0) {
            // Stop upward movement
            this.velocity.y = 0;
            // Move object to bottom of block
            this.position.y =
              collisionBlock.position.y + collisionBlock.height + buffer;
            break;
          }
          // Check if object is moving down
          if (this.velocity.y > 0) {
            // Stop downward movement
            this.velocity.y = 0;
            // Move object to top of block
            this.position.y = collisionBlock.position.y - this.height - buffer;
            break;
          }
        } else {
          // If axis is horizontal
          // Check if object is moving left
          if (this.velocity.x < 0) {
            // Move object to right of block
            this.position.x =
              collisionBlock.position.x + collisionBlock.width + buffer;
            break;
          }
          // Check if object is moving right
          if (this.velocity.x > 0) {
            // Move object to left of block
            this.position.x = collisionBlock.position.x - this.width - buffer;
            break;
          }
        }
      }
    }
  }
}
