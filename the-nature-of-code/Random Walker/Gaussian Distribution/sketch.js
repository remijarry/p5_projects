let width = 640;
let height = 480;

let paint;
function setup() {
  createCanvas(width, height);
  background(255);
  createControls();
}

function draw() {
  let g = sizeSlider.value();
  paint = new paintSplatter(random(width), random(height), g, g);
  paint.show();
}

let sizeSlider;
function createControls() {
  sizeSlider = createSlider(5, 50, 20, 0);
  createP("Paint Splatter Simulation");
}
