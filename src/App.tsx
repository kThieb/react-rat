import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "./Grid";
import { NavBar, NavItem, DropDownMenu, DropDownItem } from "./NavBar";
import { SecondaryHeader } from "./SecondaryHeader";
import { node } from "./usefulInterfaces";
import { dijkstra } from "./dijkstra";

const NUMBER_OF_ROWS = 50;
const NUMBER_OF_COLUMN = 20;

// This function (Not a React Component!) is made to initialize the grid rendered in the App component.
const constructGrid: (
  numberOfRows: number,
  numberOfColumn: number,
  startNode: [number, number],
  endNode: [number, number]
) => [node[][], node, node] = (
  numberOfRow,
  numberOfColumn,
  startNode,
  endNode
) => {
  let result: node[][] = [];
  for (let i: number = 0; i < numberOfColumn; i++) {
    let currentRow: node[] = [];
    for (let j: number = 0; j < numberOfRow; j++) {
      let currentNode = {
        id: i + j * numberOfColumn,
        x: i,
        y: j,
        isStart: false,
        isEnd: false,
        isVisited: false,
        isWall: false,
        isShortestPath: false,
        waitClassChange: 0,
        className: "grid-node",
      };
      currentRow.push(currentNode);
    }
    result.push(currentRow);
  }
  result[startNode[0]][startNode[1]] = {
    ...result[startNode[0]][startNode[1]],
    isStart: true,
  };
  result[endNode[0]][endNode[1]] = {
    ...result[endNode[0]][endNode[1]],
    isEnd: true,
  };
  return [
    result,
    result[startNode[0]][startNode[1]],
    result[endNode[0]][endNode[1]],
  ];
};

// App component rendering everything in the webpage.
function App() {
  const [firstGrid, firstStartNode, firstEndNode] = constructGrid(
    NUMBER_OF_ROWS,
    NUMBER_OF_COLUMN,
    [9, 10],
    [9, 40]
  );

  const [grid, setGrid] = useState(firstGrid);
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
          className: "visited-node",
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
          className: "shortest-path-node",
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
        className: "wall-node",
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

  const handleMouseDown: (x: number, y: number) => void = (x, y) => {
    toggleWall(x, y);
    const newMouseIsPressed = !mouseIsPressed;
    setMouseIsPressed(newMouseIsPressed);
  };

  const handleMouseEnter: (x: number, y: number) => void = (x, y) => {
    if (mouseIsPressed) {
      toggleWall(x, y);
    }
  };

  const handleMouseUp: () => void = () => {
    const newMouseIsPressed = !mouseIsPressed;
    setMouseIsPressed(newMouseIsPressed);
  };

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
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        handleMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default App;
