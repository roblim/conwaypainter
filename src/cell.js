const NEIGHBORS = [
  [0, -1],
  [1, -1],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0]
];

class Cell {
  constructor(q, r, s, universe, alive = Math.floor((Math.random() * 2)*.55 )) {
    this.coord = { q, r, s };
    this.alive = alive;
    this.universe = universe;
    this.pixelCoord = this.hexToPixel(q, s, universe.cellSize);
  }

  hexToPixel(q, s, size) {
    const x = (Math.sqrt(3) * q + Math.sqrt(3) / 2 * s) * size;
    const y = (3 / 2) * s * size;
    const pixelCoord = { x: x, y: y };
    return pixelCoord;
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

  newStatus() {
    const heads = this.getHeadcount();
    let newStatus;
    switch(this.alive) {
      case 0:
        if (heads === 2) {
          newStatus = 1;} else {
            newStatus = this.alive;
          }
        break;
      case 1:
        switch(heads) {
          case 0:
            newStatus = 0;
            break;
          case 1:
            newStatus = 0;
            break;
          case 2:
            newStatus = 0;
            break;
          case 5:
            newStatus = 0;
            break;
          case 6:
            newStatus = 0;
            break;
          default:
            newStatus = this.alive;
            break;
        };
        break;
    };
    const updatedCell = new Cell(this.coord.q, this.coord.r, this.coord.s, this.universe, newStatus);
    return updatedCell;
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
