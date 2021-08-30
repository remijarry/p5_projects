function cell(posX, posY, size) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.visited = false;

    // available neighbours (with open walls)
    this.neighbours = [];

    //where do x and y start in pixels
    this.startX = this.posX * size;
    this.startY = this.posY * size;

    this.highlighted = false;
    this.defaultColor = "#D5E2ED";
    this.highlightColor = "#00ffff"

    this.top = 0;
    this.right = 1;
    this.bottom = 2;
    this.left = 3;
    this.walls = [true, true, true, true];


    this.show = function () {
        stroke(51);
        strokeWeight(2);
        let p = createP(this.posX + ", " + this.posY);
        p.position(this.startX + 10, this.startY + 10)
        if (this.walls[this.top]) {
            line(this.startX, this.startY, this.startX + this.size, this.startY);
        }

        if (this.walls[this.right]) {
            line(this.startX + this.size, this.startY, this.startX + this.size, this.startY + this.size)
        }

        if (this.walls[this.bottom]) {
            line(this.startX, this.startY + this.size, this.startX + this.size, this.startY + this.size)
        }

        if (this.walls[this.left]) {
            line(this.startX, this.startY, this.startX, this.startY + this.size)
        }

        if (this.highlighted) {
            noStroke();
            fill(this.highlightColor);
            rect(this.startX, this.startY, this.size, this.size);

        } else {
            noStroke();
            fill(this.defaultColor);
            rect(this.startX, this.startY, this.size, this.size);
        }
    }

    this.removeWall = function (direction) {
        this.walls[direction] = false;
    }

    this.addNeighbour = function (cell) {
        this.neighbours.push(cell);
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
            var neighbour = this.cells[index1D];
            if (neighbour.visited == false) {
                neighbours.push(neighbour);
            }
        }

        return neighbours;
    }

    this.clickedInside = function (mouseX, mouseY) {
        return (mouseX > this.startX &&
            mouseX < this.startX + this.size &&
            mouseY > this.startY &&
            mouseY < this.startY + this.size)
    }

    this.highlight = function () {
        this.highlighted = !this.highlighted;
    }

}