import React from 'react';
import Chrome from 'react-color';
import { Link } from 'react-router-dom';

import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Box,
} from '@material-ui/core';

import colorData from '../../../helpers/data/colorData';
import authData from '../../../helpers/data/authData';

import './NewColor.scss';

class NewColor extends React.Component {
  state = {
    name: '',
    background: '#BE85E0',
    validated: true,
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    const noSpacedValue = e.target.value.replace(/\s/g, '');
    this.setState({ name: noSpacedValue });
    if (e.target.value !== '') {
      this.setState({ validated: true });
    }
  }

  handleColorChange = (color) => {
    this.setState({ background: color.hex });
  };

  saveColor = (e) => {
    e.preventDefault();
    const { name, background } = this.state;

    const uid = authData.getUid();
    const paletteId = this.props.match.params;

    if (name === '') {
      this.setState({ validated: false });
    } else {
      const newColor = {
        name,
        code: background,
        uid,
        paletteId: paletteId.paletteId,
      };

      colorData.addColor(newColor)
        .then(() => {
          this.props.history.push(`/palettes/${paletteId.paletteId}`);
        })
        .catch((err) => console.error('Adding the new color did not work -> ', err));
    }
  }

  render() {
    const {
      name,
      background,
      validated,
    } = this.state;

    const backLink = `/palettes/${this.props.match.params.paletteId}`;

    return (
      <div className="NewColor">
        <h2>New Color</h2>
        <FormControl className="NewColor__form">
          <InputLabel htmlFor="colorName">{validated ? 'Color Name' : <div className="validation">Please enter a name</div>}</InputLabel>
          <Input
            id="colorName"
            aria-describedby="my-helper-text"
            onChange={this.changeNameEvent}
            value={name}
          />
        </FormControl>
        <Box className="NewColor__picker-container">
          <Chrome
            color={background}
            onChange={this.handleColorChange}
          />
          <div className="NewColor__preview-container">
            <div className="NewColor__preview" style={{ backgroundColor: background }}></div>
            <div className="NewColor__preview-name">{name}</div>
          </div>
        </Box>
        <div className="NewColor__button">
          <Link to={backLink} className="cancel-link"><Button variant="outlined" className="cancel-color">Cancel</Button></Link>
          <Button variant="outlined" className="NewColor__save" onClick={this.saveColor}>Save</Button>
        </div>
      </div>
    );
  }
}

export default NewColor;
