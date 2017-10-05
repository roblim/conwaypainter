import CONSTANTS from './constants';

const {
        RUN,
      } = CONSTANTS;

class Interface {
  constructor(sketch, universe) {
    this.sketch = sketch;
    this.universe = universe;
    this.painter = universe.painter;

    this.startToggle = this.startToggle.bind(this);
    this.randomize = this.randomize.bind(this);
    this.clear = this.clear.bind(this);
  }

  interfaceSetup() {
    this.playButton();
    this.randomizeButton();
    this.clearButton();
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

  startToggle() {
    this.painter.mode === RUN ? (this.painter.mode = null) : (this.painter.mode = RUN);
  }

  randomize() {
    this.universe.resetGridRandom();
  }

  clear() {
    this.universe.clearGrid();
  }
}

export default Interface;
