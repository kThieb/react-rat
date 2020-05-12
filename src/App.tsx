import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./Grid";
import { NavBar, NavItem, DropDownMenu } from "./NavBar";

function App() {
  return (
    <div className="App">
      <NavBar>
        <NavItem icon="&#128512;">
          <DropDownMenu></DropDownMenu>
        </NavItem>
      </NavBar>
      <Grid numberOfRows={15} numberOfElements={30} />
    </div>
  );
}

export default App;
