class Coord {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  plus(coord) {
    return new Coord(this.row + coord.row, this.col + coord.col);
  }

  equals(coord) {
    return this.row == coord.row && this.col == coord.col;
  }

  isOpposite(coord) {
    return this.row == -coord.row && this.col == -coord.col;
  }

  opposite() {
    return new Coord(-this.row, -this.col);
  }
}

class Snake {
  constructor(startCoords, dir="W") {
    this.dir = dir;
    this.segments = [startCoords];
  }

  extend(length) {
    let extensionDir = this.dir.opposite();
    let segs = this.segments;
    for (let i=0; i<length; i++) {
      this.segments.push(segs[segs.length-1].plus(extensionDir));
    }
  }

  move() {
    // Assuming that the move is valid
    // Cache the location of the segment before it moves
    let previousCoord = this.segments[0];
    // Move the head of the Snake
    this.segments[0] = this.segments[0].plus(Snake.movements[this.dir]);

    // Each segment moves to the previous location of the segments
    //  in front of it
    for (let i=1; i<this.segments.length; i++) {
      let temp = this.segments[i];
      this.segments[i] = previousCoord;
      previousCoord = temp;
    }
  }

  turn() {
    // Pick a random direction
    let dir = Math.floor(Math.random() * 4);
    this.dir = Snake.dirs[dir];
  }
}

Snake.movements = { N: new Coord(-1, 0),
                    E: new Coord(0, 1),
                    S: new Coord(1, 0),
                    W: new Coord(0, -1) }
Snake.dirs = ["N", "E", "S", "W"];
