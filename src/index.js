import Universe from './universe';
import CONSTANTS from './constants';
import Interface from './interface';

const {
        RUN,
        RING,
        DEFAULT
      } = CONSTANTS;

const p5Canvas = function( sketch ) {
  const width = sketch.windowWidth * 0.98;
  const height = sketch.windowHeight - 40;
  const cellSize = 8;

  const uni = new Universe(width, height, cellSize, sketch);
  const ui = new Interface(sketch, uni);

  sketch.setup = function() {
    sketch.createCanvas(width, height);
    sketch.cursor(sketch.CROSS);
    ui.interfaceSetup();
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
      sketch.mouseY
      );
    return false;
  };

  sketch.touchEnded = function() {
    return false;
  };

  sketch.touchMoved = function() {
    switch(uni.painter.stamp) {
      case RING:
        uni.painter.setStamp();
        break;
      default:
        uni.painter.paintCell(
          sketch.mouseX,
          sketch.mouseY
          );
        if (uni.painter.mode === RUN) {
        uni.painter.paintCell(
          sketch.pmouseX,
          sketch.pmouseY
          );
        }
        break;
    };
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
          sketch.mouseY
          );
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
          sketch.mouseY
          );
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
          sketch.mouseY
          );
          if (uni.painter.mode === RUN) {
          uni.painter.paintCell(
            sketch.pmouseX,
            sketch.pmouseY
            );
          }
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
    return false;
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
