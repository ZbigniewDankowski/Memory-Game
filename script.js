const categories = [...document.querySelectorAll(".category")];
const levels = [...document.querySelectorAll(".level")];
const startBtn = document.querySelector(".startBtn");
const menu = document.querySelector(".start");
const game = document.querySelector(".content");

categories.forEach((button) => {
  button.addEventListener("click", () => {
    categories.forEach((category) => {
      category.classList.remove("activeBtn");
    });
    button.classList.add("activeBtn");
  });
});

levels.forEach((level) => {
  level.addEventListener("click", () => {
    levels.forEach((button) => {
      button.classList.remove("activeLevel");
    });
    level.classList.add("activeLevel");
  });
});

startBtn.addEventListener("click", () => {
  menu.style.display = "none";
  game.style.display = "block";
});
