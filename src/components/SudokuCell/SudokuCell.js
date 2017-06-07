import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

class SudokuCell extends PureComponent {
  static propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
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
    const { row, col, num, selected, error, fixed, select } = this.props;
    const className = `sudoku-cell${selected ? ' selected' : ''}${fixed ? ' fixed' : ''}${error ? ' error' : ''}`;

    return (
      <a
        tabIndex={0}
        className={className}
        onClick={() => select(row, col)}
      >
        {num}
      </a>
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
  };
};

export { SudokuCell as BaseSudokuCell };
export default inject(mapToStores)(observer(SudokuCell));
