import { node } from "../usefulInterfaces";

const createMazeGraph: (
  n: number,
  grid: node[][]
) => [[number, number][][], Map<[number, number], [number, number][]>] = (
  n,
  grid
) => {
  // Create the grid
  let pairGrid: [number, number][][] = [];
  for (let i: number = 0; i < n; i++) {
    let pairRow: [number, number][] = [];
    for (let j: number = 0; j < n; j++) {
      let currentNode: node = grid[i][j];
      pairRow.push([currentNode.x, currentNode.y]);
    }
    pairGrid.push(pairRow);
  }

  // Create the maze graph
  let mazeGraph: Map<[number, number], [number, number][]> = new Map();
  for (let i: number = 0; i < n; i++) {
    for (let j: number = 0; j < n; j++) {
      mazeGraph.set(pairGrid[i][j], []);
    }
  }
  return [pairGrid, mazeGraph];
};

export const generateSquareMazeGraph: (
  n: number,
  grid: node[][],
  symmetry: boolean
) => [[number, number][][], Map<[number, number], [number, number][]>] = (
  n,
  grid,
  symmetry
) => {
  let [pairGrid, mazeGraph] = createMazeGraph(n, grid);
  // 1. Choose the initial cell, mark it as visited and push it to the stack
  let startNode: [number, number] = pairGrid[0][0];
  let stack: [number, number][] = [startNode];
  let visited = new Set([startNode]);

  // 2. While the stack is not empty
  while (stack.length > 0) {
    // 1.1 Pop a cell from the stack and make it a current cell
    let currentNode: [number, number] = stack.pop() ?? [0, 0];

    // 1.2 Get the symmetric of the currentNode
    let symmetricNode: [number, number] =
      pairGrid[n - 1 - currentNode[0]][n - 1 - currentNode[1]];

    let currentNonVisitedNeighbors: [number, number][] = getSquareNeighbors(
      pairGrid,
      currentNode,
      n,
      visited,
      symmetry
    );
    // 2. If the current cell has any neighbours which have not been visited
    if (currentNonVisitedNeighbors.length > 0) {
      // 1. Push the current cell to the stack
      stack.push(currentNode);

      // 2.1 Choose one of the unvisited neighbours
      let randIndex: number = Math.floor(
        Math.random() * currentNonVisitedNeighbors.length
      );
      let neighborNode: [number, number] =
        currentNonVisitedNeighbors[randIndex];

      // 2.2 Get the symmetric of the chosen node
      let neighborSymmetricNode: [number, number] = [0, 0];
      if (symmetry) {
        neighborSymmetricNode =
          pairGrid[n - 1 - neighborNode[0]][n - 1 - neighborNode[1]];
      }

      // 3.1 Remove the wall between the current cell and the chosen cell
      let currentNodeNeighbors: [number, number][] =
        mazeGraph.get(currentNode) ?? [];
      currentNodeNeighbors.push(neighborNode);
      mazeGraph.set(currentNode, currentNodeNeighbors);

      let neighborNodeNeighbors: [number, number][] =
        mazeGraph.get(neighborNode) ?? [];
      neighborNodeNeighbors.push(currentNode);
      mazeGraph.set(neighborNode, neighborNodeNeighbors);

      // 3.2 Remove the wall between the current symmetric cell and the chosen cell
      if (symmetry) {
        let symmetricNodeNeighbors: [number, number][] =
          mazeGraph.get(symmetricNode) ?? [];

        symmetricNodeNeighbors.push(neighborSymmetricNode);
        mazeGraph.set(symmetricNode, symmetricNodeNeighbors);

        let neighborSymmetricNodeNeighbors: [number, number][] =
          mazeGraph.get(neighborSymmetricNode) ?? [];
        neighborSymmetricNodeNeighbors.push(symmetricNode);
        mazeGraph.set(neighborSymmetricNode, neighborSymmetricNodeNeighbors);
      }

      // 4. Mark the chosen cell as visited and push it to the stack
      visited.add(neighborNode);
      stack.push(neighborNode);
    }
  }
  return [pairGrid, mazeGraph];
};

const getSquareNeighbors: (
  grid: [number, number][][],
  currentNode: [number, number],
  n: number,
  visited: any,
  symmetry: boolean
) => [number, number][] = (pairGrid, currentNode, n, visited, symmetry) => {
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

    if (neighborX >= 0 && neighborY >= 0) {
      if (symmetry) {
        if (!(neighborX + neighborY < n)) continue;
      } else if (neighborX >= n || neighborY >= n) continue;
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
