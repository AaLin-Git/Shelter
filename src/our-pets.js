import pets from "./pets.js";

//Burger menu

const burgerIcon = document.querySelector(".header__burger-icon");
const burgerMenu = document.querySelector(".header__nav");
const bodyDarkened = document.querySelector(".body-darkened");
const body = document.querySelector("body");

function showBurger() {
  burgerIcon.classList.toggle("burger-icon_open");
  if (burgerIcon.classList.contains("burger-icon_open")) {
    burgerMenu.classList.add("header__nav_open");
    bodyDarkened.classList.add("body-darkened_open");
    body.classList.add("stop-scroll");
  } else {
    burgerMenu.classList.remove("header__nav_open");
    bodyDarkened.classList.remove("body-darkened_open");
    body.classList.remove("stop-scroll");
  }
}

burgerIcon.addEventListener("click", showBurger);
burgerMenu.addEventListener("click", showBurger);
bodyDarkened.addEventListener("click", showBurger);

//Pagination

const cardList = document.querySelector(".main__card-list");
const toStart = document.querySelector(".to-start");
const prevPage = document.querySelector(".prev-page");
const currentPage = document.querySelector(".current-page");
const nextPage = document.querySelector(".next-page");
const toEnd = document.querySelector(".to-end");

const pageArr1 = getPageArr();
const pageArr2 = getPageArr();
const pageArr3 = getPageArr();
const pageArr4 = getPageArr();
const pageArr5 = getPageArr();
const pageArr6 = getPageArr();
const pageArr7 = getPageArr();
const pageArr8 = getPageArr();
let currentPageCount = 1;

function generatePage(arr) {
  cardList.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const name = pets[arr[i]].name;
    const img = pets[arr[i]].img;
    const card = `
      <div class="card ${name}">
        <img class="card__image" src="${img}" alt="pet's photo">
        <div class="card__description">
          <p class="card__name">${name}</p>
          <a class="card__button" href="#">Learn more</a>
        </div>
      </div>
    `;

    cardList.insertAdjacentHTML("afterbegin", card);
    currentPage.textContent = currentPageCount;

    if (currentPageCount === 1) {
      toStart.classList.remove("active");
      prevPage.classList.remove("active");
      nextPage.classList.add("active");
      toEnd.classList.add("active");
    } else if (currentPageCount === 8) {
      toStart.classList.add("active");
      prevPage.classList.add("active");
      nextPage.classList.remove("active");
      toEnd.classList.remove("active");
    } else {
      toStart.classList.add("active");
      prevPage.classList.add("active");
      nextPage.classList.add("active");
      toEnd.classList.add("active");
    }
  }
}
generatePage(pageArr1);

function getPageArr() {
  let pageArr = [];
  while (pageArr.length < 8) {
    let randomNumber = Math.floor(Math.random() * 8);
    if (pageArr.indexOf(randomNumber) === -1) {
      pageArr.push(randomNumber);
    }
  }
  return pageArr;
}

function showFirstPage() {
  if (currentPageCount > 1) {
    currentPageCount = 1;
    generatePage(pageArr1);
  }
}
toStart.addEventListener("click", showFirstPage);

function showPrevPage() {
  if (currentPageCount > 1) {
    currentPageCount--;
    switch (currentPageCount) {
      case 1:
        generatePage(pageArr1);
        break;
      case 2:
        generatePage(pageArr2);
        break;
      case 3:
        generatePage(pageArr3);
        break;
      case 4:
        generatePage(pageArr4);
        break;
      case 5:
        generatePage(pageArr5);
        break;
      case 6:
        generatePage(pageArr6);
        break;
      case 7:
        generatePage(pageArr7);
        break;
    }
  }
}
prevPage.addEventListener("click", showPrevPage);

function showNextPage() {
  if (currentPageCount < 8) {
    currentPageCount++;
    switch (currentPageCount) {
      case 2:
        generatePage(pageArr2);
        break;
      case 3:
        generatePage(pageArr3);
        break;
      case 4:
        generatePage(pageArr4);
        break;
      case 5:
        generatePage(pageArr5);
        break;
      case 6:
        generatePage(pageArr6);
        break;
      case 7:
        generatePage(pageArr7);
        break;
      case 8:
        generatePage(pageArr8);
        break;
    }
  }
}
nextPage.addEventListener("click", showNextPage);

function showLastPage() {
  if (currentPageCount < 8) {
    currentPageCount = 8;
    generatePage(pageArr8);
  }
}
toEnd.addEventListener("click", showLastPage);

// Popup

const cards = document.getElementsByClassName("card");
const card = [...cards];
const popup = document.querySelector(".popup");
const popupCard = document.querySelector(".popup__card");
const popupCloseButton = document.querySelector("#popup__close");

const generatePopup = (number) => {
  popupCard.innerHTML = "";
  const name = pets[number].name;
  const img = pets[number].img;
  const type = pets[number].type;
  const breed = pets[number].breed;
  const description = pets[number].description;
  const age = pets[number].age;
  const inoculations = pets[number].inoculations;
  const diseases = pets[number].diseases;
  const parasites = pets[number].parasites;

  const petCard = `
      <div class="popup__card__wrapper">
        <img class="card__wrapper__image" src="${img}" alt="pet's photo">
        <div class="card__content">
          <div class="content__text">
            <p class="content__name">${name}</p>
            <p class="content__type">${type} - ${breed}</p>
          </div>
          <p class="content__description">${description}</p>
          <ul class="content__list">
            <li>
              <p class="content__item"><span class="item_bold">Age</span>: ${age}</p>
            </li>
            <li>
              <p class="content__item"><span class="item_bold">Inoculations</span>: ${inoculations}</p>
            </li>
            <li>
              <p class="content__item"><span class="item_bold">Diseases</span>: ${diseases}</p>
            </li>
            <li>
              <p class="content__item"><span class="item_bold">Parasites</span>: ${parasites}</p>
            </li>
          </ul>
        </div>
      </div>
    `;
  popupCard.insertAdjacentHTML("beforeend", petCard);
};

const slider = document.querySelector(".main__card-list");
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (let node of mutation.addedNodes) {
        if (node.classList && node.classList.contains("card")) {
          node.addEventListener("click", showPopup);
        }
      }
    }
  }
});

observer.observe(slider, { childList: true });

const showPopup = (event) => {
  const target = event.target.closest(`.card`);
  bodyDarkened.classList.add("body-darkened_open");
  body.classList.add("stop-scroll");
  console.log(target);
  if (target.classList.contains("Jennifer")) {
    generatePopup(0);
  } else if (target.classList.contains("Sophia")) {
    generatePopup(1);
  } else if (target.classList.contains("Woody")) {
    generatePopup(2);
  } else if (target.classList.contains("Scarlett")) {
    generatePopup(3);
  } else if (target.classList.contains("Katrine")) {
    generatePopup(4);
  } else if (target.classList.contains("Timmy")) {
    generatePopup(5);
  } else if (target.classList.contains("Freddie")) {
    generatePopup(6);
  } else if (target.classList.contains("Charly")) {
    generatePopup(7);
  }
  popup.classList.add("popup_open");
};

const hidePopup = () => {
  console.log("close");
  popup.classList.remove("popup_open");
  bodyDarkened.classList.remove("body-darkened_open");
  body.classList.remove("stop-scroll");
  popupCard.innerHTML = "";
};

card.forEach((item) => {
  item.addEventListener("click", showPopup);
});

popupCloseButton.addEventListener("click", hidePopup);
bodyDarkened.addEventListener("click", hidePopup);
