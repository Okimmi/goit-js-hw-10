import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectRef = document.querySelector('.breed-select');
const cardRef = document.querySelector('div.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

loaderRef.classList.add('is-hidden');
errorRef.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => renderBreeds(breeds))
  .catch(() => errorRef.classList.remove('is-hidden'));

selectRef.addEventListener('change', event => {
  cardRef.innerHTML = '';
  loaderRef.classList.remove('is-hidden');
  selectRef.classList.add('is-hidden');
  fetchCatByBreed(event.target.value)
    .then(breed => {
      loaderRef.classList.add('is-hidden');
      selectRef.classList.remove('is-hidden');
      renderCard(breed[0]);
    })
    .catch(() => {
      loaderRef.classList.add('is-hidden');
      errorRef.classList.remove('is-hidden');
    });
});

function renderBreeds(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');

  selectRef.innerHTML = `${markup}`;
  new SlimSelect({
    select: '#single',
  });
}

function renderCard({ url, breeds }) {
  const { name, description, temperament } = breeds[0];
  const markup = `<img class="image" src="${url}" alt="">
  <div>
        <h1>${name}</h1>
        <p>
        ${description}
        </p>
        <p>
          <span class="temperament-title">Temperament: </span> ${temperament}
        </p>
      </div>`;
  cardRef.innerHTML = `${markup}`;
}
