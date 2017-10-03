import Cell from './cell';

class Universe {
  constructor(width, height, hexSize, sketch) {
    this.sketch = sketch;
    this.width = width;
    this.height = height;
    this.size = hexSize;
    this.gridWidth = (width / hexSize) * 0.67;
    this.gridHeight = (height / hexSize) * 0.5;
    this.grid = this.generateGrid();
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
        tempRow.push(new Cell(q, r));
        q++;
        r--;
      };
      grid.push(tempRow);
      tempRow = [];
    };
    return grid;
  }

  hexToPixel(hex) {
    const x = (Math.sqrt(3) * hex.coord.q + Math.sqrt(3) / 2 * hex.coord.s) * this.size;
    const y = (3 / 2) * hex.coord.s * this.size;
    const pixelCoord = { x: x, y: y };
    return pixelCoord;
  }

  plotHex(hex) {
    const pCoord = this.hexToPixel(hex);
    const x = pCoord.x;
    const y = pCoord.y;
    var angle = (Math.PI * 2) / 6;
    if (hex.alive) {
      this.sketch.fill('yellow');
    }
    this.sketch.stroke('red');
    this.sketch.beginShape();
    for (var a = (Math.PI / 6); a < (Math.PI * 2); a += angle) {
      var sx = x + Math.cos(a) * this.size;
      var sy = y + Math.sin(a) * this.size;
      this.sketch.vertex(sx, sy);
    }
    this.sketch.endShape(this.sketch.CLOSE);
  }

  renderGrid() {
      this.grid.forEach(q => {
      q.forEach(s => {
        this.sketch.push();
        this.plotHex(s);
        this.sketch.pop();
      });
    });
  }
}

export default Universe;
