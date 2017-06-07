import Node from './Node';

class RowNode extends Node {
  constructor({ header, row, col, num, ...others } = {}) {
    super(others);
    this.header = header;
    this.row = row;
    this.col = col;
    this.num = num;
  }
}

export default RowNode;
