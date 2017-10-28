import Universe from './universe';
import Cell from './cell';
import CONSTANTS from './constants';

const {
        HEX_IN_ANGLE,
        HEX_START_ANGLE,
        TWO_PI,
        RUN,
        RING,
        DEFAULT,
        INSPECT
      } = CONSTANTS;

class Painter {
  constructor(universe, sketch) {
    this.universe = universe;
    this.sketch = sketch;
    this.cellSize = universe.cellSize;
    this.gridWidth = universe.gridWidth;
    this.gridHeight = universe.gridHeight;
    this.cellsToRender = universe.cellsToRender;
    this.mode = RUN;
    this.brush = null;
    this.eraser = 0;
    this.mouseOver = null;
    this.brushQueue = [];

    this.cursors = {
      RING: this.ringCursor.bind(this),
      DEFAULT: this.hexCursor.bind(this),
    }
  }

  plotCell(cell) {
    this.sketch.push();
    if (cell.state === 1) {
      this.sketch.fill('#1CA5B8');
    } else if (cell.state === 2) {
      this.sketch.fill('#FF404C');
    }
    this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y)
    this.sketch.pop();
  }

  outOfBounds() {
    return (this.sketch.mouseX < (this.cellSize * 2) ||
        this.sketch.mouseY < (this.cellSize) ||
        this.sketch.mouseX > (this.universe.width - this.cellSize) ||
        this.sketch.mouseY > (this.universe.height - this.cellSize)) ||
        (this.sketch.pmouseX < (this.cellSize * 2) ||
            this.sketch.pmouseY < (this.cellSize) ||
            this.sketch.pmouseX > (this.universe.width - this.cellSize) ||
            this.sketch.pmouseY > (this.universe.height - this.cellSize))
  }

  renderCursor() {
    this.brushQueue = [];

    this.sketch.push();
    let cursor = this.cursors[DEFAULT];

    if (!this.mouseOver) {
      this.sketch.strokeWeight(2);
      this.sketch.stroke('blue');
    }

    if (!this.eraser) {
      this.sketch.noFill();
    } else {
      this.sketch.fill('rgba(255, 255, 255, .9)');
    }

    if (this.brush) {
      cursor = this.cursors[this.brush];
    }
    if (this.outOfBounds()) {
      this.sketch.pop();
      return;
    }
    cursor();
    this.sketch.pop();
  }

  hexCursor() {
    const pCell = this.universe.getCellPixel(this.sketch.pmouseX, this.sketch.pmouseY);
    const cell = this.universe.getCellPixel(this.sketch.mouseX, this.sketch.mouseY);
    this.drawHex(pCell.pixelCoord.x, pCell.pixelCoord.y);
    this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y);
  }

  ringCursor() {

    const pCursorCell = this.universe.getCellPixel(this.sketch.pmouseX, this.sketch.pmouseY);
    const pBrushCellCoords = pCursorCell.neighborCoords.map(coord => {
      const cell = this.universe.getCell(coord[0], coord[1]);
      this.brushQueue.push(cell);
      this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y);
    })

    const cursorCell = this.universe.getCellPixel(this.sketch.mouseX, this.sketch.mouseY);
    const brushCellCoords = cursorCell.neighborCoords.map(coord => {
      const cell = this.universe.getCell(coord[0], coord[1]);
      this.brushQueue.push(cell);
      this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y);
    })
  }

  setBrush() {
    this.brushQueue.map(cell => {
      this.paintCell(cell.pixelCoord.x, cell.pixelCoord.y);
    });
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
    for (let i = 0; i < this.universe.cellsToRender.length; i++) {

      let cellCoord = this.universe.cellsToRender[i];

      let cell = this.universe.getCell(cellCoord[0], cellCoord[1])

      // if (!cell.state) { continue; }
      this.sketch.push();
      this.plotCell(cell)
      this.sketch.pop();
    }

    // for (let i = 0; i < this.gridHeight; i++) {
    //   for (let j = 0; j < this.gridWidth; j++) {
    //     if (!this.universe.grid[i][j].state) { continue; }
    //     this.sketch.push();
    //     this.plotCell(this.universe.grid[i][j]);
    //     this.sketch.pop();
    //   };
    // }
  }

  paintCell(x, y) {
    let state;
    this.eraser ? (state = 0) : (state = 1);

    this.sketch.push();
    this.sketch.fill('yellow');
    this.universe.setCell(x, y, state);
    this.drawHex(x,y);
    this.sketch.pop();
  }

  render() {
    switch(this.mode) {
      case RUN:
        this.universe.updateCellStates();
        this.renderGrid();
        break;
      default:
        this.renderGrid();
        break;
    }
  }
}

export default Painter;
