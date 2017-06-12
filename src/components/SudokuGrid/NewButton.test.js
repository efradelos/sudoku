import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { BaseNewButton as NewButton } from './NewButton';

describe('NewButton', () => {
  it('should have class pure-button', () => {
    const component = shallow(<NewButton newBoard={() => false} />);
    expect(component).to.have.className('pure-button');
  });

  it('should have text new', () => {
    const component = shallow(<NewButton newBoard={() => false} />);
    expect(component).to.have.text('new');
  });

  it('should call newBoard when clicked', () => {
    const newBoard = sinon.spy();
    const component = shallow(<NewButton newBoard={newBoard} />);
    component.simulate('click');
    expect(newBoard).to.have.been.called; // eslint-disable-line no-unused-expressions
  });
});
