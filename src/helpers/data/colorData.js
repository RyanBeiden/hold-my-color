import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getColorsByPaletteId = (paletteId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/colors.json?orderBy="paletteId"&equalTo="${paletteId}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

export default { getColorsByPaletteId };
