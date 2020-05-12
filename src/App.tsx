import React, { useState } from "react";
import "./App.css";
import { Grid } from "./Grid";
import { NavBar, NavItem, DropDownMenu } from "./NavBar";
import { SecondaryHeader } from "./SecondaryHeader";
import { dikjstra } from "./Dikjstra";
import { node } from "./nodeInterface";

const NUMBER_OF_ROWS = 50;
const NUMBER_OF_COLUMN = 20;

// This function (Not a React Component!) is made to initialize the grid rendered in the App component.
const constructGrid: (
  numberOfRows: number,
  numberOfColumn: number,
  startNode: [number, number],
  endNode: [number, number]
) => node[][] = (numberOfRow, numberOfColumn, startNode, endNode) => {
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
  return result;
};

// App component rendering everything in the webpage.
function App() {
  const [grid, setGrid] = useState(
    constructGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMN, [10, 10], [10, 40])
  );

  dikjstra(grid, grid[10][10], grid[10][40]);

  return (
    <div className="App">
      <NavBar>
        <NavItem icon="&#128512;">
          <DropDownMenu></DropDownMenu>
        </NavItem>
      </NavBar>
      <SecondaryHeader></SecondaryHeader>
      <Grid grid={grid} />
    </div>
  );
}

export default App;
