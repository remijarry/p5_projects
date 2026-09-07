// Walker with a tendency to go towards the right
class Walker_01 extends Walker {
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
