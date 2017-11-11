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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
  NEIGHBORS: [
    [0, -1],
    [1, -1],
    [1, 0],
    [0, 1],
    [-1, 1],
    [-1, 0]
  ]
};

/* harmony default export */ __webpack_exports__["a"] = (CONSTANTS);


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
    this.painter = new __WEBPACK_IMPORTED_MODULE_1__painter__["a" /* default */](this, sketch);

    this.cellsToUpdate = [];
    this.cellsToUpdateTemp = [];
    this.cellsToRender = [];
    this.cellsToRenderTemp = [];
    this.grid = [];
    this.tempGrid = [];
    this.generateGrid(seed);

    // this.grid = this.generateGrid(seed);
    // this.tempGrid = this.generateGrid(seed);
  }

  generateGrid(seed) {
    let q;
    let r;
    let qStart = 1;
    let rStart = 0;
    this.grid = [];
    this.tempGrid = [];
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
        let inputSeed = seed;
        if (inputSeed === undefined) { 
          inputSeed = Math.floor((Math.random() * 3));
        }
        const cell = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](q, r, s, this, inputSeed);
        if (inputSeed === 1 || inputSeed === 2) {
          this.cellsToRender.push([q, s]);
          this.cellsToUpdate.push([q, s]);
          this.cellsToUpdate.concat(cell.neighborCoords);
        }
        tempRow.push(cell);
        q++;
        r--;
      };
      this.grid.push(tempRow);
      this.tempGrid.push(tempRow);
      tempRow = [];
    };
  }

  clearGrid() {
    this.generateGrid(0);
  }

  resetGridRandom() {
    this.generateGrid();
  }

  // converts a rectangular pixel coordinate to an axial coordinate
  pixelToHex(x, y) {
    const q = (x * (Math.sqrt(3) / 3) - (y / 3)) / this.cellSize;
    const s = (y * (2 / 3)) / this.cellSize;
    return this.roundHex(q, s);
  }

  // pixel coordinates can be floats and can yield non-integer axial coordinates
  // this function rounds non-integer axial coordinates
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

  // returns cell at a given axial coordinate
  getCell(q, s) {
    const row = this.grid[s];
    if (!row) {
      return null;
    } else {
      return row[q + Math.floor(s / 2)];
    }
  }

  getCellGridCoord(q, s) {
    const rowIdx = s;
    const colIdx = q + Math.floor(s / 2);
    return { row: rowIdx, col: colIdx};
  }

  // returns cell at a given pixel coordinate
  getCellPixel(x, y) {
    const hexCoord = this.pixelToHex(x, y);
    return this.getCell(hexCoord.q, hexCoord.s);
  }

  setCell(x, y, state) {
    const hexCoord = this.pixelToHex(x, y);
    const cell = this.getCell(hexCoord.q, hexCoord.s);
    cell.state = state;
    return cell;
  }

  updateCellStates() {
    for (let i = 0; i < this.cellsToUpdate.length; i++) {
      const updateCoord = this.cellsToUpdate[i];
      const gridCoord = this.getCellGridCoord(updateCoord[0], updateCoord[1]);
      const row = gridCoord.row;
      const col = gridCoord.col;
      const updateCell = this.grid[row][col];
      let newState
      if (row < 1 ||
          row > (this.gridHeight - 2) ||
          col < 1 ||
          col > (this.gridWidth - 2)
          ) {
          newState = 0;
        } else {
          newState = updateCell.newState();
        }
      this.tempGrid[row][col].state = newState;
      if (newState === 1 || newState === 2) {
        this.cellsToUpdateTemp.push(updateCoord);
        this.cellsToUpdateTemp.concat(updateCell.neighborCoords);
        this.cellsToRenderTemp.push(updateCoord);
      }
    }
    this.cellsToUpdate = this.cellsToUpdateTemp;
    this.cellsToRender = this.cellsToRenderTemp;
    this.cellsToUpdateTemp = [];
    this.cellsToRenderTemp = [];
    this.grid = this.tempGrid;


    // for (let i = 0; i < this.gridHeight; i++) {
    //   for (let j = 0; j < this.gridWidth; j++) {
    //     if (i < 1 ||
    //         i > (this.gridHeight - 2) ||
    //         j < 1 ||
    //         j > (this.gridWidth - 2)
    //         ) {
    //           this.tempGrid[i][j].state = 0;
    //         } else {
    //           this.tempGrid[i][j].state = this.grid[i][j].newState();
    //         }
    //   };
    // };
    // this.grid = this.tempGrid;
  }

  logActiveCells() {
    const activeCellCoords = [];
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        const cell = this.grid[i][j];
        if (cell.state > 0) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);


