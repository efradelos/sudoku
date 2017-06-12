import sinon from 'sinon';
import { expect } from 'chai';
import { times } from 'lodash';

import Board from './Board';

const solved = [
  [1, 3, 0, 5, 7, 9, 6, 2, 8],
  [2, 6, 9, 3, 4, 8, 7, 1, 5],
  [5, 7, 8, 1, 2, 6, 3, 9, 4],
  [4, 2, 5, 8, 9, 7, 1, 3, 6],
  [8, 9, 3, 6, 1, 4, 2, 5, 7],
  [7, 1, 6, 2, 3, 5, 4, 8, 9],
  [3, 8, 7, 9, 6, 2, 5, 4, 1],
  [9, 4, 1, 7, 5, 3, 8, 6, 2],
  [6, 5, 2, 4, 8, 1, 9, 7, 3],
];

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  describe('#coordinatesFromPosition', () => {
    it('should return correct coordinates', () => {
      expect(Board.coordinatesFromPosition(3, 9)).to.deep.equal({ row: 0, col: 3 });
      expect(Board.coordinatesFromPosition(31, 9)).to.deep.equal({ row: 3, col: 4 });
      expect(Board.coordinatesFromPosition(80, 9)).to.deep.equal({ row: 8, col: 8 });
    });
  });

  describe('#positionFromCoordinates', () => {
    it('should return correct position', () => {
      expect(Board.positionFromCoordinates(0, 3, 9)).to.equal(3);
      expect(Board.positionFromCoordinates(3, 4, 9)).to.equal(31);
      expect(Board.positionFromCoordinates(8, 8, 9)).to.equal(80);
    });
  });

  describe('constructor()', () => {
    it('should return cells with currect row and col ', () => {
      let row = 0;
      let col = 0;
      board.cells.forEach((cell) => {
        expect(cell.row).to.equal(row);
        expect(cell.col).to.equal(col);
        col += 1;
        if (col >= 9) {
          col = 0;
          row += 1;
        }
      });
    });
  });

  describe('at()', () => {
    it('should cell with currect row and col ', () => {
      const cell = board.at(3, 4);
      expect(cell.row).to.equal(3);
      expect(cell.col).to.equal(4);
    });
  });

  describe('atPosition()', () => {
    it('should cell with currect row and col ', () => {
      const cell = board.atPosition(31);
      expect(cell.row).to.equal(3);
      expect(cell.col).to.equal(4);
    });
  });

  describe('atRow()', () => {
    it('should return all cells in that row ', () => {
      const cells = board.atRow(2);
      expect(cells.length).to.equal(9);
      cells.forEach((cell) => {
        expect(cell.row).to.equal(2);
      });
    });
  });

  describe('atCol()', () => {
    it('should return all cells in that col ', () => {
      const cells = board.atCol(2);
      expect(cells.length).to.equal(9);
      cells.forEach((cell) => {
        expect(cell.col).to.equal(2);
      });
    });
  });

  describe('atGrid()', () => {
    it('should return all cells in that col ', () => {
      const cells = board.atGrid(4);
      expect(cells.length).to.equal(9);
      const coordinates = cells.map(cell => [cell.row, cell.col]);
      const expectedCoordinates = [
        [3, 3], [3, 4], [3, 5],
        [4, 3], [4, 4], [4, 5],
        [5, 3], [5, 4], [5, 5],
      ];
      expect(coordinates).to.deep.equal(expectedCoordinates);
    });
  });

  describe('nonEmptyCells()', () => {
    it('should return all non empty cells', () => {
      const cell = board.at(3, 4);
      cell.num = 4;
      const nonEmptyCells = board.nonEmptyCells();
      expect(nonEmptyCells).to.deep.equal([cell]);
    });
  });

  describe('setGrid()', () => {
    it('should set all cells in grid', () => {
      const cell = board.at(3, 4);
      cell.num = 4;
      const nonEmptyCells = board.nonEmptyCells();
      expect(nonEmptyCells).to.deep.equal([cell]);
    });
  });

  describe('toString()', () => {
    beforeEach(() => {
      board.fromMatrix(solved);
    });

    it('should return properly formatted sring representation of board', () => {
      const expected = '13.579628269348715578126394425897136893614257716235489387962541941753862652481973';
      expect(board.toString()).to.equal(expected);
    });
  });

  describe('isFilledOut()', () => {
    beforeEach(() => {
      board.fromMatrix(solved);
    });

    it('should not be filled out', () => {
      expect(board.isFilledOut()).to.equal(false);
    });

    it('should be filled out', () => {
      board.at(0, 2).num = 5;
      expect(board.isFilledOut()).to.equal(true);
    });
  });

  describe('reset()', () => {
    beforeEach(() => {
      board.fromMatrix(solved);
      board.reset();
    });

    it('should have all cells be null', () => {
      times(81, (pos) => {
        expect(board.atPosition(pos).num).to.equal(null);
      });
    });
  });

  describe('clone()', () => {
    let cloned;
    beforeEach(() => {
      board.fromMatrix(solved);
      cloned = board.clone();
    });

    it('should create clone of original', () => {
      times(81, (pos) => {
        expect(cloned.atPosition(pos).num).to.equal(board.atPosition(pos).num);
      });
    });
  });

  describe('equals()', () => {
    let board2;
    beforeEach(() => {
      board.fromMatrix(solved);
      board2 = board.clone();
    });

    /* eslint-disable no-unused-expressions */
    it('should be equal', () => {
      expect(board.equals(board2)).to.be.truthy;
      expect(board2.equals(board)).to.be.truthy;
    });

    it('should not be equal', () => {
      board2.at(2, 3).num = 5;
      expect(board.equals(board2)).to.be.falsey;
      expect(board2.equals(board)).to.be.falsey;
    });
    /* eslint-enable no-unused-expressions */
  });
});
