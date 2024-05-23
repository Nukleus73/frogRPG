var money = 0;
var spaceBarPressed = false; // Flag to track if space bar is down

// Function to handle keydown event
function onKeyDown(event) {
    if (event.keyCode === 49) { // Check if key pressed is space bar
        spaceBarPressed = true;
    }
}

// Function to handle keyup event
function onKeyUp(event) {
    if (event.keyCode === 49) { // Check if key released is space bar
        spaceBarPressed = false;
    }
}

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

class dungeonObject {
    constructor(object, type) {
        console.log(`Initializing dungeonObject for type: ${type}`);

        let player = document.querySelector("#player0");
        if (!player) {
            console.error("Player element not found");
            return;
        }

        let decorObject = object.childNodes[1];
        if (!decorObject) {
            console.error("Decor object not found");
            return;
        }

        this.activated = false;

        // Initialize previous states for logging changes
        let prevSpaceBarPressed = spaceBarPressed;
        let prevActivated = this.activated;

        // Log the creation of a new dungeonObject
        console.log(`Creating new dungeonObject for type: ${type}`);

        this.gameLoop = () => {

            
            // Log changes in spaceBarPressed
            if (spaceBarPressed !== prevSpaceBarPressed) {
                console.log(`Space Bar Pressed: ${spaceBarPressed}`);
                prevSpaceBarPressed = spaceBarPressed;
            }

            // Log changes in activated
            if (this.activated !== prevActivated) {
                console.log(`Activated: ${this.activated}`);
                prevActivated = this.activated;
            }

            if (isColliding(player, "up", object) || 
                isColliding(player, "down", object) ||
                isColliding(player, "left", object) || 
                isColliding(player, "right", object)) {

                this.activated = true;
                console.log(`Collision detected with ${type}`);

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
                            console.log("Ladder activated, space bar pressed");
                            createDungeon({ x: 20, y: 20 }, 12, 3, 5, 0.1);
                            new Player("frog");
                        }
                        break;
                }
            }

            // Request the next animation frame to continue the game loop
            if (!this.activated || type === "ladder") {
                requestAnimationFrame(this.gameLoop);
            }
        };

        // Call the gameLoop function to start the game loop
        this.gameLoop();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed, initializing dungeon objects");

    setTimeout(() => {
        document.querySelectorAll(".treasure").forEach(coin => {
            new dungeonObject(coin, "treasure");
        });

        const ladderElement = document.querySelector(".ladder");
        if (ladderElement) {
            new dungeonObject(ladderElement, "ladder");
        } else {
            console.error("Ladder element not found");
        }
    }, 10);
});


setTimeout(() => {
    document.querySelectorAll(".treasure").forEach(coin => {
        new dungeonObject(coin, "treasure");
    });

    new dungeonObject(document.querySelector(".ladder"), "ladder");
}, 10);