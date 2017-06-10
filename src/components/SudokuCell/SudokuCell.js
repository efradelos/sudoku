import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

class SudokuCell extends PureComponent {
  static propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    showErrors: PropTypes.bool.isRequired,
    num: PropTypes.number,
    fixed: PropTypes.bool,
    selected: PropTypes.bool,
    error: PropTypes.bool,
    select: PropTypes.func,
  };

  static defaultProps = {
    num: null,
    fixed: false,
    selected: false,
    error: false,
    select: () => false,
  };

  render() {
    const { row, col, num, showErrors, selected, error, fixed, select } = this.props;
    const className = `sudoku-cell${selected ? ' selected' : ''}${fixed ? ' fixed' : ''}${showErrors && error ? ' error' : ''}`;

    return (
      <input
        type="text"
        tabIndex={0}
        className={className}
        onClick={() => select(row, col)}
        value={num || ''}
      />
    );
  }
}

const mapToStores = (stores, props) => {
  const store = stores.sudokuStore;
  const cell = store.board.at(props.row, props.col);
  return {
    num: cell.num,
    fixed: cell.fixed,
    error: cell.isWrong(),
    selected: store.selected[0] === props.row && store.selected[1] === props.col,
    setNumber: stores.sudokuStore.setNumber,
    select: stores.sudokuStore.select,
    showErrors: stores.sudokuStore.showErrors,
  };
};

export { SudokuCell as BaseSudokuCell };
export default inject(mapToStores)(observer(SudokuCell));
