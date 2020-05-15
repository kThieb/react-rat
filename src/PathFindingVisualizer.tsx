import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "./Grid";
import { NavBar, NavItem, DropDownMenu, DropDownItem } from "./NavBar";
import { SecondaryHeader } from "./SecondaryHeader";
import { node } from "./usefulInterfaces";
import { dijkstra } from "./dijkstra";
import { generateMazeGraph } from "./mazeGraph";
import { constructGrid } from "./constructGrid";

const NUMBER_OF_ROWS: number = 50;
const NUMBER_OF_COLUMN: number = 20;

// We define these constants out of the functional component
// that the App uses to avoid re-running the functions to create
// these each time there is a re-render
const [firstGrid, firstStartNode, firstEndNode] = constructGrid(
  NUMBER_OF_ROWS,
  NUMBER_OF_COLUMN,
  [9, 10],
  [9, 40]
);

const [firstpairGrid, mazeGraph] = generateMazeGraph(
  NUMBER_OF_ROWS,
  NUMBER_OF_COLUMN,
  firstGrid
);

// Component rendering everything in the webpage.
const PathFindingVisualizer: React.FC = () => {
  const [grid, setGrid] = useState(firstGrid);
  const [maze, setMaze] = useState(mazeGraph);
  const [pairGrid, setPairGrid] = useState(firstpairGrid);
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  // States of the start and end node
  const [startNode, setStartNode] = useState(firstStartNode);
  const [endNode, setEndNode] = useState(firstEndNode);

  // This function is there to visualize the algorithm chosen in the drop down menu
  const visualizeAlgorithm: (visited: node[], path: node[]) => void = (
    visited,
    path
  ) => {
    const n = visited.length;
    for (let i: number = 0; i < n; i++) {
      setTimeout(() => {
        const newGrid = grid.slice();
        const node = visited[i];
        // define the x and y of the current node
        const x: number = node.x;
        const y: number = node.y;
        const newNode = {
          ...node,
          isVisited: true,
          className: "grid-node visited-node",
          waitClassChange: 0,
        };
        newGrid[x][y] = newNode;
        setGrid(newGrid);
      }, 20 * i);
    }

    const m = path.length;
    for (let i: number = 0; i < m; i++) {
      setTimeout(() => {
        const newGrid = grid.slice();
        const node = path[i];
        // define the x and y of the current node
        const x: number = node.x;
        const y: number = node.y;
        const newNode = {
          ...node,
          isShortestPath: true,
          className: "grid-node shortest-path-node",
          waitClassChange: 0,
        };
        newGrid[x][y] = newNode;
        setGrid(newGrid);
      }, 25 * n + 25 * i);
    }
  };

  // This function is passed to the drop down menu to handle the change of algorithm
  const handleAlgorithmChange: (algorithmName: string) => void = (
    algorithmName
  ) => {
    setAlgorithm(algorithmName);
  };

  // This function changes the algorithm that will be run
  const chooseAlgorithm: (
    algorithmName: string
  ) => (grid: node[][], startNode: node, endNode: node) => [node[], node[]] = (
    algorithmName
  ) => {
    if (algorithmName === "dijkstra") {
      return dijkstra;
    }
    return dijkstra;
  };

  // The following functions handles the making of walls in the grid
  const toggleWall: (x: number, y: number) => void = (x, y) => {
    const newGrid: node[][] = grid.slice();
    let newNode;
    if (!newGrid[x][y].isWall) {
      newNode = {
        ...newGrid[x][y],
        isWall: !newGrid[x][y].isWall,
        className: "grid-node wall-node",
      };
    } else {
      newNode = {
        ...newGrid[x][y],
        isWall: !newGrid[x][y].isWall,
        className: "grid-node",
      };
    }
    newGrid[x][y] = newNode;
    setGrid(newGrid);
  };

  // handles the case when the mouse button is down
  const handleMouseDown: (x: number, y: number) => void = (x, y) => {
    toggleWall(x, y);
    setMouseIsPressed(false);
  };

  // handles the case whan the mouse button is down and you enter a node
  const handleMouseEnter: (x: number, y: number) => void = (x, y) => {
    if (mouseIsPressed) {
      toggleWall(x, y);
    }
  };

  // handles the case when you mouse up
  const handleMouseUp: () => void = () => {
    setMouseIsPressed(false);
  };

  // Render the app
  return (
    <div className="App">
      <NavBar>
        <NavItem icon="&#128512;">
          <DropDownMenu>
            <DropDownItem
              changeAlgorithm={handleAlgorithmChange}
              algorithmName="dijkstra"
            >
              Dijkstra's algorithm
            </DropDownItem>
            <DropDownItem
              changeAlgorithm={handleAlgorithmChange}
              algorithmName="A*"
            >
              A* Algorithm
            </DropDownItem>
            <DropDownItem
              changeAlgorithm={handleAlgorithmChange}
              algorithmName="greedy"
            >
              Greedy Algorithm
            </DropDownItem>
          </DropDownMenu>
        </NavItem>
      </NavBar>
      <SecondaryHeader>
        <button
          className="visualize-button"
          onClick={(e) => {
            visualizeAlgorithm(
              ...chooseAlgorithm(algorithm)(grid, startNode, endNode)
            );
          }}
        >
          Visualize the path!
        </button>
      </SecondaryHeader>
      <Grid
        grid={grid}
        pairGrid={pairGrid}
        maze={maze}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        handleMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default PathFindingVisualizer;
