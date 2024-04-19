let gameContainer = document.querySelector("#gameContainer")

function createDungeon() {

    //  make a table
    let table = document.createElement("table")
    table.setAttribute("id", "map")

    // for every tile on the X axis
    for (let x = 0; x < tileMap.length; x++) {

        // make a row and give it an id
        let row = document.createElement("tr")
        row.setAttribute("id", x)

        // for every tile on the Y axis
        for (let y = 0; y < tileMap[0].length; y++) {

            let randomTile = Boolean(tileProperties[tileMap[x][y]])
            console.log(randomTile)
            if (randomTile) {
            var randomInt = Math.floor(Math.random() * tileProperties[tileMap[x][y]].randomRange)+1
            }

            // make a tile and give it a class
            let tile = document.createElement("td")
            tile.classList.add("tile")

            //  make an image, give it source and append it
            let img = document.createElement("img")

            if (randomTile) {
                img.src = `./assets/tiles/tile-${tileMap[x][y]}-${randomInt}.png`
            }
            else {
                img.src = `./assets/tiles/tile-${tileMap[x][y]}-1.png`
            }
            tile.appendChild(img)

            //  make a collition container, give it class and append it
            let coll = document.createElement("div")
            coll.classList.add("wall")
            coll.style.height = tileProperties[tileMap[x][y]].height
            coll.style.width = tileProperties[tileMap[x][y]].width
            coll.style.transform = `rotate(${tileProperties[tileMap[x][y]].rotation}`
            tile.appendChild(coll)

            //  append the tile to the row
            row.appendChild(tile)
        }

        table.appendChild(row)
    }

    gameContainer.appendChild(table)
}
createDungeon()