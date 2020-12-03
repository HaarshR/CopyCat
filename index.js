const gridSizeInput = document.getElementById("grid-size");
const buildGridButton = document.getElementById("build-grid");
const resetGridButton = document.getElementById("reset-grid");

let gridSize = 0; // User Chooses
const BOX_SIZE = 100; // Fixed button size

let generated = false;

const computerGridContainer = document.getElementById(
  "computer-grid-container"
);
const userGridContainer = document.getElementById("user-grid-container");

const computerGridContainerStyle = computerGridContainer.style;
computerGridContainerStyle.display = "grid";
const userGridContainerStyle = userGridContainer.style;
userGridContainerStyle.display = "grid";

const generateGrid = (component, parentComponent) => {
  component.style.width = BOX_SIZE;
  component.style.height = BOX_SIZE;
  parentComponent.appendChild(component);
};

const generateButton = (classList, attributeList) => {
  let button = document.createElement("button");

  if (classList.length > 0) {
    classList.forEach((className) => {
      button.classList.add(className);
    });
  }

  if (attributeList) {
    if (attributeList.length > 0) {
      attributeList.forEach(({ attribute, value }) => {
        button.setAttribute(attribute, value);
      });
    }
  }

  return button;
};

const buildGrid = () => {
  if (!generated) {
    gridSize = gridSizeInput.value;
    let gridCount = gridSize * gridSize;
    let repeatCSS = `repeat(${gridSize}, ${BOX_SIZE}px)`;

    computerGridContainerStyle.gridTemplateColumns = repeatCSS;
    computerGridContainerStyle.gridTemplateRows = repeatCSS;

    userGridContainerStyle.gridTemplateColumns = repeatCSS;
    userGridContainerStyle.gridTemplateRows = repeatCSS;

    if (gridSize >= 2) {
      for (let i = 0; i < gridCount; i++) {
        let computerButton = generateButton(
          ["btn", "btn-primary", "m-1"],
          [{ attribute: "disabled", value: true }]
        );
        let userButton = generateButton(["btn", "btn-success", "m-1"]);

        generateGrid(computerButton, computerGridContainer);
        generateGrid(userButton, userGridContainer);
      }
    }
  }

  generated = true;
};

const resetGrid = () => {
  generated = false;
  computerGridContainer.textContent = "";
  userGridContainer.textContent = "";
};

buildGridButton.addEventListener("click", buildGrid);
resetGridButton.addEventListener("click", resetGrid);

const main = () => {
  //   buildGrid();
};

main();
