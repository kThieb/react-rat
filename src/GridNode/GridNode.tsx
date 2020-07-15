import React, { useState } from "react";
import "./GridNode.css";
import { node } from "../helper_functions/usefulInterfaces";

interface Props {
  numberOfElementsPerRow: number;
  node: node;
  neighbors: [number, number][];
}

// This component represents a single Node in the grid rendered in the DOM
export const _GridNode: React.FC<Props> = ({
  numberOfElementsPerRow,
  node,
  neighbors,
}) => {
  // const style = {
  //   flexBasis: `${100 / numberOfElementsPerRow}% - 1px`,
  //   backgroundColor: "white",
  // };
  // if (node.isStart) style.backgroundColor = "green";
  // if (node.isEnd) style.backgroundColor = "red";

  let addedClassName: string = "";
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor: [number, number] = neighbors[i];
    let neighborX = neighbor[0];
    let neighborY = neighbor[1];
    if (neighborX === node.x + 1) addedClassName += " no-wall-bottom";
    if (neighborX === node.x - 1) addedClassName += " no-wall-top";
    if (neighborY === node.y + 1) addedClassName += " no-wall-right";
    if (neighborY === node.y - 1) addedClassName += " no-wall-left";
  }

  return <div className={node.className + addedClassName}></div>;
};

const areEqual: (prevProps: Props, nextProps: Props) => boolean = (
  prevProps,
  nextProps
) => {
  return prevProps.node.className === nextProps.node.className;
};

export const GridNode = React.memo(_GridNode, areEqual);
