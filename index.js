let gridSize = 3; // User Chooses
const BOX_SIZE = 100;
let repeatCSS = `repeat(${gridSize}, ${BOX_SIZE}px)`;

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

const generateGrid = (component, parentComponent) => {
  component.style.width = BOX_SIZE;
  component.style.height = BOX_SIZE;
  parentComponent.appendChild(component);
};

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

    generateGrid(computerButton, computerGridContainer);
    generateGrid(userButton, userGridContainer);
  }
}
