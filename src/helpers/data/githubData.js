import axios from 'axios';
import authData from './authData';

const user = 'https://api.github.com/user';
const githubUrl = 'https://api.github.com';

const getUserRepos = () => new Promise((resolve, reject) => {
  const token = authData.setAccessToken();
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
    })
    .catch((err) => reject(err));
});

export default { getUserRepos };
