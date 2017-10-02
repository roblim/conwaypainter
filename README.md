# conwaypainter
---


## Background and Overview

Conway's Game of Life (CGOL) is a well-known cellular automaton invented by mathematician John Conway. ConwayPainter is a tool for creating and interacting with Conway's Game of Life universes.  

A cellular automaton consists of a regular grid of cells, with each cell having a finite number of states. At set time intervals, the state of each cell is updated according to a set of rules governed by the state of other cells in each cell's "neighborhood". When implemented visually, cellular automata can result in complex and beautiful patterns and animations, each with it's own personality.

In Conway's Game of Life, each cell is either "alive" or "dead" and is affected by eight neighbors - those cells that are vertically, horizontally, or diagonally adjacent. At each time interval, each cell's state is updated according to the following rules:

1. Any live cell with fewer than two live neighbors dies.
2. Any live cell with two or three live neighbors lives.
3. Any live cell with more than three live neighbors dies.
4. Any dead cell with exactly three live neighbors becomes a live cell.

An initial pattern is created by assigning the state of each cell (randomly or in a desired shape) and then subsequent generations are created by applying the above rules simultaneously to every cell in the universe.

Users of ConwayPainter create the seed state by "painting" on a canvas, using either a basic brush tool, or one of a set of pre-defined "stamps". These stamps are patterns that are known to have interesting visual effects or behavior.

## Functionality and MVP

In ConwayPainter, users will be able to:  
- [ ] create/clear a CGOL seed state using a "painting" interface
- [ ] select from a palette of known patterns
- [ ] start/pause/restart universe propagation
- [ ] control the speed of propagation

## Wireframes

The app will consist of a single screen with the universe canvas, start/top/reset controls, a propagation speed slider, a stamp/brush palette, nav links to Github and LinkedIn, and an About modal.

### [Wireframes](https://github.com/roblim/conwaypainter/blob/master/conway_painter_wireframe.png)

## Architecture an Technologies

This project will be implemented with the following technologies:
- vanilla JavaScript for overall functionality/logic
- p5.js for drawing/rendering the CGOL universe and implementing the painting interface. Using p5.js vs. direct HTML5 Canvas manipulation will allow me to spend more time playing with variations on the classic square grid implementation of CGOL.
- Webpack to bundle and serve up scripts

#### Scripts
- universe.js: logic for creating/updating visual elements in CGOL universe (cells)
- life_rules.js: logic for governing universe propagation rules
- painter.js: logic for paint interface/user interaction with CGOL universe
- palette.js logic for stamp palette

## Implementation Timeline

**Day 1:** Set up project skeleton (webpack, index.html file, config files, etc.). Flesh out architecture and script functions. Get up the speed with p5.js - enough to implement static universe (single snapshot)

**Day 2:** Implement active CGOL universe (animating) and begin implementing paint/input interface

**Day 3:** Complete paint/input interface

**Day 4:** Implement and style web UI

## Bonus Features
- [ ] Users are also able to create their own custom stamp palette.
- [ ] Users can paint with colors.
- [ ] Users can select from a palette of other life-like rules.
- [ ] Incorporation of a sound component with a basic sequencer interface.
