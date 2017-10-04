import Universe from './universe'

const p5Canvas = function( sketch ) {

  const width = sketch.windowWidth * 0.98;
  const height = sketch.windowHeight * 0.97;
  const cellSize = 11;

  const uni = new Universe(width, height, cellSize, sketch);

  sketch.setup = function() {
    sketch.createCanvas(width, height);
    // sketch.setFrameRate(30);
  };

  sketch.draw = function() {
    sketch.background('black');
    uni.renderGrid();
    uni.generationCycle();

    sketch.push();
    sketch.fill(255);
    sketch.stroke(0);
    var fps = sketch.frameRate();
    sketch.text("FPS: " + fps.toFixed(2), 10, sketch.height - 10);
    sketch.pop();
  };

  const state = {
    looping: 1
  }

  sketch.mousePressed = function() {
    if (!state.looping) {
      sketch.loop();
      state.looping = 1;
    }
    uni.resetGridRandom();
  };

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
