import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Button,
  Container,
  Divider,
} from '@material-ui/core';

import './Auth.scss';

class Auth extends React.Component {
  googleSignIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    this.setState({ authed: true });
  }

  githubSignIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider);
    this.setState({ authed: true });
  }

  render() {
    return (
      <div className="Auth">
        <h2>Build your color palette with ease.</h2>
        <h3>More information here about the features of this web app</h3>
        <Container className="Auth__container">
          <h4>Sign in to build a palette</h4>
          <Divider />
          <div className="Auth__button">
            <Button variant="outlined" onClick={this.googleSignIn}><i className="fab fa-google"></i> Sign in with Google</Button>
          </div>
          <div className="Auth__button">
            <Button variant="outlined" onClick={this.githubSignIn}><i className="fab fa-github"></i> Sign in with Github</Button>
          </div>
        </Container>
        <footer className="Auth__created-by">Created by Ryan Beiden</footer>
      </div>
    );
  }
}

export default Auth;
