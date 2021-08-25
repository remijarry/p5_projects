let width = 800;
let height = 800;

class Cell {
  constructor(w, h, posX, posY) {
    this.width = w;
    this.height = h;
    this.posX = posX;
    this.posY = posY
  }

  draw() {
    rect(this.posX, this.posY, this.width, this.height)
  }
}

size = 30;
step = width / size;
cells = []
for (let i = 0; i < width; i += step) {
  for(let j = 0; j < height; j+= step) {
    cells.push(new Cell(step, step, i, j))

  }
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);
  stroke(0);
  for (let i = 0; i < cells.length; i++) {
    cells[i].draw()
  }
}


// Randomly select a node (or cell) N.
// Push the node N onto a queue Q.
// Mark the cell N as visited.
// Randomly select an adjacent cell A of node N that has not been visited. If all the neighbors of N have been visited:
//     Continue to pop items off the queue Q until a node is encountered with at least one non-visited neighbor - assign this node to N and go to step 4.
//     If no nodes exist: stop.
// Break the wall between N and A.
// Assign the value A to N.
// Go to step 2.
