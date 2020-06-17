import gallery from "./gallery-items.js";
const refs = {
  list: document.querySelector(".js-gallery"),
  modalButton: document.querySelector(".lightbox__button"),
  originalImg: document.querySelector(".lightbox__image"),
  modalWindow: document.querySelector(".js-lightbox"),
};

function renderGallery() {
  const galleryItem = gallery.map((item) => {
    return `<li class='gallery__item'>
		<a class="gallery__link">
		<img class="gallery__image" src=${item.preview}  alt="${item.description}">
		</a>
    </li>`;
  });
  refs.list.insertAdjacentHTML("afterbegin", galleryItem.join(""));
}
renderGallery();
refs.list.addEventListener("click", getOriginalSize);

function getOriginalSize(event) {
  event.preventDefault;
  const eventTarget = event.target;
  gallery.forEach((item) => {
    if (eventTarget.src === item.preview) {
      refs.originalImg.src = item.original;
    }
  });
  openModalWindow();
}
function openModalWindow() {
  refs.modalWindow.classList.add("is-open");
  refs.modalWindow.addEventListener("click", closeModalWindow);
  window.addEventListener("keydown", closeModalWindow);
}
function closeModalWindow(event) {
  event.preventDefault();
  if (
    event.target.nodeName === "BUTTON" ||
    event.target.nodeName === "DIV" ||
    event.key === "Escape"
  ) {
    refs.originalImg.src = "";
    refs.modalWindow.removeEventListener("click", closeModalWindow);
    window.removeEventListener("keydown", closeModalWindow);
    refs.modalWindow.classList.remove("is-open");
  } else if (e.key !== "Escape") {
    return;
  }
}
