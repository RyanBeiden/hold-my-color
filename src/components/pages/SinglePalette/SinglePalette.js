import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Popover,
  Box,
  Modal,
  Fade,
  Backdrop,
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
    openModal: false,
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

  handleModalOpen = () => {
    this.setState({ openModal: true });
  };

  handleModalClose = () => {
    this.setState({ openModal: false });
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

  deletePalette = (e) => {
    e.preventDefault();
    const { paletteId } = this.props.match.params;

    paletteData.deletePaletteWithColors(paletteId)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((err) => console.error('Deleting palette with all its colors did not work -> ', err));
  }

  render() {
    const {
      palette,
      colors,
      anchorEl,
      openModal,
    } = this.state;

    const newColorLink = `/${this.props.match.params.paletteId}/new-color`;
    const editPaletteLink = `/palettes/edit/${this.props.match.params.paletteId}`;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const colorCards = colors.map((color) => {
      const editColorLink = `/${this.props.match.params.paletteId}/edit/${color.id}`;
      return <Link to={editColorLink} key={color.id} className="SinglePalette__Link"><ColorCard
        key={color.id}
        color={color}
      /></Link>;
    });

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
        <Box display="flex" justifyContent="flex-end">
          <Button className="SinglePalette__delete" variant="outlined" onClick={this.handleModalOpen}>Delete Palette</Button>
          <Modal
            className="SinglePalette__modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={this.handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <div className="SinglePalette__fade">
                <h2 id="transition-modal-title">Are you sure you want to delete <br/>this palette and all its colors?</h2>
                <div className="SinglePalette__delete-container">
                  <Button className="SinglePalette__cancel" variant="outlined" onClick={this.handleModalClose}>Cancel</Button>
                  <Button className="SinglePalette__delete" variant="outlined" onClick={this.deletePalette}>Delete</Button>
                </div>
              </div>
            </Fade>
          </Modal>
        </Box>
      </div>
    );
  }
}

export default SinglePalette;
