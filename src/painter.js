import Universe from './universe';
import Cell from './cell';
import CONSTANTS from './constants';

const {
        HEX_IN_ANGLE,
        HEX_START_ANGLE,
        TWO_PI,
        RUN,
        RING,
        DEFAULT
      } = CONSTANTS;

class Painter {
  constructor(universe, sketch) {
    this.universe = universe;
    this.sketch = sketch;
    this.cellSize = universe.cellSize;
    this.gridWidth = universe.gridWidth;
    this.gridHeight = universe.gridHeight;
    this.mode = RUN;
    this.stamp = RING;
    this.stampTemp = null;
    this.stampQueue = [];

    this.cursors = {
      RING: this.ringCursor.bind(this),
      DEFAULT: this.hexCursor.bind(this),
    }
  }

  plotCell(cell) {
    this.sketch.push();
    if (cell.alive === 1) {
      // this.sketch.stroke('yellow');
      this.sketch.fill('yellow');
    } else if (cell.alive === 2) {
      // this.sketch.stroke('yellow');
      this.sketch.fill('yellow');
    }
    this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y)
    this.sketch.pop();
  }

  renderCursor() {
    if (this.sketch.mouseX < (this.cellSize * 2) ||
        this.sketch.mouseY < this.cellSize ||
        this.sketch.mouseX > (this.universe.width - this.cellSize) ||
        this.sketch.mouseY > (this.universe.height - this.cellSize)) {
      return;
    }
    this.sketch.push();
    this.sketch.strokeWeight(2);
    let cursor = this.cursors[DEFAULT];
    if (!this.sketch.mouseIsPressed) {
      this.sketch.stroke('blue');
      this.sketch.noFill();
    } else {
      this.sketch.noStroke();
      this.sketch.noFill();
    }
    if (this.stamp) {
      cursor = this.cursors[this.stamp];
    }
    cursor();
    this.sketch.pop();
  }

  hexCursor() {
    const cell = this.universe.getCellPixel(this.sketch.mouseX, this.sketch.mouseY);
    this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y);
  }

  ringCursor() {
    this.stampQueue = [];
    const cursorCell = this.universe.getCellPixel(this.sketch.mouseX, this.sketch.mouseY);
    const stampCellCoords = cursorCell.neighborCoords.map(coord => {
      const cell = this.universe.getCell(coord[0], coord[1]);
      this.stampQueue.push(cell);
      this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y);
    })
  }

  setStamp() {
    this.stampQueue.map(cell => {
      this.paintCell(cell.pixelCoord.x, cell.pixelCoord.y, 1);
    });
    this.paintQueue.concat(this.stampQueue);
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

  paintCell(x, y, status) {
    this.sketch.push();
    this.sketch.fill('yellow');
    // this.sketch.stroke('yellow');
    this.universe.setCell(x, y, status);
    this.drawHex(x,y);
    this.sketch.pop();
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
