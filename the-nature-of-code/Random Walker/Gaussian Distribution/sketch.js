let width = 640;
let height = 480;

let paint;
function setup() {
  createCanvas(width, height);
  background(178);
  createControls();
}

function draw() {
  let splatterSize = sizeSlider.value();
  let x = randomGaussian(height / 2, 60);
  let y = randomGaussian(width / 2, 60);
  paint = new paintSplatter(x, y, splatterSize, splatterSize);
  paint.show();
}

let sizeSlider;
let spreadSlider;
function createControls() {
  createP("Size");
  sizeSlider = createSlider(5, 50, 20, 0);
  createP("Spread");
  sizeSlider = createSlider(5, 50, 20, 0);
  createP("Paint Splatter Simulation");
}
