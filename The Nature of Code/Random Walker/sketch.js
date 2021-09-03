let w;

function setup() {
    createCanvas(800, 600);
    w = new Walker(width / 2, height / 2);
    background(51);
}

function draw() {
    w.show();
    w.walkRandomly();
}