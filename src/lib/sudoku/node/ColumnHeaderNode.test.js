import { expect } from 'chai';

import ColumnHeaderNode from './ColumnHeaderNode';

describe('ColumnHeaderNode', () => {
  describe('constructor()', () => {
    it('should set rows to what was passed in', () => {
      const node = new ColumnHeaderNode({ rows: 2 });
      expect(node.rows).to.equal(2);
    });
  });
});
