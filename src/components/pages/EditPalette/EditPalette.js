import React from 'react';
import {
  FormControl,
  Input,
  InputLabel,
  Button,
} from '@material-ui/core';

import authData from '../../../helpers/data/authData';
import githubData from '../../../helpers/data/githubData';
import paletteData from '../../../helpers/data/paletteData';

import './EditPalette.scss';

class EditPalette extends React.Component {
  state = {
    name: '',
    githubRepo: false,
    githubUser: false,
    userRepos: [],
  }

  componentDidMount() {
    const githubUser = authData.getGithubUser();
    const { paletteId } = this.props.match.params;
    if (githubUser === 'github.com') {
      githubData.getUserRepos()
        .then((response) => {
          this.setState({ userRepos: response.data, githubUser: true });
        })
        .catch((err) => console.error(err));
    }
    paletteData.getPaletteById(paletteId)
      .then((response) => {
        const palette = response.data;
        this.setState({ name: palette.name, githubRepo: palette.githubRepo });
      })
      .catch((err) => console.error('Getting the palette by id did not work -> ', err));
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  handleRepoEvent = (e) => {
    e.preventDefault();

    this.setState({ name: e.target.value });
    if (e.target.value === 'Select a repo') {
      this.setState({ githubRepo: false, name: '' });
    } else {
      this.setState({ githubRepo: true });
    }
  }

  updatePalette = (e) => {
    e.preventDefault();
    const { name, githubRepo } = this.state;
    const uid = authData.getUid();
    const { paletteId } = this.props.match.params;

    const updatedPalette = {
      name,
      uid,
      githubRepo,
    };

    paletteData.updatePalette(paletteId, updatedPalette)
      .then(() => {
        this.props.history.push(`/palettes/${paletteId}`);
      })
      .catch((err) => console.error('Updating the palette did not work -> ', err));
  }

  render() {
    const {
      name,
      githubRepo,
      githubUser,
      userRepos,
    } = this.state;

    const repoOptions = userRepos.map((repo) => <option
      value={repo.name}
      key={repo.id}
    >{repo.name}</option>);

    const dropValue = () => (githubRepo ? `${name}` : 'Select a repo');

    return (
      <div className="EditPalette">
        <h2>Edit Palette</h2>
        <FormControl className="EditPalette__form" disabled={!!githubRepo}>
          <InputLabel htmlFor="paletteName"></InputLabel>
          <Input
            id="paletteName"
            aria-describedby="my-helper-text"
            onChange={this.changeNameEvent}
            value={name}
          />
        </FormControl>
        {githubUser
          ? <div className="EditPalette__github">
            <h4>Link an existing Github repository</h4>
            <div className="EditPalette__select">
              <select onChange={this.handleRepoEvent} value={dropValue()}>
                <option>Select a repo</option>
                {repoOptions}
              </select>
            </div>
          </div>
          : ''
        }
        <div className="EditPalette__button">
          <Button variant="outlined" className="EditPalette__update" onClick={this.updatePalette}>Update</Button>
        </div>
      </div>
    );
  }
}

export default EditPalette;
