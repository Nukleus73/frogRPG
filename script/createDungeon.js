let gameContainer = document.querySelector("#gameContainer");
var bitMap;
var tileMap;

function createDungeon(
  mapSize,
  numberOfRooms,
  minRoomSize,
  maxRoomSize,
  itemChance
) {
  bitMap = createMatrix(mapSize, numberOfRooms, minRoomSize, maxRoomSize);
  tileMap = formatMatrix(bitMap, itemChance);

  //  make a table
  let table = document.createElement("table");
  table.setAttribute("id", "map");

  // for every tile on the X axis
  for (let x = 0; x < tileMap.length; x++) {
    // make a row and give it an id
    let row = document.createElement("tr");
    row.setAttribute("id", x);

    // for every tile on the Y axis
    for (let y = 0; y < tileMap[0].length; y++) {
      //  Randomizer for random tiles
      let randomTile = Boolean(tileProperties[tileMap[x][y]]);
      if (randomTile) {
        var randomInt =
          Math.floor(
            Math.random() * tileProperties[tileMap[x][y]].randomRange
          ) + 1;
        var randomInt2 =
          Math.floor(
            Math.random() * tileProperties[itemMap[x][y]].randomRange
          ) + 1;
      }

      // make a tile and give it a class
      let tile = document.createElement("td");
      tile.classList.add("tile");

      //  make an image, give it source and append it
      let img = document.createElement("img");
      img.draggable = false;

      if (randomTile) {
        img.src = `./assets/tiles/tile-${tileMap[x][y]}-${randomInt}.png`;
      } else {
        img.src = `./assets/tiles/tile-${tileMap[x][y]}-1.png`;
      }
      tile.appendChild(img);

      if (itemMap[x][y]) {
        let decor;
        if (itemMap[x][y] !== 15) {
        decor = document.createElement("img");
        }
        switch (itemMap[x][y]) {
          case 12:
            tile.classList.add("treasure");
            break;

          case 13:
            tile.classList.add("healthPotion");
            break;

          case 14:
            tile.classList.add("manaPotion");
            break;

          case 15:
            tile.classList.add("playerSpawnPoint");
            break;

          case 16:
            tile.classList.add("ladder");
            break;

          case 17:
            tile.classList.add("enemySpawn");
            break;

          default:
            break;
        }
        if (itemMap[x][y] !== 15) {
          if (randomTile) {
            decor.src = `./assets/tiles/tile-${itemMap[x][y]}-${randomInt2}.png`;
          } else {
            decor.src = `./assets/tiles/tile-${itemMap[x][y]}-1.png`;
          }
          tile.appendChild(decor);
        }
        
      }
      if (bitMap.tiles[x][y] == 11) {
        tile.classList.add("wall");
      }

      //  append the tile to the row
      row.appendChild(tile);
    }

    table.appendChild(row);
  }

  gameContainer.appendChild(table);
}
