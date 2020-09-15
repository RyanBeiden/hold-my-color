import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

const getUid = () => firebase.auth().currentUser.uid;

const getGithubUser = () => firebase.auth().currentUser.providerData[0].providerId;

const user = 'https://api.github.com/user';
const githubUrl = 'https://api.github.com';

const getUserRepos = (provider) => new Promise((resolve, reject) => {
  firebase.auth().signInWithPopup(provider)
    .then((response) => {
      const token = response.credential.accessToken;

      axios.get(user, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`,
        },
      })
        .then((userResponse) => {
          const username = userResponse.data.login;
          axios.get(`${githubUrl}/users/${username}/repos`, {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          })
            .then((repoResponse) => resolve(repoResponse));
        });
    })
    .catch((err) => reject(err));
});

export default { getUid, getGithubUser, getUserRepos };
