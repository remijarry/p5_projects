let walker;
let walker_01;
let walker_03;

let w = 640;
let h = 240;

function setup() {
  createCanvas(w, h);
  walker = new Walker(w / 2, h / 2, color(255, 0, 0));
  walker_01 = new Walker_01(w / 4, h / 4, color(0, 255, 255));
  walker_03 = new Walker_03(50, 50, color(0, 0, 255));
  background(255);
}

function draw() {
  walker.step();
  walker.show();

  walker_01.step();
  walker_01.show();

  walker_03.step();
  walker_03.show();
}
