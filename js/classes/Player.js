const GRAVITY = 1;
const EPSILON = 0.01;
const BUFFER = 0.1;
const VERTICAL_AXIS = "vertical";

class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations }) {
    super({ imageSrc, frameRate, animations });
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkForCollisions();
    this.applyGravity();
    this.updateHitbox();
    this.checkForCollisions(VERTICAL_AXIS);
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
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
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width && // Check if object is on right side of block
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x && // Check if object is on left side of block
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y && // Check if object is below block
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height // Check if object is above block
      ) {
        // If axis is vertical
        if (isVertical) {
          // Check if object is moving up or down
          if (this.velocity.y < 0) {
            this.velocity.y = 0;
            const { position, height } = collisionBlock;
            const offset = this.hitbox.position.y - this.position.y;
            this.position.y = position.y + height - offset + buffer;
          } else if (this.velocity.y > 0) {
            this.velocity.y = 0;
            const { position } = collisionBlock;
            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height;
            this.position.y = position.y - offset - buffer;
          }
        } else {
          // If axis is horizontal
          // Check if object is moving left or right
          if (this.velocity.x < 0) {
            const { position, width } = collisionBlock;
            const offset = this.hitbox.position.x - this.position.x;
            this.position.x = position.x + width - offset + buffer;
          } else if (this.velocity.x > 0) {
            const { position } = collisionBlock;
            const offset =
              this.hitbox.position.x - this.position.x + this.hitbox.width;
            this.position.x = position.x - offset - buffer;
          }
        }
      }
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.currentAnimation = this.animations[name];
  }
}
