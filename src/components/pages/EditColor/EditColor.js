import React from 'react';
import Chrome from 'react-color';

import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import colorData from '../../../helpers/data/colorData';
import authData from '../../../helpers/data/authData';

import './EditColor.scss';

class EditColor extends React.Component {
  state = {
    name: '',
    background: '',
    loading: true,
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
  }

  handleColorChange = (color) => {
    this.setState({ background: color.hex });
  };

  updateColor = (e) => {
    e.preventDefault();
    const { name, background } = this.state;

    const uid = authData.getUid();
    const { paletteId, colorId } = this.props.match.params;

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
      .catch((err) => console.error('COuld not update the color -> ', err));
  }

  render() {
    const { name, background, loading } = this.state;

    return (
      <div className="EditColor">
        <h2>Edit Color</h2>
        {loading
          ? <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            </>
          : <>
          <FormControl className="EditColor__form">
            <InputLabel htmlFor="colorName">Color Name</InputLabel>
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
            <Button variant="outlined" className="EditColor__update" onClick={this.updateColor}>Update</Button>
          </div>
        </>
        }
      </div>
    );
  }
}

export default EditColor;
