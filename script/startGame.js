function startGame(peerId, characterType) {
  if (!peerId) {
    createDungeon({ x: 20, y: 20 }, 12, 3, 5, 0.1);
  }
  // session(peerId);
  //  players
  let player1 = new Player(characterType);
}