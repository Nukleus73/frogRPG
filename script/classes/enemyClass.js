class Enemy {
    constructor(spawnX, spawnY, spawnTime) {
        this.spawnX = spawnX; // Initial x position
        this.spawnY = spawnY; // Initial y position
        this.spawnTime = spawnTime; // Time to spawn (in milliseconds)
        this.isAlive = true; // Flag to track if the enemy is alive

        // Initialize the enemy when it's time to spawn
        setTimeout(() => {
            this.spawn();
        }, spawnTime);
    }

    // Method to spawn the enemy at the specified position within the map
    spawn() {
        // Select the map container element
        const mapContainer = document.querySelector('#map');

        if (!mapContainer) {
            console.error('Map container not found.');
            return;
        }

        // Create the enemy element
        const enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.left = `${this.spawnX}px`;
        enemy.style.top = `${this.spawnY}px`;

        // Additional setup for enemy appearance, health, etc.
        enemy.style.width = '50px'; // Adjust size as needed
        enemy.style.height = '50px'; // Adjust size as needed
        enemy.style.borderRadius = '50%'; // Make it a circle
        enemy.style.backgroundColor = 'red'; // Set background color to red

        // Append the enemy to the map container
        mapContainer.appendChild(enemy);

        console.log("Enemy spawned at:", this.spawnX, this.spawnY);
    }

    // Example method for enemy movement
    move() {
        // Implement enemy movement logic here
    }

    // Example method for damaging the enemy
    damage(amount) {
        // Implement enemy damage logic here
    }

    // Example method to check if the enemy is alive
    checkAlive() {
        return this.isAlive;
    }
    
}

// Example usage:
const enemySpawnX = 500; // Random x position
const enemySpawnY = 500; // Random y position
const enemySpawnTime = 3000; // 3 seconds delay for spawning the enemy
const enemy = new Enemy(enemySpawnX, enemySpawnY, enemySpawnTime);


