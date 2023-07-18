import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectWrapperRef = document.querySelector('.select-wrapper');
const selectRef = document.querySelector('.breed-select');
const cardRef = document.querySelector('div.cat-info');
const loaderRef = document.querySelector('.loader');

fetchBreeds()
  .then(breeds => {
    renderBreeds(breeds);
    selectWrapperRef.classList.remove('is-hidden');
    loaderRef.classList.add('is-hidden');
  })
  .catch(() =>
    Notify.failure('Oops! Something went wrong! Try to reload the page!')
  );

selectRef.addEventListener('change', event => {
  cardRef.innerHTML = '';
  loaderRef.classList.remove('is-hidden');
  selectWrapperRef.classList.add('is-hidden');
  fetchCatByBreed(event.target.value)
    .then(breed => {
      selectWrapperRef.classList.remove('is-hidden');
      loaderRef.classList.add('is-hidden');
      renderCard(breed[0]);
    })
    .catch(() => {
      loaderRef.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try to reload the page!');
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
