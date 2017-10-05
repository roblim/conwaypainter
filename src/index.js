import Universe from './universe';
import CONSTANTS from './constants';

const {
        RUN,
        PAINT
      } = CONSTANTS;

const p5Canvas = function( sketch ) {
  const width = sketch.windowWidth * 0.97;
  const height = sketch.windowHeight * 0.96;
  const cellSize = 8;
  let seed;
  // const seed = 0;

  const uni = new Universe(width, height, cellSize, sketch);

  const state = {
    looping: 1,
    drawing: 0,
    activeCells: []
  }

  sketch.setup = function() {
    sketch.createCanvas(width, height);
  };

  sketch.draw = function() {
    sketch.background('black');
    uni.render();

    // if (state.drawing) {
    //   state.activeCells.map(cell => uni.plotCell(cell));
    //   state.activeCells.push(uni.setCell(
    //     sketch.pmouseX,
    //     sketch.pmouseY,
    //     1)
    //   );
    //   state.activeCells.push(uni.setCell(
    //     sketch.mouseX,
    //     sketch.mouseY,
    //     1)
    //   );
    // }

    sketch.push();
    sketch.fill(255);
    sketch.stroke(0);
    var fps = sketch.frameRate();
    sketch.text("FPS: " + fps.toFixed(2), 10, sketch.height - 10);
    sketch.pop();
  };

  sketch.mousePressed = function() {
    uni.resetGridRandom();
    sketch.redraw();
  };

  sketch.mouseReleased = function() {
    state.drawing = 0;
    state.activeCells = [];
  }

  sketch.mouseDragged = function() {
    uni.setCell(
      sketch.mouseX,
      sketch.mouseY,
      2);
  }

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
