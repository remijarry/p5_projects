function maze(size, nbCells) {
    this.cells = [];
    this.nbCells = nbCells;
    this.cellSize = Math.floor(size / nbCells);

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
            this.cells[cellIndex].addNeighbour(neighbour);
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
                break;
            }
        }
    }

    this.generateMaze = function () {
        let stack = [];
        let startCellIndex = floor(random(0, this.cells.length))
        let startCell = this.cells[0] //this.cells[startCellIndex];
        startCell.visited = true;
        stack.push(startCell);
        // let current;
        while (stack.length > 0) {
            let current = stack.pop();
            current.visited = true;
            let next = current.getRandomNeighbour(this.nbCells);
            if (next) {
                stack.push(current);
                next.visited = true;
                stack.push(next)
                this.removeWall(current, next)
                current = next;
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
        // breadthFirstSearch(array) {
        //     let queue = [this];
        //     while (queue.length > 0) {
        //         const current = queue.shift();
        //         array.push(current.name);
        //         for (const child of current.children) {
        //             queue.push(child);
        //         }
        //     }

        //     return array;
        // }

        // create arrays (node_queue, visited_nodes, and traveled_path)
        // add the start to the arrays
        // while the queue is not empty
        //     take out the first element in the queue
        //     for each of the neighbors of this first element 
        //     if its not in the visited set and not blocked
        //         add this to the arrays
        //         if this contains what we are looking for
        //         return the backtrack of this node
        //         end if
        //     end if
        //     end for
        // end while
        let queue = [startcell];
        let path = [startCell];
        while (queue.length > 0) {
            const current = queue.shift();

        }
    }
}