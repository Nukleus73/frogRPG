// Global player variable
var player;
// Global variables to track ability cooldowns
var abilityCooldown = false;
var cooldownDuration = 60000; // Cooldown duration in milliseconds (60 seconds)

document.addEventListener('DOMContentLoaded', () => {
    startGame("");
});

function startGame(peerId) {
    const urlParams = new URLSearchParams(window.location.search);
    const characterType = urlParams.get('class');
    if (!peerId) {
        createDungeon({ x: 20, y: 20 }, 12, 3, 5, 0.1);
    }
    player = new Player(characterType); // Initialize the player globally
    setupKeyBindings();
}

function setupKeyBindings() {
    document.addEventListener('keydown', (event) => {
        if (event.key === "1") {
            if (!abilityCooldown) {
                triggerAbility();
                startCooldown(); // Start the cooldown after ability is triggered
            } else {
                console.log("Ability is on cooldown. Please wait.");
            }
        }
        if (event.key === "q") {
            triggerSpinSwordAbility();
        }
    });
}

function triggerAbility() {
    if (!player) {
        console.log("Player not initialized");
        return;
    }
    switch (player.frog_class) {
        case 'warrior':
            new Ability(player, 'Rage');
            break;
        case 'mage':
            new Ability(player, 'mageStrike');
            break;
        case 'archer':
            new Ability(player, 'archerStrike');
            break;
        case 'cleric':
            new Ability(player, 'clericStrike');
            break;
        default:
            console.log("Unknown class");
    }
}

function startCooldown() {
    abilityCooldown = true; // Set the cooldown flag
    setTimeout(() => {
        abilityCooldown = false; // Reset the cooldown flag after the cooldown duration
        console.log("Ability ready to use again.");
    }, cooldownDuration);
}

// Function for spin sword
function triggerSpinSwordAbility() {
    const sword = document.querySelector('.playerWeapon');

    console.log("Spin Sword Ability Working");
    
    // Starter animation
    console.log("Sword element found:", sword);



    sword.classList.add('spin');
    
    
    // Fjerner animation
    sword.addEventListener('animationend', () => {
        sword.classList.remove('spin');
    }, { once: true });


    console.log("SpinSword ability activated.");
}

