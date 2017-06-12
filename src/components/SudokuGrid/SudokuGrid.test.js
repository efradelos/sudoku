import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { BaseSudokuGrid as SudokuGrid } from './SudokuGrid';

import SudokuRow from '../SudokuRow';
import NewButton from './NewButton';
import ResetButton from './ResetButton';
import SolveButton from './SolveButton';
import ShowErrorsCheckbox from './ShowErrorsCheckbox';

describe('SudokuGrid', () => {
  it('should have class sudoku', () => {
    const component = shallow(<SudokuGrid size={4} />);
    expect(component).to.have.className('sudoku');
  });

  it('should have class sudoku-4', () => {
    const component = shallow(<SudokuGrid size={4} />);
    expect(component).to.have.className('sudoku-4');
  });

  it('should have NewButton component', () => {
    const component = shallow(<SudokuGrid size={4} />);
    expect(component).to.have.exactly(1).descendants(NewButton);
  });

  it('should have NewButton component', () => {
    const component = shallow(<SudokuGrid size={4} />);
    expect(component).to.have.exactly(1).descendants(ResetButton);
  });

  it('should have NewButton component', () => {
    const component = shallow(<SudokuGrid size={4} />);
    expect(component).to.have.exactly(1).descendants(SolveButton);
  });

  it('should have NewButton component', () => {
    const component = shallow(<SudokuGrid size={4} />);
    expect(component).to.have.exactly(1).descendants(ShowErrorsCheckbox);
  });

  it('should have 4 SudokuRow components', () => {
    const component = shallow(<SudokuGrid size={4} />);
    expect(component).to.have.exactly(4).descendants(SudokuRow);
    component.find(SudokuRow).forEach((row, index) => {
      expect(row).to.have.prop('row', index);
      expect(row).to.have.prop('size', 4);
    });
  });

  it('should call setNumber when number is pressed', () => {
    const setNumber = sinon.spy();
    const component = shallow(<SudokuGrid setNumber={setNumber} />);
    component.simulate('keyDown', { keyCode: 53 });
    expect(setNumber).to.have.been.calledWith(5);
  });

  it('should call unsetNumber when backspace key is pressed', () => {
    const unsetNumber = sinon.spy();
    const component = shallow(<SudokuGrid unsetNumber={unsetNumber} />);
    component.simulate('keyDown', { keyCode: 8 });
    expect(unsetNumber).to.have.been.calledWith();
  });

  it('should call unsetNumber when delete key is pressed', () => {
    const unsetNumber = sinon.spy();
    const component = shallow(<SudokuGrid unsetNumber={unsetNumber} />);
    component.simulate('keyDown', { keyCode: 46 });
    expect(unsetNumber).to.have.been.calledWith();
  });
});
