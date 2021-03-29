//Needed queryselectors
const categories = [...document.querySelectorAll(".category")];
const levels = [...document.querySelectorAll(".level")];
const startBtn = document.querySelector(".startBtn");
const menu = document.querySelector(".start");
const game = document.querySelector(".content");
const cardsBox = document.querySelector(".cards");
const image = document.querySelector(".image");
const finish = document.querySelector(".finishMessage");
const playAgain = document.querySelector(".again");
const time = document.querySelector(".time");

//tab for divs
const cards = [];

// Needed variables
let activeCategory = "";
let activeLevel = "";
let activeElement = "";
let activeCards = [];
let gameElements = "";
let gamePairs;
let startTime = 0;
let endTime = 0;
let gameTime = 0;

//colors for each level
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

//function for click divs
const cardClick = function () {
  //check if clicked div is already unactive
  if (this.classList.contains("unactive")) return;

  //if div is active show color and add div for active element
  activeElement = this;
  activeElement.classList.remove("clicked");

  //push active element to tab for compare
  if (activeCards.length === 0) {
    activeCards.push(activeElement);
  }
  // if click this same div return
  if (activeElement === activeCards[0]) return;
  //if click other div push div to tab with active elements and remove event for all divs
  else {
    activeCards.push(this);
    cards.forEach((card) => {
      card.removeEventListener("click", cardClick);
    });
    // if 2 divs have this same color add unactive class , delete from game , clear variables and add event for divs
    if (
      activeCards[0].style.backgroundColor ===
      activeCards[1].style.backgroundColor
    ) {
      setTimeout(() => {
        activeCards.forEach((card) => {
          card.classList.add("unactive");
        });

        cards.forEach((card) => {
          if (card.classList.contains("clicked")) {
            card.addEventListener("click", cardClick);
          } else return;
        });

        activeCards = [];
        activeElement = "";
      }, 500);
      gamePairs--;
      //if all divs unactive show finish message and show game time
      if (gamePairs === 0) {
        endTime = new Date().getTime();
        gameTime = ((endTime - startTime) / 1000).toFixed(2);
        time.textContent = `${gameTime} sekund`;
        setTimeout(() => {
          finish.classList.remove("finishMessage--unactive");
        }, 1000);

        playAgain.addEventListener("click", () => {
          location.reload();
        });
      }
    }
    //if clicked divs are different we cover colors ,add event again for divs and clear variables
    else {
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
};
//function for create divs with colors, the amount depends on the selected level
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
// buttons for choice cattegory with the help of dataset
categories.forEach((button) => {
  button.addEventListener("click", () => {
    categories.forEach((category) => {
      category.classList.remove("activeBtn");
    });
    button.classList.add("activeBtn");
    activeCategory = button.dataset.name;
  });
});
//button for choice level with the help of dataset
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

//start button shows game, hide menu, add image for bg and add clicked class for each div
startBtn.addEventListener("click", () => {
  if (activeCategory === "" || activeLevel === "") {
    alert("Wybierz kategorię i poziom trudności");
    return;
  }
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
  startTime = new Date().getTime();
});
