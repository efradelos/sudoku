import { times, shuffle } from 'lodash';

import { ColumnHeaderNode, RowNode, Node } from '../node';

class DancingLinksSudokuSolver {
  constructor(board) {
    this.board = board;
  }

  solve(reverse = false) {
    this.h = this.generateSparseMatrix();
    return this.search(reverse);
  }

  generateSparseMatrix() {
    const size = this.board.size;
    const numContraints = (size * size) * 4;
    const h = new Node();
    const headerNodes = [];
    for (let i = 0; i < numContraints; i += 1) {
      const headerNode = new ColumnHeaderNode();
      headerNode.rows = 0;
      h.left.insert(headerNode, Node.RIGHT); // Add to end
      headerNodes.push(headerNode);
    }

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        const curCell = this.board.at(row, col);
        for (let num = 0; num < size; num += 1) {
          if (curCell.isEmpty() || curCell.num === num + 1) {
            const indexes = [];
            const gridSize = Math.sqrt(size);
            indexes.push((row * size) + col);
            indexes.push((size * size) + (num * size) + row);
            indexes.push((2 * (size * size)) + (num * size) + col);
            indexes.push((3 * (size * size)) + (num * size) + (parseInt(row / gridSize, 10) * gridSize) + parseInt(col / gridSize, 10));
            let rowHeader;
            for (let j = 0; j < indexes.length; j += 1) {
              const index = indexes[j];
              const headerNode = headerNodes[index];
              const rowNode = new RowNode({ row, col, num: num + 1, header: headerNode });
              headerNode.rows += 1;
              headerNode.up.insert(rowNode, Node.DOWN);
              if (rowHeader) {
                rowHeader.left.insert(rowNode, Node.RIGHT);
              } else {
                rowHeader = rowNode;
              }
            }
          }
        }
      }
    }

    return h;
  }

  search(reverse = false) {
    const h = this.h;
    // Only header node remaining which means, no constraints left and solution is found
    if (h.right === h) return true;

    const colHeader = this.nextConstraint();
    // constraint has been found, but has no solutions
    if (colHeader.down === colHeader) return false;
    this.coverColumn(colHeader);

    const success = colHeader.find(reverse ? Node.UP : Node.DOWN, (rowHeader) => {
      rowHeader.forEach(reverse ? Node.LEFT : Node.RIGHT, cell => this.coverColumn(cell.header));

      if (this.search(reverse)) {
        this.board.at(rowHeader.row, rowHeader.col).solution = rowHeader.num;
        return true;
      }

      rowHeader.forEach(reverse ? Node.RIGHT : Node.LEFT, cell => this.uncoverColumn(cell.header));
      return false;
    });

    if (success) return true;
    this.uncoverColumn(colHeader);
    return false;
  }

  nextConstraint() {
    let colNode;
    let maxRows = Number.MAX_VALUE;
    this.h.forEach(Node.RIGHT, (cellNode) => {
      if (cellNode.rows < maxRows) {
        maxRows = cellNode.rows;
        colNode = cellNode;
      }
    });
    return colNode;
  }

  coverColumn(colNode) {
    colNode.right.left = colNode.left;
    colNode.left.right = colNode.right;
    colNode.forEach(Node.DOWN, (rowNode) => {
      rowNode.forEach(Node.RIGHT, (cellNode) => {
        cellNode.down.up = cellNode.up;
        cellNode.up.down = cellNode.down;
      });
    });
  }

  uncoverColumn(colNode) {
    colNode.forEach(Node.UP, (rowNode) => {
      rowNode.forEach(Node.LEFT, (cellNode) => {
        cellNode.down.up = cellNode;
        cellNode.up.down = cellNode;
      });
    });

    colNode.right.left = colNode;
    colNode.left.right = colNode;
  }
}

export default DancingLinksSudokuSolver;
