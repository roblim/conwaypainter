const NEIGHBORS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 0],
  [1, -1],
  [0, -1]
];

class Cell {
  constructor(q, r, alive = Math.floor((Math.random() * 2))) {
    this.coord = { q, r, s: (-q - r) };
    this.alive = alive
  }
}

export default Cell;
