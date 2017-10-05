import Universe from './universe';
import Cell from './cell';
import CONSTANTS from './constants';

const { RUN } = { CONSTANTS };

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
      // this.sketch.fill('blue');
      this.sketch.stroke('yellow');
    } else if (cell.alive === 2) {
      this.sketch.stroke('yellow');
      // this.sketch.fill('orange');
    }
    this.sketch.beginShape();
    for (var a = CONSTANTS.hexStartAngle;
                  a < CONSTANTS.twoPI;
                  a += CONSTANTS.hexInAngle) {
      var sx = cell.pixelCoord.x + Math.cos(a) * this.cellSize;
      var sy = cell.pixelCoord.y + Math.sin(a) * this.cellSize;
      this.sketch.vertex(sx, sy);
    }
    this.sketch.endShape(this.sketch.CLOSE);
    this.sketch.pop();
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
    }


  }
}

export default Painter;
