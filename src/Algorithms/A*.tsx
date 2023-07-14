import { GridNode } from "../visualizer/Visualizer";
export const astar = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => {
  const openSet: GridNode[] = [startNode];
  const visitedNodes: GridNode[] = [];

  startNode.gScore = 0;
  startNode.hScore = calculateHeuristic(startNode, finishNode);
  startNode.fScore = startNode.gScore + startNode.hScore;

  while (openSet.length !== 0) {
    // Find the node with the lowest fScore in the open set
    const currentNode = getLowestFScoreNode(openSet);
    if (currentNode === finishNode) {
      return visitedNodes;
    }

    openSet.splice(openSet.indexOf(currentNode), 1);
    visitedNodes.push(currentNode);

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || visitedNodes.includes(neighbor)) {
        continue;
      }

      const tentativeGScore = currentNode.gScore + 1;
      if (tentativeGScore < neighbor.gScore || !openSet.includes(neighbor)) {
        neighbor.prev = currentNode;
        neighbor.gScore = tentativeGScore;
        neighbor.hScore = calculateHeuristic(neighbor, finishNode);
        neighbor.fScore = neighbor.gScore + neighbor.hScore;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      } else if (tentativeGScore === neighbor.gScore) {
        // Handle tie-breaking by considering the node with lower hScore
        if (neighbor.hScore > currentNode.hScore) {
          neighbor.prev = currentNode;
          neighbor.hScore = calculateHeuristic(neighbor, finishNode);
          neighbor.fScore = neighbor.gScore + neighbor.hScore;
        }
      }
    }
  }

  // No path found
  return visitedNodes;
};
//[Node]
const getLowestFScoreNode = (openSet: GridNode[]) => {
  let lowestNode = openSet[0];
  for (let i = 1; i < openSet.length; i++) {
    if (openSet[i].fScore < lowestNode.fScore) {
      lowestNode = openSet[i];
    } else if (openSet[i].fScore === lowestNode.fScore) {
      // Handle tie-breaking by considering the node with lower hScore
      if (openSet[i].hScore < lowestNode.hScore) {
        lowestNode = openSet[i];
      }
    }
  }
  return lowestNode;
};

export const calculateHeuristic = (nodeA: GridNode, nodeB: GridNode) => {
  const dx = Math.abs(nodeA.column - nodeB.column);
  const dy = Math.abs(nodeA.row - nodeB.row);
  return dx + dy;
};

const getNeighbors = (node: GridNode, grid: GridNode[][]) => {
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

  return neighbors;
};
