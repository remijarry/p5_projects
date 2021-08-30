let size = 600;
let nbCells = 3;
var maze = new maze(size, nbCells);
let click = true;

function setup() {
    createCanvas(size, size);
    maze.debug();
    // maze.generateMaze()
}

function draw() {
    background(255);
    maze.show();
    // if(click) {
    //     console.log(click)
    // }
}

function mouseClicked() {
    maze.highlightCell(mouseX, mouseY);
    //click = !click;
    // run the search here ?
}

