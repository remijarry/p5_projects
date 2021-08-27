let width = 800;
let height = 800;
let nbCellsPerRow = 10;
let cellSize = Math.floor(width / nbCellsPerRow)
let rows = Math.floor(width / cellSize);
let cols = Math.floor(height / cellSize);
let grid = [];
let startCell = 0;
queue = [];


let current;
function setup() {
  createCanvas(width, height);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid.push(new cell(col, row));
    }
  }
  frameRate(15)
  current = grid[startCell];
}


function draw() {
  background(255);
  for (i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  let next = current.getRandomNeighbour();
  if (next) {
    next.visited = true;

    queue.push(current);

    removeWall(current, next);

    current = next;

  } else if (queue.length > 0) {
    current.backtracked = true;
    current = queue.pop();
  }

}

function removeWall(current, next) {
  let x = current.rowIndex - next.rowIndex;
  if (x === 1) {
    current.removeWall(3)
    next.removeWall(1);
  } else if (x === -1) {
    current.removeWall(1);
    next.removeWall(3);
  }

  let y = current.colIndex - next.colIndex;
  if (y === 1) {
    current.removeWall(0);
    next.removeWall(2);
  } else if (y === -1) {
    current.removeWall(2);
    next.removeWall(0);
  }
}

// Choose the initial cell, mark it as visited and push it to the stack
// While the stack is not empty
//     Pop a cell from the stack and make it a current cell
//     If the current cell has any neighbours which have not been visited
//         Push the current cell to the stack
//         Choose one of the unvisited neighbours
//         Remove the wall between the current cell and the chosen cell
//         Mark the chosen cell as visited and push it to the stack
