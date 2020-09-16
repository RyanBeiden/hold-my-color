import React from 'react';

import {
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@material-ui/core';

import colorData from '../../../helpers/data/colorData';
import authData from '../../../helpers/data/authData';

import './NewColor.scss';

class NewColor extends React.Component {
  state = {
    name: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    const noSpacedValue = e.target.value.replace(/\s/g, '');
    this.setState({ name: noSpacedValue });
  }

  saveColor = (e) => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ name: name.split(' ').join('') });

    const uid = authData.getUid();
    const paletteId = this.props.match.params;

    const newColor = {
      name,
      uid,
      paletteId: paletteId.paletteId,
    };

    colorData.addColor(newColor)
      .then(() => {
        this.props.history.push(`/palettes/${paletteId.paletteId}`);
      })
      .catch((err) => console.error('Adding the new color did not work -> ', err));
  }

  render() {
    const {
      name,
    } = this.state;

    return (
      <div className="NewColor">
        <h2>New Color</h2>
        <FormControl className="NewColor__form">
          <InputLabel htmlFor="colorName">Color Name</InputLabel>
          <Input
            id="colorName"
            aria-describedby="my-helper-text"
            onChange={this.changeNameEvent}
            value={name}
          />
        </FormControl>
        <div className="NewColor__button">
          <Button variant="outlined" className="NewColor__save" onClick={this.saveColor}>Save</Button>
        </div>
      </div>
    );
  }
}

export default NewColor;
