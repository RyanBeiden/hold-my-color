import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Popover,
  Box,
} from '@material-ui/core';

import paletteData from '../../../helpers/data/paletteData';
import colorData from '../../../helpers/data/colorData';
import ColorCard from '../../shared/ColorCard/ColorCard';

import './SinglePalette.scss';

class SinglePalette extends React.Component {
  state = {
    palette: {},
    colors: [],
    anchorEl: null,
  }

  componentDidMount() {
    this.getSinglePalette();
    this.getColors();
  }

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

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

  download = (filename, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  downloadSass = () => {
    const { colors } = this.state;
    let colorsToDownload = '';
    colors.forEach((color) => {
      const colorName = color.name;
      const colorCode = color.code;
      colorsToDownload += `$${colorName}: ${colorCode}; `;
    });
    return this.download('_colorPalette.scss', colorsToDownload);
  }

  render() {
    const { palette, colors, anchorEl } = this.state;
    const newColorLink = `/${this.props.match.params.paletteId}/new-color`;
    const editPaletteLink = `/palettes/edit/${this.props.match.params.paletteId}`;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const colorCards = colors.map((color) => <ColorCard
      key={color.id}
      color={color}
    />);

    const downloadText = colors.map((color) => <p key={color.id}>${color.name}: {color.code};</p>);

    return (
      <div className="SinglePalette">
        <div className="SinglePalette__title">
          <Link to={editPaletteLink} className="SinglePalette__Link"><Button variant="outlined" className="SinglePalette__edit">{palette.name}</Button></Link>
          <Link to={newColorLink} className="SinglePalette__Link"><Button className="SinglePalette__new-button" variant="outlined"><i className="fas fa-plus"></i> New Color</Button></Link>
          <Button className="SinglePalette__new-button" variant="outlined" aria-describedby={id} onClick={this.handleClick}>Convert to SASS <i className="fas fa-random"></i></Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className="SinglePalette__download-text">
              {downloadText}
            </div>
            <Box display="flex" justifyContent="center">
              <Button className="SinglePalette__download" variant="outlined" onClick={this.downloadSass}>Download <i className="fas fa-file-download"></i></Button>
            </Box>
          </Popover>
        </div>
        <div className="SinglePalette__colors">
          {colorCards}
        </div>
      </div>
    );
  }
}

export default SinglePalette;
