import { expect } from 'chai';

import Board from '../Board';
import Solver from './DancingLinksSudokuSolver';

const example1 = [
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

const example2 = [
  [0, 4, 0, 0, 1, 6, 5, 0, 0],
  [5, 0, 0, 3, 0, 0, 4, 0, 0],
  [0, 3, 9, 4, 5, 0, 0, 0, 0],
  [0, 0, 1, 2, 6, 0, 0, 9, 0],
  [0, 0, 3, 0, 0, 0, 2, 0, 0],
  [0, 6, 0, 0, 3, 4, 8, 0, 0],
  [0, 0, 0, 0, 7, 9, 1, 8, 0],
  [0, 0, 5, 0, 0, 8, 0, 0, 3],
  [0, 0, 7, 1, 2, 0, 0, 4, 0],
];

const example3 = [
  [0, 0, 0, 3, 0, 0, 0, 0, 1],
  [0, 0, 0, 4, 1, 0, 7, 8, 0],
  [0, 7, 0, 0, 0, 6, 0, 0, 0],
  [5, 0, 8, 0, 0, 0, 0, 1, 0],
  [7, 1, 0, 0, 0, 0, 0, 3, 5],
  [0, 3, 0, 0, 0, 0, 6, 0, 2],
  [0, 0, 0, 8, 0, 0, 0, 6, 0],
  [0, 5, 3, 0, 2, 1, 0, 0, 0],
  [6, 0, 0, 0, 0, 9, 0, 0, 0],
];

describe('DancingLinksSudokuSolver', () => {
  describe('solve()', () => {
    it('should solve puzzles correctly', () => {
      const board1 = Board.fromMatrix(example1);
      const board2 = Board.fromMatrix(example2);
      const board3 = Board.fromMatrix(example3);
      //
      new Solver(board1).solve();
      new Solver(board2).solve();
      new Solver(board3).solve();

      [board1, board2, board3].forEach((board) => {
        board.cells.forEach((cell) => {
          cell.num = cell.solution;
        });
      });

      expect(board1.toString()).to.equal('172549683645873219389261745496327851813456972257198436964715328731682594528934167');
      expect(board2.toString()).to.equal('748916532516382479239457618871265394453891267962734851324579186195648723687123945');
      expect(board3.toString()).to.equal('286397541395412786174586329568273914712964835439158672927845163853621497641739258');
    });
  });
});
