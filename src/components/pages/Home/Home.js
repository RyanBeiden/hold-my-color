import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import authData from '../../../helpers/data/authData';
import paletteData from '../../../helpers/data/paletteData';
import PaletteCard from '../../shared/PaletteCard/PaletteCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    palettes: [],
  }

  componentDidMount() {
    this.getPalettes();
  }

  getPalettes = () => {
    paletteData.getPalettesByUid(authData.getUid())
      .then((palettes) => this.setState({ palettes }))
      .catch((err) => console.error('Getting the palettes by uid did not work -> ', err));
  }

  render() {
    const { palettes } = this.state;

    const paletteCards = palettes.map((palette) => <PaletteCard
      key={palette.id}
      palette={palette}
    />);

    return (
      <div className="Home">
        <div className="Home__title">
          <h2>My Palettes</h2>
          <Link to='/new-palette' className="Home__Link"><Button className="Home__new-button" variant="outlined"><i className="fas fa-plus"></i></Button></Link>
        </div>
        <div className="Home__palette-container">
          {paletteCards}
        </div>
      </div>
    );
  }
}

export default Home;
