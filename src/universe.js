import Cell from './cell';
import Painter from './painter';

class Universe {
  constructor(width, height, cellSize, sketch, seed)  {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.gridWidth = Math.floor((width / cellSize) * 0.68);
    this.gridHeight = Math.floor((height / cellSize) * 0.7);
    this.grid = this.generateGrid(seed);
    this.tempGrid = this.generateGrid(seed);
    this.painter = new Painter(this, sketch);
  }

  generateGrid(seed) {
    let q;
    let r;
    let qStart = 1;
    let rStart = 0;
    let grid = [];
    let tempRow = [];

    for (let i = 0; i < this.gridHeight; i++) {
      if (i % 2 === 0) {
        qStart --;
      }
      q = qStart;
      if (i % 2 !== 0) {
        rStart --;
      }
      r = rStart;

      for (let j = 0; j < this.gridWidth; j++) {
        const s = (-q - r);
        tempRow.push(new Cell(q, r, s, this, seed));
        q++;
        r--;
      };
      grid.push(tempRow);
      tempRow = [];
    };
    return grid;
  }

  clearGrid() {
    this.grid = this.generateGrid(0);
  }

  resetGridRandom() {
    this.grid = this.generateGrid();
  }

  // converts a rectangular pixel coordinate to an axial coordinate
  pixelToHex(x, y) {
    const q = (x * (Math.sqrt(3) / 3) - (y / 3)) / this.cellSize;
    const s = (y * (2 / 3)) / this.cellSize;
    return this.roundHex(q, s);
  }

  // pixel coordinates can be floats and can yield non-integer axial coordinates
  // this function rounds non-integer axial coordinates
  roundHex(q, s) {
    let r = -q - s
    let rQ = Math.round(q);
    let rR = Math.round(r);
    let rS = Math.round(s);
    const qDiff = Math.abs(rQ - q);
    const rDiff = Math.abs(rR - r);
    const sDiff = Math.abs(rS - s);

    if (qDiff > rDiff && qDiff > sDiff) {
      rQ = -rR - rS;
    } else if (rDiff > sDiff) {
      rR = -rQ - rS;
    } else {
      rS = -rQ - rR;
    }
    return { q: rQ, s: rS };
  }

  // returns cell at a given axial coordinate
  getCell(q, s) {
    return this.grid[s][q + Math.floor(s / 2)];
  }

  // returns cell at a given pixel coordinate
  getCellPixel(x, y) {
    const hexCoord = this.pixelToHex(x, y);
    return this.getCell(hexCoord.q, hexCoord.s);
  }

  setCell(x, y, state) {
    const hexCoord = this.pixelToHex(x, y);
    const cell = this.getCell(hexCoord.q, hexCoord.s);
    cell.state = state;
    return cell;
  }

  updateCellStates() {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        if (i < 1 ||
            i > (this.gridHeight - 2) ||
            j < 1 ||
            j > (this.gridWidth - 2)
            ) {
              this.tempGrid[i][j].state = 0;
            } else {
              this.tempGrid[i][j].state = this.grid[i][j].newState();
            }
      };
    };
    this.grid = this.tempGrid;
  }

  logActiveCells() {
    const activeCellCoords = [];
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        const cell = this.grid[i][j];
        if (cell.state > 0) {
          activeCellCoords.push(cell.coord);
        }
      };
    };
    console.log(activeCellCoords);
  }

  render() {
    this.painter.render();
  }
}

export default Universe;
