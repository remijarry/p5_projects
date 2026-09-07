/**
 * A Walker class that performs a random walk on the canvas
 */
class Walker {
  /**
   * Creates a new Walker at the center of the canvas
   * @param {number} x - The x position (not used, walker starts at canvas center)
   * @param {number} y - The y position (not used, walker starts at canvas center)
   * @param {p5.Color} color - The color of the walker
   */
  constructor(x, y, color) {
    /** @type {number} */
    this.x = width / 2;
    /** @type {number} */
    this.y = height / 2;
    /** @type {p5.Color} */
    this.color = color;
  }

  /**
   * Displays the walker as a point on the canvas
   */
  show() {
    stroke(this.color);
    strokeWeight(2);
    point(this.x, this.y);
  }

  /**
   * Moves the walker one step in a random direction
   * Randomly chooses: 0=right, 1=left, 2=down, 3=up
   */
  step() {
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
