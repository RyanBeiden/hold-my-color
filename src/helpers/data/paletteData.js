import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';
import colorData from './colorData';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPalettesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/palettes.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getPaletteById = (paletteId) => axios.get(`${baseUrl}/palettes/${paletteId}.json`);

const addPalette = (newPalette) => axios.post(`${baseUrl}/palettes.json`, newPalette);

const updatePalette = (paletteToEdit, newPalette) => axios.put(`${baseUrl}/palettes/${paletteToEdit}.json`, newPalette);

const deletePalette = (paletteId) => axios.delete(`${baseUrl}/palettes/${paletteId}.json`);

const deletePaletteWithColors = (paletteId) => new Promise((resolve, reject) => {
  colorData.getColorsByPaletteId(paletteId)
    .then((colors) => {
      if (colors.length > 0) {
        colors.forEach((color) => {
          colorData.deleteColor(color.id)
            .then(() => {
              resolve(deletePalette(paletteId));
            });
        });
      } else {
        resolve(deletePalette(paletteId));
      }
    })
    .catch((err) => reject(err));
});

export default {
  getPalettesByUid,
  getPaletteById,
  addPalette,
  updatePalette,
  deletePaletteWithColors,
};
