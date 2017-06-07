import { observable, action } from 'mobx';
import { find, each, times, flatten } from 'lodash';

import DancingLinksSudokuSolver, { BruteForceSudokuSolver } from '../lib/sudoku/solver';
import Board from '../lib/sudoku/Board';
// import DancingLinksSudokuSolver from '../lib/DancingLinksSudokuSolver';

const example = [
  [0, 0, 0, 0, 0, 0, 6, 8, 0],
  [0, 0, 0, 0, 7, 3, 0, 0, 9],
  [3, 0, 9, 0, 0, 0, 0, 4, 5],
  [4, 9, 0, 0, 0, 0, 0, 0, 0],
  [8, 0, 3, 0, 5, 0, 9, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 6],
  [9, 6, 0, 0, 0, 0, 3, 0, 8],
  [7, 0, 0, 6, 8, 0, 0, 0, 0],
  [0, 2, 8, 0, 0, 0, 0, 0, 0],
];

// const example = [
//   [0, 4, 0, 0, 1, 6, 5, 0, 0],
//   [5, 0, 0, 3, 0, 0, 4, 0, 0],
//   [0, 3, 9, 4, 5, 0, 0, 0, 0],
//   [0, 0, 1, 2, 6, 0, 0, 9, 0],
//   [0, 0, 3, 0, 0, 0, 2, 0, 0],
//   [0, 6, 0, 0, 3, 4, 8, 0, 0],
//   [0, 0, 0, 0, 7, 9, 1, 8, 0],
//   [0, 0, 5, 0, 0, 8, 0, 0, 3],
//   [0, 0, 7, 1, 2, 0, 0, 4, 0],
// ];

// const example = [
//   [0, 0, 0, 3, 0, 0, 0, 0, 1],
//   [0, 0, 0, 4, 1, 0, 7, 8, 0],
//   [0, 7, 0, 0, 0, 6, 0, 0, 0],
//   [5, 0, 8, 0, 0, 0, 0, 1, 0],
//   [7, 1, 0, 0, 0, 0, 0, 3, 5],
//   [0, 3, 0, 0, 0, 0, 6, 0, 2],
//   [0, 0, 0, 8, 0, 0, 0, 6, 0],
//   [0, 5, 3, 0, 2, 1, 0, 0, 0],
//   [6, 0, 0, 0, 0, 9, 0, 0, 0],
// ];

class SudokuStore {
  @observable board = Board.generate();
  @observable selected = [0, 0];

  @action.bound
  select(row, col) {
    this.selected = [row, col];
  }

  @action.bound
  selectNext() {
    const board = this.board;
    let [row, col] = this.selected;
    do {
      col += 1;
      if (col >= board.size) {
        row += 1;
        col = 0;
        if (row >= board.size) row = 0;
      }
    }
    while (!board.at(row, col).isEmpty());
    this.select(row, col);
  }

  @action.bound
  setNumber(num) {
    const board = this.board;
    board.at(this.selected[0], this.selected[1]).num = num;
    this.selectNext();
  }

  @action.bound
  new() {
    this.board = Board.generate();
  }

  @action.bound
  solve() {
    this.board.solve();
  }

}

export default SudokuStore;
