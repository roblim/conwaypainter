const NEIGHBORS = [
  [0, -1],
  [1, -1],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0]
];

class Cell {
  constructor(q, r, universe, alive = Math.floor((Math.random() * 2)*.53)) {
    this.coord = { q, r, s: (-q - r) };
    this.alive = alive;
    this.universe = universe;
  }

  getStatus(q, s) {
    const cell = this.universe.getCell(q, s);
    return cell.alive;
  }

  getHeadcount() {
    const neighbors = this.getNeighborCoords();
    const headcount = neighbors.reduce((accum, coord) => {
      return accum + this.getStatus(coord[0], coord[1]);
    }, 0);
    return headcount;
  }

  spawn() {
    this.alive = 1;
  }

  die() {
    this.alive = 0;
  }

  updateStatus() {
    const heads = this.getHeadcount();
    switch(this.alive) {
      case 0:
        if (heads === 2) { this.spawn(); }
        break;
      case 1:
        switch(heads) {
          case 0:
            this.die();
            break;
          case 1:
            this.die();
            break;
          case 2:
            this.die();
            break;
          case 5:
            this.die();
            break;
          case 6:
            this.die();
            break;
        };
        break;
    };
  }

  getNeighborCoords() {
    const neighbors = [];
    const q = this.coord.q;
    const s = this.coord.s;
    NEIGHBORS.forEach(delta => {
      const coord = [q + delta[0], s + delta[1]];
      neighbors.push(coord);
    });
    return neighbors;
  }
}

export default Cell;
