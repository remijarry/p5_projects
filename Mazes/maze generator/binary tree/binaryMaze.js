/**
 * The binary tree algorithm visits each cell in the grid and chose to carve a passage either north or east
 */
class BinaryMaze {
  constructor(nbCells, context) {
    this.grid = new Grid(nbCells, context);
    this.context = context;
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
        let neighbors = [];
        if (this.grid.cells[row][col].north)
          neighbors.push(this.grid.cells[row][col].north);
        if (this.grid.cells[row][col].east)
          neighbors.push(this.grid.cells[row][col].east);

        let neighbor = this.context.random(neighbors);
        if (neighbor) {
          currentCell.link(neighbor);
        }
      }
    }
  }
}

// The code below is used to handle multiple sketches on the screen.

var binaryMaze = function (bm) {
  bm.canvasSize = bm.windowWidth / 3;
  bm.nbCells = 20;

  bm.unvisited = bm.nbCells * bm.nbCells;
  bm.rowIndex = 0;
  bm.colIndex = 0;

  bm.setup = function () {
    bm.createCanvas(bm.canvasSize, bm.canvasSize);
    bm.maze = new BinaryMaze(bm.nbCells, bm);
  };

  bm.draw = function () {
    bm.background(51);
    bm.maze.grid.toCanvas();

    if (this.unvisited > 0) {
      let currentCell = bm.maze.grid.cells[this.rowIndex][this.colIndex];

      let neighbors = [];
      if (bm.maze.grid.cells[this.rowIndex][this.colIndex].north)
        neighbors.push(bm.maze.grid.cells[this.rowIndex][this.colIndex].north);
      if (bm.maze.grid.cells[this.rowIndex][this.colIndex].east)
        neighbors.push(bm.maze.grid.cells[this.rowIndex][this.colIndex].east);

      let neighbor = bm.random(neighbors);
      if (neighbor) {
        currentCell.link(neighbor);
      }

      this.colIndex++;
      if (this.colIndex >= bm.nbCells) {
        this.rowIndex++;
        this.colIndex = 0;
      }
      this.unvisited--;
    }
  };
};
