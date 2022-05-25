// Add imports above this line
import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const result = galleryItems
  .map(
    ({ preview, original, description }) => `<a class="gallery__item" href="${original}">
	<img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`,
  )
  .join('');

gallery.insertAdjacentHTML('afterbegin', result);

const lightbox = new SimpleLightbox('.gallery a', {
  captionPosition: 'outside',
  captionsData: 'alt',
  captionDelay: '250',
});
