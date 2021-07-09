# Conway Painter
---


## Overview

Conway Painter is a game inspired by Conway's Game of Life (CGOL), a well-known cellular automaton invented by mathematician John Conway. A cellular automaton consists of a regular grid of cells, with each cell having a finite number of states. At set time intervals, the state of each cell is updated according to a set of rules governed by the state of other cells in each cell's "neighborhood".

With Conway Painter, you can interact with the underlying cellular automaton by painting cells on
a canvas that represents the automaton's universe. As you paint on the canvas, cells are brought to life, able to start affecting the states of cells in their neighborhood. The universe can be paused or cleared, and then restarted, allowing you to create different seed shapes to explore the patterns
and behaviors that can emerge. A slider is provided to enable you to adjust the generation time.

In the classic Conway's Game of Life, the universe consists of a regular square grid, with each cell being either "state" or "dead", and influenced by an eight-cell neighborhood.

Conway Painter departs from its classic counterpart by using a regular hexagonal grid, with each cell having one of three states - 0, 1, or 2 - and is influenced by a six-cell neighborhood. At each time interval, each cell's state is updated according to a new set of rules, based of the sum of cell states in the 6-cell neighborhood (the "headcount"):

- A dead cell (state 0), reanimates to a state 1 cell if the headcount is exactly 4
- A state 1 cell evolves into a state 2 cell if the headcount is 1, 2, 3, 4, or 6, otherwise, it dies (state 0)
- A state 2 cell maintains its state if the headcount is exactly 1, regresses to a
state 1 cell if the headcount is 2 or 4, and dies otherwise (state 0)


![alt text](https://media.giphy.com/media/l0IsIcCi8IB8Qnigg/giphy.gif "Conway Painter")

## Architecture and Technologies

This project is implemented with the following technologies:
- vanilla JavaScript for overall functionality/logic
- p5.js for drawing/rendering the CGOL universe and implementing the painting interface
- Webpack to bundle and serve up scripts

#### Scripts
- universe.js: logic for creating/updating visual elements in CGOL universe (cells)
- cell.js: cell objects for maintaining cell state (cube and pixel coordinates, state, etc.) and logic for determining new state, polling state of neighbors, and interconverting between coordinate systems
- painter.js: logic for rendering grid and cells into p5.js canvas
- interface.js: logic for UI elements

## Challenges

The primary challenge of implementing Conway Painter was in dealing with the hexagonal grid. Due to the offset nature of a hexagonal grid, a typical rectangular coordinate system is unsuitable without modification (offsetting coordinates). Offsetting a rectangular coordinate system is complicated and tedious to manage, so a modified cubic/axial coordinate system was chosen.

Using cubic coordinates was necessary in implementing the neighbor polling logic (how cells determine who is in their neighborhood), but these coordinates are unsuitable for rendering purposes, where pixels are mapped according to a rectangular coordinate system. To deal with this, functions were implemented to interconvert between coordinate systems, properly generate and seed the universe grid, as well as functions to efficiently pull appropriate cells from the two-dimensional array used for implementing the grid.

Citation: https://www.redblobgames.com/grids/hexagons/

```javascript
generateGrid(seed) {
  let q;
  let r;
  let qStart = 1;
  let rStart = 0;
  let grid = [];
  let tempRow = [];

  for (let i = 0; i < this.gridHeight; i++) {
    if (i % 2 === 0) {
      qStart --;
    }
    q = qStart;
    if (i % 2 !== 0) {
      rStart --;
    }
    r = rStart;

    for (let j = 0; j < this.gridWidth; j++) {
      const s = (-q - r);
      tempRow.push(new Cell(q, r, s, this, seed));
      q++;
      r--;
    };
    grid.push(tempRow);
    tempRow = [];
  };
  return grid;
}

hexToPixel(q, s, size) {
  const x = (Math.sqrt(3) * q + Math.sqrt(3) / 2 * s) * size;
  const y = (3 / 2) * s * size;
  const pixelCoord = { x: x, y: y };
  return pixelCoord;
}

pixelToHex(x, y) {
  const q = (x * (Math.sqrt(3) / 3) - (y / 3)) / this.cellSize;
  const s = (y * (2 / 3)) / this.cellSize;
  return this.roundHex(q, s);
}

roundHex(q, s) {
  let r = -q - s
  let rQ = Math.round(q);
  let rR = Math.round(r);
  let rS = Math.round(s);
  const qDiff = Math.abs(rQ - q);
  const rDiff = Math.abs(rR - r);
  const sDiff = Math.abs(rS - s);

  if (qDiff > rDiff && qDiff > sDiff) {
    rQ = -rR - rS;
  } else if (rDiff > sDiff) {
    rR = -rQ - rS;
  } else {
    rS = -rQ - rR;
  }
  return { q: rQ, s: rS };
}
```
