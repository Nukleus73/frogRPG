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

        // acceleration, friction and movement
        this.acceleration = playerStats.speed / 1500;
        this.friction = 0.75;

        let spawn = document.querySelector(".playerSpawnPoint").getBoundingClientRect();
        let map = document.querySelector("#map").getBoundingClientRect();

        // initial position (as percentages of map container)
        this.positionX = (spawn.left / map.width) * 100;
        this.positionY = (spawn.top / map.height) * 100 + 5;

        // velocity
        this.velocityX = 0;
        this.velocityY = 0;

        // keys
        this.keys = {};
        this.keyConfig = {
            up: 'w',
            left: 'a',
            down: 's',
            right: 'd',
            mouseLeft: 'mousedown'
        };

        // create the wrapper for the whole player
        this.player = document.createElement('div');
        this.player.classList.add('player');
        this.player.setAttribute('id', 'player' + playerCounter)

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
                this.playerWeapon.style.width = '2rem'
                this.playerWeapon.style.paddingLeft = '.5rem'
                this.playerWeapon.style.transformOrigin = 'center left';
                this.playerWeapon.style.top = '-80%';
                this.playerWeapon.style.left = '55%';
                break;
        }

        // append elements to the document
        this.player.appendChild(this.playerBody);
        this.player.appendChild(this.playerWeapon);
        document.querySelector("#gameContainer").appendChild(this.player);

        // updates keys object when a key is pressed
        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        // updates keys object when a key is released
        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        document.addEventListener('mousedown', (event) => {
            if (event.button === 0) { // 0 represents the left mouse button
                this.keys[this.keyConfig.mouseLeft] = true;
            }
        });

        // Update keys object when mouse button is released
        document.addEventListener('mouseup', (event) => {
            if (event.button === 0) { // 0 represents the left mouse button
                this.keys[this.keyConfig.mouseLeft] = false;
            }
        });

        playerCounter++

        // start the game loop
        this.gameLoop();

        // add event listener to track mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
    }

    // behaviour of object
    gameLoop() {
        // Check if specific keys are pressed and update acceleration accordingly
        let accelerationX = 0;
        let accelerationY = 0;

        if (this.keys[this.keyConfig.up]) {
            accelerationY -= this.acceleration;
        }
        if (this.keys[this.keyConfig.left]) {
            accelerationX -= this.acceleration;
        }
        if (this.keys[this.keyConfig.down]) {
            accelerationY += this.acceleration;
        }
        if (this.keys[this.keyConfig.right]) {
            accelerationX += this.acceleration;
        }
        if (this.keys[this.keyConfig.mouseLeft]) {
            console.log("Bang!")
        }

        // Apply friction to slow down the player's velocity
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;

        // Update player's velocity based on acceleration
        this.velocityX += accelerationX;
        this.velocityY += accelerationY;

        // Calculate next position based on velocity (as percentages of map container)
        let nextPositionX = this.positionX + this.velocityX;
        let nextPositionY = this.positionY + this.velocityY;

        // Update player's position if it's within the map bounds (0-100%)
        if (nextPositionX >= 0 && nextPositionX <= 100) {
            this.positionX = nextPositionX;
        }
        if (nextPositionY >= 0 && nextPositionY <= 100) {
            this.positionY = nextPositionY;
        }

        // Calculate rotation angle for waddling effect
        let rotationAngle = 0;
        if (accelerationX !== 0 || accelerationY !== 0) {
            rotationAngle = Math.sin(Date.now() * 0.01) * 9; // Adjust the multiplier to control the waddling speed
        }

        // Update player's body rotation for waddling effect
        this.playerBody.style.transform = `rotate(${rotationAngle}deg)`;

        // For archer class, make the bow point at the cursor
        let playerRect = this.player.getBoundingClientRect();
        let playerCenterX = playerRect.left + playerRect.width / 2;
        let playerCenterY = playerRect.top + playerRect.height / 2;
        let angle = Math.atan2(this.mouseY - playerCenterY, this.mouseX - playerCenterX);
        this.playerWeapon.style.transform = `rotate(${angle}rad)`;

        // Check if the next position collides with any walls
        if (!wallCollide(this.player)) {
            // Update player's position if no collision
            this.player.style.left = `${this.positionX}%`;
            this.player.style.top = `${this.positionY}%`;
        }
        else {
            // Call collisionChecker function
            collisionChecker(this.player);
            console.log("aaaaa")
        }

        // Request the next animation frame to continue the game loop
        requestAnimationFrame(() => this.gameLoop());
    }

}