/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__universe__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface__ = __webpack_require__(5);




const {
        RUN,
        RING,
        DEFAULT,
        INSPECT
      } = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */];

const p5Canvas = function( sketch ) {
  let width = sketch.windowWidth +50;
  let height = sketch.windowHeight + 50;
  let cellSize = 8;

  let uni = new __WEBPACK_IMPORTED_MODULE_0__universe__["a" /* default */](width, height, cellSize, sketch);
  let ui = new __WEBPACK_IMPORTED_MODULE_2__interface__["a" /* default */](sketch, uni);



  sketch.setup = function() {
    let canvas = sketch.createCanvas(width, height);
    canvas.position(-50, -50);
    sketch.cursor(sketch.CROSS);
    ui.interfaceSetup('ui-controls');

  };

  sketch.draw = function() {
    sketch.frameRate(ui.slider.value());
    sketch.background('black');
    uni.render();
    uni.painter.renderCursor();
    fpsCounter();
  };

  sketch.windowResized = function() {
    width = sketch.windowWidth +50;
    height = sketch.windowHeight + 50;
    sketch.resizeCanvas(width, height);
    uni = new __WEBPACK_IMPORTED_MODULE_0__universe__["a" /* default */](width, height, cellSize, sketch);
    ui.universe = uni;
    ui.painter = uni.painter;
  }

  const fpsCounter = function() {
    sketch.push();
    sketch.fill(255);
    sketch.stroke(0);
    var fps = sketch.frameRate();
    sketch.text("FPS: " + fps.toFixed(2), sketch.width - 80, sketch.height - 85);
    sketch.pop();
  };

  sketch.touchStarted = function() {
    uni.painter.paintCell(
      sketch.mouseX,
      sketch.mouseY
      );
    return false;
  };

  sketch.touchEnded = function() {
    return false;
  };

  sketch.touchMoved = function() {
    switch(uni.painter.stamp) {
      case RING:
        uni.painter.setStamp();
        break;
      default:
        uni.painter.paintCell(
          sketch.mouseX,
          sketch.mouseY
          );
        if (uni.painter.mode === RUN) {
        uni.painter.paintCell(
          sketch.pmouseX,
          sketch.pmouseY
          );
        }
        break;
    };
    return false;
  };

  sketch.mousePressed = function() {
    switch(uni.painter.mode) {
      case INSPECT:
        console.log(
          uni.getCellPixel(sketch.mouseX, sketch.mouseY)
        );
        break;
      default:
        switch(uni.painter.stamp) {
          case RING:
          uni.painter.setStamp();
          break;
          default:
          uni.painter.paintCell(
            sketch.mouseX,
            sketch.mouseY
          );
          break;
        };
        break;
    }

  };

  sketch.mouseReleased = function() {
  };

  // sketch.mouseClicked = function() {
  //
  //   switch(uni.painter.stamp) {
  //     case RING:
  //       uni.painter.setStamp();
  //       break;
  //     default:
  //       uni.painter.paintCell(
  //         sketch.mouseX,
  //         sketch.mouseY
  //         );
  //       break;
  //   };
  // };

  sketch.mouseDragged = function() {
    switch(uni.painter.stamp) {
      case RING:
        uni.painter.setStamp();
        break;
      default:
        uni.painter.paintCell(
          sketch.mouseX,
          sketch.mouseY
          );
          if (uni.painter.mode === RUN) {
          uni.painter.paintCell(
            sketch.pmouseX,
            sketch.pmouseY
            );
          }
        break;
    };
  }

  sketch.deviceShaken = function() {
    if (uni.painter.mode === RUN) {
      uni.painter.mode = null;
      uni.clearGrid();
    } else {
      uni.painter.mode = RUN;
    }
    return false;
  };

  sketch.keyPressed = function() {
    switch(sketch.keyCode) {
      case 32:
        if (uni.painter.mode === RUN) {
          uni.painter.mode = null;
        } else if (uni.painter.mode === null) {
          uni.painter.mode = RUN;
        }
        break;
      case sketch.BACKSPACE:
        uni.clearGrid();
        break;
      case sketch.ENTER:
        uni.resetGridRandom();
        sketch.redraw();
        break;
    };
  };


};

var myp5 = new p5(p5Canvas, 'sketch');


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__painter__ = __webpack_require__(4);



class Universe {
  constructor(width, height, cellSize, sketch, seed)  {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.gridWidth = Math.floor((width / cellSize) * 0.68);
    this.gridHeight = Math.floor((height / cellSize) * 0.7);
    this.grid = this.generateGrid(seed);
    this.tempGrid = this.generateGrid(seed);
    this.painter = new __WEBPACK_IMPORTED_MODULE_1__painter__["a" /* default */](this, sketch);
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
        tempRow.push(new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](q, r, s, this, seed));
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

