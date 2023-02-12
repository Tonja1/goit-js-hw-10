import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(onLoad, DEBOUNCE_DELAY));
console.log()



function onLoad(eve) {
    if (eve.target.value.trim() === "") {
        list.innerHTML = "";
        info.innerHTML = "";
        return
    };
    
    fetchCountries(eve.target.value.trim())
        .then(data => {
            if (data.length > 10 || data.length === 0) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return
            };
            if (data.length > 1) {
                info.innerHTML = "";
        list.innerHTML = createMarkup(data)
            } else {
                list.innerHTML = "";
        info.innerHTML = createMarkupCountry(data)
            };
        }).catch(() => {
            list.innerHTML = "";
            info.innerHTML = "";
            Notiflix.Notify.failure('Oops, there is no country with that name')
        })
};


function createMarkupCountry(arr) {
    return arr.map(({
            name: {
                official
            },
            flags: {
                svg
            },
        capital,
        population,
        languages
    }) =>
        
        `
        <img src="${svg}" width="50" alt="flag">
        <h1>${official}</h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
                <p>Languages: ${Object.values(languages)}</p>
        `
    ).join('')
}


function createMarkup(arr) {
        return arr.map(({
            name: {
                official
            },
            flags: {
                svg
            }
        }) =>
            `
            <li class=""js-list>
        <div class="js-box">
        <img src="${svg}" width="30" alt="flag">
        <p>${official}</p>
        </div>
        </li>
        `
        ).join('')
    }
