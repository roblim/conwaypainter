import Universe from './universe';
import { CONSTANTS } from './constants';

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
    // sketch.setFrameRate(30);
  };

  sketch.draw = function() {
    sketch.background('black');
    // uni.renderGrid();
    // uni.generationCycle();
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
    // if (!state.looping) {
    //   uni.resetGridRandom();
    // } else {
    //   uni.setCell(
    //     sketch.mouseX,
    //     sketch.mouseY,
    //     1);
    // }
    state.drawing = 1;
  };

  sketch.mouseReleased = function() {
    state.drawing = 0;
    state.activeCells = [];
  }

  // sketch.mouseDragged = function() {
  //   if (state.looping) {
  //     uni.setCell(
  //       sketch.pmouseX,
  //       sketch.pmouseY,
  //       1);
  //     sketch.redraw();
  //   }
  // }

  sketch.keyPressed = function() {
    switch(sketch.keyCode) {
      case 32:
        if (state.looping) {
          sketch.noLoop();
          state.looping = 0;
        } else {
          sketch.loop();
          state.looping = 1;
        }
        break;
      case sketch.BACKSPACE:
        if (!state.looping) {
          sketch.loop();
          state.looping = 1;
        }
        uni.clearGrid();
        uni.renderGrid();
        break;
      case sketch.ENTER:
        if (!state.looping) {
          sketch.loop();
          state.looping = 1;
        }
        uni.resetGridRandom();
        break;
    };
  };
};

var myp5 = new p5(p5Canvas, 'sketch');
