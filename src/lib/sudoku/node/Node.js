import _ from 'lodash';

class Node {
  static get LEFT() { return 1; }
  static get RIGHT() { return 2; }
  static get UP() { return 3; }
  static get DOWN() { return 4; }

  static parseDirection(direction) {
    switch (direction) {
      case Node.LEFT:
        return ['right', 'left'];
      case Node.RIGHT:
        return ['left', 'right'];
      case Node.DOWN:
        return ['up', 'down'];
      case Node.UP:
        return ['down', 'up'];
      default:
        throw new Error('Unknown direction');
    }
  }

  constructor({ left, right, up, down } = {}) {
    this.left = left || this;
    this.right = right || this;
    this.up = up || this;
    this.down = down || this;
    ['forEach', 'find'].forEach((func) => {
      this[func] = (direction, ...args) => _[func](this.collect(direction), ...args);
    });
  }

  collect(direction) {
    const [, after] = Node.parseDirection(direction);
    const collected = [];
    let cellNode = this[after];
    while (cellNode !== this) {
      collected.push(cellNode);
      cellNode = cellNode[after];
    }
    return collected;
  }

  insert(node, direction) {
    const [before, after] = Node.parseDirection(direction);
    node[before] = this;
    node[after] = this[after];
    this[after][before] = node;
    this[after] = node;
  }
}

export default Node;
