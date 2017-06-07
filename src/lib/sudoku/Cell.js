class Cell {
  constructor({ row, col, num, fixed, solution } = { }) {
    this.row = row;
    this.col = col;
    this.num = num;
    this.fixed = fixed;
    this.solution = solution;
  }

  isEmpty() {
    return !this.num;
  }

  isWrong() {
    return this.num !== this.solution;
  }
}

export default Cell;
