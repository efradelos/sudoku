import sinon from 'sinon';
import { expect } from 'chai';

import Board from './Board';

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
});
