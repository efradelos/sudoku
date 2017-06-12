import { expect } from 'chai';

import Cell from './Cell';

describe('Cell', () => {
  describe('constructor()', () => {
    it('should set row to what was passed in', () => {
      const node = new Cell({ row: 2 });
      expect(node.row).to.equal(2);
    });

    it('should set col to what was passed in', () => {
      const node = new Cell({ col: 3 });
      expect(node.col).to.equal(3);
    });

    it('should set num to 0 by default', () => {
      const node = new Cell();
      expect(node.num).to.equal(0);
    });

    it('should set num to what was passed in', () => {
      const node = new Cell({ num: 4 });
      expect(node.num).to.equal(4);
    });

    it('should set fixed to what was passed in', () => {
      const node = new Cell({ fixed: true });
      expect(node.fixed).to.equal(true);
    });

    it('should set solution to what was passed in', () => {
      const node = new Cell({ solution: 6 });
      expect(node.solution).to.equal(6);
    });
  });

  describe('isEmpty()', () => {
    it('should return false for positve numbers', () => {
      const node = new Cell({ num: 4 });
      expect(node.isEmpty()).to.equal(false);
    });

    it('should return true for undefined numbers', () => {
      const node = new Cell();
      expect(node.isEmpty()).to.equal(true);
    });

    it('should return true for 0 numbers', () => {
      const node = new Cell({ num: 0 });
      expect(node.isEmpty()).to.equal(true);
    });

    it('should return true for null numbers', () => {
      const node = new Cell({ num: null });
      expect(node.isEmpty()).to.equal(true);
    });
  });

  describe('isWrong()', () => {
    it('should return false when solution is same as number', () => {
      const node = new Cell({ num: 4, solution: 4 });
      expect(node.isWrong()).to.equal(false);
    });

    it('should return true when solution is same as number', () => {
      const node = new Cell({ num: 4, solution: 5 });
      expect(node.isWrong()).to.equal(true);
    });
  });
});
