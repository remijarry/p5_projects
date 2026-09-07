/**
 * A Walker that follows the mouse with a 50% chance, otherwise moves randomly
 * Extends the Walker class and overrides the step() method with mouse-tracking behavior
 * @extends Walker
 */
class Walker_03 extends Walker {
  /**
   * Moves the walker one step with a bias towards following the mouse
   * Probabilities: 50% move to mouseX/mouseY, 10% right, 10% left, 10% down, 10% up
   */
  step() {
    let r = random(1);

    if (r < 0.5) {
      this.x = mouseX;
      this.y = mouseY;
    } else if (r < 0.6) {
      this.x++;
    } else if (r < 0.7) {
      this.x--;
    } else if (r < 0.8) {
      this.y++;
    } else {
      this.y--;
    }
  }
}