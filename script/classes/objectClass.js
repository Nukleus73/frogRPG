var money = 0;
var spaceBarPressed = false; // Flag to track if space bar is down

// Function to handle keydown event
function onKeyDown(event) {
    if (event.keyCode === 32) { // Check if key pressed is space bar
        spaceBarPressed = true;
    }
}

// Function to handle keyup event
function onKeyUp(event) {
    if (event.keyCode === 32) { // Check if key released is space bar
        spaceBarPressed = false;
    }
}

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

class dungeonObject {
    constructor(object, type) {
        let player = document.querySelector("#player0");
        let decorObject = object.childNodes[1]
        let activated = false;
        this.gameLoop = () => {
            if (isColliding(player, "up", object) || 
                isColliding(player, "down", object) ||
                isColliding(player, "left", object) || 
                isColliding(player, "right", object)) {
                activated = true;

                switch (type) {
                    case "treasure":
                        money++;
                        document.querySelector("#money p").innerHTML = money;
                        decorObject.style.transform = `rotateY(360deg) translateY(-20px)`;
                        setTimeout(() => {
                            decorObject.style.opacity = 0;
                        }, 250);
                        break;
                
                    case "ladder":
                        if (spaceBarPressed) {
                            createDungeon({ x: 20, y: 20 }, 12, 3, 5, 0.1);
                            new Player("archer");
                        }
                        break;
                }
            }

            // Request the next animation frame to continue the game loop
            if (!activated) {
                requestAnimationFrame(this.gameLoop);
            }
        };
        // Call the gameLoop function to start the game loop
        this.gameLoop();
    }
}

setTimeout(() => {
    document.querySelectorAll(".treasure").forEach(coin => {
        new dungeonObject(coin, "treasure");
    });

    new dungeonObject(document.querySelector(".ladder"), "ladder");
}, 10);