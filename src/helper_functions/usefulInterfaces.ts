export interface node {
  id: number;
  x: number;
  y: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isWall: boolean;
  isShortestPath: boolean;
  className: string;
  waitClassChange: number;
}

export interface simplifiedNode {
  x: number;
  y: number;
}
