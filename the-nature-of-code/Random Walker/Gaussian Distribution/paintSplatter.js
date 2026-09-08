/**
 * A PaintSplatter class that represents a paint splatter at a given position
 */
class paintSplatter {
  /**
   * Creates a new paint splatter at the specified position
   * @param {number} x - The x position of the splatter
   * @param {number} y - The y position of the splatter
   */
  constructor(x, y, w, h) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    noStroke();
    fill(93, 89, 234, 150);
    ellipse(this.x, this.y, this.w, this.h);
  }
}
