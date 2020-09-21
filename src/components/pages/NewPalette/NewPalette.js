import React from 'react';
import { Link } from 'react-router-dom';

import {
  FormControl,
  InputLabel,
  Input,
  Button,
  CircularProgress,
} from '@material-ui/core';

import paletteData from '../../../helpers/data/paletteData';
import githubData from '../../../helpers/data/githubData';
import authData from '../../../helpers/data/authData';

import './NewPalette.scss';

class NewPalette extends React.Component {
  state = {
    name: '',
    githubRepo: false,
    githubUser: false,
    userRepos: [],
    loading: true,
    validated: true,
  }

  componentDidMount() {
    const githubUser = authData.getGithubUser();
    if (githubUser === 'github.com') {
      githubData.getUserRepos()
        .then((response) => {
          this.setState({ userRepos: response, githubUser: true });
        })
        .then(() => this.setState({ loading: false }))
        .catch((err) => console.error(err));
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
    if (e.target.value !== '') {
      this.setState({ validated: true });
    }
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

  savePalette = (e) => {
    e.preventDefault();
    const { name, githubRepo } = this.state;
    const uid = authData.getUid();

    if (name === '') {
      this.setState({ validated: false });
    } else {
      const newPalette = {
        name,
        uid,
        githubRepo,
      };

      paletteData.addPalette(newPalette)
        .then((response) => {
          this.props.history.push(`/palettes/${response.data.name}`);
        })
        .catch((err) => console.error('Adding the new palette did not work -> ', err));
    }
  }

  render() {
    const {
      name,
      githubRepo,
      githubUser,
      userRepos,
      loading,
      validated,
    } = this.state;

    const repoOptions = userRepos.map((repo) => <option
      value={repo.name}
      key={repo.id}
    >{repo.name}</option>);

    return (
      <div className="NewPalette">
        <h2>New Palette</h2>
        <FormControl className="NewPalette__form" disabled={!!githubRepo}>
          <InputLabel htmlFor="paletteName">{validated ? 'Palette Name' : <div className="validation">Please enter a name</div>}</InputLabel>
          <Input
            id="paletteName"
            aria-describedby="my-helper-text"
            onChange={this.changeNameEvent}
            value={name}
          />
        </FormControl>
        {loading
          ? <div className="App__progress">
              <CircularProgress className="App__circle" />
            </div>
          : <div className="NewPalette__github">
            {githubUser
              ? <>
                <h4>Link an existing Github repository</h4>
                <div className="NewPalette__select">
                  <select onChange={this.handleRepoEvent}>
                    <option>Select a repo</option>
                    {repoOptions}
                  </select>
                </div>
                </>
              : ''
            }
            </div>
        }
        <div className="NewPalette__button">
          <Link to="/home" className="cancel-link"><Button variant="outlined" className="cancel-palette">Cancel</Button></Link>
          <Button variant="outlined" className="NewPalette__save" onClick={this.savePalette}>Save</Button>
        </div>
      </div>
    );
  }
}

export default NewPalette;
