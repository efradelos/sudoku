import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './styles/main.scss';
import App from './components/App';

import SudokuStore from './stores/SudokuStore';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider sudokuStore={new SudokuStore()}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
