import Cell from './cell';

const CONSTANTS = {
  hexInAngle: (Math.PI * 2) / 6,
  hexStartAngle: (Math.PI / 6),
  twoPI: Math.PI * 2
};

class Universe {
  constructor(width, height, cellSize, sketch) {
    this.sketch = sketch;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.gridWidth = Math.floor((width / cellSize) * 0.68);
    this.gridHeight = Math.floor((height / cellSize) * 0.7);
    this.grid = this.generateGrid();
    this.tempGrid = this.generateGrid();
  }

  pixelToHex(x, y) {
    const q = (x * (Math.sqrt(3) / 3) - (y / 3)) / this.cellSize;
    const s = (y * (2 / 3)) / this.cellSize;
    return { q, s };
  }

  roundHex() {
    
  }

  setCell(q, s, status) {
    this.getCell(q, s).alive = status;
  }

  resetGridRandom() {
    this.grid = this.generateGrid();
  }

  clearGrid() {
    this.grid = this.generateGrid(0);
  }

  getCell(q, s) {
    return this.grid[s][q + Math.floor(s / 2)];
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

  plotCell(cell) {
    if (cell.alive === 1) {
      this.sketch.fill('blue');
    } else if (cell.alive === 2) {
      this.sketch.fill('orange');
    }
    // this.sketch.stroke('red');
    this.sketch.beginShape();
    for (var a = CONSTANTS.hexStartAngle;
                  a < CONSTANTS.twoPI;
                  a += CONSTANTS.hexInAngle) {
      var sx = cell.pixelCoord.x + Math.cos(a) * this.cellSize;
      var sy = cell.pixelCoord.y + Math.sin(a) * this.cellSize;
      this.sketch.vertex(sx, sy);
    }
    this.sketch.endShape(this.sketch.CLOSE);
  }

  renderGrid() {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        this.sketch.push();
        this.plotCell(this.grid[i][j]);
        this.sketch.pop();
      };
    }
  }

  generationCycle() {
    // this.grid.forEach((q, qIdx) => {
    //   q.forEach((s, sIdx) => {
    //     if (qIdx < 1 ||
    //         qIdx > (this.gridHeight - 2) ||
    //         sIdx < 1 ||
    //         sIdx > (this.gridWidth - 2)
    //         ) {
    //           this.tempGrid[qIdx][sIdx].alive = 0;
    //         } else {
    //           this.tempGrid[qIdx][sIdx].alive = s.newStatus();
    //         }
    //   });
    // });
    // this.grid = this.tempGrid;

    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        if (i < 1 ||
            i > (this.gridHeight - 2) ||
            j < 1 ||
            j > (this.gridWidth - 2)
            ) {
              this.tempGrid[i][j].alive = 0;
            } else {
              this.tempGrid[i][j].alive = this.grid[i][j].newStatus();
            }
      };
    };
    this.grid = this.tempGrid;
  }

}

export default Universe;
