import { GridNode } from "../visualizer/Visualizer";
export function recursiveDivision(
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode
) {
  const visitedNodes = [];
  const height = grid.length;
  const width = grid[0].length;

  // Add outer walls
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (row === 0 || row === height - 1 || col === 0 || col === width - 1) {
        grid[row][col].isWall = true;
        visitedNodes.push(grid[row][col]);
      }
    }
  }

  // Recursive division function
  function divide(
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number,
    orientation: string
  ) {
    if (endRow - startRow < 2 || endCol - startCol < 2) {
      return;
    }

    let horizontal = orientation === "horizontal";
    if (orientation === "auto") {
      horizontal = endRow - startRow > endCol - startCol;
    }

    if (horizontal) {
      // Choose a random row for wall placement
      const randomRow =
        Math.floor((Math.random() * (endRow - startRow - 1)) / 2) * 2 +
        startRow +
        1;

      // Add horizontal wall
      for (let col = startCol; col < endCol; col++) {
        if (
          grid[randomRow][col] !== startNode &&
          grid[randomRow][col] !== endNode
        ) {
          grid[randomRow][col].isWall = true;
          visitedNodes.push(grid[randomRow][col]);
        }
      }

      // Choose a random passage in the wall
      const passageCol =
        Math.floor((Math.random() * (endCol - startCol)) / 2) * 2 + startCol;
      grid[randomRow][passageCol].isWall = false;

      // Recursively divide the two sub-chambers
      divide(startRow, randomRow - 1, startCol, endCol, "auto");
      divide(randomRow + 1, endRow, startCol, endCol, "auto");
    } else {
      // Choose a random column for wall placement
      const randomCol =
        Math.floor((Math.random() * (endCol - startCol - 1)) / 2) * 2 +
        startCol +
        1;

      // Add vertical wall
      for (let row = startRow; row < endRow; row++) {
        if (
          grid[row][randomCol] !== startNode &&
          grid[row][randomCol] !== endNode
        ) {
          grid[row][randomCol].isWall = true;
          visitedNodes.push(grid[row][randomCol]);
        }
      }

      // Choose a random passage in the wall
      const passageRow =
        Math.floor((Math.random() * (endRow - startRow)) / 2) * 2 + startRow;
      grid[passageRow][randomCol].isWall = false;

      // Recursively divide the two sub-chambers
      divide(startRow, endRow, startCol, randomCol - 1, "auto");
      divide(startRow, endRow, randomCol + 1, endCol, "auto");
    }
  }

  // Call the recursive division function
  divide(1, height - 2, 1, width - 2, "auto");

  return visitedNodes;
}
