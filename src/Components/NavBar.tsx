import React from "react";
import "./NavBar.css";

interface Props {
  visualizeDijkstra: () => void;
  visualizeAStar: () => void;
  visualizeGreedy: () => void;
}

export const NavBar: React.FC<Props> = ({
  visualizeDijkstra,
  visualizeAStar,
  visualizeGreedy,
}) => {
  return (
    <div className="container">
      <p className="item">Choose An Algorithm</p>
      <button className="item" onClick={visualizeDijkstra}>
        Click to Visualize
      </button>
      <button className="item" onClick={visualizeAStar}>
        A Start
      </button>
      <button className="item" onClick={visualizeGreedy}>
        Greedy
      </button>
    </div>
  );
};
