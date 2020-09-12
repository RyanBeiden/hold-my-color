import React from 'react';

import Button from '@material-ui/core/Button';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hold My Color <span role="img" aria-label="beers emoji">🍻</span></h1>
        <h3>Light Text</h3>
        <Button variant="contained"><i className="fas fa-rocket"></i></Button>
      </div>
    );
  }
}

export default App;
