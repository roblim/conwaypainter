import CONSTANTS from './constants';

const {
        RUN,
        RING,
        INSPECT
      } = CONSTANTS;

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

export default Interface;
