import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

const getUid = () => firebase.auth().currentUser.uid;

const getGithubUser = () => firebase.auth().currentUser.providerData[0].providerId;

const user = 'https://api.github.com/user';

const githubSignIn = (provider) => new Promise((resolve, reject) => {
  firebase.auth().signInWithPopup(provider)
    .then((response) => {
      const token = response.credential.accessToken;
      localStorage.setItem('token', token);

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

export default {
  getUid,
  getGithubUser,
  githubSignIn,
};
