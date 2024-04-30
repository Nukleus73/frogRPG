function wallCrashCheck(object1, direction, object2) {
    const object1Rect = player.getBoundingClientRect();
    const object2Rect = document.querySelectorAll(".wall");
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i].getBoundingClientRect();
        // Check if any wall is overlapping with the player
        if (
            playerRect.x < wall.x + wall.width &&
            playerRect.x + playerRect.width > wall.x &&
            playerRect.y < wall.y + wall.height &&
            playerRect.y + playerRect.height > wall.y
        ) {
            // Additional logic can be implemented to handle the direction of the wall's movement
            return true; // Collision detected
        }
    }

    return false; // No collision detected

}

    

