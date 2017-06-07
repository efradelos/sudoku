import { shuffle, times, flatten, every, filter } from 'lodash';

import Solver from './solver';
import Cell from './cell';

class Board {
  constructor(size = 9) {
    this.cells = times(size, row => times(size, col => new Cell({ row, col })));
    this.hasSolution = false;
  }

  at(row, col) {
    return this.cells[row][col];
  }

  atRow(row) {
    return this.cells[row];
  }

  atGrid(grid) {
    const inGrid = (cell) => {
      const gridSize = this.gridSize;
      return (
        grid === (Math.floor(cell.row / gridSize) * gridSize) + Math.floor(cell.col / gridSize)
      );
    };
    return flatten(this.cells).filter(inGrid);
  }

  nonEmptyCells() {
    return filter(flatten(this.cells), cell => !cell.isEmpty());
  }

  atCol(col) {
    return this.cells.map(row => row[col]);
  }

  setGrid(grid, cells) {
    this.atGrid(grid).forEach((cell, index) => {
      cell.num = cells[index];
    });
  }

  get size() {
    return this.cells.length;
  }

  get gridSize() {
    return Math.sqrt(this.cells.length);
  }

  toString() {
    const cells = flatten(this.cells);
    return cells.map(cell => (cell.isEmpty() ? '.' : cell.num)).join('');
  }

  toMatrix() {
    return this.cells.map(row => row.map(cell => (cell.isEmpty() ? 0 : cell.num)));
  }

  fromMatrix(matrix) {
    flatten(this.cells).forEach((cell) => {
      cell.num = matrix[cell.row][cell.col];
    });
  }

  solve(reverse = false) {
    if (!this.hasSolution) {
      const solver = new Solver(this);
      this.hasSolution = solver.solve(reverse);
    }
    if (this.hasSolution) {
      flatten(this.cells).forEach((cell) => {
        cell.num = cell.solution;
      });
    }
    return this.hasSolution;
  }

  clone() {
    const board = new Board(this.size);
    board.fromMatrix(this.toMatrix());
    return board;
  }

  equals(board) {
    return this.toString() === board.toString();
  }

  static generate(size = 9) {
    const board = new Board(size);
    const cells = shuffle(times(size, num => num + 1));
    const grid = Math.floor(Math.random() * size);
    board.setGrid(grid, cells);
    board.solve();

    const positions = shuffle(times(size * size, num => num));
    for (let i = 0; i < positions.length; i += 1) {
      const board1 = board.clone();
      const board2 = board.clone();
      const position = positions[i];
      const row = Math.floor(position / size);
      const col = position % size;
      board1.at(row, col).num = 0;
      board2.at(row, col).num = 0;
      board1.solve(false);
      board2.solve(true);
      if (!board1.equals(board2)) {
        board.nonEmptyCells().forEach(cell => cell.fixed = true);
        return board;
      }
      board.at(row, col).num = null;
    }
    return board;
  }
}

export default Board;
