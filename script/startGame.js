function startGame(peerId) {
  const urlParams = new URLSearchParams(window.location.search);
  const characterType = urlParams.get('class'); // Get character type from URL parameter

  if (!peerId) {
      createDungeon({ x: 20, y: 20 }, 12, 3, 5, 0.1);
  }
  // Create a new player with the retrieved character type
  let player1 = new Player(characterType);
}
