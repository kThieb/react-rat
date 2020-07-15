import { node } from "./usefulInterfaces";

// This function (Not a React Component!) is made to initialize the grid rendered in the App component.
export const constructGrid: (
  numberOfRows: number,
  numberOfColumn: number,
  startNode: [number, number],
  endNode: [number, number]
) => [node[][], node, node] = (
  numberOfRow,
  numberOfColumn,
  startNode,
  endNode
) => {
  let result: node[][] = [];
  for (let i: number = 0; i < numberOfColumn; i++) {
    let currentRow: node[] = [];
    for (let j: number = 0; j < numberOfRow; j++) {
      let currentNode = {
        id: i + j * numberOfColumn,
        x: i,
        y: j,
        isStart: false,
        isEnd: false,
        isVisited: false,
        isWall: false,
        isShortestPath: false,
        waitClassChange: 0,
        className: "grid-node",
      };
      currentRow.push(currentNode);
    }
    result.push(currentRow);
  }
  result[startNode[0]][startNode[1]] = {
    ...result[startNode[0]][startNode[1]],
    isStart: true,
    className: "grid-node start-node",
  };
  result[endNode[0]][endNode[1]] = {
    ...result[endNode[0]][endNode[1]],
    isEnd: true,
    className: "grid-node end-node",
  };
  return [
    result,
    result[startNode[0]][startNode[1]],
    result[endNode[0]][endNode[1]],
  ];
};