  pixelToHex(x, y) {
    const q = (x * (Math.sqrt(3) / 3) - (y / 3)) / this.cellSize;
    const s = (y * (2 / 3)) / this.cellSize;
    return this.roundHex(q, s);
  }

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

  getCell(q, s) {
    return this.grid[s][q + Math.floor(s / 2)];
  }

  getCellPixel(x, y) {
    const hexCoord = this.pixelToHex(x, y);
    return this.getCell(hexCoord.q, hexCoord.s);
  }

  setCell(x, y, status) {
    const hexCoord = this.pixelToHex(x, y);
    const cell = this.getCell(hexCoord.q, hexCoord.s);
    cell.alive = status;
    return cell;
  }

  generationCycle() {
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

  logActiveCells() {
    const activeCellCoords = [];
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        const cell = this.grid[i][j];
        if (cell.alive > 0) {
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

/* harmony default export */ __webpack_exports__["a"] = (Universe);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const NEIGHBORS = [
  [0, -1],
  [1, -1],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0]
];

class Cell {
  constructor(q, r, s, universe, alive = Math.floor((Math.random() * 3) * .4)) {
    this.coord = { q, r, s };
    this.alive = alive;
    this.universe = universe;
    this.pixelCoord = this.hexToPixel(q, s, universe.cellSize);
    this.neighborCoords = this.getNeighborCoords(q, s);
  }

  hexToPixel(q, s, size) {
    const x = (Math.sqrt(3) * q + Math.sqrt(3) / 2 * s) * size;
    const y = (3 / 2) * s * size;
    const pixelCoord = { x: x, y: y };
    return pixelCoord;
  }

  getStatus(q, s) {
    const cell = this.universe.getCell(q, s);
    return cell.alive;
  }

  getHeadcount() {
    const headcount = this.neighborCoords.reduce((accum, coord) => {
      return accum + this.getStatus(coord[0], coord[1]);
    }, 0);
    return headcount;
  }

  newStatus() {
    const heads = this.getHeadcount();
    let newStatus;
    switch(this.alive) {
      case 0:
        if (heads === 4) {
          newStatus = 1;} else {
            newStatus = 0;
          }
        break;
      case 1:
        switch(heads) {
          case 1:
            newStatus = 2;
            break;
          case 2:
            newStatus = 2;
            break;
          case 3:
            newStatus = 2;
            break;
          case 4:
            newStatus = 2;
            break;
          case 6:
            newStatus = 2;
            break;
          default:
            newStatus = 0;
            break;
          };
        break;
      case 2:
        switch(heads) {
          case 1:
            newStatus = 2;
            break;
          case 2:
            newStatus = 1;
            break;
          case 4:
            newStatus = 1;
            break;
          default:
            newStatus = 0;
            break;
        };
        break;
    };
    // const updatedCell = new Cell(this.coord.q, this.coord.r, this.coord.s, this.universe, newStatus);
    return newStatus;
  }

  getNeighborCoords(q, s) {
    const neighbors = [];
    NEIGHBORS.forEach(delta => {
      const coord = [q + delta[0], s + delta[1]];
      neighbors.push(coord);
    });
    return neighbors;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Cell);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CONSTANTS = {
  HEX_IN_ANGLE: (Math.PI * 2) / 6,
  HEX_START_ANGLE: (Math.PI / 6),
  TWO_PI: Math.PI * 2,
  RUN: 'RUN',
  RING: 'RING',
  DEFAULT: 'DEFAULT',
  INSPECT: 'INSPECT',
  STAMPS: {

  }
};

/* harmony default export */ __webpack_exports__["a"] = (CONSTANTS);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__universe__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cell__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(3);




const {
        HEX_IN_ANGLE,
        HEX_START_ANGLE,
        TWO_PI,
        RUN,
        RING,
        DEFAULT,
        INSPECT
      } = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* default */];

class Painter {
  constructor(universe, sketch) {
    this.universe = universe;
    this.sketch = sketch;
    this.cellSize = universe.cellSize;
    this.gridWidth = universe.gridWidth;
    this.gridHeight = universe.gridHeight;
    this.mode = RUN;
    this.stamp = null;
    this.eraser = 0;
    this.mouseOver = null;
    this.stampQueue = [];

    this.cursors = {
      RING: this.ringCursor.bind(this),
      DEFAULT: this.hexCursor.bind(this),
    }
  }

  plotCell(cell) {
    this.sketch.push();
    if (cell.alive === 1) {
      this.sketch.fill('yellow');
    } else if (cell.alive === 2) {
      this.sketch.fill('yellow');
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
    this.stampQueue = [];

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

    if (this.stamp) {
      cursor = this.cursors[this.stamp];
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
    const pStampCellCoords = pCursorCell.neighborCoords.map(coord => {
      const cell = this.universe.getCell(coord[0], coord[1]);
      this.stampQueue.push(cell);
      this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y);
    })

    const cursorCell = this.universe.getCellPixel(this.sketch.mouseX, this.sketch.mouseY);
    const stampCellCoords = cursorCell.neighborCoords.map(coord => {
      const cell = this.universe.getCell(coord[0], coord[1]);
      this.stampQueue.push(cell);
      this.drawHex(cell.pixelCoord.x, cell.pixelCoord.y);
    })
  }

  setStamp() {
    this.stampQueue.map(cell => {
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
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        if (!this.universe.grid[i][j].alive) { continue; }
        this.sketch.push();
        this.plotCell(this.universe.grid[i][j]);
        this.sketch.pop();
      };
    }
  }

  paintCell(x, y) {
    let status;
    this.eraser ? (status = 0) : (status = 1);

    this.sketch.push();
    this.sketch.fill('yellow');
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

/* harmony default export */ __webpack_exports__["a"] = (Painter);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(3);


const {
        RUN,
        RING,
        INSPECT
      } = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* default */];

class Interface {
  constructor(sketch, universe) {
    this.sketch = sketch;
    this.universe = universe;
    this.painter = universe.painter;

    this.startToggle = this.startToggle.bind(this);
    this.randomize = this.randomize.bind(this);
    this.clear = this.clear.bind(this);
    this.setHexStamp = this.setHexStamp.bind(this);
    this.setRingStamp = this.setRingStamp.bind(this);
    this.eraserToggle = this.eraserToggle.bind(this);
    this.setInspectMode = this.setInspectMode.bind(this);
    this.logActiveCells = this.logActiveCells.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  interfaceSetup(parentId) {
    this.playButton(parentId);
    this.clearButton(parentId);
    this.randomizeButton(parentId);
    this.hexStampButton(parentId);
    this.ringStampButton(parentId);
    this.eraserToggleButton(parentId);

    this.slider = this.sketch.createSlider(1, 60, 60);
    this.slider.parent('speed-slider');
    this.slider.style('width', '140px');

    // Developer Tools
    // this.inspectModeButton(parentId);
    // this.logActiveCellsButton(parentId);
  }

  pausePlay() {
    if (this.painter.mode === RUN) {
      return '<i class="material-icons">pause</i>';
    } else {
      return '<i class="material-icons">play_arrow</i>';
    }
  }

  playButton(parentId) {
    const playButton = this.sketch.createButton('<div class="button-contents"><i class="material-icons">pause</i><i class="material-icons">play_arrow</i></div>');
    playButton.mousePressed(this.startToggle).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  randomizeButton(parentId) {
    const randomizeButton = this.sketch.createButton('<div class="button-contents"><i class="material-icons">shuffle</i><span>&nbsp;Randomize</span></div>');
    randomizeButton.mousePressed(this.randomize).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  clearButton(parentId) {
    const clearButton = this.sketch.createButton('<div class="button-contents"><i class="material-icons">backspace</i><span>&nbsp;Clear</span></div>');
    clearButton.mousePressed(this.clear).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  hexStampButton(parentId) {
    const hexStampButton = this.sketch.createButton('<div class="button-contents"><i class="material-icons">brush</i><span>&nbsp;Plain Brush</span></div>');
    hexStampButton.mousePressed(this.setHexStamp).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  ringStampButton(parentId) {
    const ringStampButton = this.sketch.createButton('<div class="button-contents"><i class="material-icons">radio_button_unchecked</i><span>&nbsp;Ring Brush</span></div>');
    ringStampButton.mousePressed(this.setRingStamp).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  eraserToggleButton(parentId) {
    const eraserToggleButton = this.sketch.createButton('<div class="button-contents"><i class="material-icons">tab</i><span>&nbsp;Eraser Mode</span></div>');
    eraserToggleButton.mousePressed(this.eraserToggle).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  inspectModeButton(parentId) {
    const inspectModeButton = this.sketch.createButton('Inspect Mode');
    inspectModeButton.mousePressed(this.setInspectMode).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  logActiveCellsButton(parentId) {
    const logActiveCellsButton = this.sketch.createButton('Log Active Cells');
    logActiveCellsButton.mousePressed(this.logActiveCells).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  // Button Callbacks
  startToggle() {
    this.painter.mode === RUN ? (this.painter.mode = null) : (this.painter.mode = RUN);
  }

  randomize() {
    this.universe.resetGridRandom();
  }

  clear() {
    this.universe.clearGrid();
  }

  setHexStamp() {
    this.painter.stamp = null;
  }

  setRingStamp() {
    this.painter.stamp = RING;
  }

  eraserToggle() {
    this.painter.eraser ? (this.painter.eraser = 0) : (this.painter.eraser = 1);
  }

  setInspectMode() {
    this.painter.mode = INSPECT;
    this.painter.stamp = null;
  }

  logActiveCells() {
    this.universe.logActiveCells();
  }

  mouseOver() {
    this.painter.mouseOver = 1;
  }

  mouseOut() {
    this.painter.mouseOver = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Interface);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map