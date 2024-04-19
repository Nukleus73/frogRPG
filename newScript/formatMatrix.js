function formatMatrix(matrix) {
  console.log(matrix)
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

      // If current cell is a left cell
      if (center == 11 && right == 0) {
        newMatrix[y][x] = 2;
      }
      // If current cell is a right cell
      if (center == 11 && left == 0) {
        newMatrix[y][x] = 4;
      }
      // If current cell is a bottom cell
      if (center == 11 && top == 0) {
        newMatrix[y][x] = 3;
      }
      // If current cell is a top cell
      if (center == 11 && bottom == 0) {
        newMatrix[y][x] = 1;
      }
      // If current cell is a full cell
      if (center == 11
        && (bottom == 0 || top == 0)
        && (left == 0 || right == 0)) {
        newMatrix[y][x] = 10;
      }
    }
  }

  return newMatrix;
}
