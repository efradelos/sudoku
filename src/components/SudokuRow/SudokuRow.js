import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';

import SudokuCell from '../SudokuCell';

class SudokuRow extends PureComponent {
  static propTypes = {
    size: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div className="sudoku-row">
        {times(
          this.props.size,
          col => <SudokuCell key={col} row={this.props.row} col={col} />,
        )}
      </div>
    );
  }
}

export default SudokuRow;
