let grid;

function setup() {
    createCanvas(800, 800)
    //-----------------------------------
    grid = new Grid(50, 50);
    // let sidewinderMaze = new Sindewinder(grid);
    let binaryMaze = new BinaryTree(grid);
    grid.toString();
}

function draw() {
    background(51)
    removeElements();
    grid.toCanvas(width);
}