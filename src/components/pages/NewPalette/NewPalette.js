import React from 'react';

import {
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@material-ui/core';

import paletteData from '../../../helpers/data/paletteData';
import authData from '../../../helpers/data/authData';

import './NewPalette.scss';

class NewPalette extends React.Component {
  state = {
    name: '',
    githubUser: false,
  }

  componentDidMount() {
    const user = authData.getGithubUser();
    if (user === 'github.com') {
      this.setState({ githubUser: true });
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  savePalette = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const uid = authData.getUid();

    const newPalette = {
      name,
      uid,
    };

    paletteData.addPalette(newPalette)
      .then((response) => {
        this.props.history.push(`/palettes/${response.data.name}`);
      })
      .catch((err) => console.error('Adding the new palette did not work -> ', err));
  }

  render() {
    const { name, githubUser } = this.state;

    return (
      <div className="NewPalette">
        <h2>New Palette</h2>
        <FormControl className="NewPalette__form">
          <InputLabel htmlFor="paletteName">Palette Name</InputLabel>
          <Input
            id="paletteName"
            aria-describedby="my-helper-text"
            onChange={this.changeNameEvent}
            value={name}
          />
        </FormControl>
        {githubUser
          ? <div className="NewPalette__github">
            <h4>Link an existing Github repository</h4>
            <div className="NewPalette__select">
              <select>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </div>
          </div>
          : ''
        }
        <div className="NewPalette__button">
          <Button variant="outlined" className="NewPalette__save" onClick={this.savePalette}>Save</Button>
        </div>
      </div>
    );
  }
}

export default NewPalette;
