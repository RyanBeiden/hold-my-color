import React from 'react';

import Button from '@material-ui/core/Button';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home__title">
          <h2>My Palettes</h2>
          <Button className="Home__new-button" variant="outlined"><i className="fas fa-plus"></i></Button>
        </div>
      </div>
    );
  }
}

export default Home;
