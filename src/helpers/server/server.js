#!/usr/bin/env node

import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('AccAccess-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/get_github_user/:username', (req, res) => {
  console.warn('req');
  const { username } = req.params;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  axios.get(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

app.get('/recent_activity/:username', (req, res) => {
  console.warn('req');
  const { username } = req.params;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  axios.get(`https://api.github.com/users/${username}/events?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, () => console.warn(`Listening on port: ${PORT}`));
