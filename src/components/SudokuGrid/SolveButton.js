import React from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

const SolveButton = ({ solve }) => (
  <button className="pure-button pure-button-primary" onClick={solve}>solve</button>
);

SolveButton.propTypes = {
  solve: PropTypes.func.isRequired,
};

const mapToStores = stores => ({
  solve: stores.sudokuStore.solve,
});

export { SolveButton as BaseSolveButton };
export default inject(mapToStores)(observer(SolveButton));
