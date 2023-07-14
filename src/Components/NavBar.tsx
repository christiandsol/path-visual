import React from "react";
import "./NavBar.css";

interface Props {
  visualizeDijkstra: () => void;
  visualizeAStar: () => void;
  visualizeGreedy: () => void;
  visualizeSwarm: () => void;
  visualizeDepth: () => void;
  visualizeBreadth: () => void;
}

export const NavBar: React.FC<Props> = ({
  visualizeDijkstra,
  visualizeAStar,
  visualizeGreedy,
  visualizeSwarm,
  visualizeDepth,
  visualizeBreadth,
}) => {
  return (
    <div className="container">
      <button className="item" onClick={visualizeSwarm}>
        {" "}
        Swarm
      </button>
      <button className="item" onClick={visualizeDijkstra}>
        Click to Visualize
      </button>
      <button className="item" onClick={visualizeAStar}>
        A Start
      </button>
      <button className="item" onClick={visualizeGreedy}>
        Greedy
      </button>
      <button className="item" onClick={visualizeDepth}>
        Depth
      </button>
      <button className="item" onClick={visualizeBreadth}>
        Breadth
      </button>
    </div>
  );
};
