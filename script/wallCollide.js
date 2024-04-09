function wallCollide(player) {
    let walls = document.getElementsByClassName("coliderWalls");

    for (let i = 0; i < walls.length; i++) {
        let wall = walls[i].getBoundingClientRect();

        if (
            player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y
        ) {
            return true; // Collision detected
        }
    }

    return false; // No collision detected
}
