import React from "react";
import { GridNode } from "./GridNode";
import "./Grid.css";
import { node } from "./usefulInterfaces";

interface Props {
  grid: node[][];
  handleMouseUp: () => void;
  handleMouseEnter: (x: number, y: number) => void;
  handleMouseDown: (x: number, y: number) => void;
}

export const Grid: React.FC<Props> = ({
  grid,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) => {
  // Renders the grid in the DOM thanks to the grid state in the App component
  return (
    <div className="grid">
      {grid.map((row, id) => {
        let rowLength = row.length;
        return (
          <div className="row" key={id}>
            {row.map((node, index) => (
              <GridNode
                numberOfElementsPerRow={rowLength}
                key={id + index * rowLength}
                node={node}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                handleMouseUp={handleMouseUp}
              ></GridNode>
            ))}
          </div>
        );
      })}
    </div>
  );
};
