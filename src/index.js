import './sass/main.scss';
import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import imgCardTpl from './templates/imgCard.hbs';
import ApiServise from './js/apiServise';


const refs = {
    searchForm: document.getElementById('search-form'),    
    imagesList: document.querySelector('.gallery'),
    input: document.querySelector('input'),
};

const apiServise = new ApiServise();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));


function onSearch(e) {
    e.preventDefault();
    
    apiServise.query = e.target.value.trim();
    if (apiServise.query === '')  return;

    clearContainer();
    apiServise.resetPage(); 

    handleTakeData();
};
async function handleTakeData() {

    try {
        const response = await apiServise.fetchArticles();
        renderImage(response);
        clearInput();
        console.log(response);
    } catch (err) {
        showErrorMsg(err);
    }
};

function renderImage(item) {   
    refs.imagesList.insertAdjacentHTML('beforeend',  imgCardTpl(item));
};

function clearContainer() {
    refs.imagesList.innerHTML = '';
};

function clearInput() {
    refs.input.innerHTML = '';
};

function showErrorMsg(text) {
  error({
    title: `${text}`,
    delay: 3000,
  });
}

 const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiServise.query !== '') {
      apiServise.fetchArticles().then(articles => {
        renderImage(articles);
      });
    }
  });
};

const observer = new IntersectionObserver(callback, {
  rootMargin: '150px',
});
observer.observe(document.querySelector('.observe-el'));