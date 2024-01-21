'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const per_page = 40;
let page = 1;
let userSearch = '';

form.addEventListener('submit', submitHandle);
loadMoreBtn.addEventListener('click', handleClickMore);

async function submitHandle(event) {
    event.preventDefault();
    page = 1;
    gallery.innerHTML = '';
    userSearch = form.search.value.trim();

    loadMoreBtn.classList.add('hide');

    const images = await fetchImages();

    if (images.hits.length === 0) {
        iziToast.error({
            position: 'bottomLeft',
            message: 'Sorry, there are no images matching your search query.Please try again!',
            color: '#37a1f2',
            messageColor: '#FFF',
            theme: 'dark',
            progressBarColor: '#0047AB',
        });
    } else if (images.hits.length < per_page) {
        iziToast.error({
            position: 'bottomLeft',
            message: 'We are sorry, but you have reached the end of search results.',
            color: '#37a1f2',
            messageColor: '#FFF',
            theme: 'dark',
            progressBarColor: '#0047AB',
        });
    } else {
        loadMoreBtn.classList.remove('hide');
    }

    form.reset();
    renderImgs(images);  
}

async function handleClickMore() {
    page += 1;

    loadMoreBtn.classList.add('hide');
    const images = await fetchImages();

    if (page >= Math.ceil(images.totalHits / per_page)) {
        iziToast.error({
            position: 'bottomLeft',
            message: 'We are sorry, but you have reached the end of search results.',
            color: '#37a1f2',
            messageColor: '#FFF',
            theme: 'dark',
            progressBarColor: '#0047AB',
        });
    } else {
        loadMoreBtn.classList.remove('hide');
    }
    renderImgs(images);
    moveCard();
}

async function fetchImages() {
    loader.classList.remove('hide');

    try {
        const images = await axios.get('https://pixabay.com/api/', {
            params: {
                key: '41672055-9590fca4951a86a4742f5f771',
                q: userSearch,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: per_page,
                page: page,
            },
        });
        return images.data;
    } catch (error) {
        console.log(error.message);
        iziToast.error({
            position: 'bottomLeft',
            message: 'Sorry, service unavailable',
            color: '#37a1f2',
            messageColor: '#FFF',
            theme: 'dark',
            progressBarColor: '#0047AB',
        });
    } finally {
        loader.classList.add('hide');
    }
}

function renderImgs(images) {
    const foundImages = images.hits.reduce(
        (
            html,
            {
                webformatURL, largeImageURL, tags, likes, views, comments, downloads, pageURL
            }
        ) => {
            return (
                html +
                `<li class='gallery-item'>
                        <a class='gallery-link' href='${largeImageURL}'>
                            <img
                                class='gallery-image'
                                src='${webformatURL}'
                                alt='${tags}'
                                width='360'
                                height='200'
                                />
                        </a>
                        <p class='gallery-tags'>Get link: ${pageURL}</p>
                        <ul class='gallery-statistic'>
                            <li><p class='statistic'>🩵Likes: <span>${likes}</span></p></li>
                            <li><p class='statistic'>👁Views: <span>${views}</span></p></li>
                            <li><p class='statistic'>💬Comments: <span>${comments}</span></p></li>
                            <li><p class='statistic'>⌛Downloads: <span>${downloads}</span></p></li>
                        </ul>
                        </li>`
            );
        },
        ''
    );

    gallery.insertAdjacentHTML('beforeend', foundImages);
    lightbox.refresh();
}

