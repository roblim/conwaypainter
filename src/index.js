import Universe from './universe';
import CONSTANTS from './constants';

const {
        RUN,
        RING,
        DEFAULT
      } = CONSTANTS;

const p5Canvas = function( sketch ) {
  const width = sketch.windowWidth * 0.97;
  const height = sketch.windowHeight * 0.96;
  const cellSize = 8;

  const uni = new Universe(width, height, cellSize, sketch);

  sketch.setup = function() {
    sketch.createCanvas(width, height);
    sketch.cursor(sketch.CROSS);
  };

  sketch.draw = function() {
    sketch.background('black');
    uni.render();
    uni.painter.renderCursor();
    fpsCounter();
  };

  const fpsCounter = function() {
    sketch.push();
    sketch.fill(255);
    sketch.stroke(0);
    var fps = sketch.frameRate();
    sketch.text("FPS: " + fps.toFixed(2), 10, sketch.height - 10);
    sketch.pop();
  };

  sketch.touchStarted = function() {
    uni.painter.paintCell(
      sketch.mouseX,
      sketch.mouseY,
      1);
    return false;
  };

  sketch.touchEnded = function() {
    return false;
  };

  sketch.touchMoved = function() {
    uni.painter.paintCell(
      sketch.mouseX,
      sketch.mouseY,
      1);
    uni.painter.paintCell(
      sketch.pmouseX,
      sketch.pmouseY,
      1);
    return false;
  };

  sketch.mousePressed = function() {
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
  };

  sketch.mouseReleased = function() {
  };

  sketch.mouseClicked = function() {
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
  };

  sketch.mouseDragged = function() {
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
  }

  sketch.deviceShaken = function() {
    if (uni.painter.mode === RUN) {
      uni.painter.mode = null;
      uni.clearGrid();
    } else {
      uni.painter.mode = RUN;
    }
  };

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
