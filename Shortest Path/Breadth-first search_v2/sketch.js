let size = 800;
let nbCells = 5;
let cellSize = Math.floor(size / nbCells);
let grid = [];

let start;
let end;
function setup() {
    createCanvas(size, size);
    createGridWithCells();
    addNeighbours();
    generateMaze();
    console.log(grid)
    start = 0;
    end = 24;
}


let queue = [];
let current = grid[start];
function draw() {
    background(51);
    removeElements();
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function createGridWithCells() {
    for (let row = 0; row < nbCells; row++)
        for (let col = 0; col < nbCells; col++)
            grid.push(new Cell(col, row, cellSize));
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
