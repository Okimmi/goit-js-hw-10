import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_rmj9oYCubLciH1mSecygS2qRm4YKZpj5ULif6f8IqZG6VTl0Vke9fuVb9QpqB0Dm';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(responce => responce.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(responce => responce.data);
}
