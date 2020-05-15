import { node } from "./usefulInterfaces";
import { BinaryHeap } from "./binaryHeap";

export const dijkstra: (
  grid: node[][],
  startNode: node,
  targetNode: node
) => [node[], node[]] = (grid, startNode, endNode) => {
  const m = grid.length,
    n = grid[0].length;

  // Initialize the distances array
  const distances: number[][] = [];
  for (let i: number = 0; i < m; i++) {
    distances.push([]);
    for (let j: number = 0; j < n; j++) {
      distances[i].push(Number.MAX_SAFE_INTEGER);
    }
  }

  distances[startNode.x][startNode.y] = 0;

  // Initialize the predecessor array
  const predecessor: node[] = [];
  predecessor.fill(startNode, 0, m * n);
  predecessor[startNode.id] = startNode;

  // Initialize the visited nodes array
  let visited: node[] = [];

  // Initialize the directions array we will use to perform Dijkstra's algorithm
  const directions: number[][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  //   Initialize the Binary Heap
  let pq: BinaryHeap<node> = new BinaryHeap<node>(
    (n: node) => distances[n.x][n.y]
  );
  pq.push(startNode);

  while (pq.size() > 0) {
    let currentNode: node = ensure(pq.pop());

    // add the current node to the visited nodes
    // currentNode.isVisited = true;
    visited.push(currentNode);

    // Get the coordinates of the nodes
    let currentX: number = currentNode.x;
    let currentY: number = currentNode.y;

    // Iterate the neighbors of the node
    for (const dir of directions) {
      // Get the coordinates of the next node
      let nextX: number = currentX + dir[0];
      let nextY: number = currentY + dir[1];

      // Check if the coordinates are valid
      if (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n) {
        let nextNode: node = grid[nextX][nextY];

        if (nextNode.isWall) continue;

        // If the node is not yet visited, remove it from the heap and
        // put it back in with its new distance as the score function
        if (!visited.find((currentNode) => currentNode === nextNode)) {
          pq.remove(nextNode);
          pq.push(nextNode);
        }

        // Calculate the distance between the current node and the next node
        // To Do: take into account the weight of the path
        let currentDistance: number = distances[currentX][currentY] + 1;

        // If the distance is less than the distance in the array distances,
        // change it and change the predecessor of the next node to be the current one
        if (currentDistance < distances[nextX][nextY]) {
          predecessor[nextNode.id] = currentNode;
          distances[nextX][nextY] = currentDistance;
        }

        // If we found the target node then we return what we need
        if (nextNode === endNode) {
          // Retrieve the shortest path
          const shortestPath = retrieveShortestPath(
            predecessor,
            startNode,
            endNode
          );
          visited.shift();
          // return the correct value
          return [visited, shortestPath];
        }
      }
    }
  }

  return [visited, []];
};

// This function retrieves the shortest path from the predecessor array from Dijkstra's algorithm
const retrieveShortestPath: (
  predecessor: node[],
  startNode: node,
  endNode: node
) => node[] = (predecessor, startNode, endNode) => {
  let shortestPath = [];
  let current = endNode;
  while (current !== startNode) {
    current = predecessor[current.id];
    shortestPath.unshift(current);
  }
  shortestPath.shift();

  return shortestPath;
};

// This function is here to ensure that a value is not undefined (especially when using arrays).
function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
