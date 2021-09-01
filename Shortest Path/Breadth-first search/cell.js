function cell(posX, posY, size) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.visited = false;
    this.shortedPathVisited = false;

    // neighbours
    this.adjacentNeighbours = [];
    // neighbours with opens walls
    this.connectedNeighbours = [];

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

    this.addAdjacentNeighbour = function (cell) {
        this.adjacentNeighbours.push(cell);
    }

    this.addConnectedNeighbours = function(neighbour) {
        this.connectedNeighbours.push(neighbour);
    }

    this.getRandomNeighbour = function () {
        var neighbours = this.getAdjacentNeighbours();
        if (neighbours.length > 0) {
            let r = floor(random(0, neighbours.length));
            return neighbours[r];
        } else {
            return undefined;
        }
    }

    this.getAdjacentNeighbours = function () {
        var neighbours = [];

        for (let i = 0; i < this.adjacentNeighbours.length; i++) {
            if (this.adjacentNeighbours[i].visited === false)
                neighbours.push(this.adjacentNeighbours[i]);
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