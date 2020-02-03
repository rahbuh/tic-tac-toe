(function() {
  const start = document.getElementById("start-btn");
  const firstPlayer = document.getElementById("select-player");
  const board = document.getElementById("board");

  let player = null;
  let gameOn = false;
  const scores = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  firstPlayer.addEventListener("change", e => {
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
    for (const square of squares) {
      square.innerText = "";
    }
  }

  function resetScores() {
    scores.forEach(score => {
      score[0] = 0;
      score[1] = 0;
      score[2] = 0;
    });
  }

  function disablePlayerSelect() {
    document
      .querySelectorAll('[type = "radio"]')
      .forEach(radio => radio.setAttribute("disabled", true));
  }

  function displayMessage(msg) {
    document.getElementById("message").innerText = msg;
  }

  function startGame() {
    if (!gameOn) {
      gameOn = true;
    }
  }

  board.addEventListener("click", e => {
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
        scores[0][0] = value;
        break;
      case "2":
        scores[0][1] = value;
        break;
      case "3":
        scores[0][2] = value;
        break;
      case "4":
        scores[1][0] = value;
        break;
      case "5":
        scores[1][1] = value;
        break;
      case "6":
        scores[1][2] = value;
        break;
      case "7":
        scores[2][0] = value;
        break;
      case "8":
        scores[2][1] = value;
        break;
      case "9":
        scores[2][2] = value;
        break;
      default:
        break;
    }
  }

  function isPlayerWinner() {
    let win;
    let isWinner = false;
    player === "X" ? (win = 3) : (win = -3);

    const possibleWins = [
      [...scores[0]],
      [...scores[1]],
      [...scores[2]],
      [scores[0][0], scores[1][0], scores[2][0]],
      [scores[0][1], scores[1][1], scores[2][1]],
      [scores[0][2], scores[1][2], scores[2][2]],
      [scores[0][0], scores[1][1], scores[2][2]],
      [scores[0][2], scores[1][1], scores[2][0]]
    ];

    for (const scoresGroup of possibleWins) {
      const result = scoresGroup.reduce((total, num) => {
        return total + num;
      });
      if (result === win) {
        isWinner = true;
        break;
      }
    }

    return isWinner;
  }

  function openSquares() {
    const squares = document.getElementsByClassName("square");

    for (const square of squares) {
      if (square.innerText === "") {
        return true;
      }
    }
    return false;
  }

  function endGame() {
    gameOn = false;
    player = null;
    document.querySelectorAll('[type = "radio"]').forEach(radio => {
      radio.removeAttribute("disabled");
      radio.checked = false;
    });
  }
})();
