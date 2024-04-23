function startGame(peerId, characterType) {
  if (!peerId) {
    createDungeon({ x: 30, y: 30 }, 8, 3, 5, 0.1);
  }
  // session(peerId);
  //  players
  let player1 = new Player(characterType, {
    up: "w",
    left: "a",
    down: "s",
    right: "d",
  });
}