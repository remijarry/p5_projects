function maze(size, nbCells) {
    this.cells = [];
    this.nbCells = nbCells;
    this.cellSize = Math.floor(size / nbCells);

    //todo: refactor this to use only one for loop and calculate a 2D index based on the 1D index
    for (let row = 0; row < nbCells; row++)
        for (let col = 0; col < nbCells; col++)
            this.cells.push(new cell(col, row, this.cellSize));


    //north, easth, south, west
    let dirX = [-1, 0, 1, 0];
    let dirY = [0, 1, 0, -1];
    for (let cellIndex = 0; cellIndex < this.cells.length; cellIndex++) {
        for (let i = 0; i < dirX.length; i++) {
            let rr = this.cells[cellIndex].posX + dirX[i];
            let cc = this.cells[cellIndex].posY + dirY[i];
            if (rr < 0 || cc < 0)
                continue
            if (rr >= this.nbCells || cc >= this.nbCells)
                continue;

            var index1D = rr + cc * this.nbCells;
            var neighbour = this.cells[index1D];
            this.cells[cellIndex].addAdjacentNeighbour(neighbour);
        }
    }

    this.show = function () {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].show();
        }
    }

    this.debug = function () {
        for (let i = 0; i < this.cells.length; i++) {
            console.log(this.cells[i]);
        }
    }

    this.highlightCell = function (mouseX, mouseY) {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].clickedInside(mouseX, mouseY)) {
                this.cells[i].highlight();
                maze.breadthFirstSearch(0, this.cells[i])
                break;
            }
        }
    }

    this.generateMaze = function () {
        let stack = [];
        let startCellIndex = floor(random(0, this.cells.length))
        let startCell = this.cells[0]
        startCell.visited = true;
        stack.push(startCell);
        while (stack.length > 0) {
            let current = stack.pop();
            current.visited = true;
            let next = current.getRandomNeighbour();
            if (next) {
                stack.push(current);
                next.visited = true;
                stack.push(next)
                this.removeWall(current, next)
                current.addConnectedNeighbours(next);
            } else if (stack.length > 0) {
                current = stack.pop();
            }
        }
    }

    this.removeWall = function (current, next) {
        let x = current.posX - next.posX;
        if (x === 1) {
            current.removeWall(3)
            next.removeWall(1);
        } else if (x === -1) {
            current.removeWall(1);
            next.removeWall(3);
        }

        let y = current.posY - next.posY;
        if (y === 1) {
            current.removeWall(0);
            next.removeWall(2);
        } else if (y === -1) {
            current.removeWall(2);
            next.removeWall(0);
        }
    }

    this.breadthFirstSearch = function (startCell, destinationCell) {
        let start = this.cells[startCell];
        let destination = destinationCell

        let queue = [start];
        let traveledPath = [];
        while (queue.length > 0) {
            const current = queue.shift();

            if (current === destination) {
                console.log(traveledPath);
                return traveledPath; //this.reconstructPath(startCell, destinationCell, traveledPath);
            }

            for (const neighbour of current.connectedNeighbours) {
                if (neighbour.shortedPathVisited === false) {
                    neighbour.shortedPathVisited = true;
                    queue.push(neighbour);
                    traveledPath.push(neighbour);
                }
            }
        }

        // reconstruct the path -> 39:29
    }

    this.reconstructPath = function (startCell, destinationCell, traveledPath) {
        let path = [];
        for(let at = destinationCell; at !== undefined; at = traveledPath[at])
            path.push(at);


        // reverse path

        if (path[0] == startCell)
            return path;
        return [];
    }
}