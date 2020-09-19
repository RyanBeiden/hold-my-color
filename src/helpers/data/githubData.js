import axios from 'axios';

const user = 'https://api.github.com/user';
const githubUrl = 'https://api.github.com';

const getUserRepos = () => new Promise((resolve, reject) => {
  const accessToken = localStorage.getItem('token');
  axios.get(user, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${accessToken}`,
    },
  })
    .then((userResponse) => {
      const username = userResponse.data.login;
      axios.get(`${githubUrl}/users/${username}/repos`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
        .then((repoResponse) => {
          const repoArray = repoResponse.data;
          const newRepoArray = [];

          repoArray.forEach((repo) => {
            newRepoArray.push({
              name: `${username}/${repo.name}`,
              id: repo.id,
            });
          });
          resolve(newRepoArray);
        });
    })
    .catch((err) => reject(err));
});

async function addUserIssue(usernameRepo, bodyText) {
  const accessToken = localStorage.getItem('token');
  const url = `https://api.github.com/repos/${usernameRepo}/issues`;

  const headers = {
    Authorization: `Token ${accessToken}`,
  };

  const payLoad = {
    title: 'Style Guide',
    body: bodyText,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payLoad),
  });

  const result = await response.json();
  const anchor = document.createElement('a');
  anchor.href = result.html_url;
  return anchor;
}

export default { getUserRepos, addUserIssue };
