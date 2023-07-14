import { GridNode } from "../visualizer/Visualizer";
import { getUnvisitedNeighbors } from "./dijkstra";
export const breadthFirstSearch = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => {
  const visitedNodes = [];
  const queue = [startNode];

  while (queue.length !== 0) {
    const currentNode = queue.shift();
    if (currentNode) {
      if (currentNode.isVisited || currentNode.isWall) continue;

      currentNode.isVisited = true;
      visitedNodes.push(currentNode);

      if (currentNode === finishNode) return visitedNodes;

      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        neighbor.prev = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return visitedNodes;
};
