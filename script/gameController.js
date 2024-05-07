// Global player variable
var player;

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
            triggerAbility();
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
