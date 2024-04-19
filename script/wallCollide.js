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

function collisionChecker(player) {
    let walls = document.getElementsByClassName("coliderWalls");

    if (wallCollide(player.playerWrapper.getBoundingClientRect())) { // Pass player's bounding rectangle to wallCollide function
        let newPos = { x: player.positionX, y: player.positionY }; // Correct syntax for creating newPos object
        console.log('kajajpoajajia')

        for (let i = 0; i < walls.length; i++) {
            let wallRect = walls[i].getBoundingClientRect();
            let objRect = player.playerWrapper.getBoundingClientRect();

            if (player.velocityX > 0) // object came from the left
                newPos.x = wallRect.left - objRect.width;
            else if (player.velocityX < 0) // object came from the right
                newPos.x = wallRect.right;
            if (player.velocityY > 0) // object came from the top
                newPos.y = wallRect.top - objRect.height;
            else if (player.velocityY < 0) // object came from the bottom
                newPos.y = wallRect.bottom;
        }

        player.positionX = newPos.x; // Update player's position
        player.positionY = newPos.y;
    }
}
