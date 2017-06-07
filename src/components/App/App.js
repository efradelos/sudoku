import React, { PureComponent } from 'react';

import SudokoGrid from '../SudokuGrid';

class App extends PureComponent {
  render() {
    return (
      <div>
        <SudokoGrid />
      </div>
    );
  }
}

export default App;
