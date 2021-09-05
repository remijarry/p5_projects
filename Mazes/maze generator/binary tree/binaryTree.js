/**
 * The binary tree algorithm visits each cell in the grid and chose to carve a passage either north or east
 */
class BinaryTree {
    constructor(grid) {
        this.grid = grid;
        this._carveMaze();
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

                let neighbor = random(neighbors);
                if (neighbor) {
                    currentCell.link(neighbor);
                }
            }
        }
    }
}