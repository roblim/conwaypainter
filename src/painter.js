import Universe from './universe';
import Cell from './cell';
import CONSTANTS from './constants';

const {
        HEX_IN_ANGLE,
        HEX_START_ANGLE,
        TWO_PI,
        RUN,
        PAINT
      } = CONSTANTS;

class Painter {
  constructor(universe, sketch) {
    this.universe = universe;
    this.sketch = sketch;
    this.cellSize = universe.cellSize;
    this.gridWidth = universe.gridWidth;
    this.gridHeight = universe.gridHeight;
    this.mode = RUN;
  }

  plotCell(cell) {
    this.sketch.push();
    if (cell.alive === 1) {
      this.sketch.stroke('yellow');
      // this.sketch.fill('blue');
    } else if (cell.alive === 2) {
      this.sketch.stroke('yellow');
      // this.sketch.fill('orange');
    }
    this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y)
    this.sketch.pop();
  }

  drawHex(x, y) {
    this.sketch.beginShape();
    for (var a = HEX_START_ANGLE;
                  a < TWO_PI;
                  a += HEX_IN_ANGLE) {
      var sx = x + Math.cos(a) * this.cellSize;
      var sy = y + Math.sin(a) * this.cellSize;
      this.sketch.vertex(sx, sy);
    }
    this.sketch.endShape(this.sketch.CLOSE);
  }

  renderGrid() {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        if (!this.universe.grid[i][j].alive) { continue; }
        this.sketch.push();
        this.plotCell(this.universe.grid[i][j]);
        this.sketch.pop();
      };
    }
  }

  render() {
    switch(this.mode) {
      case RUN:
        this.universe.generationCycle();
        this.renderGrid();
        break;
      default:
        this.renderGrid();
        break;
    }
  }
}

export default Painter;
