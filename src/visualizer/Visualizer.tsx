import { Node } from "./Node/Node";
import React, { useState } from "react";
import { dijkstra, getShortestPath } from "../Algorithms/dijkstra";

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
};

export const Visualizer: React.FC<Props> = (props: Props) => {
  const [startNode, setStartNode] = useState([props.startRow, props.startCol]);
  const [startNodeMoving, setStartNodeMoving] = useState(false);
  const [mouseIsPressed, setMousePressed] = useState(false);

  const createNode = (row: number, column: number) => {
    return {
      isVisited: false,
      row,
      column,
      isWall: false,
      distance: Infinity,
      isStart: row === startNode[0] && column === startNode[1] ? true : false,
      isEnd: row === props.endRow && column === props.endCol ? true : false,
      prev: null,
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
    } else {
      setMousePressed(false);
    }
  };

  const handleMouseDown = (row: number, column: number) => {
    if (grid[row][column].isStart === true) {
      setStartNodeMoving(true);
    } else {
      setMousePressed(true);
      const newGrid = changeWall(grid, row, column);
      setGrid(newGrid);
    }
  };

  const handleMouseEnter = (row: number, column: number) => {
    if (startNodeMoving) {
      const newGrid = changeStartNode(
        grid,
        row,
        column,
        startNode[0],
        startNode[1]
      );
      setGrid(newGrid);
    } else if (mouseIsPressed) {
      const newGrid = changeWall(grid, row, column);
      setGrid(newGrid);
    }
  };

  const visualizeDijkstra = () => {
    const start = grid[startNode[0]][startNode[1]];
    const end = grid[props.endRow][props.endCol];

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

  const changeStartNode = (
    grid: GridNode[][],
    row: number,
    column: number,
    pastRow: number,
    pastColumn: number
  ) => {
    const newGrid = [...grid];
    const node = newGrid[row][column];
    const oldStartNode = newGrid[pastRow][pastColumn];
    const newOldStartNode = {
      ...oldStartNode,
      isStart: false,
    };
    const newNode = {
      ...node,
      isStart: true,
    };
    newGrid[row][column] = newNode;
    newGrid[pastRow][pastColumn] = newOldStartNode;
    setStartNode([row, column]);
    return newGrid;
  };

  return (
    <React.Fragment>
      <button onClick={visualizeDijkstra}>Click to Visualize</button>
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
