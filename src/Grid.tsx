import React from "react";
import { GridNode } from "./GridNode";
import "./Grid.css";

interface Props {
  numberOfRows: number;
  numberOfElements: number;
}

export const Grid: React.FC<Props> = ({ numberOfRows, numberOfElements }) => {
  let constructRow: (
    numberOfElements: number,
    rowNumber: number
  ) => JSX.Element[] = (numberOfElements, j) => {
    let row: JSX.Element[] = [];
    for (let i: number = 0; i < numberOfElements; i++) {
      row.push(
        <GridNode x={i} y={j} numberOfElementsPerRow={numberOfElements} />
      );
    }
    return row;
  };

  let constructGrid: (
    numberOfRows: number,
    numberOfElements: number
  ) => JSX.Element[] = (numberOfRows, numberOfElements) => {
    let grid = [];
    for (let i: number = 0; i < numberOfRows; i++) {
      grid.push(<div className="row">{constructRow(numberOfElements, i)}</div>);
    }
    return grid;
  };

  return (
    <div className="grid">{constructGrid(numberOfRows, numberOfElements)}</div>
  );
};
