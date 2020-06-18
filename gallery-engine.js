import gallery from "./gallery-items.js";
const refs = {
  list: document.querySelector(".js-gallery"),
  modalButton: document.querySelector(".lightbox__button"),
  originalImg: document.querySelector(".lightbox__image"),
  modalWindow: document.querySelector(".js-lightbox"),
};

function renderGallery() {
  generateId();
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
  window.addEventListener("keydown", scrollImage);
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
    window.removeEventListener("keydown", scrollImage);
    refs.modalWindow.classList.remove("is-open");
  } else if (event.key !== "Escape") {
    return;
  }
}
function generateId() {
  gallery.reduce((id, item) => {
    item.id = id;
    return id + 1;
  }, 1);
}
function scrollImage(event) {
  let targetImageId = Number(refs.originalImg.id);
  if (event.key === "ArrowLeft") {
    targetImageId -= 1;
    scrollProsedure();
    console.log(targetImageId);
  } else if (event.key === "ArrowRight") {
    targetImageId += 1;
    scrollProsedure();
    console.log(targetImageId);
  }
  function scrollProsedure() {
    gallery.forEach((item) => {
      if (item.id === targetImageId) {
        refs.originalImg.src = item.original;
        refs.originalImg.alt = item.description;
        refs.originalImg.id = item.id;
        targetImageId = refs.originalImg.id;
      } else if (targetImageId === 0) {
        targetImageId === gallery.length;
      } else if (targetImageId > gallery.length) {
        targetImageId = 1;
      }
    });
  }
}
