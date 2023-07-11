import React from "react";
import "./Node.css";
interface Props {
  distance: number;
  isWall: boolean;
  column: number;
  row: number;
  isEnd: boolean;
  isStart: boolean;
  onMouseDown: (row: number, column: number) => void;
  onMouseUp: (row: number, column: number) => void;
  onMouseEnter: (row: number, column: number) => void;
}
export const Node: React.FC<Props> = (props: Props) => {
  const {
    distance,
    isWall,
    column,
    row,
    isEnd,
    isStart,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
  } = props;
  return (
    <div
      id={`${row}-${column}`}
      className="node"
      onMouseDown={() => {
        onMouseDown(row, column);
      }}
      onMouseUp={() => {
        onMouseUp(row, column);
      }}
      onMouseEnter={() => {
        onMouseEnter(row, column);
      }}
    ></div>
  );
};

//Distance
//isWall
//extra class Name
//column
//row
//isEnd or isStart
//onMouseDown, onMouseEnter, onMouseUP
