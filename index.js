const gridSizeInput = document.getElementById("grid-size");
const gridSizeLabel = document.getElementById("grid-size-label");

const computerSpeedInput = document.getElementById("computer-speed");
const computerSpeedTitle = document.getElementById("computer-speed-title");
const computerSpeedLabel = document.getElementById("computer-speed-label");

const patternLengthInput = document.getElementById("pattern-length");
const patternLengthTitle = document.getElementById("pattern-length-title");
const patternLengthLabel = document.getElementById("pattern-length-label");

const gameScores = document.getElementById("game-scores");
const gameScoresTitle = document.getElementById("game-scores-title");

const scrollTopButton = document.getElementById("scroll-top");

const startGameButton = document.getElementById("start-game");
const timerLabel = document.getElementById("timer");

//! Modal Parts
const modal = {
  modal: document.getElementById("game-modal"),
  show: () => $("#game-modal").modal(),
  title: document.getElementById("game-modal-title"),
  body: document.getElementById("game-modal-body"),
};

const BOX_SIZE = 100; // Fixed button size

const background_music = new Audio("./assets/music/background_music.mp3");
const start_game_sound = new Audio("./assets/music/start_game_sound.mp3");

const countdown_sound = new Audio("./assets/music/countdown.flac");
const lost_sound = new Audio("./assets/music/lost.wav");
const won_sound = new Audio("./assets/music/won.wav");

const button_computer_press_sound = new Audio(
  "./assets/music/button_computer_press.wav"
);
const button_user_press_sound = new Audio(
  "./assets/music/button_user_press.wav"
);

const computerGridContainer = document.getElementById(
  "computer-grid-container"
);
const userGridContainer = document.getElementById("user-grid-container");

const computerGridContainerStyle = computerGridContainer.style;
computerGridContainerStyle.display = "grid";
const userGridContainerStyle = userGridContainer.style;
userGridContainerStyle.display = "grid";

let userGridChildren;

let COMPUTER_SEQUENCE = [];
let USER_SEQUENCE = [];

let gridSize = 0;
let computerSpeed = 0;
let patternLength = 0;

let gameCount = 0;
let currentPatternNumber = 1;

let timerStarted = false;

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
  if (computerSpeed > 5) {
    computerSpeedLabel.classList.add("text-danger");
    computerSpeedTitle.classList.add("text-danger");
  } else {
    computerSpeedLabel.classList.remove("text-danger");
    computerSpeedTitle.classList.remove("text-danger");
  }
};

const setPatternLength = () => {
  patternLength = patternLengthInput.value;
  patternLengthLabel.innerText = patternLength;
  if (patternLength > 5) {
    patternLengthLabel.classList.add("text-danger");
    patternLengthTitle.classList.add("text-danger");
  } else {
    patternLengthLabel.classList.remove("text-danger");
    patternLengthTitle.classList.remove("text-danger");
  }
};

