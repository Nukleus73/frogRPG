function formatMatrix(matrix) {
  console.log(matrix);

  matrix = matrix.tiles;
  let newMatrix = matrix.map((row) => row.slice());

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

      if (
        ![top, right, bottom, left, center].includes(11) &&
        ![top, right, bottom, left, center].includes(0) &&
        ![top, right, bottom, left, center].includes(undefined) &&
        center !== 11 && center !== 0 && center !== undefined
      ) {
        newMatrix[y][x] = 10;
        console.log(y + x);
      } 
   
    }
  }

  return newMatrix;
}
