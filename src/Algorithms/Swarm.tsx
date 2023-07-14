// swarm.tsx
import { GridNode } from "../visualizer/Visualizer";
import { calculateHeuristic } from "./A*";
import { getNeighbors } from "./A*";
export const swarmSearch = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => {
  const visitedNodes: GridNode[] = [];
  const openSet: GridNode[] = [startNode];
  const closeSet: GridNode[] = [];

  while (openSet.length !== 0) {
    let closestNode = openSet[0];
    let closestDistance = calculateHeuristic(closestNode, finishNode);

    for (let i = 1; i < openSet.length; i++) {
      const node = openSet[i];
      const distance = calculateHeuristic(node, finishNode);
      if (distance < closestDistance) {
        closestNode = node;
        closestDistance = distance;
      }
    }

    openSet.splice(openSet.indexOf(closestNode), 1);
    closeSet.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodes;
    }

    const neighbors = getNeighbors(closestNode, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || closeSet.includes(neighbor)) {
        continue;
      }

      const tentativeDistance = closestNode.distance + 1;
      if (
        tentativeDistance < neighbor.distance ||
        !openSet.includes(neighbor)
      ) {
        neighbor.distance = tentativeDistance;
        neighbor.prev = closestNode;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }

    visitedNodes.push(closestNode);
  }

  // No path found
  return visitedNodes;
};
