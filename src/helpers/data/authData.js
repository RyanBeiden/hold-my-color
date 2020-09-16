import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

const getUid = () => firebase.auth().currentUser.uid;

const getGithubUser = () => firebase.auth().currentUser.providerData[0].providerId;

const user = 'https://api.github.com/user';
let token = '';

const githubSignIn = (provider) => new Promise((resolve, reject) => {
  firebase.auth().signInWithPopup(provider)
    .then((response) => {
      token = response.credential.accessToken;

      axios.get(user, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`,
        },
      });
    })
    .then((repoResponse) => resolve(repoResponse))
    .catch((err) => reject(err));
});

const setAccessToken = () => token;

export default {
  getUid,
  getGithubUser,
  githubSignIn,
  setAccessToken,
};
