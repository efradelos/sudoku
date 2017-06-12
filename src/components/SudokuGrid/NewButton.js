import React from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

const NewButton = ({ newBoard }) => (
  <button className="pure-button" onClick={newBoard}>new</button>
);

NewButton.propTypes = {
  newBoard: PropTypes.func.isRequired,
};

const mapToStores = stores => ({
  newBoard: stores.sudokuStore.new,
});

export { NewButton as BaseNewButton };
export default inject(mapToStores)(observer(NewButton));
