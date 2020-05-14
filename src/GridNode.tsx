import React, { useState } from "react";
import "./GridNode.css";
import { node } from "./usefulInterfaces";

interface Props {
  numberOfElementsPerRow: number;
  node: node;
  handleMouseUp: () => void;
  handleMouseEnter: (x: number, y: number) => void;
  handleMouseDown: (x: number, y: number) => void;
}

// This component represents a single Node in the grid rendered in the DOM
export const _GridNode: React.FC<Props> = ({
  numberOfElementsPerRow,
  node,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) => {
  const style = {
    flexBasis: `${100 / numberOfElementsPerRow}% - 1px`,
    backgroundColor: "white",
  };
  if (node.isStart) style.backgroundColor = "green";
  if (node.isEnd) style.backgroundColor = "red";

  return (
    <div
      className={node.className}
      style={style}
      onMouseDown={() => handleMouseDown(node.x, node.y)}
      onMouseEnter={() => handleMouseEnter(node.x, node.y)}
      onMouseUp={() => handleMouseUp()}
    ></div>
  );
};

const areEqual: (prevProps: Props, nextProps: Props) => boolean = (
  prevProps,
  nextProps
) => {
  return prevProps.node.className === nextProps.node.className;
};

export const GridNode = React.memo(_GridNode, areEqual);
