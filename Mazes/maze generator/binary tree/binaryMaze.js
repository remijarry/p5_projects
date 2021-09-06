/**
 * The binary tree algorithm visits each cell in the grid and chose to carve a passage either north or east
 */
class BinaryMaze {
  constructor(nbCells, context) {
    this.grid = new Grid(nbCells, context);
    this.context = context;
    //this._carveMaze();
  }

  /**
   *
   * @param {The grid where the maze will be drawn} grid
   * @param {The neighbors of each cell in the grid} neighbors
   */
  _carveMaze() {
    for (let row = 0; row < this.grid.rows; row++) {
      for (let col = 0; col < this.grid.columns; col++) {
        let currentCell = this.grid.cells[row][col];
        // animate here.
        let neighbors = [];
        if (this.grid.cells[row][col].north)
          neighbors.push(this.grid.cells[row][col].north);
        if (this.grid.cells[row][col].east)
          neighbors.push(this.grid.cells[row][col].east);

        let neighbor = this.context.random(neighbors);
        if (neighbor) {
          currentCell.link(neighbor);
        }

        this.grid.toConsole();
        this.grid.toCanvas();
      }
    }
  }
}

// The code below is used to handle multiple sketches on the screen.

var binaryMaze = function (bm) {
  bm.grid;
  bm.canvasSize = bm.windowWidth / 3;
  bm.setup = function () {
    bm.createCanvas(bm.canvasSize, bm.canvasSize);
    bm.maze = new BinaryMaze(20, bm);
    bm.maze.grid.toConsole();
  };

  bm.draw = function () {
    bm.background(51);
  };
};
