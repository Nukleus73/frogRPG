var itemMap;
var firstFloor = true;

function formatMatrix(matrix, itemChance) {
    console.log(matrix);

    matrix = matrix.tiles;
    itemMap = matrix.map(row => Array(row.length).fill(0));
    let newMatrix = matrix.map((row) => row.slice());
    let tileSelection = [];

    // Iterate over every cell
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            //  only assigns the proper values if they are not out of bounds
            let center = matrix[y][x];
            let top = y > 0 ? matrix[y - 1][x] : undefined;
            let right = x < matrix[0].length - 1 ? matrix[y][x + 1] : undefined;
            let bottom = y < matrix.length - 1 ? matrix[y + 1][x] : undefined;
            let left = x > 0 ? matrix[y][x - 1] : undefined;
            let topRight =
                y > 0 && x < matrix[0].length - 1 ? matrix[y - 1][x + 1] : undefined;
            let bottomRight =
                y < matrix.length - 1 && x < matrix[0].length - 1
                    ? matrix[y + 1][x + 1]
                    : undefined;
            let bottomLeft =
                y < matrix.length - 1 && x > 0 ? matrix[y + 1][x - 1] : undefined;
            let topLeft = y > 0 && x > 0 ? matrix[y - 1][x - 1] : undefined;

            if (center == 11) {
                // If current cell is a left cell
                if (right == 0) {
                    newMatrix[y][x] = 2;
                }
                // If current cell is a right cell
                if (left == 0) {
                    newMatrix[y][x] = 4;
                }
                // If current cell is a bottom cell
                if (top == 0) {
                    newMatrix[y][x] = 3;
                }

                //  if the tile bottom and left is a wall
                if (bottom == 11 && right == 11 && bottomRight == 0) {
                    newMatrix[y][x] = 8;
                }
                //  if the tile bottom and left is a wall
                if (bottom == 11 && left == 11 && bottomLeft == 0) {
                    newMatrix[y][x] = 5;
                }
                //  if the tile bottom and left is a wall
                if (top == 11 && right == 11 && topRight == 0) {
                    newMatrix[y][x] = 7;
                }
                //  if the tile bottom and left is a wall
                if (top == 11 && left == 11 && topLeft == 0) {
                    newMatrix[y][x] = 6;
                }
                //  if the tile bottom and left is a wall
                if (top == 11 && left == 11 && topLeft == 0) {
                    newMatrix[y][x] = 6;
                }

                // If current cell is a full cell
                if ((top == 0 && bottom == 0) || (left == 0 && right == 0)) {
                    newMatrix[y][x] = 10;
                }
                // If current cell is a top cell
                if (bottom == 0) {
                    newMatrix[y][x] = 1;
                }
            }
        }
    }
    //  Wall bug fixing
    for (let y = 0; y < newMatrix.length; y++) {
        for (let x = 0; x < newMatrix[0].length; x++) {
            let center = newMatrix[y][x];
            let top = y > 0 ? newMatrix[y - 1][x] : undefined;
            let right = x < newMatrix[0].length - 1 ? newMatrix[y][x + 1] : undefined;
            let bottom = y < newMatrix.length - 1 ? newMatrix[y + 1][x] : undefined;
            let left = x > 0 ? newMatrix[y][x - 1] : undefined;
            let topRight =
                y > 0 && x < newMatrix[0].length - 1
                    ? newMatrix[y - 1][x + 1]
                    : undefined;
            let bottomRight =
                y < newMatrix.length - 1 && x < newMatrix[0].length - 1
                    ? newMatrix[y + 1][x + 1]
                    : undefined;
            let bottomLeft =
                y < newMatrix.length - 1 && x > 0 ? newMatrix[y + 1][x - 1] : undefined;
            let topLeft = y > 0 && x > 0 ? newMatrix[y - 1][x - 1] : undefined;

            if ( //   if top, right, and bottom is a wall
                (top !== 0 && top !== 11 && top !== undefined &&
                    right !== 0 && right !== 11 && right !== undefined &&
                    left == 0 && left !== 10 &&
                    bottom !== 0 && bottom !== 11 && bottom !== undefined)
                ||  //   and if top, left, and bottom is a wall
                (top !== 0 && top !== 11 && top !== undefined &&
                    right == 0 &&
                    left !== 0 && left !== 11 && left !== undefined &&
                    bottom !== 0 && bottom !== 11 && bottom !== undefined)
                ||  //   and if top, right, and left is a wall
                (top !== 0 && top !== 11 && top !== undefined &&
                    right !== 0 && right !== 11 && right !== undefined &&
                    left !== 0 && left !== 11 && left !== undefined &&
                    bottom == 0)
                ||  //   and if left, right, and bottom is a wall
                (top == 0 &&
                    right !== 0 && right !== 11 && right !== undefined &&
                    left !== 0 && left !== 11 && left !== undefined &&
                    bottom !== 0 && bottom !== 11 && bottom !== undefined)
            ) {
                newMatrix[y][x] = 10;
            }

            // Items and ladder addition
            if (center == 0 && top == 0 && right == 0 && bottom == 0 && left == 0
                && topRight == 0 && bottomRight == 0 && bottomLeft == 0 && topLeft == 0) {
                tileSelection.push([y, x]);
            }

            const randomNumber = Math.floor(Math.random() * 100) + 1;
            if (center == 0 && (randomNumber / 100) < itemChance
                && (top == 0 && bottom == 0 && left == 0 && right == 0)) { //  Item variable
                itemMap[y][x] = 12
            }
        }
    }
    if (firstFloor) {
        let playerSpawnPoint = tileSelection[Math.floor(Math.random() * tileSelection.length)]
        itemMap[playerSpawnPoint[0]][playerSpawnPoint[1]] = 15
        firstFloor = false;
    }

    let ladder = tileSelection[Math.floor(Math.random() * tileSelection.length)]
    itemMap[ladder[0]][ladder[1]] = 16
    return newMatrix;
}
