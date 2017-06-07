import sinon from 'sinon';
import { expect } from 'chai';

import Node from './Node';

describe('Node', () => {
  let header;

  beforeEach(() => {
    header = new Node();
  });

  describe('contructor()', () => {
    it('left should point to self by default', () => {
      expect(header.left).to.equal(header);
    });

    it('right should point to self by default', () => {
      expect(header.right).to.equal(header);
    });

    it('up should point to self by default', () => {
      expect(header.up).to.equal(header);
    });

    it('down should point to self by default', () => {
      expect(header.down).to.equal(header);
    });
  });

  describe('insert()', () => {
    let node1;
    let node2;

    beforeEach(() => {
      node1 = new Node();
      node2 = new Node();
    });

    describe('insert right', () => {
      beforeEach(() => {
        header.insert(node2, Node.RIGHT);
        header.insert(node1, Node.RIGHT);
      });

      it('header right should point to node1', () => {
        expect(header.right).to.equal(node1);
      });

      it('header left should point to node2', () => {
        expect(header.left).to.equal(node2);
      });

      it('node1 left should point to header node', () => {
        expect(node1.left).to.equal(header);
      });

      it('node1 right should point to node2', () => {
        expect(node1.right).to.equal(node2);
      });

      it('up and down should remain unaffected', () => {
        expect(header.up).to.equal(header);
        expect(header.down).to.equal(header);
        expect(node1.up).to.equal(node1);
        expect(node1.down).to.equal(node1);
        expect(node2.up).to.equal(node2);
        expect(node2.down).to.equal(node2);
      });
    });

    describe('insert left', () => {
      beforeEach(() => {
        header.insert(node2, Node.LEFT);
        header.insert(node1, Node.LEFT);
      });

      it('header left should point to node1', () => {
        expect(header.left).to.equal(node1);
      });

      it('header right should point to node2', () => {
        expect(header.right).to.equal(node2);
      });

      it('node1 right should point to header node', () => {
        expect(node1.right).to.equal(header);
      });

      it('node1 left should point to node2', () => {
        expect(node1.left).to.equal(node2);
      });

      it('up and down should remain unaffected', () => {
        expect(header.up).to.equal(header);
        expect(header.down).to.equal(header);
        expect(node1.up).to.equal(node1);
        expect(node1.down).to.equal(node1);
        expect(node2.up).to.equal(node2);
        expect(node2.down).to.equal(node2);
      });
    });

    describe('insert down', () => {
      beforeEach(() => {
        header.insert(node2, Node.DOWN);
        header.insert(node1, Node.DOWN);
      });

      it('header down should point to node1', () => {
        expect(header.down).to.equal(node1);
      });

      it('header up should point to node2', () => {
        expect(header.up).to.equal(node2);
      });

      it('node1 up should point to header node', () => {
        expect(node1.up).to.equal(header);
      });

      it('node1 down should point to node2', () => {
        expect(node1.down).to.equal(node2);
      });

      it('up and down should remain unaffected', () => {
        expect(header.left).to.equal(header);
        expect(header.right).to.equal(header);
        expect(node1.left).to.equal(node1);
        expect(node1.right).to.equal(node1);
        expect(node2.left).to.equal(node2);
        expect(node2.right).to.equal(node2);
      });
    });

    describe('insert up', () => {
      beforeEach(() => {
        header.insert(node2, Node.UP);
        header.insert(node1, Node.UP);
      });

      it('header up should point to node1', () => {
        expect(header.up).to.equal(node1);
      });

      it('header down should point to node2', () => {
        expect(header.down).to.equal(node2);
      });

      it('node1 down should point to header node', () => {
        expect(node1.down).to.equal(header);
      });

      it('node1 up should point to node2', () => {
        expect(node1.up).to.equal(node2);
      });

      it('up and down should remain unaffected', () => {
        expect(header.left).to.equal(header);
        expect(header.right).to.equal(header);
        expect(node1.left).to.equal(node1);
        expect(node1.right).to.equal(node1);
        expect(node2.left).to.equal(node2);
        expect(node2.right).to.equal(node2);
      });
    });
  });

  describe('forEach()', () => {
    let node1;
    let node2;

    describe('left to right', () => {
      beforeEach(() => {
        node1 = new Node();
        node2 = new Node();
        header.insert(node1, Node.LEFT);
        header.insert(node2, Node.LEFT);
      });

      it('should call callback with other nodes from left to right', () => {
        const callback = sinon.spy();
        header.forEach(Node.RIGHT, callback);
        expect(callback).to.have.been.calledTwice;
        expect(callback.firstCall).calledWith(node1);
        expect(callback.secondCall).calledWith(node2);
      });

      it('should call callback with other nodes from right to left', () => {
        const callback = sinon.spy();
        header.forEach(Node.LEFT, callback);
        expect(callback).to.have.been.calledTwice;
        expect(callback.firstCall).calledWith(node2);
        expect(callback.secondCall).calledWith(node1);
      });
    });

    describe('up to down', () => {
      beforeEach(() => {
        node1 = new Node();
        node2 = new Node();
        header.insert(node1, Node.UP);
        header.insert(node2, Node.UP);
      });

      it('should call callback with other nodes from up to down', () => {
        const callback = sinon.spy();
        header.forEach(Node.DOWN, callback);
        expect(callback).to.have.been.calledTwice;
        expect(callback.firstCall).calledWith(node1);
        expect(callback.secondCall).calledWith(node2);
      });

      it('should call callback with other nodes from down to up', () => {
        const callback = sinon.spy();
        header.forEach(Node.UP, callback);
        expect(callback).to.have.been.calledTwice;
        expect(callback.firstCall).calledWith(node2);
        expect(callback.secondCall).calledWith(node1);
      });
    });
  });
});
