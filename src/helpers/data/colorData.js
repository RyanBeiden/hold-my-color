import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getColorsByPaletteId = (paletteId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/colors.json?orderBy="paletteId"&equalTo="${paletteId}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getColorById = (colorId) => axios.get(`${baseUrl}/colors/${colorId}.json`);

const addColor = (newColor) => axios.post(`${baseUrl}/colors.json`, newColor);

const updateColor = (colorToUpdate, newColor) => axios.put(`${baseUrl}/colors/${colorToUpdate}.json`, newColor);

const deleteColor = (colorId) => axios.delete(`${baseUrl}/colors/${colorId}.json`);

export default {
  getColorsByPaletteId,
  addColor,
  getColorById,
  updateColor,
  deleteColor,
};
