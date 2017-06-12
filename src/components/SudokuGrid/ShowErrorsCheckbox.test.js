import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { BaseShowErrorsCheckbox as ShowErrorsCheckbox } from './ShowErrorsCheckbox';

describe('ShowErrorsCheckbox', () => {
  it('should have be checked', () => {
    const component = shallow(
      <ShowErrorsCheckbox
        toggleShowErrors={() => false}
        showErrors
      />,
    );
    expect(component.find('input')).to.be.checked();
  });

  it('should have be checked', () => {
    const component = shallow(
      <ShowErrorsCheckbox
        toggleShowErrors={() => false}
        showErrors={false}
      />,
    );
    expect(component.find('input')).to.not.be.checked();
  });

  it('should call toggleShowErrors when clicked', () => {
    const toggleShowErrors = sinon.spy();
    const component = shallow(
      <ShowErrorsCheckbox
        toggleShowErrors={toggleShowErrors}
        showErrors
      />,
    );
    component.find('input').simulate('change');
    expect(toggleShowErrors).to.have.been.called; // eslint-disable-line no-unused-expressions
  });
});
