import Node from './Node';

class ColumnHeaderNode extends Node {

  constructor({ rows = 0, ...other } = {}) {
    super(other);
    this.rows = rows;
  }
}

export default ColumnHeaderNode;
