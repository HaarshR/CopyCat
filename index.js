let gridSize = 3; // User Chooses
let boxSize = 75;
let repeatCSS = `repeat(${gridSize}, ${boxSize}px)`;

const computerGridContainer = document.getElementById(
  "computer-grid-container"
);
const computerGridContainerStyle = computerGridContainer.style;

const userGridContainer = document.getElementById("user-grid-container");
const userGridContainerStyle = userGridContainer.style;

computerGridContainerStyle.display = "grid";
computerGridContainerStyle.gridTemplateColumns = repeatCSS;
computerGridContainerStyle.gridTemplateRows = repeatCSS;

userGridContainerStyle.display = "grid";
userGridContainerStyle.gridTemplateColumns = repeatCSS;
userGridContainerStyle.gridTemplateRows = repeatCSS;

if (gridSize > 2) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    let computerButton = document.createElement("button");
    computerButton.classList.add("btn-primary");
    computerButton.classList.add("btn");
    computerButton.classList.add("m-1");
    let userButton = document.createElement("button");
    userButton.classList.add("btn-success");
    userButton.classList.add("btn");
    userButton.classList.add("m-1");

    computerButton.style.width = boxSize;
    computerButton.style.height = boxSize;
    computerButton.innerText = i + 1;
    computerGridContainer.appendChild(computerButton);

    userButton.style.width = boxSize;
    userButton.style.height = boxSize;
    userButton.innerText = i + 1;
    userGridContainer.appendChild(userButton);
  }
}
