class Walker {
  constructor(x, y, color) {
    this.x = width / 2;
    this.y = height / 2;
    this.color = color;
  }

  show() {
    stroke(this.color);
    strokeWeight(2);
    point(this.x, this.y);
  }

  step() {
    //{!1} 0, 1, 2, or 3. The random choice determines the step.
    let choice = floor(random(4));
    if (choice === 0) {
      this.x++;
    } else if (choice === 1) {
      this.x--;
    } else if (choice === 2) {
      this.y++;
    } else {
      this.y--;
    }
  }
}
