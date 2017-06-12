import React from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

const ResetButton = ({ reset }) => (
  <button className="pure-button" onClick={reset}>reset</button>
);

ResetButton.propTypes = {
  reset: PropTypes.func.isRequired,
};

const mapToStores = stores => ({
  reset: stores.sudokuStore.reset,
});

export { ResetButton as BaseResetButton };
export default inject(mapToStores)(observer(ResetButton));
