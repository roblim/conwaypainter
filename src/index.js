import Universe from './universe'

const p5Canvas = function( sketch ) {

  const width = sketch.windowWidth * 0.98;
  const height = sketch.windowHeight * 0.97;
  const hexSize = 10;

  const uni = new Universe(width, height, hexSize, sketch);

  sketch.setup = function() {
    sketch.createCanvas(width, height);

  };

  sketch.draw = function() {
    sketch.background(102);
    uni.renderGrid();

  };
};

var myp5 = new p5(p5Canvas, 'sketch');
