import Universe from './universe'

const p5Canvas = function( sketch ) {

  const width = sketch.windowWidth * 0.98;
  const height = sketch.windowHeight * 0.97;
  const cellSize = 12;

  const uni = new Universe(width, height, cellSize, sketch);

  sketch.setup = function() {
    sketch.createCanvas(width, height);
    // sketch.setFrameRate(30);
  };

  sketch.draw = function() {
    sketch.background(102);
    uni.renderGrid();
    uni.generationCycle();

    sketch.push();
    sketch.fill(255);
    sketch.stroke(0);
    var fps = sketch.frameRate();
    sketch.text("FPS: " + fps.toFixed(2), 10, sketch.height - 10);
    sketch.pop();
  };

  sketch.mousePressed = function() {
    uni.resetGridRandom();
  }
};

var myp5 = new p5(p5Canvas, 'sketch');
