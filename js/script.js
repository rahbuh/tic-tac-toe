(function () {
  const start = document.getElementById("start-btn");
  const firstPlayer = document.getElementById("select-player");
  const board = document.getElementById("board");

  let player = null;
  let gameOn = false;
  const scores = {
    rowOne: 0,
    rowTwo: 0,
    rowThree: 0,
    columnOne: 0,
    columnTwo: 0,
    columnThree: 0,
    diagonalOne: 0,
    diagonalTwo: 0,
  };

  firstPlayer.addEventListener("change", (e) => {
    player = e.target.id;
  });

  start.addEventListener("click", () => {
    if (player) {
      clearSquares();
      resetScores();
      disablePlayerSelect();
      displayMessage(`${player}'s Move`);
      startGame();
    }
  });

  function clearSquares() {
    const squares = document.getElementsByClassName("square");
    for (let square of squares) {
      square.innerText = "";
    }
  }

  function resetScores() {
    Object.keys(scores).forEach((key) => {
      scores[key] = 0;
    });
  }

  function disablePlayerSelect() {
    document
      .querySelectorAll('[type = "radio"]')
      .forEach((radio) => radio.setAttribute("disabled", true));
  }

  function displayMessage(msg) {
    document.getElementById("message").innerText = msg;
  }

  function startGame() {
    !gameOn && (gameOn = !gameOn);
  }

  board.addEventListener("click", (e) => {
    if (gameOn) {
      const isEmptySquare = e.target.innerText === "";
      const squareNum = e.target.dataset.square;

      if (isEmptySquare) {
        e.target.innerText = player;
        updateScores(squareNum);

        if (isPlayerWinner()) {
          displayMessage(`${player} Wins!`);
          endGame();
        } else if (!openSquares()) {
          displayMessage(`Tie Game`);
          endGame();
        } else {
          player === "X" ? (player = "O") : (player = "X");
          displayMessage(`${player}'s Move`);
        }
      }
    }
  });

  function updateScores(square) {
    let value;
    player === "X" ? (value = 1) : (value = -1);

    switch (square) {
      case "1":
        scores.rowOne += value;
        scores.columnOne += value;
        scores.diagonalOne += value;
        break;
      case "2":
        scores.rowOne += value;
        scores.columnTwo += value;
        break;
      case "3":
        scores.rowOne += value;
        scores.columnThree += value;
        scores.diagonalTwo += value;
        break;
      case "4":
        scores.rowTwo += value;
        scores.columnOne += value;
        break;
      case "5":
        scores.rowTwo += value;
        scores.columnTwo += value;
        scores.diagonalOne += value;
        scores.diagonalTwo += value;
        break;
      case "6":
        scores.rowTwo += value;
        scores.columnThree += value;
        break;
      case "7":
        scores.rowThree += value;
        scores.columnOne += value;
        scores.diagonalTwo += value;
        break;
      case "8":
        scores.rowThree += value;
        scores.columnTwo += value;
        break;
      case "9":
        scores.rowThree += value;
        scores.columnThree += value;
        scores.diagonalOne += value;
        break;
      default:
        break;
    }
  }

  function isPlayerWinner() {
    let win;
    player === "X" ? (win = 3) : (win = -3);

    return Object.values(scores).includes(win);
  }

  function openSquares() {
    const squares = document.getElementsByClassName("square");

    for (let square of squares) {
      if (square.innerText === "") {
        return true;
      }
    }
    return false;
  }

  function endGame() {
    gameOn = false;
    player = null;
    document.querySelectorAll('[type = "radio"]').forEach((radio) => {
      radio.removeAttribute("disabled");
      radio.checked = false;
    });
  }
})();
