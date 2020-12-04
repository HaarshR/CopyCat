const gridSizeInput = document.getElementById("grid-size");
const gridSizeLabel = document.getElementById("grid-size-label");

const computerSpeedInput = document.getElementById("computer-speed");
const computerSpeedLabel = document.getElementById("computer-speed-label");

const patternLengthInput = document.getElementById("pattern-length");
const patternLengthLabel = document.getElementById("pattern-length-label");

const startGameButton = document.getElementById("start-game");
const timerLabel = document.getElementById("timer");

const BOX_SIZE = 100; // Fixed button size

let COMPUTER_SEQUENCE = [];
let USER_SEQUENCE = [];

let gridSize = 0;
let computerSpeed = 0;
let patternLength = 0;

let timerStarted = false;

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

  if (classList) {
    if (classList.length > 0) {
      classList.forEach((className) => {
        button.classList.add(className);
      });
    }
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
  if (gridSize && gridSize > 1) {
    resetGrid();
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
          [
            { attribute: "id", value: `comp-${i}` },
            { attribute: "disabled", value: true },
          ]
        );
        let userButton = generateButton(
          ["btn", "btn-success", "m-1"],
          [{ attribute: "id", value: `user-${i}` }]
        );

        generateGrid(computerButton, computerGridContainer);
        generateGrid(userButton, userGridContainer);
      }
    }
    return true;
  } else {
    return false;
  }
};

const resetGrid = () => {
  generated = false;
  computerGridContainer.textContent = "";
  userGridContainer.textContent = "";
};

const resetGame = () => {
  setGridSize();
  setComputerSpeed();
  setPatternLength();
};

const setGridSize = () => {
  gridSize = gridSizeInput.value;
  gridSizeLabel.innerText = gridSize;
};

const setComputerSpeed = () => {
  computerSpeed = computerSpeedInput.value;
  computerSpeedLabel.innerText = computerSpeed;
};

const setPatternLength = () => {
  patternLength = patternLengthInput.value;
  patternLengthLabel.innerText = patternLength;
};

const countDown = (timerCount) => {
  return new Promise((res, rej) => {
    let timer = setInterval(() => {
      if (timerCount === 0) {
        console.log("checked");
        clearInterval(timer);
        res();
      } else {
        console.log(timerCount);
        timerLabel.innerText = timerCount.toString();
      }
      timerCount--;
    }, 1000);
  });
};

const generateComputerPattern = () => {
  let finalPattern = [];
  let tempFinalPattern = [];
  // Generate final pattern
  for (let i = 0; i < patternLength; i++) {
    let index = Math.floor(Math.random() * (gridSize * gridSize));
    finalPattern.push(index);
    tempFinalPattern.push(index);
  }

  console.log(tempFinalPattern);

  // Geenrate sequence
  for (let i = 0; i < finalPattern.length; i++) {
    COMPUTER_SEQUENCE[i] = [];
    tempFinalPattern.forEach((item) => COMPUTER_SEQUENCE[i].push(item));
    tempFinalPattern.pop();
  }
  COMPUTER_SEQUENCE.reverse(); // Computer Sequence Set
  console.log(COMPUTER_SEQUENCE);
};

const startGame = () => {
  gridSizeInput.setAttribute("disabled", true);
  computerSpeedInput.setAttribute("disabled", true);
  patternLengthInput.setAttribute("disabled", true);

  startGameButton.style.visibility = "hidden";
  startGameButton.setAttribute("disabled", true);

  timerLabel.style.visibility = "visible";

  countDown(0).then(() => {
    const gridBuilt = buildGrid();
    if (gridBuilt) {
      // Start Game Logic
      timerLabel.innerText = "Started";
      setTimeout(() => {
        // Start Pattern
        generateComputerPattern();
      }, 2000);
    }
  });
};

gridSizeInput.addEventListener("input", setGridSize);
computerSpeedInput.addEventListener("input", setComputerSpeed);
patternLengthInput.addEventListener("input", setPatternLength);

startGameButton.addEventListener("click", startGame);

const main = () => {
  resetGame();
};

main();
