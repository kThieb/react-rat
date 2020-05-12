export const dikjstra: (
  grid: JSX.Element,
  xStart: number,
  yStart: number
) => JSX.Element[] = (grid, xStart, yStart) => {
  let result: JSX.Element[] = [];

  console.log(grid.props);

  let visited: Set<JSX.Element> = new Set();
  let distances: number[][] = [];
  let rowDistances: number[] = [];
  //   rowDistances.fill(Infinity, 0, numberOfNodesPerRow);
  //   distances.fill(rowDistances, 0, numberOfRow);
  console.log(distances);

  return result;
};
