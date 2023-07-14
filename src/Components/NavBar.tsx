import React, { useState } from "react";
import "./NavBar.css";
import { GridNode } from "../visualizer/Visualizer";
import { swarmSearch } from "../Algorithms/Swarm";
import { dijkstra } from "../Algorithms/dijkstra";
import { astar } from "../Algorithms/A*";
import { greedyBestFirstSearch } from "../Algorithms/greedy";
import { depthFirstSearch } from "../Algorithms/depth";
import { breadthFirstSearch } from "../Algorithms/breadth";

type FunctionType = (
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode
) => GridNode[];

interface Props {
  visualize: (algorithm: FunctionType, number: number) => void;
}

export const NavBar: React.FC<Props> = ({ visualize }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleVisualizeClick = (number: number) => {
    const algorithmMap: { [key: string]: FunctionType } = {
      Swarm: swarmSearch,
      Dijkstra: dijkstra,
      AStar: astar,
      Greedy: greedyBestFirstSearch,
      Depth: depthFirstSearch,
      Breadth: breadthFirstSearch,
    };

    const selectedAlgorithmFunction = algorithmMap[selectedAlgorithm];
    if (selectedAlgorithmFunction) {
      visualize(selectedAlgorithmFunction, number);
    }
  };

  return (
    <div className="container">
      <select className="item" onChange={handleAlgorithmChange}>
        <option value="">Select an algorithm</option>
        <option value="Swarm">Swarm</option>
        <option value="Dijkstra">Dijkstra</option>
        <option value="AStar">A Star</option>
        <option value="Greedy">Greedy</option>
        <option value="Depth">Depth</option>
        <option value="Breadth">Breadth</option>
      </select>
      <button className="item" onClick={() => handleVisualizeClick(10)}>
        Visualize
      </button>
    </div>
  );
};
