let playerCounter = 0;

// player class definition
class   Player {
  constructor(frog_class, username, peerId) {
    let playerStats;
    this.frog_class = frog_class;  // Ensure the class type is saved to the instance
    this.playerStats = {};

    switch (frog_class) {
      case "cleric":
        playerStats = {
          health: 100,
          mana: 100,
          strength: 40,
          speed: 100,
        };
        break;
      case "archer":
        playerStats = {
          health: 60,
          mana: 70,
          strength: 80,
          speed: 100,
        };
        break;
      case "mage":
        playerStats = {
          health: 40,
          mana: 70,
          strength: 100,
          speed: 60,
        };
        break;
      case "warrior":
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
    this.acceleration = playerStats.speed * 0.02; // Adjust as needed
    this.friction = 0.8;
    this.moveSpeed = playerStats.speed;

    // initial position
    let map = document.querySelector("#map");
    let spawn = document.querySelector(".playerSpawnPoint");
    let parentElement = document.querySelector("#gameContainer"); // Assuming parent element's ID is "parentElement"

    // Get the position of each element relative to the viewport
    let mapRect = map.getBoundingClientRect();
    let spawnRect = spawn.getBoundingClientRect();
    let parentRect = parentElement.getBoundingClientRect();

    // Calculate the relative position of map based on spawn
    let leftOffset = ((spawnRect.left - mapRect.left) / mapRect.width) * 100;
    let topOffset = ((spawnRect.top - mapRect.top) / mapRect.height) * 100;

    // Calculate the offset needed to center the spawn within the parent element
    let centerXOffset =
      (parentRect.width - spawnRect.width) / 2 - spawnRect.left;
    let centerYOffset =
      (parentRect.height - spawnRect.height) / 2 - spawnRect.top;

    // Apply the calculated offsets to position the map
    map.style.left = leftOffset + centerXOffset + "px";
    map.style.top = topOffset + centerYOffset + "px";

    //  velocity
    this.velocityX = 0;
    this.velocityY = 0;

    //  keys
    this.keys = {};
    this.mouse = {};
    this.keyConfig = {
      up: "w",
      left: "a",
      down: "s",
      right: "d",
    };

    //  create the wrapper for the whole player
    this.playerWrapper = document.createElement("div");
    this.playerWrapper.classList.add("playerWrapper");
    this.playerWrapper.setAttribute("id", "player" + playerCounter);

    // create the player body
    this.playerBody = document.createElement("img");
    this.playerBody.src = `./assets/frog_sprites/frog_${frog_class}.svg`;
    this.playerBody.classList.add("playerBody");

    // create the player weapon
    this.playerWeapon = document.createElement("img");
    this.playerWeapon.src = `./assets/frog_gear/${frog_class}.svg`;
    this.playerWeapon.style.position = "absolute";
    this.playerWeapon.classList.add("playerWeapon");

    // class definitions
    switch (frog_class) {
      case "archer":
        this.playerWeapon.style.width = "130%";
        this.playerWeapon.style.top = "-40%";
        this.playerWeapon.style.left = "-10%";
        this.playerWeapon.style.paddingLeft = "80%";
        break;
    }

    // append elements to the document
    this.playerWrapper.appendChild(this.playerBody);
    this.playerWrapper.appendChild(this.playerWeapon);
    document.querySelector("#gameContainer").appendChild(this.playerWrapper);

    // updates keys object when a key is pressed
    document.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });

    // updates keys object when a key is released
    document.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });

    // Add event listener for mouse clicks
    document.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        this.mouse.left = true;
      }
    });

    // Add event listener for mouse clicks
    document.addEventListener("mouseup", (event) => {
      if (event.button === 0) {
        this.mouse.left = false;
      }
    });

    playerCounter++;

    // start the game loop
    this.gameLoop();
  }

  // behaviour of object
  gameLoop() {
    if (!this.isAlive()) {
      return; // Stop the game loop if the player is not alive
    }

    // Check if specific keys are pressed and update acceleration accordingly
    let accelerationX = 0;
    let accelerationY = 0;
    let walls = document.querySelectorAll(".wall")
    if (this.keys[this.keyConfig.up] && !isColliding(this.playerBody, "up", walls)) {
      accelerationY -= this.acceleration;
    }
    if (this.keys[this.keyConfig.left] && !isColliding(this.playerBody, "left", walls)) {
      accelerationX -= this.acceleration;
    }
    if (this.keys[this.keyConfig.down] && !isColliding(this.playerBody, "down", walls)) {
      accelerationY += this.acceleration;
    }
    if (this.keys[this.keyConfig.right] && !isColliding(this.playerBody, "right", walls)) {
      accelerationX += this.acceleration;
    }
    if (this.mouse.left) {
      let attack = new Ability(this, "archerStrike")
    }

    // Normalize the acceleration vector if moving diagonally
    if (accelerationX !== 0 && accelerationY !== 0) {
      const diagonalAcceleration = Math.sqrt(
        Math.pow(accelerationX, 2) + Math.pow(accelerationY, 2)
      );
      accelerationX =
        (accelerationX / diagonalAcceleration) * this.acceleration;
      accelerationY =
        (accelerationY / diagonalAcceleration) * this.acceleration;
    }

    // Apply friction to slow down the player's velocity
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    // Update player's velocity based on acceleration
    this.velocityX += accelerationX;
    this.velocityY += accelerationY;

    // Update map's position based on player's movement
    let map = document.querySelector("#map");
    let deltaX = this.velocityX;
    let deltaY = this.velocityY;

    // Check if the map's movement would cause it to go out of bounds
    map.style.left = parseFloat(map.style.left) - deltaX + "px";
    map.style.top = parseFloat(map.style.top) - deltaY + "px";

    // Rotate the player's weapon to point towards the cursor
    let cursor = document.querySelector("#cursor");
    if (cursor) {
      let playerCenterX =
        this.playerWrapper.offsetLeft + this.playerWrapper.offsetWidth / 2;
      let playerCenterY =
        this.playerWrapper.offsetTop + this.playerWrapper.offsetHeight / 2;
      let cursorX = cursor.offsetLeft + cursor.offsetWidth / 2;
      let cursorY = cursor.offsetTop + cursor.offsetHeight / 2;

      let angle = Math.atan2(cursorY - playerCenterY, cursorX - playerCenterX);
      this.playerWeapon.style.transform = `rotate(${angle}rad)`;
    }

    // Animate weapon movement
    let weaponSpeed = 0.1; // Adjust as needed
    let weaponRotation = parseFloat(
      this.playerWeapon.style.transform
        .replace("rotate(", "")
        .replace("rad)", "")
    );

    this.playerWeapon.style.transform = `rotate(${weaponRotation - 0.2}rad)`;

    // Request the next animation frame to continue the game loop
    requestAnimationFrame(() => this.gameLoop());
  }

  // Check if player is alive
  isAlive() {
    // Add your logic here to determine if the player is alive
    return true; // For demonstration purposes, always return true
  }
}
