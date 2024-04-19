function startGame(peerId,characterType) {
    if (!peerId) {
        createDungeon();
    }
        session(peerId)
        //  players
        let player1 = new Player(characterType, {
            up: 'w',
            left: 'a',
            down: 's',
            right: 'd'
        });

}