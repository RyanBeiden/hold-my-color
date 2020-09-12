import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Button,
  Container,
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
        <Container>
          <div className="Auth__button">
            <Button variant="outlined" onClick={this.googleSignIn}>Google Sign In</Button>
          </div>
          <div className="Auth__button">
            <Button variant="outlined" onClick={this.githubSignIn}>Github Sign In</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default Auth;
