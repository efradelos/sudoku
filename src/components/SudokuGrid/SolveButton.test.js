import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { BaseSolveButton as SolveButton } from './SolveButton';

describe('SolveButton', () => {
  it('should have class pure-button', () => {
    const component = shallow(<SolveButton solve={() => false} />);
    expect(component).to.have.className('pure-button');
  });

  it('should have class pure-button-primary', () => {
    const component = shallow(<SolveButton solve={() => false} />);
    expect(component).to.have.className('pure-button-primary');
  });

  it('should have text new', () => {
    const component = shallow(<SolveButton solve={() => false} />);
    expect(component).to.have.text('solve');
  });

  it('should call solve when clicked', () => {
    const solve = sinon.spy();
    const component = shallow(<SolveButton solve={solve} />);
    component.simulate('click');
    expect(solve).to.have.been.called; // eslint-disable-line no-unused-expressions
  });
});
