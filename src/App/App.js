import React from 'react';

import connection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';

import './App.scss';

connection();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hold My Color <span role="img" aria-label="beers emoji">🍻</span></h1>
        <h3>Light Text</h3>
        <Auth />
      </div>
    );
  }
}

export default App;
