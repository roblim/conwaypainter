import CONSTANTS from './constants';

const {
        RUN,
        RING
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
  }

  interfaceSetup() {
    this.playButton();
    this.randomizeButton();
    this.clearButton();
    this.hexStampButton();
    this.ringStampButton();
  }

  playButton() {
    const playButton = this.sketch.createButton("Play/Pause");
    playButton.mousePressed(this.startToggle)
  }

  randomizeButton() {
    const randomizeButton = this.sketch.createButton("Randomize");
    randomizeButton.mousePressed(this.randomize);
  }

  clearButton() {
    const clearButton = this.sketch.createButton("Clear");
    clearButton.mousePressed(this.clear);
  }

  hexStampButton() {
    const hexStampButton = this.sketch.createButton('Default Brush');
    hexStampButton.mousePressed(this.setHexStamp);
  }

  ringStampButton() {
    const ringStampButton = this.sketch.createButton('Ring Brush');
    ringStampButton.mousePressed(this.setRingStamp);
  }

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
}

export default Interface;
