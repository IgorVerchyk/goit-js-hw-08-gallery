import gallery from "./gallery-items.js";
const refs = {
  list: document.querySelector(".js-gallery"),
  modalButton: document.querySelector(".lightbox__button"),
  originImg: document.querySelector(".lightbox__image"),
};
renderGallery();

function renderGallery() {
  const galleryItem = gallery.map((item) => {
    return `<li class='gallery__item'>
		<a class="gallery__link">
		<img class="gallery__image" src=${item.preview} alt="${item.description}" data-id="${item.id}">
		</a>
		</li>`;
  });
  refs.list.insertAdjacentHTML("afterbegin", galleryItem.join(""));
}
