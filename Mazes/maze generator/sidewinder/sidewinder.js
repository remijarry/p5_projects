"use strict";

class Sindewinder {
  constructor(nbCells, context) {
    this.grid = new Grid(nbCells, context);
    this.context = context;
    this._carveMaze();
  }

  _carveMaze() {
    for (let row = 0; row < this.grid.rows; row++) {
      let run = [];
      for (let col = 0; col < this.grid.columns; col++) {
        let currentCell = this.grid.cells[row][col];
        run.push(currentCell);
        //animate here
        let atEasternBounday = currentCell.east === undefined;
        let atNorthernBoundary = currentCell.north === undefined;
        let shouldCloseOut =
          atEasternBounday ||
          (!atNorthernBoundary && Math.floor(this.context.random(2)) === 0);

        if (shouldCloseOut) {
          let member = this.context.random(run);
          if (member.north) member.link(member.north);

          run = [];
        } else {
          currentCell.link(currentCell.east);
        }
      }
    }
  }
}

// The code below is used to handle multiple sketches on the screen.

var sideWinder = function (sw) {
  sw.grid;
  sw.canvasSize = sw.windowWidth / 3;
  sw.setup = function () {
    sw.createCanvas(sw.canvasSize, sw.canvasSize);
    sw.maze = new Sindewinder(20, sw);
  };

  sw.draw = function () {
    sw.background(51);

    let cellSize = sw.canvasSize / sw.maze.grid.rows;
    for (let row = 0; row < sw.maze.grid.rows; row++) {
      for (let col = 0; col < sw.maze.grid.columns; col++) {
        let cell = sw.maze.grid.cells[row][col];
        let x1 = cell.pos.x * cellSize;
        let y1 = cell.pos.y * cellSize;
        let x2 = (cell.pos.x + 1) * cellSize;
        let y2 = (cell.pos.y + 1) * cellSize;

        sw.stroke(255);
        sw.strokeWeight(2);
        if (!cell.north) {
          sw.line(x1, y1, x2, y1);
        }
        if (!cell.west) {
          sw.line(x1, y1, x1, y2);
        }
        if (cell.east && !cell.isLinked(cell.east)) {
          sw.line(x2, y1, x2, y2);
        }
        if (cell.south && !cell.isLinked(cell.south)) {
          sw.line(x1, y2, x2, y2);
        }
      }
    }
  };
};
