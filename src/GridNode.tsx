import React from "react";
import "./GridNode.css";
import { node } from "./nodeInterface";

interface Props {
  numberOfElementsPerRow: number;
  node: node;
}

// This component represents a single Node in the grid rendered in the DOM
export const GridNode: React.FC<Props> = ({ numberOfElementsPerRow, node }) => {
  const style = {
    flexBasis: `${100 / numberOfElementsPerRow}% - 1px`,
    backgroundColor: "white",
  };
  if (node.isStart) style.backgroundColor = "green";
  if (node.isEnd) style.backgroundColor = "red";

  return <div className="grid-node" style={style}></div>;
};
