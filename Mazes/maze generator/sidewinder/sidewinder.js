class Sindewinder {
    constructor(grid) {
        this.grid = grid;
        this._carveMaze();
    }

    _carveMaze() {
        for (let row = 0; row < this.grid.rows; row++) {
            let run = [];
            for (let col = 0; col < this.grid.columns; col++) {
                let currentCell = this.grid.cells[row][col];
                run.push(currentCell);

                let atEasternBounday = currentCell.east === undefined;
                let atNorthernBoundary = currentCell.north === undefined;
                let shouldCloseOut = atEasternBounday || (!atNorthernBoundary && Math.floor(random(2)) === 0);

                if (shouldCloseOut) {
                    let member = random(run);
                    if (member.north)
                        member.link(member.north);

                    run = [];
                } else {
                    currentCell.link(currentCell.east)
                }
            }
        }
    }
}