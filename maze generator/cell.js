function cell(posX, posY) {
    this.rowIndex = posX;
    this.colIndex = posY
    this.visited = false;
    //top, right, bottom, left
    this.walls = [true, true, true, true];
    this.backtracked = false;

    // cardinal directions
    let dirX = [-1, 0, 1, 0];
    let dirY = [0, 1, 0, -1];
    this.show = function () {
        let x = this.rowIndex * cellSize;
        let y = this.colIndex * cellSize;
        stroke(51);
        strokeWeight(3)
        if (this.walls[0]) // top
            line(x, y, x + cellSize, y);
        if (this.walls[1]) // right
            line(x + cellSize, y, x + cellSize, y + cellSize)
        if (this.walls[2]) // bottom
            line(x + cellSize, y + cellSize, x, y + cellSize)
        if (this.walls[3]) // left
            line(x, y + cellSize, x, y)
        if (this.visited) {
            noStroke();
            fill('rgba(100%,0%,100%,0.5)');
            rect(x, y, cellSize, cellSize);
        }

        if (this.backtracked) {
            noStroke();
            fill(color(0, 0, 255));
            rect(x, y, cellSize, cellSize);
        }
    }

    this.getRandomNeighbour = function () {
        var neighbours = [];
        for (let i = 0; i < dirX.length; i++) {
            let rr = this.rowIndex + dirX[i];
            let cc = this.colIndex + dirY[i];
            if (rr < 0 || cc < 0)
                continue;
            if (rr >= rows || cc >= cols)
                continue

            var index1D = rr + cc * cols;
            var neighbour = grid[index1D];
            if (neighbour.visited == false)
                neighbours.push(neighbour);
        }

        if (neighbours.length > 0) {
            let r = floor(random(0, neighbours.length));
            return neighbours[r];
        } else {
            return undefined;
        }
    }

    this.removeWall = function (position) {
        this.walls[position] = false
    }

    this.highlight = function () {
        let x = this.rowIndex * cellSize;
        let y = this.colIndex * cellSize;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, cellSize, cellSize);
    };
}