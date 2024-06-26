function isColliding(object1, direction, object2) {
    let object1Rect = object1.getBoundingClientRect();

    // Adjust object1's position based on direction
    switch (direction) {
        case "up":
            object1Rect = {
                x: object1Rect.x,
                y: object1Rect.y - 50,
                width: object1Rect.width,
                height: object1Rect.height
            };
            break;
        case "down":
            object1Rect = {
                x: object1Rect.x,
                y: object1Rect.y + 50,
                width: object1Rect.width,
                height: object1Rect.height
            };
            break;
        case "left":
            object1Rect = {
                x: object1Rect.x - 40,
                y: object1Rect.y,
                width: object1Rect.width,
                height: object1Rect.height
            };
            break;
        case "right":
            object1Rect = {
                x: object1Rect.x + 40,
                y: object1Rect.y,
                width: object1Rect.width,
                height: object1Rect.height
            };
            break;
        default:
            break;
    }

    // If object2 is a NodeList or an array of elements
    if (object2 instanceof NodeList || object2 instanceof Array) {
        for (let i = 0; i < object2.length; i++) {
            let object2Rect = object2[i].getBoundingClientRect();

            // Check for collision
            if (
                object1Rect.x < object2Rect.x + object2Rect.width &&
                object1Rect.x + object1Rect.width > object2Rect.x &&
                object1Rect.y < object2Rect.y + object2Rect.height - 30 &&
                object1Rect.y + object1Rect.height > object2Rect.y
            ) {
                return true; // Collision detected
            }
        }
    } else { // If object2 is a single element
        let object2Rect = object2.getBoundingClientRect();

        // Check for collision
        if (
            object1Rect.x < object2Rect.x + object2Rect.width &&
            object1Rect.x + object1Rect.width > object2Rect.x &&
            object1Rect.y < object2Rect.y + object2Rect.height &&
            object1Rect.y + object1Rect.height > object2Rect.y 
        ) {
            return true; // Collision detected
        }
    }

    return false; // No collision detected
}
