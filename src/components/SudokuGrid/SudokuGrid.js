import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';
import { inject, observer } from 'mobx-react';

import SudokuRow from '../SudokuRow';

class SudokuGrid extends Component {
  static propTypes = {
    size: PropTypes.number,
    setNumber: PropTypes.func.isRequired,
    new: PropTypes.func.isRequired,
    solve: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 9,
    setNumber: () => false,
  }

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    const num = e.keyCode - 48;
    if (num > 0 && num < 10) {
      this.props.setNumber(num);
    }
    if (e.keyCode === 8 || e.keyCode === 46) {
      this.props.setNumber(null);
    }
  }

  render() {
    return (
      <div className={`sudoku sudoku-${this.props.size}`} onKeyDown={this.handleKeyDown}>
        {times(this.props.size, row => <SudokuRow key={row} size={this.props.size} row={row} />)}
        <button onClick={() => this.props.new()}>new</button>
        <button onClick={() => this.props.solve()}>solve</button>
      </div>
    );
  }
}


const mapToStores = stores => ({
  size: stores.sudokuStore.size,
  setNumber: stores.sudokuStore.setNumber,
  new: stores.sudokuStore.new,
  solve: stores.sudokuStore.solve,
});

export { SudokuGrid as BaseSudokuGrid };
export default inject(mapToStores)(observer(SudokuGrid));
