import Universe from './universe';
import CONSTANTS from './constants';

// $('html, body').on('touchmove', function(e){
//      //prevent native touch activity like scrolling
//      e.preventDefault();
// });

const {
        RUN,
        PAINT,
        RING,
        DEFAULT
      } = CONSTANTS;

const p5Canvas = function( sketch ) {
  const width = sketch.windowWidth * 0.97;
  const height = sketch.windowHeight * 0.96;
  const cellSize = 8;
  let seed;
  // const seed = 0;

  const uni = new Universe(width, height, cellSize, sketch);

  sketch.setup = function() {
    sketch.createCanvas(width, height);
    sketch.cursor(sketch.CROSS);
    // sketch.noCursor();

  };

  sketch.draw = function() {
    sketch.background('black');
    uni.painter.renderCursor();
    uni.render();
    fpsCounter();

  };

  const fpsCounter = function() {
    sketch.push();
    sketch.fill(255);
    sketch.stroke(0);
    var fps = sketch.frameRate();
    sketch.text("FPS: " + fps.toFixed(2), 10, sketch.height - 10);
    sketch.pop();
  }

  sketch.touchStarted = function() {
    if (uni.painter.mode === PAINT) {
      uni.painter.paintCell(
        sketch.mouseX,
        sketch.mouseY,
        1);
    }
    return false;
  }

  sketch.touchMoved = function() {
    if (uni.painter.mode === PAINT) {
      uni.painter.paintCell(
        sketch.mouseX,
        sketch.mouseY,
        1);
      uni.painter.paintCell(
        sketch.pmouseX,
        sketch.pmouseY,
        1);
    } else {
      uni.setCell(
        sketch.mouseX,
        sketch.mouseY,
        1);
      uni.setCell(
        sketch.pmouseX,
        sketch.pmouseY,
        1);
    }
    return false;
  }

  sketch.mousePressed = function() {
    if (uni.painter.mode === PAINT) {
      switch(uni.painter.stamp) {
        case RING:
          uni.painter.setStamp();
          break;
        default:
          uni.painter.paintCell(
            sketch.mouseX,
            sketch.mouseY,
            1);
          break;
      };
    }
  };

  sketch.mouseReleased = function() {
  };

  sketch.mouseClicked = function() {
    if (uni.painter.mode === PAINT) {
      switch(uni.painter.stamp) {
        case RING:
          uni.painter.setStamp();
          break;
        default:
          uni.painter.paintCell(
            sketch.mouseX,
            sketch.mouseY,
            1);
          break;
      };
    }
  };

  sketch.mouseDragged = function() {
    if (uni.painter.mode === PAINT) {
      switch(uni.painter.stamp) {
        case RING:
          uni.painter.setStamp();
          break;
        default:
          uni.painter.paintCell(
            sketch.mouseX,
            sketch.mouseY,
            1);
          uni.painter.paintCell(
            sketch.pmouseX,
            sketch.pmouseY,
            1);
          break;
      };
    } else {
      uni.setCell(
        sketch.mouseX,
        sketch.mouseY,
        1);
      uni.setCell(
        sketch.pmouseX,
        sketch.pmouseY,
        1);
    }
  }

  sketch.deviceShaken = function() {
    if (uni.painter.mode === PAINT) {
      uni.painter.mode = RUN;
      uni.painter.paintQueue = [];
    } else {
      uni.clearGrid();
      uni.painter.mode = PAINT;
    }
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
      case 80:
        if (uni.painter.mode === PAINT) {
          uni.painter.mode = RUN;
          uni.painter.paintQueue = [];
        } else {
          uni.clearGrid();
          uni.painter.mode = PAINT;
        }
    };
  };
};

var myp5 = new p5(p5Canvas, 'sketch');
