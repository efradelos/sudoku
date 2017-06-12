import { observable, action } from 'mobx';

import Board from '../lib/sudoku/Board';

class SudokuStore {
  @observable board = Board.generate();
  @observable selected = [0, 0];
  @observable showErrors = false;

  @action.bound
  select(row, col) {
    this.selected = [row, col];
  }

  @action.bound
  toggleShowErrors() {
    this.showErrors = !this.showErrors;
  }

  @action.bound
  selectNext() {
    const board = this.board;
    let [row, col] = this.selected;
    while (!board.isFilledOut() && !board.at(row, col).isEmpty()) {
      col += 1;
      if (col >= board.size) {
        row += 1;
        col = 0;
        if (row >= board.size) row = 0;
      }
    }
    this.select(row, col);
  }

  @action.bound
  setNumber(num) {
    const board = this.board;
    board.at(this.selected[0], this.selected[1]).num = num;
    this.selectNext();
  }

  @action.bound
  unsetNumber() {
    const board = this.board;
    board.at(this.selected[0], this.selected[1]).num = null;
  }

  @action.bound
  new() {
    this.board = Board.generate();
  }

  @action.bound
  reset() {
    this.board.reset();
  }

  @action.bound
  solve() {
    this.board.solve();
  }

}

export default SudokuStore;
