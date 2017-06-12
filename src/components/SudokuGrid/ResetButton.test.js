import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { BaseResetButton as ResetButton } from './ResetButton';

describe('ResetButton', () => {
  it('should have class pure-button', () => {
    const component = shallow(<ResetButton reset={() => false} />);
    expect(component).to.have.className('pure-button');
  });

  it('should have text new', () => {
    const component = shallow(<ResetButton reset={() => false} />);
    expect(component).to.have.text('reset');
  });

  it('should call reset when clicked', () => {
    const reset = sinon.spy();
    const component = shallow(<ResetButton reset={reset} />);
    component.simulate('click');
    expect(reset).to.have.been.called; // eslint-disable-line no-unused-expressions
  });
});
