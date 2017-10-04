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
    this.gridWidth = Math.floor((width / cellSize) * 0.67);
    this.gridHeight = Math.floor((height / cellSize) * 0.66);
    this.grid = this.generateGrid();
    this.tempGrid = this.generateGrid();
  }

  resetGridRandom() {
    this.grid = this.generateGrid();
  }

  getCell(q, s) {
    return this.grid[s][q + Math.floor(s / 2)];
  }

  generateGrid() {
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
        tempRow.push(new Cell(q, r, s, this));
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
      this.sketch.fill('yellow');
    } else if (cell.alive === 2) {
      this.sketch.fill('blue');
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
    this.grid.forEach(q => {
      q.forEach(s => {
        this.sketch.push();
        this.plotCell(s);
        this.sketch.pop();
      });
    });
  }

  generationCycle() {
    this.grid.forEach((q, qIdx) => {
      q.forEach((s, sIdx) => {
        if (qIdx < 1 ||
            qIdx > (this.gridHeight - 2) ||
            sIdx < 1 ||
            sIdx > (this.gridWidth - 2)
            ) {
              this.tempGrid[qIdx][sIdx].alive = 0;
            } else {
              this.tempGrid[qIdx][sIdx].alive = s.newStatus();
            }
      });
    });
    this.grid = this.tempGrid;
  }

}

export default Universe;
