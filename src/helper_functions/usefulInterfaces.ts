export interface node {
  id: number;
  x: number;
  y: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isShortestPath: boolean;
  className: string;
  waitClassChange: number;
  hasCheese: boolean;
}

export interface simplifiedNode {
  x: number;
  y: number;
}
