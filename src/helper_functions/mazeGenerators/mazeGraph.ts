import { node } from "../usefulInterfaces";

// TODO: Refactor the code to use the different key-values pair as the nodes get changed when there is a setGrid that is applied

const createMazeGraph: (
  rowLength: number,
  columnLength: number,
  grid: node[][]
) => [[number, number][][], Map<[number, number], [number, number][]>] = (
  rowLength,
  columnLength,
  grid
) => {
  let pairGrid: [number, number][][] = [];
  for (let i: number = 0; i < rowLength; i++) {
    let pairRow: [number, number][] = [];
    for (let j: number = 0; j < columnLength; j++) {
      let currentNode: node = grid[i][j];
      pairRow.push([currentNode.x, currentNode.y]);
    }
    pairGrid.push(pairRow);
  }

  // Create the maze graph
  let mazeGraph: Map<[number, number], [number, number][]> = new Map();
  for (let i: number = 0; i < rowLength; i++) {
    for (let j: number = 0; j < columnLength; j++) {
      mazeGraph.set(pairGrid[i][j], []);
    }
  }
  return [pairGrid, mazeGraph];
};

export const generateMazeGraph: (
  rowLength: number,
  columnLength: number,
  grid: node[][]
  // verticalSymetry: boolean,
  // centralSymetry: boolean
) => [[number, number][][], Map<[number, number], [number, number][]>] = (
  rowLength,
  columnLength,
  grid
) => {
  let [pairGrid, mazeGraph] = createMazeGraph(rowLength, columnLength, grid);

  // 1. Choose the initial cell, mark it as visited and push it to the stack
  let startNode: [number, number] = pairGrid[0][0];
  let stack: [number, number][] = [startNode];
  let visited = new Set([startNode]);

  // 2. While the stack is not empty
  while (stack.length > 0) {
    // 1. Pop a cell from the stack and make it a current cell
    let currentNode: [number, number] = ensure(stack.pop());
    let currentNonVisitedNeighbors: [number, number][] = getNeighbors(
      pairGrid,
      currentNode,
      rowLength,
      columnLength,
      visited
    );
    // 2. If the current cell has any neighbours which have not been visited
    if (currentNonVisitedNeighbors.length > 0) {
      // 1. Push the current cell to the stack
      stack.push(currentNode);

      // 2. Choose one of the unvisited neighbours
      let randIndex: number = Math.floor(
        Math.random() * currentNonVisitedNeighbors.length
      );
      let neighborNode: [number, number] =
        currentNonVisitedNeighbors[randIndex];

      // 3. Remove the wall between the current cell and the chosen cell
      let currentNodeNeighbors: [number, number][] = ensure(
        mazeGraph.get(currentNode)
      );
      currentNodeNeighbors.push(neighborNode);
      mazeGraph.set(currentNode, currentNodeNeighbors);

      let neighborNodeNeighbors: [number, number][] = ensure(
        mazeGraph.get(neighborNode)
      );
      neighborNodeNeighbors.push(currentNode);
      mazeGraph.set(neighborNode, neighborNodeNeighbors);

      // 4. Mark the chosen cell as visited and push it to the stack
      visited.add(neighborNode);
      stack.push(neighborNode);
    }
  }
  return [pairGrid, mazeGraph];
};

const getNeighbors: (
  grid: [number, number][][],
  currentNode: [number, number],
  rowLength: number,
  columnLength: number,
  visited: any
  // verticalSymetry: boolean,
  // centralSymetry: boolean
) => [number, number][] = (
  pairGrid,
  currentNode,
  rowLength,
  columnLength,
  visited
) => {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  let neighbors: [number, number][] = [];
  let neighborX: number = -1;
  let neighborY: number = -1;

  for (const dir of directions) {
    neighborX = currentNode[0] + dir[0];
    neighborY = currentNode[1] + dir[1];
    if (
      neighborX >= 0 &&
      neighborX < columnLength &&
      neighborY >= 0 &&
      neighborY < rowLength
    ) {
      neighbors.push(pairGrid[neighborX][neighborY]);
    }
  }

  let newNeighbors: [number, number][] = [];
  for (let i: number = 0; i < neighbors.length; i++) {
    if (!visited.has(neighbors[i])) {
      newNeighbors.push(neighbors[i]);
    }
  }

  return newNeighbors;
};

function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
