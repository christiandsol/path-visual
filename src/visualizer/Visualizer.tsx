import { Node } from "./Node/Node";
import React, { useState } from "react";
interface Props {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}
export const Visualizer: React.FC<Props> = (props: Props) => {
  //Mouse functions
  const [mouseIsPressed, setMousePressed] = useState(false);
  const handleMouseUp = (row: number, column: number) => {
    setMousePressed(false);
  };
  const handleMouseDown = (row: number, column: number) => {
    setMousePressed(true);
  };
  const handleMouseEnter = (row: number, column: number) => {
    if (mouseIsPressed) {
      setMousePressed(true);
    }
  };

  //grid functionality:
  const getGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 60; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (row: number, column: number) => {
    return {
      isVisited: false,
      row,
      column,
      isWall: false,
      distance: Infinity,
      isStart:
        row === props.startRow && column === props.startCol ? true : false,
      isEnd: row === props.endRow && column === props.endCol ? true : false,
      prev: null,
    };
  };

  //JSX
  const grid = getGrid();
  return (
    <React.Fragment>
      {
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
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={(row, col) => handleMouseUp(row, col)}
                    row={row}
                    column={column}
                  />
                );
              })}
            </div>
          ))}
        </div>
      }
    </React.Fragment>
  );
};
