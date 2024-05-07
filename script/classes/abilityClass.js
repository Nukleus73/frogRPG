

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

                triggerRageEffect();

                setTimeout(() => {
                    player.playerStats = originalStats;
                    console.log("Rage ability ended. Stats returned to normal.");
                    document.getElementById("timer").style.display = "none";
                }, 20000);
            }

            function triggerRageEffect() {
                const gameContainer = document.querySelector('#gameContainer'); // Assuming this is your game's main container
                gameContainer.classList.add('shake-effect');
              
                console.log("Effects ARE WORKING AWGAW");
              
                setTimeout(() => {
                  gameContainer.classList.remove('shake-effect');
                  console.log("Rage ability ended. Camera shake effect stopped.");
                }, 20000); // Stop shaking after 20 seconds
              }

              // Select the timer div from the HTML
                const timerDiv = document.getElementById('timer');
                document.getElementById("timer").style.display = "block";
                
                // Set the initial time
                let timeLeft = 20;
                
                // Update the display
                timerDiv.innerText = `${timeLeft} seconds`;
                
                // Function to update the countdown
                function updateCountdown() {
                    if (timeLeft > 0) {
                        // Decrease the time left
                        timeLeft--;
                        // Update the timer display
                        timerDiv.innerText = `${timeLeft} seconds`;
                    } else {
                        // Stop the countdown
                        clearInterval(countdownInterval);
                    }
                }
                // Start the countdown to run every second
                const countdownInterval = setInterval(updateCountdown, 1000);
                    
              
                break;

            // Mage Abilities
            case 'mageStrike':
                // Logic for mage strike ability
                

                console.log("mageStrikeeeeeeeeeee ability activated. Stats increased by 70% for 20 seconds.");
                break;
  

            // Archer Abilities
            case 'archerStrike':
                let arrow = document.createElement("img");
                setTimeout(() => {
                    player.canShoot = false;
                }, 800); // 0.8 second cooldown
            
                arrow.src = "./assets/arrow.png";
                arrow.classList.add("arrow"); // Add a class to style the arrow
                arrow.style.position = "absolute"; // Set arrow position to absolute
                arrow.style.width = "30px";
                arrow.style.height = "3px";
            
                console.log("ArcherStrike is running")

                // Calculate the center position of the player's weapon
                let map = document.querySelector("#map")
                arrow.style.left = map.style.left*2; // Set arrow left position to the player weapon's center
                arrow.style.top = map.style.top*2; // Set arrow top position to the player weapon's center
                map.appendChild(arrow);
            
                // Rotate the arrow to point towards the direction the player is facing
                let cursorX = document.querySelector("#cursor").offsetLeft + cursor.offsetWidth / 2;
                let cursorY = document.querySelector("#cursor").offsetTop + cursor.offsetHeight / 2;
            
                let angle = Math.atan2(cursorY -  cursorX);
                arrow.style.transform = `rotate(${angle}rad)`;
            
                // Define arrow velocity based on angle and speed
                let arrowSpeed = 5; // Adjust arrow speed as needed
                let velocityX = Math.cos(angle) * arrowSpeed;
                let velocityY = Math.sin(angle) * arrowSpeed;
            
                // Arrow movement loop
                this.gameLoop = () => {
                    // Move the arrow
                    arrow.style.left = parseFloat(arrow.style.left) + velocityX + "px";
                    arrow.style.top = parseFloat(arrow.style.top) + velocityY + "px";
            
                    // Check for collision with walls
                    let walls = document.querySelectorAll(".wall");
                    if (isColliding(arrow, "right", walls, 0) || isColliding(arrow, "left", walls, 0) || isColliding(arrow, "up", walls, 0) || isColliding(arrow, "down", walls, 0)) {
                        // Stop arrow when hitting a wall
                        return;
                    }
            
                    // Request the next animation frame
                    requestAnimationFrame(this.gameLoop);
                };
            
                // Start arrow movement loop
                this.gameLoop();
                console.log("Archerrrrrrr strike ability activated.");
                break;
            

            // Cleric Abilities
            case 'clericStrike':
                // Logic for cleric strike ability


                console.log("Cleric strike ability activated. Stats increased by 70% for 20 seconds.");
                break;
        }
    }
}