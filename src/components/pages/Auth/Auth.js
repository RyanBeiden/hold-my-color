import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Button from '@material-ui/core/Button';

import './Auth.scss';

class Auth extends React.Component {
  state = {
    authed: false,
  }

  googleSignIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    this.setState({ authed: true });
  }

  signOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    this.setState({ authed: false });
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="Auth">
        {authed
          ? <Button variant="outlined" onClick={this.signOut}>Sign Out</Button>
          : <Button variant="outlined" onClick={this.googleSignIn}>Google Sign In</Button>
        }
      </div>
    );
  }
}

export default Auth;
