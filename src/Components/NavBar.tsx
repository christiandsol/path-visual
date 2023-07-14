import React from "react";
import "./NavBar.css";

interface Props {
  visualizeDijkstra: () => void;
}

export const NavBar: React.FC<Props> = ({ visualizeDijkstra }) => {
  return (
    <div className="container">
      <p className="item">Choose An Algorithm</p>
      <button className="item" onClick={visualizeDijkstra}>
        Click to Visualize
      </button>
      <p className="item">Add Another Cheese</p>
    </div>
  );
};