const { NEIGHBORS } = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* default */];

class Cell {
  constructor(q, r, s, universe, state) {
    this.coord = { q, r, s };
    this.state = state;
    this.universe = universe;
    this.pixelCoord = this.hexToPixel(q, s, universe.cellSize);
    this.neighborCoords = this.getNeighborCoords(q, s);
  }

  // converts axial coordinate to pixel coordinate
  hexToPixel(q, s, size) {
    const x = (Math.sqrt(3) * q + Math.sqrt(3) / 2 * s) * size;
    const y = (3 / 2) * s * size;
    const pixelCoord = { x: x, y: y };
    return pixelCoord;
  }

  getState(q, s) {
    const cell = this.universe.getCell(q, s);
    return cell.state;
  }

  getHeadcount() {
    const headcount = this.neighborCoords.reduce((accum, coord) => {
      return accum + this.getState(coord[0], coord[1]);
    }, 0);
    return headcount;
  }

  newState() {
    const heads = this.getHeadcount();
    let newState;
    switch(this.state) {
      case 0:
        if (heads === 4) {
          newState = 1;} else {
            newState = 0;
          }
        break;
      case 1:
        switch(heads) {
          case 1:
            newState = 2;
            break;
          case 2:
            newState = 2;
            break;
          case 3:
            newState = 2;
            break;
          case 4:
            newState = 2;
            break;
          case 6:
            newState = 2;
            break;
          default:
            newState = 0;
            break;
          };
        break;
      case 2:
        switch(heads) {
          case 1:
            newState = 2;
            break;
          case 2:
            newState = 1;
            break;
          case 3:
            newState = 0;
            break;
          case 4:
            newState = 1;
            break;
          default:
            newState = 0;
            break;
        };
        break;
    };
    return newState;
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__universe__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(0);
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
  let cellSize = 10;

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
    switch(uni.painter.brush) {
      case RING:
        uni.painter.setBrush();
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
        switch(uni.painter.brush) {
          case RING:
          uni.painter.setBrush();
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

  sketch.mouseDragged = function() {
    switch(uni.painter.brush) {
      case RING:
        uni.painter.setBrush();
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__universe__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cell__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(0);




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
    for (let a = HEX_START_ANGLE;
                  a < TWO_PI;
                  a += HEX_IN_ANGLE) {
      let sx = x + Math.cos(a) * this.cellSize;
      let sy = y + Math.sin(a) * this.cellSize;
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

/* harmony default export */ __webpack_exports__["a"] = (Painter);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);


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
    this.setHexBrush = this.setHexBrush.bind(this);
    this.setRingBrush = this.setRingBrush.bind(this);
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
    this.hexBrushButton(parentId);
    this.ringBrushButton(parentId);
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
    const playButton = this.sketch.createButton('<span class="button-contents"><i class="material-icons">pause</i><i class="material-icons">play_arrow</i></span>');
    playButton.mousePressed(this.startToggle).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  randomizeButton(parentId) {
    const randomizeButton = this.sketch.createButton('<span class="button-contents"><i class="material-icons">shuffle</i><span>&nbsp;Randomize</span></span>');
    randomizeButton.mousePressed(this.randomize).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  clearButton(parentId) {
    const clearButton = this.sketch.createButton('<span class="button-contents"><i class="material-icons">backspace</i><span>&nbsp;Clear</span></span>');
    clearButton.mousePressed(this.clear).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  hexBrushButton(parentId) {
    const hexBrushButton = this.sketch.createButton('<span class="button-contents"><i class="material-icons">brush</i><span>&nbsp;Plain Brush</span></span>');
    hexBrushButton.mousePressed(this.setHexBrush).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  ringBrushButton(parentId) {
    const ringBrushButton = this.sketch.createButton('<span class="button-contents"><i class="material-icons">radio_button_unchecked</i><span>&nbsp;Ring Brush</span></span>');
    ringBrushButton.mousePressed(this.setRingBrush).parent(parentId).mouseOver(this.mouseOver).mouseOut(this.mouseOut);
  }

  eraserToggleButton(parentId) {
    const eraserToggleButton = this.sketch.createButton('<span class="button-contents"><i class="material-icons">tab</i><span>&nbsp;Eraser Mode</span></span>');
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

  setHexBrush() {
    this.painter.brush = null;
  }

  setRingBrush() {
    this.painter.brush = RING;
  }

  eraserToggle() {
    this.painter.eraser ? (this.painter.eraser = 0) : (this.painter.eraser = 1);
  }

  setInspectMode() {
    this.painter.mode = INSPECT;
    this.painter.brush = null;
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