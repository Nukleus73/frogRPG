

class Ability {
    constructor(player, ability) {
        switch (ability) {
            case 'Rage':
                console.log(this.frog_class);
               
            if (player.frog_class === 'warrior') {  // Correct usage
                const originalStats = { ...player.playerStats };  // Assuming playerStats is stored in player
                player.playerStats.health *= 1.5;
                player.playerStats.mana *= 1.5;
                player.playerStats.strength *= 1.5;
                player.playerStats.speed *= 1.5;

               

                console.log("Rage ability activated. Stats increased by 70% for 20 seconds.");

                console.log(player.acceleration);

                console.log(originalStats);

                console.log(player.playerStats);
                setTimeout(() => {
                    player.playerStats = originalStats;
                    console.log("Rage ability ended. Stats returned to normal.");
                }, 20000);
            }
                break;

            // Mage Abilities
            case 'mageStrike':
                // Logic for mage strike ability
                

                console.log("mageStrikeeeeeeeeeee ability activated. Stats increased by 70% for 20 seconds.");
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
                console.log("Archerrrrrrr strike ability activated. Stats increased by 70% for 20 seconds.");
                break;
            

            // Cleric Abilities
            case 'clericStrike':
                // Logic for cleric strike ability


                console.log("Cleric strike ability activated. Stats increased by 70% for 20 seconds.");
                break;
        }
    }
}