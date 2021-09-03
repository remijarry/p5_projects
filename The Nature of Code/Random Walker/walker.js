class Walker {
    constructor(x, y) {
        this.position = createVector(x, y);
    }

    walkRandomly() {
        let choice = Math.random();
        if (choice > .6)
            this.position.x++
        else if (choice > .2)
            this.position.y++;
        else if (choice > .1)
            this.position.x--;
        else
            this.position.y--
    }

    show() {
        stroke(255);
        point(this.position.x, this.position.y);
    }
}