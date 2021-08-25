export class Cell {
    constructor(w, h, posX, posY) {
      this.width = w;
      this.height = h;
      this.posX = posX;
      this.posY = posY
    }
  
    draw() {
      rect(this.posX, this.posY, this.width, this.height)
    }
  }