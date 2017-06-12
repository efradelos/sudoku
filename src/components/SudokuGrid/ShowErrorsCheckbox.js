import React from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

const ShowErrorsCheckbox = ({ showErrors, toggleShowErrors }) => (
  <label htmlFor="show-errors">
    <input id="show-errors" type="checkbox" checked={showErrors} onChange={toggleShowErrors} /> Show Errors
  </label>
);

ShowErrorsCheckbox.propTypes = {
  showErrors: PropTypes.bool.isRequired,
  toggleShowErrors: PropTypes.func.isRequired,
};

const mapToStores = stores => ({
  showErrors: stores.sudokuStore.showErrors,
  toggleShowErrors: stores.sudokuStore.toggleShowErrors,
});

export { ShowErrorsCheckbox as BaseShowErrorsCheckbox };
export default inject(mapToStores)(observer(ShowErrorsCheckbox));
