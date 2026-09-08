/**
 * A Walker that has a tendency to move towards the right
 * Extends the Walker class and overrides the step() method with weighted probabilities
 * @extends Walker
 */
class Walker_01 extends Walker {
  /**
   * Moves the walker one step with a bias towards moving right (40% chance)
   * Probabilities: 40% right, 20% left, 20% down, 20% up
   */
  step() {
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
