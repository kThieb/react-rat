import React from "react";
import { GridNode } from "./GridNode";
import "./Grid.css";

interface Props {
  grid: number[][];
}

export const Grid: React.FC<Props> = ({ grid }) => {
  return (
    <div className="grid">
      {grid.map((row, id) => {
        let rowLength = row.length;
        return (
          <div className="row">
            {row.map((node, index) => (
              <GridNode
                numberOfElementsPerRow={rowLength}
                x={id}
                y={index}
                stateOfNode={node}
              ></GridNode>
            ))}
          </div>
        );
      })}
    </div>
  );
};
