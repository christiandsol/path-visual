import { GridNode } from "../visualizer/Visualizer";

export const depthFirstSearch = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => {
  const visitedNodes = [];
  const stack = [startNode];

  while (stack.length !== 0) {
    const currentNode = stack.pop();
    if (currentNode) {
      if (currentNode.isVisited || currentNode.isWall) continue;

      currentNode.isVisited = true;
      visitedNodes.push(currentNode);

      if (currentNode === finishNode) return visitedNodes;

      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        neighbor.prev = currentNode;
        stack.push(neighbor);
      }
    }
  }

  return visitedNodes;
};

export const getUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]) => {
  const neighbors: GridNode[] = [];
  const { row, column } = node;

  // Check top neighbor
  if (row > 0) {
    neighbors.push(grid[row - 1][column]);
  }

  // Check bottom neighbor
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][column]);
  }

  // Check left neighbor
  if (column > 0) {
    neighbors.push(grid[row][column - 1]);
  }

  // Check right neighbor
  if (column < grid[0].length - 1) {
    neighbors.push(grid[row][column + 1]);
  }

  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
};
