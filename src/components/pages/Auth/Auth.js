import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Button,
  Container,
  Divider,
} from '@material-ui/core';

import authData from '../../../helpers/data/authData';

import './Auth.scss';

class Auth extends React.Component {
  googleSignInEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  githubSignInEvent = (e) => {
    e.preventDefault();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    githubProvider.addScope('repo user');
    authData.githubSignIn(githubProvider)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error;
        const { credential } = error;
        console.error(`Error Code: ${errorCode} | Error Message: ${errorMessage} | Email of the user's account used: ${email} | Auth Credential type used: ${credential}`);
      });
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
            <Button variant="outlined" onClick={this.googleSignInEvent}><i className="fab fa-google"></i> Sign in with Google</Button>
          </div>
          <div className="Auth__button">
            <Button variant="outlined" onClick={this.githubSignInEvent}><i className="fab fa-github"></i> Sign in with Github</Button>
          </div>
        </Container>
        <img className="Home__logo" alt="Hold my color logo"
          src="https://firebasestorage.googleapis.com/v0/b/hold-my-color.appspot.com/o/mugs-logo.png?alt=media&token=38569660-e757-4006-a85b-f919736e2813"></img>
        <footer className="Auth__created-by">Created by Ryan Beiden</footer>
      </div>
    );
  }
}

export default Auth;
