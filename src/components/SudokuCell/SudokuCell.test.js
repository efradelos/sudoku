import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { BaseSudokuCell as SudokuCell } from './SudokuCell';

describe('SudokuCell', () => {
  it('should have class sudoku-cell', () => {
    const component = shallow(<SudokuCell />);
    expect(component).to.have.className('sudoku-cell');
  });

  it('should have class selected when selected', () => {
    const component = shallow(<SudokuCell selected />);
    expect(component).to.have.className('selected');
  });

  it('should not have class selected when not selected', () => {
    const component = shallow(<SudokuCell selected={false} />);
    expect(component).to.not.have.className('selected');
  });

  it('should have class fixed when fixed', () => {
    const component = shallow(<SudokuCell fixed />);
    expect(component).to.have.className('fixed');
  });

  it('should not have class fixed when not fixed', () => {
    const component = shallow(<SudokuCell fixed={false} />);
    expect(component).to.not.have.className('fixed');
  });

  it('should have class error when error and showErrors', () => {
    const component = shallow(<SudokuCell showErrors error />);
    expect(component).to.have.className('error');
  });

  it('should not have class error when error and not showErrors', () => {
    const component = shallow(<SudokuCell error />);
    expect(component).to.not.have.className('error');
  });

  it('should not have class error when not error', () => {
    const component = shallow(<SudokuCell error={false} />);
    expect(component).to.not.have.className('error');
  });

  it('should have value 4', () => {
    const component = shallow(<SudokuCell num={4} />);
    expect(component).to.have.value('4');
  });

  it('should have value empty string', () => {
    const component = shallow(<SudokuCell num={0} />);
    expect(component).to.have.value('');
  });

  it('should call select when clicked', () => {
    const select = sinon.spy();
    const component = shallow(<SudokuCell row={3} col={4} select={select} />);
    component.simulate('click');
    expect(select).to.have.been.calledWith(3, 4);
  });
});
