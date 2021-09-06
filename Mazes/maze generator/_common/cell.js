class Cell {
    constructor(row, col, context) {
        this.pos = context.createVector(row, col)
        this.links = new Map()
        this.north = undefined;
        this.south = undefined;
        this.east = undefined;
        this.west = undefined;
    }

    /**
     * 
     * @param {the cell to be link to this cell} cell 
     * @param {Do we link on both sides} bidirectional 
     */
    link(cell, bidirectional = true) {
        this.links.set(cell, true)
        if (bidirectional) {
            cell.link(this, false);
        }
    }

    /**
     * 
     * @param {the cell to be unlinked from this cell} cell 
     * @param {Do we unlink on both sides} bidirectional 
     */
    unlink(cell, bidirectional = true) {
        this.links.remove(cell);
        if (bidirectional) {
            cell.remove(this)
        }
    }

    /**
     * 
     * @param {the cell to be test} cell 
     * @returns true if the cell is connected to this cell
     */
    isLinked(cell) {
        let t = this.links.get(cell);
        return t != undefined ? true : false;
    }

    /**
     * 
     * @returns the cells connected to this cell
     */
    links() {
        return this.links.get(this);
    }

    /**
     * 
     * @returns The list of cells that adjoin this cell.
     */
    neighbors() {
        let list = [];
        if (this.north)
            list.push(this.north);
        if (this.south)
            list.push(this.south);
        if (this.east)
            list.push(this.east);
        if (this.west)
            list.push(this.west);
        return list;
    }
}