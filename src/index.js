import Universe from './universe';
import CONSTANTS from './constants';
import Interface from './interface';

const {
        RUN,
        RING,
        DEFAULT,
        INSPECT
      } = CONSTANTS;

const p5Canvas = function( sketch ) {
  let width = sketch.windowWidth +50;
  let height = sketch.windowHeight + 50;
  let cellSize = 8;

  let uni = new Universe(width, height, cellSize, sketch);
  let ui = new Interface(sketch, uni);



  sketch.setup = function() {
    let canvas = sketch.createCanvas(width, height);
    canvas.position(-50, -50);
    sketch.cursor(sketch.CROSS);
    ui.interfaceSetup('ui-controls');

  };

  sketch.draw = function() {
    sketch.frameRate(ui.slider.value());
    sketch.background('black');
    uni.render();
    uni.painter.renderCursor();
    fpsCounter();
  };

  sketch.windowResized = function() {
    width = sketch.windowWidth +50;
    height = sketch.windowHeight + 50;
    sketch.resizeCanvas(width, height);
    uni = new Universe(width, height, cellSize, sketch);
    ui.universe = uni;
    ui.painter = uni.painter;
  }

  const fpsCounter = function() {
    sketch.push();
    sketch.fill(255);
    sketch.stroke(0);
    var fps = sketch.frameRate();
    sketch.text("FPS: " + fps.toFixed(2), sketch.width - 80, sketch.height - 85);
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
    switch(uni.painter.mode) {
      case INSPECT:
        console.log(
          uni.getCellPixel(sketch.mouseX, sketch.mouseY)
        );
        break;
      default:
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
        break;
    }

  };

  sketch.mouseReleased = function() {
  };

  // sketch.mouseClicked = function() {
  //
  //   switch(uni.painter.stamp) {
  //     case RING:
  //       uni.painter.setStamp();
  //       break;
  //     default:
  //       uni.painter.paintCell(
  //         sketch.mouseX,
  //         sketch.mouseY
  //         );
  //       break;
  //   };
  // };

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
