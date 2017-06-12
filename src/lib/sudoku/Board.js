import { observable } from 'mobx';
import { shuffle, times } from 'lodash';

import Solver from './solver';
import Cell from './Cell';

class Board {
  @observable cells = [];
  @observable hasSolution = false;

  static coordinatesFromPosition(pos, size) {
    const row = Math.floor(pos / size);
    const col = pos % size;
    return { row, col };
  }

  static positionFromCoordinates(row, col, size) {
    return (row * size) + col;
  }

  constructor(size = 9) {
    this.cells = times(
      size * size,
      pos => new Cell({ ...Board.coordinatesFromPosition(pos, size) }),
    );
  }

  at(row, col) {
    return this.cells.find(c => c.row === row && c.col === col);
  }

  atPosition(pos) {
    const { row, col } = Board.coordinatesFromPosition(pos, this.size);
    return this.at(row, col);
  }

  atRow(row) {
    return this.cells.filter(c => c.row === row);
  }

  atCol(col) {
    return this.cells.filter(c => c.col === col);
  }

  atGrid(grid) {
    const inGrid = (cell) => {
      const gridSize = this.gridSize;
      return (
        grid === (Math.floor(cell.row / gridSize) * gridSize) + Math.floor(cell.col / gridSize)
      );
    };
    return this.cells.filter(inGrid);
  }

  nonEmptyCells() {
    return this.cells.filter(c => !c.isEmpty());
  }


  setGrid(grid, cells) {
    this.atGrid(grid).forEach((cell, index) => {
      cell.num = cells[index];
    });
  }

  get size() {
    return Math.sqrt(this.cells.length);
  }

  get gridSize() {
    return Math.sqrt(this.size);
  }

  toString() {
    return this.cells.map(cell => (cell.isEmpty() ? '.' : cell.num)).join('');
  }

  toMatrix() {
    return times(
      this.size,
      row => times(
        this.size,
        col => this.at(row, col).num || 0,
      ),
    );
  }

  fromMatrix(matrix) {
    this.cells.forEach((cell) => {
      cell.num = matrix[cell.row][cell.col];
    });
  }

  isFilledOut() {
    return this.cells.filter(cell => cell.isEmpty()).length === 0;
  }

  reset() {
    this.cells.forEach((cell) => {
      if (!cell.fixed) cell.num = null;
    });
  }

  solve(reverse = false) {
    if (!this.hasSolution) {
      const solver = new Solver(this);
      this.hasSolution = solver.solve(reverse);
    }
    if (this.hasSolution) {
      this.cells.forEach((cell) => {
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
      board1.atPosition(position).num = 0;
      board2.atPosition(position).num = 0;
      board1.solve(false);
      board2.solve(true);
      if (!board1.equals(board2)) {
        // eslint-disable-next-line no-return-assign
        board.nonEmptyCells().forEach(cell => cell.fixed = true);
        return board;
      }
      board.atPosition(position).num = null;
    }
    return board;
  }
}

export default Board;
