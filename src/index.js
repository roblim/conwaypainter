import Universe from './universe'

const p5Canvas = function( sketch ) {

  const width = sketch.windowWidth * 0.98;
  const height = sketch.windowHeight * 0.97;
  const cellSize = 10;

  const uni = new Universe(width, height, cellSize, sketch);

  sketch.setup = function() {
    sketch.createCanvas(width, height);
  };

  sketch.draw = function() {
    sketch.background(102);
    uni.renderGrid();
    const grid1 = uni.grid;
    uni.generationCycle();
    const grid2 = uni.grid;
  };

  sketch.mousePressed = function() {
    uni.resetGridRandom();
  }
};

var myp5 = new p5(p5Canvas, 'sketch');
