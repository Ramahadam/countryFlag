'use strict';
const btnSearch = document.getElementById('searchCountry');
const inputSearch = document.querySelector('.countryName');
const btn = document.querySelector('.btn-cou ntry');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCounty = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name} - ${data.capital}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} People</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforebegin', msg);
  countriesContainer.style.opacity = 1;
};

// TODO: The nwe url : https://restcountries.com/v2/

const getJSON = async function (url, errMsg = 'Ooops! Something went wrong..') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errMsg} ${response.status}`);

  return await response.json();
};

const getCountrAndNeighbor = async function (country) {
  const data = await getJSON(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found'
  );

  //Rendering country
  renderCounty(data[0]);

  //Rendering borders
  let borders = data[0].borders;
  if (!borders) throw new Error(`No border found`);
  borders.forEach(border => {
    const neighbour = border;
    getJSON(
      `https://restcountries.com/v2/alpha/${neighbour}`,
      'Border not found'
    ).then(data => renderCounty(data, 'neighbour'));
  });

  return data[0];
};

//Btn search for a country
btnSearch.addEventListener('click', function (e) {
  e.preventDefault();
  countriesContainer.textContent = '';
  const country = inputSearch.value;
  getCountrAndNeighbor(country);
});

/*******
 *
 * Rendering 3 countries at the same time
 */

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    const allCountry = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(allCountry);
  } catch (err) {
    console.log(err);
  }
};

get3Countries('Sudan', 'UAE', 'USA');

Promise.any([
  Promise.resolve('success first'),
  Promise.reject('error'),
  Promise.resolve('success second'),
]).then(data => console.log(data));
