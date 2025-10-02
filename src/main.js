import "./style.css";

const screensEl = document.querySelectorAll(".screens");
const startBtnEl = document.getElementById("startBtn");
const chooseBtnEl = document.querySelectorAll(".chooseBtn");
const gameContainerEl = document.getElementById("gameContainer");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
let seconds = 0;
let score = 0;
let selectedEl = {};

startBtnEl.addEventListener("click", () => {
  screensEl[0].classList.add("up");
});

chooseBtnEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    selectedEl = { src };
    screensEl[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  console.log(seconds);
  seconds++;
}
function createInsect() {
  const insert = document.createElement("div");
  insert.classList.add("insert");
  const { x, y } = randomLocation;
  insert.style.top = `${y}px`;
  insert.style.top = `${x}px`;
  insert.innerHTML = `<img src="${selectedEl.src}"/>`;

  insert.addEventListener("click", catchInsect);
  gameContainerEl.appendChild(insert);
}
function randomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}
function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addInsects();
}
function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}
function increaseScore() {
  score++;
  scoreEl.innerHTML = `Score: ${score}`;
}
