import { GridNode } from "../visualizer/Visualizer";
import { calculateHeuristic } from "./A*";
import { getUnvisitedNeighbors } from "./dijkstra";
export const greedyBestFirstSearch = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => {
  const openSet: GridNode[] = [startNode];
  const visitedNodes: GridNode[] = [];

  while (openSet.length !== 0) {
    const currentNode = getClosestToTarget(openSet, finishNode);
    if (currentNode === finishNode) {
      return visitedNodes;
    }

    openSet.splice(openSet.indexOf(currentNode), 1);
    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isWall && !neighbor.isVisited) {
        neighbor.prev = currentNode;
        openSet.push(neighbor);
      }
    }
  }

  // No path found
  return visitedNodes;
};

const getClosestToTarget = (openSet: GridNode[], finishNode: GridNode) => {
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

  return closestNode;
};
