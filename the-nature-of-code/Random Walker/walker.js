class Walker {
  constructor(x, y) {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    point(this.x, this.y);
  }

  step() {
    //{!1} 0, 1, 2, or 3. The random choice determines the step.
    // this.x += random(-1, 1);
    // this.y += random(-1, 1);

    // random walker with a tendancy to walk towards the right
    let r = random(1);

    if (r < 0.4) {
      this.x++;
    } else if (r < 0.6) {
      this.x--;
    } else if (r < 0.8) {
      this.y++;
    } else {
      this.y--;
    }
  }
}
