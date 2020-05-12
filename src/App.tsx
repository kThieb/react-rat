import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./Grid";
import { NavBar, NavItem, DropDownMenu } from "./NavBar";
import { SecondaryHeader } from "./SecondaryHeader";
import { dikjstra } from "./Dikjstra";

const NUMBER_OF_ROWS = 50;
const NUMBER_OF_COLUMN = 20;

const constructGrid: (
  numberOfRows: number,
  numberOfColumn: number
) => number[][] = (numberOfRow, numberOfColumn) => {
  let result: number[][] = [];
  for (let i: number = 0; i < numberOfColumn; i++) {
    let currentRow: number[] = [];
    for (let j: number = 0; j < numberOfRow; j++) {
      currentRow.push(0);
    }
    result.push(currentRow);
  }
  return result;
};

function App() {
  let newGrid: number[][] = [];

  const [grid, setGrid] = useState(
    constructGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMN)
  );

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
