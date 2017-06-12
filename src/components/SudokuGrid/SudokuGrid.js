import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';
import { inject, observer } from 'mobx-react';

import SudokuRow from '../SudokuRow';

import NewButton from './NewButton';
import ResetButton from './ResetButton';
import SolveButton from './SolveButton';
import ShowErrorsCheckbox from './ShowErrorsCheckbox';

class SudokuGrid extends Component {
  static propTypes = {
    size: PropTypes.number,
    showErrors: PropTypes.bool,
    setNumber: PropTypes.func,
    unsetNumber: PropTypes.func,
  }

  static defaultProps = {
    size: 9,
    showErrors: false,
    setNumber: () => false,
    unsetNumber: () => false,
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
      this.props.unsetNumber();
    }
  }

  render() {
    return (
      <div className={`sudoku sudoku-${this.props.size}`} onKeyDown={this.handleKeyDown}>
        {times(this.props.size, row => <SudokuRow key={row} size={this.props.size} row={row} />)}
        <div className="pure-form">
          <NewButton />
          <ResetButton />
          <SolveButton />
          <br />
          <ShowErrorsCheckbox />
        </div>
      </div>
    );
  }
}


const mapToStores = stores => ({
  size: stores.sudokuStore.size,
  setNumber: stores.sudokuStore.setNumber,
  unsetNumber: stores.sudokuStore.unsetNumber,
});

export { SudokuGrid as BaseSudokuGrid };
export default inject(mapToStores)(observer(SudokuGrid));
