import React from 'react';
import Chrome from 'react-color';
import { Link } from 'react-router-dom';

import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';

import colorData from '../../../helpers/data/colorData';
import authData from '../../../helpers/data/authData';

import './EditColor.scss';

class EditColor extends React.Component {
  state = {
    name: '',
    background: '',
    validated: true,
  }

  componentDidMount() {
    const { colorId } = this.props.match.params;

    colorData.getColorById(colorId)
      .then((response) => this.setState({ name: response.data.name, background: response.data.code }))
      .then(() => this.setState({ loading: false }))
      .catch((err) => console.error('Could not get the color by its id ->', err));
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

  updateColor = (e) => {
    e.preventDefault();
    const { name, background } = this.state;

    const uid = authData.getUid();
    const { paletteId, colorId } = this.props.match.params;

    if (name === '') {
      this.setState({ validated: false });
    } else {
      const newColor = {
        name,
        code: background,
        uid,
        paletteId,
      };

      colorData.updateColor(colorId, newColor)
        .then(() => {
          this.props.history.push(`/palettes/${paletteId}`);
        })
        .catch((err) => console.error('Could not update the color -> ', err));
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
      <div className="EditColor">
        <h2>Edit Color</h2>
        <FormControl className="EditColor__form">
          <InputLabel htmlFor="colorName">{validated ? 'Color Name' : <div className="validation">Please enter a name</div>}</InputLabel>
          <Input
            id="colorName"
            aria-describedby="my-helper-text"
            onChange={this.changeNameEvent}
            value={name}
          />
        </FormControl>
        <Box className="EditColor__picker-container">
          <Chrome
            color={background}
            onChange={this.handleColorChange}
          />
          <div className="EditColor__preview-container">
            <div className="EditColor__preview" style={{ backgroundColor: background }}></div>
            <div className="EditColor__preview-name">{name}</div>
          </div>
        </Box>
        <div className="EditColor__button">
          <Link to={backLink} className="cancel-link"><Button variant="outlined" className="cancel-color">Cancel</Button></Link>
          <Button variant="outlined" className="EditColor__update" onClick={this.updateColor}>Update</Button>
        </div>
      </div>
    );
  }
}

export default EditColor;
