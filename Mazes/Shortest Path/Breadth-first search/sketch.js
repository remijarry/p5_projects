let mazeSize = 800;
let nbCells = 50;
let cellSize = Math.floor(mazeSize / nbCells);
let grid = [];

let current;
let start;
let end;
let destination;
let destinationFound = false;
let queue = [];let prev = [];
let shortestPath;

function setup() {
    createCanvas(mazeSize, mazeSize);
    createGridWithCells();
    addNeighbours();
    generateMaze();

    start = 0;
    prev = new Array(grid.length);
    queue.push(grid[start]);
    // frameRate(3)
}



function draw() {
    background(51);
    showGrid();
    if (destination) {
        if (!destinationFound) {
            findShortestPath();
        }
    }
}

function showGrid() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function createGridWithCells() {
    let index = 0;
    for (let row = 0; row < nbCells; row++)
        for (let col = 0; col < nbCells; col++)
            grid.push(new Cell(col, row, cellSize, index++));
}

function addNeighbours() {
    //north, easth, south, west
    let dirX = [-1, 0, 1, 0];
    let dirY = [0, 1, 0, -1];

    for (let cellIndex = 0; cellIndex < grid.length; cellIndex++) {
        for (let i = 0; i < dirX.length; i++) {
            let rr = grid[cellIndex].posX + dirX[i];
            let cc = grid[cellIndex].posY + dirY[i];
            if (rr < 0 || cc < 0)
                continue
            if (rr >= nbCells || cc >= nbCells)
                continue;

            var index1D = rr + cc * nbCells;
            var neighbour = grid[index1D];
            grid[cellIndex].addNeighbour(neighbour);
        }
    }
}

function generateMaze() {
    let stack = [];
    let startCell = grid[0];
    startCell.visited = true;
    stack.push(startCell);
    while (stack.length > 0) {
        let current = stack.pop();
        current.visited = true;
        let next = current.getRandomNeighbour(nbCells);
        if (next) {
            stack.push(current);
            next.visited = true;
            stack.push(next);
            removeWall(current, next);
            current.addConnectedNeighbour(next);
            next.addConnectedNeighbour(current);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    }

    // reset the visited property for the BFS to perform.
    for (let i = 0; i < grid.length; i++)
        grid[i].visited = false;
}

function removeWall(current, next) {
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

function reconstructPath(start, end, prev) {
    for (let at = end; at > 0; at = prev[at].index) {
        let from = grid[prev[at].index];
        
        grid[at].inShortestPath = true;
        grid[at].from = from;
    }
    grid[start].inShortestPath = true;
}

function findShortestPath() {
    if (queue.length > 0) {
        current = queue.shift();
        current.highlighted = true
        if (current === destination) {
            destinationFound = true;
            this.reconstructPath(start, destination.index, prev);
        }

        for (const neighbour of current.opennedNeighbours) {
            if (neighbour.visited)
                continue;
            neighbour.visited = true;
            queue.push(neighbour);
            prev[neighbour.index] = current;

        }
    }
}

function mouseClicked() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].clickedInside(mouseX, mouseY)) {
            destination = grid[i];
            grid[i].isDestination = true;
            break;
        }
    }
}

