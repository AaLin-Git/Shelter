// console.log(
//   "1. Проверка верстки +7\n--верстка страницы валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ . +4\n--логотип в хедере состоит из текстовых элементов +1\n--страница содержит ровно один элемент <h1> +1\n--добавлен favicon +1\n2. Вёрстка соответствует макету +35\n--блок <header> +5/n--блок Not only +5\n--блок About +5\n--блок Our Friends +5\n--блок Help +5\n--блок In addition +5\n--блок <footer> +5\n3. Требования к css +6\n4. Интерактивность элементов +12\nСтраница Pets (40)\n1.Проверка верстки +7\n2.Вёрстка соответствует макету +15\n 3. Требования к css +4\n 4.Интерактивность элементов +14"
// );

// console.log(
//   "1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6. Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n10. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8"
// );
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

//Carousel

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const carousel = document.querySelector(".carousel");
const cardLeft = document.querySelector("#card-left");
const cardActive = document.querySelector("#card-active");
const cardRight = document.querySelector("#card-right");

let leftArr = [];
let middleArr = [];
let rightArr = [];

const generateCards = () => {
  cardLeft.innerHTML = "";
  for (let i = 0; i < leftArr.length; i++) {
    const name = pets[leftArr[i]].name;
    const img = pets[leftArr[i]].img;
    const card = `
      <div class="slider__card ${name}">
        <img class="card__image " src="${img}" alt="pet's photo">
        <div class="card__description">
          <p class="card__name">${name}</p>
          <a class="card__button" href="#">Learn more</a>
        </div>
      </div>
    `;
    cardLeft.insertAdjacentHTML("afterbegin", card);
  }

  cardActive.innerHTML = "";
  for (let i = 0; i < middleArr.length; i++) {
    const name = pets[middleArr[i]].name;
    const img = pets[middleArr[i]].img;
    const card = `
      <div class="slider__card ${name}">
        <img class="card__image " src="${img}" alt="pet's photo">
        <div class="card__description">
          <p class="card__name">${name}</p>
          <a class="card__button" href="#">Learn more</a>
        </div>
      </div>
    `;
    cardActive.insertAdjacentHTML("afterbegin", card);
  }

  cardRight.innerHTML = "";
  for (let i = 0; i < rightArr.length; i++) {
    const name = pets[rightArr[i]].name;
    const img = pets[rightArr[i]].img;
    const card = `
      <div class="slider__card ${name}">
        <img class="card__image " src="${img}" alt="pet's photo">
        <div class="card__description">
          <p class="card__name">${name}</p>
          <a class="card__button" href="#">Learn more</a>
        </div>
      </div>
    `;
    cardRight.insertAdjacentHTML("afterbegin", card);
  }
};

const initialization = () => {
  while (rightArr.length < 3) {
    let randomNumber = Math.floor(Math.random() * 7);
    if (rightArr.indexOf(randomNumber) === -1) {
      rightArr.push(randomNumber);
    }
  }

  middleArr = [...rightArr];
  rightArr.length = 0;

  while (rightArr.length < 3) {
    let randomNumber = Math.floor(Math.random() * 7);
    if (
      rightArr.indexOf(randomNumber) === -1 &&
      middleArr.indexOf(randomNumber) === -1
    ) {
      rightArr.push(randomNumber);
    }
  }

  leftArr = [...middleArr];
  middleArr.length = 0;

  middleArr = [...rightArr];
  rightArr.length = 0;

  while (rightArr.length < 3) {
    let randomNumber = Math.floor(Math.random() * 7);
    if (
      rightArr.indexOf(randomNumber) === -1 &&
      middleArr.indexOf(randomNumber) === -1
    ) {
      rightArr.push(randomNumber);
    }
  }

  generateCards();
};
initialization();

const showRight = () => {
  leftArr.length = 0;
  leftArr = [...middleArr];
  middleArr.length = 0;
  middleArr = [...rightArr];
  rightArr.length = 0;
  while (rightArr.length < 3) {
    let randomNumber = Math.floor(Math.random() * 7);
    if (
      rightArr.indexOf(randomNumber) === -1 &&
      middleArr.indexOf(randomNumber) === -1
    ) {
      rightArr.push(randomNumber);
    }
  }
  carousel.classList.add("transition-right");
  generateCards();
};

const showLeft = () => {
  rightArr.length = 0;
  rightArr = [...middleArr];
  middleArr.length = 0;
  middleArr = [...leftArr];
  leftArr.length = 0;
  while (leftArr.length < 3) {
    let randomNumber = Math.floor(Math.random() * 7);
    if (
      leftArr.indexOf(randomNumber) === -1 &&
      middleArr.indexOf(randomNumber) === -1
    ) {
      leftArr.push(randomNumber);
    }
  }
  carousel.classList.add("transition-left");
  generateCards();
};

carousel.addEventListener("animationend", (animationEvent) => {
  if (animationEvent.animationName === "move-left") {
    carousel.classList.remove("transition-left");
  } else {
    carousel.classList.remove("transition-right");
  }
});

leftArrow.addEventListener("click", showLeft);
rightArrow.addEventListener("click", showRight);

// Popup

const sliderCards = document.getElementsByClassName("slider__card");
const sliderCard = [...sliderCards];
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

  const card = `
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
  popupCard.insertAdjacentHTML("beforeend", card);
};

const slider = document.querySelector(".cards");
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (let node of mutation.addedNodes) {
        if (node.classList && node.classList.contains("slider__card")) {
          node.addEventListener("click", showPopup);
        }
      }
    }
  }
});

observer.observe(slider, { childList: true });

const showPopup = (event) => {
  const target = event.target.closest(`.slider__card`);
  bodyDarkened.classList.add("body-darkened_open");
  body.classList.add("stop-scroll");
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

sliderCard.forEach((item) => {
  item.addEventListener("click", showPopup);
});

popupCloseButton.addEventListener("click", hidePopup);
bodyDarkened.addEventListener("click", hidePopup);
