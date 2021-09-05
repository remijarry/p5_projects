class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];
        this._prepareGrid();
        this._configureCells();
    }

    _prepareGrid() {
        for (let row = 0; row < this.rows; row++) {
            let rowArray = [];
            for (let col = 0; col < this.columns; col++) {
                rowArray.push(new Cell(col, row));
            }
            this.cells.push(rowArray);
        }
    }

    /**
     * Loops through the grid and for each cell add their direct neightbor (north, east, south, west)
     */
    _configureCells() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this._addConnectedCells(row, col)
            }
        }
    }

    /**
     * 
     * @param {row index in the grid} row 
     * @param {column index in the gris} col 
     */
    _addConnectedCells(row, col) {
        //north, easth, south, west
        let dirX = [-1, 0, 1, 0];
        let dirY = [0, 1, 0, -1];

        for (let i = 0; i < dirX.length; i++) {
            let rr = row + dirX[i];
            let cc = col + dirY[i]

            if (rr < 0 || cc < 0)
                continue;
            if (rr >= this.rows || cc >= this.columns)
                continue;

            if (i === 0) {
                this.cells[row][col].north = this.cells[rr][cc];
            } else if (i === 1) {
                this.cells[row][col].east = this.cells[rr][cc];
            } else if (i === 2) {
                this.cells[row][col].south = this.cells[rr][cc];
            } else {
                this.cells[row][col].west = this.cells[rr][cc];
            }

        }
    }

    /**
     * Returns a random cell within the grid.
     */
    getRandomCell() {
        let rowIndex = random(this.rows)
        let columnIndex = random(this.columns);

        return this.cells[rowIndex][columnIndex];
    }

    /**
     * Returns the number of cells in the grid.
     */
    getGridSize() {
        return this.rows * this.columns;
    }

    /**
     * 
     * @param {The row to return} rowIndex 
     * @returns An array containing the row at rowIndex
     */
    getRow(rowIndex) {
        if (rowIndex >= 0 || rowIndex < this.rows)
            return this.cells[rowIndex];
        return undefined;
    }

    /**
     * 
     * @param {The column to return} columnIndex 
     * @returns En array containung the column at columnIndex
     */
    getColumn(columnIndex) {
        let columnsArray = [];
        if (columnIndex >= 0 || columnIndex < this.columns) {
            for (let row = 0; row < this.rows; row++)
                columnsArray.push(this.cells[row][columnIndex])

            return columnsArray;
        }
        return undefined;
    }
}

Grid.prototype.toString = function toString() {
    let output = "+"
    for (let i = 0; i < this.columns; i++) {
        output += "---+";
    }
    output += "\n";

    for (row in this.cells) {
        let top = "|";
        let bottom = "+";
        for (col in this.cells[row]) {
            let cell = this.cells[row][col];
            body = "   ";

            let eastBoundary = cell.isLinked(cell.east) ? " " : "|";
            top += body;
            top += eastBoundary;

            let southBoundary = cell.isLinked(cell.south) ? "   " : "---";
            let corner = "+";
            bottom += southBoundary;
            bottom += corner;
        }
        output += top;
        output += "\n";
        output += bottom;
        output += "\n";
    }
    console.log(output)
}

Grid.prototype.toCanvas = function (canvasWidth) {
    let cellSize = (canvasWidth / this.rows);
    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.columns; col++) {
            let cell = this.cells[row][col];
            let x1 = cell.pos.x * cellSize;
            let y1 = cell.pos.y * cellSize;
            let x2 = (cell.pos.x + 1) * cellSize;
            let y2 = (cell.pos.y + 1) * cellSize;

            stroke(255);
            strokeWeight(2)
            if (!cell.north)
                line(x1, y1, x2, y1);
            if (!cell.west)
                line(x1, y1, x1, y2);
            if (cell.east && !cell.isLinked(cell.east))
                line(x2, y1, x2, y2)
            if (cell.south && !cell.isLinked(cell.south))
                line(x1, y2, x2, y2);
        }

    }
}