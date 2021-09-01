function Cell(posX, posY, size) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    //where do x and y start in pixels
    this.startX = this.posX * size;
    this.startY = this.posY * size;
    this.walls = [true, true, true, true];
    this.visited = false;

    // available neighbours (with open walls)
    this.neighbours = [];
    this.opennedNeighbours = [];

    this.highlighted = false;

    this.show = function () {
        stroke(255);
        strokeWeight(1);

        // let p = createP(this.posX + ", " + this.posY);
        // p.position(this.startX + 10, this.startY + 10)

        if (this.walls[0]) {
            line(this.startX, this.startY, this.startX + this.size, this.startY);
        }

        if (this.walls[1]) {
            line(this.startX + this.size, this.startY, this.startX + this.size, this.startY + this.size)
        }

        if (this.walls[2]) {
            line(this.startX, this.startY + this.size, this.startX + this.size, this.startY + this.size)
        }

        if (this.walls[3]) {
            line(this.startX, this.startY, this.startX, this.startY + this.size)
        }

        if (this.highlighted) {
            noStroke();
            fill(0, 0, 255, 100);
            rect(this.startX, this.startY, this.size, this.size)
        }
    }

    this.removeWall = function (position) {
        this.walls[position] = false
    }

    this.addNeighbour = function (cell) {
        this.neighbours.push(cell);
    }

    this.addConnectedNeighbour = function (cell) {
        this.opennedNeighbours.push(cell);
    }

    this.getRandomNeighbour = function (bound) {
        var neighbours = this.getNeighbours(bound);
        if (neighbours.length > 0) {
            let r = floor(random(0, neighbours.length));
            return neighbours[r];
        } else {
            return undefined;
        }
    }

    this.getNeighbours = function (bound) {
        var neighbours = [];

        //north, easth, south, west
        let dirX = [-1, 0, 1, 0];
        let dirY = [0, 1, 0, -1];
        for (let i = 0; i < dirX.length; i++) {
            let rr = this.posX + dirX[i];
            let cc = this.posY + dirY[i];
            if (rr < 0 || cc < 0)
                continue
            if (rr >= bound || cc >= bound)
                continue;

            var index1D = rr + cc * bound;
            var neighbour = grid[index1D];
            if (neighbour.visited == false) {
                neighbours.push(neighbour);
            }
        }

        return neighbours;
    }
}