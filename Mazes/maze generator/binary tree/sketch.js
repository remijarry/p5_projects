function setup() {
    createCanvas(800, 600)
    let gridPerfStart = performance.now();
    let grid = new Grid(20, 20);
    let gridPerfEnd = performance.now();

    let binaryPerfStart = performance.now();
    let binaryTree = new BinaryTree(grid);
    let binaryPerfEnd = performance.now();

    grid.toString();

    console.log("grid perf: " + (gridPerfEnd - gridPerfStart))
    console.log("binaryTree perf: " + (binaryPerfEnd - binaryPerfStart))

}

function draw() {
    background(51)
}