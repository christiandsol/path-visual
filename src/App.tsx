import React from "react";
import "./App.css";
import { Visualizer } from "./visualizer/Visualizer";
import { NavBar } from "./Components/NavBar";
//[row-col]
const START_ROW = 15;
const START_COL = 15;
const END_ROW = 15;
const END_COL = 45;

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Visualizer
        startRow={START_ROW}
        startCol={START_COL}
        endCol={END_COL}
        endRow={END_ROW}
      />
    </>
  );
}

export default App;
