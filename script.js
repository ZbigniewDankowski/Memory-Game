const categories = [...document.querySelectorAll(".category")];
const levels = [...document.querySelectorAll(".level")];
const startBtn = document.querySelector(".startBtn");
const menu = document.querySelector(".start");
const game = document.querySelector(".content");
const cardsBox = document.querySelector(".cards");
const image = document.querySelector(".image");
const cards = [];

let activeCategory = "";
let activeLevel = "";
let activeElement = "";
let activeCards = [];
let gameElements = "";
let gamePairs;

const colors = {
  easy: [
    "red",
    "red",
    "blue",
    "blue",
    "green",
    "green",
    "yellow",
    "yellow",
    "orange",
    "orange",
    "violet",
    "violet",
    "salmon",
    "salmon",
    "purple",
    "purple",
  ],
  medium: [
    "red",
    "red",
    "blue",
    "blue",
    "green",
    "green",
    "yellow",
    "yellow",
    "orange",
    "orange",
    "violet",
    "violet",
    "salmon",
    "salmon",
    "purple",
    "purple",
    "royalblue",
    "royalblue",
    "coral",
    "coral",
    "deepskyblue",
    "deepskyblue",
    "crimson",
    "crimson",
  ],
  hard: [
    "red",
    "red",
    "blue",
    "blue",
    "green",
    "green",
    "yellow",
    "yellow",
    "orange",
    "orange",
    "violet",
    "violet",
    "salmon",
    "salmon",
    "purple",
    "purple",
    "royalblue",
    "royalblue",
    "coral",
    "coral",
    "deepskyblue",
    "deepskyblue",
    "crimson",
    "crimson",
    "darkred",
    "darkred",
    "lime",
    "lime",
    "mediumspringgreen",
    "mediumspringgreen",
    "darkolivegreen",
    "darkolivegreen",
    "indigo",
    "indigo",
    "saddlebrown",
    "saddlebrown",
  ],
};
const cardClick = function () {
  activeElement = this;
  activeElement.classList.remove("clicked");
  if (activeCards.length === 0) {
    activeCards.push(activeElement);
  }
  if (activeElement === activeCards[0]) return;
  else {
    activeCards.push(this);
    cards.forEach((card) => {
      card.removeEventListener("click", cardClick);
    });
    if (
      activeCards[0].style.backgroundColor ===
      activeCards[1].style.backgroundColor
    ) {
      setTimeout(() => {
        activeCards.forEach((card) => {
          card.style.opacity = "0";
        });

        cards.forEach((card) => {
          card.addEventListener("click", cardClick);
        });

        activeCards = [];
        activeElement = "";
      }, 500);
      gamePairs--;
      if (gamePairs === 0) {
      }
    } else {
      setTimeout(() => {
        activeCards.forEach((card) => {
          card.classList.add("clicked");
        });

        cards.forEach((card) => {
          card.addEventListener("click", cardClick);
        });

        activeCards = [];
        activeElement = "";
      }, 500);
    }
  }
  console.log(gamePairs);
};
const createGame = () => {
  if (activeLevel === "easy") {
    for (i = 0; i < gameElements; i++) {
      const number = Math.floor(Math.random() * colors.easy.length);
      const div = document.createElement("div");
      div.classList.add(activeLevel);
      div.style.backgroundColor = colors.easy[number];
      cardsBox.appendChild(div);
      colors.easy.splice(number, 1);
      cards.push(div);
    }
  }
  if (activeLevel === "medium") {
    for (i = 0; i < gameElements; i++) {
      const number = Math.floor(Math.random() * colors.medium.length);
      const div = document.createElement("div");
      div.classList.add(activeLevel);
      div.style.backgroundColor = colors.medium[number];
      cardsBox.appendChild(div);
      colors.medium.splice(number, 1);
      cards.push(div);
    }
  }
  if (activeLevel === "hard") {
    for (i = 0; i < gameElements; i++) {
      const number = Math.floor(Math.random() * colors.hard.length);
      const div = document.createElement("div");
      div.classList.add(activeLevel);
      div.style.backgroundColor = colors.hard[number];
      cardsBox.appendChild(div);
      colors.hard.splice(number, 1);
      cards.push(div);
    }
  }
};
categories.forEach((button) => {
  button.addEventListener("click", () => {
    categories.forEach((category) => {
      category.classList.remove("activeBtn");
    });
    button.classList.add("activeBtn");
    activeCategory = button.dataset.name;
  });
});

levels.forEach((level) => {
  level.addEventListener("click", () => {
    levels.forEach((button) => {
      button.classList.remove("activeLevel");
    });
    level.classList.add("activeLevel");
    activeLevel = level.dataset.level;
    gameElements = level.dataset.elements;
  });
});
startBtn.addEventListener("click", () => {
  menu.style.display = "none";
  game.style.display = "flex";
  image.style.backgroundImage = `url(https://placeimg.com/${window.innerWidth}/${window.innerHeight}/${activeCategory})`;
  createGame();

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("clicked");
      card.addEventListener("click", cardClick);
    });
  }, 1000);
  gamePairs = gameElements / 2;
});
