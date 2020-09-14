import React from 'react';

import {
  Button,
} from '@material-ui/core';

import paletteData from '../../../helpers/data/paletteData';

import './SinglePalette.scss';

class SinglePalette extends React.Component {
  state = {
    palette: {},
  }

  componentDidMount() {
    const { paletteId } = this.props.match.params;

    paletteData.getPaletteById(paletteId)
      .then((response) => this.setState({ palette: response.data }))
      .catch((err) => console.error('Getting the palette by id did not work -> ', err));
  }

  render() {
    const { palette } = this.state;

    return (
      <div className="SinglePalette">
        <div className="SinglePalette__title">
          <h2>{palette.name}</h2>
          <Button className="SinglePalette-new-button" variant="outlined"><i className="fas fa-plus"></i> New Color</Button>
          <Button className="SinglePalette-new-button" variant="outlined">Export SASS <i className="fas fa-file-export"></i></Button>
        </div>
      </div>
    );
  }
}

export default SinglePalette;
