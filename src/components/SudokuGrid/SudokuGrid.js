import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';
import { inject, observer } from 'mobx-react';

import SudokuRow from '../SudokuRow';

class SudokuGrid extends Component {
  static propTypes = {
    size: PropTypes.number,
    showErrors: PropTypes.bool,
    setNumber: PropTypes.func,
    unsetNumber: PropTypes.func,
    new: PropTypes.func,
    reset: PropTypes.func,
    solve: PropTypes.func,
    toggleShowErrors: PropTypes.func,
  }

  static defaultProps = {
    size: 9,
    showErrors: false,
    setNumber: () => false,
    unsetNumber: () => false,
    new: () => false,
    reset: () => false,
    solve: () => false,
    toggleShowErrors: () => false,
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

    if (e.keyCode === 37 || e.keyCode === 46) {
      this.props.unsetNumber();
    }
  }

  render() {
    const changeErrors = () => this.props.showErrors = !this.props.showErrors;
    return (
      <div className={`sudoku sudoku-${this.props.size}`} onKeyDown={this.handleKeyDown}>
        {times(this.props.size, row => <SudokuRow key={row} size={this.props.size} row={row} />)}
        <div className="pure-form">
          <button className="pure-button" onClick={this.props.new}>new</button>
          <button className="pure-button" onClick={this.props.reset}>reset</button>
          <button className="pure-button pure-button-primary" onClick={this.props.solve}>solve</button><br/>
          <label htmlFor="show-errors">
            <input id="show-errors" type="checkbox" checked={this.props.showErrors} onChange={this.props.toggleShowErrors} /> Show Errors
          </label>
        </div>

      </div>
    );
  }
}


const mapToStores = stores => ({
  size: stores.sudokuStore.size,
  setNumber: stores.sudokuStore.setNumber,
  unsetNumber: stores.sudokuStore.unsetNumber,
  new: stores.sudokuStore.new,
  reset: stores.sudokuStore.reset,
  solve: stores.sudokuStore.solve,
  showErrors: stores.sudokuStore.showErrors,
  toggleShowErrors: stores.sudokuStore.toggleShowErrors,
});

export { SudokuGrid as BaseSudokuGrid };
export default inject(mapToStores)(observer(SudokuGrid));
