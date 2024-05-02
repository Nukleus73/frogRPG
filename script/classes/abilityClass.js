class Ability {
    constructor(player, ability) {
        switch (ability) {
            // Warrior Abilities
            case 'warriorStrike':
                // Logic for warrior strike ability
                break;
            case 'AggroDraw':
                // Logic for aggro draw ability
                break;
            case 'Spin':
                // Logic for spin ability
                break;
            case 'StoneForm':
                // Logic for stone form ability
                break;

            // Mage Abilities
            case 'mageStrike':
                // Logic for mage strike ability
                break;
            case 'LightningBolt':
                // Logic for lightning bolt ability
                break;
            case 'MeteorStrike':
                // Logic for meteor strike ability
                break;
            case 'Freeze':
                // Logic for freeze ability
                break;

            // Archer Abilities
            case 'archerStrike':
                // let arrow = document.createElement("img");
                // setTimeout(() => {
                //     player.canShoot = false;
                // }, 800); // 0.8 second cooldown
            
                // arrow.src = "./assets/arrow.png";
                // arrow.classList.add("arrow"); // Add a class to style the arrow
                // arrow.style.position = "absolute"; // Set arrow position to absolute
                // arrow.style.width = "30px";
                // arrow.style.height = "3px";
            
                // // Calculate the center position of the player's weapon
                // let map = document.querySelector("#map")
                // arrow.style.left = map.style.left*2; // Set arrow left position to the player weapon's center
                // arrow.style.top = map.sdwtyle.top*2; // Set arrow top position to the player weapon's center
                // map.appendChild(arrow);
            
                // // Rotate the arrow to point towards the direction the player is facing
                // let cursorX = document.querySelector("#cursor").offsetLeft + cursor.offsetWidth / 2;
                // let cursorY = document.querySelector("#cursor").offsetTop + cursor.offsetHeight / 2;
            
                // let angle = Math.atan2(cursorY -  cursorX);
                // arrow.style.transform = `rotate(${angle}rad)`;
            
                // // Define arrow velocity based on angle and speed
                // let arrowSpeed = 5; // Adjust arrow speed as needed
                // let velocityX = Math.cos(angle) * arrowSpeed;
                // let velocityY = Math.sin(angle) * arrowSpeed;
            
                // // Arrow movement loop
                // this.gameLoop = () => {
                //     // Move the arrow
                //     arrow.style.left = parseFloat(arrow.style.left) + velocityX + "px";
                //     arrow.style.top = parseFloat(arrow.style.top) + velocityY + "px";
            
                //     // Check for collision with walls
                //     let walls = document.querySelectorAll(".wall");
                //     if (isColliding(arrow, "right", walls, 0) || isColliding(arrow, "left", walls, 0) || isColliding(arrow, "up", walls, 0) || isColliding(arrow, "down", walls, 0)) {
                //         // Stop arrow when hitting a wall
                //         return;
                //     }
            
                //     // Request the next animation frame
                //     requestAnimationFrame(this.gameLoop);
                // };
            
                // // Start arrow movement loop
                // this.gameLoop();
            
                break;
            
            case 'RapidFire':
                // Logic for rapid fire ability
                break;
            case 'ChargeShot':
                // Logic for charge shot ability
                break;
            case 'ArrowRain':
                // Logic for arrow rain ability
                break;

            // Cleric Abilities
            case 'clericStrike':
                // Logic for cleric strike ability
                break;
            case 'HolyHandGrenade':
                // Logic for holy hand grenade ability
                break;
            case 'SacredBind':
                // Logic for sacred bind ability
                break;
            case 'SacredPrayer':
                // Logic for sacred prayer ability
                break;
        }
    }
}