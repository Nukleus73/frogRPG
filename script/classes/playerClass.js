let playerCounter = 0;

// player class definition
class Player {
  constructor(color, keyConfig, weapon) {
   
    //  acceleration, friction and movement
    this.acceleration = 0.35;
    this.friction = 0.85;
    this.moveSpeed = 0.9;

    // initial position
    this.positionX = 0;
    this.positionY = 0;

    //  velocity
    this.velocityX = 0;
    this.velocityY = 0;

    //  rotation
    this.rotation = 0;

    //  keys
    this.keys = {};
    this.keyConfig = keyConfig;

    //  create the wrapper for the whole player
    this.playerWrapper = document.createElement('div');
    this.playerWrapper.classList.add('playerWrapper');
    this.playerWrapper.setAttribute('id', 'player' + playerCounter)

    // create the player body
    this.playerBody = document.createElement('img');
    this.playerBody.src = `/media/Characters/${color}_character.png`;
    this.playerBody.classList.add('playerBody');

    // append elements to the document
    this.playerWrapper.appendChild(this.playerBody);
    document.body.appendChild(this.playerWrapper);

    // updates keys object when a key is pressed
    document.addEventListener('keydown', (event) => {
      this.keys[event.key] = true;
    });

    // updates keys object when a key is released
    document.addEventListener('keyup', (event) => {
      this.keys[event.key] = false;
    });

    playerCounter++

    // start the game loop
    this.gameLoop();
  }

  // behaviour of object
  gameLoop() {
    // check if specific keys are pressed and update velocity accordingly
    if (this.keys[this.keyConfig.up] && !wallCollide(this.playerWrapper.getBoundingClientRect())) {
      this.velocityY -= this.moveSpeed;
      this.playerColideDirection = "up"
    }
    if (this.keys[this.keyConfig.left] && !wallCollide(this.playerWrapper.getBoundingClientRect())) {
      this.velocityX -= this.moveSpeed;
      this.playerColideDirection = "left"
    }
    if (this.keys[this.keyConfig.down] && !wallCollide(this.playerWrapper.getBoundingClientRect())) {
      this.velocityY += this.moveSpeed;
      this.playerColideDirection = "down"
    }
    if (this.keys[this.keyConfig.right] && !wallCollide(this.playerWrapper.getBoundingClientRect())) {
      this.velocityX += this.moveSpeed;
      this.playerColideDirection = "right"
    }

    // apply friction to slow down the player over time
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    // update player's position based on velocity and acceleration
    this.positionX += this.velocityX * this.acceleration;
    this.positionY += this.velocityY * this.acceleration;

    // update the HTML playerBody's transform property to move the player on the screen
    this.playerWrapper.style.transform = `translate(${this.positionX}px, ${this.positionY}px) rotate(${this.rotation}rad)`;

    // request the next animation frame to continue the game loop
    requestAnimationFrame(() => this.gameLoop());
  }
}