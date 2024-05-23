
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
                createMageStrikeEffect();
                

                console.log("mageStrikeeeeeeeeeee ability activated..");
            break;

        // Archer Abilities
       // Archer Abilities
case 'archerStrike':
 //Logic for an archer strike ability.
    break;



            // Cleric Abilities
            case 'clericStrike':
                // Logic for cleric strike ability


                console.log("Cleric strike ability activated. Stats increased by 70% for 20 seconds.");
                break;
        }
    }
}

function createMageStrikeEffect() {
    console.log("Creating mage attack");

    const player = document.getElementById('player0');  // Assume your player has an ID 'player'
    if (!player) {
        console.error('Player element not found.');
        return;
    }

    const playerRect = player.getBoundingClientRect();
    const gameContainer = document.getElementById('gameContainer');
    const gameRect = gameContainer.getBoundingClientRect();

    const effect = document.createElement('div');
    effect.className = 'mage-strike-effect';
    effect.style.position = 'absolute';
    // Adjust for size in the initial position to avoid using translate
    effect.style.left = `${playerRect.left - gameRect.left + playerRect.width / 2 - 150}px`; // Half of the width of the effect
    effect.style.top = `${playerRect.top - gameRect.top + playerRect.height / 2 - 150}px`; // Half of the height of the effect
    effect.style.width = '300px';
    effect.style.height = '300px';
    effect.style.borderRadius = '50%';
    effect.style.background = 'rgba(0, 0, 255, 0.5)';
    effect.style.animation = 'pulse-animation 1.5s forwards';
    effect.style.zIndex = 1000;  // Make sure it's on top of other elements

    gameContainer.appendChild(effect);
    setTimeout(() => {
        gameContainer.removeChild(effect);
    }, 1500); // Remove effect after animation, ensure time matches animation duration
}
