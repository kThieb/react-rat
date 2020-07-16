import React, { useState, useEffect } from "react";
import "./Visualizer.css";
import { Grid } from "../Grid/Grid";
import { NavBar, NavItem, DropDownMenu, DropDownItem } from "../NavBar/NavBar";
import { SecondaryHeader } from "../SecondaryHeader/SecondaryHeader";
import { node } from "../helper_functions/usefulInterfaces";
import { dijkstra, dijkstraWithWalls } from "../helper_functions/dijkstra";
import { generateSquareMazeGraph } from "../helper_functions/mazeGenerators/squareMazeGenerator";
import { constructGrid } from "../helper_functions/constructGrid";

const NUMBER_OF_ROWS: number = 50;
const NUMBER_OF_COLUMN: number = 20;
const N: number = 11;

// We define these constants out of the functional component
// that the App uses to avoid re-running the functions to create
// these each time there is a re-render
const [firstGrid, firstStartNode, firstEndNode] = constructGrid(
  N,
  N,
  // NUMBER_OF_COLUMN,
  [0, 0],
  [N - 1, N - 1]
);

const [firstpairGrid, mazeGraph] = generateSquareMazeGraph(
  N,
  firstGrid,
  false,
  false
);

// Component rendering everything in the webpage.
const Visualizer: React.FC = () => {
  // States managing the grid
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
      }, 25 * i);
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
      }, 25 * n + 40 * i);
    }
  };

  // This function is passed to the drop down menu to handle the change of algorithm
  const handleAlgorithmChange: (algorithmName: string) => void = (
    algorithmName
  ) => {
    setAlgorithm(algorithmName);
  };

  // This function changes the algorithm that will be run, at the moment only dijkstra is implemented
  const chooseAlgorithm: (
    algorithmName: string
  ) => (
    grid: node[][],
    pairGrid: [number, number][][],
    mazeGraph: Map<[number, number], [number, number][]>,
    startNode: node,
    endNode: node
  ) => [node[], node[]] = (algorithmName) => {
    if (algorithmName === "dijkstraWithWalls") {
      return dijkstraWithWalls;
    }
    return dijkstraWithWalls;
  };

  // The following block of functions handles the making of walls in the grid
  // This feature is currently not used as it is not a good fit with the current direction of the app

  // const toggleWall: (x: number, y: number) => void = (x, y) => {
  //   const newGrid: node[][] = grid.slice();
  //   let newNode;
  //   if (!newGrid[x][y].isWall) {
  //     newNode = {
  //       ...newGrid[x][y],
  //       isWall: !newGrid[x][y].isWall,
  //       className: "grid-node wall-node",
  //     };
  //   } else {
  //     newNode = {
  //       ...newGrid[x][y],
  //       isWall: !newGrid[x][y].isWall,
  //       className: "grid-node",visited: node[], path: node[]
  //     };
  //   }
  //   newGrid[x][y] = newNode;
  //   setGrid(newGrid);
  // };

  // // handles the case when the mouse button is down
  // const handleMouseDown: (x: number, y: number) => void = (x, y) => {
  //   toggleWall(x, y);
  //   setMouseIsPressed(false);
  // };

  // // handles the case whan the mouse button is down and you enter a node
  // const handleMouseEnter: (x: number, y: number) => void = (x, y) => {
  //   if (mouseIsPressed) {
  //     toggleWall(x, y);
  //   }
  // };

  // // handles the case when you mouse up
  // const handleMouseUp: () => void = () => {
  //   setMouseIsPressed(false);
  // };

  // Render the app
  return (
    <div className="App">
      <NavBar>
        <div style={{ flexBasis: "7.5%" }}></div>
        <div
          className="nav-item"
          onClick={(e) => {
            visualizeAlgorithm(
              ...chooseAlgorithm(algorithm)(
                grid,
                pairGrid,
                mazeGraph,
                startNode,
                endNode
              )
            );
          }}
        >
          Visualize!
        </div>
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
              algorithmName="dijks.icon-button {
  --button-size: calc(var(--nav-size) * 0.5);
  height: 3vh;
  background-color: #484a4d;
  border-radius: 5px;
  padding: 5px;
  margin: 2px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}traWithWalls"
            >
              Dijkstra's algorithm with a maze
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
      {/* <SecondaryHeader>
        <button
          className="visualize-button"
          onClick={(e) => {
            visualizeAlgorithm(
              ...chooseAlgorithm(algorithm)(
                grid,
                pairGrid,
                mazeGraph,
                startNode,
                endNode
              )
            );
          }}
        >
          Visualize the path!
        </button>
      </SecondaryHeader> */}
      <Grid grid={grid} pairGrid={pairGrid} maze={maze} />
    </div>
  );
};

export default Visualizer;
