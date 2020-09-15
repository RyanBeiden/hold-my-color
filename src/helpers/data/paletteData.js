import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPalettesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/palettes.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getPaletteById = (paletteId) => axios.get(`${baseUrl}/palettes/${paletteId}.json`);

const addPalette = (newPalette) => axios.post(`${baseUrl}/palettes.json`, newPalette);

export default { getPalettesByUid, getPaletteById, addPalette };
