import { observable } from 'mobx';

class Cell {
  @observable row;
  @observable col;
  @observable num;
  @observable fixed;
  @observable solution;

  constructor({ row, col, num = 0, fixed, solution } = { }) {
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
