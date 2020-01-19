(function() {
  const board = document.getElementById("board");
  const start = document.getElementById("start-btn");
  const squares = document.getElementsByClassName("square");
  const firstPlayer = document.getElementById("select-player");
  const radioX = document.getElementById("X");
  const radioO = document.getElementById("O");
  const message = document.getElementById("message");

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
      startGame();
      clearSquares();
      resetScores();
      displayMessage(`${player}'s Move`);
    }
  });

  board.addEventListener("click", e => {
    if (gameOn) {
      const isEmptySquare = e.target.innerText === "";
      const squareNum = e.target.dataset.square;
      let winner;

      if (isEmptySquare) {
        e.target.innerText = player;
        updateScores(squareNum);
        winner = evaluateScore();

        if (winner) {
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

  function startGame() {
    if (!gameOn) {
      gameOn = true;
    }
    radioO.setAttribute("disabled", true);
    radioX.setAttribute("disabled", true);
  }

  function clearSquares() {
    const squaresArr = [...squares];
    squaresArr.forEach(square => (square.innerText = ""));
  }

  function resetScores() {
    scores.forEach(score => {
      score[0] = 0;
      score[1] = 0;
      score[2] = 0;
    });
  }

   function displayMessage(msg) {
    message.innerText = msg;
  }

  function updateScores(choice) {
    let value;
    player === "X" ? (value = 1) : (value = -1);

    switch (choice) {
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

  function evaluateScore() {
    let win;
    player === "X" ? (win = 3) : (win = -3);

    for (let index = 0; index < 3; index++) {
      if (scores[index][0] + scores[index][1] + scores[index][2] === win) {
        return true;
      }
      if (scores[0][index] + scores[1][index] + scores[2][index] === win) {
        return true;
      }
    }

    if (scores[0][0] + scores[1][1] + scores[2][2] === win) {
      return true;
    }
    if (scores[0][2] + scores[1][1] + scores[2][0] === win) {
      return true;
    }
    return false;
  }

  function openSquares() {
    for (let index = 0; index < squares.length; index++) {
      if (squares[index].innerText === "") {
        return true;
      }
    }
    return false;
  }

  function endGame() {
    gameOn = false;
    player = null;
    radioO["checked"] = false;
    radioX["checked"] = false;
    radioO.removeAttribute("disabled");
    radioX.removeAttribute("disabled");
  }
})();
