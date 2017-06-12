import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';
import SudokuGrid from '../SudokuGrid';

describe('App', () => {
  it('should render sudoku grid', () => {
    const component = shallow(<App />);
    expect(component).to.have.exactly(1).descendants(SudokuGrid);
  });
});
