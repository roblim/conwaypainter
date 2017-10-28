import CONSTANTS from './constants';

const { NEIGHBORS } = CONSTANTS;

class Cell {
  constructor(q, r, s, universe, state) {
    this.coord = { q, r, s };
    this.state = state;
    this.universe = universe;
    this.pixelCoord = this.hexToPixel(q, s, universe.cellSize);
    this.neighborCoords = this.getNeighborCoords(q, s);
  }

  // converts axial coordinate to pixel coordinate
  hexToPixel(q, s, size) {
    const x = (Math.sqrt(3) * q + Math.sqrt(3) / 2 * s) * size;
    const y = (3 / 2) * s * size;
    const pixelCoord = { x: x, y: y };
    return pixelCoord;
  }

  getState(q, s) {
    const cell = this.universe.getCell(q, s);
    return cell.state;
  }

  getHeadcount() {
    const headcount = this.neighborCoords.reduce((accum, coord) => {
      return accum + this.getState(coord[0], coord[1]);
    }, 0);
    return headcount;
  }

  newState() {
    const heads = this.getHeadcount();
    let newState;
    switch(this.state) {
      case 0:
        if (heads === 4) {
          newState = 1;} else {
            newState = 0;
          }
        break;
      case 1:
        switch(heads) {
          case 1:
            newState = 2;
            break;
          case 2:
            newState = 2;
            break;
          case 3:
            newState = 2;
            break;
          case 4:
            newState = 2;
            break;
          case 6:
            newState = 2;
            break;
          default:
            newState = 0;
            break;
          };
        break;
      case 2:
        switch(heads) {
          case 1:
            newState = 2;
            break;
          case 2:
            newState = 1;
            break;
          case 3:
            newState = 0;
            break;
          case 4:
            newState = 1;
            break;
          default:
            newState = 0;
            break;
        };
        break;
    };
    return newState;
  }

  getNeighborCoords(q, s) {
    const neighbors = [];
    NEIGHBORS.forEach(delta => {
      const coord = [q + delta[0], s + delta[1]];
      neighbors.push(coord);
    });
    return neighbors;
  }
}

export default Cell;
