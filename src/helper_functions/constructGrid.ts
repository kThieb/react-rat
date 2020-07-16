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
        isShortestPath: false,
        waitClassChange: 0,
        className: "grid-node",
        hasCheese: false,
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
  result = piecesOfCheese(result, numberOfColumn, numberOfRow, 21);
  return [
    result,
    result[startNode[0]][startNode[1]],
    result[endNode[0]][endNode[1]],
  ];
};

const piecesOfCheese: (
  grid: node[][],
  m: number,
  n: number,
  cheeseNum: number
) => node[][] = (grid, m, n, cheeseNum) => {
  let visited: boolean[][] = new Array(n);
  for (let i: number = 0; i < n; ++i) {
    visited[i] = new Array(n);
  }
  for (let i: number = 0; i < n; ++i) {
    for (let j: number = 0; j < n; ++j) {
      visited[i][j] = false;
    }
  }

  visited[0][0] = true;
  visited[n - 1][n - 1] = true;
  for (let k: number = 0; k < cheeseNum / 2; k++) {
    let i = -1,
      j = -1;
    do {
      i = Math.floor(Math.random() * n);
      j = Math.floor(Math.random() * n);
    } while (visited[i][j]);
    visited[i][j] = true;
    visited[n - 1 - i][n - 1 - j] = true;
    grid[i][j].hasCheese = true;
    grid[n - 1 - i][n - 1 - j].hasCheese = true;
  }
  grid[Math.floor(n / 2)][Math.floor(n / 2)].hasCheese = true;
  return grid;
};
