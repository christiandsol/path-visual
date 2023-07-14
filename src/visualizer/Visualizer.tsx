import { Node } from "./Node/Node";
import React, { useState } from "react";
import { dijkstra, getShortestPath } from "../Algorithms/dijkstra";
import { NavBar } from "../Components/NavBar";
import "./Visualizer.css";
import { astar } from "../Algorithms/A*";
import { greedyBestFirstSearch } from "../Algorithms/greedy";
interface Props {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export type GridNode = {
  isVisited: boolean;
  row: number;
  column: number;
  isWall: boolean;
  distance: number;
  isStart: boolean;
  isEnd: boolean;
  prev: null | GridNode;
  fScore: number;
  gScore: number;
  hScore: number;
};

export const Visualizer: React.FC<Props> = (props: Props) => {
  const [startNode, setStartNode] = useState([props.startRow, props.startCol]);
  const [endNode, setEndNode] = useState([props.endRow, props.endCol]);
  const [startNodeMoving, setStartNodeMoving] = useState(false);
  const [endNodeMoving, setEndNodeMoving] = useState(false);
  const [mouseIsPressed, setMousePressed] = useState(false);

  const createNode = (row: number, column: number) => {
    return {
      isVisited: false,
      row,
      column,
      isWall: false,
      distance: Infinity,
      isStart: row === startNode[0] && column === startNode[1] ? true : false,
      isEnd: row === endNode[0] && column === endNode[1] ? true : false,
      prev: null,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    };
  };

  const getGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 60; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const [grid, setGrid] = useState<GridNode[][]>(getGrid());

  const handleMouseUp = (row: number, column: number) => {
    if (startNodeMoving) {
      setStartNode([row, column]);
      setStartNodeMoving(false);
    } else if (endNodeMoving) {
      setEndNode([row, column]);
      setEndNodeMoving(false);
    } else {
      setMousePressed(false);
    }
  };

  const handleMouseDown = (row: number, column: number) => {
    if (grid[row][column].isStart === true) {
      setStartNodeMoving(true);
    } else if (grid[row][column].isEnd === true) {
      setEndNodeMoving(true);
    } else {
      setMousePressed(true);
      const newGrid = changeWall(grid, row, column);
      setGrid(newGrid);
    }
  };

  const handleMouseEnter = (row: number, column: number) => {
    if (startNodeMoving) {
      const newGrid = changeNodePosition(
        grid,
        row,
        column,
        startNode[0],
        startNode[1],
        "start"
      );
      setGrid(newGrid);
    } else if (endNodeMoving) {
      const newGrid = changeNodePosition(
        grid,
        row,
        column,
        endNode[0],
        endNode[1],
        "end"
      );
      setGrid(newGrid);
    } else if (mouseIsPressed) {
      const newGrid = changeWall(grid, row, column);
      setGrid(newGrid);
    }
  };
  //Dijkstra

  const visualizeDijkstra = () => {
    const start = grid[startNode[0]][startNode[1]];
    const end = grid[endNode[0]][endNode[1]];

    const visitedNodes = dijkstra(grid, start, end);
    const path = getShortestPath(end);
    animateDijkstra(visitedNodes, path);
  };

  const animateDijkstra = (visitedNodes: GridNode[], path: GridNode[]) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const element = document.getElementById(`${node.row}-${node.column}`);
        if (element) {
          element.className = " node node-visited";
        }
      }, 2 * i);
    }

    const delay = 2 * visitedNodes.length;
    setTimeout(() => {
      animateShortestPath(path);
    }, delay);
  };
  //A*
  const visualizeAStar = () => {
    const start = grid[startNode[0]][startNode[1]];
    const end = grid[endNode[0]][endNode[1]];
    const visitedNodes: GridNode[] = astar(grid, start, end);
    const path = getShortestPath(end);
    animateAStar(path, visitedNodes);
  };

  const animateAStar = (path: GridNode[], visitedNodes: GridNode[]) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const element = document.getElementById(`${node.row}-${node.column}`);
        if (element) {
          element.className = " node node-visited";
        }
      }, 10 * i);
    }

    const delay = 10 * visitedNodes.length;
    setTimeout(() => {
      animateShortestPath(path);
    }, delay);
  };

  //Greedy
  const visualizeGreedy = () => {
    const start = grid[startNode[0]][startNode[1]];
    const end = grid[endNode[0]][endNode[1]];
    const visitedNodes: GridNode[] = greedyBestFirstSearch(grid, start, end);
    const path = getShortestPath(end);
    animateGreedy(path, visitedNodes);
  };

  const animateGreedy = (path: GridNode[], visitedNodes: GridNode[]) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const element = document.getElementById(`${node.row}-${node.column}`);
        if (element) {
          element.className = " node node-visited";
        }
      }, 4 * i);
    }

    let delay = 4 * visitedNodes.length;
    setTimeout(() => {
      animateShortestPath(path);
    }, delay);
  };

  const animateShortestPath = (path: GridNode[]) => {
    for (let node = 0; node < path.length; node++) {
      const element = document.getElementById(
        `${path[node].row}-${path[node].column}`
      );
      if (element) {
        setTimeout(() => {
          element.className = " node node-shortest-path";
        }, 50 * node);
      }
    }
  };

  const changeNodePosition = (
    grid: GridNode[][],
    row: number,
    column: number,
    pastRow: number,
    pastColumn: number,
    nodeType: "start" | "end"
  ) => {
    const newGrid = [...grid];
    const node = newGrid[row][column];
    const oldNode = newGrid[pastRow][pastColumn];
    const newOldNode = {
      ...oldNode,
      [nodeType === "start" ? "isStart" : "isEnd"]: false,
    };
    const newNode = {
      ...node,
      [nodeType === "start" ? "isStart" : "isEnd"]: true,
    };
    newGrid[row][column] = newNode;
    newGrid[pastRow][pastColumn] = newOldNode;
    if (nodeType === "start") {
      setStartNode([row, column]);
    } else {
      setEndNode([row, column]);
    }
    return newGrid;
  };

  return (
    <React.Fragment>
      <NavBar
        visualizeDijkstra={visualizeDijkstra}
        visualizeAStar={visualizeAStar}
        visualizeGreedy={visualizeGreedy}
      />{" "}
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((node, colIndex) => {
              const {
                isVisited,
                row,
                column,
                isWall,
                distance,
                isStart,
                isEnd,
                prev,
              } = node;
              return (
                <Node
                  distance={distance}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  onMouseDown={(row, column) => handleMouseDown(row, column)}
                  onMouseEnter={(row, column) => handleMouseEnter(row, column)}
                  onMouseUp={(row, column) => handleMouseUp(row, column)}
                  row={row}
                  column={column}
                />
              );
            })}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
const changeWall = (grid: GridNode[][], row: number, column: number) => {
  const newGrid = [...grid];
  const node = newGrid[row][column];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][column] = newNode;
  return newGrid;
};
