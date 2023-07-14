import { GridNode } from "../visualizer/Visualizer";

export const dijkstra = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => {
  const visitedNodes = [];
  startNode.distance = 0;
  const nodes = getAllNodes(grid);
  while (nodes.length !== 0) {
    //sort by closest
    sortByClosest(nodes);
    const closestNode = nodes.shift();
    if (closestNode) {
      if (closestNode?.isWall) continue;

      if (closestNode?.distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;

      //update other closest nodes
      visitedNodes.push(closestNode);
      if (closestNode === finishNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  return visitedNodes;
};

const getAllNodes = (grid: GridNode[][]) => {
  const value = [];
  for (const row of grid) {
    for (const node of row) {
      value.push(node);
    }
  }
  return value;
};

const sortByClosest = (grid: GridNode[]) => {
  grid.sort(
    (node1: GridNode, node2: GridNode) => node1.distance - node2.distance
  );
};

const updateUnvisitedNeighbors = (
  closestNode: GridNode,
  grid: GridNode[][]
) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.prev = closestNode;
  }
};

export function getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]) {
  const neighbors = [];
  const { column, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if (column > 0) neighbors.push(grid[row][column - 1]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export const getShortestPath = (lastNode: GridNode | null) => {
  const nodesInShortestPathOrder = [];
  let currentNode = lastNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.prev;
  }
  return nodesInShortestPathOrder;
};
