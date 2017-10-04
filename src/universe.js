import Cell from './cell';

class Universe {
  constructor(width, height, cellSize, sketch) {
    this.sketch = sketch;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.gridWidth = Math.floor((width / cellSize) * 0.67);
    this.gridHeight = Math.floor((height / cellSize) * 0.66);
    this.grid = this.generateGrid();
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
    var angle = (Math.PI * 2) / 6;
    if (cell.alive === 1) {
      this.sketch.fill('yellow');
    } else if (cell.alive === 2) {
      this.sketch.fill('blue');
    }
    // this.sketch.stroke('red');
    this.sketch.beginShape();
    for (var a = (Math.PI / 6); a < (Math.PI * 2); a += angle) {
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
    const tempGrid = new Array(this.gridHeight)
    for (let i = 0; i < tempGrid.length; i++) {
      tempGrid[i] = new Array(this.gridWidth);
    }
    this.grid.forEach((q, qIdx) => {
      q.forEach((s, sIdx) => {
        if (qIdx < 1 ||
            qIdx > (this.gridHeight - 2) ||
            sIdx < 1 ||
            sIdx > (this.gridWidth - 2)
            ) {
              tempGrid[qIdx][sIdx] = new Cell(s.coord.q, s.coord.r, s.coord.s, this, s.alive);
            } else {
              tempGrid[qIdx][sIdx] = s.newStatus();

            }
      });
    });
    this.grid = tempGrid;
  }

}

export default Universe;
