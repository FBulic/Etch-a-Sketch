const grid = document.getElementById("gridContainer");
const slider = document.querySelector(".size");
const sizeText = document.querySelector(".sizeText");
const body = document.querySelector("body");
const eraser = document.querySelector(".eraser");
const color = document.querySelector(".colorPick");
const newCanvas = document.querySelector(".newCanvas");
const rainbow = document.querySelector(".rainbowBtn");
let mouseDown = false;
let eraseClick = false;
let rainbowBtn = false;
let children = [];
color.value = "#000000";

eraser.addEventListener("click", () => {
  eraseClick = true;
  rainbowBtn = false;
});

rainbow.addEventListener("click", () => {
  rainbowBtn = true;
});

newCanvas.addEventListener("click", () => {
  canvasGrid(value);
  eraseClick = false;
  rainbowBtn = false;
});

color.addEventListener("click", () => {
  eraseClick = false;
  rainbowBtn = false;
});

body.addEventListener("mousedown", () => {
  mouseDown = true;
});
body.addEventListener("mouseup", () => {
  mouseDown = false;
});
body.ondragstart = () => {
  return false;
};

function draw(divs) {
  divs.addEventListener("mouseover", () => {
    if (mouseDown) {
      divs.style.backgroundColor = `${color.value}`;
      if (eraseClick) {
        divs.style.backgroundColor = "white";
      }
      if (rainbowBtn) {
        divs.style.backgroundColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
    }
  });
}

function canvasGrid(value) {
  children.forEach((child) => grid.removeChild(child));
  children = [];
  let doubleValue = value * value;
  for (let i = 0; i < doubleValue; i++) {
    let divs = document.createElement("div");
    divs.classList.add("divs");
    children.push(grid.appendChild(divs));
    draw(divs);
  }
  grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;
}

let value = 40;
slider.value = 40;
sizeText.textContent = `${value} x ${value}`;

slider.addEventListener("input", () => {
  eraseClick = false;
  value = slider.value;
  sizeText.textContent = `${value} x ${value}`;
  canvasGrid(value);
});

canvasGrid(value);
