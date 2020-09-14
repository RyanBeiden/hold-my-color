import React from 'react';

import {
  Button,
} from '@material-ui/core';

import paletteData from '../../../helpers/data/paletteData';
import colorData from '../../../helpers/data/colorData';
import ColorCard from '../../shared/ColorCard/ColorCard';

import './SinglePalette.scss';

class SinglePalette extends React.Component {
  state = {
    palette: {},
    colors: [],
  }

  componentDidMount() {
    this.getSinglePalette();
    this.getColors();
  }

  getSinglePalette = () => {
    const { paletteId } = this.props.match.params;

    paletteData.getPaletteById(paletteId)
      .then((response) => this.setState({ palette: response.data }))
      .catch((err) => console.error('Getting the palette by id did not work -> ', err));
  }

  getColors = () => {
    const { paletteId } = this.props.match.params;

    colorData.getColorsByPaletteId(paletteId)
      .then((colors) => this.setState({ colors }))
      .catch((err) => console.error('Getting the colors by the palette id did not work -> ', err));
  }

  render() {
    const { palette, colors } = this.state;

    const colorCards = colors.map((color) => <ColorCard
      key={color.id}
      color={color}
    />);

    return (
      <div className="SinglePalette">
        <div className="SinglePalette__title">
          <h2>{palette.name}</h2>
          <Button className="SinglePalette-new-button" variant="outlined"><i className="fas fa-plus"></i> New Color</Button>
          <Button className="SinglePalette-new-button" variant="outlined">Export SASS <i className="fas fa-file-export"></i></Button>
        </div>
        <div className="SinglePalette__colors">
          {colorCards}
        </div>
      </div>
    );
  }
}

export default SinglePalette;
