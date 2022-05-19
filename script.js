const grid = document.getElementById("grid");
const restartButton = document.getElementById("restart");
const winScreen = document.getElementById("winscreen");

const GameBoard = (() => {
  const board = [];

  const createBoard = () => {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        let gridSquare = document.createElement("div");
        gridSquare.setAttribute("id", `${x} ${y}`);
        gridSquare.addEventListener("click", Game.clickedSquare);
        gridSquare.classList.add("box");
        gridSquare.textContent = "";
        grid.appendChild(gridSquare);
        board.push(gridSquare);
      }
    }
  };

  const clearBoard = () => {
    let boxes = document.getElementsByClassName("box");

    while (boxes[0]) {
      boxes[0].parentNode.removeChild(boxes[0]);
    }

    while (board.length > 0) {
      board.pop();
    }
  };

  const setSquare = (clickedSquare) => {
    if (board.includes(clickedSquare)) {
      clickedSquare.textContent = currentPlayer.mark;
      Game.changeTurn();
    }
  };

  return { createBoard, setSquare, board, clearBoard };
})();

const Player = (name, mark) => {
  const sayName = () => {
    console.log(name);
  };

  return { name, mark, sayName };
};

const playerOne = Player("erkki", "X");
const playerTwo = Player("merkki", "O");
let currentPlayer = playerOne;

const Game = (() => {
  const startGame = () => {
    winScreen.style.display = "none";
    GameBoard.clearBoard();
    GameBoard.createBoard();
    currentPlayer = playerOne;
  };

  const clickedSquare = (event) => {
    if (event.target.textContent == "") {
      GameBoard.setSquare(event.target);
    }
  };

  const changeTurn = () => {
    checkForWin();
    if (currentPlayer == playerOne) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
  };

  const checkForWin = () => {
    let symbolToCheck = currentPlayer.mark;

    if (
      (GameBoard.board[0].textContent == symbolToCheck &&
        GameBoard.board[1].textContent == symbolToCheck &&
        GameBoard.board[2].textContent == symbolToCheck) ||
      (GameBoard.board[3].textContent == symbolToCheck &&
        GameBoard.board[4].textContent == symbolToCheck &&
        GameBoard.board[5].textContent == symbolToCheck) ||
      (GameBoard.board[6].textContent == symbolToCheck &&
        GameBoard.board[7].textContent == symbolToCheck &&
        GameBoard.board[8].textContent == symbolToCheck) ||
      (GameBoard.board[0].textContent == symbolToCheck &&
        GameBoard.board[3].textContent == symbolToCheck &&
        GameBoard.board[6].textContent == symbolToCheck) ||
      (GameBoard.board[1].textContent == symbolToCheck &&
        GameBoard.board[4].textContent == symbolToCheck &&
        GameBoard.board[7].textContent == symbolToCheck) ||
      (GameBoard.board[2].textContent == symbolToCheck &&
        GameBoard.board[5].textContent == symbolToCheck &&
        GameBoard.board[8].textContent == symbolToCheck) ||
      (GameBoard.board[0].textContent == symbolToCheck &&
        GameBoard.board[4].textContent == symbolToCheck &&
        GameBoard.board[8].textContent == symbolToCheck) ||
      (GameBoard.board[2].textContent == symbolToCheck &&
        GameBoard.board[4].textContent == symbolToCheck &&
        GameBoard.board[6].textContent == symbolToCheck)
    ) {
      winScreen.style.display = "block";
      document.getElementById(
        "congratulations"
      ).textContent = `${symbolToCheck} WINS`;
    } else {
      if (
        GameBoard.board.every((square) => {
          if (square.textContent == "") {
            return false;
          }
          return true;
        })
      ) {
        winScreen.style.display = "block";
        document.getElementById("congratulations").textContent = `TIE GAME`;
      }
    }
  };

  return { startGame, clickedSquare, changeTurn };
})();

Game.startGame();

restartButton.addEventListener("click", Game.startGame);
