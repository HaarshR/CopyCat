const gridSizeInput = document.getElementById("grid-size");
const gridSizeLabel = document.getElementById("grid-size-label");

const computerSpeedInput = document.getElementById("computer-speed");
const computerSpeedLabel = document.getElementById("computer-speed-label");

const patternLengthInput = document.getElementById("pattern-length");
const patternLengthLabel = document.getElementById("pattern-length-label");

const startGameButton = document.getElementById("start-game");
const timerLabel = document.getElementById("timer");

const BOX_SIZE = 100; // Fixed button size

const background_music = new Audio("./assets/music/background_music.mp3");

const button_computer_press_sound = new Audio(
  "./assets/music/button_computer_press.wav"
);
const button_user_press_sound = new Audio(
  "./assets/music/button_user_press.wav"
);

let COMPUTER_SEQUENCE = [];
let USER_SEQUENCE = [];

let gridSize = 0;
let computerSpeed = 0;
let patternLength = 0;

let currentPatternNumber = 1;

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

const generateButton = (
  classList,
  attributeList,
  mouseDown,
  mouseUp,
  styles
) => {
  let button = document.createElement("button");
  if (mouseDown) {
    button.addEventListener("mousedown", mouseDown);
  }

  if (mouseDown) {
    button.addEventListener("mouseup", mouseUp);
  }

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

  if (styles) {
    if (styles.length > 0) {
      styles.forEach((style) => {
        button.style.setProperty(style.property, style.value);
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
          ["btn", "m-1"],
          [{ attribute: "id", value: `user-${i}` }],
          () => {
            userButtonOnMouseDown(i);
          },
          () => {
            userButtonOnMouseUp(i);
          },
          [
            { property: "background-color", value: "#686868" },
            {
              property: "box-shadow",
              value: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
            },
          ]
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
  computerGridContainerStyle.removeProperty("grid-template-columns");
  computerGridContainerStyle.removeProperty("grid-template-rows");
  userGridContainerStyle.removeProperty("grid-template-columns");
  userGridContainerStyle.removeProperty("grid-template-rows");
  generated = false;
  computerGridContainer.textContent = "";
  userGridContainer.textContent = "";
};

const resetGame = () => {
  setGridSize();
  setComputerSpeed();
  setPatternLength();
  currentPatternNumber = 1;

  COMPUTER_SEQUENCE = [];
  USER_SEQUENCE = [];

  gridSizeInput.removeAttribute("disabled");
  computerSpeedInput.removeAttribute("disabled");
  patternLengthInput.removeAttribute("disabled");

  startGameButton.style.visibility = "visible";
  startGameButton.removeAttribute("disabled");

  timerLabel.style.visibility = "hidden";

  resetGrid();
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
  let tempFinalPattern = [];
  // Generate final pattern
  for (let i = 0; i < patternLength; i++) {
    let index = Math.floor(Math.random() * (gridSize * gridSize));
    tempFinalPattern.push(index);
  }
  // Geenrate sequence
  for (let i = 0; i < patternLength; i++) {
    COMPUTER_SEQUENCE[i] = [];
    tempFinalPattern.forEach((item) => COMPUTER_SEQUENCE[i].push(item));
    tempFinalPattern.pop();
  }
  COMPUTER_SEQUENCE.reverse(); // Computer Sequence Set
  console.log(COMPUTER_SEQUENCE);
  return true;
};

const lightComputerButton = (id) => {
  return new Promise((res, rej) => {
    let button = document.getElementById(`comp-${id}`);
    button_computer_press_sound.play();

    button.classList.remove("bg-primary");
    button.classList.add("bg-danger");

    setTimeout(() => {
      button.classList.remove("bg-danger");
      button.classList.add("bg-primary");
      setTimeout(() => res(), 1000 / computerSpeed);
    }, 1000 / computerSpeed);
  });
};

const userButtonOnMouseDown = (index) => {
  let button = document.getElementById(`user-${index}`);
  button.style.backgroundColor = "#525050";
  button_user_press_sound.play();
};

const userButtonOnMouseUp = (index) => {
  let button = document.getElementById(`user-${index}`);
  button.style.backgroundColor = "#686868";
  for (let i = 0; i < currentPatternNumber; i++) {
    if (!USER_SEQUENCE[i]) {
      USER_SEQUENCE[i] = [];
      USER_SEQUENCE[i].push(index);
    } else {
      USER_SEQUENCE[i].push(index);
    }
  }
  check();
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
      setTimeout(async () => {
        // Start Pattern
        const generatedComputerPattern = generateComputerPattern();
        if (generatedComputerPattern) {
          await lightComputerButton(COMPUTER_SEQUENCE[0][0]);
        }
      }, 2000);
    }
  });
};

const check = () => {
  if (USER_SEQUENCE[currentPatternNumber - 1].length === currentPatternNumber) {
    let strComputerSequence = JSON.stringify(
      COMPUTER_SEQUENCE[currentPatternNumber - 1]
    );
    let strUserSequence = JSON.stringify(
      USER_SEQUENCE[currentPatternNumber - 1]
    );

    if (strComputerSequence === strUserSequence) {
      console.log("same!");
      currentPatternNumber++;
      console.log(currentPatternNumber);
      if (currentPatternNumber <= patternLength) {
        setTimeout(async () => {
          for (
            let i = 0;
            i < COMPUTER_SEQUENCE[currentPatternNumber - 1].length;
            i++
          ) {
            await lightComputerButton(
              COMPUTER_SEQUENCE[currentPatternNumber - 1][i]
            );
          }
        }, 1000 / computerSpeed);
      } else {
        console.log("You won!");
        resetGame();
        return;
      }
    } else {
      console.log("not same!");
      resetGame();
      return;
    }
  }
};

gridSizeInput.addEventListener("input", setGridSize);
computerSpeedInput.addEventListener("input", setComputerSpeed);
patternLengthInput.addEventListener("input", setPatternLength);

startGameButton.addEventListener("click", startGame);

const main = () => {
  background_music.loop = true;
  background_music.volume = 0.4;
  background_music.play();
  resetGame();
};

main();