const countDown = (timerCount) => {
  return new Promise((res, rej) => {
    let timer = setInterval(() => {
      if (timerCount < 0) {
        console.log("checked");
        clearInterval(timer);
        res();
      } else {
        countdown_sound.play();
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

    button.classList.remove("btn-primary");
    button.classList.add("btn-danger");

    setTimeout(() => {
      button.classList.remove("btn-danger");
      button.classList.add("btn-primary");
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
  gameCount++;
  gridSizeInput.setAttribute("disabled", true);
  computerSpeedInput.setAttribute("disabled", true);
  patternLengthInput.setAttribute("disabled", true);

  startGameButton.style.visibility = "hidden";
  startGameButton.setAttribute("disabled", true);

  timerLabel.style.visibility = "visible";

  countDown(5).then(() => {
    start_game_sound.play().then(() => {
      const gridBuilt = buildGrid();
      if (gridBuilt) {
        userGridChildren = userGridContainer.children;
        console.log(userGridChildren);
        // Start Game Logic
        timerLabel.innerText = "Started";
        setTimeout(async () => {
          // Start Pattern
          const generatedComputerPattern = generateComputerPattern();
          if (generatedComputerPattern) {
            for (let i = 0; i < userGridChildren.length; i++) {
              userGridChildren[i].setAttribute("disabled", true);
            }
            await lightComputerButton(COMPUTER_SEQUENCE[0][0]);
            for (let i = 0; i < userGridChildren.length; i++) {
              userGridChildren[i].removeAttribute("disabled");
            }
          }
        }, 2000);
      }
    });
  });
};

const checkWithPrevious = () => {
  let valid = false;
  if (currentPatternNumber === 1) {
    if (
      USER_SEQUENCE[currentPatternNumber - 1][0] ===
      COMPUTER_SEQUENCE[currentPatternNumber - 1][0]
    ) {
      valid = true;
    } else {
      valid = false;
    }
  } else {
    for (let i = 0; i < USER_SEQUENCE[currentPatternNumber - 1].length; i++) {
      if (
        USER_SEQUENCE[currentPatternNumber - 1][i] ===
        COMPUTER_SEQUENCE[currentPatternNumber - 1][i]
      ) {
        valid = true;
      } else {
        valid = false;
      }
    }
  }

  return valid;
};

const showModal = (title, body) => {
  modal.title.innerText = title;
  modal.body.innerText = body;

  modal.show();
};

const updateGameScore = (didWin) => {
  let row = document.createElement("div");
  row.classList.add("row", "py-3", "my-3", "mx-3");
  row.style.borderRadius = "30px";
  row.style.backgroundColor = "#5f5a7a";
  row.style.border = "yellow 10px solid";

  let countDiv = document.createElement("div");
  countDiv.classList.add(
    "col-2",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  let countH2 = document.createElement("h2");
  countH2.classList.add("text-white");
  countH2.innerText = gameCount;

  let gameDetailDiv = document.createElement("div");
  gameDetailDiv.classList.add("col-10");
  let gameDetailRow = document.createElement("div");
  gameDetailRow.classList.add("row");

  let gameStatusDiv = document.createElement("div");
  gameStatusDiv.classList.add(
    "col",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  let gameStatusH2 = document.createElement("h2");
  gameStatusH2.classList.add(didWin ? "text-success" : "text-danger");
  gameStatusH2.innerText = didWin ? "WON" : "LOST";

  let gameSettingsDiv = document.createElement("div");
  gameSettingsDiv.classList.add("col");
  let gameSettingsH5 = document.createElement("h5");
  gameSettingsH5.classList.add("text-white");
  gameSettingsH5.innerText = `Game Settings ⚙ \n Grid Size: ${gridSize} \n Speed: ${computerSpeed} \n Pattern Length: ${patternLength}`;

  //! Append
  countDiv.append(countH2);

  gameStatusDiv.appendChild(gameStatusH2);
  gameSettingsDiv.appendChild(gameSettingsH5);

  gameDetailRow.appendChild(gameStatusDiv);
  gameDetailRow.appendChild(gameSettingsDiv);

  gameDetailDiv.appendChild(gameDetailRow);

  row.appendChild(countDiv);
  row.appendChild(gameDetailDiv);
  gameScores.insertBefore(row, gameScores.firstChild);
};

const check = () => {
  // Check previous patterns
  let checked = checkWithPrevious();

  if (checked) {
    if (
      USER_SEQUENCE[currentPatternNumber - 1].length === currentPatternNumber
    ) {
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
              for (let i = 0; i < userGridChildren.length; i++) {
                userGridChildren[i].setAttribute("disabled", true);
              }
              await lightComputerButton(
                COMPUTER_SEQUENCE[currentPatternNumber - 1][i]
              );
              for (let i = 0; i < userGridChildren.length; i++) {
                userGridChildren[i].removeAttribute("disabled");
              }
            }
          }, 1000 / computerSpeed);
        } else {
          showModal(
            "🔥 You Won 🔥",
            `Mission Accomplished Soldier \n\n Game Settings ⚙ \n Grid Size: ${gridSize} \n Speed: ${computerSpeed} \n Pattern Length: ${patternLength}`
          );
          updateGameScore(true);
          won_sound.play();
          resetGame();
          gameScoresTitle.scrollIntoView();
          return;
        }
      } else {
        howModal(
          "💥 You Lost 💥",
          `Mission Failed, We'll Get Em' Next Time \n\n Grid Size: ${gridSize} \n Speed: ${computerSpeed} \n Pattern Length: ${patternLength}`
        );
        updateGameScore(false);
        lost_sound.play();
        resetGame();
        gameScoresTitle.scrollIntoView();
        return;
      }
    }
  } else {
    showModal(
      "💥 You Lost 💥",
      `Mission Failed, We'll Get Em' Next Time \n\n Grid Size: ${gridSize} \n Speed: ${computerSpeed} \n Pattern Length: ${patternLength}`
    );
    updateGameScore(false);
    lost_sound.play();
    resetGame();
    gameScoresTitle.scrollIntoView();
    return;
  }
};

gridSizeInput.addEventListener("input", setGridSize);
computerSpeedInput.addEventListener("input", setComputerSpeed);
patternLengthInput.addEventListener("input", setPatternLength);

startGameButton.addEventListener("click", startGame);
scrollTopButton.addEventListener("click", () => scrollTo({ top }));

const main = () => {
  resetGame();
  scrollTo({ top });
};

main();
