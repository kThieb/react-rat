import React, { CSSProperties } from "react";
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
  let node_style: any = {};
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor: [number, number] = neighbors[i];
    let neighborX = neighbor[0];
    let neighborY = neighbor[1];
    if (neighborX === node.x + 1)
      node_style.borderBottom = "1px solid rgb(96, 122, 133, 0.1)";
    if (neighborX === node.x - 1)
      node_style.borderTop = "1px solid rgb(96, 122, 133, 0.1)";
    if (neighborY === node.y + 1)
      node_style.borderRight = "1px solid rgb(96, 122, 133, 0.1)";
    if (neighborY === node.y - 1)
      node_style.borderLeft = "1px solid rgb(96, 122, 133, 0.1)";
  }

  const addEmoji: (node: node) => any = (node) => {
    if (node.hasCheese) {
      return (
        <span role="img" aria-label="cheese" className="content">
          🧀
        </span>
      );
    }
    if (node.isStart) {
      return (
        <span role="img" aria-label="rat" className="content">
          🐀
        </span>
      );
    }
    if (node.isEnd) {
      return (
        <span role="img" aria-label="rat" className="content">
          🐁
        </span>
      );
    }
    return <span></span>;
  };

  return (
    <div style={node_style} className={node.className}>
      {addEmoji(node)}
    </div>
  );
};

const areEqual: (prevProps: Props, nextProps: Props) => boolean = (
  prevProps,
  nextProps
) => {
  return prevProps.node.className === nextProps.node.className;
};

export const GridNode = React.memo(_GridNode, areEqual);
