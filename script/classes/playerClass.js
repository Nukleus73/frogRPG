let playerCounter = 0;

// player class definition
class Player {
  constructor(frog_class, username, peerId) {

    let playerStats;

    switch (frog_class) {
      case 'archer':
        playerStats = {
          health: 60,
          mana: 70,
          strength: 80,
          speed: 100,
        };
        break;
      case 'cleric':
        playerStats = {
          health: 100,
          mana: 100,
          strength: 40,
          speed: 100,
        };
        break;
      case 'mage':
        playerStats = {
          health: 40,
          mana: 70,
          strength: 100,
          speed: 60,
        };
        break;
      case 'warrior':
        playerStats = {
          health: 100,
          mana: 60,
          strength: 80,
          speed: 50,
        };
        break;
      default:
        throw new Error(`[playerClass.js]: Class (${frog_class}) not found.`);
    }

    //  acceleration, friction and movement
    this.acceleration = 0.35;
    this.friction = 0.8;
    this.moveSpeed = (playerStats.speed * 10);

    // initial position
    this.positionX = 500;
    this.positionY = 500;

    //  velocity
    this.velocityX = 0;
    this.velocityY = 0;

    //  keys
    this.keys = {};
    this.keyConfig = {
      up: 'w',
      left: 'a',
      down: 's',
      right: 'd'
    };

    //  create the wrapper for the whole player
    this.playerWrapper = document.createElement('div');
    this.playerWrapper.classList.add('playerWrapper');
    this.playerWrapper.setAttribute('id', 'player' + playerCounter)



    // create the player body
    this.playerBody = document.createElement('img');
    this.playerBody.src = `./assets/frog_sprites/frog_${frog_class}.svg`;
    this.playerBody.classList.add('playerBody');

    // create the player weapon
    this.playerWeapon = document.createElement('img');
    this.playerWeapon.src = `./assets/frog_gear/${frog_class}.svg`;
    this.playerWeapon.style.position = 'absolute';
    this.playerWeapon.classList.add('playerWeapon');

    // class definitions

    switch (frog_class) {
      case 'archer':
        this.playerWeapon.style.width = '2.5rem'
        this.playerWeapon.style.transform = 'rotate(90deg)'
        this.playerWeapon.style.top = '-10px'
        this.playerWeapon.style.left = '15px'
        break;

    }

    // append elements to the document
    this.playerWrapper.appendChild(this.playerBody);
    this.playerWrapper.appendChild(this.playerWeapon);
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
    // Check if specific keys are pressed and update acceleration accordingly
    let accelerationX = 0;
    let accelerationY = 0;

    if (this.keys[this.keyConfig.up] && (this.playerWrapper.getBoundingClientRect())) {
      accelerationY -= this.acceleration;
      this.playerColideDirection = "up";
    }
    if (this.keys[this.keyConfig.left] && (this.playerWrapper.getBoundingClientRect())) {
      accelerationX -= this.acceleration;
      this.playerColideDirection = "left";
    }
    if (this.keys[this.keyConfig.down] && (this.playerWrapper.getBoundingClientRect())) {
      accelerationY += this.acceleration;
      this.playerColideDirection = "down";
    }
    if (this.keys[this.keyConfig.right] && (this.playerWrapper.getBoundingClientRect())) {
      accelerationX += this.acceleration;
      this.playerColideDirection = "right";
    }

    // Apply friction to slow down the player's velocity
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    // Update player's velocity based on acceleration
    this.velocityX += accelerationX;
    this.velocityY += accelerationY;

    // Update player's position based on velocity
    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    // Check collision with walls and adjust position if necessary
    let nextPositionX = this.positionX;
    let nextPositionY = this.positionY;


    // Update player's position
    this.positionX = nextPositionX;
    this.positionY = nextPositionY;

    // Calculate rotation angle for waddling effect
    let rotationAngle = 0;
    if (accelerationX !== 0 || accelerationY !== 0) {
      rotationAngle = Math.sin(Date.now() * 0.01) * 9; // Adjust the multiplier to control the waddling speed
    }

    // Update the HTML playerBody's transform property to move and rotate the player on the screen
    this.playerWrapper.style.transform = `translate(${this.positionX}px, ${this.positionY}px) rotate(${rotationAngle}deg)`;

    // Request the next animation frame to continue the game loop
    requestAnimationFrame(() => this.gameLoop());
  }
}