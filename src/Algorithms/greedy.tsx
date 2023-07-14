import { getUnvisitedNeighbors } from "./dijkstra";
import { calculateHeuristic } from "./A*";
import { GridNode } from "../visualizer/Visualizer";

class PriorityQueue<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.comparator = comparator;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public enqueue(item: T): void {
    this.heap.push(item);
    this.heapifyUp();
  }

  public dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const root = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return root;
  }

  private heapifyUp(): void {
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      currentIndex > 0 &&
      this.comparator(this.heap[currentIndex], this.heap[parentIndex]) < 0
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  private heapifyDown(): void {
    let currentIndex = 0;
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;
    let nextIndex = currentIndex;

    while (leftChildIndex < this.heap.length) {
      if (
        this.comparator(this.heap[leftChildIndex], this.heap[nextIndex]) < 0
      ) {
        nextIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.comparator(this.heap[rightChildIndex], this.heap[nextIndex]) < 0
      ) {
        nextIndex = rightChildIndex;
      }

      if (nextIndex === currentIndex) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

export const greedyBestFirstSearch = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => {
  const openSet = new PriorityQueue<GridNode>((a, b) => {
    const distanceA = calculateHeuristic(a, finishNode);
    const distanceB = calculateHeuristic(b, finishNode);
    return distanceA - distanceB;
  });

  const visitedNodes: GridNode[] = [];

  openSet.enqueue(startNode);

  while (!openSet.isEmpty()) {
    const currentNode = openSet.dequeue();
    if (currentNode === finishNode) {
      return visitedNodes;
    }
    if (currentNode) {
      visitedNodes.push(currentNode);
      currentNode.isVisited = true;

      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.isWall && !neighbor.isVisited) {
          neighbor.prev = currentNode;
          openSet.enqueue(neighbor);
        }
      }
    }
  }

  // No path found
  return visitedNodes;
};
