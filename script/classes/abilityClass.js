
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
            case 'archerStrike':
                console.log("archer Strike activated");
                createArcherShotEffect();

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



document.addEventListener('DOMContentLoaded', () => {
    setupGame();
  });

  function setupGame() {
    // Position the player at the center of the game container
    const player = document.getElementById('player0');
    const gameContainer = document.getElementById('gameContainer');

    player.style.left = `${gameContainer.offsetWidth / 2 - player.offsetWidth / 2}px`;
    player.style.top = `${gameContainer.offsetHeight / 2 - player.offsetHeight / 2}px`;

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (event) => {
      const cursor = document.getElementById('cursor');
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });

    // Trigger ability when '1' key is pressed
    document.addEventListener('keydown', function(event) {
      if (event.key === '1') {
        createArcherShotEffect();
      }
    });
  }

  function createArcherShotEffect() {
      console.log("Creating archer shot");

      const player = document.getElementById('player0');
      const cursor = document.getElementById('cursor');
      const gameContainer = document.getElementById('gameContainer');

      const playerRect = player.getBoundingClientRect();
      const gameRect = gameContainer.getBoundingClientRect();
      const cursorRect = cursor.getBoundingClientRect();

      // Calculate the center positions of the player and cursor
      const playerCenterX = playerRect.left + playerRect.width / 2;
      const playerCenterY = playerRect.top + playerRect.height / 2;
      const cursorCenterX = cursorRect.left + cursorRect.width / 2;
      const cursorCenterY = cursorRect.top + cursorRect.height / 2;

      console.log("Player center:", playerCenterX, playerCenterY);
      console.log("Cursor center:", cursorCenterX, cursorCenterY);

      // Calculate the direction vector from player to cursor
      const directionX = cursorCenterX - playerCenterX;
      const directionY = cursorCenterY - playerCenterY;
      const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
      const unitDirectionX = directionX / magnitude;
      const unitDirectionY = directionY / magnitude;

      console.log("Direction vector:", unitDirectionX, unitDirectionY);

      const arrow = document.createElement('img');
      arrow.src = '../../assets/arrow.png';
      arrow.className = 'archer-shot-effect';
      arrow.style.left = `${playerCenterX - gameRect.left - 10}px`;
      arrow.style.top = `${playerCenterY - gameRect.top - 50}px`;
      arrow.style.transformOrigin = 'center bottom'; // Rotate from the bottom center

      // Calculate the initial rotation angle
      const angle = Math.atan2(unitDirectionY, unitDirectionX);
      arrow.style.transform = `rotate(${angle}rad)`;

      console.log("Arrow created with angle:", angle);
      gameContainer.appendChild(arrow);
      console.log("Arrow added to game container");

      // Animate the arrow
      const speed = 1000; // Speed of the arrow in pixels per second
      const duration = 1000; // Duration of the animation in milliseconds

      const startTime = performance.now();

      function animateArrow(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
          arrow.style.left = `${playerCenterX - gameRect.left + unitDirectionX * speed * progress}px`;
          arrow.style.top = `${playerCenterY - gameRect.top + unitDirectionY * speed * progress}px`;
          requestAnimationFrame(animateArrow);
        } else {
          gameContainer.removeChild(arrow);
        }
      }

      requestAnimationFrame(animateArrow);
    } 