import React from "react";
import "./GridNode.css";

interface Props {
  numberOfElementsPerRow: number;
  x: number;
  y: number;
}

export const GridNode: React.FC<Props> = ({ numberOfElementsPerRow, x, y }) => {
  return (
    <div
      className="grid-node"
      style={{ flexBasis: `${100 / numberOfElementsPerRow}% - 1px` }}
    ></div>
  );
};
