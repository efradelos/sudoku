import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SudokuRow from './SudokuRow';

import SudokuCell from '../SudokuCell';

describe('SudokuRow', () => {
  it('should have class sudoku-row', () => {
    const component = shallow(<SudokuRow size={4} row={2} />);
    expect(component).to.have.className('sudoku-row');
  });

  it('should have 4 SudokuCell components', () => {
    const component = shallow(<SudokuRow size={4} row={2} />);
    expect(component).to.have.exactly(4).descendants(SudokuCell);
    component.find(SudokuRow).forEach((row, index) => {
      expect(row).to.have.prop('col', index);
      expect(row).to.have.prop('row', 2);
    });
  });
});
