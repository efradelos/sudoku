import ms from 'ms';
import { includes, range } from 'lodash';

class BruteForceSudokuSolver {
  constructor(puzzle, size = 9) {
    this.puzzle = puzzle;
    this.size = size;
  }

  reset() {
    this.test = this.puzzle.map(row => row.slice());
  }

  solve() {
    this.reset();
    const start = (new Date()).getTime();
    const result = this.processCell(0, 0);
    const end = (new Date()).getTime();
    return {
      result: result ? this.test : 'No Solution Found',
      time: ms(end - start),
    };
  }

  processCell(row, col) {
    const size = this.size;
    const test = this.test;
    if (row >= size || col >= size) return -1;
    const [nextRow, nextCol] = this.nextCell(row, col);
    const numRange = this.puzzle[row][col] === 0 ?
      range(1, this.size + 1) :
      [this.puzzle[row][col]];

    for (let i = 0; i < numRange.length; i += 1) {
      const num = numRange[i];
      test[row][col] = 0;
      if (this.onSet) this.onSet(row, col, num);
      const matchesContraints = (
        !this.rowContains(num, row) &&
        !this.colContains(num, col) &&
        !this.gridContains(num, row, col)
      );

      if (matchesContraints) {
        test[row][col] = num;
        if (this.processCell(nextRow, nextCol)) {
          return num;
        }
        test[row][col] = 0;
      }
    }
  }

  nextCell(row, col) {
    let nextCol = col + 1;
    let nextRow = row;
    if (nextCol >= this.size) {
      nextCol = 0;
      nextRow += 1;
    }
    return [nextRow, nextCol];
  }

  rowContains(num, row) {
    return includes(this.test[row], num);
  }

  colContains(num, col) {
    const colValues = this.test.map(row => row[col]);
    return includes(colValues, num);
  }

  gridContains(num, row, col) {
    const gridSize = Math.sqrt(this.size);
    const startRow = row - (row % gridSize);
    const startCol = col - (col % gridSize);
    for (let x = 0; x < gridSize; x += 1) {
      for (let y = 0; y < gridSize; y += 1) {
        if (this.test[x + startRow][y + startCol] === num) return true;
      }
    }
    return false;
  }
}

export default BruteForceSudokuSolver;
