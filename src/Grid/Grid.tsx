import React from "react";
import { GridNode } from "../GridNode/GridNode";
import "./Grid.css";
import { node } from "../helper_functions/usefulInterfaces";

interface Props {
  grid: node[][];
  maze: Map<[number, number], [number, number][]>;
  pairGrid: [number, number][][];
}

export const Grid: React.FC<Props> = ({ grid, maze, pairGrid }) => {
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
                neighbors={ensure(maze.get(pairGrid[node.x][node.y]))}
              ></GridNode>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// This function is there to ensure that a value is not null or undefined
function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
