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

const generateButton = (classList) => {
  let button = document.createElement("button");

  if (classList.length > 0) {
    classList.forEach((className) => {
      button.classList.add(className);
    });
  }

  return button;
};

if (gridSize > 2) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    let computerButton = generateButton(["btn", "btn-primary", "m-1"]);
    let userButton = generateButton(["btn", "btn-success", "m-1"]);

    generateGrid(computerButton, computerGridContainer);
    generateGrid(userButton, userGridContainer);
  }
}
