import Cell from './cell';

class Universe {
  constructor(width, height, cellSize, sketch) {
    this.sketch = sketch;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.gridWidth = (width / cellSize) * 0.67;
    this.gridHeight = (height / cellSize) * 0.5;
    this.grid = this.generateGrid();
    this.renderCycle = this.renderCycle.bind(this);
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
        tempRow.push(new Cell(q, r, this));
        q++;
        r--;
      };
      grid.push(tempRow);
      tempRow = [];
    };
    return grid;
  }

  hexToPixel(cell) {
    const x = (Math.sqrt(3) * cell.coord.q + Math.sqrt(3) / 2 * cell.coord.s) * this.cellSize;
    const y = (3 / 2) * cell.coord.s * this.cellSize;
    const pixelCoord = { x: x, y: y };
    return pixelCoord;
  }

  plotCell(cell) {
    const pCoord = this.hexToPixel(cell);
    const x = pCoord.x;
    const y = pCoord.y;
    var angle = (Math.PI * 2) / 6;
    if (cell.alive) {
      this.sketch.fill('yellow');
    }
    this.sketch.stroke('red');
    this.sketch.beginShape();
    for (var a = (Math.PI / 6); a < (Math.PI * 2); a += angle) {
      var sx = x + Math.cos(a) * this.cellSize;
      var sy = y + Math.sin(a) * this.cellSize;
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
      if (qIdx < 2) { return;}
      if (qIdx > (this.gridHeight - 2)) { return; }
      q.forEach((s, sIdx) => {
        if (sIdx < 2) { return;}
        if (sIdx > (this.gridWidth - 2)) { return; }
        s.updateStatus();
      });
    });
  }

  renderCycle() {
    this.generationCycle();
    this.renderGrid();
  }

  bigBang() {
    setInterval(this.renderCycle, 5000);
  }
}

export default Universe;
