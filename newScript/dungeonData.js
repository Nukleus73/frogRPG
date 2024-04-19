var bitMap = createMatrix({x:30, y:30}, 20, 3, 5).tiles;
var tileMap = formatMatrix(bitMap)

var tileProperties = [
  // 0 = Floor
  {
    randomRange: 16,
  },
  // 1 = Top
  {
    randomRange: 4,
  },
  // 2 = Right
  {
    randomRange: 2,
  },
  // 3 = Bottom
  {
    randomRange: 2,
  },
  // 4 = Left
  {
    randomRange: 2,
  },
  // 5 = Top-right Corner
  {
    randomRange: false,
  },
  // 6 = Bottom-right Corner
  {
    randomRange: false,
  },
  // 7 = Bottom-left Corner
  {
    randomRange: false,
  },
  // 8 = Top-left Corner
  {
    randomRange: false,
  },
  // 9 = Small
  {
    randomRange: false,
  },
  // 10 = Full
  {
    randomRange: false,
  },
  // 11 = Void
  {
    randomRange: false,
  }
];
